import { useEffect, useRef, useState } from "react";
import { arrowDownIcon, arrowUpIcon, closeIcon, minusIcon } from "../../icons";
import Button from "../ui/button";
import MetaData from "../metaData";
import FieldsAndBlocks from "../fields&Blocks/FieldsAndBlocks";
import { ourspacesTABS, PAGE_BLOCK_ALL_TYPES } from "../heroMedia/tabs";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { useDispatch, useSelector } from "react-redux";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BlockFactory from "../blocks/BlockFactory";
import InsertButton from "../blocks/InsertButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import { paths } from "../../config/paths";
import { normalizeourspacesResponse } from "./normalizer/normalizeourspaces.ts";
import type { BlockType } from "../blocks/blocksObjectConfig";
import { resetTags, setTags } from "../../redux-toolkit/tagSlice";
import { capitalize, typeDisplayMap } from "../../config/function";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import ImageMedia from "../heroMedia/ImageMedia.tsx";
import {
  OurspacesChangeBlockStatus,
  OurspacesChangeBlockType,
  OurspacesMoveBlock,
  OurspacesRemoveBlock,
  OurspaceUpdateBlockContent,
  selectOurSpaces,
  setFullspaces,
  setOurspaceButtonLabel,
  setOurspaceButtonUrl,
  setOurspaceTitle,
  SpacesAddBlock,
  updateourspacesMediaContentField,
  updateourspacesMetadataField,
} from "../../redux-toolkit/ourspacesSlice.ts";
import type { AxiosError } from "axios";
import Input from "../ui/input/Input.tsx";

