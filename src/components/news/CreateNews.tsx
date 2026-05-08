import { useEffect, useRef, useState } from "react";
import {
  arrowDownIcon,
  arrowUpIcon,
  closeIcon,
  correctIcon,
  minusIcon,
  settingIcon,
} from "../../icons";
import Button from "../ui/button";
import { mediaOptions } from "../heroMedia/mediaOptionConfig";
import MetaData from "../metaData";
import FieldsAndBlocks from "../fields&Blocks/FieldsAndBlocks";
import { NewsTABS, PAGE_BLOCK_ALL_TYPES } from "../heroMedia/tabs";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  NewsAddBlock,
  NewsChangeBlockStatus,
  NewsChangeBlockType,
  NewsMoveBlock,
  NewsRemoveBlock,
  NewsUpdateBlockContent,
  removeNewsMediaType,
  resetNewsMediaDimensions,
  selectNews,
  setFullNews,
  setNewsFeatured,
  // setNewsAuthentication,
  // setNewsAuthorInfo,
  // setNewsGeoBlockContent,
  setNewsHierarchyContent,
  setNewsLanguage,
  setNewsMediaType,
  setNewsPublishContent,
  // setNewsReadTime,
  // setNewsSummary,
  setNewsTitle,
  setNewsVideoType,
  updateNewsMediaContentField,
  updateNewsMetadataField,
} from "../../redux-toolkit/newsSlice";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BlockFactory from "../blocks/BlockFactory";
import InsertButton from "../blocks/InsertButton";
import ContentPanel from "../contentPanel/ContentPanel";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import { paths } from "../../config/paths";
import { normalizeNewsResponse } from "./normalizer/normalizeNews";
import type { BlockType } from "../blocks/blocksObjectConfig";
import { resetTags, setTags } from "../../redux-toolkit/tagSlice";
import {
  capitalize,
  concatImgURL,
  getImageDimensions,
  typeDisplayMap,
} from "../../config/function";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import { useJsonS3Upload } from "../../hooks/useJsonS3Upload";
import BlockSettings from "../blocks/BlockSettings";
import {
  selectLanguage,
  selectTranslation,
} from "../../redux-toolkit/languageSlice";
import { useScroll } from "../../hooks/ScrollContext";

