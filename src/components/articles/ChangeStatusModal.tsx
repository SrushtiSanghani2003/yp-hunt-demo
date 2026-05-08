import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";

type ChangeStatusModalProps = {
  show: boolean;
  onClose: () => void;
  onSave: (payload: any) => void;
  isLoading: boolean;
};

const ChangeStatusModal = ({
  show,
  onClose,
  onSave,
  isLoading,
}: ChangeStatusModalProps) => {
  const onConfirm = () => {
    const payload = {
      status: "draft",
    };
    onSave(payload);
  };

  return (
    <>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        <DialogPanel className="relative z-10 bg-white rounded-2xl p-6 max-w-xl w-full border border-primary">
          <DialogTitle as="h2" className="text-2xl font-extrabold mb-4">
            Status Confirmation
          </DialogTitle>
          <p className="mb-4 text-base/4 text-gray-600">
            Are you sure you want to change status ?
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              text="No"
              onClick={onClose}
              className="border border-gray-300 px-4 py-3"
              backgroundColor="transparent"
            />
            <Button
              text="Yes"
              onClick={onConfirm}
              className="bg-primary px-4 py-3 text-black"
              isLoading={isLoading}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default ChangeStatusModal;
