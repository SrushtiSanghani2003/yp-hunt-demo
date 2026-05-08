import { useEffect, useRef, useState } from "react";
// import Button from "../ui/button";
// import { moreVerticalIcon } from "../../icons";
import { imageDropDownItems } from "../heroMedia/tabs";
import { moreDefaultObjects, type MoreObjectTypes } from "./blocksObjectConfig";

type Props = {
  currentBlock: any;
  moreFields: string[];
  setMoreFields: any;
  onChangeBlock: any;
  contentKey?: string;
  activeIndex?: any;
  fieldsToShow?: any;
};

const MoreFieldsEditor = ({
  currentBlock,
  moreFields,
  setMoreFields,
  onChangeBlock,
  contentKey,
  activeIndex,
  fieldsToShow,
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropDownItemRef = useRef<HTMLDivElement>(null);
  // const toggleDropdown = () => {
  //   setShowDropdown((prev) => !prev);
  // };

  // const handleAddField = (type: keyof MoreObjectTypes) => {
  //   if (!moreFields.includes(type)) {
  //     setMoreFields((prev: any) => [...prev, type]);

  //     onChangeBlock?.({
  //       ...currentBlock,
  //       content: {
  //         ...currentBlock.content,
  //         more: {
  //           ...currentBlock.content?.more,
  //           [type]: moreDefaultObjects[type],
  //         },
  //       },
  //     });
  //   }

  //   setShowDropdown(false);
  // };

  // const handleAddField = (type: keyof MoreObjectTypes) => {
  //   // Prevent adding if already exists
  //   if (!Array.isArray(moreFields) || moreFields.includes(type)) return;

  //   // Add to UI tracking
  //   setMoreFields((prev: any) => [...prev, type]);

  //   const updatedBlock = { ...currentBlock };
  //   const content = { ...updatedBlock.content };

  //   if (activeIndex === null || !contentKey) {
  //     // Global more
  //     const more = { ...(content.more || {}) };

  //     more[type] = moreDefaultObjects[type];

  //     updatedBlock.content = {
  //       ...content,
  //       more,
  //     };
  //   } else {
  //     // Nested content (e.g., quotes[0].more)
  //     const items = [...(content[contentKey] || [])];
  //     const item = { ...items[activeIndex] };

  //     if (!item.more) item.more = {};
  //     item.more[type] = moreDefaultObjects[type];
  //     items[activeIndex] = item;

  //     updatedBlock.content = {
  //       ...content,
  //       [contentKey]: items,
  //     };
  //   }

  //   onChangeBlock?.(updatedBlock);
  //   setShowDropdown(false);
  // };

  const handleAddField = (type: keyof MoreObjectTypes) => {
    const isNested = activeIndex !== null && contentKey;
    if (!Array.isArray(moreFields) || moreFields.includes(type)) return;

    if (isNested) {
      setMoreFields((prev: any) => ({
        ...prev,
        [activeIndex!]: [...(prev[activeIndex!] || []), type],
      }));
    } else {
      setMoreFields((prev: any) => [...prev, type]);
    }

    // Deep clone currentBlock
    const updatedBlock = structuredClone(currentBlock);

    const content = updatedBlock.content || {};

    if (activeIndex === null || !contentKey) {
      // Top-level "more"
      if (!content.more) content.more = {};
      content.more[type] = moreDefaultObjects[type];
    } else {
      // Nested more (e.g., quotes[0].more)
      const items = Array.isArray(content[contentKey])
        ? [...content[contentKey]]
        : [];
      const item = { ...(items[activeIndex] || {}) };

      if (!item.more) item.more = {};
      item.more[type] = moreDefaultObjects[type];
      items[activeIndex] = item;
      content[contentKey] = items;
    }

    updatedBlock.content = content;
    onChangeBlock?.(updatedBlock);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showDropdown && dropDownItemRef.current) {
      dropDownItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showDropdown]);

  const safeMoreFields = Array.isArray(moreFields) ? moreFields : [];

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* <Button
          backgroundColor="transparent"
          icon={moreVerticalIcon}
          text="Advanced"
          onClick={toggleDropdown}
          className="p-0"
        /> */}
        <div
          ref={dropDownItemRef}
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          className={`absolute bg-white border border-gray-300 shadow-lg rounded-2xl p-3 mt-2 w-48 z-10
              transition-all duration-200 ease-out
              transform origin-top
              ${
                showDropdown
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-2 pointer-events-none"
              }
            `}
        >
          {imageDropDownItems
            .filter((item) => {
              return !fieldsToShow?.length || fieldsToShow.includes(item.value);
            })
            .map((item) => {
              const isDisabled = safeMoreFields.includes(item.value);
              return (
                <div
                  key={item.value}
                  className={`flex p-1 rounded-2xl items-center gap-2 my-1  ${
                    isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={() =>
                    !isDisabled && handleAddField(item.value as any)
                  }
                >
                  <img
                    src={item.icon}
                    className={`${isDisabled ? "opacity-50" : ""}`}
                  />
                  <div
                    key={item.value}
                    className={`rounded ${isDisabled ? "opacity-50" : ""}`}
                  >
                    {item.label}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MoreFieldsEditor;
