import { useEffect, useState } from "react";
// import { correctIcon } from "../../icons";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import TimezoneDatePicker from "../ui/timezoneDatePicker/TimeZoneDatePicker";
import { showToast } from "../../utils/toastUtils";
import dayjs from "dayjs";
// import { showToast } from "../../utils/toastUtils";

type PublishProps = {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave?: (payload: {
    platforms: string[];
    status: string;
    dateTime: string;
  }) => void;
};

const Publish = ({ open, onClose, data, onSave }: PublishProps) => {
  const initialRequirements = [
    { id: 1, label: "Publish to web", value: "web", checked: false },
    { id: 2, label: "Publish to app", value: "app", checked: false },
  ];
  const [requirements, setRequirements] = useState(initialRequirements);
  const [publishMode, setPublishMode] = useState<
    "immediate" | "specifyDate" | string
  >("immediate");
  const [error, setError] = useState<string>("");

  // const [startDate, setStartDate] = useState<null | string>(null);
  // const [endTime, setEndTime] = useState<null | string>(null);
  // const dateInputRef = useRef<HTMLInputElement>(null);
  const [utcDate, setUtcDate] = useState<string>("");

  // const toggleCheckbox = (id: number) => {
  //   setRequirements((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, checked: !item.checked } : item
  //     )
  //   );
  // };

  // const handleIconClick = () => {
  //   if (publishMode === "specifyDate") {
  //     dateInputRef.current?.showPicker?.(); // ✅ Modern browsers
  //     dateInputRef.current?.focus(); // fallback
  //   }
  // };

  const handlePublishMode = (mode: string) => {
    setPublishMode(mode);
    const currentUtc = dayjs().utc().format();
    setUtcDate(currentUtc);
    setError("");
  };

  const handleSubmit = () => {
    const data = {
      mode: publishMode,
      // startDate,
      // endTime,
      platforms: requirements?.filter((r) => r.checked).map((r) => r.value),
    };
    const platforms = data.platforms;
    const status = publishMode === "immediate" ? "published" : "scheduled";
    let dateTime: string;
    // if (publishMode === "immediate") {
    //   dateTime = new Date().toISOString();
    // } else {
    //   const datePart = startDate;
    //   const timePart = endTime || "00:00";
    //   dateTime = new Date(`${datePart}T${timePart}:00Z`).toISOString();
    // }
    dateTime = utcDate;
    if (error) {
      showToast("Please Select Valid Date or Time", "error");
      return;
    }
    onSave?.({ platforms, status, dateTime });
    // showToast(
    //   `Your content has been ${
    //     publishMode === "immediate" ? "published" : "scheduled"
    //   } successfully.`,
    //   "success"
    // );
    onClose();
  };

  useEffect(() => {
    if (data) {
      if (data.status === "published") {
        setPublishMode("immediate");
        setUtcDate(data.published_at);
      } else if (data.status === "scheduled" && data.scheduled_at) {
        setPublishMode("specifyDate");
        setUtcDate(data.scheduled_at);

        // const iso = new Date(data.scheduled_at);
        // const dateStr = iso.toISOString().split("T")[0];
        // const timeStr = iso.toISOString().split("T")[1].slice(0, 5);
        // setStartDate(dateStr);
        // setEndTime(timeStr);
      }
      if (
        Array.isArray(data?.publish_platforms) &&
        data.publish_platforms.length > 0
      ) {
        setRequirements((prev) =>
          prev.map((item) => ({
            ...item,
            checked: data.publish_platforms.includes(item.value),
          })),
        );
      }

      // if (data?.publish_platforms.length > 0) {
      //   setRequirements((prev) =>
      //     prev.map((item) => ({
      //       ...item,
      //       checked: data?.publish_platforms.includes(item.value),
      //     }))
      //   );
      // }
    }
  }, [data]);

  return (
    <>
      <SidebarDialog
        open={open}
        onClose={onClose}
        title="Publish"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="flex flex-col md:gap-4 gap-2 md:mb-6 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="permission"
                value="specifyDate"
                className="hover:bg-gray-300 h-4 w-4"
                style={{ accentColor: "#000000" }}
                required
                checked={publishMode === "specifyDate"}
                onChange={() => handlePublishMode("specifyDate")}
              />
              <span className="md:text-base/4 text-sm ">
                Specify date and time
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="permission"
                value="immediate"
                style={{ accentColor: "#000000" }}
                className="hover:bg-gray-300 h-4 w-4"
                required
                checked={publishMode === "immediate"}
                onChange={() => handlePublishMode("immediate")}
              />
              <span className="md:text-base/4 text-sm ">
                Publish immediately
              </span>
            </label>
          </div>

          <div className="md:mb-5 mb-2">
            <TimezoneDatePicker
              value={utcDate}
              onChange={(utcVal) => {
                setUtcDate(utcVal);
              }}
              disabled={publishMode !== "specifyDate"}
              publishMode={publishMode}
              error={error}
              setError={setError}
            />
          </div>
          {/* <div className="md:mb-5 mb-2 relative">
            <input
              ref={dateInputRef}
              type="date"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={publishMode !== "specifyDate"}
              className={`w-full md:p-3 p-2 pr-12 md:text-base z-20 text-sm border-0.5 border-primary rounded-2xl  ${
                publishMode !== "specifyDate"
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }`}
            />
            <img
              src={calenderIcon}
              alt="calendar"
              className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 "
              onClick={handleIconClick}
            />
          </div> */}

          {/* <div className="md:mb-10 mb-5">
            <label
              htmlFor="endTIme"
              className="block mb-2 md:text-base/4 text-sm"
            >
              End Time
            </label>
            <div className="relative">
              <input
                type="time"
                id="endTime"
                value={endTime || ""}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={publishMode !== "specifyDate"}
                className={`w-full md:p-3 p-2 md:text-base text-sm border-0.5 border-primary rounded-2xl appearance-none ${
                  publishMode !== "specifyDate"
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>
          </div> */}

          {/* <div>
            <h3 className="md:text-2xl/6 tetx-base font-extrabold mb-4">
              Platforms
            </h3>
            <div className="flex flex-col gap-2">
              {requirements.map((item) => (
                <div key={item.id} className="flex items-center gap-sp6">
                  <input
                    type="checkbox"
                    id={`req-${item.id}`}
                    className="peer hidden"
                    checked={item.checked}
                    onChange={() => toggleCheckbox(item.id)}
                  />
                  <label
                    htmlFor={`req-${item.id}`}
                    className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
                  peer-checked:bg-black peer-checked:border-black"
                  >
                    <img src={correctIcon} alt="Right" />
                  </label>
                  <label
                    htmlFor={`req-${item.id}`}
                    className="md:text-base/4 text-sm"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </SidebarDialog>
    </>
  );
};

export default Publish;
