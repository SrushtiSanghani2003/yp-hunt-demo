interface TextareaFieldProps {
  label: string;
  value?: string | null;
  placeholder?: string;
  rows?: number;
  onChange: (value: string | null) => void;
  className?: string;
  textareaClassName?: string;
}

const TextareaField = ({
  label,
  value,
  placeholder = "",
  rows = 3,
  onChange,
  className = "",
  textareaClassName = "",
}: TextareaFieldProps) => {
  return (
    <div className={className}>
      <label className="block md:text-base text-sm mb-1 font-medium">
        {label}
      </label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value.trim() === "" ? null : e.target.value)
        }
        className={`w-full p-3 text-base  border-0.5 border-primary  rounded-2xl resize-none  ${textareaClassName}`}
      />
    </div>
  );
};

export default TextareaField;
