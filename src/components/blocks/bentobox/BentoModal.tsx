import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { bentoLayouts } from "./bentoLayouts";
import Button from "../../ui/button";

interface BenotModalProps {
  show: boolean;
  currentKey: string;
  onClose: () => void;
  onSelect?: (layoutKey: string) => void;
}

const BentoModal = ({
  show,
  currentKey,
  onClose,
  onSelect,
}: BenotModalProps) => {
  return (
    <>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        <DialogPanel className="relative z-10 bg-white rounded-2xl p-6 max-w-5xl w-full border border-primary">
          <DialogTitle as="h2" className="text-base/4 font-extrabold mb-4">
            Select Bento Box
          </DialogTitle>

          <div className="grid md:grid-cols-5 grid-cols-3 justify-center gap-4 max-h-[70vh] overflow-y-auto">
            {Object.entries(bentoLayouts).map(([key, layout]) => (
              <div
                key={key}
                onClick={() => onSelect?.(key)}
                className={`cursor-pointer p-2 border rounded-2xl transition ${
                  key === currentKey
                    ? "border-fcd100 shadow-xl"
                    : "border-gray-300"
                } hover:shadow-xl`}
              >
                <div className="grid grid-cols-12 gap-1 auto-rows-40 grid-flow-dense">
                  {layout.map((item, i) => (
                    <div
                      key={i}
                      className={`bg-gray-300 rounded-2xl ${item.className}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button text="Cancel" onClick={onClose} className="px-3" />
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default BentoModal;
