import { useEffect, useRef, useState } from "react";
import type { BlockTypeProps } from "./changeBlockTypes";
import {
  arrowDownIcon,
  arrowUpIcon,
  chevronDown,
  closeIcon,
  moreIcon,
  plusIcon,
} from "../../icons";
import Button from "../ui/button";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import ChangeBlockType from "./ChangeBlockType";
import MoreFieldsEditor from "./MoreFieldsEditor";
import { mediaOptions } from "../heroMedia/mediaOptionConfig";
import { timelineDropDownItems } from "../heroMedia/tabs";
import { multipleAdsMoreDefaultObjects } from "./blocksObjectConfig";
// import ToggleSwitch from "../ui/switch/ToggleSwitch";
import { v4 as uuidv4 } from "uuid";
import Input from "../ui/input/Input";
import TimelineMoreFieldsRenderer from "./TimelineMoreFieldsRenderer";

const TimeLineBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropDownItemRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [showDropdowns, setShowDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  const [moreFields, setMoreFields] = useState<Record<number, string[]>>({});
  const [commonMoreFields, setCommonMoreFields] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (index: number) => {
    setShowDropdowns((prev) => {
      const newState: { [key: number]: boolean } = {};
      Object.keys(prev).forEach((key) => {
        newState[+key] = false;
      });
      return { ...newState, [index]: !prev[index] };
    });
  };

  //   const [livePreview, setLivePreview] = useState<boolean[]>(
  //     currentBlock.content.timelines.map(() => false)
  //   );

  const handleOnClose = (index: number) => {
    const updatedTimelines = currentBlock.content.timelines.map(
      (timeline: any, i: number) =>
        i === index
          ? {
            ...timeline,
            mediaType: null,
            imageUrl: "",
            videoUrl: "",
            videoThumbnail: "",
          }
          : timeline
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        timelines: updatedTimelines,
      },
    });
  };

  const handleTypeChange = (index: number, type: string) => {
    const updatedTimelines = currentBlock.content.timelines.map(
      (timeline: any, i: number) =>
        i === index
          ? {
            ...timeline,
            videoSource: type,
          }
          : timeline
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        timelines: updatedTimelines,
      },
    });
  };

  const handleChange = (index: number, key: string, value: any) => {
    const updatedTimelines = currentBlock.content.timelines.map(
      (timeline: any, i: number) => {
        if (i !== index) return timeline;

        let updatedValue = value;

        if (key == "is_form") {
          updatedValue = value === "yes";
        }
        const updatedTimeline = {
          ...timeline,
          [key]: updatedValue,
        };

        // ✅ Auto-add title field if mediaAlignment is left or right
        // if (
        //   key === "mediaAlignment" &&
        //   (value === "left" || value === "right") &&
        //   !timeline.more?.title
        // ) {
        //   updatedTimeline.more = {
        //     ...(timeline.more || {}),
        //     title: "",
        //   };

        //   // ✅ Also update moreFields state to include 'title' for this index
        //   setMoreFields((prev) => {
        //     const currentFields = prev[index] || [];
        //     return {
        //       ...prev,
        //       [index]: currentFields.includes("title")
        //         ? currentFields
        //         : [...currentFields, "title"],
        //     };
        //   });
        // }

        return updatedTimeline;
      }
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        timelines: updatedTimelines,
      },
    });
  };

  const handleAddMoreTimelines = () => {
    const timelines = currentBlock.content.timelines;
    const nextOrder =
      Math.max(...timelines.map((a: any) => a.order || 0), 0) + 1;
    const updatedTimelines = [
      ...timelines,

      {
        id: uuidv4(),
        title: "",
        imageUrl: "",
        videoSource: "native",
        videoUrl: "",
        videoThumbnail: "",
        mediaType: null,
        mediaAlignment: "left",
        order: nextOrder,
        more: {
          title: "",
        },
      },
    ];

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        timelines: updatedTimelines,
      },
    });
  };

  const handleRemoveTimelines = (index: number) => {
    const updatedTimelines = (currentBlock.content?.timelines || [])
      .filter((_item: unknown, i: number) => i !== index)
      .map((timelines: any, newIndex: number) => ({
        ...timelines,
        order: newIndex + 1,
      }));

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        timelines: updatedTimelines,
      },
    });
  };

  const reorderTimelines = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.timelines) return;

    const timelinesCopy = currentBlock.content.timelines.map(
      (timeline: any) => ({
        ...timeline,
      })
    );

    // Ensure the indices are valid
    if (toIndex < 0 || toIndex >= timelinesCopy.length) return;

    // Move the item
    const [movedTimeline] = timelinesCopy.splice(fromIndex, 1);
    timelinesCopy.splice(toIndex, 0, movedTimeline);

    // Reassign order values (if needed)
    const reorderedTimelines = timelinesCopy.map(
      (timeline: any, index: number) => ({
        ...timeline,
        order: index + 1,
      })
    );

    // Send update
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        timelines: reorderedTimelines,
      },
    });
  };

  //   const handleTogglePreview = (index: number) => {
  //     setLivePreview((prev) => {
  //       const updated = [...prev];
  //       updated[index] = !updated[index];
  //       return updated;
  //     });
  //   };

  const singleEntryFields: (keyof typeof multipleAdsMoreDefaultObjects)[] = [
    "title",
    "description",
    "link",
  ];

  const handleAddField = (
    index: number,
    type: keyof typeof multipleAdsMoreDefaultObjects
  ) => {
    const updatedTimelines = currentBlock.content.timelines.map(
      (timeline: any, i: number) => {
        if (i !== index) return timeline;

        const existing = timeline.more?.[type];

        // Block re-adding if it's a single-entry field and already exists
        if (singleEntryFields.includes(type) && existing) return timeline;

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
            })
          );

          newField = [...(existing || []), ...freshItems];
        }

        return {
          ...timeline,
          more: {
            ...(timeline.more || {}),
            [type]: newField,
          },
        };
      }
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        timelines: updatedTimelines,
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
    if (!currentBlock?.content?.timelines) return;

    const initialFields: Record<number, string[]> = {};

    currentBlock.content.timelines.forEach((timeline: any, index: number) => {
      if (timeline.more && typeof timeline.more === "object") {
        initialFields[index] = Object.keys(timeline.more);
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

  return (
    <>
      <div className="md:pb-6 pb-3 border-b-primary border-b-0.5">
        {currentBlock.content.timelines.map((timeline: any, index: number) => {
          const totalTimeLines = currentBlock.content.timelines.length;
          const isFirst = index === 0;
          const isLast = index === totalTimeLines - 1;

          return (
            // <React.Fragment>
            <div
              key={timeline.id}
              className="bg-f6f6f6 p-4 rounded-xl md:mb-4 mb-2"
            >
              <div className="flex items-center gap-2 justify-end">
                {/* <ToggleSwitch
                    checked={livePreview[index] || false}
                    onChange={() => handleTogglePreview(index)}
                    label="Preview"
                  /> */}
                {totalTimeLines > 1 && !isFirst && (
                  <Button
                    icon={arrowUpIcon}
                    backgroundColor="transparent"
                    className="p-0 md:w-5 w-3 md:h-5 h-3"
                    onClick={() => reorderTimelines(index, index - 1)}
                  />
                )}
                {totalTimeLines > 1 && !isLast && (
                  <Button
                    icon={arrowDownIcon}
                    backgroundColor="transparent"
                    className="p-0 md:w-5 w-3 md:h-5 h-3"
                    onClick={() => reorderTimelines(index, index + 1)}
                  />
                )}
                {totalTimeLines > 1 && (
                  <Button
                    icon={closeIcon}
                    backgroundColor="transparent"
                    onClick={() => handleRemoveTimelines(index)}
                    className="md:p-0 w-5"
                  />
                )}
              </div>

              {/* {livePreview[index] ? (
                  <div className="mt-3">
                    <AdvertisementPreview data={ad} />
                  </div>
                ) : ( */}
              <>
                <div className="flex gap-4 items-center md:mb-3 mb-2">
                  {!timeline?.is_form && (
                    <div className="w-[45%] ">
                      <div className="flex items-center gap-2 md:mb-2 mb-1">
                        <label
                          htmlFor="mediaAlign"
                          className="md:text-base text-sm font-semibold "
                        >
                          Media Alignment
                        </label>
                      </div>
                      <div className="relative">
                        <select
                          id="mediaAlign"
                          value={timeline.mediaAlignment}
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
                          <option value="right">Right</option>
                        </select>
                        <div className="absolute md:right-4 right-2 top-1/2 -translate-y-1/2">
                          <img src={chevronDown} />
                        </div>
                      </div>
                    </div>
                  )}
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
                        ${showDropdowns[index]
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                          }
                        `}
                      >
                        {timelineDropDownItems.map((item) => {
                          const isSingleEntry = singleEntryFields.includes(
                            item.value as keyof typeof multipleAdsMoreDefaultObjects
                          );
                          const isAlreadyAdded =
                            isSingleEntry &&
                            currentBlock.content.timelines?.[index]?.more?.[
                            item.value
                            ];

                          return (
                            <div
                              key={item.value}
                              className={`flex px-1 rounded-2xl items-center gap-2 my-1 ${isAlreadyAdded
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

                <div className="mb-3 grid grid-cols-2 items-end gap-5">
                  <Input
                    label="Timeline Year Title"
                    value={timeline.tagline_title}
                    onChange={(e) =>
                      handleChange(index, "tagline_title", e.target.value)
                    }
                  />
                  <div>
                    <label className="block md:text-base/4 text-sm mb-2 font-medium">
                      Enable Form
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full md:p-2 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-xl"
                        value={timeline?.is_form ? "yes" : "no"}
                        onChange={(e) =>
                          handleChange(index, "is_form", e.target.value)
                        }
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                        <img src={chevronDown} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {!timeline?.is_form && timeline.mediaType === null && (
                    <div className="flex md:gap-6 gap-3 md:mb-4 mb-2 md:mt-2 mt-1">
                      {mediaOptions.map(({ type, label, icon }) => (
                        <Button
                          key={type}
                          text={label}
                          icon={icon}
                          iconPosition="start"
                          backgroundColor="transparent"
                          onClick={() => handleChange(index, "mediaType", type)}
                          className={`md:py-3 py-3 w-sp212 justify-start md:px-4 px-3 border-0.5 border-primary`}
                        />
                      ))}
                    </div>
                  )}
                  {mediaOptions.map(({ type, Component }) => {
                    if (timeline.mediaType !== type) return null;

                    if (type === "video") {
                      return (
                        <div key={type} className="mt-4">
                          <Component
                            onClose={() => handleOnClose(index)}
                            videoUrl={timeline.videoUrl}
                            videoThumbnailUrl={timeline.videoThumbnail}
                            videoSource={timeline.videoSource}
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
                            imageUrl={timeline.imageUrl}
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

                <TimelineMoreFieldsRenderer
                  currentBlock={currentBlock}
                  moreFields={moreFields[index] || []}
                  setMoreFields={setMoreFields}
                  timeline={timeline}
                  index={index}
                  onChangeBlock={onChangeBlock}
                />
              </>
              {/* )} */}
            </div>
            // </React.Fragment>
          );
        })}
        <Button
          text="Add More"
          icon={plusIcon}
          backgroundColor="transparent"
          className="addSideBarBtn relative p-0"
          onClick={handleAddMoreTimelines}
        />
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

export default TimeLineBlock;
