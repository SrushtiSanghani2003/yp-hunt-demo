import { useEffect, useState } from "react";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import { chevronDown } from "../../icons";

const TournamentsBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [type, setType] = useState<string>("");

  const handleTypeChange = (type: string) => {
    setType(type);
    const updatedContent = { ...currentBlock.content };
    updatedContent.type = type;
    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  useEffect(() => {
    if (currentBlock?.content?.type) {
      setType(currentBlock.content.type);
    }
  }, [currentBlock]);

  return (
    <>
      <div className="relative mb-5">
        <select
          className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          {/* <option value="" disabled>
            Please Select Type
          </option> */}
          <option value="upcoming">Upcoming</option>
          {/* <option value="scheduled">Scheduled</option>
          <option value="live">Live</option> */}
        </select>
        <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
          <img src={chevronDown} />
        </div>
      </div>
      <div className="flex items-center md:gap-8 gap-2 md:mt-5 mt-2">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
      </div>
    </>
  );
};

export default TournamentsBlock;
