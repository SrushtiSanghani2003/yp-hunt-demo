import { useEffect, useMemo, useRef, useState } from "react";
// import { capitalize } from "../../config/function";
import {
  chevronDown,
  closeIcon,
  // correctIcon,
  // globeIcon,
  mediaIcon,
  plusIcon,
} from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import ContentLibrary from "../contentPanel/ContentLibrary";
// import { IconPicker } from "./IconPicker";
import api from "../../lib/api";
// import { limit } from "jodit/esm/plugins/limit/limit";
import { useInfiniteQuery } from "@tanstack/react-query";
// import ToggleSwitch from "../ui/switch/ToggleSwitch";
// import CustomSelect from "../ui/customSelect/CustomSelect";
import { TreeSelect } from "primereact/treeselect";
import { useDebounce } from "../../hooks/useDebounce";
import type { TreeNode } from "primereact/treenode";
import { concatImgURL } from "../../config/function";

type Props = {
  moreFields: any;
  currentBlock: any;
  onChangeBlock: any;
  setMoreFields: any;
};

const MoreFieldsRenderer = ({
  moreFields,
  currentBlock,
  onChangeBlock,
  setMoreFields,
}: Props) => {
  const [activeMediaUrl, setActiveMediaUrl] = useState<null | string>(null);
  // const checkBoxID = useId();
  // const [moduleData, setModuleData] = useState<any>([]);
  // const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectedPage, setSelectedPage] = useState<{
    value: any;
    label: any;
  } | null>(null);
  const treeSelectRef = useRef<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const selectedModule = useMemo(
    () => currentBlock?.content?.more?.cta?.module || "",
    [currentBlock]
  );

  const getPages = async ({ page = 1, search }: any) => {
    const params: any = {
      limit: 50,
      page,
    };
    if (search) {
      params.search = search;
    }
    return await api.get("/pages", { params });
  };

  const getNews = async ({ page = 1, search }: any) => {
    const params: any = {
      limit: 20,
      page,
    };
    if (search) {
      params.title = search;
    }
    return await api.get("/news", { params });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }: // isLoading,
  any = useInfiniteQuery({
    queryKey: ["moduleData", selectedModule, debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      selectedModule === "page"
        ? getPages({ page: pageParam, search: debouncedSearch })
        : getNews({ page: pageParam, search: debouncedSearch }),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = lastPage?.data?.page ?? allPages.length;
      const totalPages = lastPage?.data?.totalPages;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: selectedModule !== "modal",
    select: (res) => {
      return res.pages.flatMap((page) => {
        return selectedModule === "page"
          ? page?.data?.pages || []
          : page?.data?.news || [];
      });
    },
  });
  const transformPagesToTreeNodes = (data: any[]): TreeNode[] => {
    return data.map((page) => ({
      key: page.id,
      label: page.title,
      data: { slug: page.slug },
      children: page.children
        ? transformPagesToTreeNodes(page.children)
        : undefined,
    }));
  };

  let treePageOptions: TreeNode[] = [];

  if (selectedModule === "modal") {
    treePageOptions = [
      {
        key: "sign-up",
        label: "Sign Up",
        data: { slug: "sign-up" },
      },
    ];
  } else {
    treePageOptions = data ? transformPagesToTreeNodes(data) : [];

    if (hasNextPage) {
      treePageOptions.push({
        key: "load-more",
        label: isFetchingNextPage ? "Loading..." : "Load more",
        data: { isLoadMore: true },
      });
    }
  }

  // useEffect(() => {
  //   if (selectedModule && data) {
  //     setModuleData(data);
  //   }
  //   if (selectedModule == "modal") {
  //     setModuleData([{ slug: "sign-up", title: "Sign Up" }]);
  //     setSelectedOption({ slug: "sign-up", title: "Sign Up" });
  //     handleMoreFieldChange("cta.slug", "sign-up");
  //   }
  // }, [selectedModule, data]);
  const handleMoreFieldChange = (path: string, value: string | boolean) => {
    const pathParts = path.split(".");
    const updatedContent = { ...currentBlock.content };
    const more = { ...(updatedContent.more || {}) };

    let newMore = { ...more };
    let pointer = newMore;

    // Navigate and clone nested structure
    for (let i = 0; i < pathParts.length - 1; i++) {
      const key = pathParts[i];
      pointer[key] = { ...(pointer[key] || {}) };
      pointer = pointer[key];
    }

    // Set the main value
    pointer[pathParts[pathParts.length - 1]] = value;

    // 🧠 Extra logic: if target_is_blank changes, reset button_link
    if (path.endsWith("target_is_blank")) {
      const buttonLinkPath = path.replace("target_is_blank", "button_link");

      // Navigate again and clear button_link
      const buttonPathParts = buttonLinkPath.split(".");
      let btnPointer = newMore;
      for (let i = 0; i < buttonPathParts.length - 1; i++) {
        const key = buttonPathParts[i];
        btnPointer[key] = { ...(btnPointer[key] || {}) };
        btnPointer = btnPointer[key];
      }
      btnPointer[buttonPathParts[buttonPathParts.length - 1]] = "";
    }

    updatedContent.more = newMore;

    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  // const handleMoreFieldChange = (path: string, value: string | boolean) => {
  //   const pathParts = path.split(".");

  //   const updatedContent = { ...currentBlock.content };
  //   const more = { ...(updatedContent.more || {}) };

  //   let newMore = { ...more };
  //   let pointer = newMore;

  //   for (let i = 0; i < pathParts.length - 1; i++) {
  //     const key = pathParts[i];
  //     pointer[key] = { ...(pointer[key] || {}) }; // ensure a new object is created
  //     pointer = pointer[key];
  //   }

  //   pointer[pathParts[pathParts.length - 1]] = value;

  //   updatedContent.more = newMore;

  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: updatedContent,
  //   });
  // };

  const handleRemoveField = (type: string) => {
    setMoreFields((prev: any) => prev.filter((field: string) => field != type));
    if (currentBlock && currentBlock.content && currentBlock.content.more) {
      const updatedMore = { ...currentBlock.content.more };
      delete updatedMore[type];

      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          more: updatedMore,
        },
      });
    }
  };

  useEffect(() => {
    if (currentBlock?.content?.more?.cta?.slug && treePageOptions.length) {
      const matchingNode = treePageOptions.find(
        (node: any) =>
          node?.data?.slug == currentBlock?.content?.more?.cta?.slug
      );
      if (matchingNode) {
        setSelectedPage({
          value: matchingNode.key,
          label: matchingNode.label,
        });
      }
    }
  }, []);

  const uploadTypeMap: Record<string, string> = {
    imgUrl: "block",
    sponsor_img: "sponsor",
    thumbnailUrl: "thumbnail",
  };
  return (
    <>
      <div className="md:mt-5 mt-2 relative">
        {moreFields.includes("title") && (
          <div className="relative mb-3 p-3">
            <Input
              label="Title"
              placeholder="Enter Title"
              className="m-0 md:text-base/4 text-sm font-medium"
              value={currentBlock.content?.more?.title ?? ""}
              onChange={(e) => handleMoreFieldChange("title", e.target.value)}
            />
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="absolute right-0 md:-top-2 top-0 p-0 w-4"
              onClick={() => handleRemoveField("title")}
            />
          </div>
        )}

        {moreFields.includes("description") && (
          <div className="relative mb-3 p-3">
            <label
              htmlFor="desc"
              className="block md:text-base/4 text-sm mb-2 font-medium"
            >
              Description
            </label>
            <textarea
              id="desc"
              placeholder="Enter Description"
              className="w-full p-3 text-base border-0.5 border-primary rounded-2xl pr-10 resize-none"
              rows={2}
              value={currentBlock.content?.more?.description ?? ""}
              onChange={(e) =>
                handleMoreFieldChange("description", e.target.value)
              }
            />
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="absolute right-0 md:-top-2 top-0 p-0 w-4"
              onClick={() => handleRemoveField("description")}
            />
          </div>
        )}

        {moreFields.includes("altText") && (
          <div className="relative mb-3 p-3">
            <Input
              label="Alt Text"
              placeholder="Enter alt text"
              className="m-0 md:text-base/4 text-sm mb-2 font-medium"
              value={currentBlock.content?.more?.altText ?? ""}
              onChange={(e) => handleMoreFieldChange("altText", e.target.value)}
            />
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="absolute right-0 md:-top-2 top-0 p-0 w-4"
              onClick={() => handleRemoveField("altText")}
            />
          </div>
        )}

        {moreFields.includes("thumbnailUrl") && (
          <div className="relative mb-3 p-3">
            <label
              htmlFor="thumbnail"
              className="block md:text-base/4 text-sm mb-2 font-medium"
            >
              Thumbnail Image
            </label>
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
              <div className="md:w-sp170 w-20 h-full">
                {currentBlock.content?.more?.thumbnailUrl ? (
                  <img
                    src={concatImgURL(currentBlock.content?.more?.thumbnailUrl)}
                    alt="Uploaded"
                    className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                  />
                ) : (
                  <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                    <img src={mediaIcon} alt="Placeholder" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  label="Thumbnail URL"
                  placeholder="https://www.example.com"
                  className="m-0"
                  value={
                    concatImgURL(currentBlock.content?.more?.thumbnailUrl) ?? ""
                  }
                  onChange={(e) =>
                    handleMoreFieldChange("thumbnailUrl", e.target.value)
                  }
                />
                <div>
                  {currentBlock.content?.more?.thumbnailUrl ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => handleMoreFieldChange("thumbnailUrl", "")}
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => setActiveMediaUrl("thumbnailUrl")}
                    />
                  )}
                </div>
              </div>
            </div>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="absolute right-0 md:-top-2 top-0 p-0 w-4"
              onClick={() => handleRemoveField("thumbnailUrl")}
            />
          </div>
        )}

        {moreFields.includes("link") && (
          <div className="relative mb-3 p-3">
            <Input
              label="Link"
              placeholder="https://www.example.com"
              note="Note: Please include http:// or https:// in your link URL"
              className="m-0 font-medium"
              value={currentBlock.content?.more?.link ?? ""}
              onChange={(e) => handleMoreFieldChange("link", e.target.value)}
            />
            {/* <div className="flex items-center md:py-2 py-1 gap-2">
              <img src={globeIcon} alt="Globe icon" className="w-4 h-4" />
              <p className="font-semibold md:text-base/4 text-sm">
                URL Builder (Recommended)
              </p>
            </div> */}
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="absolute right-0 md:-top-2 top-0 p-0 w-4"
              onClick={() => handleRemoveField("link")}
            />
          </div>
        )}

        {moreFields.includes("sponsor") && (
          <div className="relative mb-3 p-3">
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
              <div className="md:w-sp170 w-20 h-full">
                {currentBlock.content?.more?.sponsor?.sponsor_img ? (
                  <img
                    src={concatImgURL(
                      currentBlock.content?.more?.sponsor?.sponsor_img
                    )}
                    alt="Uploaded"
                    className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                  />
                ) : (
                  <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                    <img src={mediaIcon} alt="Placeholder" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  label="Sponsor Image URL*"
                  placeholder="https://www.example.com"
                  className="m-0"
                  value={
                    concatImgURL(
                      currentBlock.content?.more?.sponsor?.sponsor_img
                    ) ?? ""
                  }
                  onChange={(e) =>
                    handleMoreFieldChange("sponsor.sponsor_img", e.target.value)
                  }
                />
                <div>
                  {currentBlock.content?.more?.sponsor?.sponsor_img ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="pb-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() =>
                        handleMoreFieldChange("sponsor.sponsor_img", "")
                      }
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      className="pb-0"
                      onClick={() => setActiveMediaUrl("sponsor.sponsor_img")}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex md:gap-5 gap-2 pt-4 items-end">
              <Input
                label="Sponsor Text"
                className="m-0 w-1/2"
                value={currentBlock.content?.more?.sponsor?.sponsor_name ?? ""}
                onChange={(e) =>
                  handleMoreFieldChange("sponsor.sponsor_name", e.target.value)
                }
              />
              <Input
                label="Sponsor Link URL"
                className="m-0 w-1/2"
                note="Note: Please include http:// or https:// in your link URL"
                placeholder="https://www.example.com"
                value={currentBlock.content?.more?.sponsor?.sponsor_url ?? ""}
                onChange={(e) =>
                  handleMoreFieldChange("sponsor.sponsor_url", e.target.value)
                }
              />
            </div>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="absolute right-0 md:-top-2 top-0 p-0 w-4"
              onClick={() => handleRemoveField("sponsor")}
            />
          </div>
        )}

        {moreFields.includes("cta") && (
          <div className="relative mb-3 p-3">
            <div className="grid grid-cols-12 items-end gap-5">
              <Input
                label="Button Text"
                className="m-0 col-span-6"
                value={currentBlock.content?.more?.cta?.button_label ?? ""}
                onChange={(e) =>
                  handleMoreFieldChange("cta.button_label", e.target.value)
                }
              />
              {/* <IconPicker
                className="col-span-2"
                value={currentBlock.content?.more?.cta?.button_icon ?? ""}
                onChange={(iconName) =>
                  handleMoreFieldChange("cta.button_icon", iconName)
                }
                onIconColorChange={(color) =>
                  handleMoreFieldChange("cta.icon_color", color)
                }
              /> */}
              {/* <div className="col-span-1 flex flex-col justify-between">
                <label
                  htmlFor={checkBoxID}
                  className="block md:mb-2 mb-2 font-medium md:text-base/4 text-sm"
                >
                  Direct Link
                </label>
                <ToggleSwitch
                  checked={currentBlock?.content?.more?.cta?.target_is_blank}
                  onChange={(checked) => {
                    handleMoreFieldChange("cta.target_is_blank", checked);
                    setSelectedPage(null);
                  }}
                />
              </div> */}
              {currentBlock.content?.more?.cta?.target_is_blank ? (
                <Input
                  label="Button Link URL"
                  // note="Note: Please include http:// or https:// in your link URL"
                  className={`m-0 ${
                    currentBlock.content?.more?.cta?.is_target_blank
                      ? "col-span-6"
                      : "col-span-6"
                  }`}
                  value={currentBlock.content?.more?.cta?.button_link ?? ""}
                  onChange={(e) =>
                    handleMoreFieldChange("cta.button_link", e.target.value)
                  }
                />
              ) : (
                <>
                  <div className="relative col-span-2">
                    <label
                      htmlFor={"module"}
                      className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm"
                    >
                      Module
                    </label>
                    <div className="relative">
                      <select
                        id="module"
                        value={currentBlock?.content?.more?.cta?.module || ""}
                        onChange={(e) =>
                          handleMoreFieldChange("cta.module", e.target.value)
                        }
                        className="appearance-none w-full md:p-2 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                      >
                        <option value="" disabled>
                          Select Module
                        </option>
                        <option value="page">Page</option>
                        <option value="news">News</option>
                        <option value="modal">Modal</option>
                      </select>
                      <div className="absolute md:right-4 right-2 top-1/2 -translate-y-1/2">
                        <img src={chevronDown} />
                      </div>
                    </div>
                  </div>
                  <div className="relative col-span-2">
                    <label
                      htmlFor={"moduleData"}
                      className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm"
                    >
                      Name
                    </label>
                    {/* <CustomSelect
                      options={moduleData?.map((item: any) => ({
                        value: item?.slug,
                        label: item?.title,
                      }))}
                      selectedModule={selectedModule}
                      selected={selectedOption}
                      onSelect={(item: any) => {
                        setSelectedOption(item);
                        handleMoreFieldChange("cta.slug", item?.value);
                      }}
                      fetchNextPage={fetchNextPage}
                      hasNextPage={hasNextPage}
                      isFetchingNextPage={isFetchingNextPage}
                      loading={isLoading}
                    /> */}
                    <TreeSelect
                      ref={treeSelectRef}
                      filter
                      value={selectedPage?.value ?? ""}
                      options={treePageOptions}
                      placeholder="Select Option"
                      className="w-full custom-tree-select shadow-none"
                      onFilterValueChange={(e) => {
                        setSearchValue(e.value);
                      }}
                      filterValue={searchValue}
                      onNodeSelect={(e) => {
                        if (
                          e.node.key === "load-more" ||
                          e.node.data?.isLoadMore
                        ) {
                          e.originalEvent.preventDefault();
                          e.originalEvent.stopPropagation();

                          fetchNextPage().then(() => {
                            // ✅ Reopen dropdown after loading more
                            setTimeout(() => {
                              const ref = treeSelectRef.current;
                              if (ref && typeof ref.show === "function") {
                                ref.show();
                              }
                              // treeSelectRef.current?.show();
                            }, 150);
                          });
                          return;
                        }
                        // const slug = e.node.data?.slug ?? "";

                        // Normal selection
                        setSelectedPage({
                          value: e.node.key,
                          label: e.node.label,
                        });
                        handleMoreFieldChange("cta.slug", e.node.data?.slug);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="absolute right-0 md:-top-2 top-0 p-0 w-4"
              onClick={() => handleRemoveField("cta")}
            />
          </div>
        )}
      </div>

      {activeMediaUrl != null && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          uploadType={
            activeMediaUrl ? uploadTypeMap[activeMediaUrl] || "block" : "block"
          }
          onSelect={(url: string) => {
            handleMoreFieldChange(activeMediaUrl!, url);
            setActiveMediaUrl(null);
          }}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default MoreFieldsRenderer;
