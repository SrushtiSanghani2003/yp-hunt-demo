import { useEffect, useRef, useState } from "react";
import { arrowDownIcon, arrowUpIcon, closeIcon, minusIcon } from "../../icons";
import Button from "../ui/button";
import MetaData from "../metaData";
import FieldsAndBlocks from "../fields&Blocks/FieldsAndBlocks";
import { mediaOptions } from "../heroMedia/mediaOptionConfig";
import {  PAGE_BLOCK_ALL_TYPES, TABS } from "../heroMedia/tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  ArticleAddBlock,
  ArticleChangeBlockType,
  ArticleMoveBlock,
  ArticleRemoveBlock,
  removeArticleMediaType,
  selectArticle,
  setFullArticle,
  setArticleMediaType,
  setArticleSummary,
  setArticleTitle,
  setArticleVideoType,
  ArticleUpdateBlockContent,
  updateArticleMediaContentField,
  updateArticleMetadataField,
  setArticleAuthentication,
  setArticleGeoBlockContent,
  setArticleReadTime,
  setArticleAuthorInfo,
  setArticlePublishContent,
  setArticleHierarchyContent,
  setArticleSponsorContent,
  resetArticle,
  ArticleChangeBlockStatus,
} from "../../redux-toolkit/articleSlice";
import BlockFactory from "../blocks/BlockFactory";
import ContentPanel from "../contentPanel/ContentPanel";
import InsertButton from "../blocks/InsertButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { normalizeArticleResponse } from "./normalizers/normalizeArticle";
import { paths } from "../../config/paths";
import { showToast } from "../../utils/toastUtils";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import type { BlockType } from "../blocks/blocksObjectConfig";
import { resetTags, setTags } from "../../redux-toolkit/tagSlice";
import { capitalize, typeDisplayMap } from "../../config/function";
import ArticlesLivePreview from "./ArticlesLivePreview";
import ToggleSwitch from "../ui/switch/ToggleSwitch";

