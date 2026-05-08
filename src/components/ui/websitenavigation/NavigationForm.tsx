import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Select from "react-select";
import { TreeSelect } from "primereact/treeselect";

import { normalizeNavigationResponse } from "./normalizers/normalizeNavigation";
import { selectLanguage } from "../../../redux-toolkit/languageSlice";
import {
  resetNavigation,
  selectNavigation,
  setDisplayOn,
  setExternalId,
  setFullNavigation,
  setMenuUrl,
  setModule,
  setNavigationIcon,
  setNavigationName,
  setParentId,
  setType,
  updateContentField,
} from "../../../redux-toolkit/navigationSlice";
import api from "../../../lib/api";
import toast from "react-hot-toast";
import BuilderHeader from "../builderHeader/BuilderHeader";
import Input from "../input/Input";
import { customStyles } from "../../account-settings/CreateCategories";
// import { env } from "../../../config/env";
// import { closeIcon, mediaIcon, plusIcon } from "../../../icons";
// import Button from "../button";
// import { mediaOptions } from "../../heroMedia/navigationHeroMedia/navigationMediaOptionConfig";
import ContentLibrary from "../../contentPanel/ContentLibrary";
import {
  useCreateNavigation,
  useUpdateNavigation,
} from "../../../hooks/useNavigation";
import { useScroll } from "../../../hooks/ScrollContext";

// --- Types ---
interface TreeNode {
  key: string;
  label: string;
  children?: TreeNode[];
  selectable?: boolean;
  data?: any;
}

// --- Constants ---
const MENU_TYPES = [
  { value: "button", label: "Button" },
  { value: "link", label: "Link" },
  { value: "dropdown", label: "Dropdown" },
];
const displayonOptions = [
  { value: "header", label: "Header" },
  { value: "footer", label: "Footer" },
];

const MODULE_TYPES = [{ value: "page", label: "Page" }];

// const DEFAULT_LANG = "en";

// --- Transformations ---
const transformPagesToTreeNodes = (pages: any[]): TreeNode[] => {
  return pages.map((page) => ({
    key: String(page.id),
    label: page.title,
    displayOn: page.display_on,
    children: page.children ? transformPagesToTreeNodes(page.children) : [],
  }));
};

