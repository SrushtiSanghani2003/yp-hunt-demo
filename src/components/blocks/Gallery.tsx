import { useEffect, useRef, useState } from "react";
import Button from "../ui/button";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import Input from "../ui/input/Input";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { capitalize, concatImgURL } from "../../config/function";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";

const Gallery = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const views = ["carousel", "grid"];
  const [activeTab, setActiveTab] = useState<"carousel" | "grid" | string>(
    "carousel"
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [activeMediaUrl, setActiveMediaUrl] = useState<null | string>(null);

  const getImages = (): { imgUrl: string }[] => {
    const key = activeTab === "grid" ? "gridImages" : "carouselImages";
    const images = currentBlock.content[key];
    if (!images || images.length === 0) {
      updateImages([{ imgUrl: "" }]);
      return [{ imgUrl: "" }];
    }

    return images;
  };

  const handleAddImageBlock = () => {
    const key = activeTab === "grid" ? "gridImages" : "carouselImages";
    const currentImages = currentBlock.content[key] || [];
    const updated = [...currentImages, { imgUrl: "" }];
    updateImages(updated);
  };

  const handleUrlChange = (index: number, value: string) => {
    const key = activeTab === "grid" ? "gridImages" : "carouselImages";
    const currentImages = currentBlock.content[key] || [];
    const updated = [...currentImages];

    if (!updated[index]) return;

    updated[index] = { ...updated[index], imgUrl: value };
    updateImages(updated);
  };

  const handleRemoveImage = (index: number) => {
    const updated = getImages().filter((_: unknown, i: number) => i !== index);
    updateImages(updated);
  };

  const updateImages = (images: { imgUrl: string }[]) => {
    const key = activeTab === "grid" ? "gridImages" : "carouselImages";
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        [key]: images,
      },
    });
  };

  const handleOnChange = (label: string, value: string) => {
    const updatedContent = { ...currentBlock.content };

    if (updatedContent.more && label in updatedContent.more) {
      updatedContent.more = {
        ...updatedContent.more,
        [label]: value,
      };
    } else if (
      updatedContent.more?.sponsor &&
      label in updatedContent.more.sponsor
    ) {
      updatedContent.more = {
        ...updatedContent.more,
        sponsor: {
          ...updatedContent.more.sponsor,
          [label]: value,
        },
      };
    }

    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  useEffect(() => {
    if (currentBlock.content?.more) {
      const fields = Object.keys(currentBlock.content?.more);
      setMoreFields(fields);
    }
  }, [currentBlock]);

  const uploadTypeMap: Record<string, string> = {
    imgUrl: "block",
    sponsor_img: "sponsor",
  };
  useEffect(() => {
    const gridImages = currentBlock.content?.gridImages || [];
    const carouselImages = currentBlock.content?.carouselImages || [];

    if (gridImages.length > 0) {
      setActiveTab("grid");
    } else if (carouselImages.length > 0) {
      setActiveTab("carousel");
    } else {
      setActiveTab("carousel");
    }
  }, []);
  return (
    <>
      <div className="pb-6 border-b-0.5 border-b-primary">
        <div className="md:mb-6 mb-3">
          <h3 className="md:text-base/4 text-sm font-medium mb-2">
            Appereance Type
          </h3>
          <div className="flex ">
            <div className="flex md:rounded-2xl rounded-lg border-0.5 border-primary bg-f6f6f6">
              {views.map((text, index) => (
                <Button
                  key={index}
                  className={`md:p-4 p-2 md:rounded-2xl rounded-lg ${
                    activeTab == text ? "text-white" : "text-black"
                  }`}
                  text={capitalize(text)}
                  backgroundColor={`${
                    activeTab == text ? "black" : "transparent"
                  }`}
                  onClick={() => setActiveTab(text)}
                />
              ))}
            </div>
          </div>
        </div>

        {getImages().map((img, index) => (
          <div
            key={index}
            className="bg-f6f6f6 md:p-4 p-2 rounded-2xl mb-6 relative"
          >
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
              <div className="md:w-sp170 w-20 h-full">
                {img.imgUrl ? (
                  <img
                    src={concatImgURL(img.imgUrl)}
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
                  label="Image URL"
                  placeholder="https://www.example.com"
                  value={concatImgURL(img.imgUrl)}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  className="m-0"
                />

                <div>
                  {img.imgUrl ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => handleUrlChange(index, "")}
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      className="pb-0 pt-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => setActiveMediaUrl(`image-${index}`)}
                    />
                  )}
                </div>
              </div>
            </div>

            <Button
              icon={closeIcon}
              className="absolute right-1 top-1 p-0"
              backgroundColor="transparent"
              onClick={() => handleRemoveImage(index)}
            />
          </div>
        ))}

        <Button
          text="Add Images"
          icon={plusIcon}
          className="addBtn relative"
          backgroundColor="transparent"
          onClick={handleAddImageBlock}
        />

        <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
        />
      </div>
      <div className="mt-5  flex items-center md:gap-8 gap-2">
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
            if (activeMediaUrl?.startsWith("image-")) {
              const index = parseInt(activeMediaUrl.split("-")[1], 10);
              handleUrlChange(index, url);
            } else {
              handleOnChange(activeMediaUrl!, url);
            }
            setActiveMediaUrl(null);
          }}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default Gallery;
