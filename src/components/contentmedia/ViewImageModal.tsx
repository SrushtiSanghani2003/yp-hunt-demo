import { Dialog, DialogPanel } from "@headlessui/react";
import Button from "../ui/button";
import { closeIcon } from "../../icons";
import { concatImgURL } from "../../config/function";

type ViewImageModalProps = {
  show: boolean;
  onClose: () => void;
  imgUrl: string;
};

const ViewImageModal = ({ show, onClose, imgUrl }: ViewImageModalProps) => {
  return (
    <Dialog
      open={show}
      onClose={() => {}}
      className="fixed inset-0 z-[500] flex items-center justify-center"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <DialogPanel className="relative z-10 max-w-xl w-full mx-4 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform duration-300">
        <Button
          icon={closeIcon}
          backgroundColor="transparent"
          className="absolute -right-4 -top-4 z-50 bg-white p-2 hover:bg-gray-100 rounded-full"
          onClick={onClose}
        />

        {/* Image Display */}
        <div className="max-h-[80vh] bg-black flex justify-center items-center rounded-lg">
          <img
            src={concatImgURL(imgUrl)}
            alt="Preview"
            className="max-w-full max-h-[70vh] p-4 rounded-lg object-contain"
          />
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default ViewImageModal;
