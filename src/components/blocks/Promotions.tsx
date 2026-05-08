import { useEffect, useRef, useState } from "react";
import {
  arrowDownIcon,
  arrowUpIcon,
  // chevronDown,
  closeIcon,
  // correctIcon,
  mediaIcon,
  // moreVerticalIcon,
  plusIcon,
} from "../../icons";
import ChangeBlockType from "./ChangeBlockType";
import Input from "../ui/input/Input";
import type { BlockTypeProps } from "./changeBlockTypes";
import Button from "../ui/button";
import ContentLibrary from "../contentPanel/ContentLibrary";
// import { moreDefaultObjects, type MoreObjectTypes } from "./blocksObjectConfig";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import { concatImgURL } from "../../config/function";
// import ToggleSwitch from "../ui/switch/ToggleSwitch";

const Promotions = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [activeMediaUrl, setActiveMediaUrl] = useState<null | string>(null);
  const uploadTypeMap: Record<string, string> = {
    nativeImgUrl: "block",
    sponsor_img: "sponsor",
  };
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // const typeIdRef = useRef(Date.now());
  // const typeId = typeIdRef.current;
  // const displayIdRef = useRef(Date.now());
  // const displayId = displayIdRef.current;

  // const [type, setType] = useState<"static" | "pop-up" | string>("static");
  // const options = ["Web", "App"];
  // const displays = options.map((label) => ({
  //   label,
  //   checked: currentBlock.content.display_on?.includes(label) || false,
  // }));
  // const [promotionData, setPromotionData] = useState({
  //   startTime: 0,
  //   endTime: 0,
  //   location: "",
  // });
  const [isPreview, _setIsPreview] = useState(false);

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { id, value } = e.target;

  //   const updatedValue =
  //     id === "startTime" || id === "endTime" ? Number(value) : value;

  //   setPromotionData((prev) => ({
  //     ...prev,
  //     [id]: updatedValue,
  //   }));

  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: {
  //       ...currentBlock.content,
  //       [id]: updatedValue,
  //     },
  //   });
  // };

  // const handleCheckboxChange = (label: string) => {
  //   const currentDisplayOn = currentBlock.content.display_on || [];

  //   const updatedDisplayOn = currentDisplayOn.includes(label)
  //     ? currentDisplayOn.filter((item: string) => item !== label)
  //     : [...currentDisplayOn, label];

  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: {
  //       ...currentBlock.content,
  //       display_on: updatedDisplayOn,
  //     },
  //   });
  // };

  // const handleChange = (label: string, value: string) => {
  //   const updatedContent = { ...currentBlock.content };

  //   updatedContent[label] = value;
  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: updatedContent,
  //   });
  // };

  const handleBannerChange = (index: number, field: string, value: string) => {
    const updatedBanners = [...currentBlock.content.banners];

    updatedBanners[index] = {
      ...updatedBanners[index],
      [field]: value,
    };

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        banners: updatedBanners,
      },
    });
  };

  // Add new banner
  const addBanner = () => {
    const banners = currentBlock.content.banners || [];
    const nextOrder =
      banners.length > 0
        ? Math.max(...banners.map((b: any) => b.order ?? 0)) + 1
        : 1;

    const updatedBanners = [
      ...banners,
      {
        nativeImgUrl: "",
        mobileImgUrl: "",
        redirectUrl: "",
        order: nextOrder,
      },
    ];
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        banners: updatedBanners,
      },
    });
  };

  // Remove banner by index
  const removeBanner = (index: number) => {
    const updatedBanners = currentBlock.content.banners
      .filter((_: any, i: number) => i !== index)
      .map((banner: any, i: number) => ({
        ...banner,
        order: i + 1,
      }));

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        banners: updatedBanners,
      },
    });
  };

  const reorderBanner = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.banners) return;

    const bannersCopy = currentBlock.content.banners.map((banner: any) => ({
      ...banner,
    }));

    // Ensure the indices are valid
    if (toIndex < 0 || toIndex >= bannersCopy.length) return;

    // Move the item
    const [movedBanner] = bannersCopy.splice(fromIndex, 1);
    bannersCopy.splice(toIndex, 0, movedBanner);

    // Reassign order values (if needed)
    const reorderedBanners = bannersCopy.map((banner: any, index: number) => ({
      ...banner,
      order: index + 1,
    }));

    // Send update
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        banners: reorderedBanners,
      },
    });
  };

  // const handleTypeChange = (type: string) => {
  //   setType(type);
  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: {
  //       ...currentBlock.content,
  //       promotionType: type,
  //     },
  //   });
  // };

  useEffect(() => {
    if (currentBlock.content?.more) {
      const fields = Object.keys(currentBlock.content?.more);
      setMoreFields(fields);
    }
  }, [currentBlock]);

  return (
    <>
      {/* {currentBlock.content?.provider == "native" && (
        <div className="flex items-center justify-end">
          <ToggleSwitch
            checked={isPreview}
            label="Preview"
            onChange={() => setIsPreview(!isPreview)}
          />
        </div>
      )} */}
      {isPreview ? (
        <>
          <div className="relative">
            <img
              src={concatImgURL(currentBlock.content?.nativeImgUrl)}
              className="mt-2 w-full object-cover rounded-xl h-80"
            />
            <div className="absolute top-1/2 left-4">
              <h3>{currentBlock?.content?.more?.title}</h3>
              <p>{currentBlock?.content?.more?.description}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="md:pb-6 pb-3 border-b-primary border-b-0.5">
            {/* <div className="md:mb-5 mb-2">
            <label
              htmlFor="videoSource"
              className="block md:text-base font-medium text-sm md:mb-2 mb-1"
            >
              Provider
            </label>
            <div className="relative">
              <select
                id="videoSource"
                value={currentBlock.content?.provider}
                onChange={(e) => handleChange("provider", e.target.value)}
                className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary md:rounded-2xl rounded-lg"
              >
                <option value="" disabled>
                  Please Select
                </option>
                <option value="native">Native</option>
              </select>
              <div className="absolute md:right-4 right-2 top-1/2 -translate-y-1/2">
                <img src={chevronDown} />
              </div>
            </div>
          </div> */}

            {/* {currentBlock.content?.provider == "googleAdManager" && (
              <>
                <div className="md:mb-5 mb-2">
                  <label
                    htmlFor="videoSource"
                    className="block md:text-base text-sm font-medium md:mb-2 mb-1"
                  >
                    Network Code*
                  </label>
                  <div className="relative">
                    <select
                      id="videoSource"
                      value={currentBlock.content?.network_code}
                      onChange={(e) =>
                        handleChange("network_code", e.target.value)
                      }
                      className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary md:rounded-2xl rounded-lg"
                    >
                      <option value="" disabled>
                        Please Select
                      </option>
                      <option value="opt1">Option 1</option>
                      <option value="opt2">Option 2</option>
                    </select>
                    <div className="absolute md:right-4 right-2 top-1/2 -translate-y-1/2">
                      <img src={chevronDown} />
                    </div>
                  </div>
                </div>

                <Input
                  label="Code*"
                  value={currentBlock.content?.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                />
                <div>
                  <p className="md:text-base/4 text-sm font-medium md:my-4 my-2">
                    Display On
                  </p>
                  <div className="flex items-center md:gap-4 gap-2">
                    {displays.map((item) => (
                      <div
                        className="flex items-center gap-sp6"
                        key={item.label}
                      >
                        <input
                          type="checkbox"
                          id={`${displayId}-${item.label}`}
                          checked={item.checked}
                          onChange={() => handleCheckboxChange(item.label)}
                          className="peer hidden"
                        />
                        <label
                          htmlFor={`${displayId}-${item.label}`}
                          className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
                  peer-checked:bg-black peer-checked:border-black"
                        >
                          {item.checked && (
                            <img src={correctIcon} alt="Right" />
                          )}
                        </label>
                        <label
                          className="font-light "
                          htmlFor={`${displayId}-${item.label}`}
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )} */}

            {/* {currentBlock.content?.provider == "native" && ( */}
            <div className="relative mb-4">
              {currentBlock?.content?.banners?.length > 0 &&
                currentBlock?.content?.banners?.map(
                  (item: any, index: number) => {
                    const totalBanners = currentBlock.content.banners.length;
                    const isFirst = index === 0;
                    const isLast = index === totalBanners - 1;
                    return (
                      <div
                        key={index}
                        className="relative p-3 bg-f6f6f6 border-0.5 border-primary rounded-2xl mb-3"
                      >
                        <div className="flex items-center gap-2 justify-end">
                          {totalBanners > 1 && !isFirst && (
                            <Button
                              icon={arrowUpIcon}
                              backgroundColor="transparent"
                              className="p-0 md:w-5 w-3 md:h-5 h-3"
                              onClick={() => reorderBanner(index, index - 1)}
                            />
                          )}
                          {totalBanners > 1 && !isLast && (
                            <Button
                              icon={arrowDownIcon}
                              backgroundColor="transparent"
                              className="p-0 md:w-5 w-3 md:h-5 h-3"
                              onClick={() => reorderBanner(index, index + 1)}
                            />
                          )}
                          {totalBanners > 1 && (
                            <Button
                              icon={closeIcon}
                              backgroundColor="transparent"
                              onClick={() => removeBanner(index)}
                              className="p-0 w-5"
                            />
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-5 mb-3">
                          <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                            <div className="md:w-sp170 w-20 h-full">
                              {item.nativeImgUrl ? (
                                <img
                                  src={concatImgURL(item.nativeImgUrl)}
                                  alt="Uploaded"
                                  className="w-full h-full rounded-2xl object-contain p-2 border-0.5 border-primary block align-middle"
                                />
                              ) : (
                                <div className="bg-white border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                                  <img src={mediaIcon} alt="Placeholder" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <Input
                                label="Image URL (Website Desktop)"
                                placeholder="https://www.example.com"
                                className="m-0"
                                value={concatImgURL(item.nativeImgUrl)}
                                onChange={(e) =>
                                  handleBannerChange(
                                    index,
                                    "nativeImgUrl",
                                    e.target.value,
                                  )
                                }
                              />
                              <div>
                                {item.nativeImgUrl ? (
                                  <Button
                                    text="Remove Image"
                                    icon={closeIcon}
                                    backgroundColor="transparent"
                                    className="py-0"
                                    imageclassName="md:w-5 w-3 md:h-5 h-3"
                                    onClick={() =>
                                      handleBannerChange(
                                        index,
                                        "nativeImgUrl",
                                        "",
                                      )
                                    }
                                  />
                                ) : (
                                  <Button
                                    icon={plusIcon}
                                    text="Add Image"
                                    backgroundColor="transparent"
                                    className="py-0"
                                    imageclassName="md:w-5 w-3 md:h-5 h-3"
                                    onClick={() => {
                                      setActiveMediaUrl("nativeImgUrl");
                                      setActiveBannerIndex(index);
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                            <div className="md:w-sp170 w-20 h-full">
                              {item?.mobileImgUrl ? (
                                <img
                                  src={concatImgURL(item?.mobileImgUrl)}
                                  alt="Uploaded"
                                  className="w-full h-full rounded-2xl object-contain p-2 border-0.5 border-primary block align-middle"
                                />
                              ) : (
                                <div className="bg-white border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                                  <img src={mediaIcon} alt="Placeholder" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <Input
                                label="Mobile Image URL (Website Mobile/App)"
                                placeholder="https://www.example.com"
                                className="m-0"
                                value={concatImgURL(item?.mobileImgUrl)}
                                onChange={(e) =>
                                  handleBannerChange(
                                    index,
                                    "mobileImgUrl",
                                    e.target.value,
                                  )
                                }
                              />
                              <div>
                                {item?.mobileImgUrl ? (
                                  <Button
                                    text="Remove Image"
                                    icon={closeIcon}
                                    backgroundColor="transparent"
                                    className="py-0"
                                    imageclassName="md:w-5 w-3 md:h-5 h-3"
                                    onClick={() =>
                                      handleBannerChange(
                                        index,
                                        "mobileImgUrl",
                                        "",
                                      )
                                    }
                                  />
                                ) : (
                                  <Button
                                    icon={plusIcon}
                                    text="Add Image"
                                    backgroundColor="transparent"
                                    className="py-0"
                                    imageclassName="md:w-5 w-3 md:h-5 h-3"
                                    onClick={() => {
                                      setActiveMediaUrl("mobileImgUrl");
                                      setActiveBannerIndex(index);
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Input
                          label="Link (Optional)"
                          placeholder="Enter redirect url here..."
                          value={item?.redirectUrl}
                          onChange={(e) =>
                            handleBannerChange(
                              index,
                              "redirectUrl",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    );
                  },
                )}
            </div>
            <Button
              text="Add Banner"
              icon={plusIcon}
              className="relative addSideBarBtn"
              backgroundColor="transparent"
              onClick={addBanner}
            />
            {/* )} */}

            {moreFields.length > 0 && (
              <MoreFieldsRenderer
                currentBlock={currentBlock}
                onChangeBlock={onChangeBlock}
                moreFields={moreFields}
                setMoreFields={setMoreFields}
              />
            )}
          </div>
        </>
      )}

      <div className="mt-5 flex items-center md:gap-5">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        <div className="relative" ref={dropdownRef}>
          <MoreFieldsEditor
            currentBlock={currentBlock}
            moreFields={moreFields}
            setMoreFields={setMoreFields}
            onChangeBlock={onChangeBlock}
            fieldsToShow={["description"]}
          />
        </div>
      </div>
      {activeMediaUrl != null && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          uploadType={
            activeMediaUrl ? uploadTypeMap[activeMediaUrl] || "block" : "block"
          }
          onSelect={(url: string) => {
            handleBannerChange(activeBannerIndex, activeMediaUrl!, url);
            setActiveMediaUrl(null);
          }}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default Promotions;