const CreateArticles = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const article = useSelector(selectArticle);
  const [minimizedStates, setMinimizedStates] = useState<{
    [index: number]: boolean;
  }>({});
  const [isLivePreview, setIsLivePreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"fields" | "blocks">("fields");
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(
    null
  );
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blocks = article?.blocks;
  const languageCode = searchParams.get("lang");
  const isEditMode = Boolean(id);

  const fetchArticleById = async (id: string, languageCode?: string) => {
    return await api.get(`/articles/${id}`, {
      params: languageCode ? { language_code: languageCode } : {},
    });
  };

  // Article Data By ID
  const { data: normalizedArticleData } = useQuery({
    queryKey: ["article", id, languageCode],
    queryFn: () => fetchArticleById(id as string, languageCode || undefined),
    enabled: isEditMode,
    placeholderData: (prevData) => prevData,
    select: (response) => {
      const article = response.data;
      return {
        normalized: normalizeArticleResponse(article, languageCode),
        tags: article.tags,
      };
    },
  });

  // Create Article API
  const createArticleMutation = useMutation({
    mutationFn: async () => await api.post("/articles", article),
    onSuccess: () => {
      showToast("Article Created", "success");
      navigate(paths.media.articles.path);
    },
    onError: (error) => {
      console.error("Error while adding article", error);
    },
  });

  // Update Article API
  const upateArticleMutation = useMutation({
    mutationFn: async (id: string) => await api.put(`/articles/${id}`, article),
    onSuccess: () => {
      showToast("Article Updated", "success");
      dispatch(resetArticle());
      dispatch(resetTags());
      navigate(paths.media.articles.path);
    },
    onError: (error) => {
      console.error("article update failed", error);
    },
  });

  useEffect(() => {
    if (isEditMode && normalizedArticleData) {
      dispatch(setTags(normalizedArticleData.tags));
      dispatch(setFullArticle(normalizedArticleData.normalized));
    }
  }, [normalizedArticleData]);

  // useEffect(() => {
  //   if (isEditMode && articleDataById?.data) {
  //     const normalizedArticle = normalizeArticleResponse(
  //       articleDataById.data,
  //       languageCode
  //     );
  //     dispatch(setTags(articleDataById?.data?.tags));
  //     dispatch(setFullArticle(normalizedArticle));
  //   }
  // }, [articleDataById]);

  useEffect(() => {
    if (article) {
      const mediaType = article.translation.hero_media_type;
      setSelectedMediaType(mediaType);
    }
  }, [article]);

  useEffect(() => {
  }, [article]);

  const handleSelectMediaType = (type: string) => {
    setSelectedMediaType(type);
    dispatch(setArticleMediaType(type));
  };

  const handleAddBlock = (blockType: BlockType | string) => {
    dispatch(ArticleAddBlock(blockType));
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
    dispatch(removeArticleMediaType());
  };

  // Article Create/Update Function
  const handleArticle = (id: string) => {
    if (isEditMode) {
      upateArticleMutation.mutate(id);
    } else {
      createArticleMutation.mutate();
    }
  };

  // MetaData Onchange Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description"
  ) => {
    dispatch(updateArticleMetadataField({ field, value: e.target.value }));
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
          <div className="md:p-4 p-3 bg-white border-primary border-0.5 rounded-2xl">
            <div
              className={`flex justify-between items-center ${
                isMinimized ? "mb-0" : "md:mb-6 mb-3"
              } `}
            >
              <h2 className="md:text-xl/5 text-base font-semibold">
                {block_type === "socialWall"
                  ? "Social Wall"
                  : block_type === "bentoBox"
                  ? "Bento Box"
                  : getDisplayName(block_type)}
              </h2>
              <div className="flex items-center md:gap-5 gap-2">
                <ToggleSwitch
                  checked={block.content.is_active}
                  onChange={() => dispatch(ArticleChangeBlockStatus({ index }))}
                />
                <Button
                  icon={arrowUpIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() =>
                    dispatch(ArticleMoveBlock({ index, direction: "up" }))
                  }
                />
                <Button
                  icon={arrowDownIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() =>
                    dispatch(ArticleMoveBlock({ index, direction: "down" }))
                  }
                />
                <Button
                  icon={minusIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
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
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => dispatch(ArticleRemoveBlock(index))}
                />
              </div>
            </div>
            {!isMinimized && (
              <>
                <BlockComponent
                  currentBlock={block}
                  onChangeType={(newType) =>
                    dispatch(ArticleChangeBlockType({ index, newType }))
                  }
                  onChangeBlock={(updatedBlock) => {
                    dispatch(
                      ArticleUpdateBlockContent({ index, updatedBlock })
                    );
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

  const videoMediaProps = {
    ...commonMediaProps,
    videoUrl: article.translation.hero_video_url,
    videoThumbnailUrl: article.translation.hero_media_thumbnail,
    videoSource: article.translation.hero_video_source,
    onUrlChange: (url: string) =>
      dispatch(
        updateArticleMediaContentField({ field: "hero_video_url", value: url })
      ),
    onThumbnailUrlChange: (url: string) =>
      dispatch(
        updateArticleMediaContentField({
          field: "hero_media_thumbnail",
          value: url,
        })
      ),
    onTypeChange: (type: string) => dispatch(setArticleVideoType(type)),
  };

  const imageMediaProps = {
    ...commonMediaProps,
    imageUrl: article.translation.hero_image_url,
    onUrlChange: (url: string) =>
      dispatch(
        updateArticleMediaContentField({ field: "hero_image_url", value: url })
      ),
  };

  return (
    <div className="md:mt-10 mt-5">
      <BuilderHeader
        title="Article Builder"
        isToggleVisible={true}
        isToggleEnabled={isLivePreview}
        onToggleChange={setIsLivePreview}
        onPinClick={() => console.log("Pin clicked")}
        onSaveTemplate={() => console.log("Template saved")}
        onSubmit={() => handleArticle(String(id))}
        onSubmitLoading={
          createArticleMutation.isPending || upateArticleMutation.isPending
        }
        isEditMode={isEditMode}
        isSubmitDisabled={
          article.translation.title === "" || article.translation.title === null
        }
      />

      {isLivePreview ? (
        <>
          <ArticlesLivePreview />
        </>
      ) : (
        <>
          <div className="grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
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
                    value={article.translation.title || ""}
                    onChange={(e) => dispatch(setArticleTitle(e.target.value))}
                    placeholder="Enter Title Here..."
                    className="md:pb-4 pb-1 border-b-0.5 md:text-base text-sm border-primary w-full focus-within:outline-none"
                  />
                </div>

                <div className="md:mb-5 mb-1">
                  <label
                    htmlFor="summary"
                    className="block font-medium md:text-base text-sm  w-full md:mb-2 mb-1"
                  >
                    Overview
                  </label>
                  <textarea
                    id="summary"
                    value={article.translation.description || ""}
                    onChange={(e) =>
                      dispatch(setArticleSummary(e.target.value))
                    }
                    placeholder="Enter Overview Here..."
                    className="md:p-4 p-2 border-0.5 border-primary rounded-2xl   h-sp70 md:text-base text-sm resize-none w-full focus-within:outline-none"
                  ></textarea>
                </div>

                <div>
                  <p className="block font-medium md:text-base text-sm w-full md:mb-2 mb-1">
                    Feature Media
                  </p>
                  {selectedMediaType === null && (
                    <div className="flex md:gap-6 gap-3 md:mb-4 mb-2 md:mt-2 mt-1">
                      {mediaOptions.map(({ type, label, icon }) => (
                        <Button
                          key={type}
                          text={label}
                          icon={icon}
                          iconPosition="start"
                          backgroundColor="transparent"
                          onClick={() => handleSelectMediaType(type)}
                          className={`md:py-3 py-3 w-sp212 justify-start md:px-4 px-3 border-0.5 border-primary`}
                        />
                      ))}
                    </div>
                  )}
                  {mediaOptions.map(({ type, Component }) => {
                    if (selectedMediaType !== type) return null;

                    if (type === "video") {
                      return (
                        <div key={type} className="mt-4">
                          <Component {...videoMediaProps} />
                        </div>
                      );
                    } else if (type === "image") {
                      return (
                        <div key={type} className="mt-4">
                          <Component {...imageMediaProps} />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              <MetaData metadata={article.metadata} onChange={handleChange} />

              <div className="mt-5">
                <FieldsAndBlocks
                  tabs={TABS}
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
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 col-span-2 ">
              <ContentPanel
                data={article}
                onAuthsave={(payload) =>
                  dispatch(setArticleAuthentication(payload))
                }
                onGeoSave={(payload) =>
                  dispatch(setArticleGeoBlockContent(payload))
                }
                onReadSave={(payload) => dispatch(setArticleReadTime(payload))}
                onAuthorSave={(payload) =>
                  dispatch(setArticleAuthorInfo(payload))
                }
                onPublishSave={(payload) =>
                  dispatch(setArticlePublishContent(payload))
                }
                onHierarchySave={(payload) =>
                  dispatch(setArticleHierarchyContent(payload))
                }
                onSponsorSave={(payload) =>
                  dispatch(setArticleSponsorContent(payload))
                }
                onLanguageSave={() => {}}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateArticles;