const CreateNews = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isScrolled } = useScroll();
  const news = useSelector(selectNews);
  const language = useSelector(selectLanguage);
  const isTranslation = useSelector(selectTranslation);
  const [minimizedStates, setMinimizedStates] = useState<{
    [index: number]: boolean;
  }>({});
  // const [isEnabled, setIsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("fields");
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(
    null,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blocks = news?.blocks;
  const languageCode = searchParams.get("lang") || language;
  const isEditMode = Boolean(id);
  const location = useLocation();
  const isCopyMode = location.state?.isCopy || false;
  const copyNewsId = location.state?.copyNewsId || null;

  const fetchNewsById = async (id: string, languageCode?: string) => {
    return await api.get(`/news/${id}`, {
      params: languageCode ? { language_code: languageCode } : {},
    });
  };

  // News Data By ID
  const { data: normalizedNewsData } = useQuery({
    queryKey: ["news", id, languageCode],
    queryFn: () =>
      fetchNewsById((id as string) || copyNewsId, languageCode || undefined),
    enabled: isEditMode || isCopyMode,
    select: (response) => {
      const news = response.data;

      return {
        normalized: normalizeNewsResponse(news, languageCode),
        tags: news.tags,
      };
    },
  });

  const { uploadJsonToS3 } = useJsonS3Upload();
  // Create News API
  const createNewsMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...news,
        translation: {
          ...news.translation,
          auto_translate: isTranslation,
        },
      };

      const json_s3_key = await uploadJsonToS3(payload, "payloads/news");
      return await api.post("/news", { json_s3_key });
      // return await api.post("/news", news),
    },
    onSuccess: () => {
      showToast("News Created", "success");
      navigate(paths.media.news.path);
    },
    onError: (error) => {
      console.error("Error while adding news", error);
    },
  });

  // Update News API

  const fromPage = location.state?.fromPage || 1; // fallback if undefined
  const fromSearch = location.state?.fromSearch || "";

  const updateNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      const payload = {
        ...news,
        translation: {
          ...news.translation,
          auto_translate: isTranslation,
        },
      };
      const json_s3_key = await uploadJsonToS3(payload, "payloads/news");
      return await api.put(`/news/${id}`, { json_s3_key });
      // return await api.put(`/news/${id}`, news);
    },
    onSuccess: () => {
      showToast("News Updated", "success");
      dispatch(resetTags());
      navigate(paths.media.news.path, {
        state: {
          restorePage: fromPage,
          restoreSearch: fromSearch,
        }, // send it back silently
        replace: true, // optional: prevents back button double route
      });
    },
    onError: (error) => {
      console.error("news update failed", error);
    },
  });

  const handleAddBlock = (blockType: BlockType | string) => {
    dispatch(NewsAddBlock(blockType));
    setTimeout(() => {
      const lastIndex = blocks.length; // new block will be at the end
      const newBlockEl = blockRefs.current[lastIndex];
      if (newBlockEl) {
        newBlockEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const handleOnClose = () => {
    setSelectedMediaType(null);
    dispatch(resetNewsMediaDimensions());
    dispatch(removeNewsMediaType());
  };

  // useEffect(() => {
  //   if (isEditMode && newsDataById?.data) {
  //     const normalizedNews = normalizeNewsResponse(
  //       newsDataById.data,
  //       languageCode
  //     );
  //     dispatch(setTags(newsDataById?.data?.tags));
  //     dispatch(setFullNews(normalizedNews));
  //   }
  // }, [newsDataById]);
  useEffect(() => {
    if (!normalizedNewsData) return;

    const { normalized, tags } = normalizedNewsData;

    if (isEditMode) {
      // Normal edit behavior
      dispatch(setTags(tags));
      dispatch(setFullNews(normalized));
    }

    if (isCopyMode && copyNewsId) {
      // Copy mode: load data but reset IDs + timestamps
      const copiedNews = {
        ...normalized,
        status: "draft", // reset status
        // id: null, // remove original ID
        translation: {
          ...normalized.translation,
          // title: `${normalized.translation.title} (Copy)`, // optional: mark as copy
        },
        // created_at: null,
        // updated_at: null,
      };

      dispatch(setTags(tags));
      dispatch(setFullNews(copiedNews));
    }
  }, [normalizedNewsData, isEditMode, isCopyMode]);

  useEffect(() => {
    if (news) {
      const mediaType = news.translation.hero_media_type;
      setSelectedMediaType(mediaType);
    }
  }, [news]);

  const handleSelectMediaType = (type: string) => {
    setSelectedMediaType(type);
    dispatch(setNewsMediaType(type));
  };

  // News Create/Update Function
  const handleNews = (id: string) => {
    if (isEditMode && !isCopyMode) {
      // Only true edit should update
      updateNewsMutation.mutate(id);
    } else {
      const langToUse = languageCode || language;
      dispatch(setNewsLanguage(langToUse));
      // Copy or new create both use POST
      createNewsMutation.mutate();
    }
  };

  // MetaData Onchange Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description",
  ) => {
    dispatch(updateNewsMetadataField({ field, value: e.target.value }));
  };

  const getDisplayName = (type: string) => {
    return typeDisplayMap[type.toLowerCase()] || capitalize(type);
  };

  // Blocks Render
  const renderSelectedComponents = () => {
    return blocks.map((block: any, index: number) => {
      const { block_type } = block;
      const BlockComponent = BlockFactory[block_type];
      if (!BlockComponent) return null;

      const isMinimized = minimizedStates[index] ?? false;

      return (
        <div
          key={index}
          ref={(el) => {
            blockRefs.current[index] = el;
          }}
        >
          <div className="p-4  bg-white border-primary border-0.5 rounded-2xl">
            <div
              className={`flex justify-between items-center ${
                isMinimized ? "mb-0" : "mb-6"
              } `}
            >
              <h2 className="text-xl/5 font-semibold">
                {block_type === "socialWall"
                  ? "Social Wall"
                  : block_type === "faq"
                    ? "FAQ"
                    : getDisplayName(block_type)}
              </h2>
              <div className="flex items-center gap-5">
                <ToggleSwitch
                  checked={block.content.is_active}
                  onChange={() => dispatch(NewsChangeBlockStatus({ index }))}
                />
                <button
                  onClick={() => {
                    setActiveIndex(index);
                    setIsOpen(true);
                  }}
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <img src={settingIcon} alt="Settings" className="w-6 h-6" />
                </button>
                <Button
                  icon={arrowUpIcon}
                  backgroundColor="transparent"
                  className="p-0"
                  onClick={() =>
                    dispatch(NewsMoveBlock({ index, direction: "up" }))
                  }
                />
                <Button
                  icon={arrowDownIcon}
                  backgroundColor="transparent"
                  className="p-0"
                  onClick={() =>
                    dispatch(NewsMoveBlock({ index, direction: "down" }))
                  }
                />
                <Button
                  icon={minusIcon}
                  backgroundColor="transparent"
                  className="p-0"
                  onClick={() =>
                    setMinimizedStates((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
                />
                <Button
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="p-0"
                  onClick={() => dispatch(NewsRemoveBlock(index))}
                />
              </div>
            </div>
            {!isMinimized && (
              <>
                <BlockComponent
                  currentBlock={block}
                  onChangeType={(newType) =>
                    dispatch(NewsChangeBlockType({ index, newType }))
                  }
                  onChangeBlock={(updatedBlock) => {
                    dispatch(NewsUpdateBlockContent({ index, updatedBlock }));
                  }}
                  types={PAGE_BLOCK_ALL_TYPES}
                />
              </>
            )}
          </div>
        </div>
      );
    });
  };

  // Props for Hero Media IMAGE/VIDEO Section
  const commonMediaProps = {
    onClose: handleOnClose,
  };

  const handleVideoThumbanailUrlChange = async (url: string) => {
    dispatch(
      updateNewsMediaContentField({
        field: "hero_media_thumbnail",
        value: url,
      }),
    );
    if (url) {
      const { width, height } = await getImageDimensions(concatImgURL(url));
      dispatch(
        updateNewsMediaContentField({ field: "thumbnail_width", value: width }),
      );
      dispatch(
        updateNewsMediaContentField({
          field: "thumbnail_height",
          value: height,
        }),
      );
    } else {
      dispatch(
        updateNewsMediaContentField({ field: "thumbnail_width", value: 0 }),
      );
      dispatch(
        updateNewsMediaContentField({ field: "thumbnail_height", value: 0 }),
      );
    }
  };

  const videoMediaProps = {
    ...commonMediaProps,
    videoUrl: news.translation.hero_video_url,
    videoThumbnailUrl: news.translation.hero_media_thumbnail,
    videoSource: news.translation.hero_video_source,
    onUrlChange: (url: string) =>
      dispatch(
        updateNewsMediaContentField({ field: "hero_video_url", value: url }),
      ),
    onThumbnailUrlChange: (url: string) => handleVideoThumbanailUrlChange(url),
    onTypeChange: (type: string) => dispatch(setNewsVideoType(type)),
  };

  const handleHeroImageUrlChange = async (url: string) => {
    dispatch(
      updateNewsMediaContentField({ field: "hero_image_url", value: url }),
    );
    if (url) {
      const { width, height } = await getImageDimensions(concatImgURL(url));
      dispatch(
        updateNewsMediaContentField({ field: "img_width", value: width }),
      );
      dispatch(
        updateNewsMediaContentField({ field: "img_height", value: height }),
      );
    } else {
      dispatch(updateNewsMediaContentField({ field: "img_width", value: 0 }));
      dispatch(updateNewsMediaContentField({ field: "img_height", value: 0 }));
    }
  };

  const imageMediaProps = {
    ...commonMediaProps,
    imageUrl: news.translation.hero_image_url,
    onUrlChange: (url: string) => handleHeroImageUrlChange(url),
  };

  useEffect(() => {}, [news]);

  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="News Builder"
          // isToggleVisible={true}
          // isToggleEnabled={isEnabled}
          // onToggleChange={setIsEnabled}
          onSaveTemplateTitle="Cancel"
          onSaveTemplate={() => window.history.back()}
          onSubmit={() => handleNews(String(id))}
          onSubmitLoading={
            createNewsMutation.isPending || updateNewsMutation.isPending
          }
          isEditMode={isEditMode}
          isSubmitDisabled={
            !news.translation.title ||
            news.translation.title.trim().length === 0
          }
        />
      </div>
      <div className="container grid grid-cols-12  xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-11 md:col-span-10 col-span-10">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="md:mb-6 mb-2">
              <label
                htmlFor="title"
                className="block w-full font-medium md:text-base text-sm md:mb-3 mb-1"
              >
                Content Title<sup>*</sup>
              </label>
              <input
                type="text"
                id="title"
                value={news.translation.title || ""}
                onChange={(e) => dispatch(setNewsTitle(e.target.value))}
                placeholder="Enter Title Here..."
                className="md:pb-4 pb-1 border-b md:text-base text-sm border-primary w-full focus-within:outline-none"
              />
            </div>

            {/* <div className="md:mb-5 mb-1">
              <label
                htmlFor="summary"
                className="block w-full font-medium md:text-base text-sm md:mb-2 mb-1"
              >
                Overview
              </label>
              <textarea
                id="summary"
                value={news.translation.description || ""}
                onChange={(e) => dispatch(setNewsSummary(e.target.value))}
                placeholder="Enter Overview Here..."
                className="md:p-4 p-2 md:text-base text-sm border border-primary rounded-2xl h-sp70 resize-none w-full focus-within:outline-none"
              ></textarea>
            </div> */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="create-in-draft"
                className="peer hidden"
                checked={news.is_featured}
                onChange={(e) => dispatch(setNewsFeatured(e.target.checked))}
              />
              <label
                htmlFor="create-in-draft"
                className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
           peer-checked:bg-black peer-checked:border-black"
              >
                <img src={correctIcon} alt="Right" />
              </label>
              <label
                htmlFor="create-in-draft"
                className="md:text-base text-sm w-max font-medium capitalize"
              >
                Featured
              </label>
            </div>
            <div>
              <div className="flex items-center gap-3 md:mb-2 mb-1">
                <p className="block font-medium md:text-base text-sm">
                  Feature Media
                </p>

                {/* <div className="relative group">
                  <InfoIcon
                    size={15}
                    className="cursor-pointer text-gray-600"
                  />
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded-md px-2 py-1 whitespace-nowrap z-10">
                    Media Size : 856 x 502 px
                  </div>
                </div> */}
              </div>

              {selectedMediaType == null && (
                <div className="flex gap-6 md:mb-4 mb-2 md:mt-2 mt-1">
                  {mediaOptions.map(({ type, label, icon }) => (
                    <Button
                      key={type}
                      text={label}
                      icon={icon}
                      iconPosition="start"
                      backgroundColor="transparent"
                      onClick={() => handleSelectMediaType(type)}
                      className={`md:py-4 py-3  w-sp212 justify-start  md:px-4 px-3 border-0.5 border-primary`}
                    />
                  ))}
                </div>
              )}
              {mediaOptions.map(({ type, Component }) => {
                if (selectedMediaType !== type) return null;

                return (
                  <div key={type} className="mt-4">
                    {type === "image" ? (
                      <Component {...imageMediaProps} />
                    ) : (
                      <Component {...videoMediaProps} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <MetaData metadata={news.metadata} onChange={handleChange} />

          <div className="mt-5">
            <FieldsAndBlocks
              tabs={NewsTABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onItemClick={(type) => handleAddBlock(type)}
            />
          </div>

          <div className="mt-5 flex flex-col gap-5">
            {renderSelectedComponents()}
            {blocks.length > 0 && (
              <div>
                <InsertButton
                  onItemClick={(type) => handleAddBlock(type)}
                  module="news"
                />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 col-span-2 ">
          <ContentPanel
            data={news}
            // onAuthsave={(payload) => dispatch(setNewsAuthentication(payload))}
            // onGeoSave={(payload) => dispatch(setNewsGeoBlockContent(payload))}
            // onReadSave={(payload) => dispatch(setNewsReadTime(payload))}
            // onAuthorSave={(payload) => dispatch(setNewsAuthorInfo(payload))}
            onPublishSave={(payload) =>
              dispatch(setNewsPublishContent(payload))
            }
            onHierarchySave={(payload) =>
              dispatch(setNewsHierarchyContent(payload))
            }
            // onSponsorSave={(payload) =>
            //   dispatch(setNewsSponsorContent(payload))
            // }
            // onLanguageSave={() => {}}
          />
        </div>
      </div>
      {isOpen && activeIndex !== null && (
        <BlockSettings
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          index={activeIndex}
          block={blocks[activeIndex]}
          onChangeBlock={(updatedBlock: any, index: number) => {
            dispatch(NewsUpdateBlockContent({ index, updatedBlock }));
          }}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default CreateNews;
