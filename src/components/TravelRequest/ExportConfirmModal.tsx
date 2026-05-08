import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";

interface ExportConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  moduleName: string; // transportation / flight / accommodation
  status?: string;
  isLoading?: boolean;
}

const ExportConfirmModal = ({
  show,
  onClose,
  onConfirm,
  moduleName,
  status,
  isLoading,
}: ExportConfirmModalProps) => {
  return (
    <Dialog
      open={show}
      onClose={() => {}}
      className="fixed inset-0 z-[500] flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

      <DialogPanel className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-md border border-primary">
        <DialogTitle as="h3" className="text-xl font-extrabold mb-3">
          Confirm Export
        </DialogTitle>

        <p className="mb-4 text-gray-600">
          Are you sure you want to export <strong>{moduleName}</strong> data
          {status ? (
            <>
              {" "}
              with status <strong>"{status}"</strong>?
            </>
          ) : (
            <>
              {" "}
              for <strong>All Status</strong>?
            </>
          )}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            text="Cancel"
            onClick={onClose}
            className="border border-gray-300 px-4 py-3"
            backgroundColor="transparent"
          />

          <Button
            text={isLoading ? "Exporting..." : "Yes, Export"}
            onClick={onConfirm}
            className="bg-primary px-4 py-3 text-black"
            disabled={isLoading}
          />
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default ExportConfirmModal;
