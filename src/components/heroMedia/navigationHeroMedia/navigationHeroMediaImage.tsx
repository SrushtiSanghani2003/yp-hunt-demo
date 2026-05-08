import { useState } from "react";
import Button from "../../ui/button";
import { closeIcon, mediaIcon, plusIcon } from "../../../icons";
import { env } from "../../../config/env";
import Input from "../../ui/input/Input";
import ContentLibrary from "../../contentPanel/ContentLibrary";

export interface ImageMediaProps {
  imageUrl: string | null;
  onUrlChange: (value: string) => void;
  onClose: () => void;
  navigation_title?: string;
  buttonTitle?: string;
  buttonUrl?: string;
  onTitleChange?: (value: string) => void;
  onButtonTitleChange?: (value: string) => void;
  onButtonUrlChange?: (value: string) => void;
}

const NavigationHeroMediaImage = ({
  imageUrl,
  onUrlChange,
  onClose,
  navigation_title,
  buttonTitle,
  buttonUrl,
  onTitleChange,
  onButtonTitleChange,
  onButtonUrlChange,
}: ImageMediaProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Button
        icon={closeIcon}
        backgroundColor="transparent"
        onClick={onClose}
        className="md:w-5 w-3 md:h-5 h-3 absolute top-0 right-0"
      />
      <h2 className="md:mb-sp10 mb-sp6 md:text-lg/5 text-xs">Image</h2>
      <div className="">
        <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
          <div className="md:w-sp170 w-20 h-full">
            {imageUrl ? (
              <img
                src={
                  imageUrl?.startsWith("https://")
                    ? imageUrl
                    : env.IMAGE_URL + imageUrl
                }
                alt="Uploaded"
                className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-contain p-2"
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
              readOnly
              value={
                imageUrl?.startsWith("https://")
                  ? imageUrl
                  : imageUrl
                  ? env.IMAGE_URL + imageUrl
                  : ""
              }
              onChange={(e) =>
                onUrlChange(e.target.value.replace(env.IMAGE_URL, ""))
              }
            />

            <div>
              {imageUrl ? (
                <Button
                  text="Remove Image"
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="pb-0 "
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => onUrlChange("")}
                />
              ) : (
                <Button
                  icon={plusIcon}
                  text="Add Image"
                  backgroundColor="transparent"
                  className="pb-0 pt-0"
                  imageclassName="md:w-5 w-3 md:h-5 h-3"
                  onClick={() => setShow(true)}
                />
              )}
            </div>
          </div>
        </div>
        <Input
          label="Title"
          inputCss="p-3"
          className="mt-4"
          value={navigation_title || ""}
          placeholder="Enter Title"
          onChange={(e) => onTitleChange?.(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            label="Button Title"
            inputCss="p-3"
            value={buttonTitle || ""}
            placeholder="Enter Button Title"
            onChange={(e) => onButtonTitleChange?.(e.target.value)}
          />
          <Input
            label="Button URL"
            inputCss="p-3"
            value={buttonUrl || ""}
            placeholder="https://www.example.com"
            onChange={(e) => onButtonUrlChange?.(e.target.value)}
          />
        </div>
      </div>
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="hero"
          mediaFilter="image"
          onSelect={(url: string) => onUrlChange(url)}
        />
      )}
    </div>
  );
};

export default NavigationHeroMediaImage;
