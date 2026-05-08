import { useEffect, useState } from "react";
import { chevronDown } from "../../icons";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";

const ReadTime = ({
  open,
  onClose,
  data,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave?: (time: number) => void;
}) => {
  const [time, setTime] = useState(0);
  const handleSubmit = () => {
    onSave?.(time);
    onClose();
  };

  useEffect(() => {
    if (data) {
      setTime(data?.read_time);
    }
  }, [data]);

  return (
    <SidebarDialog
      title="Read Time (Minutes)"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="relative w-full">
        <input
          type="number"
          className="w-full md:p-3 p-2 text-base border-0.5 border-primary md:rounded-2xl rounded-lg pr-10"
          placeholder="e.g.4"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center md:gap-1 gap-0">
          <button
            type="button"
            className="p-1 hover:bg-gray-100 rounded"
            onClick={() => {
              const input = document.querySelector(
                "input[type='number']"
              ) as HTMLInputElement;
              input.stepUp();
              input.dispatchEvent(new Event("input", { bubbles: true }));
            }}
          >
            <img src={chevronDown} className="rotate-180" />
          </button>
          <button
            type="button"
            className=" hover:bg-gray-100 rounded"
            onClick={() => {
              const input = document.querySelector(
                "input[type='number']"
              ) as HTMLInputElement;
              input.stepDown();
              input.dispatchEvent(new Event("input", { bubbles: true }));
            }}
          >
            <img src={chevronDown} />
          </button>
        </div>
      </div>
    </SidebarDialog>
  );
};

export default ReadTime;
