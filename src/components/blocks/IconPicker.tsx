// // components/IconPicker.tsx
// import React, { useState, useEffect, useRef } from "react";
// import { Icon } from "@iconify/react";

// interface IconPickerProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
//   const [search, setSearch] = useState("");
//   const [icons, setIcons] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showGrid, setShowGrid] = useState(false);

//   const wrapperRef = useRef<HTMLDivElement>(null);

//   // Close grid when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         wrapperRef.current &&
//         !wrapperRef.current.contains(event.target as Node)
//       ) {
//         setShowGrid(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Fetch icons dynamically
//   useEffect(() => {
//     if (!showGrid || !search.trim()) {
//       setIcons([]);
//       return;
//     }
//     const fetchIcons = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `https://api.iconify.design/search?query=${encodeURIComponent(
//             search
//           )}&limit=30`
//         );
//         const data = await res.json();
//         setIcons(data?.icons || []);
//       } catch (err) {
//         console.error(err);
//         setIcons([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const delay = setTimeout(fetchIcons, 300); // debounce
//     return () => clearTimeout(delay);
//   }, [search, showGrid]);

//   // Close preview when search is cleared
//   useEffect(() => {
//     if (!search.trim()) {
//       setShowGrid(false);
//       setIcons([]);
//       onChange("");
//     }
//   }, [search]);

//   return (
//     <div className="relative" ref={wrapperRef}>
//       {/* Search Input with selected icon preview */}
//       <div className="flex items-center gap-2 relative">
//         <input
//           type="text"
//           placeholder="Search icon..."
//           value={search}
//           onFocus={() => setShowGrid(true)}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border border-primary p-2 rounded-xl w-full"
//         />
//         {value && (
//           <span className="p-2 h-full border border-primary rounded-xl flex items-center justify-center">
//             <Icon icon={value} width={23} height={23} />
//           </span>
//         )}

//         {/* Absolute icon grid preview */}
//         {showGrid && search.trim() && (
//           <div className="absolute top-10 ml-3 bg-white border rounded-md shadow-lg p-2 w-64 max-h-64 overflow-y-auto z-50">
//             {loading ? (
//               <p className="text-gray-500 text-sm">Loading icons...</p>
//             ) : icons.length > 0 ? (
//               <div className="grid grid-cols-6 gap-2">
//                 {icons.map((iconName) => (
//                   <button
//                     key={iconName}
//                     type="button"
//                     onClick={() => {
//                       onChange(iconName);
//                       setShowGrid(false); // Close after selecting
//                     }}
//                     className={`flex items-center justify-center p-2 rounded-md border hover:bg-gray-100 ${
//                       value === iconName ? "border-blue-500" : "border-gray-200"
//                     }`}
//                   >
//                     <Icon icon={iconName} width={20} height={20} />
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm">No icons found</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import Input from "../ui/input/Input";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  onIconColorChange: (value: string) => void;
  iconColor?: string;
  className?: string;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  onIconColorChange,
  iconColor,
  className,
}) => {
  const [search, setSearch] = useState("");
  const [showGrid, setShowGrid] = useState(false);
  const [color, setColor] = useState<string>("#000000"); // default icon color black
  const wrapperRef = useRef<HTMLDivElement>(null);

  const colorInputRef = useRef<HTMLInputElement>(null);
  const iconNames = Object.keys(LucideIcons);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowGrid(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredIcons =
    iconNames.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const SelectedIcon = value ? (LucideIcons as any)[value] : null;

  function IconRenderer({
    iconName,
    color,
  }: {
    iconName: string;
    color?: string;
  }) {
    const IconComp = (LucideIcons as any)[iconName];
    if (!IconComp || typeof iconName !== "string") return null;
    return (
      <IconComp size={24} color={color} style={{ pointerEvents: "none" }} />
    );
  }

  const handleIconClick = (iconName: any) => {
    onChange(iconName);
    setShowGrid(false);
    setSearch("");
  };

  const handleColorChange = () => {
    onIconColorChange(color);
  };

  useEffect(() => {
    if (iconColor != "#000000") {
      setColor(iconColor as any);
    }
  }, [iconColor]);

  return (
    <div className={`${className} relative`}>
      <div
        className={`gap-2 ${
          SelectedIcon ? "flex items-end justify-between" : "block"
        }`}
      >
        <div className={`${SelectedIcon ? "flex-1" : ""}`}>
          <Input
            label="Button Icon"
            type="text"
            placeholder="Search icon..."
            value={search}
            onFocus={() => setShowGrid(true)}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!e.target.value) {
                onChange(""); // Clear selected icon
              }
            }}
          />
        </div>
        {SelectedIcon && (
          <>
            <div className="relative group cursor-pointer">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  colorInputRef.current?.click();
                }}
                className="p-2 h-full border border-primary rounded-xl flex items-center justify-center cursor-pointer"
                aria-label="Pick icon color"
              >
                <SelectedIcon size={24} color={color} />
              </button>
              <input
                ref={colorInputRef}
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                onBlur={handleColorChange}
                className="absolute opacity-0 -bottom-2"
                aria-label="Hidden icon color picker"
              />

              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setColor("#000000");
                  setSearch("");
                }}
                className="absolute -top-1 -right-1 text-red-600 bg-white hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove selected icon"
              >
                <LucideIcons.X size={16} />
              </button>
            </div>
          </>
        )}
      </div>
      {/* Icon grid */}
      {showGrid && search.length >= 3 && (
        <div
          ref={wrapperRef}
          className="absolute top-16 right-12 bg-white border rounded-md shadow-lg p-2 w-64 max-h-64 overflow-y-auto z-50"
        >
          {/* <div className="grid grid-cols-6 gap-2"> */}
          {filteredIcons.length > 0 ? (
            <div className="grid grid-cols-6 gap-2">
              {filteredIcons.map((iconName) => {
                const IconComp = (LucideIcons as any)[iconName];
                if (IconComp && typeof iconName === "string") {
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIconClick(iconName);
                      }}
                      className={`flex items-center justify-center p-2 rounded-md border hover:bg-gray-100 ${
                        value === iconName
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <IconRenderer iconName={iconName} color={color} />
                    </button>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No icons found</p>
          )}
        </div>
      )}
    </div>
  );
};
