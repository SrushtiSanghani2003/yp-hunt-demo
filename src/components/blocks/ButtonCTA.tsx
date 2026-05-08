// import { useRef, useState } from "react";
import { closeIcon, correctIcon, plusIcon } from "../../icons";
import Input from "../ui/input/Input";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
// import MoreFieldsEditor from "./MoreFieldsEditor";
// import MoreFieldsRenderer from "./MoreFieldsRenderer";
import Button from "../ui/button";
import { v4 as uuidv4 } from "uuid";

const ButtonCTA = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  // const [moreFields, setMoreFields] = useState<string[]>([]);
  // const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleChange = (
    index: number,
    label: string,
    value: string | boolean
  ) => {
    const updatedBtns = [...currentBlock.content.btns];
    updatedBtns[index] = {
      ...updatedBtns[index],
      [label]: value,
    };
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        // [label]: value,
        btns: updatedBtns,
      },
    });
  };

  const handleAddCTA = () => {
    const allBtns = currentBlock.content.btns;
    // const nextOrder = Math.max(...allBtns.map((q: any) => q.order || 0), 0) + 1;

    const updatedBtns = [
      ...allBtns,
      {
        id: uuidv4(),
        button_label: "",
        button_link: "",
        isnewtab: false,
      },
    ];

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        btns: updatedBtns,
      },
    });
  };

  const handleRemoveCTA = (index: number) => {
    const updatedBtns = [...currentBlock.content.btns];
    if (updatedBtns.length > 1) {
      updatedBtns.splice(index, 1);

      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          btns: updatedBtns,
        },
      });
    }
  };

  return (
    <>
      <div className="md:pb-6 pb-2 border-b-0.5 border-primary">
        {currentBlock.content?.btns.map((item: any, index: number) => {
          const allBtns = currentBlock.content?.btns;
          return (
            <div className="p-4 mb-5 rounded-xl bg-f6f6f6" key={item.id}>
              {allBtns?.length > 1 && (
                <div className="flex items-center justify-end">
                  <Button
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="p-0 md:w-5 w-3 md:h-5 h-3"
                    onClick={() => {
                      handleRemoveCTA(index);
                    }}
                  />
                </div>
              )}
              <Input
                label="Button Label*"
                value={item.button_label}
                onChange={(e) =>
                  handleChange(index, "button_label", e.target.value)
                }
                className="md:pb-3"
              />
              <Input
                label="Button Link Destination*"
                note="Note: Please include http:// or https:// in your link URL"
                placeholder="https://www.example.com"
                value={item.button_link}
                onChange={(e) =>
                  handleChange(index, "button_link", e.target.value)
                }
                className="md:pb-3"
              />
              {/* <div className="flex items-center gap-2 md:mb-5 mb-2">
                <img src={globeIcon} alt="Globe icon" />
                <p className="font-semibold md:text-base/4 text-xs">
                  URL Builder (Recommended)
                </p>
              </div> */}
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id={`${item.id}`}
                  className="peer hidden"
                  checked={item?.isnewtab || false}
                  onChange={(e) =>
                    handleChange(index, "isnewtab", e.target.checked)
                  }
                />
                <label
                  htmlFor={`${item.id}`}
                  className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
               peer-checked:bg-black peer-checked:border-black"
                >
                  <img src={correctIcon} alt="Right" />
                </label>
                <label
                  htmlFor={`${item.id}`}
                  className="md:text-base/4 text-sm"
                >
                  Open in new tab
                </label>
              </div>
            </div>
          );
        })}
        <Button
          text="Add CTA"
          icon={plusIcon}
          backgroundColor="transparent"
          className="addSideBarBtn relative p-0"
          onClick={handleAddCTA}
        />

        {/* <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
        /> */}
      </div>

      <div className="mt-4 flex items-center md:gap-8 gap-2">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        {/* <div className="relative" ref={dropdownRef}>
          <MoreFieldsEditor
            currentBlock={currentBlock}
            moreFields={moreFields}
            setMoreFields={setMoreFields}
            onChangeBlock={onChangeBlock}
          />
        </div> */}
      </div>
    </>
  );
};

export default ButtonCTA;
