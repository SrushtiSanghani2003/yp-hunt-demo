import React from "react";
import { cn } from "../../../utils/cn";
import { InfoIcon } from "lucide-react";

type InputProps = {
  label?: string;
  inputType?: string;
  labelCss?: string;
  placeholder?: string;
  note?: string;
  bgColor?: string;
  className?: string;
  infoTooltip?: string;
  inputCss?: string;
  error?:string
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      inputType = "text",
      labelCss,
      inputCss,
      placeholder,
      note,
      bgColor = "white", // default color
      id = "input",
      className,
      infoTooltip,
      error,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={cn("md:mb-0 mb-2", className)}>
        <div className="flex items-center gap-2 md:mb-2 mb-1">
          <label
            className={cn(
              "block  font-medium md:text-base/4 text-sm",
              labelCss,
            )}
          >
            {label?.includes("*") ? (
              <>
                {label.replace("*", "")}
                <sup>*</sup>
              </>
            ) : (
              label
            )}
          </label>
          {infoTooltip && (
            <div className="relative group">
              <InfoIcon size={15} className="cursor-pointer text-gray-600" />
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded-md px-2 py-1 whitespace-nowrap z-10">
                {infoTooltip}
              </div>
            </div>
          )}
        </div>
        {note && (
          <p className="md:block hidden text-sm font-light mb-2">{note}</p>
        )}
        <input
          type={inputType}
          ref={ref}
          placeholder={placeholder}
          className={cn(
            `w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl placeholder:font-normal rounded-lg md:pr-10 bg-${bgColor} ${inputCss}`,
          )}
          {...rest}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input"; // ✅ Required for forwardRef components in dev tools

export default Input;
