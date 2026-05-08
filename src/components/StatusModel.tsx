import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "./ui/button";
// import { correctIcon } from "../icons";
import { useEffect, useState } from "react";
interface StatusModelProps {
  show: boolean;
  onClose: () => void;
  data?: any;
  onSave: (payload: any) => void;
  selectedStatus: string;
  isLoading: boolean;
}
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import TimezoneDatePicker from "./ui/timezoneDatePicker/TimeZoneDatePicker";
import { showToast } from "../utils/toastUtils";

const StatusModel = ({
  show,
  onClose,
  data,
  onSave,
  selectedStatus,
  isLoading,
}: StatusModelProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const initialRequirements = [
    { id: 1, label: "Publish to web", value: "web", checked: false },
    { id: 2, label: "Publish to app", value: "app", checked: false },
  ];
  const [_requirements, setRequirements] = useState(initialRequirements);
  // const [startDate, setStartDate] = useState<null | string>(null);
  // const dateInputRef = useRef<HTMLInputElement>(null);
  const [publishMode, setPublishMode] = useState<
    "immediate" | "specifyDate" | string
  >("");
  // const [selectedTimezone, setSelectedTimezone] = useState(dayjs.tz.guess());
  const [utcDate, setUtcDate] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  // const [selectedTab, setSelectedTab] = useState("");

  // const toggleCheckbox = (id: number) => {
  //   setRequirements((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, checked: !item.checked } : item
  //     )
  //   );
  // };

  // const timezoneTabs = [
  //   { key: "default", label: "Default", value: dayjs.tz.guess() },
  //   { key: "india", label: "India", value: "Asia/Kolkata" },
  //   { key: "uk", label: "UK", value: "Europe/London" },
  //   { key: "utc", label: "UTC", value: "UTC" },
  // ];

  // const handleIconClick = () => {
  //   if (publishMode === "specifyDate" && dateInputRef.current) {
  //     dateInputRef.current.showPicker(); // Trigger the date picker
  //   }
  // };

  const handleSave = async () => {
    // const publishRequirements = requirements
    //   .filter((r) => r.checked)
    //   .map((r) => r.value);
    const status = publishMode === "immediate" ? "published" : "scheduled";
    const payload: any = {
      status: status,
      // publish_platforms: publishRequirements,
    };
    if (status == "published") {
      payload.published_at = utcDate;
    } else if (status == "scheduled") {
      payload.scheduled_at = utcDate;
    }
    if (error) {
      showToast("Please Select Valid Date or Time", "error");
      return;
    }
    onSave(payload);
  };

  useEffect(() => {
    if (data) {
      // if (data.status === "published") {
      //   setPublishMode("immediate");
      // } else if (data.status === "scheduled" && data.scheduled_at) {
      //   setPublishMode("specifyDate");

      //   const iso = new Date(data.scheduled_at);
      //   const dateStr = iso.toISOString().split("T")[0];

      //   setStartDate(dateStr);
      // }

      if (data.publish_platforms && data.publish_platforms.length > 0) {
        setRequirements((prev) =>
          prev.map((item) => ({
            ...item,
            checked: data.publish_platforms.includes(item.value),
          }))
        );
      }
    }
  }, [data]);

  useEffect(() => {
    if (selectedStatus === "Published") {
      setPublishMode("immediate");
      // setSelectedTab("default");
    } else {
      setPublishMode("specifyDate");
      // setSelectedTab("default");
      // if (data.scheduled_at) {
      // const iso = new Date(data?.scheduled_at);
      // const dateStr = iso.toISOString().split("T")[0];
      // setStartDate(dateStr);
      // }
    }
  }, [selectedStatus]);

  // useEffect(() => {
  //   if (utcDate) {
  //     const newLocal = dayjs
  //       .utc(utcDate)
  //       .tz(selectedTimezone)
  //       .format("YYYY-MM-DDTHH:mm");
  //     setStartDate(newLocal);
  //   }
  // }, [selectedTimezone]);

  // useEffect(() => {
  //   const selected = timezoneTabs.find((tab) => tab.key === selectedTab);
  //   if (!selected) return;

  //   setSelectedTimezone(selected.value);

  //   // If Default tab, set current time
  //   if (selected.key === "default") {
  //     const now = dayjs().tz(selected.value);
  //     setStartDate(now.format("YYYY-MM-DDTHH:mm"));
  //     setUtcDate(now.utc().format());
  //   }
  // }, [selectedTab]);

  return (
    <>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        <DialogPanel className="relative z-10 bg-white rounded-2xl md:p-6 p-3 max-w-xl w-full border border-primary">
          <DialogTitle as="h2" className="text-2xl font-extrabold mb-4">
            {selectedStatus === "Published" ? "Published At" : "Scheduled At"}
          </DialogTitle>
          <div className="md:mb-4 mb-2">
            <TimezoneDatePicker
              value={utcDate}
              onChange={(utcVal) => {
                setUtcDate(utcVal);
              }}
              publishMode={publishMode}
              // disabled={publishMode !== "specifyDate"}
              error={error}
              setError={setError}
            />
          </div>
          <div>
            {/* <div className="grid md:grid-cols-4 grid-cols-2 md:gap-3 gap-1 mb-4 justify-between">
              {timezoneTabs.map((tz) => (
                <button
                  key={tz.key}
                  onClick={() => setSelectedTab(tz.key)}
                  className={`text-sm md:px-10 px-5 py-2 rounded-xl border ${
                    selectedTab === tz.key
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  {tz.label}
                </button>
              ))}
            </div>
            <div className="md:mb-5 mb-2 relative">
              <input
                ref={dateInputRef}
                type="datetime-local"
                value={startDate || ""}
                onChange={(e) => {
                  const local = e.target.value; // e.g., "2025-07-02T15:00"
                  setStartDate(local);
                  // Convert to UTC and store it
                  const utc = dayjs.tz(local, selectedTimezone).utc().format();
                  setUtcDate(utc);
                }}
                disabled={publishMode !== "specifyDate"}
                className={`w-full md:p-3 p-2  md:text-base text-sm border-0.5 border-primary rounded-2xl  ${
                  publishMode !== "specifyDate"
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
              />
            </div> */}

            {/* <div>
              <h3 className="md:text-base/4 text-sm  font-extrabold mb-4">
                Platforms
              </h3>
              <div className="flex  gap-7">
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
          <div className="mt-6 flex gap-4 justify-end">
            <Button
              text="Cancel"
              onClick={onClose}
              className="w-28 h-10 bg-transparent border"
            />
            <Button
              text={isLoading ? "Saving..." : "Save"}
              className="w-28 h-10"
              onClick={handleSave}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default StatusModel;
