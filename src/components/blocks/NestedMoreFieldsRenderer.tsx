import { useState } from "react";
import { capitalize, concatImgURL } from "../../config/function";
import { closeIcon, globeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import ContentLibrary from "../contentPanel/ContentLibrary";

interface NestedProps {
  currentBlock: any;
  onChangeBlock: any;
  moreFields: any;
  setMoreFields?: any;
  contentKey: string;
  activeIndex: number;
}

const setNestedValue = (obj: any, path: string, value: any) => {
  const keys = path.split(".");
  const lastKey = keys.pop();

  // We'll create a shallow copy of obj so we don't mutate original
  let newObj = { ...obj };
  let current = newObj;

  for (const key of keys) {
    // If next level is missing or not an object, create empty object
    if (typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    } else {
      // Clone nested object to avoid mutation of original refs
      current[key] = { ...current[key] };
    }
    current = current[key];
  }

  if (lastKey) {
    current[lastKey] = value;
  }

  return newObj; // Return the updated object copy
};

const deleteNestedValue = (obj: any, path: string): any => {
  const keys = path.split(".");
  if (keys.length === 0) return obj;

  const lastKey = keys.pop();
  // Clone the whole object to avoid mutation
  let newObj = { ...obj };
  let current = newObj;

  for (const key of keys) {
    if (!current[key]) return obj; // Path doesn't exist, nothing to delete
    current[key] = { ...current[key] };
    current = current[key];
  }

  if (lastKey && current.hasOwnProperty(lastKey)) {
    delete current[lastKey];
  }

  return newObj;
};

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

const uploadTypeMap: Record<string, string> = {
  imgUrl: "block",
  sponsor_img: "sponsor",
  thumbnailUrl: "thumbnail",
};

const NestedMoreFieldsRenderer = ({
  currentBlock,
  onChangeBlock,
  moreFields,
  setMoreFields,
  contentKey,
  activeIndex,
}: NestedProps) => {
  const items = currentBlock.content?.[contentKey] || [];
  const currentItem = items[activeIndex] || {};
  const more = currentItem.more || {};
  const [activeMediaUrl, setActiveMediaUrl] = useState<null | string>(null);

  //   const handleMoreFieldChange = (fieldPath: string, value: string) => {
  //     const newMore = { ...(currentItem.more || {}) };
  //     setNestedValue(newMore, fieldPath, value);

  //     const updatedItem = {
  //       ...currentItem,
  //       more: newMore,
  //     };

  //     const updatedItems = [...items];
  //     updatedItems[activeIndex] = updatedItem;

  //     const updatedBlock = {
  //       ...currentBlock,
  //       content: {
  //         ...currentBlock.content,
  //         [contentKey]: updatedItems,
  //       },
  //     };

  //     onChangeBlock(updatedBlock);
  //   };

  const handleMoreFieldChange = (fieldPath: string, value: string) => {
    // Instead of mutating currentItem.more, get a new updated more object immutably
    const newMore = setNestedValue(currentItem.more || {}, fieldPath, value);

    const updatedItem = {
      ...currentItem,
      more: newMore,
    };

    const updatedItems = [...items];
    updatedItems[activeIndex] = updatedItem;

    const updatedBlock = {
      ...currentBlock,
      content: {
        ...currentBlock.content,
        [contentKey]: updatedItems,
      },
    };

    onChangeBlock(updatedBlock);
  };

  //   const handleRemoveField = (field: string) => {
  //     if (setMoreFields) {
  //       setMoreFields(moreFields.filter((f: any) => f !== field));
  //     }

  //     const updatedBlock = structuredClone(currentBlock);

  //     if (!updatedBlock.content?.[contentKey]) return;

  //     const updatedItems = [...updatedBlock.content[contentKey]];
  //     const item = { ...updatedItems[activeIndex] };

  //     if (item.more) {
  //       item.more = deleteNestedValue(item.more, field);
  //     }

  //     updatedItems[activeIndex] = item;
  //     updatedBlock.content[contentKey] = updatedItems;

  //     onChangeBlock?.(updatedBlock);
  //   };

  const handleRemoveField = (field: string) => {
    if (setMoreFields) {
      setMoreFields((prev: Record<number, string[]>) => {
        // Clone previous state to avoid mutation
        const newMoreFields = { ...prev };

        // Remove the field only from the current activeIndex's array
        const currentFields = newMoreFields[activeIndex] || [];
        newMoreFields[activeIndex] = currentFields.filter((f) => f !== field);

        return newMoreFields;
      });
    }

    const updatedBlock = structuredClone(currentBlock);

    if (!updatedBlock.content?.[contentKey]) return;

    const updatedItems = [...updatedBlock.content[contentKey]];
    const item = { ...updatedItems[activeIndex] };

    if (item.more) {
      item.more = deleteNestedValue(item.more, field);
    }

    updatedItems[activeIndex] = item;
    updatedBlock.content[contentKey] = updatedItems;

    onChangeBlock?.(updatedBlock);
  };

  return (
    <>
      {moreFields.length > 0 && (
        <div>
          {moreFields?.map((field: any) => (
            <div key={field} className="md:mt-5 mt-2 relative">
              {field === "title" && (
                <Input
                  label={capitalize(field)}
                  placeholder={`Enter ${field}`}
                  className="m-0 md:text-base/4 text-sm font-medium"
                  value={more?.[field] || ""}
                  onChange={(e) => handleMoreFieldChange(field, e.target.value)}
                />
              )}

              {field === "description" && (
                <div>
                  <label className="block md:text-base/4 text-sm mb-2 font-medium">
                    {capitalize(field)}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={`Enter ${field}`}
                    className="w-full p-3 text-base border-0.5 border-primary rounded-2xl resize-none"
                    value={more?.[field] || ""}
                    onChange={(e) =>
                      handleMoreFieldChange(field, e.target.value)
                    }
                  />
                </div>
              )}

              {field === "altText" && (
                <Input
                  label="Alt Text"
                  placeholder="Enter alt text"
                  value={more?.altText || ""}
                  onChange={(e) =>
                    handleMoreFieldChange("altText", e.target.value)
                  }
                />
              )}

              {field === "thumbnailUrl" && (
                <div>
                  <label
                    htmlFor="thumbnail"
                    className="block md:text-base/4 text-sm  mb-2 font-medium"
                  >
                    Thumbnail URL
                  </label>
                  <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                    <div className="md:w-sp170 w-20 h-full">
                      {more?.thumbnailUrl ? (
                        <img
                          src={concatImgURL(more.thumbnailUrl)}
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
                        value={concatImgURL(more?.thumbnailUrl || "")}
                        readOnly
                        className="m-0 "
                        // onChange={(e) =>
                        //   handleMoreFieldChange("thumbnailUrl", e.target.value)
                        // }
                      />
                      <div>
                        {more?.thumbnailUrl ? (
                          <Button
                            text="Remove Image"
                            icon={closeIcon}
                            onClick={() =>
                              handleMoreFieldChange("thumbnailUrl", "")
                            }
                            backgroundColor="transparent"
                            className="py-0"
                          />
                        ) : (
                          <Button
                            icon={plusIcon}
                            text="Add Image"
                            onClick={() => setActiveMediaUrl("thumbnailUrl")}
                            backgroundColor="transparent"
                            className="py-0"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {field === "link" && (
                <>
                  <Input
                    label="Link"
                    placeholder="https://www.example.com"
                    value={more?.link || ""}
                    onChange={(e) =>
                      handleMoreFieldChange("link", e.target.value)
                    }
                  />
                  <div className="flex items-center gap-2 py-2">
                    <img src={globeIcon} alt="Globe" className="w-4 h-4" />
                    <p className="font-semibold text-sm">
                      URL Builder (Recommended)
                    </p>
                  </div>
                </>
              )}

              {field === "sponsor" && (
                <>
                  <div className="flex md:h-sp100 h-20  md:gap-4 gap-2">
                    <div className="md:w-sp170 w-20 h-full">
                      {getNestedValue(more, "sponsor.sponsor_img") ? (
                        <img
                          src={getNestedValue(more, "sponsor.sponsor_img")}
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
                        label="Sponsor Image URL"
                        placeholder="https://www.example.com"
                        className="m-0"
                        value={
                          getNestedValue(more, "sponsor.sponsor_img") || ""
                        }
                        readOnly
                        // onChange={(e) =>
                        //   handleMoreFieldChange(
                        //     "sponsor.sponsor_img",
                        //     e.target.value
                        //   )
                        // }
                      />
                      <div>
                        {getNestedValue(more, "sponsor.sponsor_img") ? (
                          <Button
                            text="Remove Image"
                            icon={closeIcon}
                            onClick={() =>
                              handleMoreFieldChange("sponsor.sponsor_img", "")
                            }
                            backgroundColor="transparent"
                            className="py-0"
                          />
                        ) : (
                          <Button
                            icon={plusIcon}
                            text="Add Image"
                            onClick={() =>
                              setActiveMediaUrl("sponsor.sponsor_img")
                            }
                            backgroundColor="transparent"
                            className="py-0"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 pt-4">
                    <Input
                      label="Sponsor Text"
                      value={getNestedValue(more, "sponsor.sponsor_name") || ""}
                      onChange={(e) =>
                        handleMoreFieldChange(
                          "sponsor.sponsor_name",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      label="Sponsor Link URL"
                      placeholder="https://www.example.com"
                      value={getNestedValue(more, "sponsor.sponsor_url") || ""}
                      onChange={(e) =>
                        handleMoreFieldChange(
                          "sponsor.sponsor_url",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </>
              )}

              {field === "cta" && (
                <div className="grid grid-cols-2 gap-5">
                  <Input
                    label="Button Text"
                    value={getNestedValue(more, "cta.button_label") || ""}
                    onChange={(e) =>
                      handleMoreFieldChange("cta.button_label", e.target.value)
                    }
                  />
                  <Input
                    label="Button Link URL"
                    placeholder="https://www.example.com"
                    value={getNestedValue(more, "cta.button_link") || ""}
                    onChange={(e) =>
                      handleMoreFieldChange("cta.button_link", e.target.value)
                    }
                  />
                </div>
              )}
              <Button
                icon={closeIcon}
                backgroundColor="transparent"
                className="absolute right-0 md:-top-2 top-0 p-0 w-4"
                onClick={() => handleRemoveField(field)}
              />
            </div>
          ))}
        </div>
      )}
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

export default NestedMoreFieldsRenderer;
