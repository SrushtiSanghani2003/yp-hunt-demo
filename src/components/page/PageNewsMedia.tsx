import { useState } from "react";
import Button from "../ui/button";
import { closeIcon } from "../../icons";
import { useDispatch } from "react-redux";
import {
  removeHeroMediaBySortOrder,
  updateHeroMediaBySortOrder,
} from "../../redux-toolkit/pageSlice";
import PageMediaSelectModal from "./PageMediaSelectModal";

type Props = {
  media: any;
  sortOrder: number;
};

const PageNewsMedia = ({ media, sortOrder }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  /* ---------------- SAVE ---------------- */
  const handleSave = (value: {
    is_latest: boolean;
    external_id: number | null;
    title?: string;
  }) => {
    dispatch(
      updateHeroMediaBySortOrder({
        mediaType: "news",
        sortOrder,
        data: {
          is_latest: value.is_latest,
          external_id: value.external_id,
          title: value.title ?? "",
          button_details: [],
        },
      })
    );
  };

  /* ---------------- REMOVE ---------------- */
  const handleRemove = () => {
    dispatch(
      removeHeroMediaBySortOrder({
        mediaType: "news",
        sortOrder,
      })
    );
  };

  /* ---------------- LABEL ---------------- */
  const label = media?.is_latest
    ? "Latest News"
    : media?.title || "Select News";

  /* ---------------- EDIT VALUE FOR MODAL ---------------- */
  const selectedValueForModal = media?.is_latest
    ? { is_latest: true }
    : media?.external_id
    ? {
        is_latest: false,
        external_id: media.external_id,
        title: media.title,
      }
    : null;

  return (
    <div className="relative">
      {/* Card */}
      <div
        onClick={() => setOpen(true)}
        className="h-sp100 rounded-2xl border-0.5 border-primary 
        flex items-center justify-center cursor-pointer bg-white px-2 "
      >
        <span className="px-2 py-0.5 text-xs rounded-md capitalize  mt-2 bg-primary text-black font-medium text-center line-clamp-2">
          {label}
        </span>
      </div>

      {/* Remove */}
      <Button
        icon={closeIcon}
        backgroundColor="white md:p-0.5"
        className="absolute top-1 right-1"
        imageclassName="w-4 h-4"
        onClick={handleRemove}
      />

      {/* Modal */}
      {open && (
        <PageMediaSelectModal
          open={open}
          onClose={() => setOpen(false)}
          mediaType="news"
          selectedValue={selectedValueForModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PageNewsMedia;
