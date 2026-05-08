import { cn } from "../../../utils/cn";

type ToggleSwitchProps = {
  checked: boolean | undefined;
  onChange?: (checked: boolean) => void;
  label?: string;
  labelPosition?: "left" | "right";
  disabled?: boolean;
  className?: string;
  id?: string;
  onClick?: () => void;
};

const ToggleSwitch = ({
  checked,
  onChange,
  label,
  labelPosition = "left",
  disabled,
  className,
  onClick,
  id,
}: ToggleSwitchProps) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center lg:gap-3 gap-1",
        labelPosition === "right" ? "flex-row-reverse justify-end" : "",
        className
      )}
      onClick={onClick}
    >
      {label && (
        <label
          htmlFor={id}
          className="md:text-base/4 text-sm font-semibold text-black"
        >
          {label}
        </label>
      )}

      <div
        id={id}
        className={`relative z-[9] inline-flex items-center cursor-pointer ${
          disabled ? "opacity-50 !cursor-not-allowed" : ""
        }`}
        onClick={handleToggle}
      >
        {/* Background track */}
        <div
          className={`w-11 h-6 rounded-full bg-gray-300 transition-colors ${
            checked ? "bg-primary" : "bg-gray-300"
          }`}
        />
        {/* Switch thumb */}
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-black rounded-full transition-transform ${
            checked ? "transform translate-x-5" : "transform translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
