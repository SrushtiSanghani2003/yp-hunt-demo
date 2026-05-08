import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";

interface DownloadTemplateConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  moduleName: string;
  isLoading?: boolean;
}

const DownloadTemplateConfirmModal = ({
  show,
  onClose,
  onConfirm,
  moduleName,
  isLoading,
}: DownloadTemplateConfirmModalProps) => {
  return (
    <Dialog
      open={show}
      onClose={() => {}}
      className="fixed inset-0 z-[500] flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

      <DialogPanel className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-md border border-primary">
        <DialogTitle as="h3" className="text-xl font-extrabold mb-3">
          Download Template
        </DialogTitle>

        <p className="mb-4 text-gray-600">
          Are you sure you want to download the <strong>{moduleName}</strong>{" "}
          CSV template?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            text="Cancel"
            onClick={onClose}
            className="border border-gray-300 px-4 py-3"
            backgroundColor="transparent"
          />

          <Button
            text="Download"
            onClick={onConfirm}
            className="bg-primary px-4 py-3 text-black"
            disabled={isLoading}
          />
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default DownloadTemplateConfirmModal;
