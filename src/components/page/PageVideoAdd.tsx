import { useEffect, useState } from "react";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import Input from "../ui/input/Input";
import { chevronDown, closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import ContentLibrary from "../contentPanel/ContentLibrary";
import {
  concatImgURL,
  extractYouTubeId,
  getImageDimensions,
  isValidUrl,
} from "../../config/function";
import { showToast } from "../../utils/toastUtils";

type PageVideoAddProps = {
  open: boolean;
  onClose: () => void;
  sortOrder: number;
  onSubmitMedia: (data: Record<string, string | number>) => void;
  initialData?: any;
};

const PageVideoAdd = ({
  open,
  onClose,
  sortOrder,
  onSubmitMedia,
  initialData,
}: PageVideoAddProps) => {
  const [formData, setFormData] = useState({
    videoSource: "native",
    videoUrl: "",
    videoThumbnail: "",
    thumbnail_width: 0,
    thumbnail_height: 0,
    title: "",
    date: "",
    tag: "",
    description: "",
    buttonTitle: "",
    buttonUrl: "",
    button_details: [
      {
        link_text: "",
        link_url: "",
      },
    ],
    sponsorImageUrl: "",
    sponsorText: "",
    sponsorLinkUrl: "",
  });

  const [activeMediaUrl, setActiveMediaUrl] = useState<string | null>(null);

  const handleChange = async (key: string, value: string) => {
    if (key === "videoThumbnail") {
      if (value) {
        const { width, height } = await getImageDimensions(concatImgURL(value));
        setFormData((prev) => ({
          ...prev,
          videoThumbnail: value,
          thumbnail_width: width,
          thumbnail_height: height,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          videoThumbnail: "",
          thumbnail_width: 0,
          thumbnail_height: 0,
        }));
      }
      return;
    }

    setFormData((prev) => {
      const updated = { ...prev, [key]: value };

      if (key === "videoSource") {
        updated.videoUrl = "";
        updated.videoThumbnail = "";
      }

      if (updated.videoSource === "youtube" && key === "videoUrl") {
        const ytId = extractYouTubeId(value);
        if (ytId) {
          updated.videoThumbnail = `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`;
        }
      }

      return updated;
    });
  };

  const handleYoutubeThumbnail = () => {
    const ytId = extractYouTubeId(formData.videoUrl);
    const thumbUrl = `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`;
    setFormData((prev) => ({ ...prev, videoThumbnail: thumbUrl }));
  };

  const handleAddBtn = () => {
    setFormData((prev) => ({
      ...prev,
      button_details: [...prev.button_details, { link_text: "", link_url: "" }],
    }));
  };

  const handleRemoveBtn = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      button_details: prev.button_details.filter((_, i) => i !== index),
    }));
  };

  const handleBtnChange = (btnIndex: number, key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      button_details: prev.button_details.map((btn, i) => {
        if (i === btnIndex) {
          return {
            ...btn,
            [key]: value,
          };
        }
        return btn;
      }),
    }));
  };

  const uploadTypeMap: Record<string, string> = {
    videoUrl: "hero",
    videoThumbnail: "block",
    sponsorImageUrl: "sponsor",
  };
  const localToUTC = (localDateTime: string) => {
    if (!localDateTime) return "";
    const date = new Date(localDateTime);
    return date.toISOString(); // UTC
  };
  const handleSubmit = () => {
    // Button validation
    const hasButtonError = formData.button_details.some((btn, index) => {
      if (!btn.link_text?.trim()) {
        showToast(`Button ${index + 1}: Title is required`, "error");
        return true;
      }

      if (!btn.link_url?.trim()) {
        showToast(`Button ${index + 1}: URL is required`, "error");
        return true;
      }

      if (!isValidUrl(btn.link_url)) {
        showToast(`Invalid Button URL: ${btn.link_url}`, "error");
        return true;
      }

      return false;
    });

    if (hasButtonError) return;

    const mediaObj: any = {
      media_type: "video",
      media_source: formData.videoSource,
      media_url: formData.videoUrl,
      video_thumbnail: formData.videoThumbnail,
      thumbnail_width: formData.thumbnail_width,
      thumbnail_height: formData.thumbnail_height,
      title: formData.title,
      date: formData.date,
      tag: formData.tag,
      description: formData.description,
      button_details: formData.button_details,
      sponsor_image_url: formData.sponsorImageUrl,
      sponsor_text: formData.sponsorText,
      sponsor_link_url: formData.sponsorLinkUrl,
      sort_order: sortOrder,
    };

    onSubmitMedia(mediaObj);
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        videoSource: initialData.media_source || "native",
        videoUrl: initialData.media_url || "",
        videoThumbnail: initialData.video_thumbnail || "",
        title: initialData?.title || "",
        date: initialData?.date || "",
        tag: initialData?.tag || "",
        description: initialData?.description || "",
        thumbnail_width: initialData?.thumbnail_width || 0,
        thumbnail_height: initialData?.thumbnail_height || 0,
        sponsorImageUrl: initialData?.sponsor_image_url || "",
        sponsorText: initialData?.sponsor_text || "",
        sponsorLinkUrl: initialData?.sponsor_link_url || "",
        button_details: initialData?.button_details || [],
      });
    }
  }, [initialData]);

  return (
    <SidebarDialog
      open={open}
      onClose={onClose}
      title="Hero Media"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="relative mb-3">
          <select
            id="videoSource"
            value={formData.videoSource}
            onChange={(e) => handleChange("videoSource", e.target.value)}
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
        <div className="flex flex-col gap-4 relative">
          {formData.videoSource == "native" ? (
            <>
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {formData.videoUrl ? (
                    <video
                      src={concatImgURL(formData.videoUrl)}
                      controls
                      className="w-full h-full rounded-2xl object-cover p-1 border-0.5 border-primary"
                    />
                  ) : (
                    <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                      <img src={mediaIcon} alt="Placeholder" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    label="Video URL"
                    placeholder="https://www.example.com"
                    className="m-0 font-medium"
                    value={concatImgURL(formData.videoUrl)}
                    readOnly
                    onChange={(e) => handleChange("videoUrl", e.target.value)}
                  />
                  <div>
                    {formData.videoUrl ? (
                      <Button
                        text="Remove Video"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                        onClick={() => {
                          handleChange("videoUrl", "");
                          handleChange("videoThumbnail", "");
                        }}
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Video"
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                        onClick={() => setActiveMediaUrl("videoUrl")}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {formData.videoThumbnail ? (
                    <img
                      src={concatImgURL(formData.videoThumbnail)}
                      alt="videoThumbnail"
                      className="w-full h-full rounded-2xl object-cover p-1 border-0.5 border-primary"
                    />
                  ) : (
                    <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                      <img src={mediaIcon} alt="Placeholder" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    label="Video Thumbnail"
                    placeholder="https://www.example.com"
                    className="m-0 font-medium"
                    value={concatImgURL(formData.videoThumbnail)}
                    readOnly
                    onChange={(e) =>
                      handleChange("videoThumbnail", e.target.value)
                    }
                  />
                  <div>
                    {formData.videoThumbnail ? (
                      <Button
                        text="Remove Thumbnail"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                        onClick={() => handleChange("videoThumbnail", "")}
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Thumbnail"
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                        onClick={() => setActiveMediaUrl("videoThumbnail")}
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {formData.videoUrl ? (
                    (() => {
                      const ytId = extractYouTubeId(formData.videoUrl);
                      return (
                        <iframe
                          src={`https://www.youtube.com/embed/${ytId}?autoplay=0&mute=1&controls=0`}
                          className="w-full h-full rounded-2xl object-cover p-1 border-0.5 border-primary"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      );
                    })()
                  ) : (
                    <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                      <img src={mediaIcon} alt="Placeholder" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    label="Youtube URL"
                    placeholder="https://www.example.com"
                    className="m-0 font-medium"
                    value={formData.videoUrl}
                    onChange={(e) => handleChange("videoUrl", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {formData.videoThumbnail ? (
                    <img
                      src={concatImgURL(formData.videoThumbnail)}
                      alt="videoThumbnail"
                      className="w-full h-full rounded-2xl object-cover p-1 border-0.5 border-primary"
                    />
                  ) : (
                    <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                      <img src={mediaIcon} alt="Placeholder" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    label="Youtube Thumbnail"
                    placeholder="https://www.example.com"
                    className="m-0 font-medium"
                    value={concatImgURL(formData.videoThumbnail)}
                    readOnly
                    onChange={(e) =>
                      handleChange("videoThumbnail", e.target.value)
                    }
                  />
                  <div className="flex items-center gap-4">
                    {formData.videoThumbnail ? (
                      <Button
                        text="Remove"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                        onClick={() => handleChange("videoThumbnail", "")}
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Thumbnail"
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                        onClick={() => setActiveMediaUrl("videoThumbnail")}
                      />
                    )}
                    {formData.videoThumbnail?.includes(
                      "https://ip-cms-api.ypstagingserver.com",
                    ) && (
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

          <Input
            label="Title"
            className="font-medium"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <div>
            <label
              htmlFor="description"
              className="block font-medium md:text-base text-sm  w-full mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="md:p-4 p-2 border-0.5 border-primary rounded-2xl   h-sp70 md:text-base text-sm resize-none w-full focus-within:outline-none"
            ></textarea>
          </div>
          <Input
            label="Tag"
            className="font-medium"
            value={formData.tag}
            onChange={(e) => handleChange("tag", e.target.value)}
          />
          <Input
            label="Date"
            type="datetime-local"
            value={
              formData.date
                ? new Date(formData.date).toISOString().slice(0, 16)
                : ""
            }
            className="!pr-0 !mb-4"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                date: localToUTC(e.target.value),
              }))
            }
          />

          {formData.button_details.length > 0 &&
            formData.button_details.map((btn, btnIndex) => {
              return (
                <div
                  key={btnIndex}
                  className="relative bg-f6f6f6 border-0.5 border-primary rounded-2xl p-3 space-y-2"
                >
                  <Input
                    label="Button Title"
                    className="font-medium"
                    value={btn.link_text}
                    onChange={(e) =>
                      handleBtnChange(btnIndex, "link_text", e.target.value)
                    }
                  />
                  <Input
                    label="Button URL"
                    className="font-medium"
                    value={btn.link_url}
                    onChange={(e) =>
                      handleBtnChange(btnIndex, "link_url", e.target.value)
                    }
                  />

                  <Button
                    icon={closeIcon}
                    backgroundColor="transparent"
                    onClick={() => handleRemoveBtn(btnIndex)}
                    className="p-0 w-5 absolute -top-2 right-2"
                  />
                </div>
              );
            })}
          {formData.button_details.length === 0 && (
            <div>
              <Button
                text="Add Button"
                icon={plusIcon}
                backgroundColor="transparent"
                className="addSideBarBtn relative p-0"
                onClick={handleAddBtn}
              />
            </div>
          )}

          {/* <div className="flex items-center gap-2"> */}
          {/* <Input
              label="Button Title"
              className="font-medium"
              value={formData.buttonTitle}
              onChange={(e) => handleChange("buttonTitle", e.target.value)}
            /> */}
          {/* <Input
              label="Button URL"
              className="font-medium"
              value={formData.buttonUrl}
              onChange={(e) => handleChange("buttonUrl", e.target.value)}
            /> */}
          {/* </div> */}

          {/* Sponsor Image Block */}
          {/* <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 md:mb-5 mb-2">
            <div className="md:w-sp170 w-20 h-full">
              {formData.sponsorImageUrl ? (
                <img
                  src={formData.sponsorImageUrl}
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
                label="Sponsor Image URL*"
                placeholder="https://www.example.com"
                className="m-0 font-medium"
                value={formData.sponsorImageUrl}
                onChange={(e) =>
                  handleChange("sponsorImageUrl", e.target.value)
                }
              />
              <div>
                {formData.sponsorImageUrl ? (
                  <Button
                    text="Remove Image"
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="py-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                    onClick={() => handleChange("sponsorImageUrl", "")}
                  />
                ) : (
                  <Button
                    icon={plusIcon}
                    text="Add Image"
                    backgroundColor="transparent"
                    className="py-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                    onClick={() => setActiveMediaUrl("sponsorImageUrl")}
                  />
                )}
              </div>
            </div>
          </div> */}

          {/* <Input
            label="Sponsor Text*"
            value={formData.sponsorText}
            onChange={(e) => handleChange("sponsorText", e.target.value)}
          />
          <Input
            label="Sponsor Link URL"
            placeholder="https://www.example.com"
            value={formData.sponsorLinkUrl}
            onChange={(e) => handleChange("sponsorLinkUrl", e.target.value)}
          /> */}
        </div>
      </div>

      {!!activeMediaUrl && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          mediaFilter={activeMediaUrl == "videoUrl" ? "video" : "image"}
          uploadType={activeMediaUrl ? uploadTypeMap[activeMediaUrl] : "hero"}
          onSelect={(url: string) => handleChange(activeMediaUrl, url)}
          onThumbnailSelect={(url: string) =>
            handleChange("videoThumbnail", url)
          }
        />
      )}
    </SidebarDialog>
  );
};

export default PageVideoAdd;
