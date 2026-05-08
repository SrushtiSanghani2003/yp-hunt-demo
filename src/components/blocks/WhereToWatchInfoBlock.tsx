import { useState } from "react";
import type { BlockTypeProps } from "./changeBlockTypes";
import { concatImgURL } from "../../config/function";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Input from "../ui/input/Input";
import Button from "../ui/button";
import ContentLibrary from "../contentPanel/ContentLibrary";
import FroalaEditor from "./FroalaEditor";
import ChangeBlockType from "./ChangeBlockType";

const WhereToWatchInfoBlock = ({
  currentBlock,
  onChangeType,
  types,
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
    <div>
      <div className="mt-4">
        <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 ">
          <div className="md:w-sp170 w-20 h-full">
            {currentBlock.content.sponser_image_1 ? (
              <img
                src={concatImgURL(currentBlock.content.sponser_image_1)}
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
              label="Sponser Image URL 1"
              placeholder="https://www.example.com"
              className="m-0"
              value={concatImgURL(currentBlock.content.sponser_image_1) ?? ""}
              readOnly
            />
            <div>
              {currentBlock.content.sponser_image_1 ? (
                <Button
                  text="Remove Image"
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="py-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => handleChange("sponser_image_1", "")}
                />
              ) : (
                <Button
                  icon={plusIcon}
                  text="Add Image"
                  backgroundColor="transparent"
                  className="py-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => setActiveMediaURL("sponser_image_1")}
                />
              )}
            </div>
          </div>
        </div>
        <Input
          label="Sponser Redirect URL 1"
          value={currentBlock.content.sponser_redirect_1}
          className="md:mb-5 mb-2 mt-2"
          onChange={(e) => handleChange("sponser_redirect_1", e.target.value)}
          placeholder="https://www.example.com"
        />
        <div className="mt-2">
          <label className="block md:text-base/4 text-sm mb-2 font-medium">
            Description 1
          </label>
          <FroalaEditor
            model={currentBlock.content.description_1}
            onModelChange={(content: string) =>
              handleChange("description_1", content)
            }
            isDark={currentBlock?.content?.is_dark}
            onThemeChange={(value: any) => handleChange("is_dark_1", value)}
          />
        </div>{" "}
        <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-4">
          <div className="md:w-sp170 w-20 h-full">
            {currentBlock.content.sponser_image_2 ? (
              <img
                src={concatImgURL(currentBlock.content.sponser_image_2)}
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
              label="Sponser Image URL 2"
              placeholder="https://www.example.com"
              className="m-0"
              value={concatImgURL(currentBlock.content.sponser_image_2) ?? ""}
              readOnly
            />
            <div>
              {currentBlock.content.sponser_image2 ? (
                <Button
                  text="Remove Image"
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="py-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => handleChange("sponser_image_2", "")}
                />
              ) : (
                <Button
                  icon={plusIcon}
                  text="Add Image"
                  backgroundColor="transparent"
                  className="py-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => setActiveMediaURL("sponser_image_2")}
                />
              )}
            </div>
          </div>
        </div>
        <Input
          label="Sponser Redirect URL 2"
          value={currentBlock.content.sponser_redirect_2}
          className="md:mb-5 mb-2 mt-2"
          onChange={(e) => handleChange("sponser_redirect_2", e.target.value)}
          placeholder="https://www.example.com"
        />
        <div className="mt-2">
          <label className="block md:text-base/4 text-sm mb-2 font-medium">
            Description 1
          </label>
          <FroalaEditor
            model={currentBlock.content.description_2}
            onModelChange={(content: string) =>
              handleChange("description_2", content)
            }
            isDark={currentBlock?.content?.is_dark}
            onThemeChange={(value: any) => handleChange("is_dark_2", value)}
          />
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
      <div className="mt-5  md:gap-8 gap-2 flex items-center">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        {/* <div className="relative" ref={dropdownRef}>
          <MoreFieldsEditor
            currentBlock={currentBlock}
            moreFields={moreFields}
            setMoreFields={setMoreFields}
            onChangeBlock={onChangeBlock}
            fieldsToShow={["title", "description"]}
          />
        </div> */}
      </div>
    </div>
  );
};

export default WhereToWatchInfoBlock;