// --- Main Component ---
export default function CreateWebsiteNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isScrolled } = useScroll();
  const { id } = useParams() as any;
  const language = useSelector(selectLanguage);
  const isEditMode = Boolean(id);
  const navigation = useSelector(selectNavigation) as any;
  const [activeMediaUrl, setActiveMediaUrl] = useState<string | null>(null);
  const [selectedPages, setSelectedPages] = useState<string | null>(null);
  const [selectedModules, setSelectedModules] = useState<string | null>(null);
  const [selectedListType, setSelectedListType] = useState<string | null>(null);
  const [selectedParent, setSelectedParent] = useState<TreeNode | null>(
    null,
  ) as any;
  const [selectedDisplayOn, setSelectedDisplayOn] = useState<TreeNode | null>(
    null,
  ) as any;
  // const [selectedMediaType, setSelectedMediaType] = useState<string | null>(
  //   null,
  // );

  const { mutate: createNavigation, isPending: createNavigationPanding } =
    useCreateNavigation(navigation);
  const { mutate: updateNavigationList, isPending: updatenamvigationPending } =
    useUpdateNavigation(navigation);

  const [searchParams] = useSearchParams();
  const languageCode = searchParams.get("lang") || language;

  const fetchNavigationById = async (id: string, languageCode?: string) => {
    return await api.get(`/menu/${id}`, {
      params: languageCode ? { language_code: languageCode } : {},
    });
  };

  // News Data By ID
  const { data: navigationDataById } = useQuery({
    queryKey: ["navigation", id, languageCode],
    queryFn: () => fetchNavigationById(id as string, languageCode || undefined),
    enabled: isEditMode,
  });

  // --- API: Fetch List Types ---
  const fetchTypeList = async () => {
    const params: any = { language_code: languageCode };
    if (selectedModules) params.type = selectedModules;
    return api.get("/menu/getTypeList", { params });
  };

  const { data: allTypes, refetch: fetchTypes } = useQuery({
    queryKey: ["allTypes", languageCode, selectedModules],
    queryFn: fetchTypeList,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    enabled: false,
  });

  const listOptions =
    allTypes?.data?.map((item: any) => ({
      value: item.id,
      label: item.title,
      slug: `${languageCode}/${item.slug}`,
      plainslug:item.slug
    })) || [];

  // --- API: Fetch Page Tree (Menu) ---
  const fetchMenus = async () => {
    const params: any = { language_code: languageCode };
    return api.get("/menu/getAllMenus", { params });
  };

  const { data: allMenusData } = useQuery({
    queryKey: ["allMenus", languageCode],
    queryFn: fetchMenus,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });

  const treePageOptions: TreeNode[] = allMenusData?.data
    ? transformPagesToTreeNodes(allMenusData.data)
    : [];

  // --- Handlers ---
  // const handleInputChange = (key: string, value: string) => {
  //   dispatch(updateContentField({ key, value }));
  //   setErrors(errs => ({ ...errs, [key]: "" }));
  // };

  const handleSelectImage = (url: string) => {
    if (activeMediaUrl === "imgUrl") {
      dispatch(setNavigationIcon(url));
    }
    setActiveMediaUrl(null);
  };

  // const handleSelectMediaType = (type: string) => {
  //   setSelectedMediaType(type);
  //   dispatch(updateContentField({ key: "media_type", value: type }));
  // };

  const handleSelectChange = (
    selected: any,
    type: "page" | "module" | "pageslistType" | "displayon",
  ) => {
    const value = selected?.value || "";
    const label = selected?.label || "";
    const slug = selected?.slug || "";

    switch (type) {
      case "page":
        setSelectedPages(value);
        dispatch(setType(value));

        // 🔥 RESET RELATED STATES WHEN MENU TYPE CHANGES
        setSelectedModules(null);
        setSelectedListType(null);

        dispatch(setModule(""));
        dispatch(setExternalId(""));
        dispatch(updateContentField({ key: "id", value: "" }));
        dispatch(updateContentField({ key: "slug", value: "" }));
        dispatch(updateContentField({ key: "title", value: "" }));
        dispatch(setMenuUrl(""));

        break;

      case "module":
        setSelectedModules(value);
        dispatch(setModule(value));
        break;

      case "displayon":
        setSelectedDisplayOn(value);
        dispatch(setDisplayOn(value || ""));
        break;

      case "pageslistType":
        setSelectedListType(value);
        // Update navigation content fields correctly
        dispatch(updateContentField({ key: "id", value }));
        dispatch(updateContentField({ key: "slug", value: slug || value }));
        dispatch(updateContentField({ key: "title", value: label }));
        dispatch(setExternalId(value));
        break;

      default:
        break;
    }
  };

  const findPageById = (items: any[], id: number): any => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children?.length) {
        const found = findPageById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleParentChange = (e: any) => {
    const selected = typeof e.value === "string" ? Number(e.value) : e.value;
    const parent = findPageById(allMenusData?.data || [], selected);
    setSelectedParent(selected);
    dispatch(setParentId(selected));
    dispatch(setDisplayOn(parent?.display_on || ""));
  };
  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const handleSave = () => {

    if (!navigation?.translation?.title?.trim()) {
      toast.error("Please enter a navigation name");
      return;
    }

    // ✅ LINK VALIDATION
    if (selectedPages === "link") {
      const url = navigation?.translation?.menu_url?.trim();

      if (!url) {
        toast.error("Please enter a link URL");
        return;
      }

      if (!isValidUrl(url)) {
        toast.error("Please enter a valid URL (https://...)");
        return;
      }
    } // ✅ BUTTON → MODULE VALIDATION
    if (selectedPages === "button") {
      if (!selectedModules) {
        toast.error("Please select a module");
        return;
      }

      if (!selectedListType) {
        toast.error("Please select a page");
        return;
      }
    }

    if (
      navigation?.parent_id === null &&
      (!navigation?.display_on || navigation?.display_on.trim() === "")
    ) {
      toast.error("Please select a parent page or display location");
      return;
    }

    if (isEditMode) {
      updateNavigationList(id);
    } else {
      createNavigation();
    }
  };

  useEffect(() => {
    if (selectedModules) {
      fetchTypes(); // fetch only when needed
    }
  }, [selectedModules]);

  // const handleOnClose = () => {
  //   setSelectedMediaType(null);

  //   // Deep clone so no frozen objects remain
  //   const temp = JSON.parse(JSON.stringify(navigation));

  //   const removekeys = [
  //     "media_type",
  //     "hero_image_url",
  //     "hero_video_url",
  //     "hero_video_source",
  //     "hero_thumbnail_url",
  //   ];

  //   // Ensure path exists
  //   if (temp?.translation?.content) {
  //     removekeys.forEach((key) => {
  //       delete temp.translation.content[key];
  //     });
  //   }

  //   dispatch(setFullNavigation(temp));
  // };

  // const commonMediaProps = {
  //   onClose: handleOnClose,
  //   isNavigation: true,
  // };

  // const imageMediaProps = {
  //   ...commonMediaProps,
  //   imageUrl: navigation.translation.content?.hero_image_url,
  //   navigation_title: navigation.translation.content?.navigation_title || "",
  //   buttonTitle: navigation.translation.content?.button_title || "",
  //   buttonUrl: navigation.translation.content?.button_url || "",
  //   onUrlChange: (url: string) =>
  //     dispatch(updateContentField({ key: "hero_image_url", value: url })),
  //   onTitleChange: (value: string) =>
  //     dispatch(updateContentField({ key: "navigation_title", value })),
  //   onButtonTitleChange: (value: string) =>
  //     dispatch(updateContentField({ key: "button_title", value })),
  //   onButtonUrlChange: (value: string) =>
  //     dispatch(updateContentField({ key: "button_url", value })),
  // };

  // dispatch(updateContentField({ key: "id", value }));

  // const videoMediaProps = {
  //   ...commonMediaProps,

  //   videoUrl: navigation?.translation?.content?.hero_video_url || "",
  //   videoSource: navigation?.translation?.content?.hero_video_source || "",
  //   videoThumbnailUrl:
  //     navigation?.translation?.content?.hero_thumbnail_url || "",
  //   navigation_title: navigation?.translation?.content?.navigation_title || "",
  //   buttonTitle: navigation?.translation?.content?.button_title || "",
  //   buttonUrl: navigation?.translation?.content?.button_url || "",
  //   onUrlChange: (url: string) => {
  //     if (!navigation?.translation?.content) return; // <-- SAFE GUARD
  //     dispatch(updateContentField({ key: "hero_video_url", value: url }));
  //   },

  //   onThumbnailUrlChange: (url: string) => {
  //     if (!navigation?.translation?.content) return; // <-- SAFE GUARD
  //     dispatch(updateContentField({ key: "hero_thumbnail_url", value: url }));
  //   },

  //   onTypeChange: (type: string) => {
  //     if (!navigation?.translation?.content) return; // <-- SAFE GUARD
  //     dispatch(updateContentField({ key: "hero_video_source", value: type }));
  //   },
  //   onTitleChange: (value: string) => {
  //     if (!navigation?.translation?.content) return;
  //     dispatch(updateContentField({ key: "navigation_title", value }));
  //   },

  //   onButtonTitleChange: (value: string) => {
  //     if (!navigation?.translation?.content) return;
  //     dispatch(updateContentField({ key: "button_title", value }));
  //   },

  //   onButtonUrlChange: (value: string) => {
  //     if (!navigation?.translation?.content) return;
  //     dispatch(updateContentField({ key: "button_url", value }));
  //   },
  // };

  useEffect(() => {
    dispatch(resetNavigation());
    if (isEditMode && navigationDataById?.data) {
      const normalizedNavigation = normalizeNavigationResponse(
        navigationDataById?.data,
        languageCode,
      );
      setSelectedParent(normalizedNavigation?.parent_id);
      setSelectedListType(normalizedNavigation?.translation?.content?.id);
      setSelectedModules(normalizedNavigation?.module_type);
      setSelectedPages(normalizedNavigation?.type);
      setSelectedDisplayOn(normalizedNavigation?.display_on);
      // setSelectedMediaType(
      //   normalizedNavigation?.translation?.content?.media_type,
      // );
      dispatch(setFullNavigation(normalizedNavigation));
    }
  }, [navigationDataById]);

  // --- Render ---
  return (
    <div>
      {/* Header */}
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Navigation Builder"
          isToggleVisible
          onSaveTemplateTitle="Back"
          onSaveTemplate={() => navigate("/navigation")}
          onSubmit={handleSave}
          onSubmitLoading={createNavigationPanding || updatenamvigationPending}
          isEditMode={isEditMode}
        />
      </div>
      {/* Main Card */}
      <div className="container">
        <div className=" bg-white p-5 rounded-2xl border-0.5 border-primary">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3">
              <Input
                label="Navigation Name"
                placeholder="Enter Navigation Name"
                value={navigation?.translation?.title || ""}
                onChange={(e) => dispatch(setNavigationName(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <label className="block md:text-base text-sm font-medium">
                Parent Select
              </label>
              <TreeSelect
                value={selectedParent}
                options={treePageOptions}
                onChange={handleParentChange}
                placeholder="Select Page"
                className="w-2/3 custom-tree-select shadow-none"
                showClear
              />
            </div>
          </div>
          {!selectedParent && (
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-3">
                <label className="block font-medium">Display On</label>
                <Select
                  options={displayonOptions}
                  value={displayonOptions.find(
                    (p) => p.value === selectedDisplayOn,
                  )}
                  styles={customStyles}
                  placeholder="Select"
                  onChange={(s) => handleSelectChange(s, "displayon")}
                  isClearable={true}
                />
              </div>
            </div>
          )}

          {selectedParent && (
            <>
              {/* Icon Section */}
              {/* <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                  <div className="md:w-sp170 w-20 h-full bg-black rounded-2xl relative">
                    {navigation?.translation?.icon_url ? (
                      <img
                        src={
                          navigation?.translation?.icon_url.startsWith("http")
                            ? navigation?.translation?.icon_url
                            : env.IMAGE_URL + navigation?.translation?.icon_url
                        }
                        className="w-full absolute h-full object-contain p-2 rounded-2xl border-0.5 border-primary"
                      />
                    ) : (
                      <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                        <img src={mediaIcon} alt="Placeholder" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <Input
                      label="Icon Image URL"
                      readOnly
                      value={
                        navigation?.translation?.icon_url
                          ? navigation?.translation?.icon_url.startsWith("http")
                            ? navigation?.translation?.icon_url
                            : env.IMAGE_URL + navigation?.translation?.icon_url
                          : ""
                      }
                    />
                    {navigation?.translation?.icon_url ? (
                      <Button
                        text="Remove Image"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        onClick={() => dispatch(setNavigationIcon(""))}
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Image"
                        backgroundColor="transparent"
                        onClick={() => setActiveMediaUrl("imgUrl")}
                      />
                    )}
                  </div>
                </div>
              </div> */}

              {/* Menu, Module, ListType */}
              <div className="grid grid-cols-2 gap-2">
                <div className="mt-3">
                  <label className="block font-medium">Menu Type</label>
                  <Select
                    options={MENU_TYPES}
                    value={MENU_TYPES.find((p) => p.value === selectedPages)}
                    styles={customStyles}
                    placeholder="Select"
                    onChange={(s) => handleSelectChange(s, "page")}
                    isClearable={true}
                  />
                </div>
                <div className="mt-3">
                  {selectedPages === "link" ? (
                    <Input
                      label="Link"
                      inputCss="p-2.5"
                      value={navigation.translation.menu_url || ""}
                      placeholder="https://www.example.com"
                      onChange={(e) => dispatch(setMenuUrl(e.target.value))}
                    />
                  ) : selectedPages === "button" ? (
                    <>
                      <label className="block font-medium">Module</label>
                      <Select
                        options={MODULE_TYPES}
                        value={MODULE_TYPES.find(
                          (p) => p.value === selectedModules,
                        )}
                        styles={customStyles}
                        placeholder="Select Module"
                        onChange={(s) => handleSelectChange(s, "module")}
                        isClearable={true}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {selectedModules && selectedPages === "button" && (
                  <div className="mt-3 col-span-2">
                    <label className="block font-medium">Select Pages</label>
                    <Select
                      options={listOptions}
                      value={listOptions.find(
                        (p: any) => p.value === selectedListType,
                      )}
                      styles={customStyles}
                      placeholder="Select"
                      onChange={(s) => handleSelectChange(s, "pageslistType")}
                      isClearable={true}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          {/* {selectedPages === "button" && (
            <div>
              <p className="block font-medium md:text-base text-sm w-full my-2 ">
                Navigation Media
              </p>
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
          )} */}
        </div>
      </div>

      {/* Media Library */}
      {activeMediaUrl && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          uploadType="block"
          onSelect={handleSelectImage}
          mediaFilter="image"
        />
      )}
    </div>
  );
}
