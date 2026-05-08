import { useEffect, useRef, useState } from "react";
import Button from "../ui/button";
import { loaderIcon } from "../../icons";
import type { BlockTypeProps } from "./changeBlockTypes";

const ChangeBlockType = ({
  currentBlock,
  onChangeType,
  types,
}: BlockTypeProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropDownContentRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (open && dropDownContentRef.current) {
      dropDownContentRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative block" ref={dropdownRef}>
      <Button
        text="Replace Section"
        backgroundColor="transparent"
        className="p-0"
        onClick={() => handleOpen()}
        icon={loaderIcon}
      />

      {open && (
        <div
          ref={dropDownContentRef}
          tabIndex={-1}
          className="absolute z-40 p-3 mt-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 bg-white border border-gray-200 rounded-2xl shadow-lg  w-max transform transition-all duration-200 origin-top"
        >
          {types.length > 0 &&
            types.map((item, index) => (
              <Button
                text={item.label}
                icon={item.icon}
                key={index}
                backgroundColor="transparent"
                className={`w-full justify-start px-4 py-2 hover:bg-gray-100 text-left ${
                  item.type === currentBlock.block_type
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100"
                }`}
                onClick={() => {
                  onChangeType(item.type);
                  setOpen(false);
                }}
                disabled={item.type === currentBlock.block_type}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ChangeBlockType;
