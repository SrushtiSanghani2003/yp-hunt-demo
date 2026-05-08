import { useEffect, useRef, useState } from "react";
import { chevronDown, closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import Input from "../ui/input/Input";
import {
  concatImgURL,
  extractYouTubeId,
  getImageDimensions,
} from "../../config/function";
import ContentLibrary from "../contentPanel/ContentLibrary";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";

const Video = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [activeMediaUrl, setActiveMediaUrl] = useState<null | string>(null);
  const latestContentRef = useRef(currentBlock.content);

  useEffect(() => {
    latestContentRef.current = currentBlock.content;
  }, [currentBlock.content]);

  // const handleChange = (label: string, value: string) => {
  //   let updatedContent = { ...currentBlock.content };

  //   const topLevelFields = [
  //     "video_url",
  //     "video_type",
  //     "video_id",
  //     "thumbnail_url",
  //   ];
  //   const sponsorFields = ["sponsor_img", "sponsor_name", "sponsor_url"];

  //   if (topLevelFields.includes(label)) {
  //     if (label === "video_type") {
  //       updatedContent.video_type = value;
  //     }
  //     if (label === "video_url") {
  //       const id = extractYouTubeId(value);
  //       updatedContent.video_url = value;
  //       updatedContent.video_id = id || "";
  //       updatedContent.thumbnail_url = id
  //         ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  //         : "";
  //     } else {
  //       updatedContent[label] = value;
  //     }
  //   } else if (sponsorFields.includes(label)) {
  //     updatedContent.more = {
  //       ...updatedContent.more,
  //       sponsor: {
  //         ...updatedContent.more?.sponsor,
  //         [label]: value,
  //       },
  //     };
  //   } else {
  //     updatedContent.more = {
  //       ...updatedContent.more,
  //       [label]: value,
  //     };
  //   }

  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: updatedContent,
  //   });
  // };

  const handleChange = async (label: string, value: string) => {
    let updatedContent = { ...latestContentRef.current };
    if (label === "video_type") {
      updatedContent = {
        ...updatedContent,
        video_type: value,
        video_url: "",
        video_id: "",
        thumbnail_url: "",
        thumbnail_width: 0,
        thumbnail_height: 0,
      };
    } else if (
      label === "video_url" &&
      updatedContent.video_type === "youtube"
    ) {
      const id = extractYouTubeId(value);
      updatedContent = {
        ...updatedContent,
        video_url: value,
        video_id: id || "",
        thumbnail_url: id
          ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
          : "",
      };
      if (id) {
        const thumbUrl = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
        const { width, height } = await getImageDimensions(
          concatImgURL(thumbUrl)
        );
        updatedContent.thumbnail_width = width;
        updatedContent.thumbnail_height = height;
      }
    } else {
      updatedContent[label] = value;
    }

    latestContentRef.current = updatedContent;
    if (label == "thumbnail_url") {
      if (value) {
        const { width, height } = await getImageDimensions(concatImgURL(value));
        updatedContent.thumbnail_width = width;
        updatedContent.thumbnail_height = height;
      } else {
        updatedContent.thumbnail_width = 0;
        updatedContent.thumbnail_height = 0;
      }
    }

    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  const handleThumbnailChange = async (url: string) => {
    const updatedContent = { ...latestContentRef.current, thumbnail_url: url };

    latestContentRef.current = updatedContent;
    const { width, height } = await getImageDimensions(concatImgURL(url));
    updatedContent.thumbnail_width = width;
    updatedContent.thumbnail_height = height;

    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  const handleYoutubeThumbnail = () => {
    const ytId = extractYouTubeId(latestContentRef.current.video_url);
    if (ytId) {
      const thumbUrl = `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`;
      handleThumbnailChange(thumbUrl);
    }
  };

  useEffect(() => {
    if (currentBlock.content?.more) {
      const fields = Object.keys(currentBlock.content?.more);
      setMoreFields(fields);
    }
  }, [currentBlock]);

  const uploadTypeMap: Record<string, string> = {
    video_url: "other",
    sponsor_img: "sponsor",
  };

  return (
    <>
      <div className="md:pb-5 pb-2 border-b-0.5 border-primary">
        <div
          className={`${
            currentBlock.content?.video_type == "" ? "mb-0" : "md:mb-5 mb-2"
          }`}
        >
          <label
            htmlFor="videoSource"
            className="block md:mb-2 mb-1 md:text-base/4 text-sm font-medium"
          >
            Source
          </label>
          <div className="relative">
            <select
              id="videoSource"
              value={currentBlock.content?.video_type}
              onChange={(e) => handleChange("video_type", e.target.value)}
              className="appearance-none w-full md:p-3 p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-2xl rounded-lg"
            >
              <option value="" disabled>
                Please Select
              </option>
              <option value="youtube">Youtube</option>
              <option value="native">Native</option>
            </select>
            <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
        </div>

        {currentBlock.content?.video_type != "" && (
          <>
            {currentBlock.content?.video_type == "youtube" && (
              <>
                <Input
                  label="Video URL*"
                  value={currentBlock.content?.video_url ?? ""}
                  className="md:mb-5 mb-2"
                  onChange={(e) => {
                    handleChange("video_url", e.target.value);
                  }}
                />
                <Input
                  label="Video ID*"
                  className="md:mb-5 mb-2"
                  value={currentBlock.content?.video_id ?? ""}
                  readOnly
                />
                <div className="flex items-center md:h-sp100 h-20 md:gap-4 gap-2">
                  <div className="md:w-sp170 w-20 h-full">
                    {currentBlock.content?.thumbnail_url ? (
                      <img
                        src={concatImgURL(currentBlock.content?.thumbnail_url)}
                        alt="Uploaded"
                        className="w-full h-full rounded-2xl object-contain p-2 border-0.5 border-primary block align-middle"
                      />
                    ) : (
                      <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                        <img src={mediaIcon} alt="Placeholder" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Video Thumbnail*"
                      placeholder="https://www.example.com"
                      className="m-0"
                      value={
                        concatImgURL(currentBlock.content?.thumbnail_url) ?? ""
                      }
                      readOnly
                    />
                    <div className="flex items-center gap-4">
                      {currentBlock.content?.thumbnail_url ? (
                        <Button
                          text="Remove Thumbnail"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="pb-0 "
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => handleChange("thumbnail_url", "")}
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Thumbnail"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => setActiveMediaUrl("thumbnail_url")}
                        />
                      )}
                      {currentBlock?.content?.thumbnail_url &&
                        currentBlock?.content?.thumbnail_url.startsWith(
                          "https://ip-cms-api.ypstagingserver.com"
                        ) &&
                        currentBlock.content?.video_type !== "native" && (
                          <Button
                            text="Use YT Thumbnail"
                            className="md:py-1 px-3"
                            onClick={handleYoutubeThumbnail}
                          />
                        )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentBlock.content?.video_type == "native" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex md:h-sp100 h-20  md:gap-4 gap-2">
                  <div className="md:w-sp170 w-20 h-full">
                    {currentBlock.content?.video_url ?? "" ? (
                      <video
                        src={
                          concatImgURL(currentBlock.content?.video_url) ?? ""
                        }
                        controls
                        className="w-full h-full rounded-2xl object-contain p-2 border-0.5 border-primary block align-middle"
                      />
                    ) : (
                      <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                        <img src={mediaIcon} alt="Placeholder" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div>
                      <Input
                        label="Video URL*"
                        placeholder="https://www.example.com"
                        className="m-0"
                        readOnly
                        value={
                          concatImgURL(currentBlock.content?.video_url) ?? ""
                        }
                      />
                      {currentBlock.content?.video_url ?? "" ? (
                        <Button
                          text="Remove Video"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="pb-0 "
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => {
                            handleChange("video_url", "");
                            handleThumbnailChange("");
                          }}
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Video"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => setActiveMediaUrl("video_url")}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:gap-4 gap-2 md:h-sp100 h-20">
                  <div className="md:w-sp170 w-20 h-full">
                    {currentBlock?.content?.thumbnail_url ? (
                      <img
                        src={
                          concatImgURL(currentBlock?.content?.thumbnail_url) ||
                          ""
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
                      label="Video Thumbnail*"
                      placeholder="https://www.example.com"
                      className="m-0"
                      readOnly
                      value={
                        concatImgURL(currentBlock?.content?.thumbnail_url) || ""
                      }
                    />
                    <div className="flex items-center gap-5">
                      {currentBlock?.content?.thumbnail_url ? (
                        <Button
                          icon={closeIcon}
                          text="Remove Thumbnail"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => {
                            handleChange("thumbnail_url", "");
                          }}
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Thumbnail"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => {
                            setActiveMediaUrl("thumbnail_url");
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

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
            fieldsToShow={["description"]}
          />
        </div>
      </div>
      {!!activeMediaUrl && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          uploadType={
            activeMediaUrl ? uploadTypeMap[activeMediaUrl] || "other" : "other"
          }
          onSelect={(url: string) => {
            handleChange(activeMediaUrl!, url);
          }}
          onThumbnailSelect={(url: string) => {
            handleThumbnailChange(url);
          }}
          mediaFilter={
            activeMediaUrl === "sponsor_img" ||
            activeMediaUrl == "thumbnail_url"
              ? "image"
              : "video"
          }
        />
      )}
    </>
  );
};

export default Video;
