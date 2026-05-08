import React, { useState } from "react";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import ContentLibrary from "../contentPanel/ContentLibrary";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import { useLocation } from "react-router-dom";
import { concatImgURL } from "../../config/function";

export interface ImageMediaProps {
  imageUrl: string | null;
  onUrlChange: (value: string) => void;
  onClose: () => void;
  showCloseButton?: boolean; // 👈 optional prop (no default here)
}

const ImageMedia = ({
  imageUrl,
  onUrlChange,
  onClose,
  showCloseButton = true,
}: ImageMediaProps) => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const isNews = pathname.includes("news");

  const toolTipInfo = "Media Size: 418 x 168 Px";

  return (
    <div className="relative">
      {showCloseButton && (
        <Button
          icon={closeIcon}
          backgroundColor="transparent"
          onClick={onClose}
          className="md:w-5 w-3 md:h-5 h-3 absolute top-0 right-0"
        />
      )}
      <h2 className="md:mb-sp10 mb-sp6 md:text-lg/5 text-xs">Image</h2>
      <div className="">
        <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
          <div className="md:w-sp170 w-20 h-full">
            {imageUrl ? (
              <img
                src={concatImgURL(imageUrl)}
                loading="lazy"
                alt="Uploaded"
                className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-cover"
              />
            ) : (
              <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                <img src={mediaIcon} alt="Placeholder" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <Input
              {...(isNews && { infoTooltip: toolTipInfo })}
              label="Image URL"
              placeholder="https://www.example.com"
              className="m-0"
              value={concatImgURL(imageUrl || "")}
              onChange={(e) => onUrlChange(e.target.value)}
              readOnly
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
      </div>
      <ContentLibrary
        open={show}
        onClose={() => setShow(false)}
        uploadType="hero"
        mediaFilter="image"
        onSelect={(url: string) => onUrlChange(url)}
      />
    </div>
  );
};

export default React.memo(ImageMedia);
