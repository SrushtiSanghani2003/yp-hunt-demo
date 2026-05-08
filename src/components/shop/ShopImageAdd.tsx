import { useEffect, useState } from "react";
import {  closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { concatImgURL } from "../../config/function";

type ShopImageAddProps = {
  open: boolean;
  onClose: () => void;
  onSubmitMedia: (media: any) => void;
  initialData?: { media_url?: string };
  label: string;
};

export default function ShopImageAdd({
  open,
  onClose,
  onSubmitMedia,
  initialData,
  label,
}: ShopImageAddProps) {
  const [formData, setFormData] = useState({
    imageUrl: "",
  });
  const [activeMediaUrl, setActiveMediaUrl] = useState<string | null>(null);

  const handleChange = (key: any, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const uploadTypeMap: any = {
    imageUrl: "hero",
    sponsorImageUrl: "sponsor",
  };

  const handleSubmit = () => {
    const mediaObj = {
      media_url: formData.imageUrl,
    };
    onSubmitMedia(mediaObj);
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        imageUrl: initialData.media_url || "",
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
            <h3 className="mb-4 text-xl/5 font-extrabold">{label}</h3>
            <div className="flex flex-col gap-3 relative">
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
            </div>
          </div>
        </>

      {activeMediaUrl && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          mediaFilter="image"
          uploadType={activeMediaUrl ? uploadTypeMap[activeMediaUrl] : "hero"}
          onSelect={(url) => handleChange(activeMediaUrl, url)}
        />
      )}
    </SidebarDialog>
  );
}
