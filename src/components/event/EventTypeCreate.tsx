import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";
import { closeIcon } from "../../icons";
import Input from "../ui/input/Input";
import { useEffect, useState } from "react";

type CreateEventType = {
  show: boolean;
  onClose: () => void;
  onCreate?: (payload: {
    code: string;
    translation: {
      language_code: string;
      name: string;
      description: string;
    };
  }) => void;
  onUpdate?: (payload: any) => void;
  isLoading: boolean;
  editData: any;
};

const EventTypeCreate = ({
  show,
  onClose,
  onCreate,
  onUpdate,
  isLoading,
  editData,
}: CreateEventType) => {
  const [description, SetDescription] = useState<string>("");
  const [eventTypeTitle, setEventTypeTitle] = useState("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");

  useEffect(() => {
    if (editData) {
      setEventTypeTitle(editData.name);
      setBackgroundColor(editData.code);
      SetDescription(editData.description);
    } else {
      setEventTypeTitle("");
      SetDescription("");
      setBackgroundColor("#000000");
    }
  }, [editData, show]);

  const handleSubmit = () => {
    const payload: any = {
      code: backgroundColor,
      translation: {
        language_code: "en",
        name: eventTypeTitle,
        description: description,
      },
    };
    if (editData && onUpdate) {
      onUpdate(payload);
    } else {
      onCreate?.(payload);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        <DialogPanel className="max-w-4xl relative z-10 bg-white rounded-2xl p-6 w-full border border-primary">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle as="h2" className="text-2xl/6 font-extrabold">
              {editData ? "Edit Event Type" : "Add Event Type"}
            </DialogTitle>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="p-0"
              onClick={onClose}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1">
            <Input
              label="Event Type Title"
              placeholder="Enter event type title"
              labelCss="md:mb-3"
              className="flex flex-col justify-end"
              value={eventTypeTitle}
              onChange={(e) => setEventTypeTitle(e.target.value)}
            />
            <div>
              <label className="block text-black text-base mb-1">
                Background Color*
              </label>
              <div className="flex items-end rounded-xl gap-2">
                <input
                  type="color"
                  name="background_colour"
                  value={backgroundColor}
                  onChange={handleColorChange}
                  className="w-11 h-11 bg-transparent "
                />
                <input
                  type="text"
                  name="background_colour"
                  placeholder="Enter background_colour hex code (e.g., #FF5733)"
                  value={backgroundColor}
                  onChange={handleColorChange}
                  className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl placeholder:font-normal rounded-lg md:pr-10 bg-undefined undefined"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-black text-base mb-1">
                Event Type Description
              </label>
              <textarea
                name="event_type_description"
                id="event_type_description"
                placeholder="Enter event type description"
                value={description}
                onChange={(e) => SetDescription(e.target.value)}
                className="w-full min-h-20 border border-primary rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-transparent transition"
              />
            </div>
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
              onClick={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default EventTypeCreate;
