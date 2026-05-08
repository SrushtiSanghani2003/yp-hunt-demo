import { useMutation, useQuery } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import api from "../../lib/api";
import { useEffect, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import { chevronDown, closeIcon, mediaIcon, plusIcon } from "../../icons";
import { concatImgURL } from "../../config/function";
import ContentLibrary from "../contentPanel/ContentLibrary";
import FroalaEditor from "../blocks/FroalaEditor";
import { useSelector } from "react-redux";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import { useScroll } from "../../hooks/ScrollContext";
import {
  selectLanguage,
  selectTranslation,
} from "../../redux-toolkit/languageSlice";

type MediaType = "image" | "logo" | "video" | "thumbnail" | null;

export default function PremierPredict() {
  const { isScrolled } = useScroll();
  const language = useSelector(selectLanguage);
  const isTranslation = useSelector(selectTranslation);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [howToPlayDescription, setHowToPlayDescription] = useState<string>("");
  const [languageCode, setLanguageCode] = useState("en") || language;
  const [show, setShow] = useState(false);
  const [activeMediaType, setActiveMediaType] = useState<MediaType>(null);
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isUpdate } = getPermissionFlags(menuPermissions.premier_predict);
  /** Update language localization */
  const { mutate: updateLanguagePremierPredict, isPending } = useMutation({
    mutationFn: async (data: any) =>
      await api.patch("/common/predict-banner", data.payload, {
        params: {
          language_code: data.languageCode,
        },
      }),

    onSuccess: () => {
      showToast("Premier Predict Updated Successfully", "success");
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      showToast(errorMessage, "error");
    },
  });
  const { data } = useQuery({
    queryKey: ["predict-banner", languageCode],
    queryFn: async () => {
      const res = await api.get("/common/predict-banner", {
        params: {
          language_code: languageCode,
        },
      });
      return res.data;
    },
    enabled: !!languageCode,
  });

  const handleUpdateTier = () => {
    if (!isUpdate) return;
    const payload = {
      banner_image: imageUrl || "",
      banner_logo: logoImageUrl || "",
      description: description || "",
      how_to_play_description: howToPlayDescription || "",
      how_to_play_video: videoUrl || "",
      how_to_play_thumbnail: thumbnailUrl || "",
      auto_translate: isTranslation,
    };

    updateLanguagePremierPredict({
      payload,
      languageCode,
    });
  };
  useEffect(() => {
    if (!data) return;

    setImageUrl(data.banner_image || null);
    setLogoImageUrl(data.banner_logo || null);
    setDescription(data.description || "");
    setHowToPlayDescription(data.how_to_play_description || "");
    setVideoUrl(data.how_to_play_video || null);
    setThumbnailUrl(data.how_to_play_thumbnail || null);
  }, [data]);
  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center gap-5 ">
          <h2 className="lg:text-2xl/6 text-xl font-extrabold pb-2 md:pb-0">
            Premier Predict
          </h2>
          <div className="flex items-end gap-5">
            <div>
              <label
                htmlFor="language"
                className="block md:mb-2 mb-1 md:text-base/4 text-sm font-medium"
              >
                Language
              </label>
              <div className="relative w-60">
                <select
                  id="language"
                  value={languageCode}
                  onChange={(e) => setLanguageCode(e.target.value)}
                  className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                </select>
                <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                  <img src={chevronDown} />
                </div>
              </div>
            </div>
            <Button
              text="Update"
              className={`lg:py-3 py-sp10 lg:px-5 px-3 ${
                !isUpdate ? "opacity-50 cursor-not-allowed" : ""
              } `}
              onClick={handleUpdateTier}
              disabled={!isUpdate}
              isLoading={isPending}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="bg-white p-5 mb-5 rounded-2xl border border-primary space-y-6">
          {/* ================= IMAGE ================= */}
          <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
            <div className="md:w-sp170 w-20 h-full">
              {imageUrl ? (
                <img
                  src={concatImgURL(imageUrl)}
                  alt="Image"
                  className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary"
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
                className="m-0"
                value={imageUrl ? concatImgURL(imageUrl) : ""}
                readOnly
              />

              {imageUrl ? (
                <Button
                  text="Remove Image"
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="py-0"
                  onClick={() => setImageUrl(null)}
                />
              ) : (
                <Button
                  icon={plusIcon}
                  text="Add Image"
                  backgroundColor="transparent"
                  className="py-0"
                  onClick={() => {
                    setActiveMediaType("image");
                    setShow(true);
                  }}
                />
              )}
            </div>
          </div>

          {/* ================= LOGO ================= */}
          <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
            <div className="md:w-sp170 w-20 h-full">
              {logoImageUrl ? (
                <img
                  src={concatImgURL(logoImageUrl)}
                  alt="Logo"
                  className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary"
                />
              ) : (
                <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                  <img src={mediaIcon} alt="Placeholder" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <Input
                label="Logo Image URL"
                className="m-0"
                value={logoImageUrl ? concatImgURL(logoImageUrl) : ""}
                readOnly
              />

              {logoImageUrl ? (
                <Button
                  text="Remove Logo"
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="py-0"
                  onClick={() => setLogoImageUrl(null)}
                />
              ) : (
                <Button
                  icon={plusIcon}
                  text="Add Logo"
                  backgroundColor="transparent"
                  className="py-0"
                  onClick={() => {
                    setActiveMediaType("logo");
                    setShow(true);
                  }}
                />
              )}
            </div>
          </div>

          <div>
            <div className="relative">
              <FroalaEditor
                label="Description"
                model={description}
                onModelChange={(value: string) => setDescription(value)}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <FroalaEditor
                label=" How To Play Description"
                model={howToPlayDescription}
                onModelChange={(value: string) =>
                  setHowToPlayDescription(value)
                }
              />
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
              <div className="md:w-sp170 w-20 h-full">
                {videoUrl ? (
                  <video
                    src={concatImgURL(videoUrl)}
                    controls
                    className="w-full h-full rounded-2xl object-contain p-2 border-0.5 border-primary"
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
                  readOnly
                  className="m-0"
                  value={videoUrl ? concatImgURL(videoUrl) : ""}
                />

                {videoUrl ? (
                  <Button
                    text="Remove Video"
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="py-0"
                    onClick={() => setVideoUrl(null)}
                  />
                ) : (
                  <Button
                    icon={plusIcon}
                    text="Add Video"
                    backgroundColor="transparent"
                    className="py-0"
                    onClick={() => {
                      setActiveMediaType("video");
                      setShow(true);
                    }}
                  />
                )}
              </div>
            </div>

            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
              <div className="md:w-sp170 w-20 h-full">
                {thumbnailUrl ? (
                  <img
                    src={concatImgURL(thumbnailUrl)}
                    alt="Thumbnail"
                    className="w-full h-full rounded-2xl border-0.5 border-primary object-contain p-2"
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
                  readOnly
                  className="m-0"
                  value={thumbnailUrl ? concatImgURL(thumbnailUrl) : ""}
                />

                {thumbnailUrl ? (
                  <Button
                    icon={closeIcon}
                    text="Remove Thumbnail"
                    backgroundColor="transparent"
                    className="py-0"
                    onClick={() => setThumbnailUrl(null)}
                  />
                ) : (
                  <Button
                    icon={plusIcon}
                    text="Add Thumbnail"
                    backgroundColor="transparent"
                    className="py-0"
                    onClick={() => {
                      setActiveMediaType("thumbnail");
                      setShow(true);
                    }}
                  />
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* ================= CONTENT LIBRARY ================= */}
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => {
            setShow(false);
            setActiveMediaType(null);
          }}
          uploadType="premier_predict"
          mediaFilter={activeMediaType === "video" ? "video" : "image"}
          onSelect={(value: string) => {
            if (activeMediaType === "image") setImageUrl(value);
            if (activeMediaType === "logo") setLogoImageUrl(value);
            if (activeMediaType === "video") setVideoUrl(value);

            setShow(false);
            setActiveMediaType(null);
          }}
          onThumbnailSelect={(value) => {
            if (activeMediaType === "image") setImageUrl(value);
            if (activeMediaType === "logo") setLogoImageUrl(value);
            if (activeMediaType === "thumbnail") setThumbnailUrl(value);
          }}
        />
      )}
    </div>
  );
}
