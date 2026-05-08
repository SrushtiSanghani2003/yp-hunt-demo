import { useRef, useState } from "react";
import type { BlockTypeProps } from "./changeBlockTypes";
import { v4 as uuidv4 } from "uuid";
import Button from "../ui/button";
import { arrowDownIcon, arrowUpIcon, closeIcon, plusIcon } from "../../icons";
import Input from "../ui/input/Input";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import ChangeBlockType from "./ChangeBlockType";
import MoreFieldsEditor from "./MoreFieldsEditor";

const FeedBackBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);

  const handleAddFeedback = () => {
    const feedbacks = currentBlock.content.feedbacks ?? [];
    const nextOrder =
      Math.max(...feedbacks.map((q: any) => q.order || 0), 0) + 1;
    const updatedFeedbacks = [
      ...feedbacks,
      { id: uuidv4(), title: "", description: "", order: nextOrder },
    ];
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        feedbacks: updatedFeedbacks,
      },
    });
  };

  const handleChange = (
    index: number,
    field: "title" | "feedback_text",
    value: string
  ) => {
    const updatedFeedbacks = [...currentBlock.content?.feedbacks];

    const updatedFeedback = { ...updatedFeedbacks[index], [field]: value };
    updatedFeedbacks[index] = updatedFeedback;
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        feedbacks: updatedFeedbacks,
      },
    });
  };

  const handleRemoveFeedback = (index: number) => {
    const updatedFeedbacks = (currentBlock.content?.feedbacks || [])
      .filter((_item: unknown, i: number) => i !== index)
      .map((feedback: any, newIndex: number) => ({
        ...feedback,
        order: newIndex + 1,
      }));

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        feedbacks: updatedFeedbacks,
      },
    });
  };

  const reorderFeedbacks = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.feedbacks) return;

    const feedbacksCopy = currentBlock.content.feedbacks.map(
      (feedback: any) => ({
        ...feedback,
      })
    );

    // Ensure the indices are valid
    if (toIndex < 0 || toIndex >= feedbacksCopy.length) return;

    // Move the item
    const [movedFeedback] = feedbacksCopy.splice(fromIndex, 1);
    feedbacksCopy.splice(toIndex, 0, movedFeedback);

    // Reassign order values (if needed)
    const reorderedFeedbacks = feedbacksCopy.map(
      (feedback: any, index: number) => ({
        ...feedback,
        order: index + 1,
      })
    );

    // Send update
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        feedbacks: reorderedFeedbacks,
      },
    });
  };

  return (
    <>
      <div className="border-b-0.5 border-b-primary">
        {currentBlock.content.feedbacks &&
          currentBlock.content?.feedbacks?.map(
            (feedback: any, index: number) => {
              const totalFeedbacks = currentBlock.content.feedbacks.length;
              const isFirst = index === 0;
              const isLast = index === totalFeedbacks - 1;
              return (
                <div
                  key={index}
                  className="md:mb-4 mb-2 relative p-4 bg-f6f6f6 rounded-xl"
                >
                  <div className="flex items-center gap-2 justify-end">
                    {totalFeedbacks > 1 && !isFirst && (
                      <Button
                        icon={arrowUpIcon}
                        backgroundColor="transparent"
                        className="p-0 md:w-5 w-3 md:h-5 h-3"
                        onClick={() => reorderFeedbacks(index, index - 1)}
                      />
                    )}
                    {totalFeedbacks > 1 && !isLast && (
                      <Button
                        icon={arrowDownIcon}
                        backgroundColor="transparent"
                        className="p-0 md:w-5 w-3 md:h-5 h-3"
                        onClick={() => reorderFeedbacks(index, index + 1)}
                      />
                    )}
                    {totalFeedbacks > 1 && (
                      <Button
                        icon={closeIcon}
                        backgroundColor="transparent"
                        onClick={() => handleRemoveFeedback(index)}
                        className="p-0 w-5"
                      />
                    )}
                  </div>

                  <Input
                    label="Title"
                    value={feedback.title}
                    className="md:mb-5 mb-2"
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                  />
                  <div>
                    <label className="block md:text-base/4 text-sm mb-2 font-medium">
                      Feedback Text
                    </label>
                    <textarea
                      rows={2}
                      className="w-full p-3 text-base border-0.5 border-primary rounded-2xl resize-none"
                      value={feedback.feedback_text}
                      onChange={(e) =>
                        handleChange(index, "feedback_text", e.target.value)
                      }
                    />
                  </div>
                </div>
              );
            }
          )}

        <Button
          text="Add More Feedback"
          icon={plusIcon}
          backgroundColor="transparent"
          className="addSideBarBtn relative p-0"
          onClick={handleAddFeedback}
        />

        <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
        />
      </div>
      <div className="mt-5 md:gap-8 gap-2 flex items-center">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        <div className="relative" ref={dropdownRef}>
          <MoreFieldsEditor
            currentBlock={currentBlock}
            moreFields={moreFields}
            setMoreFields={setMoreFields}
            onChangeBlock={onChangeBlock}
            fieldsToShow={["title", "description"]}
          />
        </div>
      </div>
    </>
  );
};

export default FeedBackBlock;
