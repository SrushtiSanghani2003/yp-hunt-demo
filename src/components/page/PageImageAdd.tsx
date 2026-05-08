import { useEffect, useState } from "react";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { showToast } from "../../utils/toastUtils";
import {
  concatImgURL,
  getImageDimensions,
  isValidUrl,
} from "../../config/function";

type PageImageAddProps = {
  open: boolean;
  onClose: () => void;
  sortOrder: number;
  onSubmitMedia: (data: Record<string, string | number>) => void;
  initialData?: any;
};

const PageImageAdd = ({
  open,
  onClose,
  sortOrder,
  onSubmitMedia,
  initialData,
}: PageImageAddProps) => {
  const [formData, setFormData] = useState({
    imageUrl: "",
    mobileImageUrl: "",
    img_width: 0,
    img_height: 0,
    mobile_img_width: 0,
    mobile_img_height: 0,
    title: "",
    tag: "",
    date: "",
    description: "",
    sponsorImageUrl: "",
    sponsorText: "",
    sponsorLinkUrl: "",
    button_details: [
      {
        link_text: "",
        link_url: "",
      },
    ],
  });

  const [activeMediaUrl, setActiveMediaUrl] = useState<string | null>(null);

  const handleChange = async (key: string, value: string) => {
    let updatedFields: any = { [key]: value };

    if (key === "imageUrl" || key === "mobileImageUrl") {
      if (value) {
        const { width, height } = await getImageDimensions(concatImgURL(value));

        if (key === "imageUrl") {
          updatedFields.img_width = width;
          updatedFields.img_height = height;
        } else {
          updatedFields.mobile_img_width = width;
          updatedFields.mobile_img_height = height;
        }
      } else {
        if (key === "imageUrl") {
          updatedFields.img_width = 0;
          updatedFields.img_height = 0;
        } else {
          updatedFields.mobile_img_width = 0;
          updatedFields.mobile_img_height = 0;
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
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
  const localToUTC = (localDateTime: string) => {
    if (!localDateTime) return "";
    const date = new Date(localDateTime);
    return date.toISOString(); // UTC
  };

  const uploadTypeMap: Record<string, string> = {
    imageUrl: "hero",
    mobileImageUrl: "hero",
    sponsorImageUrl: "sponsor",
  };

  const handleSubmit = () => {
    // Button validation
    const invalidButton = formData.button_details?.find((btn: any) => {
      // Title empty
      if (!btn.link_text?.trim()) {
        showToast("Button title is required", "error");
        return true;
      }

      // URL empty
      if (!btn.link_url?.trim()) {
        showToast("Button URL is required", "error");
        return true;
      }

      // URL invalid
      if (!isValidUrl(btn.link_url)) {
        showToast(`Invalid Button URL: ${btn.link_url}`, "error");
        return true;
      }

      return false;
    });

    if (invalidButton) return;

    const mediaObj: any = {
      media_type: "image",
      media_source: "native",
      media_url: formData.imageUrl,
      mobile_media_url: formData.mobileImageUrl,
      img_width: formData.img_width,
      img_height: formData.img_height,
      mobile_img_width: formData.mobile_img_width,
      mobile_img_height: formData.mobile_img_height,
      title: formData.title,
      tag: formData.tag,
      date: formData.date,
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
        imageUrl: initialData.media_url || "",
        mobileImageUrl: initialData.mobile_media_url || "",
        title: initialData?.title || "",
        tag: initialData?.tag || "",
        date: initialData?.date || "",
        description: initialData?.description || "",
        img_width: initialData?.img_width || 0,
        img_height: initialData?.img_height || 0,
        mobile_img_width: initialData.mobile_img_width || 0,
        mobile_img_height: initialData.mobile_img_height || 0,
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
      <>
        <div>
          <h3 className="mb-4 text-xl/5 font-extrabold">Image 01</h3>
          <div className="flex flex-col gap-3 relative">
            {/* Image Preview Block */}
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
              <div className="md:w-sp170 w-20 h-full">
                {formData.imageUrl ? (
                  <img
                    src={concatImgURL(formData.imageUrl)}
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
                  label="Image URL"
                  placeholder="https://www.example.com"
                  className="m-0 font-medium"
                  value={concatImgURL(formData.imageUrl)}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                />
                <div>
                  {formData.imageUrl ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                      onClick={() => handleChange("imageUrl", "")}
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                      onClick={() => setActiveMediaUrl("imageUrl")}
                    />
                  )}
                </div>
              </div>
            </div>
            <h3 className=" text-xl/5 font-extrabold">Mobile Image</h3>
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
              <div className="md:w-sp170 w-20 h-full">
                {formData.mobileImageUrl ? (
                  <img
                    src={concatImgURL(formData.mobileImageUrl)}
                    alt="Mobile"
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
                  label="Mobile Image URL"
                  value={concatImgURL(formData.mobileImageUrl)}
                  onChange={(e) => handleChange("mobileImageUrl", e.target.value)}
                />

                <div>
                  {formData.mobileImageUrl ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      onClick={() => handleChange("mobileImageUrl", "")}
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      onClick={() => setActiveMediaUrl("mobileImageUrl")}
                    />
                  )}
                </div>
              </div>
            </div>

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
              inputCss="!pr-2"
              className=" !mb-4"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  date: localToUTC(e.target.value),
                }))
              }
            />

            {/* <Input
            label="Button Title"
            className="font-medium"
            value={formData.buttonTitle}
            onChange={(e) => handleChange("buttonTitle", e.target.value)}
          />
          <Input
            label="Button URL"
            className="font-medium"
            value={formData.buttonUrl}
            onChange={(e) => handleChange("buttonUrl", e.target.value)}
          /> */}
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
                    {/* <Input
                    label="Icon URL"
                    className="font-medium"
                    value={btn.btn_icon}
                    onChange={(e) =>
                      handleBtnChange(btnIndex, "btn_icon", e.target.value)
                    }
                  /> */}

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
          </div>

          <Input
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

      </>

      {!!activeMediaUrl && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          mediaFilter="image"
          uploadType={activeMediaUrl ? uploadTypeMap[activeMediaUrl] : "hero"}
          onSelect={(url: string) => handleChange(activeMediaUrl, url)}
        />
      )}
    </SidebarDialog>
  );
};

export default PageImageAdd;
