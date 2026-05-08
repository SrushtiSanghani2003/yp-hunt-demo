import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";
import { closeIcon } from "../../icons";
import { useEffect,  useState } from "react";


type AddQuizCategoryProps = {
  show: boolean;
  onClose: () => void;
  onCreate?: (newAlbum: { name: string; thumbnail_url: string }) => void;
  onUpdate?: (updateAlbum: {
    id: string;
    name: string;
    thumbnail_url: string;
  }) => void;
  isLoading: boolean;
  editData: any;
};

const AddQuizCategory = ({
  show,
  onClose,
  onCreate,
  onUpdate,
  isLoading,
  editData,
}: AddQuizCategoryProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    if (editData) {
      setCategoryTitle(editData.name);
      setThumbnailUrl(editData.thumbnailUrl);
    } else {
      setCategoryTitle("");
      setThumbnailUrl("");
    }
  }, [editData, show]);

  const handleSubmit = () => {
    if (editData && onUpdate) {
      onUpdate({
        id: String(editData.id),
        name: categoryTitle,
        thumbnail_url: thumbnailUrl,
      });
    } else {
      onCreate?.({ name: categoryTitle, thumbnail_url: thumbnailUrl });
    }
  };

  return (
    <div>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        <DialogPanel className="max-w-lg relative z-10 bg-white rounded-2xl p-6 w-full border border-primary">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle as="h2" className="text-2xl/6 font-extrabold">
              {editData ? "Edit Quiz Category" : "Add Quiz Category"}
            </DialogTitle>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="p-0"
              onClick={onClose}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block font-medium md:text-base text-sm w-full  mb-1"
            >
              Title
            </label>
            <textarea
              name="title"
              id="title"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              className="w-full min-h-20 border border-primary rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              text="Cancel"
              onClick={onClose}
              className="px-5 border-primary border-0.5"
              backgroundColor="transparent"
            />
            <Button
              text={`${isLoading ? "Saving.." : "Save"}`}
              className="px-8 py-3"
              onClick={handleSubmit}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default AddQuizCategory;
