import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { capitalize, typeDisplayMap } from "../../config/function";
import Input from "../ui/input/Input";
import Button from "../ui/button";
import { chevronDown } from "../../icons";
// import { chevronDown } from "../../icons";

interface OptionType {
  value: any;
  label: string;
}

interface BlockSettingsProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  index: number;
  block: any;
  onChangeBlock?: any;
  radiusOptions?: OptionType[];
  blur?: OptionType[];
  filterOptions?: OptionType[];
  herobannerOptions?: OptionType[];
  backgroundOptions?: OptionType[];
  backgroundpatternOptions?: OptionType[];
  customStyles?: any;
  dispatch: (action: any) => void;
}

const BlockSettings: React.FC<BlockSettingsProps> = ({
  isOpen,
  setIsOpen,
  index,
  block,
  onChangeBlock,
}) => {
  const [localTitle, setLocalTitle] = useState<string>("");
  const [localSubTitle, setLocalSubTitle] = useState<string>("");
  const [localBackground, setLocalBackground] = useState<string>("");
  const [localTextColor, setLocalTextColor] = useState<string>("");
  const [localBorder, setLocalBorder] = useState<string>("");
  const [cornerRadius, setCornerRadius] = useState<string>("");
  const [blur, setBlur] = useState<string>("");
  const [container, setContainer] = useState<string>("");

  const getDisplayName = (type: string) => {
    return typeDisplayMap[type.toLowerCase()] || capitalize(type);
  };

  // when modal opens, copy current values
  useEffect(() => {
    if (isOpen && block?.block_schema) {
      setLocalTitle(block.block_schema.title || "");
      setLocalSubTitle(block.block_schema.sub_title || "");
      setLocalBackground(block.block_schema.background_color || "");
      setCornerRadius(block.block_schema.border_radius || "");
      setBlur(block.block_schema.blur || "");
      setContainer(block.block_schema.container || "");
      setLocalTextColor(block.block_schema.text_color || "");
      setLocalBorder(block.block_schema.border || "");
    }
  }, [isOpen, block]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedContent = { ...block };
    let colorStart = null;
    let colorCenter = null;
    let colorEnd = null;
    if (localBackground === "white" || localBackground === "#ffffff") {
      colorStart = "#FFFFFF";
      colorCenter = "#FFFFFF";
      colorEnd = "#FFFFFF";
    } else if (localBackground === "transparent") {
      colorStart = null;
      colorCenter = null;
      colorEnd = null;
    } else if (localBackground == "gradient") {
      colorStart = "#000000";
      colorCenter = "#8D8D8D";
      colorEnd = "#FFFFFF";
    }

    // updatedContent.block_schema = {
    //   title: localTitle,
    //   subTitle: localSubTitle,
    //   backgroundColor: localBackground,
    //   corderRadius: cornerRadius,
    //   textColor: localTextColor,
    //   colorStart: colorStart,
    //   colorCenter: colorCenter,
    //   colorEnd: colorEnd,
    // };
    updatedContent.block_schema = {
      title: localTitle,
      sub_title: localSubTitle,
      background_color: localBackground,
      border_radius: cornerRadius,
      blur: blur,
      container: container,
      text_color: localTextColor,
      border: localBorder,
      color_start: colorStart,
      color_center: colorCenter,
      color_end: colorEnd,
    };

    onChangeBlock?.(updatedContent, index);
    setIsOpen(false);
  };

  const handleBackgroundChange = (value: string) => {
    setLocalBackground(value || "");
  };

  const handleCornerRadiusChange = (value: string) => {
    setCornerRadius(value || "");
  };
  const handleBlurChange = (value: string) => {
    setBlur(value || "");
  };
  const handleContainerChange = (value: string) => {
    setContainer(value || "");
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/40 p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {getDisplayName(block.block_type)} Settings
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-x-4">
            <Input
              label="Block Title"
              placeholder="Enter Block Title"
              value={localTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocalTitle(e.target.value)
              }
            />
            <Input
              label="Sub Title"
              placeholder="Enter Block Sub Title"
              value={localSubTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocalSubTitle(e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium md:text-base/4 text-sm">
                Text Color
              </label>
              <div className="relative ">
                <select
                  id="background"
                  value={localTextColor}
                  onChange={(e) => setLocalTextColor(e.target.value)}
                  className="appearance-none w-full md:p-2 p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="#ffffff">White</option>
                  <option value="#000000">Black</option>
                </select>
                <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                  <img src={chevronDown} />
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium md:text-base/4 text-sm">
                Background Color
              </label>
              <div className="relative ">
                <select
                  id="background"
                  value={localBackground}
                  onChange={(e) => handleBackgroundChange(e.target.value)}
                  className="appearance-none w-full md:p-2 p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="#ffffff">White</option>
                  <option value="transparent">Clear</option>
                  <option value="gradient">Gradient</option>
                </select>
                <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                  <img src={chevronDown} />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div>
              <label className="block mb-2 font-medium md:text-base/4 text-sm">
                Border
              </label>
              <div className="relative">
                <select
                  id="background"
                  value={localBorder}
                  onChange={(e) => setLocalBorder(e.target.value)}
                  className="appearance-none w-full md:p-2 p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                  <img src={chevronDown} />
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium md:text-base/4 text-sm">
                Corner Radius
              </label>
              <div className="relative mb-3">
                <select
                  id="radius"
                  value={cornerRadius}
                  onChange={(e) => handleCornerRadiusChange(e.target.value)}
                  className="appearance-none w-full md:p-2 p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="none">None</option>
                  <option value="full">Full</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
                <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                  <img src={chevronDown} />
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium md:text-base/4 text-sm">
                Blur
              </label>
              <div className="relative mb-3">
                <select
                  id="Blur"
                  value={blur}
                  onChange={(e) => handleBlurChange(e.target.value)}
                  className="appearance-none w-full md:p-2 p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="none">None</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
                <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                  <img src={chevronDown} />
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium md:text-base/4 text-sm ">
                Container Width
              </label>
              <div className="relative mb-3">
                <select
                  id="container"
                  value={container}
                  onChange={(e) => handleContainerChange(e.target.value)}
                  className="appearance-none w-full md:p-2 p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="container">Container</option>
                  <option value="container_fluid"> Container-Fluid </option>
                  <option value="none">None</option>
                </select>
                <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                  <img src={chevronDown} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">
          <Button
            text="Cancel"
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
            backgroundColor="transparent"
          />
          <Button
            text="Save"
            onClick={handleSave}
            className={`lg:py-3 py-sp10 px-10 lg:text-base/4 text-sm font-semibold`}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlockSettings;
