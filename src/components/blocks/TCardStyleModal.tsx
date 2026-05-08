import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";

type TCardModalProps = {
  show: boolean;
  onClose: () => void;
  onSelect?: (layoutKey: string) => void;
  layoutKey?: string;
};

const TCardStyleModal = ({
  show,
  onClose,
  onSelect,
  layoutKey,
}: TCardModalProps) => {
  const handleSelect = (layoutKey: string) => {
    onSelect?.(layoutKey);
    onClose();
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
          <DialogTitle as="h2" className="text-lg/5 font-extrabold mb-4">
            Select Style
          </DialogTitle>

          <div className="grid grid-cols-2 gap-5">
            <div
              className={`rounded-xl p-3 border cursor-pointer ${
                layoutKey == "2CARDS" ? "shadow-xl" : ""
              }`}
              onClick={() => handleSelect("2CARDS")}
            >
              <div className="grid grid-cols-2 h-28 gap-5">
                <div className="bg-f6f6f6 rounded-xl h-full"></div>
                <div className="bg-f6f6f6 rounded-xl h-full"></div>
              </div>
            </div>
            <div
              className={`rounded-xl p-3 border cursor-pointer ${
                layoutKey == "3CARDS" ? "shadow-xl" : ""
              }`}
              onClick={() => handleSelect("3CARDS")}
            >
              <div className="grid grid-cols-3 h-28 gap-5">
                <div className="bg-f6f6f6 rounded-xl h-full"></div>
                <div className="bg-f6f6f6 rounded-xl h-full"></div>
                <div className="bg-f6f6f6 rounded-xl h-full"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button text="Cancel" onClick={onClose} className="px-3" />
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default TCardStyleModal;
