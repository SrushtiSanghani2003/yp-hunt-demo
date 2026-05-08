import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";
import { closeIcon } from "../../icons";

type DeleteMediaTypes = {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  mediaType: "file" | "folder";
  isLoading: boolean;
};

const DeleteMediaModal = ({
  show,
  onClose,
  onDelete,
  mediaType,
  isLoading,
}: DeleteMediaTypes) => {
  return (
    <>
      <Dialog
        open={show}
        onClose={() => {}}
        className="fixed inset-0 z-[500] flex items-center justify-center"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        {/* Modal Panel */}
        <DialogPanel className="max-w-md relative z-10 bg-white rounded-2xl p-6 w-full border border-primary">
          <div className="flex items-center justify-between mb-4">
            <DialogTitle as="h2" className="text-xl font-semibold">
              Delete {mediaType === "file" ? "File" : "Folder"}
            </DialogTitle>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="p-0"
              onClick={onClose}
            />
          </div>

          {/* Warning Content */}
          <div className="flex items-start gap-3 text-sm text-gray-700">
            <p>
              Are you sure you want to delete this{" "}
              {mediaType === "file" ? "file" : "folder"}?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              text="No"
              onClick={onClose}
              className="px-5 border-primary border"
              backgroundColor="transparent"
            />
            <Button
              text={isLoading ? "Deleting..." : "Yes"}
              onClick={onDelete}
              className="px-6 py-2"
            />
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default DeleteMediaModal;
