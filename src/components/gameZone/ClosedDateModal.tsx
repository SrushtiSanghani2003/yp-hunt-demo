import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import TimezoneDatePicker from "../ui/timezoneDatePicker/TimeZoneDatePicker";
import Button from "../ui/button";
// import { useDispatch } from "react-redux";
// import { setPredictionClosedAt } from "../../redux-toolkit/predictionSlice";

interface ClosedDateModalProps {
  show: boolean;
  onClose: () => void;
  utcDate: string | null;
  setUtcDate: (date: string | null) => void;
}

const ClosedAtDateModal = ({
  show,
  onClose,
  utcDate,
  setUtcDate,
}: ClosedDateModalProps) => {
  // const dispatch = useDispatch();
  const handleSave = () => {
    // dispatch(setPredictionClosedAt(utcDate));
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

        <DialogPanel className="relative z-10 bg-white rounded-2xl md:p-6 p-3 max-w-xl w-full border border-primary md:mx-0 mx-4">
          <DialogTitle as="h2" className="text-2xl font-extrabold mb-4">
            Closed At
          </DialogTitle>
          <div className="md:mb-4 mb-2">
            <TimezoneDatePicker
              value={utcDate}
              onChange={(utcVal) => {
                setUtcDate(utcVal);
              }}
            />
          </div>
          <div></div>
          <div className="mt-6 flex gap-4 justify-end">
            <Button
              text="Cancel"
              onClick={() => {
                setUtcDate("");
                onClose();
              }}
              className="w-28 h-10 bg-transparent border"
            />
            <Button text="Save" className="w-28 h-10" onClick={handleSave} />
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default ClosedAtDateModal;
