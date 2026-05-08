import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import { chevronDown, closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import { concatImgURL, extractYouTubeId } from "../../config/function";
import ContentLibrary from "../contentPanel/ContentLibrary";
// import { useSelector } from "react-redux";
// import { selectVideo } from "../../redux-toolkit/videoSlice";

export interface VideoMediaProps {
  videoUrl: string | null;
  videoThumbnailUrl?: string | null;
  videoSource?: string | null;
  onUrlChange: (url: string) => void;
  onThumbnailUrlChange?: (url: string) => void;
  onTypeChange?: (type: string) => void;
  onDurationChange?: (duration: number | null) => void;
  onClose?: () => void;
  data?: any;
}

const VideoMedia = ({
  videoUrl,
  videoThumbnailUrl,
  videoSource,
  onUrlChange,
  onThumbnailUrlChange,
  onTypeChange,
  onDurationChange,
  onClose,
}: // data,
VideoMediaProps) => {
  const [selectedVideoType, setSelectedVideoType] = useState<string | null>(
    "native",
  );
  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string | null>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>("");
  const [isChangeThumbnail, setIsChangeThumbnail] = useState(false);
  const [localVideoURL, setLocalVideoURL] = useState("");

  const isInitializedRef = useRef(false);
  const ytPlayerRef = useRef<any>(null);

  const fetchYouTubeDuration = (id: string) => {
    if (!(window as any).YT) {
      // Load YT API if not already loaded
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => fetchYouTubeDuration(id);
      return;
    }

    // Create temporary hidden iframe
    const iframe = document.createElement("div");
    iframe.id = `yt-temp-player-${id}`;
    document.body.appendChild(iframe);

    const player = new (window as any).YT.Player(iframe.id, {
      videoId: id,
      events: {
        onReady: (event: any) => {
          const duration = Number(event.target.getDuration().toFixed(2));
          onDurationChange?.(duration);

          // Clean up iframe after fetching duration
          player.destroy();
          document.body.removeChild(iframe);
        },
        onError: () => {
          // Remove iframe if error occurs
          document.body.removeChild(iframe);
          onDurationChange?.(null);
        },
      },
    });

    ytPlayerRef.current = player;
  };
  const fetchNativeVideoDuration = (url: string) => {
    const video = document.createElement("video");
    video.src = url;
    video.addEventListener("loadedmetadata", () => {
      const duration = Number(video.duration.toFixed(2));
      onDurationChange?.(duration);
    });
  };
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
    }
    setThumbnailUrl("");
    setLocalVideoURL("");
    onDurationChange?.(null);
  };

  const handleUrlChange = (url: string) => {
    setLocalVideoURL(url);
    onUrlChange(url);

    if (selectedVideoType === "youtube") {
      const id = extractYouTubeId(url);
      setVideoId(id);
      if (id) {
        const ytThumbnail = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
        setThumbnailUrl(ytThumbnail);
        onThumbnailUrlChange?.(ytThumbnail);
        fetchYouTubeDuration(id);
      }
    } else if (selectedVideoType === "native") {
      fetchNativeVideoDuration(url);
    }
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
  //     // else {console.log
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
            const id = extractYouTubeId(videoUrl);
            setVideoId(id);
            if (id) fetchYouTubeDuration(id);
          } else if (videoSource === "native") {
            fetchNativeVideoDuration(videoUrl);
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
        <div className={`${selectedVideoType == "" ? "mb-0" : "mb-5"}`}>
          <label
            htmlFor="videoSource"
            className="block md:text-base/5 text-sm md:pb-2 pb-1 font-medium"
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
                        src={concatImgURL(thumbnailUrl) || ""}
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
                      value={concatImgURL(thumbnailUrl || "")}
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
                        "https://ip-cms-api.ypstagingserver.com",
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
                        src={concatImgURL(localVideoURL)}
                        controls
                        className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-contain p-2"
                        onLoadedMetadata={(e) => {
                          const duration = Number(
                            e.currentTarget.duration.toFixed(2),
                          );
                          onDurationChange?.(Number(duration.toFixed(2)));
                        }}
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
                        value={concatImgURL(localVideoURL) ?? ""}
                        readOnly
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
                            onDurationChange?.(null);
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
                        src={concatImgURL(thumbnailUrl) || ""}
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
                      value={concatImgURL(thumbnailUrl || "")}
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
                          "https://ip-cms-api.ypstagingserver.com",
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
          onThumbnailSelect={(url: string) => {
            onThumbnailUrlChange?.(url);
            setThumbnailUrl(url);
          }}
          uploadType="hero"
          mediaFilter={isChangeThumbnail ? "image" : "video"}
        />
      )}
    </div>
  );
};

export default React.memo(VideoMedia);
