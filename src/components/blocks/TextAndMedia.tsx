import { useState } from "react";
import { concatImgURL, getImageDimensions } from "../../config/function";
import { chevronDown, closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import FroalaEditor from "./FroalaEditor";
import ContentLibrary from "../contentPanel/ContentLibrary";

const TextAndMedia = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [show, setShow] = useState(false);

  const handleChange = async (label: string, value: string) => {
    const updatedContent = { ...currentBlock.content };
    updatedContent[label] = value;
    if (label === "imgUrl") {
      if (value) {
        try {
          const { width, height } = await getImageDimensions(
            concatImgURL(value)
          );

          updatedContent.img_width = width;
          updatedContent.img_height = height;
        } catch (err) {
          console.error("Failed to load image dimensions:", err);
          updatedContent.img_width = 0;
          updatedContent.img_height = 0;
        }
      } else {
        updatedContent.img_width = 0;
        updatedContent.img_height = 0;
      }
    }
    onChangeBlock?.({ ...currentBlock, content: updatedContent });
  };

  return (
    <div className="space-y-4">
      <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
        <div className="md:w-sp170 w-20 h-full">
          {currentBlock.content?.imgUrl ? (
            <img
              src={concatImgURL(currentBlock.content?.imgUrl)}
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
            label="Image URL"
            placeholder="https://www.example.com"
            className="m-0"
            value={concatImgURL(currentBlock.content?.imgUrl)}
            readOnly
          />
          <div>
            {currentBlock.content?.imgUrl ? (
              <Button
                text="Remove Image"
                icon={closeIcon}
                backgroundColor="transparent"
                className="py-0"
                imageclassName="md:w-5 w-3 md:h-5 h-3"
                onClick={() => handleChange("imgUrl", "")}
              />
            ) : (
              <Button
                icon={plusIcon}
                text="Add Image"
                backgroundColor="transparent"
                className="py-0"
                imageclassName="md:w-5 w-3 md:h-5 h-3"
                onClick={() => setShow(true)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div>
          <label className="block md:text-base/4 text-sm mb-2 font-medium">
            Media Alignment
          </label>
          <div className="relative">
            <select
              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
              value={currentBlock?.content?.media_align || "#000000"}
              onChange={(e) => handleChange("media_align", e.target.value)}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
        </div>
        <div>
          <label className="block md:text-base/4 text-sm mb-2 font-medium">
            Description Background Color
          </label>
          <div className="relative">
            <select
              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
              value={currentBlock?.content?.text_bg_color || "#000000"}
              onChange={(e) => handleChange("text_bg_color", e.target.value)}
            >
              <option value="dark">Black</option>
              <option value="light">White</option>
            </select>
            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
        </div>
        <div>
          <label className="block md:text-base/4 text-sm mb-2 font-medium">
            Description Width
          </label>
          <div className="relative">
            <select
              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
              value={currentBlock?.content?.description_width}
              onChange={(e) =>
                handleChange("description_width", e.target.value)
              }
            >
              <option value="70%">70%</option>
              <option value="50%">50%</option>
            </select>
            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block md:text-base/4 text-sm mb-2 font-medium">
          Description
        </label>
        <FroalaEditor
          model={currentBlock?.content?.description}
          onModelChange={(e) => handleChange("description", e)}
          isDark={currentBlock?.content?.is_dark}
          onThemeChange={(value: any) => handleChange("is_dark", value)}
        />
      </div>

      <div className="mt-5  md:gap-8 gap-2 flex items-center">
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
            handleChange("imgUrl", url);
          }}
          mediaFilter="image"
        />
      )}
    </div>
  );
};

export default TextAndMedia;
