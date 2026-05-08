import { useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";

type DateFormat = "ymd" | "mdy" | "dmy";

interface DatePickerFieldProps {
  value: string;
  onChange: (value: string) => void;
  validate?: (date: Date) => string | null;
  onInvalid?: (message: string | null) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  valueFormat?: DateFormat;
  displayFormat?: DateFormat;
  minDate?: Date;
}

const parseDate = (value: string | null | undefined, format: DateFormat) => {
  if (!value) return null;
  const parts = value.split("-");
  if (parts.length !== 3) return null;

  const [first, second, third] = parts.map(Number);
  const [year, month, day] =
    format === "ymd"
      ? [first, second, third]
      : format === "mdy"
        ? [third, first, second]
        : [third, second, first];

  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const formatDate = (date: Date, format: DateFormat) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  if (format === "ymd") return `${year}-${month}-${day}`;
  if (format === "mdy") return `${month}-${day}-${year}`;
  return `${day}-${month}-${year}`;
};

const getPrimeDateFormat = (format: DateFormat) =>
  format === "ymd" ? "yy-mm-dd" : format === "mdy" ? "mm-dd-yy" : "dd-mm-yy";

const getPlaceholder = (format: DateFormat) =>
  format === "ymd" ? "YYYY-MM-DD" : format === "mdy" ? "MM-DD-YYYY" : "DD-MM-YYYY";

const DatePickerField = ({
  value,
  onChange,
  validate,
  onInvalid,
  placeholder,
  className,
  inputClassName,
  disabled,
  valueFormat = "ymd",
  displayFormat = "dmy",
  minDate,
}: DatePickerFieldProps) => {
  const [draft, setDraft] = useState<Date | null>(
    parseDate(value, valueFormat),
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDraft(parseDate(value, valueFormat));
  }, [value, valueFormat]);

  const applyDate = (selectedDate: Date) => {
    const normalized = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
    );
    setDraft(normalized);

    const error = validate ? validate(normalized) : null;
    if (error) {
      onInvalid?.(error);
      return;
    }

    onInvalid?.(null);
    onChange(formatDate(normalized, valueFormat));
  };

  const clearDate = () => {
    setDraft(null);
    onInvalid?.(null);
    onChange("");
  };

  return (
    <Calendar
      value={draft}
      inputRef={inputRef}
      autoFocus={false}
      onHide={() => {
        inputRef.current?.blur();
      }}
      onChange={(e) => {
        if (!e.value || Array.isArray(e.value) || !(e.value instanceof Date)) {
          clearDate();
          return;
        }
        applyDate(e.value);
      }}
      onBlur={(e) => {
        const raw = e.target.value.trim();
        if (!raw) {
          clearDate();
          return;
        }

        const parsed =
          parseDate(raw, displayFormat) ?? parseDate(raw, valueFormat);
        if (!parsed) {
          onInvalid?.("Enter valid date.");
          return;
        }

        applyDate(parsed);
      }}
      dateFormat={getPrimeDateFormat(displayFormat)}
      placeholder={placeholder ?? getPlaceholder(displayFormat)}
      minDate={minDate}
      disabled={disabled}
      className={`simple-date-picker ${className ?? ""}`.trim()}
      inputClassName={`${inputClassName ?? ""}  shadow-none `}
      pt={{
        input: {
          inputMode: "numeric",
          pattern: "\\d{2}-\\d{2}-\\d{4}",
          onKeyDown: (e) => {
            const allowedKeys = [
              "Backspace",
              "Delete",
              "ArrowLeft",
              "ArrowRight",
              "Tab",
              "Home",
              "End",
            ];

            if (allowedKeys.includes(e.key)) return;

            if (!/^\d$/.test(e.key) && e.key !== "-") {
              e.preventDefault();
            }
          },
          onInput: (e) => {
            const raw = e.currentTarget.value;
            const sanitized = raw.replace(/[^\d-]/g, "").slice(0, 10);
            if (sanitized !== raw) {
              e.currentTarget.value = sanitized;
            }
          },
        },
      }}
    />
  );
};

export default DatePickerField;
