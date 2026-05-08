import { useEffect, useRef, useState } from "react";
import {
  arrowDownIcon,
  arrowUpIcon,
  chevronDown,
  closeIcon,
  correctIcon,
  mediaIcon,
  minusIcon,
  newsIcon,
  settingIcon,
  videosIcon,
} from "../../icons";
import Button from "../ui/button";
import MetaData from "../metaData";
import FieldsAndBlocks from "../fields&Blocks/FieldsAndBlocks";
// import { pageMediaOptions } from "../heroMedia/mediaOptionConfig";
import { PAGE_BLOCK_ALL_TYPES, PageTABS } from "../heroMedia/tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageTitle,
  // setPageSummary,
  // setPageMediaType,
  // setPageVideoType,
  // removePageMediaType,
  updatePageMetadataField,
  // updatePageMediaContentField,
  PageAddBlock,
  PageChangeBlockType,
  PageMoveBlock,
  PageUpdateBlockContent,
  PageRemoveBlock,
  // setPageAuthorInfo,
  // setPageReadTime,
  // setPageAuthentication,
  setPagePublishContent,
  // setPageGeoBlockContent,
  // setPageHierarchyContent,
  // setPageSponsorContent,
  // setFullPage,
  selectPage,
  // setHeroMediaCount,
  setPageParentId,
  setFullPage,
  resetPage,
  setHeroMediaContent,
  updateHeroMediaOrder,
  PageChangeBlockStatus,
  setPageHeroType,
  setLanguageCode,
  setPageType,
  setHeroDesignState,
} from "../../redux-toolkit/pageSlice";
import BlockFactory from "../blocks/BlockFactory";
import ContentPanel from "../contentPanel/ContentPanel";
import InsertButton from "../blocks/InsertButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import { paths } from "../../config/paths";
import { showToast } from "../../utils/toastUtils";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import type { BlockType } from "../blocks/blocksObjectConfig";
import { PiVideo } from "react-icons/pi";
// import { normalizeArticleResponse } from "../articles/normalizers/normalizeArticle";
import {
  capitalize,
  removeKeyFromArray,
  typeDisplayMap,
} from "../../config/function";
// import PageImageMedia from "./PageImageMedia";
// import PageVideoMedia from "./PageVideoMedia";
// import Select from "react-select";
// import { customStyles } from "../account-settings/CreateCategories";
import { normalizePageResponse } from "./normalizePage";
import { TreeSelect } from "primereact/treeselect";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import HeroMediaPreview from "./HeroMediaPreview";
import PageLivePreview from "./PageLivePreview";
import { PlusIcon } from "lucide-react";
import HeroMediaGrid from "./HeroMediaGrid";
import { useJsonS3Upload } from "../../hooks/useJsonS3Upload";
import type { AxiosError } from "axios";
import LoaderOverlay from "../ui/loader/LoaderOverlay";
import BlockSettings from "../blocks/BlockSettings";
import { useScroll } from "../../hooks/ScrollContext";
import {
  selectLanguage,
  selectTranslation,
} from "../../redux-toolkit/languageSlice";
import HeroMediaDesignMode from "./HeroMediaDesignMode";

