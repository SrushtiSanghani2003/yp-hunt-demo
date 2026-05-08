import { useEffect, useState } from "react";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import ContentLibrary from "./ContentLibrary";
// import ToggleSwitch from "../ui/switch/ToggleSwitch";
// import api from "../../lib/api";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import CustomSelect from "../ui/customSelect/CustomSelect";
import { showToast } from "../../utils/toastUtils";
import { concatImgURL, isValidUrl } from "../../config/function";
// import { TreeSelect } from "primereact/treeselect";
import type { TreeNode } from "primereact/treenode";
// import { useDebounce } from "../../hooks/useDebounce";

export type BentoBoxType = { 
  imgUrl: string;
  title: string;
  buttonTitle: string;
  buttonUrl: string;
  targetBlank: boolean;
  module: string;
  slug: string;
  sponsorImg: string;
  sponsorText: string;
  sponsorLink: string;
};

const AddBentoBox = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedBox: BentoBoxType) => void;
  initialData?: BentoBoxType;
}) => {
  const [bentoDetails, setBentoDetails] = useState({
    imgUrl: "",
    title: "",
    buttonTitle: "",
    buttonUrl: "",
    targetBlank: true,
    module: "page",
    slug: "",
    sponsorImg: "",
    sponsorText: "",
    sponsorLink: "",
  });

  const [activeMediaUrl, setActiveMediaUrl] = useState<null | string>(null);
  // const [moduleData, setModuleData] = useState<any>([]);
  // const [selectedOption, setSelectedOption] = useState<any>(null);
  // const [selectedPage, setSelectedPage] = useState<{
  //   value: any;
  //   label: any;
  // } | null>(null);
  // const treeSelectRef = useRef<any>(null);
  // const [searchValue, setSearchValue] = useState("");
  // const debouncedSearch = useDebounce(searchValue, 500);

  const handleChange = (
    key: keyof typeof bentoDetails | string,
    value: string | any
  ) => {
    setBentoDetails((prev) => {
      // 🧩 If targetBlank changes, clear buttonUrl
      if (key === "targetBlank") {
        return {
          ...prev,
          targetBlank: value,
          buttonUrl: "", // clear buttonUrl
        };
      }

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  // const selectedModule = useMemo(
  //   () => bentoDetails.module || "",
  //   [bentoDetails]
  // );

  // const getPages = async ({ page = 1, search }: any) => {
  //   const params: any = {
  //     limit: 50,
  //     page,
  //   };
  //   if (search) {
  //     params.search = search;
  //   }
  //   return await api.get("/pages", { params });
  // };

  // const getNews = async ({ page = 1, search }: any) => {
  //   const params: any = {
  //     limit: 20,
  //     page,
  //   };
  //   if (search) {
  //     params.title = search;
  //   }
  //   return await api.get("/news", { params });
  // };

  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // }: // isLoading,
  // any = useInfiniteQuery({
  //   queryKey: ["moduleData", selectedModule, debouncedSearch],
  //   queryFn: ({ pageParam = 1 }) =>
  //     selectedModule === "page"
  //       ? getPages({ page: pageParam, search: debouncedSearch })
  //       : getNews({ page: pageParam, search: debouncedSearch }),
  //   getNextPageParam: (lastPage, allPages) => {
  //     const currentPage = lastPage?.data?.page ?? allPages.length;
  //     const totalPages = lastPage?.data?.totalPages;

  //     return currentPage < totalPages ? currentPage + 1 : undefined;
  //   },
  //   initialPageParam: 1,
  //   // enabled: selectedModule !== "modal",
  //   select: (res) => {
  //     return res.pages.flatMap((page) => {
  //       return selectedModule === "page"
  //         ? page?.data?.pages || []
  //         : page?.data?.news || [];
  //     });
  //   },
  // });

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

  // let treePageOptions: TreeNode[] = [];

  // if (selectedModule === "modal") {
  //   treePageOptions = [
  //     {
  //       key: "sign-up",
  //       label: "Sign Up",
  //       data: { slug: "sign-up" },
  //     },
  //   ];
  // } else {
  //   treePageOptions = data ? transformPagesToTreeNodes(data) : [];

  //   if (hasNextPage) {
  //     treePageOptions.push({
  //       key: "load-more",
  //       label: isFetchingNextPage ? "Loading..." : "Load more",
  //       data: { isLoadMore: true },
  //     });
  //   }
  // }

  // const initialSlug = useMemo(() => initialData?.slug || "", [initialData]);

  // useEffect(() => {
  //   if (data && initialSlug) {
  //     const found = data.find((item: any) => item.slug === initialSlug);
  //     if (found) {
  //       // setSelectedOption({ slug: found.slug, label: found.title });
  //     }
  //   }
  // }, [open, data, initialSlug]);

  // useEffect(() => {
  //   // if (selectedModule && data) {
  //   //   setModuleData(data);
  //   // }
  //   if (selectedModule == "modal") {
  //     // setModuleData([{ slug: "sign-up", title: "Sign Up" }]);
  //     // setSelectedOption({ slug: "sign-up", title: "Sign Up" });
  //     handleChange("slug", "sign-up");
  //   }
  // }, [selectedModule, data]);

  useEffect(() => {
    if (open) {
      setBentoDetails(
        initialData || {
          imgUrl: "",
          title: "",
          buttonTitle: "",
          buttonUrl: "",
          targetBlank: true,
          module: "",
          slug: "",
          sponsorImg: "",
          sponsorText: "",
          sponsorLink: "",
        }
      );

      // if (initialData?.slug && treePageOptions?.length) {
      //   // Find matching node from options
      //   const matchingNode = treePageOptions.find(
      //     (node: any) => node?.data?.slug === initialData.slug
      //   );

      //   if (matchingNode) {
      //     setSelectedPage({
      //       value: matchingNode.key,
      //       label: matchingNode.label,
      //     });
      //   } else {
      //     setSelectedPage(null);
      //   }
      // } else {
      //   setSelectedPage(null);
      // }
    }
  }, [open]);

  const handleSubmit = () => {
    const invalidURL = !isValidUrl(bentoDetails.buttonUrl);

    if (invalidURL && bentoDetails.targetBlank) {
      showToast(`Invalid URL: ${bentoDetails.buttonUrl}`, "error");
      return;
    }
    onSubmit(bentoDetails);
  };

  const uploadTypeMap: Record<string, string> = {
    imgUrl: "block",
    sponsorImg: "sponsor",
  };

  return (
    <>
      <SidebarDialog
        open={open}
        onClose={onClose}
        title={`${initialData ? "Edit Bento Box" : "Add Bento Box"}`}
        onSubmit={handleSubmit}
        submitText="Confirm"
        cancelText="Cancel"
      >
        <div className="flex flex-col gap-4 bentoBlock">
          <div className="flex h-sp100 gap-4">
            <div className="w-sp170 h-full">
              {bentoDetails.imgUrl ? (
                <img
                  src={concatImgURL(bentoDetails.imgUrl)}
                  alt="Uploaded"
                  className="w-full h-full object-contain rounded-2xl border-0.5 border-primary block align-middle"
                />
              ) : (
                <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                  <img src={mediaIcon} alt="Placeholder" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <Input
                label="Image URL"
                placeholder="https://www.example.com"
                className="m-0"
                value={bentoDetails.imgUrl}
                onChange={(e) => handleChange("imgUrl", e.target.value)}
              />
              <div>
                {bentoDetails.imgUrl ? (
                  <Button
                    text="Remove Image"
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="pb-0"
                    onClick={() => handleChange("imgUrl", "")}
                  />
                ) : (
                  <Button
                    icon={plusIcon}
                    text="Add Image"
                    backgroundColor="transparent"
                    className="pb-0"
                    onClick={() => setActiveMediaUrl("imgUrl")}
                  />
                )}
              </div>
            </div>
          </div>

          <Input
            label="Title"
            value={bentoDetails.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            label="Button Title"
            value={bentoDetails.buttonTitle}
            onChange={(e) => handleChange("buttonTitle", e.target.value)}
          />
          {/* <div>
            <ToggleSwitch
              label="Direct Link"
              className="justify-start"
              checked={bentoDetails.targetBlank}
              onChange={(checked: any) => handleChange("targetBlank", checked)}
            />
          </div> */}
          {/* {bentoDetails.targetBlank ? ( */}
          <Input
            label="Button URL"
            value={bentoDetails.buttonUrl}
            onChange={(e) => handleChange("buttonUrl", e.target.value)}
          />
          {/* ) : ( */}
          {/* <>
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
                    value={bentoDetails.module || ""}
                    onChange={(e) => handleChange("module", e.target.value)}
                    className="appearance-none w-full md:p-2 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                  >
                    <option value="" disabled>
                      Select Module
                    </option>
                    <option value="page">Page</option>
                    <option value="news">News</option>
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
                    if (e.node.key === "load-more" || e.node.data?.isLoadMore) {
                      e.originalEvent.preventDefault();
                      e.originalEvent.stopPropagation();

                        fetchNextPage().then(() => {
                          setTimeout(() => treeSelectRef.current?.show(), 150);
                        });
                        return;
                      }

                      setSelectedPage({ value: e.node.key, label: e.node.label });
                      handleChange("slug", e.node.data?.slug ?? "");
                    }}
                  />

              </div>
            </> */}
          {/* )} */}

          {/* <div className="flex h-sp100 gap-4">
            <div className="w-sp170 h-full">
              {bentoDetails.sponsorImg ? (
                <img
                  src={bentoDetails.sponsorImg}
                  alt="Uploaded"
                  className="w-full h-full rounded-2xl object-contain border-0.5 border-primary block align-middle"
                />
              ) : (
                <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                  <img src={mediaIcon} alt="Placeholder" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <Input
                label="Sponsor Image URL"
                className="m-0"
                placeholder="https://www.example.com"
                value={bentoDetails.sponsorImg}
                onChange={(e) => handleChange("sponsorImg", e.target.value)}
              />
              <div>
                {bentoDetails.sponsorImg ? (
                  <Button
                    text="Remove Image"
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="pb-0"
                    onClick={() => handleChange("sponsorImg", "")}
                  />
                ) : (
                  <Button
                    icon={plusIcon}
                    text="Add Image"
                    backgroundColor="transparent"
                    className="pb-0"
                    onClick={() => setActiveMediaUrl("sponsorImg")}
                  />
                )}
              </div>
            </div>
          </div>

          <Input
            label="Sponsor Text"
            value={bentoDetails.sponsorText}
            onChange={(e) => handleChange("sponsorText", e.target.value)}
          />
          <Input
            label="Sponsor Link URL"
            placeholder="https://www.example.com"
            value={bentoDetails.sponsorLink}
            onChange={(e) => handleChange("sponsorLink", e.target.value)}
          /> */}
        </div>
      </SidebarDialog>
      {activeMediaUrl != null && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          uploadType={
            activeMediaUrl ? uploadTypeMap[activeMediaUrl] || "block" : "block"
          }
          onSelect={(url) => {
            handleChange(activeMediaUrl!, url), setActiveMediaUrl(null);
          }}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default AddBentoBox;
