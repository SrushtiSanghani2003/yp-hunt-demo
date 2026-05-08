import {
  useEffect,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from "react";
import { closeIcon, magnifyIcon } from "../../../icons";
import { cn } from "../../../utils/cn";

type SearchInputProps = {
  placeholder?: string;
  searchWidth?: string;
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  onClear?: () => void;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

const SearchInput = ({
  placeholder,
  searchWidth,
  value,
  onChange,
  onEnter,
  onClear,
  className,
  ...inputProps
}: SearchInputProps) => {
  const [internalValue, setInternalValue] = useState("");

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  const handleClear = () => {
    setInternalValue("");
    onChange?.("");
    onClear?.();
  };

  return (
    <div className={cn("relative", searchWidth)}>
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          " focus-within:outline-none rounded-2xl w-full border bg-white border-primary  placeholder:text-black placeholder:text-xs",
          className,
        )}
        value={internalValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...inputProps}
      />

      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {internalValue ? (
          <button onClick={handleClear}>
            <img src={closeIcon} alt="clear" className="w-4 h-4" />
          </button>
        ) : (
          <img
            src={magnifyIcon}
            alt="search"
            className="w-4 h-4 pointer-events-none"
          />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
