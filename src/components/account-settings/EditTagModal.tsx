import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";
import { closeIcon } from "../../icons";
import Input from "../ui/input/Input";
import { useEffect, useState } from "react";

type EditTagModalProps = {
  show: boolean;
  onClose: () => void;
  initialValue: string;
  onUpdate: (updatedName: string) => void;
  isLoading: boolean;
};

const EditTagModal = ({
  show,
  onClose,
  initialValue,
  onUpdate,
  isLoading,
}: EditTagModalProps) => {
  const [tagName, setTagName] = useState(initialValue);

  useEffect(() => {
    setTagName(initialValue);
  }, [initialValue]);
  return (
    <div>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        <DialogPanel className="max-w-lg relative z-10 bg-white rounded-2xl p-6 w-full border border-primary">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle as="h2" className="text-2xl/6 font-extrabold">
              Edit Tag
            </DialogTitle>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="p-0"
              onClick={onClose}
            />
          </div>

          <div>
            <Input
              placeholder="Tag Name"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              text="Cancel"
              onClick={onClose}
              className="px-5 border-primary border-0.5"
              backgroundColor="transparent"
            />
            <Button
              text={`${isLoading ? "Saving.." : "Save"}`}
              className="px-8 py-3"
              onClick={() => onUpdate(tagName)}
              disabled={isLoading}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default EditTagModal;
