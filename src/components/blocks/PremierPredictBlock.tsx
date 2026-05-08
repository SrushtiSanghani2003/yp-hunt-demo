import { useState } from "react";
import { concatImgURL } from "../../config/function";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import type { BlockTypeProps } from "./changeBlockTypes";
import ContentLibrary from "../contentPanel/ContentLibrary";

const PremierPredictBlock = ({
  currentBlock,
  onChangeBlock,
}: BlockTypeProps) => {
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
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Title"
          value={currentBlock.content.title}
          className="md:mb-5 mb-2 mt-2"
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter Title Here..."
        />
        <Input
          label="Button Label"
          value={currentBlock.content.button_label}
          className="md:mb-5 mb-2 mt-2"
          onChange={(e) => handleChange("button_label", e.target.value)}
          placeholder="Enter Button Label Here..."
        />
      </div>
      <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 ">
        <div className="md:w-sp170 w-20 h-full">
          {currentBlock.content.logo_image ? (
            <img
              src={concatImgURL(currentBlock.content.logo_image)}
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
            label="Logo Image URL"
            placeholder="https://www.example.com"
            className="m-0"
            value={concatImgURL(currentBlock.content.logo_image) ?? ""}
            readOnly
          />
          <div>
            {currentBlock.content.logo_image ? (
              <Button
                text="Remove Image"
                icon={closeIcon}
                backgroundColor="transparent"
                className="py-0"
                imageclassName="md:w-5 w-3 md:h-5 h-3"
                onClick={() => handleChange("logo_image", "")}
              />
            ) : (
              <Button
                icon={plusIcon}
                text="Add Image"
                backgroundColor="transparent"
                className="py-0"
                imageclassName="md:w-5 w-3 md:h-5 h-3"
                onClick={() => setActiveMediaURL("logo_image")}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex md:h-sp100 h-20 md:gap-4 gap-2  mt-4">
        <div className="md:w-sp170 w-20 h-full">
          {currentBlock.content.bg_image ? (
            <img
              src={concatImgURL(currentBlock.content.bg_image)}
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
            label="Background Image URL"
            placeholder="https://www.example.com"
            className="m-0"
            value={concatImgURL(currentBlock.content.bg_image) ?? ""}
            readOnly
          />
          <div>
            {currentBlock.content.bg_image ? (
              <Button
                text="Remove Image"
                icon={closeIcon}
                backgroundColor="transparent"
                className="py-0"
                imageclassName="md:w-5 w-3 md:h-5 h-3"
                onClick={() => handleChange("bg_image", "")}
              />
            ) : (
              <Button
                icon={plusIcon}
                text="Add Image"
                backgroundColor="transparent"
                className="py-0"
                imageclassName="md:w-5 w-3 md:h-5 h-3"
                onClick={() => setActiveMediaURL("bg_image")}
              />
            )}
          </div>
        </div>
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
      {/* <div className="mt-5  md:gap-8 gap-2 flex items-center">
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
            fieldsToShow={["title", "description"]}
          />
        </div>
      </div> */}
    </div>
  );
};

export default PremierPredictBlock;
