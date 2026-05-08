import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface TimezoneDatePickerProps {
  value: string | null;
  onChange: (utcValue: string) => void;
  disabled?: boolean;
  publishMode?: string;
  error?: string;
  setError?: (error: string) => void;
}

const timezoneTabs = [
  { key: "default", label: "Default", value: dayjs.tz.guess() },
  { key: "india", label: "India", value: "Asia/Kolkata" },
  { key: "uk", label: "UK", value: "Europe/London" },
  { key: "utc", label: "UTC", value: "UTC" },
];

const TimezoneDatePicker = ({
  value,
  onChange,
  publishMode,
  error,
  setError,
}: TimezoneDatePickerProps) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [selectedTimezone, setSelectedTimezone] = useState(dayjs.tz.guess());
  const [selectedTab, setSelectedTab] = useState("default");
  const [localDateTime, setLocalDateTime] = useState<string>("");

  useEffect(() => {
    const selected = timezoneTabs.find((tab) => tab.key === selectedTab);
    if (!selected) return;

    setSelectedTimezone(selected.value);

    if (value) {
      const local = dayjs
        .utc(value)
        .tz(selected.value)
        .format("YYYY-MM-DDTHH:mm");
      setLocalDateTime(local);
    } else {
      const now = dayjs().tz(selected.value);
      const local = now.format("YYYY-MM-DDTHH:mm");
      setLocalDateTime(local);
      onChange(now.utc().format());
    }
  }, [selectedTab, value]);

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const local = e.target.value;
  //   const selectedDate = dayjs.tz(local, selectedTimezone);
  //   const now = dayjs().tz(selectedTimezone);

  //   let isValid = true;

  //   if (publishMode === "immediate" && selectedDate.isAfter(now)) {
  //     isValid = false;
  //     setError?.("For 'Immediate' mode, future dates are not allowed.");
  //   } else if (publishMode === "specifyDate" && selectedDate.isBefore(now)) {
  //     isValid = false;
  //     setError?.("For 'Specify Date' mode, past dates are not allowed.");
  //   } else {
  //     setError?.("");
  //   }

  //   if (isValid) {
  //     setLocalDateTime(local);
  //     const utcVal = selectedDate.utc().format();
  //     onChange(utcVal);
  //   }
  // };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const local = e.target.value;
    setLocalDateTime(local);

    const selectedDate = dayjs.tz(local, selectedTimezone);
    const now = dayjs().tz(selectedTimezone);

    const selectedMinute = selectedDate.startOf("minute");
    const currentMinute = now.startOf("minute");

    let isValid = true;

    // if (publishMode === "immediate" && selectedMinute.isAfter(currentMinute)) {
    //   isValid = false;
    //   setError?.("For 'Immediate' mode, future dates are not allowed.");
    // } else if (
    //   publishMode === "specifyDate" &&
    //   selectedMinute.isBefore(currentMinute)
    // ) {
    //   isValid = false;
    //   setError?.("For 'Specify Date' mode, past dates are not allowed.");
    // } else {
    //   setError?.("");
    // }
    if (publishMode === "immediate" && selectedMinute.isAfter(currentMinute)) {
      setError?.("For 'Immediate' mode, future dates are not allowed.");
      return;
    }

    if (isValid) {
      const utcVal = selectedDate.utc().format();
      onChange(utcVal);
    }
  };

  useEffect(() => {
    if (!localDateTime || !publishMode) return;

    const selectedDate = dayjs.tz(localDateTime, selectedTimezone);
    const now = dayjs().tz(selectedTimezone);

    // Round to minute precision for fair comparison
    const selectedMinute = selectedDate.startOf("minute");
    const currentMinute = now.startOf("minute");

    // if (publishMode === "immediate" && selectedMinute.isAfter(currentMinute)) {
    //   setError?.("For 'Immediate' mode, future dates are not allowed.");
    // } else if (
    //   publishMode === "specifyDate" &&
    //   selectedMinute.isBefore(currentMinute)
    // ) {
    //   setError?.("For 'Specify Date' mode, past dates are not allowed.");
    // } else {
    //   setError?.("");
    // }
    if (publishMode === "immediate" && selectedMinute.isAfter(currentMinute)) {
      setError?.("For 'Immediate' mode, future dates are not allowed.");
    } else {
      setError?.("");
    }
  }, [selectedTimezone]);

  const now = dayjs().tz(selectedTimezone);
  const min =
    publishMode === "specifyDate" ? now.format("YYYY-MM-DDTHH:mm") : undefined;
  // const min = undefined;
  const max =
    publishMode === "immediate" ? now.format("YYYY-MM-DDTHH:mm") : undefined;

  // const handleInputClick = () => {
  //   dateInputRef.current?.showPicker?.(); // open native date/time picker
  // };

  return (
    <>
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-3 gap-1 mb-4 justify-between">
        {timezoneTabs.map((tz) => (
          <button
            key={tz.key}
            onClick={() => setSelectedTab(tz.key)}
            className={`text-sm py-2 rounded-xl border ${
              selectedTab === tz.key
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {tz.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <input
          ref={dateInputRef}
          type="datetime-local"
          value={localDateTime}
          onChange={handleDateChange}
          min={min}
          max={max}
          disabled={publishMode == ""}
          className={`w-full md:p-3 p-2 md:text-base text-sm border-0.5 border-primary rounded-2xl ${
            publishMode == "" ? "cursor-not-allowed" : ""
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </>
  );
};

export default TimezoneDatePicker;
