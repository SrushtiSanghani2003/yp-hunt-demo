import { useEffect, useRef, useState } from "react";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import Input from "../ui/input/Input";
import ContentLibrary from "../contentPanel/ContentLibrary";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import { useLocation } from "react-router-dom";
import { concatImgURL, getImageDimensions } from "../../config/function";
import { DesignModeWrapper, imageBlockPresetContent } from "../../visual-builder";

const Image = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [moreFields, setMoreFields] = useState<string[]>([]);

  const [activeMediaUrl, setActiveMediaUrl] = useState<null | string>(null);
  const dropDownItemRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const pathname = location.pathname;
  const isNews = pathname.includes("news");
  const toolTipInfo = "Media Size: 856 x 222 Px";

  useEffect(() => {
    if (showDropdown && dropDownItemRef.current) {
      dropDownItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showDropdown]);

  const handleOnChange = async (label: string, value: string) => {
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

    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (currentBlock.content?.more) {
      const fields = Object.keys(currentBlock.content?.more);
      setMoreFields(fields);
    }
  }, [currentBlock]);

  const uploadTypeMap: Record<string, string> = {
    imgUrl: "block",
    sponsor_img: "sponsor",
    thumbnailUrl: "thumbnail",
  };

  const formContent = (
    <>
      <div className="md:pb-4 pb-2 border-b-primary border-b-0.5">
        <div className="md:pb-4 pb-2">
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
                {...(isNews && { infoTooltip: toolTipInfo })}
                label="Image URL"
                placeholder="https://www.example.com"
                className="m-0"
                value={concatImgURL(currentBlock.content?.imgUrl)}
                readOnly
              // onChange={(e) => handleOnChange("imgUrl", e.target.value)}
              />
              <div>
                {currentBlock.content?.imgUrl ? (
                  <Button
                    text="Remove Image"
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="py-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3"
                    onClick={() => handleOnChange("imgUrl", "")}
                  />
                ) : (
                  <Button
                    icon={plusIcon}
                    text="Add Image"
                    backgroundColor="transparent"
                    className="py-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3"
                    onClick={() => setActiveMediaUrl("imgUrl")}
                  />
                )}
              </div>
            </div>
          </div>

          <MoreFieldsRenderer
            currentBlock={currentBlock}
            onChangeBlock={onChangeBlock}
            moreFields={moreFields}
            setMoreFields={setMoreFields}
          />
        </div>
      </div>
      <div className="mt-5  md:gap-8 gap-2 flex items-center">
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
            fieldsToShow={["description"]}
          />
        </div>
      </div>

      {activeMediaUrl != null && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          uploadType={
            activeMediaUrl ? uploadTypeMap[activeMediaUrl] || "block" : "block"
          }
          onSelect={(url: string) => {
            handleOnChange(activeMediaUrl!, url);
            setActiveMediaUrl(null);
          }}
          mediaFilter="image"
        />
      )}
    </>
  );


  return (
    <DesignModeWrapper
      content={currentBlock.content}
      onContentChange={(updatedContent) => {
        onChangeBlock?.({
          ...currentBlock,
          content: updatedContent,
        });
      }}
      formContent={formContent}
      defaultCanvasContent={imageBlockPresetContent}
      canvasHeight="400px"
    />
  );
};

export default Image;
