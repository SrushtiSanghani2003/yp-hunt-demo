import { useState } from "react";
import { concatImgURL } from "../../config/function";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import ContentLibrary from "../contentPanel/ContentLibrary";
import FroalaEditor from "./FroalaEditor";

const OfficialAppBlock = ({
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
    <>
      <div className="space-y-3 pb-5 border-b border-primary">
        <div className="grid grid-cols-2 md:gap-5 gap-2">
          <Input
            label="Title"
            placeholder="Enter Title Here..."
            value={currentBlock.content.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            label="Sub Title"
            placeholder="Enter Sub Title Here..."
            value={currentBlock.content.sub_title}
            onChange={(e) => handleChange("sub_title", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 md:gap-5 gap-2">
          <Input
            label="Google Play URL"
            placeholder="Enter URL Here..."
            value={currentBlock.content.google_play_url}
            onChange={(e) => handleChange("google_play_url", e.target.value)}
          />
          <Input
            label="App Store URL"
            placeholder="Enter URL Here..."
            value={currentBlock.content.app_store_url}
            onChange={(e) => handleChange("app_store_url", e.target.value)}
          />
        </div>
        <div className="">
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
        </div>
        <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
          <div className="md:w-sp170 w-20 h-full">
            {currentBlock.content.bg_img ? (
              <img
                src={concatImgURL(currentBlock.content.bg_img)}
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
              value={concatImgURL(currentBlock.content.bg_img) ?? ""}
              readOnly
            />
            <div>
              {currentBlock.content.bg_img ? (
                <Button
                  text="Remove Image"
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="py-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => handleChange("bg_img", "")}
                />
              ) : (
                <Button
                  icon={plusIcon}
                  text="Add Image"
                  backgroundColor="transparent"
                  className="py-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => setActiveMediaURL("bg_img")}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
          <div className="md:w-sp170 w-20 h-full">
            {currentBlock.content.qr_img ? (
              <img
                src={concatImgURL(currentBlock.content.qr_img)}
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
              label="QR Code"
              placeholder="https://www.example.com"
              className="m-0"
              value={concatImgURL(currentBlock.content.qr_img) ?? ""}
              readOnly
            />
            <div>
              {currentBlock.content.qr_img ? (
                <Button
                  text="Remove Image"
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="py-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => handleChange("qr_img", "")}
                />
              ) : (
                <Button
                  icon={plusIcon}
                  text="Add Image"
                  backgroundColor="transparent"
                  className="py-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => setActiveMediaURL("qr_img")}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
          <div className="md:w-sp170 w-20 h-full">
            {currentBlock.content.promo_img ? (
              <img
                src={concatImgURL(currentBlock.content.promo_img)}
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
              label="Promo Image URL"
              placeholder="https://www.example.com"
              className="m-0"
              value={concatImgURL(currentBlock.content.promo_img) ?? ""}
              readOnly
            />
            <div>
              {currentBlock.content.promo_img ? (
                <Button
                  text="Remove Image"
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="py-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => handleChange("promo_img", "")}
                />
              ) : (
                <Button
                  icon={plusIcon}
                  text="Add Image"
                  backgroundColor="transparent"
                  className="py-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => setActiveMediaURL("promo_img")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:gap-8 gap-2 flex items-center">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
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
    </>
  );
};

export default OfficialAppBlock;
