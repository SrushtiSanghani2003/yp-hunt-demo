import { concatImgURL } from "../../config/function";
import {
  arrowDownIcon,
  arrowUpIcon,
  chevronDown,
  closeIcon,
  mediaIcon,
  plusIcon,
} from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import ChangeBlockType from "./ChangeBlockType";
import { v4 as uuidv4 } from "uuid";
import type { BlockTypeProps } from "./changeBlockTypes";
import { useState } from "react";
import ContentLibrary from "../contentPanel/ContentLibrary";

const QuickLinks = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [show, setShow] = useState(false);
  const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(null);

  const handleAddLink = () => {
    const quickLinks = currentBlock?.content.quickLinks ?? [];
    const nextOrder =
      Math.max(...quickLinks?.map((q: any) => q.order || 0), 0) + 1;
    const updatedLinks = [
      ...quickLinks,
      {
        id: uuidv4(),
        title: "",
        sub_title: "",
        icon: "",
        link: "",
        order: nextOrder,
        type: "url",
      },
    ];
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        quickLinks: updatedLinks,
      },
    });
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...currentBlock.content?.quickLinks];

    const updatedLink = { ...updatedLinks[index], [field]: value };
    updatedLinks[index] = updatedLink;
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        quickLinks: updatedLinks,
      },
    });
  };
  const handleTypeChange = (index: number, value: string) => {
    const updatedLinks = [...currentBlock.content?.quickLinks];

    updatedLinks[index] = {
      ...updatedLinks[index],
      type: value,
    };

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        quickLinks: updatedLinks,
      },
    });
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = (currentBlock.content?.quickLinks || [])
      .filter((_item: unknown, i: number) => i !== index)
      .map((link: any, newIndex: number) => ({
        ...link,
        order: newIndex + 1,
      }));

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        quickLinks: updatedLinks,
      },
    });
  };

  const reorderLinks = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.quickLinks) return;

    const linksCopy = currentBlock?.content?.quickLinks.map((link: any) => ({
      ...link,
    }));

    // Ensure the indices are valid
    if (toIndex < 0 || toIndex >= linksCopy.length) return;

    // Move the item
    const [movedLink] = linksCopy.splice(fromIndex, 1);
    linksCopy.splice(toIndex, 0, movedLink);

    // Reassign order values (if needed)
    const reorderLinks = linksCopy.map((link: any, index: number) => ({
      ...link,
      order: index + 1,
    }));

    // Send update
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        quickLinks: reorderLinks,
      },
    });
  };

  return (
    <div>
      <div className="border-b-0.5 border-b-primary">
        {currentBlock?.content?.quickLinks &&
          currentBlock?.content?.quickLinks?.map((link: any, index: number) => {
            const totalLinks = currentBlock.content.quickLinks.length;
            const isFirst = index === 0;
            const isLast = index === totalLinks - 1;
            return (
              <div
                key={index}
                className="md:mb-4 mb-2 relative p-4 bg-f6f6f6 rounded-xl"
              >
                <div className="flex items-center gap-2 justify-end">
                  {totalLinks > 1 && !isFirst && (
                    <Button
                      icon={arrowUpIcon}
                      backgroundColor="transparent"
                      className="p-0 md:w-5 w-3 md:h-5 h-3"
                      onClick={() => reorderLinks(index, index - 1)}
                    />
                  )}
                  {totalLinks > 1 && !isLast && (
                    <Button
                      icon={arrowDownIcon}
                      backgroundColor="transparent"
                      className="p-0 md:w-5 w-3 md:h-5 h-3"
                      onClick={() => reorderLinks(index, index + 1)}
                    />
                  )}
                  {totalLinks > 1 && (
                    <Button
                      icon={closeIcon}
                      backgroundColor="transparent"
                      onClick={() => handleRemoveLink(index)}
                      className="p-0 w-5"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Title"
                    value={link.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                  />
                  <Input
                    label="Sub Title"
                    value={link.sub_title}
                    onChange={(e) =>
                      handleChange(index, "sub_title", e.target.value)
                    }
                  />
                  <div>
                    <label
                      htmlFor="videoSource"
                      className="block md:mb-2 mb-1 md:text-base/4 text-sm font-medium"
                    >
                      Type
                    </label>
                    <div className="relative mb-5">
                      <select
                        className="appearance-none w-full p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-xl"
                        value={link.type ?? "url"}
                        onChange={(e) =>
                          handleTypeChange(index, e.target.value)
                        }
                      >
                        <option value="url">URL</option>
                        <option value="schedule">Schedule</option>
                        <option value="where_to_watch">Where To Watch</option>
                        <option value="buy_ticket">Buy Ticket</option>
                      </select>
                      <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                        <img src={chevronDown} />
                      </div>
                    </div>
                  </div>
                  {link.type === "url" && (
                    <Input
                      label="Link URL"
                      value={link.link}
                      onChange={(e) =>
                        handleChange(index, "link", e.target.value)
                      }
                    />
                  )}
                </div>
                <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mb-4">
                  <div className="md:w-sp170 w-20 h-full">
                    {link.icon ? (
                      <img
                        src={concatImgURL(link.icon)}
                        alt="Uploaded"
                        className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                      />
                    ) : (
                      <div className="bg-white border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                        <img src={mediaIcon} alt="Placeholder" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Icon URL"
                      placeholder="https://www.example.com"
                      className="m-0"
                      value={concatImgURL(link.icon) ?? ""}
                      readOnly
                      onChange={(e) =>
                        handleChange(index, "icon", e.target.value)
                      }
                    />
                    <div>
                      {link.icon ? (
                        <Button
                          text="Remove Icon"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => handleChange(index, "icon", "")}
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Icon"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => {
                            setShow(true);
                            setActiveLinkIndex(index);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <Button
          text="Add More"
          icon={plusIcon}
          backgroundColor="transparent"
          className="addSideBarBtn relative p-0"
          onClick={handleAddLink}
        />

        {/* <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
        /> */}
      </div>
      <div className="mt-4 flex items-center md:gap-5 gap-1">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
      </div>
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="other"
          onSelect={(url: string) => {
            if (activeLinkIndex != null) {
              handleChange(activeLinkIndex, "icon", url);
            }
            setActiveLinkIndex(null);
          }}
          mediaFilter="image"
        />
      )}
    </div>
  );
};

export default QuickLinks;
