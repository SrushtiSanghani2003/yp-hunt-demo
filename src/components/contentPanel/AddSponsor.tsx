import { useEffect, useState } from "react";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import ContentLibrary from "./ContentLibrary";
import { concatImgURL } from "../../config/function";

type AddSponsorProps = {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave?: (payload: {
    sponsor_img: string;
    sponsor_name: string;
    sponsor_url: string;
  }) => void;
};

const AddSponsor = ({ open, onClose, data, onSave }: AddSponsorProps) => {
  const [sponsor, setSponsor] = useState({
    imgUrl: "",
    text: "",
    linkUrl: "",
  });
  const [show, setShow] = useState(false);

  const handleSponsorChange = (
    field: "imgUrl" | "text" | "linkUrl",
    value: string
  ) => {
    setSponsor((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const sponsor_img = sponsor.imgUrl;
    const sponsor_name = sponsor.text;
    const sponsor_url = sponsor.linkUrl;
    onSave?.({ sponsor_img, sponsor_name, sponsor_url });
    onClose();
  };

  useEffect(() => {
    if (data?.translation) {
      setSponsor({
        imgUrl: data.translation.sponsor_logo_url || "",
        text: data.translation.sponsor_name || "",
        linkUrl: data.translation.sponsor_url || "",
      });
    }
  }, [data]);

  return (
    <>
      <SidebarDialog
        title="Sponsor Content"
        open={open}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <div className="mb-2 relative">
          <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 md:mb-5 mb-2">
            <div className="md:w-sp170 w-20 h-full">
              {sponsor.imgUrl ? (
                <img
                  src={concatImgURL(sponsor.imgUrl) || ""}
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
                value={concatImgURL(sponsor.imgUrl || "")}
                onChange={(e) => handleSponsorChange("imgUrl", e.target.value)}
              />
              <div>
                {sponsor.imgUrl ? (
                  <Button
                    text="Remove Image"
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="py-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                    onClick={() => handleSponsorChange("imgUrl", "")}
                  />
                ) : (
                  <Button
                    icon={plusIcon}
                    text="Add Image"
                    backgroundColor="transparent"
                    className="py-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                    onClick={() => setShow(true)}
                  />
                )}
              </div>
            </div>
          </div>

          <Input
            label="Sponsor Text*"
            className="font-medium md:mb-5 mb-2"
            value={sponsor.text || ""}
            onChange={(e) => handleSponsorChange("text", e.target.value)}
          />
          <Input
            label="Sponsor Link URL"
            placeholder="https://www.example.com"
            className="font-medium"
            value={sponsor.linkUrl || ""}
            onChange={(e) => handleSponsorChange("linkUrl", e.target.value)}
          />
        </div>
      </SidebarDialog>
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="sponsor"
          onSelect={(url: string) => handleSponsorChange("imgUrl", url)}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default AddSponsor;
