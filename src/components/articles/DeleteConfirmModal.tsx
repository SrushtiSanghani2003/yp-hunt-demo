import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";

interface DeleteConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  isLoading?: boolean;
}

const DeleteConfirmModal = ({
  show,
  onClose,
  onConfirm,
  itemName,
  isLoading,
}: DeleteConfirmModalProps) => {
  return (
    <Dialog
      open={show}
      onClose={() => {}}
      className="fixed inset-0 z-[500] flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

      <DialogPanel className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-md border border-primary">
        <DialogTitle as="h3" className="text-xl font-extrabold mb-3">
          Confirm Deletion
        </DialogTitle>
        <p className="mb-4 text-base/4 text-gray-600">
          Are you sure you want to delete{" "}
          {itemName ? `"${itemName}"` : "this item"}?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            text="Cancel"
            onClick={onClose}
            className="border border-gray-300 px-4 py-3"
            backgroundColor="transparent"
          />
          <Button
            text={isLoading ? "Deleting..." : "Delete"}
            onClick={onConfirm}
            className="bg-red-600 px-4 py-3 text-white hover:bg-red-700"
            disabled={isLoading}
          />
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default DeleteConfirmModal;
