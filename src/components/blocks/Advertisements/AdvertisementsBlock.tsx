import React, { useEffect, useRef, useState } from "react";
import {
  arrowDownIcon,
  arrowUpIcon,
  // chevronDown,
  closeIcon,
  // correctIcon,
  moreIcon,
  // plusIcon,
} from "../../../icons";
import { mediaOptions } from "../../heroMedia/mediaOptionConfig";
import Button from "../../ui/button";
import type { BlockTypeProps } from "../changeBlockTypes";
import ChangeBlockType from "../ChangeBlockType";
// import { v4 as uuidv4 } from "uuid";
// import ToggleSwitch from "../../ui/switch/ToggleSwitch";
import { adsDropDownItems } from "../../heroMedia/tabs";
import { multipleAdsMoreDefaultObjects } from "../blocksObjectConfig";
import AdvertisementPreview from "./AdvertisementPreview";
import MoreFieldsEditor from "../MoreFieldsEditor";
import MoreFieldsRenderer from "../MoreFieldsRenderer";
import AdvertisementMoreFieldsRenderer from "./AdvertisementMoreFieldsRenderer";
import { useLocation } from "react-router-dom";

const AdvertisementsBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  // const displayIdRef = useRef(Date.now());
  // const displayId = displayIdRef.current;
  const dropDownItemRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [showDropdowns, setShowDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  const [moreFields, setMoreFields] = useState<Record<number, string[]>>({});
  const [commonMoreFields, setCommonMoreFields] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const pathname = location.pathname;
  const isNews = pathname.includes("news");

  const toggleDropdown = (index: number) => {
    setShowDropdowns((prev) => {
      const newState: { [key: number]: boolean } = {};
      Object.keys(prev).forEach((key) => {
        newState[+key] = false;
      });
      return { ...newState, [index]: !prev[index] };
    });
  };

  // const options = ["Web", "App"];
  // const displays = currentBlock.content.ads.map((ad: any) =>
  //   options.map((label) => ({
  //     label,
  //     checked: ad.display_on?.includes(label) || false,
  //   }))
  // );

  const [livePreview, _setLivePreview] = useState<boolean[]>(
    currentBlock.content.ads.map(() => false),
  );

  const handleOnClose = (index: number) => {
    const updatedAds = currentBlock.content.ads.map((ad: any, i: number) =>
      i === index
        ? {
            ...ad,
            mediaType: null,
            imageUrl: "",
            videoUrl: "",
            videoThumbnail: "",
          }
        : ad,
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        ads: updatedAds,
      },
    });
  };

  const handleTypeChange = (index: number, type: string) => {
    const updatedAds = currentBlock.content.ads.map((ad: any, i: number) =>
      i === index
        ? {
            ...ad,
            videoSource: type,
          }
        : ad,
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        ads: updatedAds,
      },
    });
  };

  // const handleChange = (index: number, field: string, value: any) => {
  //   const updatedAds = currentBlock.content.ads.map((ad: any, i: number) =>
  //     i === index ? { ...ad, [field]: value } : ad
  //   );

  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: {
  //       ...currentBlock.content,
  //       ads: updatedAds,
  //     },
  //   });
  // };

  const handleChange = (index: number, key: string, value: any) => {
    const updatedAds = currentBlock.content.ads.map((ad: any, i: number) => {
      if (i !== index) return ad;

      const updatedAd = {
        ...ad,
        [key]: value,
      };

      // ✅ Auto-add title field if mediaAlignment is left or right
      if (
        key === "mediaAlignment" &&
        (value === "left" || value === "right") &&
        !ad.more?.title
      ) {
        updatedAd.more = {
          ...(ad.more || {}),
          title: "",
        };

        // ✅ Also update moreFields state to include 'title' for this index
        setMoreFields((prev) => {
          const currentFields = prev[index] || [];
          return {
            ...prev,
            [index]: currentFields.includes("title")
              ? currentFields
              : [...currentFields, "title"],
          };
        });
      }

      return updatedAd;
    });

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        ads: updatedAds,
      },
    });
  };

  // const handleCheckboxChange = (index: number, label: string) => {
  //   const updatedAds = currentBlock.content.ads.map((ad: any, i: number) => {
  //     if (i !== index) return ad;

  //     const displayOn = ad.display_on || [];
  //     const updatedDisplayOn = displayOn.includes(label)
  //       ? displayOn.filter((item: any) => item !== label)
  //       : [...displayOn, label];

  //     return { ...ad, display_on: updatedDisplayOn };
  //   });

  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: {
  //       ...currentBlock.content,
  //       ads: updatedAds,
  //     },
  //   });
  // };

  // const handleSelectChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   index: number
  // ) => {
  //   const { id, value } = e.target;

  //   const updatedValue =
  //     id === "startTime" || id === "endTime" ? Number(value) : value;

  //   const updatedAds = currentBlock.content.ads.map((ad: any, i: number) =>
  //     i === index ? { ...ad, [id]: updatedValue } : ad
  //   );

  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: {
  //       ...currentBlock.content,
  //       ads: updatedAds,
  //     },
  //   });
  // };

  // const handleBlockViewTypeChange = (index: number, type: string) => {
  //   const updatedAds = currentBlock.content.ads.map((ad: any, i: number) =>
  //     i === index
  //       ? {
  //           ...ad,
  //           promotionType: type,
  //         }
  //       : ad
  //   );
  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: {
  //       ...currentBlock.content,
  //       ads: updatedAds,
  //     },
  //   });
  // };

  // const handleAddMoreAds = () => {
  //   const ads = currentBlock.content.ads;
  //   const nextOrder = Math.max(...ads.map((a: any) => a.order || 0), 0) + 1;
  //   const updatedAds = [
  //     ...ads,

  //     {
  //       id: uuidv4(),
  //       display_on: [],
  //       isFullWidth: false,
  //       startTime: 0,
  //       promotionType: "static",
  //       endTime: 0,
  //       imageUrl: "",
  //       videoSource: "native",
  //       videoUrl: "",
  //       videoThumbnail: "",
  //       mediaType: null,
  //       mediaAlignment: "",
  //       order: nextOrder,
  //     },
  //   ];

  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: {
  //       ...currentBlock.content,
  //       ads: updatedAds,
  //     },
  //   });
  // };

  const handleRemoveAds = (index: number) => {
    const updatedAds = (currentBlock.content?.ads || [])
      .filter((_item: unknown, i: number) => i !== index)
      .map((ads: any, newIndex: number) => ({
        ...ads,
        order: newIndex + 1,
      }));

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        ads: updatedAds,
      },
    });
  };

  const reorderAds = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.ads) return;

    const adsCopy = currentBlock.content.ads.map((ad: any) => ({
      ...ad,
    }));

    // Ensure the indices are valid
    if (toIndex < 0 || toIndex >= adsCopy.length) return;

    // Move the item
    const [movedAd] = adsCopy.splice(fromIndex, 1);
    adsCopy.splice(toIndex, 0, movedAd);

    // Reassign order values (if needed)
    const reorderedAds = adsCopy.map((ad: any, index: number) => ({
      ...ad,
      order: index + 1,
    }));

    // Send update
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        ads: reorderedAds,
      },
    });
  };

  // const handleTogglePreview = (index: number) => {
  //   setLivePreview((prev) => {
  //     const updated = [...prev];
  //     updated[index] = !updated[index];
  //     return updated;
  //   });
  // };

  const singleEntryFields: (keyof typeof multipleAdsMoreDefaultObjects)[] = [
    "title",
    "description",
    "link",
  ];

  const handleAddField = (
    index: number,
    type: keyof typeof multipleAdsMoreDefaultObjects,
  ) => {
    const updatedAds = currentBlock.content.ads.map((ad: any, i: number) => {
      if (i !== index) return ad;

      const existing = ad.more?.[type];

      // Block re-adding if it's a single-entry field and already exists
      if (singleEntryFields.includes(type) && existing) return ad;

      let newField;
      if (typeof multipleAdsMoreDefaultObjects[type] === "string") {
        // Simple string value
        newField = multipleAdsMoreDefaultObjects[type];
      } else {
        // Array field — create fresh objects with unique ids
        const freshItems = multipleAdsMoreDefaultObjects[type].map(
          (item: any) => ({
            ...item,
            id: Date.now() + Math.random(),
          }),
        );

        newField = [...(existing || []), ...freshItems];
      }

      return {
        ...ad,
        more: {
          ...(ad.more || {}),
          [type]: newField,
        },
      };
    });

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        ads: updatedAds,
      },
    });

    if (!moreFields[index]?.includes(type)) {
      setMoreFields((prev) => ({
        ...prev,
        [index]: [...(prev[index] || []), type],
      }));
    }

    setShowDropdowns((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  useEffect(() => {
    if (!currentBlock?.content?.ads) return;

    const initialFields: Record<number, string[]> = {};

    currentBlock.content.ads.forEach((ad: any, index: number) => {
      if (ad.more && typeof ad.more === "object") {
        initialFields[index] = Object.keys(ad.more);
      }
    });

    setMoreFields(initialFields);
  }, [currentBlock]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs.current).forEach((key) => {
        const index = Number(key);
        const ref = dropdownRefs.current[index];

        if (ref && !ref.contains(event.target as Node)) {
          setShowDropdowns((prev) => ({
            ...prev,
            [index]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isNews || !currentBlock?.content?.ads?.length) return;
    const hasTrue = currentBlock.content.ads.some((ad: any) => ad.isFullWidth);
    if (hasTrue) {
      const updatedAds = currentBlock.content.ads.map((ad: any) => ({
        ...ad,
        isFullWidth: false,
      }));

      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          ads: updatedAds,
        },
      });
    }
  }, [isNews]);

  return (
    <>
      <div className="md:pb-6 pb-3 border-b-primary border-b-0.5">
        {currentBlock.content.ads.map((ad: any, index: number) => {
          const totalAds = currentBlock.content.ads.length;
          const isFirst = index === 0;
          const isLast = index === totalAds - 1;

          return (
            <React.Fragment key={ad.id}>
              <div className="bg-f6f6f6 border-primary border p-4 rounded-xl md:mb-4 mb-2">
                <div className="flex items-center gap-2 justify-end">
                  {/* <ToggleSwitch
                    checked={livePreview[index] || false}
                    onChange={() => handleTogglePreview(index)}
                    label="Preview"
                  /> */}
                  {totalAds > 1 && !isFirst && (
                    <Button
                      icon={arrowUpIcon}
                      backgroundColor="transparent"
                      className="p-0 md:w-5 w-3 md:h-5 h-3"
                      onClick={() => reorderAds(index, index - 1)}
                    />
                  )}
                  {totalAds > 1 && !isLast && (
                    <Button
                      icon={arrowDownIcon}
                      backgroundColor="transparent"
                      className="p-0 md:w-5 w-3 md:h-5 h-3"
                      onClick={() => reorderAds(index, index + 1)}
                    />
                  )}
                  {totalAds > 1 && (
                    <Button
                      icon={closeIcon}
                      backgroundColor="transparent"
                      onClick={() => handleRemoveAds(index)}
                      className="md:p-0 w-5"
                    />
                  )}
                </div>

                {livePreview[index] ? (
                  <div className="mt-3">
                    <AdvertisementPreview data={ad} />
                  </div>
                ) : (
                  <>
                    {/* {!isNews && (
                      <div className="flex items-center gap-sp6 mb-4">
                        <input
                          type="checkbox"
                          id={`${ad.id}-fullwidth`}
                          checked={ad.isFullWidth}
                          onChange={(e) =>
                            handleChange(index, "isFullWidth", e.target.checked)
                          }
                          className="peer hidden"
                        />
                        <label
                          className="font-medium"
                          htmlFor={`${ad.id}-fullwidth`}
                        >
                          Full Width:
                        </label>
                        <label
                          htmlFor={`${ad.id}-fullwidth`}
                          className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
                        peer-checked:bg-black peer-checked:border-black"
                        >
                          {ad.isFullWidth && (
                            <img src={correctIcon} alt="Right" />
                          )}
                        </label>
                      </div>
                    )} */}
                    <div className="flex gap-4 items-center md:mb-4 mb-2">
                      {/* {!isNews && (
                        <div className="w-[45%]">
                          <div className="relative">
                            <select
                              id="mediaAlign"
                              value={ad.mediaAlignment}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "mediaAlignment",
                                  e.target.value
                                )
                              }
                              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary md:rounded-2xl rounded-lg"
                            >
                              <option value="" disabled>
                                Select Media Alignment
                              </option>
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                            </select>
                            <div className="absolute md:right-4 right-2 top-1/2 -translate-y-1/2">
                              <img src={chevronDown} />
                            </div>
                          </div>
                        </div>
                      )} */}

                      {/* <div className="flex items-center gap-4 justify-between">
                        <p className="md:text-base/4 text-sm font-medium md:my-4 my-2">
                          Display On:
                        </p>
                        <div className="flex items-center md:gap-4 gap-2">
                          {displays[index].map((item: any) => (
                            <div
                              className="flex items-center gap-sp6"
                              key={item.label}
                            >
                              <input
                                type="checkbox"
                                id={`${displayId}-${item.label}-${index}`}
                                checked={item.checked}
                                onChange={() =>
                                  handleCheckboxChange(index, item.label)
                                }
                                className="peer hidden"
                              />
                              <label
                                htmlFor={`${displayId}-${item.label}-${index}`}
                                className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
                  peer-checked:bg-black peer-checked:border-black"
                              >
                                {item.checked && (
                                  <img src={correctIcon} alt="Right" />
                                )}
                              </label>
                              <label
                                className="font-light "
                                htmlFor={`${displayId}-${item.label}-${index}`}
                              >
                                {item.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div> */}
                      {/* <div>
                        <div className="flex items-center gap-sp6">
                          <input
                            type="checkbox"
                            id={`${ad.id}-fullwidth`}
                            checked={ad.isFullWidth}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "isFullWidth",
                                e.target.checked
                              )
                            }
                            className="peer hidden"
                          />
                          <label
                            className="font-medium"
                            htmlFor={`${ad.id}-fullwidth`}
                          >
                            Full Width:
                          </label>
                          <label
                            htmlFor={`${ad.id}-fullwidth`}
                            className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
                  peer-checked:bg-black peer-checked:border-black"
                          >
                            {ad.isFullWidth && (
                              <img src={correctIcon} alt="Right" />
                            )}
                          </label>
                        </div>
                      </div> */}
                      <div
                        className="flex flex-1 justify-end gap-5 items-center relative"
                        ref={(el) => {
                          dropdownRefs.current[index] = el;
                        }}
                      >
                        <div className="relative">
                          <Button
                            icon={moreIcon}
                            className="md:p-0"
                            backgroundColor="transparent"
                            onClick={() => toggleDropdown(index)}
                            imageclassName="w-6 h-6"
                          />
                          <div
                            ref={dropDownItemRef}
                            aria-expanded={showDropdowns[index]}
                            aria-haspopup="listbox"
                            className={`absolute -left-32 bg-white border border-gray-300 shadow-lg rounded-2xl p-3 mt-2 w-40 z-10
                        transition-all duration-200 ease-out
                        transform origin-top
                        ${
                          showDropdowns[index]
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                        }
                        `}
                          >
                            {adsDropDownItems.map((item) => {
                              const isSingleEntry = singleEntryFields.includes(
                                item.value as keyof typeof multipleAdsMoreDefaultObjects,
                              );
                              const isAlreadyAdded =
                                isSingleEntry &&
                                currentBlock.content.ads?.[index]?.more?.[
                                  item.value
                                ];

                              return (
                                <div
                                  key={item.value}
                                  className={`flex px-1 rounded-2xl items-center gap-2 my-1 ${
                                    isAlreadyAdded
                                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                                      : "hover:bg-gray-200 cursor-pointer"
                                  }
                                `}
                                  onClick={() => {
                                    if (!isAlreadyAdded) {
                                      handleAddField(index, item.value as any);
                                    }
                                  }}
                                >
                                  <img src={item.icon} alt={item.label} />
                                  <div className="rounded">{item.label}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      {ad.mediaType === null && (
                        <div className="flex md:gap-6 gap-3 md:mb-4 mb-2 md:mt-2 mt-1">
                          {mediaOptions.map(({ type, label, icon }) => (
                            <Button
                              key={type}
                              text={label}
                              icon={icon}
                              iconPosition="start"
                              backgroundColor="transparent"
                              onClick={() =>
                                handleChange(index, "mediaType", type)
                              }
                              className={`md:py-3 py-3 w-sp212 justify-start md:px-4 px-3 border-0.5 border-primary`}
                            />
                          ))}
                        </div>
                      )}
                      {mediaOptions.map(({ type, Component }) => {
                        if (ad.mediaType !== type) return null;

                        if (type === "video") {
                          return (
                            <div key={type} className="mt-4">
                              <Component
                                onClose={() => handleOnClose(index)}
                                videoUrl={ad.videoUrl}
                                videoThumbnailUrl={ad.videoThumbnail}
                                videoSource={ad.videoSource}
                                onUrlChange={(url: string) =>
                                  handleChange(index, "videoUrl", url)
                                }
                                onThumbnailUrlChange={(url: string) =>
                                  handleChange(index, "videoThumbnail", url)
                                }
                                onTypeChange={(type: string) => {
                                  handleTypeChange(index, type);
                                }}
                              />
                            </div>
                          );
                        } else if (type === "image") {
                          return (
                            <div key={type} className="mt-4">
                              <Component
                                onClose={() => handleOnClose(index)}
                                imageUrl={ad.imageUrl}
                                onUrlChange={(url: string) =>
                                  handleChange(index, "imageUrl", url)
                                }
                              />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <AdvertisementMoreFieldsRenderer
                      currentBlock={currentBlock}
                      moreFields={moreFields[index] || []}
                      setMoreFields={setMoreFields}
                      ad={ad}
                      index={index}
                      onChangeBlock={onChangeBlock}
                    />

                    {/* <div>
                      <p className="md:text-base/4 text-sm font-medium md:my-4 my-2">
                        Display On
                      </p>
                      <div className="flex items-center md:gap-4 gap-2">
                        {displays[index].map((item: any) => (
                          <div
                            className="flex items-center gap-sp6"
                            key={item.label}
                          >
                            <input
                              type="checkbox"
                              id={`${displayId}-${item.label}-${index}`}
                              checked={item.checked}
                              onChange={() =>
                                handleCheckboxChange(index, item.label)
                              }
                              className="peer hidden"
                            />
                            <label
                              htmlFor={`${displayId}-${item.label}-${index}`}
                              className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
                  peer-checked:bg-black peer-checked:border-black"
                            >
                              {item.checked && (
                                <img src={correctIcon} alt="Right" />
                              )}
                            </label>
                            <label
                              className="font-light "
                              htmlFor={`${displayId}-${item.label}-${index}`}
                            >
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div> */}

                    {/* <div className="mt-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex justify-between flex-col">
                          <h1 className="block mb-1 md:text-base text-sm font-medium ">
                            Type
                          </h1>
                          <div className="flex gap-3 pb-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`type-${typeId}-static-${index}`}
                                id={`${typeId}-static-${index}`}
                                value="static"
                                className="hover:bg-gray-300 h-4 w-4 cursor-pointer"
                                style={{ accentColor: "#000000" }}
                                required
                                checked={ad.promotionType === "static"}
                                onChange={() =>
                                  handleBlockViewTypeChange(index, "static")
                                }
                              />
                              <label
                                htmlFor={`${typeId}-static-${index}`}
                                className="md:text-base/4 text-sm font-light  cursor-pointer"
                              >
                                Static blocks
                              </label>
                            </div>
                            <div className="flex items-center gap-2 ">
                              <input
                                type="radio"
                                name={`type-${typeId}-popup-${index}`}
                                value="popup"
                                id={`${typeId}-popup-${index}`}
                                className="hover:bg-gray-300 h-4 w-4 cursor-pointer "
                                style={{ accentColor: "#000000" }}
                                required
                                checked={ad.promotionType === "popup"}
                                onChange={() =>
                                  handleBlockViewTypeChange(index, "popup")
                                }
                              />
                              <label
                                htmlFor={`${typeId}-popup-${index}`}
                                className="md:text-base/4 text-sm font-light  cursor-pointer"
                              >
                                Pop up
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="flex ">
                          <div className="grid grid-cols-2 w-full gap-4">
                            <div>
                              <label
                                htmlFor="startTime"
                                className="block mb-1 md:text-base text-sm font-medium"
                              >
                                Start
                              </label>

                              <div className="relative w-full">
                                <select
                                  id="startTime"
                                  disabled={ad.promotionType === "static"}
                                  value={ad.startTime}
                                  onChange={(e) => handleSelectChange(e, index)}
                                  className={`appearance-none w-full md:p-2 p-1 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl ${
                                    ad.promotionType === "static"
                                      ? "bg-gray-100 opacity-40 cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  {Array.from({ length: 60 }, (_, index) => (
                                    <option key={index + 1} value={index}>
                                      {index} {index + 1 === 1 ? "sec" : "sec"}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                  <img src={chevronDown} alt="Chevron Down" />
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <label
                                htmlFor="endTime"
                                className="block mb-1 md:text-base text-sm font-medium"
                              >
                                End
                              </label>
                              <div className="relative w-full">
                                <select
                                  id="endTime"
                                  onChange={(e) => handleSelectChange(e, index)}
                                  value={ad.endTime}
                                  disabled={ad.promotionType === "static"}
                                  className={`appearance-none w-full md:p-2 p-1 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl ${
                                    ad.promotionType === "static"
                                      ? "bg-gray-100 opacity-40 cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  {Array.from({ length: 60 }, (_, index) => (
                                    <option key={index + 1} value={index}>
                                      {index} {index + 1 === 1 ? "sec" : "sec"}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                  <img src={chevronDown} alt="Chevron Down" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <label
                            htmlFor="location"
                            className="block mb-1 md:text-base text-sm font-medium"
                          >
                            Location
                          </label>
                          <div className="relative w-full">
                            <select
                              id="location"
                              value={ad.location}
                              onChange={(e) => handleSelectChange(e, index)}
                              disabled={ad.promotionType === "static"}
                              className={`appearance-none w-full md:p-2 p-1 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl ${
                                ad.promotionType === "static"
                                  ? "bg-gray-100 opacity-40 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <option value="center">Center</option>
                              <option value="bottom-right-corner">
                                Bottom Right Corner
                              </option>
                              <option value="sticky-rail-bottom">
                                Sticky Rail Bottom
                              </option>
                              <option value="sticky-rail-up">
                                Sticky Rail Up
                              </option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              <img src={chevronDown} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </>
                )}
              </div>
            </React.Fragment>
          );
        })}
        {/* <Button
          text="Add More"
          icon={plusIcon}
          backgroundColor="transparent"
          className="addSideBarBtn relative p-0"
          onClick={handleAddMoreAds}
        /> */}
        <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={commonMoreFields}
          setMoreFields={setCommonMoreFields}
        />
      </div>
      <div className="mt-5  flex items-center md:gap-8 gap-2">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        <div className="relative" ref={dropdownRef}>
          <MoreFieldsEditor
            currentBlock={currentBlock}
            moreFields={commonMoreFields}
            setMoreFields={setCommonMoreFields}
            onChangeBlock={onChangeBlock}
            fieldsToShow={["description", "cta"]}
          />
        </div>
      </div>
    </>
  );
};

export default AdvertisementsBlock;
