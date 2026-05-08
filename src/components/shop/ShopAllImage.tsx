import { useState } from "react";
import { closeIcon, mediaIcon } from "../../icons";
import Button from "../ui/button";
import ShopImageAdd from "./ShopImageAdd";
import { concatImgURL } from "../../config/function";

type ShopAllImageProps = {
  media: Record<string, any>;
  sortOrder: number;
  label: string;
  onUpdateMedia: (sortOrder: number, media: any) => void;
  onRemoveMedia: (sortOrder: number) => void; 
};

export default function ShopAllImage({
  media,
  sortOrder,
  label,
  onUpdateMedia,
  onRemoveMedia,
}: ShopAllImageProps) {
  const [show, setShow] = useState(false);

  const handleUpdate = (mediaData: any) => {
    onUpdateMedia(sortOrder, mediaData);
    setShow(false);
  };

  const handleRemove = () => {
    onRemoveMedia(sortOrder);
  };

  return (
    <div>
      <div className="">
        <div className="flex lg:h-32 md:h-28 h-20 md:gap-4 gap-2">
          <div
            onClick={() => setShow(true)}
            className=" flex-1 h-full w-full cursor-pointer"
          >
            {media?.media_url ? (
              <img
                src={concatImgURL(media.media_url)}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-2xl border-0.5 border-primary block align-middle"
              />
            ) : (
              <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                <img src={mediaIcon} alt="Placeholder" />
              </div>
            )}
          </div>
        </div>
        <div className="text-center md:text-base text-sm font-medium">{label}</div>
        {show && (
          <ShopImageAdd
            open={show}
            onClose={() => setShow(false)}
            onSubmitMedia={handleUpdate}
            initialData={media}
            label={label}
          />
        )}
        <Button
          icon={closeIcon}
          backgroundColor="white md:p-1"
          className="absolute top-1 right-1"
          imageclassName="w-4 h-4"
          onClick={handleRemove}
        />
      </div>
    </div>
  );
}
