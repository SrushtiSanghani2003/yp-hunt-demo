import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";

type Props = {
  show: boolean;
  onClose: () => void;
  onSelect?: (isCarousel: boolean) => void;
  isCarousel?: boolean;
};

const PartnersStyleModal = ({
  show,
  onClose,
  onSelect,
  isCarousel = false,
}: Props) => {
  const handleSelect = (value: boolean) => {
    onSelect?.(value);
    onClose();
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
          {/* Grid Style */}
          <button
            onClick={() => handleSelect(false)}
            className={`rounded-xl border-2 p-4 text-center transition 
              ${
                !isCarousel
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-primary"
              }`}
          >
            <p className="font-semibold">Grid Style</p>
            <p className="text-sm text-gray-500 mt-1">
              Display partners in a grid layout
            </p>
          </button>

          {/* Carousel Style */}
          <button
            onClick={() => handleSelect(true)}
            className={`rounded-xl border-2 p-4 text-center transition 
              ${
                isCarousel
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-primary"
              }`}
          >
            <p className="font-semibold">Carousel Style</p>
            <p className="text-sm text-gray-500 mt-1">
              Scrollable carousel of partners
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

export default PartnersStyleModal;