const Createourspaces = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ourspaces = useSelector(selectOurSpaces);
  const [minimizedStates, setMinimizedStates] = useState<{
    [index: number]: boolean;
  }>({});
  const [isEnabled, setIsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("fields");
  // const [selectedMediaType, setSelectedMediaType] = useState<string | null>(
  //     null
  // );

  const dispatch = useDispatch();
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blocks = ourspaces?.blocks;
  const languageCode = searchParams.get("lang");
  const isEditMode = Boolean(id);

  const fetchNewsById = async (id: string, languageCode?: string) => {
    return await api.get(`/space/${id}`, {
      params: languageCode ? { language_code: languageCode } : {},
    });
  };

  // News Data By ID
  const { data: normalizedNewsData } = useQuery({
    queryKey: ["ourspaces", id, languageCode],
    queryFn: () => fetchNewsById(id as string, languageCode || undefined),
    enabled: isEditMode,
    select: (response) => {
      const news = response.data;

      return {
        normalized: normalizeourspacesResponse(news, languageCode),
        tags: news.tags,
      };
    },
  });

  // Create News API
  const createNewsMutation = useMutation({
    mutationFn: async () => {
      const payload = normalizeourspacesResponse(ourspaces, languageCode);
      return await api.post("/space", payload);
    },
    onSuccess: () => {
      showToast("Our Spaces Created", "success");
      navigate(paths.ourspaces.path);
    },
    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message || "Failed to create our spaces";

      showToast(message, "error");
      console.error("Error while adding news", error);
    },
  });

  const location = useLocation();
  const fromPage = location.state?.fromPage || 1; // fallback if undefined
  const fromSearch = location.state?.fromSearch || "";
  // Update spaces API
  const updateNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      return await api.put(`/space/${id}`, ourspaces);
      // return await api.put(`/news/${id}`, news);
    },
    onSuccess: () => {
      showToast("Our Spaces Updated", "success");
      dispatch(resetTags());
      navigate(paths.ourspaces.path, {
        state: {
          restorePage: fromPage,
          restoreSearch: fromSearch,
        }, // send it back silently
        replace: true, // optional: prevents back button double route
      });
    },
    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message || "Failed to update our spaces";
      showToast(message, "error");
      console.error("Error while adding news", error);
    },
  });

  const handleAddBlock = (blockType: BlockType | string) => {
    dispatch(SpacesAddBlock(blockType));
    setTimeout(() => {
      const lastIndex = blocks.length; // new block will be at the end
      const newBlockEl = blockRefs.current[lastIndex];
      if (newBlockEl) {
        newBlockEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
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
    if (isEditMode && normalizedNewsData) {
      dispatch(setTags(normalizedNewsData.tags));
      dispatch(setFullspaces(normalizedNewsData.normalized));
    }
  }, [normalizedNewsData]);

  // useEffect(() => {
  //     if (ourspaces) {
  //         const mediaType = ourspaces.image;
  //         setSelectedMediaType(mediaType);
  //     }
  // }, [ourspaces]);

  useEffect(() => {
    if (!isEditMode && !normalizedNewsData) {
      dispatch(
        setFullspaces({
          blocks: [],
          translation: {
            title: "",
            description: "",
            button_label: "",
            button_url: "",
            language_code: "en",
          },
          metadata: { seo_title: "", seo_tag: "", seo_description: "" },
          image: null,
        }),
      );
      dispatch(setOurspaceTitle(""));
      dispatch(resetTags());
    }
  }, [dispatch, isEditMode, normalizedNewsData]);

  // News Create/Update Function
  const handleNews = (id: string) => {
    if (isEditMode) {
      updateNewsMutation.mutate(id);
    } else {
      createNewsMutation.mutate();
    }
  };

  // MetaData Onchange Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description",
  ) => {
    dispatch(updateourspacesMetadataField({ field, value: e.target.value }));
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
                  onChange={() =>
                    dispatch(OurspacesChangeBlockStatus({ index }))
                  }
                />
                <Button
                  icon={arrowUpIcon}
                  backgroundColor="transparent"
                  className="p-0"
                  onClick={() =>
                    dispatch(OurspacesMoveBlock({ index, direction: "up" }))
                  }
                />
                <Button
                  icon={arrowDownIcon}
                  backgroundColor="transparent"
                  className="p-0"
                  onClick={() =>
                    dispatch(OurspacesMoveBlock({ index, direction: "down" }))
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
                  onClick={() => dispatch(OurspacesRemoveBlock(index))}
                />
              </div>
            </div>
            {!isMinimized && (
              <>
                <BlockComponent
                  currentBlock={block}
                  onChangeType={(newType) =>
                    dispatch(OurspacesChangeBlockType({ index, newType }))
                  }
                  onChangeBlock={(updatedBlock) => {
                    dispatch(
                      OurspaceUpdateBlockContent({ index, updatedBlock }),
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

  const imageMediaProps = {
    onClose: () =>
      dispatch(
        updateourspacesMediaContentField({ field: "image", value: null }),
      ),
    isicon: false,
    imageUrl: ourspaces.image,
    onUrlChange: (url: string) =>
      dispatch(
        updateourspacesMediaContentField({ field: "image", value: url }),
      ),
  };

  return (
    <div className="mt-10">
      <BuilderHeader
        title="Our Spaces Builder"
        isToggleVisible={true}
        onSaveTemplateTitle="Cancel"
        onSaveTemplate={() => window.history.back()}
        isToggleEnabled={isEnabled}
        onToggleChange={setIsEnabled}
        onPinClick={() => console.log("Pin clicked")}
        onSubmit={() => handleNews(String(id))}
        onSubmitLoading={
          createNewsMutation.isPending || updateNewsMutation.isPending
        }
        isEditMode={isEditMode}
        isSubmitDisabled={
          ourspaces.translation.title === "" ||
          ourspaces.translation.title === null
        }
      />

      <div className="grid grid-cols-12  xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-12 md:col-span-10 col-span-10">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="md:mb-6 mb-2">
              <label
                htmlFor="title"
                className="block w-full font-medium md:text-base text-sm md:mb-3 mb-1"
              >
                Title<sup>*</sup>
              </label>
              <input
                type="text"
                id="title"
                value={ourspaces.translation.title || ""}
                onChange={(e) => dispatch(setOurspaceTitle(e.target.value))}
                placeholder="Enter Title Here..."
                className="md:pb-4 pb-1 border-b md:text-base text-sm border-primary w-full focus-within:outline-none"
              />
            </div>
            <div>
              <div>
                <ImageMedia
                  {...imageMediaProps}
                  showCloseButton={!!ourspaces.image}
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3 w-full items-center justify-center">
              <Input
                label="Button Text*"
                placeholder="Enter Button Text"
                value={ourspaces.translation.button_label || ""}
                onChange={(e) =>
                  dispatch(setOurspaceButtonLabel(e.target.value))
                }
                className="w-full"
              />
              <Input
                label="Button Link*"
                placeholder="https://www.example.com"
                value={ourspaces.translation.button_url || ""}
                onChange={(e) => dispatch(setOurspaceButtonUrl(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <MetaData metadata={ourspaces.metadata} onChange={handleChange} />

          <div className="mt-5">
            <FieldsAndBlocks
              tabs={ourspacesTABS}
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
                  module="ourspaces"
                />
              </div>
            )}
          </div>
        </div>

        {/* <div className="lg:col-span-1 col-span-2 ">
                    <ContentPanel
                        data={ourspaces}
                        // onAuthsave={(payload) => dispatch(setNewsAuthentication(payload))}
                        // onGeoSave={(payload) => dispatch(setNewsGeoBlockContent(payload))}
                        // onReadSave={(payload) => dispatch(setNewsReadTime(payload))}
                        // onAuthorSave={(payload) => dispatch(setNewsAuthorInfo(payload))}
                       
                    // onLanguageSave={() => {}}
                    />
                </div> */}
      </div>
    </div>
  );
};

export default Createourspaces;