const CreatePages = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const pages = useSelector(selectPage);
  console.log("🚀 ~ CreatePages ~ pages:", pages);
  const language = useSelector(selectLanguage);
  const isTranslation = useSelector(selectTranslation);
  const [minimizedStates, setMinimizedStates] = useState<{
    [index: number]: boolean;
  }>({});
  const [isLivePreview, _setIsLivePreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"fields" | "blocks">("fields");
  const [heroMediaPreview, setHeroMediaPreview] = useState(false);

  // const [selectedMediaType, setSelectedMediaType] = useState<string | null>(
  //   null
  // );
  // const [imageCount, setImageCount] = useState(1);
  // const [videoCount, setVideoCount] = useState(1);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const currentCount = selectedMediaType === "image" ? imageCount : videoCount;
  // const [pageSearchInput, setPageSearchInput] = useState("");
  // const [debouncedInput, setDebouncedInput] = useState("");
  const [isIndividualPage, setIsIndividualPage] = useState(true);
  const [isNestedPage, setIsNestedPage] = useState(false);
  const [selectedPage, setSelectedPage] = useState<{
    value: string;
    label: string;
  } | null>(null);
  // const [selectedPage, setSelectedPage] = useState<string | null>(null);
  // const [heroMediaPreview, _setHeroMediaPreview] = useState(false);
  const location = useLocation();
  const isCopyMode = location.state?.isCopy || false;
  const copyPageId = location.state?.copyPageId || null;
  const [showLoader, setShowLoader] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const findLabelByKey = (
    key: string | null,
    nodes: TreeNode[],
  ): string | null => {
    if (!key) return null;

    for (const node of nodes) {
      if (node.key === key) return node.label;
      if (node.children) {
        const childLabel = findLabelByKey(key, node.children);
        if (childLabel) return childLabel;
      }
    }

    return null;
  };

  const blocks = pages?.blocks;
  const languageCode = searchParams.get("lang") || language;
  const isEditMode = Boolean(id);

  const getAllPages = async () => {
    const params: Record<string, string | number> = {
      page: 1,
      limit: 50,
    };
    // if (debouncedInput.trim()) {
    //   params.search = debouncedInput;
    // }

    return await api.get("/pages", { params });
  };

  const { data: pagesData } = useQuery({
    queryKey: ["pages"],
    queryFn: getAllPages,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const getPageById = async (id: string, languageCode?: string) => {
    return await api.get(`/pages/${id}`, {
      params: languageCode ? { language_code: languageCode } : {},
    });
  };

  const { data: pageDataById } = useQuery({
    queryKey: ["page", id, languageCode],
    queryFn: () =>
      getPageById((id as string) || copyPageId, languageCode || undefined),
    enabled: isEditMode || isCopyMode,
  });

  useEffect(() => {
    if ((isEditMode && pageDataById?.data) || (isCopyMode && copyPageId)) {
      if (pageDataById?.data?.parent) {
        setIsNestedPage(true);
        setIsIndividualPage(false);
        const parentObj = pageDataById?.data?.parent;
        setSelectedPage({ value: parentObj.id, label: parentObj.title });
      }
      let normalizePage;
      if (isCopyMode) {
        let newData = { ...pageDataById?.data };
        const newHeroMedia = removeKeyFromArray(newData?.hero_media, ["id"]);
        newData.hero_media = newHeroMedia;
        normalizePage = normalizePageResponse(newData, languageCode);
      } else {
        normalizePage = normalizePageResponse(pageDataById?.data, languageCode);
      }
      // const normalizePage = normalizePageResponse(
      //   pageDataById?.data,
      //   languageCode
      // );

      // setTimeout(() => {
      dispatch(setFullPage(normalizePage));
      // }, 1500);
    }
  }, [pageDataById]);

  // 👇 add this
  useEffect(() => {
    if (id) {
      // Only show loader when 'id' exists (edit mode)
      setShowLoader(true);

      // Example: simulate data loading delay
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // No 'id' in URL → no loader
      setShowLoader(false);
    }
  }, [id]);

  // useEffect(() => {
  //   if (pages.hero_media?.length > 0 && !selectedMediaType) {
  //     setSelectedMediaType(pages.hero_media[0].media_type);
  //   }
  //   const existingImagesCount = pages.hero_media.filter(
  //     (item) => item.media_type === "image"
  //   ).length;
  //   setImageCount(existingImagesCount);
  //   const existingVideosCount = pages.hero_media.filter(
  //     (item) => item.media_type === "video"
  //   ).length;
  //   setVideoCount(existingVideosCount);
  // }, [pages.hero_media, selectedMediaType]);

  interface TreeNode {
    key: string;
    label: string;
    data?: any;
    children?: TreeNode[];
    selectable?: boolean;
  }

  const transformPagesToTreeNodes = (
    pages: any[],
    excludeId: any,
  ): TreeNode[] => {
    return pages
      .filter((page) => page.id != excludeId)
      .map((page) => ({
        key: page.id,
        label: page.title,
        children: page.children
          ? transformPagesToTreeNodes(page.children, excludeId)
          : undefined,
      }));
  };

  const treePageOptions: TreeNode[] = pagesData
    ? transformPagesToTreeNodes(pagesData.data.pages, id)
    : [];

  // const pageOption: { value: string; label: string }[] =
  //   pagesData?.data?.pages.map((page: any) => ({
  //     value: page.id,
  //     label: page.title,
  //   })) || [];

  const handlePageChange = (e: any) => {
    const selectedKey = e.value;
    const selectedLabel = findLabelByKey(selectedKey, treePageOptions);
    setSelectedPage({ value: selectedKey, label: selectedLabel ?? "" });
    // setSelectedPage(e.value);
    dispatch(setPageParentId(e?.value ?? null));
  };

  const handleIndividualPageChange = (checked: boolean) => {
    setIsIndividualPage(checked);
    setIsNestedPage(!checked);
    if (checked) {
      setSelectedPage(null);
      dispatch(setPageParentId(null));
    }
  };

  const handleNestedPageChange = (checked: boolean) => {
    setIsNestedPage(checked);
    setIsIndividualPage(!checked);
  };

  // const handleMediaCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const count = parseInt(e.target.value);

  //   if (selectedMediaType === "image") {
  //     setImageCount(count);
  //     dispatch(setHeroMediaCount({ mediaType: "image", count }));
  //   } else {
  //     setVideoCount(count);
  //     dispatch(setHeroMediaCount({ mediaType: "video", count }));
  //   }
  // };

  const queryClient = useQueryClient();
  const { uploadJsonToS3 } = useJsonS3Upload();
  // Create Page API
  const createPageMutation = useMutation({
    // mutationFn: async () => await api.post("/pages", pages),
    mutationFn: async () => {
      const payload = {
        ...pages,
        translation: {
          ...pages.translation,
          auto_translate: isTranslation,
        },
      };
      const json_s3_key = await uploadJsonToS3(payload, "payloads/pages");
      return await api.post("/pages", { json_s3_key });
    },
    onSuccess: () => {
      showToast("Page Created", "success");
      queryClient.invalidateQueries({ queryKey: ["pages"], exact: false });
      navigate(paths.pages.path);
    },
    onError: (error: AxiosError<any>) => {
      const message = error.response?.data?.message || "Failed to create page";
      showToast(message, "error");

      console.error("Error while adding pages", error);
    },
  });

  // Update Page API

  const fromPage = location.state?.fromPage || 1; // fallback if undefined
  const fromSearch = location.state?.fromSearch || "";

  const updatePageMutation = useMutation({
    mutationFn: async (id: string) => {
      const cleanedHeroMedia = pages.hero_media.map((item: any) => {
        const { id, ...rest } = item as any;
        return rest;
      });
      const payload = {
        ...pages,
        hero_media: cleanedHeroMedia,
        translation: {
          ...pages.translation,
          auto_translate: isTranslation,
        },
      };
      const json_s3_key = await uploadJsonToS3(payload, "payloads/pages");

      // return await api.put(`/pages/${id}`, updatedPages);
      return await api.put(`/pages/${id}`, { json_s3_key });
    },
    onSuccess: () => {
      showToast("Page Updated", "success");
      dispatch(resetPage());

      navigate(paths.pages.path, {
        state: {
          restorePage: fromPage,
          restoreSearch: fromSearch,
        }, // send it back silently
        replace: true, // optional: prevents back button double route
      });
    },

    onError: (error: AxiosError<any>) => {
      const message = error.response?.data?.message || "Failed to create page";
      showToast(message, "error");
      console.error("Page update failed", error);
    },
  });

  // useEffect(() => {
  //   console.log("🚀 ~ CreatePages ~ pages:", pages);
  // }, [pages]);

  // const handleSelectMediaType = (type: string) => {
  //   setSelectedMediaType(type);
  //   const existingTypeItems = pages.hero_media.filter(
  //     (item) => item.media_type === type
  //   );
  //   if (existingTypeItems.length === 0) {
  //     dispatch(setHeroMediaCount({ mediaType: type, count: 1 }));
  //   }
  // };

  const handleAddBlock = (blockType: BlockType | string) => {
    dispatch(PageAddBlock(blockType));
    setTimeout(() => {
      const lastIndex = blocks.length; // new block will be at the end
      const newBlockEl = blockRefs.current[lastIndex];
      if (newBlockEl) {
        newBlockEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  // Page Create/Update Function
  const handlePages = (id: string) => {
    const trimmedTitle = pages.translation.title?.trim();

    if (!trimmedTitle) {
      showToast("Title cannot be empty", "error");
      return;
    }
    // const tournamentHeroBlock = pages.blocks.find((item)=>item.block_type == 'tournamenthero')
    // const blockBtnItems = tournamentHeroBlock?.content.items
    // const blockBtns = blockBtnItems.map((item:any)=>item.btns)
    // console.log("🚀 ~ handlePages ~ blockBtns:", blockBtns)

    if (isEditMode) {
      updatePageMutation.mutate(id);
    } else {
      const langToUse = languageCode || language;
      dispatch(setLanguageCode(langToUse));
      createPageMutation.mutate();
    }
  };

  // MetaData Onchange Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description",
  ) => {
    dispatch(updatePageMetadataField({ field, value: e.target.value }));
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
      const noMarginBlock = [
        "all_jobs",
        "where_to_watch",
        // "where_to_watch_more",
        // "match_highlights",
        // "premier_predict",
        // "about_info",
        // "mix_media",
        "schedule",
        "tournamentInfo",
        "padelzone",
        // "foryou",
        "race_to_finals",
        "tournamenthero",
        "player_seasons",
        "playerDetails",
        "playerCareers",
        "tickets",
        "match_centre",
        "match_stats",
        "head_to_head",
        "player_info",
        "video_vertical",
      ];

      return (
        <div
          key={block.sort_order}
          ref={(el) => {
            blockRefs.current[index] = el;
          }}
        >
          <div className="md:p-4 p-3 bg-white border-primary border-0.5 rounded-2xl">
            <div
              className={`flex justify-between items-center ${
                isMinimized || noMarginBlock.includes(block_type)
                  ? "mb-0"
                  : "md:mb-6 mb-3"
              } `}
            >
              <h2 className="md:text-2xl/6 text-base font-semibold">
                {getDisplayName(block_type)}
              </h2>
              <div className="flex items-center md:gap-5 gap-2">
                <ToggleSwitch
                  checked={block.content.is_active}
                  onChange={() => dispatch(PageChangeBlockStatus({ index }))}
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
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() =>
                    dispatch(PageMoveBlock({ index, direction: "up" }))
                  }
                />
                <Button
                  icon={arrowDownIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() =>
                    dispatch(PageMoveBlock({ index, direction: "down" }))
                  }
                />
                {!noMarginBlock.includes(block_type) && (
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
                )}
                <Button
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => dispatch(PageRemoveBlock(index))}
                />
              </div>
            </div>
            {!isMinimized && (
              <>
                <BlockComponent
                  currentBlock={block}
                  onChangeType={(newType) =>
                    dispatch(PageChangeBlockType({ index, newType }))
                  }
                  onChangeBlock={(updatedBlock) => {
                    dispatch(PageUpdateBlockContent({ index, updatedBlock }));
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

  // const handleSelect = (value: number) => {
  //   const fakeEvent = { target: { value: String(value) } };
  //   handleMediaCountChange(fakeEvent as React.ChangeEvent<HTMLSelectElement>);
  //   setIsOpen(false);
  // };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleHeroMedia = (type: string) => {
    dispatch(setHeroMediaContent({ mediaType: type }));
  };
  // const handleHeroMedia = (type: "image" | "video" | "news" | "highlight") => {
  //   const nextOrder = pages.hero_media.length + 1;

  //   dispatch(
  //     setHeroMediaContent({
  //       id: Date.now(),
  //       media_type: type,
  //       sort_order: nextOrder,
  //       selected_value:
  //         type === "news"
  //           ? { type: "latest" }
  //           : type === "highlight"
  //           ? "highlight"
  //           : undefined,
  //     })
  //   );
  // };

  useEffect(() => {}, [pages]);

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Page Builder"
          isToggleVisible={true}
          // isToggleEnabled={isLivePreview}
          // onToggleChange={setIsLivePreview}
          onSaveTemplateTitle="Cancel"
          onSaveTemplate={() => window.history.back()}
          onSubmit={() => handlePages(String(id))}
          onSubmitLoading={
            createPageMutation.isPending || updatePageMutation.isPending
          }
          isEditMode={isEditMode}
          isSubmitDisabled={
            !pages.translation.title ||
            pages.translation.title.trim().length === 0
          }
        />
      </div>
      {isLivePreview ? (
        <>
          <PageLivePreview />
        </>
      ) : (
        <>
          <div className="grid grid-cols-12  xl:gap-sp30 lg:gap-sp16 gap-sp9 container">
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
                    value={pages.translation.title || ""}
                    onChange={(e) => dispatch(setPageTitle(e.target.value))}
                    placeholder="Enter Title Here..."
                    className="md:pb-4 pb-1 border-b-0.5 md:text-base text-sm border-primary w-full focus-within:outline-none"
                  />
                </div>
                {/* <div className="">
                  <label
                    htmlFor="summary"
                    className="block font-medium md:text-base text-sm  w-full md:mb-2 mb-1"
                  >
                    Overview
                  </label>
                  <textarea
                    id="summary"
                    value={pages.translation.description || ""}
                    onChange={(e) => dispatch(setPageSummary(e.target.value))}
                    placeholder="Enter Overview Here..."
                    className="md:p-4 p-2 border-0.5 border-primary rounded-2xl   h-sp70 md:text-base text-sm resize-none w-full focus-within:outline-none"
                  ></textarea>
                </div> */}
                <div className="lg:flex  items-center w-full md:gap-4 my-4 md:mt-9">
                  <div className="lg:flex  items-center md:gap-14">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="create-in-draft"
                        checked={isIndividualPage}
                        onChange={(e) =>
                          handleIndividualPageChange(e.target.checked)
                        }
                        className="peer hidden"
                      />
                      <label
                        htmlFor="create-in-draft"
                        className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
           peer-checked:bg-black peer-checked:border-black"
                      >
                        {isIndividualPage && (
                          <img src={correctIcon} alt="Right" />
                        )}
                      </label>
                      <label
                        htmlFor="create-in-draft"
                        className="md:text-base text-sm w-max font-medium capitalize"
                      >
                        Individual Page
                      </label>
                    </div>

                    <div className="flex items-center gap-2 ">
                      <input
                        type="checkbox"
                        id="create-without-publishing"
                        checked={isNestedPage}
                        onChange={(e) =>
                          handleNestedPageChange(e.target.checked)
                        }
                        className="peer hidden"
                      />
                      <label
                        htmlFor="create-without-publishing"
                        className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
           peer-checked:bg-black peer-checked:border-black"
                      >
                        {isNestedPage && <img src={correctIcon} alt="Right" />}
                      </label>
                      <label
                        htmlFor="create-without-publishing"
                        className="md:text-base text-sm w-max font-medium capitalize"
                      >
                        Nested Page
                      </label>
                    </div>
                  </div>
                  <div className="w-full lg:my-0 my-2 flex justify-end pageCreate">
                    <TreeSelect
                      value={selectedPage?.value ?? ""}
                      options={treePageOptions}
                      // onChange={(e) => {
                      //   setSelectedPage(e.value);
                      //   dispatch(setPageParentId(e.value));
                      // }}
                      onChange={handlePageChange}
                      placeholder="Select Page"
                      className="w-2/3 custom-tree-select shadow-none"
                      disabled={!isNestedPage}
                    />
                    {/* <Select
                  options={pageOption}
                  styles={customStyles}
                  className="w-2/3"
                  placeholder=""
                  isDisabled={!isNestedPage}
                  value={selectedPage}
                  onChange={handlePageChange}
                  onInputChange={(inputValue) => {
                    setPageSearchInput(inputValue);
                  }}
                /> */}
                  </div>

                </div>
                {/* <div className="flex items-center justify-end">
                  <ToggleSwitch
                    checked={heroMediaPreview}
                    onChange={() => setHeroMediaPreview(!heroMediaPreview)}
                    label="Hero Preview"
                    disabled={pages?.hero_media.length === 0}
                  />
                </div> */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="mb-5 col-span-3">
                    <label className="block md:text-base/4 text-sm mb-2 font-medium">
                      Hero Banner Type
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
                        value={pages.hero_type || ""}
                        onChange={(e) =>
                          dispatch(setPageHeroType(e.target.value))
                        }
                      >
                        <option value="home">Home</option>
                        <option value="players">Players</option>
                        <option value="tournaments">Tournaments</option>
                        <option value="press">Press</option>
                      </select>
                      <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                        <img src={chevronDown} />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="block md:text-base/4 text-sm mb-2 font-medium">
                      Plat Form type
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
                        value={pages.platform_type || ""}
                        onChange={(e) => dispatch(setPageType(e.target.value))}
                      >
                        <option value="web">Web</option>
                        <option value="app">App</option>
                      </select>
                      <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                        <img src={chevronDown} />
                      </div>
                    </div>
                  </div>
                </div>

                {heroMediaPreview ? (
                  <>
                    <HeroMediaPreview
                      data={pages.hero_media}
                      title={pages.translation.title}
                      description={pages.translation.description}
                    />
                  </>
                ) : (
                  <>
                    {/* <div>
                      <p className="block font-medium md:text-base text-sm w-full  md:mb-2 mb-1">
                        Hero Media<sup>*</sup>
                      </p>

                      <div className="lg:flex gap-3 mb-4">
                        <div className="flex md:gap-6 gap-3 ">
                          {pageMediaOptions.map(({ type, label, icon }) => (
                            <Button
                              key={type}
                              text={label}
                              icon={icon}
                              iconPosition="start"
                              backgroundColor={
                                selectedMediaType === type
                                  ? "primary"
                                  : "transparent"
                              }
                              onClick={() => handleSelectMediaType(type)}
                              className={`md:py-3 py-3 w-sp212 justify-start md:px-4 px-3 border-0.5 border-primary`}
                            />
                          ))}
                        </div>
                        <div
                          className="relative lg:w-1/4 ml-auto lg:my-0 my-2 w-full"
                          ref={dropdownRef}
                        >
                          <div
                            className={`border border-primary rounded-xl px-3 py-2 cursor-pointer flex justify-between items-center transition-all duration-200 ${
                              !selectedMediaType
                                ? "opacity-50 pointer-events-none"
                                : ""
                            }`}
                            onClick={() =>
                              selectedMediaType && setIsOpen(!isOpen)
                            }
                          >
                            <span className="md:text-base text-sm">
                              {currentCount
                                ? `${currentCount} ${
                                    selectedMediaType === "image"
                                      ? "images"
                                      : "videos"
                                  }`
                                : "Select count"}
                            </span>
                            <svg
                              className={`w-4 h-4 transform transition-transform duration-200 ${
                                isOpen ? "rotate-180" : "rotate-0"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>

                          <div
                            className={`absolute z-10 w-full bg-white border border-primary rounded-xl mt-1 p-1 shadow-lg transition-all duration-200 origin-top transform ${
                              isOpen
                                ? "scale-100 opacity-100"
                                : "scale-95 opacity-0 pointer-events-none"
                            }`}
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div
                                key={num}
                                className={`px-4 py-2 text-sm md:text-base cursor-pointer rounded-xl mb-1 hover:bg-primary hover:text-black transition-colors ${
                                  currentCount === num
                                    ? "bg-primary text-black"
                                    : ""
                                }`}
                                onClick={() => handleSelect(num)}
                              >
                                {num}{" "}
                                {selectedMediaType === "image"
                                  ? "images"
                                  : "videos"}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {selectedMediaType === "image" && (
                        <>
                          <div className="grid grid-cols-5 gap-5">
                            {pages.hero_media
                              .filter(
                                (item: any) => item.media_type === "image"
                              )
                              .map((media) => (
                                <PageImageMedia
                                  key={media.sort_order}
                                  sortOrder={media.sort_order}
                                  media={media}
                                />
                              ))}
                          </div>
                        </>
                      )}

                      {selectedMediaType === "video" && (
                        <>
                          {pages.hero_media
                            .filter((item) => item.media_type === "video")
                            .map((media) => (
                              <PageVideoMedia
                                key={media.sort_order}
                                sortOrder={media.sort_order}
                                media={media}
                              />
                            ))}
                        </>
                      )}
                    </div> */}

                    <div className="mt-2">
                      <p className="block font-medium md:text-base text-sm w-full  md:mb-2 mb-1">
                        Feature Media<sup>*</sup>
                      </p>
                      <div className="grid grid-cols-12 gap-2">
                        {/* COLUMN 1 */}
                        <div className="col-span-1">
                          <div className="h-sp100 w-full flex flex-col gap-2">
                            {/* Image Button */}
                            <div
                              className="h-1/2 border-0.5 rounded-xl border-primary
                   flex items-center justify-center
                   cursor-pointer relative group"
                              onClick={() => handleHeroMedia("image")}
                            >
                              <img src={mediaIcon} alt="imageIcon" />
                              <PlusIcon size={15} />

                              <span
                                className="absolute -top-5 left-1/2 -translate-x-1/2
                         bg-black text-white text-xs px-2 py-1 rounded
                         hidden group-hover:block transition
                         whitespace-nowrap"
                              >
                                Image
                              </span>
                            </div>

                            {/* Video Button */}
                            <div
                              className="h-1/2 border-0.5 rounded-xl border-primary
                   flex items-center justify-center
                   cursor-pointer relative group"
                              onClick={() => handleHeroMedia("video")}
                            >
                              <img src={videosIcon} alt="videoIcon" />
                              <PlusIcon size={15} />

                              <span
                                className="absolute -top-5 left-1/2 -translate-x-1/2
                         bg-black text-white text-xs px-2 py-1 rounded
                         hidden group-hover:block transition
                         whitespace-nowrap"
                              >
                                Video
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* COLUMN 2 */}
                        <div className="col-span-1">
                          <div className="h-sp100 w-full flex flex-col gap-2">
                            {/* News Button */}
                            <div
                              className="h-1/2 border-0.5 rounded-xl border-primary
                   flex items-center justify-center
                   cursor-pointer relative group"
                              onClick={() => handleHeroMedia("news")}
                            >
                              <img src={newsIcon} alt="newsIcon" />
                              <PlusIcon size={15} />

                              <span
                                className="absolute -top-5 left-1/2 -translate-x-1/2
                         bg-black text-white text-xs px-2 py-1 rounded
                         hidden group-hover:block transition
                         whitespace-nowrap"
                              >
                                News
                              </span>
                            </div>

                            {/* Video Button */}
                            <div
                              className="h-1/2 border-0.5 rounded-xl border-primary
                   flex items-center justify-center
                   cursor-pointer relative group"
                              onClick={() => handleHeroMedia("highlight")}
                            >
                              <PiVideo size={18} />
                              <PlusIcon size={15} />

                              <span
                                className="absolute -top-5 left-1/2 -translate-x-1/2
                         bg-black text-white text-xs px-2 py-1 rounded
                         hidden group-hover:block transition
                         whitespace-nowrap"
                              >
                                Highlight
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* HERO MEDIA GRID */}
                        <div className="col-span-10">
                          <HeroMediaGrid
                            pages={pages}
                            updateMediaOrder={(updated: any) =>
                              dispatch(updateHeroMediaOrder(updated))
                            }
                          />
                          {/* <div className="grid grid-cols-5 gap-2">
                            {pages.hero_media.map((media) => {
                              if (media.media_type == "image") {
                                return (
                                  <PageImageMedia
                                    key={media.sort_order}
                                    sortOrder={media.sort_order}
                                    media={media}
                                  />
                                );
                              } else {
                                return (
                                  <PageVideoMedia
                                    key={media.sort_order}
                                    sortOrder={media.sort_order}
                                    media={media}
                                  />
                                );
                              }
                            })}
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </>
                )}

              <div className="mt-5">
                <HeroMediaDesignMode
                  heroDesignState={pages.hero_design}
                  onDesignStateChange={(state) =>
                    dispatch(setHeroDesignState(state))
                  }
                  formContent={
                    <>
                      <div className="flex items-center justify-end">
                        {/* <ToggleSwitch
                          checked={heroMediaPreview}
                          onChange={() => setHeroMediaPreview(!heroMediaPreview)}
                          label="Hero Preview"
                        /> */}
                      </div>
                      {heroMediaPreview ? (
                        <>
                          <HeroMediaPreview
                            data={pages.hero_media}
                            title={pages.translation.title}
                            description={pages.translation.description}
                          />
                        </>
                      ) : (
                        <>


                        </>
                      )}
                    </>
                  }
                />
                </div>
                   </div>

              <MetaData metadata={pages.metadata} onChange={handleChange} />

              <div className="mt-5">
                <FieldsAndBlocks
                  tabs={PageTABS}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onItemClick={(type) => handleAddBlock(type)}
                />
              </div>

              <div className="mt-5 flex flex-col gap-5">
                {showLoader || (isEditMode && !pageDataById?.data) ? (
                  <LoaderOverlay show={true} text="Fetching Data..." />
                ) : (
                  <>
                    {renderSelectedComponents()}
                    {blocks.length > 0 && (
                      <div className="mt-2">
                        <InsertButton
                          onItemClick={(type) => handleAddBlock(type)}
                          module="page"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 col-span-2 ">
              <ContentPanel
                data={pages}
                // onAuthsave={(payload) =>
                //   dispatch(setPageAuthentication(payload))
                // }
                // onGeoSave={(payload) =>
                //   dispatch(setPageGeoBlockContent(payload))
                // }
                // onReadSave={(payload) => dispatch(setPageReadTime(payload))}
                // onAuthorSave={(payload) => dispatch(setPageAuthorInfo(payload))}
                onPublishSave={(payload) =>
                  dispatch(setPagePublishContent(payload))
                }
                // onHierarchySave={(payload) =>
                //   dispatch(setPageHierarchyContent(payload))
                // }
                // onSponsorSave={(payload) =>
                //   dispatch(setPageSponsorContent(payload))
                // }
                // onLanguageSave={() => {}}
              />
            </div>
            {isOpen && activeIndex !== null && (
              <BlockSettings
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                index={activeIndex}
                block={blocks[activeIndex]}
                onChangeBlock={(updatedBlock: any, index: number) => {
                  dispatch(PageUpdateBlockContent({ index, updatedBlock }));
                }}
                dispatch={dispatch}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePages;
