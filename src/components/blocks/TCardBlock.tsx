import {
  arrowDownIcon,
  arrowUpIcon,
  bentoBoxIcon,
  closeIcon,
  mediaIcon,
  // moreIcon,
  plusIcon,
} from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import type { BlockTypeProps } from "./changeBlockTypes";
import { v4 as uuidv4 } from "uuid";
import MoreFieldsEditor from "./MoreFieldsEditor";
import ChangeBlockType from "./ChangeBlockType";
import { useEffect, useRef, useState } from "react";
import ContentLibrary from "../contentPanel/ContentLibrary";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import TCardStyleModal from "./TCardStyleModal";
// import { tCardDropDownItems } from "../heroMedia/tabs";
// import { multipleAdsMoreDefaultObjects } from "./blocksObjectConfig";
import TCardMoreFieldRenderer from "./TCardMoreFieldRenderer";
import FroalaEditor from "./FroalaEditor";
import { concatImgURL } from "../../config/function";

const TCardBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [commonMoreFields, setCommonMoreFields] = useState<string[]>([]);
  const [moreFields, setMoreFields] = useState<Record<number, string[]>>({});
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  // const dropDownItemRef = useRef<HTMLDivElement>(null);
  // const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  // const [showDropdowns, setShowDropdowns] = useState<{
  //   [key: number]: boolean;
  // }>({});

  // const singleEntryFields: (keyof typeof multipleAdsMoreDefaultObjects)[] = [
  //   "title",
  //   "description",
  //   "link",
  // ];

  // const toggleDropdown = (index: number) => {
  //   setShowDropdowns((prev) => {
  //     const newState: { [key: number]: boolean } = {};
  //     Object.keys(prev).forEach((key) => {
  //       newState[+key] = false;
  //     });
  //     return { ...newState, [index]: !prev[index] };
  //   });
  // };

  // const handleAddField = (
  //   index: number,
  //   type: keyof typeof multipleAdsMoreDefaultObjects
  // ) => {
  //   const updatedCards = currentBlock.content.cards.map(
  //     (card: any, i: number) => {
  //       if (i !== index) return card;

  //       const existing = card.more?.[type];

  //       // Block re-adding if it's a single-entry field and already exists
  //       if (singleEntryFields.includes(type) && existing) return card;

  //       let newField;
  //       if (typeof multipleAdsMoreDefaultObjects[type] === "string") {
  //         // Simple string value
  //         newField = multipleAdsMoreDefaultObjects[type];
  //       } else {
  //         // Array field — create fresh objects with unique ids
  //         const freshItems = multipleAdsMoreDefaultObjects[type].map(
  //           (item: any) => ({
  //             ...item,
  //             id: Date.now() + Math.random(),
  //           })
  //         );

  //         newField = [...(existing || []), ...freshItems];
  //       }

  //       return {
  //         ...card,
  //         more: {
  //           ...(card.more || {}),
  //           [type]: newField,
  //         },
  //       };
  //     }
  //   );

  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: {
  //       ...currentBlock.content,
  //       cards: updatedCards,
  //     },
  //   });

  //   if (!moreFields[index]?.includes(type)) {
  //     setMoreFields((prev) => ({
  //       ...prev,
  //       [index]: [...(prev[index] || []), type],
  //     }));
  //   }

  //   setShowDropdowns((prev) => ({
  //     ...prev,
  //     [index]: false,
  //   }));
  // };

  const handleTCardChange = (index: number, key: string, value: any) => {
    const updatedCards = [...currentBlock.content.cards];
    updatedCards[index] = {
      ...updatedCards[index],
      [key]: value,
    };

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        cards: updatedCards,
      },
    });
  };

  const handleAddCard = () => {
    const allCards = currentBlock.content.cards;
    const nextOrder =
      Math.max(...allCards.map((q: any) => q.order || 0), 0) + 1;

    const updatedCards = [
      ...allCards,
      {
        id: uuidv4(),
        title: "",
        description: "",
        image_url: "",
        order: nextOrder,
      },
    ];

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        cards: updatedCards,
      },
    });
  };

  const reorderCards = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.cards) return;

    const cardsCopy = currentBlock.content.cards.map((card: any) => ({
      ...card,
    }));

    // Ensure the indices are valid
    if (toIndex < 0 || toIndex >= cardsCopy.length) return;

    // Move the item
    const [movedCard] = cardsCopy.splice(fromIndex, 1);
    cardsCopy.splice(toIndex, 0, movedCard);

    // Reassign order values (if needed)
    const reorderedCards = cardsCopy.map((card: any, index: number) => ({
      ...card,
      order: index + 1,
    }));

    // Send update
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        cards: reorderedCards,
      },
    });
  };

  const handleRemoveCard = (index: number) => {
    const updatedCards = [...currentBlock.content.cards];
    if (updatedCards.length > 1) {
      updatedCards.splice(index, 1);

      const reorderedCards = updatedCards.map((card, idx) => ({
        ...card,
        order: idx + 1,
      }));

      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          cards: reorderedCards,
        },
      });
    }
  };

  const handleSelectLayout = (key: string) => {
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        layout: key,
      },
    });
  };

  useEffect(() => {
    if (!currentBlock?.content?.cards) return;

    const initialFields: Record<number, string[]> = {};

    currentBlock.content.cards.forEach((card: any, index: number) => {
      if (card.more && typeof card.more === "object") {
        initialFields[index] = Object.keys(card.more);
      }
    });

    setMoreFields(initialFields);
    if (currentBlock.content?.more) {
      setCommonMoreFields(Object.keys(currentBlock.content.more));
    } else {
      setCommonMoreFields([]);
    }
  }, [currentBlock]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     Object.keys(dropdownRefs.current).forEach((key) => {
  //       const index = Number(key);
  //       const ref = dropdownRefs.current[index];

  //       if (ref && !ref.contains(event.target as Node)) {
  //         setShowDropdowns((prev) => ({
  //           ...prev,
  //           [index]: false,
  //         }));
  //       }
  //     });
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      {currentBlock.content?.cards.map((item: any, index: number) => {
        const totalCards = currentBlock.content.cards.length;
        const isFirst = index === 0;
        const isLast = index === totalCards - 1;
        return (
          <div className="p-3 rounded-xl bg-f6f6f6 mb-5" key={item.id}>
            <div className="flex justify-end items-center gap-3">
              {totalCards > 1 && !isFirst && (
                <Button
                  icon={arrowUpIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => reorderCards(index, index - 1)}
                />
              )}
              {totalCards > 1 && !isLast && (
                <Button
                  icon={arrowDownIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => reorderCards(index, index + 1)}
                />
              )}
              {totalCards > 1 && (
                <Button
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={(e) => {
                    e.stopPropagation(), handleRemoveCard(index);
                  }}
                />
              )}
            </div>
            {/* <div
              className="flex flex-1 justify-end gap-5 items-center relative"
              ref={(el) => {
                dropdownRefs.current[index] = el;
              }}
            >
              <div className="relative">
                <Button
                  icon={moreIcon}
                  className="md:p-0"
                  backgroundColor="transparent"
                  onClick={() => toggleDropdown(index)}
                  imageclassName="w-6 h-6"
                />
                <div
                  ref={dropDownItemRef}
                  aria-expanded={showDropdowns[index]}
                  aria-haspopup="listbox"
                  className={`absolute -left-32 bg-white border border-gray-300 shadow-lg rounded-2xl p-3 mt-2 w-40 z-10
                        transition-all duration-200 ease-out
                        transform origin-top
                        ${
                          showDropdowns[index]
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                        }
                        `}
                >
                  {tCardDropDownItems.map((item) => {
                    const isSingleEntry = singleEntryFields.includes(
                      item.value as keyof typeof multipleAdsMoreDefaultObjects
                    );
                    const isAlreadyAdded =
                      isSingleEntry &&
                      currentBlock.content.cards?.[index]?.more?.[
                        item.value
                      ];

                    return (
                      <div
                        key={item.value}
                        className={`flex px-1 rounded-2xl items-center gap-2 my-1 ${
                          isAlreadyAdded
                            ? "opacity-50 cursor-not-allowed pointer-events-none"
                            : "hover:bg-gray-200 cursor-pointer"
                        }
                                `}
                        onClick={() => {
                          if (!isAlreadyAdded) {
                            handleAddField(index, item.value as any);
                          }
                        }}
                      >
                        <img src={item.icon} alt={item.label} />
                        <div className="rounded">{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div> */}
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mb-4">
              <div className="md:w-sp170 w-20 h-full">
                {item.image_url ? (
                  <img
                    src={concatImgURL(item.image_url)}
                    alt="Uploaded"
                    className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                  />
                ) : (
                  <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                    <img src={mediaIcon} alt="Placeholder" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  label="Image URL"
                  placeholder="https://www.example.com"
                  className="m-0"
                  value={concatImgURL(item.image_url) ?? ""}
                  readOnly
                  onChange={(e) =>
                    handleTCardChange(index, "image_url", e.target.value)
                  }
                />
                <div>
                  {item.image_url ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => handleTCardChange(index, "image_url", "")}
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => {
                        setShow(true);
                        setActiveCardIndex(index);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <Input
                label="Title"
                className="md:mb-2"
                value={item.title ?? ""}
                onChange={(e) =>
                  handleTCardChange(index, "title", e.target.value)
                }
              />
              <div>
                <label className="block md:text-base/4 text-sm mb-2 font-medium">
                  Description
                </label>
                <FroalaEditor
                  model={item.description || ""}
                  onModelChange={(e) =>
                    handleTCardChange(index, "description", e)
                  }
                  isDark={currentBlock?.content?.is_dark}
                  onThemeChange={(value: any) =>
                    handleTCardChange(index, "is_dark", value)
                  }
                />
                {/* <textarea
                  rows={2}
                  placeholder={`Enter description`}
                  className="w-full p-3 text-base border-0.5 border-primary rounded-2xl resize-none"
                  value={item.description || ""}
                  onChange={(e) =>
                    handleTCardChange(index, "description", e.target.value)
                  }
                /> */}
              </div>
            </div>
            <TCardMoreFieldRenderer
              currentBlock={currentBlock}
              moreFields={moreFields[index] || []}
              setMoreFields={setMoreFields}
              card={item}
              index={index}
              onChangeBlock={onChangeBlock}
            />
          </div>
        );
      })}
      <Button
        text="Add Card"
        icon={plusIcon}
        backgroundColor="transparent"
        className="addSideBarBtn relative p-0"
        onClick={handleAddCard}
      />
      <MoreFieldsRenderer
        currentBlock={currentBlock}
        onChangeBlock={onChangeBlock}
        moreFields={commonMoreFields}
        setMoreFields={setCommonMoreFields}
      />
      <div className="mt-5 md:gap-8 gap-2 flex items-center">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        <Button
          text="Change Style"
          backgroundColor="transparent"
          icon={bentoBoxIcon}
          onClick={() => setShowModal(true)}
        />
        <div className="relative" ref={dropdownRef}>
          <MoreFieldsEditor
            currentBlock={currentBlock}
            moreFields={commonMoreFields}
            setMoreFields={setCommonMoreFields}
            onChangeBlock={onChangeBlock}
            fieldsToShow={["title", "description"]}
          />
        </div>
        {show && (
          <ContentLibrary
            open={show}
            onClose={() => setShow(false)}
            uploadType="other"
            onSelect={(url: string) => {
              if (activeCardIndex != null) {
                handleTCardChange(activeCardIndex, "image_url", url);
              }
              setActiveCardIndex(null);
            }}
            mediaFilter="image"
          />
        )}
        {showModal && (
          <TCardStyleModal
            show={showModal}
            onClose={() => setShowModal(false)}
            layoutKey={currentBlock.content.layout}
            onSelect={(key: string) => handleSelectLayout(key)}
          />
        )}
      </div>
    </>
  );
};

export default TCardBlock;
