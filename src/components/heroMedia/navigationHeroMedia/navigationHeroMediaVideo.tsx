import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import { extractYouTubeId } from "../../../config/function";
import Button from "../../ui/button";
import { chevronDown, closeIcon, mediaIcon, plusIcon } from "../../../icons";
import Input from "../../ui/input/Input";
import { env } from "../../../config/env";
import ContentLibrary from "../../contentPanel/ContentLibrary";

// import { useSelector } from "react-redux";
// import { selectVideo } from "../../redux-toolkit/videoSlice";

export interface VideoMediaProps {
  videoUrl: string | null;
  videoThumbnailUrl?: string | null;
  videoSource?: string | null;
  onUrlChange: (url: string) => void;
  onThumbnailUrlChange?: (url: string) => void;
  onTypeChange?: (type: string) => void;
  onNetiveVideothumbnailChange?: (url: string) => void;
  onClose?: () => void;
  data?: any;
  isNavigation?: boolean;
  navigation_title?: string;
  buttonTitle?: string;
  buttonUrl?: string;
  onTitleChange?: (value: string) => void;
  onButtonTitleChange?: (value: string) => void;
  onButtonUrlChange?: (value: string) => void;
}

const NavigationHeroMediaVideo = ({
  videoUrl,
  videoThumbnailUrl,
  videoSource,
  onUrlChange,
  onThumbnailUrlChange,
  onTypeChange,
  onNetiveVideothumbnailChange,
  onClose,
  isNavigation = false,
  navigation_title,
  buttonTitle,
  buttonUrl,
  onTitleChange,
  onButtonTitleChange,
  onButtonUrlChange,
}: // data,
VideoMediaProps) => {
  const [selectedVideoType, setSelectedVideoType] = useState<string | null>(
    "native"
  );
  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string | null>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>("") as any;
  const [isChangeThumbnail, setIsChangeThumbnail] = useState(false);
  const [localVideoURL, setLocalVideoURL] = useState("");

  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (localVideoURL != "") {
      if (videoSource == "youtube") {
        setVideoId(extractYouTubeId(localVideoURL));
      }
      onUrlChange(localVideoURL);
    }
  }, [localVideoURL]);


  const handleVideoType = (e: ChangeEvent<HTMLSelectElement>) => {
    const videoType = e.target.value;
    setSelectedVideoType(videoType);
    onTypeChange?.(videoType);
    // onUrlChange("");
    // onThumbnailUrlChange?.("");
    if (videoType == "youtube") {
      setVideoId("");
      setThumbnailUrl("");
    } else {
      setVideoId("");
      setThumbnailUrl("");
    }
    setLocalVideoURL("");
  };

  const handleUrlChange = (url: string) => {
    setLocalVideoURL(url);

    const id = extractYouTubeId(url);
    if (selectedVideoType === "youtube" && id) {
      setVideoId(id);
      const ytThumbnail = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
      setThumbnailUrl(ytThumbnail);
      onThumbnailUrlChange?.(ytThumbnail);
    }
    // else {
    //   setVideoId("");
    //   setThumbnailUrl("");
    //   onThumbnailUrlChange?.("");
    // }
  };

  // useEffect(() => {
  //   if (data && data?.source_type) {
  

  //     setSelectedVideoType(data.source_type);

  //     if (data.source_type === "youtube" && data.video_id) {
  //       setVideoId(data.video_id);
  //       // setThumbnailUrl(data.video_thumbnail || "");
  //     }
  //     if (data.video_thumbnail) {
  //       setThumbnailUrl(data.video_thumbnail);
  //     }
  //     // else {
  //     //   setVideoId("");
  //     //   // setThumbnailUrl("");
  //     // }
  //   }
  //   //  else {
  //   //   setSelectedVideoType("");
  //   //   setVideoId("");
  //   //   setThumbnailUrl("");
  //   // }
  // }, [data]);

  useEffect(() => {
    if (!isInitializedRef.current && (videoUrl || videoSource)) {
      const timer = setTimeout(() => {
        isInitializedRef.current = true;

        if (videoSource && videoSource !== "") {
          setSelectedVideoType(videoSource as string);
        }

        if (videoThumbnailUrl && videoThumbnailUrl !== "") {
          setThumbnailUrl(videoThumbnailUrl);
        }

        // Set video URL & thumbnail (YouTube case)
        if (videoUrl && videoUrl !== "") {
          setLocalVideoURL(videoUrl as any);

          if (videoSource === "youtube") {
            const id = extractYouTubeId(videoUrl as any);
            setVideoId(id);
          }
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [videoUrl, videoSource, videoThumbnailUrl]);

  const handleYoutubeThumbnail = () => {
    if (videoId) {
      const ytThumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      setThumbnailUrl(ytThumbnail);
      onThumbnailUrlChange?.(ytThumbnail);
    }
  };

  return (
    <div className="relative">
      {onClose && (
        <Button
          icon={closeIcon}
          backgroundColor="transparent"
          onClick={onClose}
          className="absolute md:w-5 w-3 md:h-5 h-3 right-0 p-0"
        />
      )}
      <div className="md:pb-4 pb-2">
        <div className={`${selectedVideoType == "" ? "mb-0" : "mb-4"}`}>
          <label
            htmlFor="videoSource"
            className="block md:text-base/5 text-sm md:pb-3 pb-1 font-medium"
          >
            Source
          </label>
          <div className="relative">
            <select
              id="videoSource"
              value={selectedVideoType ?? ""}
              onChange={handleVideoType}
              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm  focus-within:outline-none border-0.5 border-primary md:rounded-2xl rounded-lg"
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
        {!isNavigation && (
          <div className="bg-white rounded-2xl w-full  transition-all mb-2">
            <div className="">
              <div className="flex flex-col  sm:items-start sm:justify-between">
                <p className="text-sm text-gray-600">
                  <span className="text-[14px] text-blue-600">Video </span>{" "}
                  <span className="text-blue-600">
                    {" "}
                    Recommended size for (Short Video):
                  </span>
                  <span className="text-gray-800 text-[12px] font-medium">
                    {" "}
                    208px (W)
                  </span>
                  ×
                  <span className="text-gray-800 text-[12px] font-medium">
                    {" "}
                    352px (H)
                  </span>
                </p>
              </div>

              <div className="flex flex-col  sm:items-start sm:justify-between">
                <p className="text-sm text-gray-600">
                  <span className="text-[14px] text-blue-600">Thumbnail</span>{" "}
                  <span className="text-blue-600">
                    {" "}
                    Recommended size for (Short Video):
                  </span>
                  <span className="text-gray-800 text-[12px] font-medium">
                    {" "}
                    340px (W)
                  </span>
                  ×
                  <span className="text-gray-800 text-[12px] font-medium">
                    {" "}
                    600px (H)
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedVideoType != "" && (
          <>
            {selectedVideoType == "youtube" && (
              <>
                {/* <Input
                  label="Video URL*"
                  value={videoUrl || ""}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="md:pb-3 pb-1"
                /> */}
                <Input
                  label="Video URL*"
                  value={localVideoURL || ""}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="md:pb-3 pb-1"
                />
                <Input
                  label="Video ID*"
                  value={videoId ?? ""}
                  readOnly
                  className="md:pb-3 pb-1"
                />
                <div className="flex items-center md:gap-4 gap-2 md:h-sp100 h-20">
                  <div className="md:w-sp170 w-20 h-full">
                    {thumbnailUrl ? (
                      <img
                        src={
                          thumbnailUrl.startsWith("https://")
                            ? thumbnailUrl
                            : thumbnailUrl && env.IMAGE_URL + thumbnailUrl
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
                        thumbnailUrl.startsWith("https://")
                          ? thumbnailUrl
                          : thumbnailUrl && env.IMAGE_URL + thumbnailUrl
                      }
                    />
                    <div className="flex items-center gap-5">
                      {thumbnailUrl ? (
                        <Button
                          icon={closeIcon}
                          text="Remove Thumbnail"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => {
                            setThumbnailUrl("");
                            onThumbnailUrlChange?.("");
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
                            setShow(true);
                            setIsChangeThumbnail(true);
                          }}
                        />
                      )}
                      {thumbnailUrl?.includes(
                        "https://ip-cms-api.ypstagingserver.com"
                      ) && (
                        <Button
                          text="Use YT Thumbnail"
                          className="md:py-1 px-3"
                          onClick={handleYoutubeThumbnail}
                          // backgroundColor="transparent"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedVideoType == "native" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex md:h-sp100 h-20  md:gap-4 gap-2">
                  <div className="md:w-sp170 w-20 h-full">
                    {localVideoURL ? (
                      <video
                        src={localVideoURL}
                        controls
                        className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-contain p-2"
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
                        value={
                          localVideoURL?.startsWith("https://")
                            ? localVideoURL
                            : localVideoURL
                            ? env.IMAGE_URL + localVideoURL
                            : ""
                        }
                        readOnly={localVideoURL?.startsWith("https://")}
                      />

                      {localVideoURL ? (
                        <Button
                          text="Remove Video"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="pb-0 "
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => {
                            onUrlChange("");
                            setLocalVideoURL("");
                            setThumbnailUrl("");
                          }}
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Video"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => {
                            setShow(true);
                            setIsChangeThumbnail(false);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:gap-4 gap-2 md:h-sp100 h-20">
                  <div className="md:w-sp170 w-20 h-full">
                    {thumbnailUrl ? (
                      <img
                        src={
                          thumbnailUrl
                            ? thumbnailUrl.startsWith("https")
                              ? thumbnailUrl // use full URL as is
                              : env.IMAGE_URL + thumbnailUrl // prepend base URL for relative paths
                            : ""
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
                        thumbnailUrl
                          ? thumbnailUrl.startsWith("https")
                            ? thumbnailUrl // full URL, use as is
                            : env.IMAGE_URL + thumbnailUrl // relative path, prepend base URL
                          : ""
                      }
                    />

                    <div className="flex items-center gap-5">
                      {thumbnailUrl ? (
                        <Button
                          icon={closeIcon}
                          text="Remove Thumbnail"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => {
                            setThumbnailUrl("");
                            onThumbnailUrlChange?.("");
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
                            setShow(true);
                            setIsChangeThumbnail(true);
                          }}
                        />
                      )}
                      {thumbnailUrl &&
                        thumbnailUrl.startsWith(
                          "https://ip-cms-api.ypstagingserver.com"
                        ) &&
                        selectedVideoType !== "native" && (
                          <Button
                            text="Use YT Thumbnail"
                            className="md:py-1 px-3"
                            onClick={handleYoutubeThumbnail}
                          />
                        )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
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
          onSelect={(url: string) => {
            if (isChangeThumbnail) {
              setThumbnailUrl(url);
              onThumbnailUrlChange?.(url);
              setIsChangeThumbnail(false);
            } else {
              onUrlChange(url);
              setLocalVideoURL(url);
            }
          }}
          // onThumbnailSelectbyUrl={(url: string) => {
          //   // onThumbnailUrlChange?.(url);
          //   // setThumbnailUrl(url);
          // }}
          onThumbnailSelect={(url: string | undefined) => {
            if (url !== undefined && onNetiveVideothumbnailChange) {
              onNetiveVideothumbnailChange(url);
              // onThumbnailUrlChange?.(url);
              setThumbnailUrl(url);
            }
          }}
          uploadType="hero"
          mediaFilter={isChangeThumbnail ? "image" : "video"}
        />
      )}
    </div>
  );
};

export default React.memo(NavigationHeroMediaVideo);
