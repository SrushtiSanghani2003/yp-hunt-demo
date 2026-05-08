import { useState } from "react";
import { concatImgURL } from "../../config/function";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import type { BlockTypeProps } from "./changeBlockTypes";
import ContentLibrary from "../contentPanel/ContentLibrary";
import FroalaEditor from "./FroalaEditor";

const AboutInfoBlock = ({ currentBlock, onChangeBlock }: BlockTypeProps) => {
  const [activeMediaURL, setActiveMediaURL] = useState<string | null>(null);
  const handleChange = (label: string, value: string) => {
    const updatedContent = { ...currentBlock.content };
    (updatedContent as any)[label] = value;
    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };
  return (
    <div className="mt-4">
      <Input
        label="Title"
        value={currentBlock.content.title}
        className="md:mb-4 mb-2 mt-2"
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Enter Title Here..."
      />
      <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 ">
        <div className="md:w-sp170 w-20 h-full">
          {currentBlock.content.image ? (
            <img
              src={concatImgURL(currentBlock.content.image)}
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
            value={concatImgURL(currentBlock.content.image) ?? ""}
            readOnly
          />
          <div>
            {currentBlock.content.image ? (
              <Button
                text="Remove Image"
                icon={closeIcon}
                backgroundColor="transparent"
                className="py-0"
                imageclassName="md:w-5 w-3 md:h-5 h-3"
                onClick={() => handleChange("image", "")}
              />
            ) : (
              <Button
                icon={plusIcon}
                text="Add Image"
                backgroundColor="transparent"
                className="py-0"
                imageclassName="md:w-5 w-3 md:h-5 h-3"
                onClick={() => setActiveMediaURL("image")}
              />
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label className="block md:text-base/4 text-sm mb-2 font-medium">
          Description
        </label>
        <FroalaEditor
          model={currentBlock.content.description}
          onModelChange={(content: string) =>
            handleChange("description", content)
          }
          isDark={currentBlock?.content?.is_dark}
          onThemeChange={(value: any) => handleChange("is_dark", value)}
        />
      </div>{" "}
      {activeMediaURL != null && (
        <ContentLibrary
          open={!!activeMediaURL}
          onClose={() => setActiveMediaURL(null)}
          uploadType="block"
          onSelect={(url: string) => {
            handleChange(activeMediaURL!, url);
            setActiveMediaURL(null);
          }}
          mediaFilter="image"
        />
      )}
    </div>
  );
};

export default AboutInfoBlock;
