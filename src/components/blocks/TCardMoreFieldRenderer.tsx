import type { TreeNode } from "primereact/treenode";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import ContentLibrary from "../contentPanel/ContentLibrary";
import Button from "../ui/button";
import {
  chevronDown,
  closeIcon,
  globeIcon,
  mediaIcon,
  plusIcon,
} from "../../icons";
import Input from "../ui/input/Input";
import { TreeSelect } from "primereact/treeselect";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import { concatImgURL } from "../../config/function";

type Props = {
  currentBlock: any;
  card: any;
  moreFields: string[];
  setMoreFields: any;
  index: number;
  onChangeBlock: any;
};

const TCardMoreFieldRenderer = ({
  currentBlock,
  card,
  moreFields,
  setMoreFields,
  index,
  onChangeBlock,
}: Props) => {
  const [activeMediaUrl, setActiveMediaUrl] = useState<null | string>(null);
  const [activeSponsorIndex, setActiveSponsorIndex] = useState<number | null>(
    null
  );

  const [selectedPages, setSelectedPages] = useState<Record<number, any>>({});
  const [searchValues, setSearchValues] = useState<string>("");
  const debouncedSearch = useDebounce(searchValues, 500);
  const treeSelectRefs = useRef<Record<number, any>>({});

  // const [moduleData, setModuleData] = useState<any>([]);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: any;
  }>({});

  // const selectedModule = useMemo(
  //   () => currentBlock?.content?.more?.cta?.module || "",
  //   [currentBlock]
  // );

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

  const useModuleData = (module: "page" | "news", search: string) => {
    return useInfiniteQuery({
      queryKey: ["moduleData", module, search],
      queryFn: ({ pageParam = 1 }) =>
        module === "page"
          ? getPages({ page: pageParam, search })
          : getNews({ page: pageParam, search }),
      getNextPageParam: (lastPage, allPages) => {
        const currentPage = lastPage?.data?.page ?? allPages.length;
        const totalPages = lastPage?.data?.totalPages;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
      initialPageParam: 1,
      enabled: !!module,
      select: (res) =>
        res.pages.flatMap((page) =>
          module === "page" ? page?.data?.pages || [] : page?.data?.news || []
        ),
    });
  };

  const pageModule: any = useModuleData("page", debouncedSearch);
  const newsModule: any = useModuleData("news", debouncedSearch);

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

  // 2️⃣ Compute tree options dynamically per index
  const getTreeOptions = (
    moduleType: "page" | "news" | "modal",
    data: any[],
    hasNextPage: boolean,
    isFetchingNextPage: boolean
  ): TreeNode[] => {
    if (moduleType === "modal") {
      return [
        {
          key: "sign-up",
          label: "Sign Up",
          data: { slug: "sign-up" },
        },
      ];
    }

    let options = data ? transformPagesToTreeNodes(data) : [];

    if (hasNextPage) {
      options.push({
        key: "load-more",
        label: isFetchingNextPage ? "Loading..." : "Load more",
        data: { isLoadMore: true },
      });
    }

    return options;
  };

  // useEffect(() => {
  //   if (selectedModule && data) {
  //     setModuleData(data);
  //   }
  // }, [selectedModule, data]);

  const setNestedValue = (obj: any, path: string, value: any) => {
    if (!path.includes(".")) {
      // Simple key like 'title' or 'description'
      return {
        ...obj,
        [path]: value,
      };
    }

    const keys = path.split(".");
    const clone = structuredClone(obj);
    let current = clone;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      const isArrayIndex = /^\d+$/.test(key);
      const parsedKey = isArrayIndex ? parseInt(key) : key;

      if (current[parsedKey] === undefined) {
        const nextKey = keys[i + 1];
        const nextIsArray = /^\d+$/.test(nextKey);
        current[parsedKey] = nextIsArray ? [] : {};
      }

      current = current[parsedKey];
    }

    const finalKey = keys[keys.length - 1];
    const isFinalArrayIndex = /^\d+$/.test(finalKey);
    const parsedFinalKey = isFinalArrayIndex ? parseInt(finalKey) : finalKey;

    current[parsedFinalKey] = value;

    return clone;
  };

  const handleMoreFieldChange = (
    index: number,
    keyPath: string,
    value: any
  ) => {
    const updatedCards = currentBlock.content.cards.map(
      (ad: any, i: number) => {
        if (i !== index) return ad;

        const updatedMore = setNestedValue(
          structuredClone(ad.more || {}),
          keyPath,
          value
        );

        return {
          ...ad,
          more: updatedMore,
        };
      }
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        cards: updatedCards,
      },
    });
  };

  const removeNestedField = (obj: any, path: string) => {
    if (!path.includes(".")) {
      // Flat key like 'title', 'description', 'link'
      const { [path]: _, ...rest } = obj;
      return rest;
    }

    const keys = path.split(".");
    const clone = structuredClone(obj);
    let current = clone;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = /^\d+$/.test(keys[i]) ? parseInt(keys[i]) : keys[i];
      if (current[key] === undefined) return clone; // Invalid path
      current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    const isArrayIndex = /^\d+$/.test(lastKey);
    const parsedKey: any = isArrayIndex ? parseInt(lastKey) : lastKey;

    if (Array.isArray(current)) {
      current.splice(parsedKey, 1);

      // 🚨 If array becomes empty, remove parent key
      if (current.length === 0) {
        const parentKey = keys[keys.length - 2];
        let parent = clone;
        for (let i = 0; i < keys.length - 2; i++) {
          const k = /^\d+$/.test(keys[i]) ? parseInt(keys[i]) : keys[i];
          parent = parent[k];
        }
        if (Array.isArray(parent)) {
          parent.splice(parseInt(parentKey), 1);
        } else if (typeof parent === "object") {
          delete parent[parentKey];
        }
      }
    } else if (typeof current === "object") {
      delete current[parsedKey];

      // 🚨 If object becomes empty, remove parent key
      if (Object.keys(current).length === 0) {
        const parentKey = keys[keys.length - 2];
        let parent = clone;
        for (let i = 0; i < keys.length - 2; i++) {
          const k = /^\d+$/.test(keys[i]) ? parseInt(keys[i]) : keys[i];
          parent = parent[k];
        }
        if (Array.isArray(parent)) {
          parent.splice(parseInt(parentKey), 1);
        } else if (typeof parent === "object") {
          delete parent[parentKey];
        }
      }
    }

    return clone;
  };

  const handleRemoveMoreField = (index: number, keyPath: string) => {
    const fieldKey = keyPath.split(".")[0]; // e.g., "social" from "social.0.link"

    const updatedCards = currentBlock.content.cards.map(
      (ad: any, i: number) => {
        if (i !== index) return ad;

        const updatedMore = removeNestedField(ad.more || {}, keyPath);

        return {
          ...ad,
          more: updatedMore,
        };
      }
    );

    const newBlock = {
      ...currentBlock,
      content: {
        ...currentBlock.content,
        cards: updatedCards,
      },
    };

    onChangeBlock?.(newBlock);

    // Check if the top-level field still exists in the updated ad
    const card = newBlock.content.cards[index];
    const fieldData = card.more?.[fieldKey];

    const isFieldNowEmpty =
      fieldData === undefined ||
      (typeof fieldData === "string" && fieldData === "") ||
      (Array.isArray(fieldData) && fieldData.length === 0) ||
      (typeof fieldData === "object" &&
        fieldData !== null &&
        Object.keys(fieldData).length === 0);

    if (isFieldNowEmpty) {
      setMoreFields((prev: any) => ({
        ...prev,
        [index]: (prev[index] || []).filter((item: any) => item !== fieldKey),
      }));
    }
  };

  useEffect(() => {
    card.more?.cta?.forEach((ctaItem: any, idx: number) => {
      // skip if already selected
      if (selectedOptions[idx]) return;

      if (ctaItem.module) {
        const dataForModule =
          ctaItem.module === "page" ? pageModule.data : newsModule.data;

        // pick first item if slug not set
        const initialItem = dataForModule?.find(
          (item: any) => item.slug === ctaItem.slug
        );

        setSelectedOptions((prev) => ({
          ...prev,
          [idx]: initialItem
            ? { value: initialItem.slug, label: initialItem.title }
            : null,
        }));

        // ✅ TreeSelect preselect logic (like your single-item example)
        if (ctaItem.slug && dataForModule?.length) {
          const treeOptions = getTreeOptions(
            ctaItem.module,
            dataForModule,
            ctaItem.module === "page"
              ? pageModule.hasNextPage
              : newsModule.hasNextPage,
            ctaItem.module === "page"
              ? pageModule.isFetchingNextPage
              : newsModule.isFetchingNextPage
          );

          const matchingNode = treeOptions.find(
            (node: any) => node?.data?.slug === ctaItem.slug
          );

          if (matchingNode) {
            setSelectedPages((prev) => ({
              ...prev,
              [idx]: {
                value: matchingNode.key,
                label: matchingNode.label,
              },
            }));
          }
        }

        // update slug in cta if empty
        if (!ctaItem.slug && initialItem) {
          handleMoreFieldChange(index, `cta.${idx}.slug`, initialItem.slug);
        }
      }
    });
  }, [pageModule.data, newsModule.data]);

  //   useEffect(() => {
  //     if (currentBlock?.content?.more?.cta?.slug && treePageOptions.length) {
  //       const matchingNode = treePageOptions.find(
  //         (node: any) =>
  //           node?.data?.slug == currentBlock?.content?.more?.cta?.slug
  //       );
  //       if (matchingNode) {
  //         setSelectedPage({
  //           value: matchingNode.key,
  //           label: matchingNode.label,
  //         });
  //       } else {
  //         setSelectedPage(null);
  //       }
  //     }
  //   }, [currentBlock]);

  return (
    <>
      <div className="md:mt-5 mt-2 relative">
        {/* Title */}
        {moreFields.includes("title") && (
          <div className="relative mb-3">
            <Input
              label="Title"
              placeholder="Enter title"
              className="m-0 md:mb-3 md:text-base/4 text-sm font-medium"
              value={card.more?.title || ""}
              onChange={(e) =>
                handleMoreFieldChange(index, "title", e.target.value)
              }
            />
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="absolute right-0 md:-top-2 top-0 p-0 w-4"
              onClick={() => handleRemoveMoreField(index, "title")}
            />
          </div>
        )}

        {/* Description */}
        {moreFields.includes("description") && (
          <div className="relative mb-3">
            <label className="block md:text-base/4 text-sm mb-2 font-medium">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              className="w-full p-3 text-base border-0.5 border-primary rounded-2xl pr-10 resize-none"
              rows={2}
              value={card.more?.description || ""}
              onChange={(e) =>
                handleMoreFieldChange(index, "description", e.target.value)
              }
            />
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="absolute right-0 md:-top-2 top-0 p-0 w-4"
              onClick={() => handleRemoveMoreField(index, "description")}
            />
          </div>
        )}

        {/* Bullet */}
        {moreFields.includes("bullet") &&
          card.more?.bullet?.map((bulletItem: any, idx: number) => (
            <div key={bulletItem.id} className="relative mb-3">
              <Input
                placeholder="Enter bullet point"
                className="m-0 md:text-base/4 text-sm font-medium"
                value={bulletItem?.value ?? ""}
                onChange={(e) =>
                  handleMoreFieldChange(
                    index,
                    `bullet.${idx}.value`,
                    e.target.value
                  )
                }
              />
              <Button
                icon={closeIcon}
                backgroundColor="transparent"
                className="absolute right-1 md:-top-2 top-0 p-0 w-4"
                onClick={() => handleRemoveMoreField(index, `bullet.${idx}`)}
              />
            </div>
          ))}

        {/* Link */}
        {moreFields.includes("link") && (
          <div className="relative mb-3">
            <Input
              label="Link"
              placeholder="https://www.example.com"
              note="Note: Please include http:// or https:// in your link URL"
              className="m-0 font-medium"
              value={card.more?.link ?? ""}
              onChange={(e) =>
                handleMoreFieldChange(index, "link", e.target.value)
              }
            />
            <div className="flex items-center md:py-2 py-1 gap-2">
              <img src={globeIcon} alt="Globe icon" className="w-4 h-4" />
              <p className="font-semibold md:text-base/4 text-sm">
                URL Builder (Recommended)
              </p>
            </div>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="absolute right-0 md:-top-2 top-0 p-0 w-4"
              onClick={() => handleRemoveMoreField(index, "link")}
            />
          </div>
        )}

        {/* CTA */}
        {moreFields.includes("cta") &&
          card.more?.cta?.map((ctaItem: any, idx: number) => (
            <div
              key={ctaItem.id}
              className="grid grid-cols-9 items-end gap-5 relative mb-3"
            >
              <Input
                label="Button Text"
                className="m-0 col-span-4"
                value={ctaItem?.button_label ?? ""}
                onChange={(e) =>
                  handleMoreFieldChange(
                    index,
                    `cta.${idx}.button_label`,
                    e.target.value
                  )
                }
              />
              {/* <IconPicker
                className="col-span-2"
                value={ctaItem?.button_icon ?? ""}
                onChange={(iconName) =>
                  handleMoreFieldChange(
                    index,
                    `cta.${idx}.button_icon`,
                    iconName
                  )
                }
                iconColor={ctaItem?.icon_color ?? ""}
                onIconColorChange={(iconName) =>
                  handleMoreFieldChange(
                    index,
                    `cta.${idx}.icon_color`,
                    iconName
                  )
                }
              /> */}
              <div className="col-span-1 flex flex-col justify-between">
                <label className="block md:mb-2 mb-2 font-medium md:text-base/4 text-sm">
                  Direct Link
                </label>
                <ToggleSwitch
                  checked={ctaItem?.target_is_blank}
                  onChange={(checked) => {
                    handleMoreFieldChange(
                      index,
                      `cta.${idx}.target_is_blank`,
                      checked
                    );
                    setSelectedPages({});
                  }}
                />
              </div>
              {ctaItem?.target_is_blank ? (
                <Input
                  label="Button Link URL"
                  className={`m-0 ${
                    ctaItem?.target_is_blank ? "col-span-4" : "col-span-4"
                  }`}
                  value={ctaItem?.button_link ?? ""}
                  onChange={(e) =>
                    handleMoreFieldChange(
                      index,
                      `cta.${idx}.button_link`,
                      e.target.value
                    )
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
                        value={ctaItem?.module || ""}
                        onChange={(e) => {
                          const newModule = e.target.value;
                          handleMoreFieldChange(index, `cta.${idx}`, {
                            ...ctaItem,
                            module: newModule,
                            slug: "", // reset Name
                          });
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [idx]: null,
                          }));
                        }}
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
                    <TreeSelect
                      key={`tree-${idx}-${ctaItem.module}`}
                      ref={(el) => {
                        if(el)
                        treeSelectRefs.current[idx] = el;
                      }}
                      filter
                      value={selectedPages[idx]?.value ?? ""}
                      options={
                        ctaItem.module === "page"
                          ? getTreeOptions(
                              "page",
                              pageModule.data,
                              pageModule.hasNextPage,
                              pageModule.isFetchingNextPage
                            )
                          : ctaItem.module === "news"
                          ? getTreeOptions(
                              "news",
                              newsModule.data,
                              newsModule.hasNextPage,
                              newsModule.isFetchingNextPage
                            )
                          : getTreeOptions("modal", [], false, false)
                      }
                      placeholder="Select Option"
                      className="w-full custom-tree-select shadow-none"
                      onFilterValueChange={(e) => setSearchValues(e.value)}
                      filterValue={searchValues || ""}
                      onNodeSelect={(e) => {
                        if (
                          e.node.key === "load-more" ||
                          e.node.data?.isLoadMore
                        ) {
                          e.originalEvent.preventDefault();
                          e.originalEvent.stopPropagation();

                          const fetchFn =
                            ctaItem.module === "page"
                              ? pageModule.fetchNextPage
                              : newsModule.fetchNextPage;

                          fetchFn().then(() => {
                            setTimeout(() => {
                              const ref = treeSelectRefs.current[idx];
                              if (ref && typeof ref.show === "function") {
                                ref.show();
                              }
                            }, 150);
                          });
                          return;
                        }
                        // const slug = e.node.data?.slug ?? "";

                        // Normal selection
                        setSelectedPages((prev) => ({
                          ...prev,
                          [idx]: { value: e.node.key, label: e.node.label },
                        }));
                        handleMoreFieldChange(
                          idx,
                          `cta.${idx}.slug`,
                          e.node.data?.slug
                        );
                      }}
                    />
                  </div>
                </>
              )}

              <Button
                icon={closeIcon}
                backgroundColor="transparent"
                className="absolute right-0 md:-top-2 top-0 p-0 w-4"
                onClick={() => handleRemoveMoreField(index, `cta.${idx}`)}
              />
            </div>
          ))}

        {/* Sponsor */}
        {moreFields.includes("sponsor") &&
          card.more?.sponsor?.map((sponsorItem: any, idx: number) => (
            <div key={sponsorItem.id} className="mb-4 relative">
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {sponsorItem?.sponsor_img ? (
                    <img
                      src={concatImgURL(sponsorItem.sponsor_img)}
                      alt="Uploaded"
                      className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary"
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
                    value={concatImgURL(sponsorItem.sponsor_img) ?? ""}
                    readOnly
                  />
                  <div>
                    {sponsorItem.sponsor_img ? (
                      <Button
                        text="Remove Image"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="pb-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() =>
                          handleMoreFieldChange(
                            index,
                            `sponsor.${idx}.sponsor_img`,
                            ""
                          )
                        }
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Image"
                        backgroundColor="transparent"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        className="pb-0"
                        onClick={() => {
                          setActiveMediaUrl(`sponsor.${idx}.sponsor_img`);
                          setActiveSponsorIndex(index);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex md:gap-5 gap-2 pt-4 items-end">
                <Input
                  label="Sponsor Text"
                  className="m-0 w-1/2"
                  value={sponsorItem.sponsor_name ?? ""}
                  onChange={(e) =>
                    handleMoreFieldChange(
                      index,
                      `sponsor.${idx}.sponsor_name`,
                      e.target.value
                    )
                  }
                />
                <Input
                  label="Sponsor Link URL"
                  className="m-0 w-1/2"
                  note="Note: Please include http:// or https://"
                  placeholder="https://www.example.com"
                  value={sponsorItem.sponsor_url ?? ""}
                  onChange={(e) =>
                    handleMoreFieldChange(
                      index,
                      `sponsor.${idx}.sponsor_url`,
                      e.target.value
                    )
                  }
                />
              </div>
              <Button
                icon={closeIcon}
                backgroundColor="transparent"
                className="absolute right-2 md:-top-1 top-0 p-0 w-4"
                onClick={() => handleRemoveMoreField(index, `sponsor.${idx}`)}
              />
            </div>
          ))}

        {/* Social */}
        {moreFields.includes("social") && (
          <div className="mb-4 relative">
            {/* Common Labels */}
            <div className="grid grid-cols-2 gap-5 mb-2">
              <p className="font-medium md:text-base/4 text-sm">Platforms</p>
              <p className="font-medium md:text-base/4 text-sm">Social Links</p>
            </div>

            {/* Fields */}
            {card.more?.social?.map((socialItem: any, idx: number) => {
              // Get all selected platforms except current one
              const selectedPlatforms = card.more.social
                .map((item: any) => item.platform)
                .filter((_: any, i: number) => i !== idx);

              // Available platforms for this select
              const availableOptions = [
                { value: "x", label: "X (Twitter)" },
                { value: "facebook", label: "Facebook" },
                { value: "instagram", label: "Instagram" },
                { value: "youtube", label: "YouTube" },
                { value: "tiktok", label: "TikTok" },
                { value: "linkedin", label: "LinkedIn" },
                { value: "whatsapp", label: "WhatsApp" },
                { value: "threads", label: "Threads" },
                { value: "bluesky", label: "Bluesky" },
              ].filter((opt) => !selectedPlatforms.includes(opt.value));

              return (
                <div
                  key={socialItem.id || idx}
                  className="grid grid-cols-2 gap-5 mb-3 relative"
                >
                  {/* Platform Select */}
                  <div className="relative">
                    <select
                      id={`platform-${idx}`}
                      value={socialItem.platform}
                      onChange={(e) =>
                        handleMoreFieldChange(
                          index,
                          `social.${idx}.platform`,
                          e.target.value
                        )
                      }
                      className="appearance-none w-full md:p-2 p-2 md:text-base text-sm focus:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                    >
                      <option value="" disabled>
                        Select Platform
                      </option>
                      {availableOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute md:right-4 right-2 top-1/2 -translate-y-1/2">
                      <img src={chevronDown} />
                    </div>
                  </div>

                  {/* Social Link Input */}
                  <div>
                    <Input
                      className="m-0"
                      labelCss="md:m-0"
                      placeholder="https://www.example.com"
                      value={socialItem.link ?? ""}
                      onChange={(e) =>
                        handleMoreFieldChange(
                          index,
                          `social.${idx}.link`,
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* Remove Button */}
                  <Button
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0 w-4"
                    onClick={() =>
                      handleRemoveMoreField(index, `social.${idx}`)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {activeMediaUrl != null && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          uploadType={"block"}
          onSelect={(url: string) => {
            if (activeSponsorIndex != null) {
              handleMoreFieldChange(activeSponsorIndex, activeMediaUrl, url);
              setActiveMediaUrl(null);
            }
          }}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default TCardMoreFieldRenderer;
