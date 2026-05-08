import Input from "../ui/input/Input";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";

const ForYouBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const data = currentBlock.content?.without_signup_web_data || {};

  const handleChange = (field: string, value: any) => {
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        without_signup_web_data: {
          ...data,
          [field]: value,
        },
      },
    });
  };

  return (
    <>
      <div className="pb-5 border-b-primary border-b-0.5">
        <Input
          label="Title"
          placeholder="Enter Title Here..."
          className="!my-2"
          value={data.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <label className="block w-full font-medium md:text-base text-sm">
          Overview
        </label>

        <textarea
          placeholder="Enter Overview Here..."
          className="md:p-4 p-2 md:text-base text-sm border border-primary rounded-2xl h-sp70 resize-none w-full focus-within:outline-none"
          value={data.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <Input
          label="Button Title"
          placeholder="Enter Button Title Here..."
          className="!my-2"
          value={data.button_title || ""}
          onChange={(e) => handleChange("button_title", e.target.value)}
        />
      </div>
      <div className="mt-5 md:gap-8 gap-2 flex items-center">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
      </div>
    </>
  );
};

export default ForYouBlock;
