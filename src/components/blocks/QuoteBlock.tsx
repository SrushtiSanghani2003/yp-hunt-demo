import { useRef, useState } from "react";
import type { BlockTypeProps } from "./changeBlockTypes";
import { v4 as uuidv4 } from "uuid";
import Button from "../ui/button";
import {
  arrowDownIcon,
  arrowUpIcon,
  bentoBoxIcon,
  closeIcon,
  plusIcon,
} from "../../icons";
import Input from "../ui/input/Input";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import ChangeBlockType from "./ChangeBlockType";
import MoreFieldsEditor from "./MoreFieldsEditor";
import QuoteStyleChangeModal from "./QuoteStyleChangeModal";

const QuoteBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddQuote = () => {
    const quotes = currentBlock.content.quotes ?? [];
    const nextOrder = Math.max(...quotes.map((q: any) => q.order || 0), 0) + 1;
    const updatedQuotes = [
      ...quotes,
      { id: uuidv4(), quote_text: "", author: "", order: nextOrder },
    ];
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        quotes: updatedQuotes,
      },
    });
  };

  const handleChange = (
    index: number,
    field: "quote_text" | "author",
    value: string
  ) => {
    const updatedQuotes = [...currentBlock.content?.quotes];

    const updatedQuote = { ...updatedQuotes[index], [field]: value };
    updatedQuotes[index] = updatedQuote;
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        quotes: updatedQuotes,
      },
    });
  };

  const handleRemoveQuote = (index: number) => {
    const updatedQuotes = (currentBlock.content?.quotes || [])
      .filter((_item: unknown, i: number) => i !== index)
      .map((quote: any, newIndex: number) => ({
        ...quote,
        order: newIndex + 1,
      }));

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        quotes: updatedQuotes,
      },
    });
  };

  const reorderQuotes = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.quotes) return;

    const quotesCopy = currentBlock.content.quotes.map((quote: any) => ({
      ...quote,
    }));

    // Ensure the indices are valid
    if (toIndex < 0 || toIndex >= quotesCopy.length) return;

    // Move the item
    const [movedQuote] = quotesCopy.splice(fromIndex, 1);
    quotesCopy.splice(toIndex, 0, movedQuote);

    // Reassign order values (if needed)
    const reorderedQuotes = quotesCopy.map((quote: any, index: number) => ({
      ...quote,
      order: index + 1,
    }));

    // Send update
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        quotes: reorderedQuotes,
      },
    });
  };

  const handleQuoteStyleChange = (value: any) => {
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        is_feedback: value,
      },
    });
  };

  return (
    <>
      <div className="border-b-0.5 border-b-primary">
        {currentBlock.content.quotes &&
          currentBlock.content?.quotes?.map((quote: any, index: number) => {
            const totalQuotes = currentBlock.content.quotes.length;
            const isFirst = index === 0;
            const isLast = index === totalQuotes - 1;
            return (
              <div
                key={index}
                className="md:mb-4 mb-2 relative p-4 bg-f6f6f6 rounded-xl"
              >
                <div className="flex items-center gap-2 justify-end">
                  {totalQuotes > 1 && !isFirst && (
                    <Button
                      icon={arrowUpIcon}
                      backgroundColor="transparent"
                      className="p-0 md:w-5 w-3 md:h-5 h-3"
                      onClick={() => reorderQuotes(index, index - 1)}
                    />
                  )}
                  {totalQuotes > 1 && !isLast && (
                    <Button
                      icon={arrowDownIcon}
                      backgroundColor="transparent"
                      className="p-0 md:w-5 w-3 md:h-5 h-3"
                      onClick={() => reorderQuotes(index, index + 1)}
                    />
                  )}
                  {totalQuotes > 1 && (
                    <Button
                      icon={closeIcon}
                      backgroundColor="transparent"
                      onClick={() => handleRemoveQuote(index)}
                      className="p-0 w-5"
                    />
                  )}
                </div>

                <Input
                  label="Author*"
                  value={quote.author}
                  className="md:mb-5 mb-2"
                  onChange={(e) =>
                    handleChange(index, "author", e.target.value)
                  }
                />
                <div>
                  <label className="block md:text-base/4 text-sm mb-2 font-medium">
                    Quote Text
                  </label>
                  <textarea
                    rows={2}
                    className="w-full p-3 text-base border-0.5 border-primary rounded-2xl resize-none"
                    value={quote.quote_text}
                    onChange={(e) =>
                      handleChange(index, "quote_text", e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}

        <Button
          text="Add More Quote"
          icon={plusIcon}
          backgroundColor="transparent"
          className="addSideBarBtn relative p-0"
          onClick={handleAddQuote}
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
        <Button
          text="Change Style"
          backgroundColor="transparent"
          icon={bentoBoxIcon}
          onClick={() => setShowModal(true)}
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
        {showModal && (
          <QuoteStyleChangeModal
            show={showModal}
            onClose={() => setShowModal(false)}
            isFeedback={currentBlock?.content?.is_feedback}
            onSelect={(value: any) => handleQuoteStyleChange(value)}
          />
        )}
      </div>
    </>
  );
};

export default QuoteBlock;
