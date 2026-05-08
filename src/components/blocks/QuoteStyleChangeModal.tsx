import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";

type QuoteStyleChangeModalProps = {
  show: boolean;
  onClose: () => void;
  onSelect?: (isFeedback: boolean) => void; // using boolean
  isFeedback?: boolean; // initial selected value
};

const QuoteStyleChangeModal = ({
  show,
  onClose,
  onSelect,
  isFeedback = false,
}: QuoteStyleChangeModalProps) => {
  const handleSelect = (value: boolean) => {
    onSelect?.(value);
    onClose(); // close modal after selecting
  };

  return (
    <Dialog
      open={show}
      onClose={() => {}}
      transition
      className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
    >
      <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

      <DialogPanel className="relative z-10 bg-white rounded-2xl p-6 max-w-xl w-full border border-primary">
        <DialogTitle as="h2" className="text-lg font-extrabold mb-4">
          Select Style
        </DialogTitle>

        <div className="grid grid-cols-2 gap-4">
          {/* Quote Style */}
          <button
            onClick={() => handleSelect(false)}
            className={`rounded-xl border-2 p-4 text-center transition 
              ${
                !isFeedback
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-primary"
              }`}
          >
            <p className="font-semibold">Quote Style</p>
            <p className="text-sm text-gray-500 mt-1">
              Simple styled quotation
            </p>
          </button>

          {/* Feedback Style */}
          <button
            onClick={() => handleSelect(true)}
            className={`rounded-xl border-2 p-4 text-center transition 
              ${
                isFeedback
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-primary"
              }`}
          >
            <p className="font-semibold">Feedback Style</p>
            <p className="text-sm text-gray-500 mt-1">
              Highlighted feedback layout
            </p>
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button text="Cancel" onClick={onClose} className="px-3" />
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default QuoteStyleChangeModal;
