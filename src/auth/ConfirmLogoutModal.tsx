import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../components/ui/button";

type ConfirmLogoutModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const ConfirmLogoutModal = ({
  show,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmLogoutModalProps) => {
  return (
    <>
      <Dialog
        open={show}
        // onClose={onClose}
        onClose={() => {}}
        className="fixed inset-0 z-[500] flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />
        <DialogPanel className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-md border border-primary">
          <DialogTitle as="h3" className="text-xl font-extrabold mb-3">
            Are You Sure ?
          </DialogTitle>
          <p className="text-gray-600 text-base">
            Logging out will end your current session. Do you want to continue?
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              text="Cancel"
              onClick={onClose}
              className="border border-gray-300 px-4 py-3"
              backgroundColor="transparent"
            />
            <Button
              text={"Logout"}
              onClick={onConfirm}
              className="bg-primary px-4 py-3 text-black"
              disabled={isLoading}
              isLoading={isLoading}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default ConfirmLogoutModal;
