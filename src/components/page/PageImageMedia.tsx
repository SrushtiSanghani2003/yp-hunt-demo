import { useState } from "react";
import { closeIcon, mediaIcon } from "../../icons";
import PageImageAdd from "./PageImageAdd";
import {
  removeHeroMediaBySortOrder,
  updateHeroMediaBySortOrder,
} from "../../redux-toolkit/pageSlice";
import { useDispatch } from "react-redux";
import Button from "../ui/button";
import { concatImgURL } from "../../config/function";

export interface PageImageMediaProps {
  media?: any;
  sortOrder: number;
}

const PageImageMedia = ({ media, sortOrder }: PageImageMediaProps) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = (media: any) => {
    dispatch(
      updateHeroMediaBySortOrder({
        mediaType: "image",
        sortOrder,
        data: media,
      })
    );
  };

  const handleRemove = () => {
    dispatch(
      removeHeroMediaBySortOrder({
        mediaType: "image",
        sortOrder,
      })
    );
  };

  return (
    <div className="relative">
      <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
        <div
          onClick={() => setShow(true)}
          className="md:w-sp188 flex-1 w-20 h-full"
        >
          {media?.media_url ? (
            <img
              src={concatImgURL(media?.media_url)}
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
      {show && (
        <PageImageAdd
          open={show}
          onClose={() => setShow(false)}
          sortOrder={sortOrder}
          initialData={media}
          onSubmitMedia={handleUpdate}
        />
      )}
      <Button
        icon={closeIcon}
        backgroundColor="white md:p-0.5"
        className="absolute top-1 right-1"
        imageclassName="w-4 h-4"
        onClick={handleRemove}
      />
    </div>
  );
};

export default PageImageMedia;
