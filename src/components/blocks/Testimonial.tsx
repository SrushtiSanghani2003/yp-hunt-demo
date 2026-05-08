// import { getWordCount } from "../../config/function";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import Input from "../ui/input/Input";
import { useEffect, useRef, useState } from "react";
import ContentLibrary from "../contentPanel/ContentLibrary";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import Button from "../ui/button";
import {
  arrowDownIcon,
  arrowUpIcon,
  closeIcon,
  mediaIcon,
  plusIcon,
} from "../../icons";
import RatingStars from "../ui/ratingStarts/RatingStars";
import { v4 as uuidv4 } from "uuid";
import NestedMoreFieldsRenderer from "./NestedMoreFieldsRenderer";
// import ToggleSwitch from "../ui/switch/ToggleSwitch";
import TestimonialsPreview from "./TestimonialsPreview";
import { concatImgURL } from "../../config/function";

const Testimonial = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [nestedMoreFieldsMap, setNestedMoreFieldMap] = useState<{
    [key: number]: string[];
  }>({});

  const [show, setShow] = useState(false);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState<number | null>(null);
  const quotesWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isPreview, _setIsPreview] = useState(false);

  const handleQuoteChange = (index: number, key: string, value: any) => {
    const updatedQuotes = [...currentBlock.content.quotes];
    updatedQuotes[index] = {
      ...updatedQuotes[index],
      [key]: value,
    };

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        quotes: updatedQuotes,
      },
    });
  };

  const handleAddQuote = () => {
    if (activeQuoteIndex) {
      setActiveQuoteIndex(null);
    }
    const quotes = currentBlock.content.quotes;
    const nextOrder = Math.max(...quotes.map((q: any) => q.order || 0), 0) + 1;

    const updatedQuotes = [
      ...quotes,
      {
        id: uuidv4(),
        quote_img_url: "",
        author: "",
        job_title: "",
        rating: 0,
        quote_text: "",
        order: nextOrder,
      },
    ];

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

  const handleRemoveQuote = (index: number) => {
    setActiveQuoteIndex(null);
    const updatedQuotes = [...currentBlock.content.quotes];
    if (updatedQuotes.length > 1) {
      updatedQuotes.splice(index, 1);

      const reorderedQuotes = updatedQuotes.map((quote, idx) => ({
        ...quote,
        order: idx + 1,
      }));

      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          quotes: reorderedQuotes,
        },
      });
    }
  };

  useEffect(() => {
    const handleDoubleClickOutside = (event: MouseEvent) => {
      if (
        quotesWrapperRef.current &&
        !quotesWrapperRef.current.contains(event.target as Node)
      ) {
        setActiveQuoteIndex(null);
      }
    };

    document.addEventListener("dblclick", handleDoubleClickOutside);

    return () => {
      document.removeEventListener("dblclick", handleDoubleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (currentBlock.content?.more) {
      const fields = Object.keys(currentBlock.content?.more);
      setMoreFields(fields);
    }
  }, [currentBlock]);

  // useEffect(() => {
  // }, [activeQuoteIndex]);

  return (
    <>
      {/* <div
        className={`flex items-center ${
          isPreview && currentBlock?.content?.more?.title
            ? "justify-between"
            : "justify-end"
        } mb-2 h-7`}
      >
        {currentBlock?.content?.more?.title && isPreview && (
          <h2 className="font-bold text-xl uppercase">
            {currentBlock.content.more.title}
          </h2>
        )}
        <ToggleSwitch
          checked={isPreview}
          label="Preview"
          onChange={() => setIsPreview(!isPreview)}
          disabled={currentBlock.content.quotes[0]?.quote_img_url == ""}
        />
      </div> */}
      {isPreview ? (
        <>
          <TestimonialsPreview data={currentBlock.content.quotes} />
        </>
      ) : (
        <>
          <div ref={quotesWrapperRef}>
            {currentBlock.content.quotes?.map((quote: any, index: number) => {
              const totalQuotes = currentBlock.content.quotes.length;
              const isFirst = index === 0;
              const isLast = index === totalQuotes - 1;
              return (
                <div
                  key={quote.id}
                  className={`bg-f6f6f6 p-4 rounded-xl mb-5 ${
                    activeQuoteIndex == index
                      ? "border border-primary"
                      : "border border-transparent"
                  }`}
                  onClick={() => setActiveQuoteIndex(index)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-semibold">
                      Quote {index + 1}
                    </h3>
                    <div className="flex items-center gap-3">
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
                          className="p-0 md:w-5 w-3 md:h-5 h-3"
                          onClick={(e) => {
                            e.stopPropagation(), handleRemoveQuote(index);
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mb-4">
                    <div className="md:w-sp170 w-20 h-full">
                      {quote.quote_img_url ? (
                        <img
                          src={concatImgURL(quote.quote_img_url)}
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
                        value={concatImgURL(quote.quote_img_url) ?? ""}
                        readOnly
                        // onChange={(e) =>
                        //   handleQuoteChange(index, "quote_img_url", e.target.value)
                        // }
                      />
                      <div>
                        {quote.quote_img_url ? (
                          <Button
                            text="Remove Image"
                            icon={closeIcon}
                            backgroundColor="transparent"
                            className="py-0"
                            imageclassName="md:w-5 w-3 md:h-5 h-3"
                            onClick={() =>
                              handleQuoteChange(index, "quote_img_url", "")
                            }
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
                              setActiveQuoteIndex(index);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid items-center grid-cols-3 md:gap-5 gap-2 mb-4">
                    <Input
                      label="Author"
                      className="m-0"
                      value={quote.author ?? ""}
                      onChange={(e) =>
                        handleQuoteChange(index, "author", e.target.value)
                      }
                    />
                    <Input
                      label="Job Title"
                      className="m-0"
                      value={quote.job_title ?? ""}
                      onChange={(e) =>
                        handleQuoteChange(index, "job_title", e.target.value)
                      }
                    />
                    <div>
                      <p className="block mb-1 font-medium md:text-base/4 text-sm">
                        Rating
                      </p>
                      <RatingStars
                        initialRating={quote.rating ?? 0}
                        onChange={(val) =>
                          handleQuoteChange(index, "rating", val)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`quoteTxt-${index}`}
                      className="block md:text-base/4 text-sm mb-2 font-medium"
                    >
                      Quote Text
                    </label>
                    <textarea
                      id={`quoteTxt-${index}`}
                      rows={4}
                      value={quote.quote_text ?? ""}
                      onChange={(e) =>
                        handleQuoteChange(index, "quote_text", e.target.value)
                      }
                      className="w-full p-3 text-base border-0.5 border-primary rounded-2xl block resize-none"
                    ></textarea>
                    {/* <div className="text-sm text-right mt-1 text-gray-500">
                Word Count: {getWordCount(quote.quote_text)}
              </div> */}
                  </div>
                  <NestedMoreFieldsRenderer
                    currentBlock={currentBlock}
                    onChangeBlock={onChangeBlock}
                    moreFields={nestedMoreFieldsMap[index] || []}
                    setMoreFields={setNestedMoreFieldMap}
                    contentKey="quotes"
                    activeIndex={index}
                  />
                </div>
              );
            })}
          </div>
          <Button
            text="Add Testimonial"
            icon={plusIcon}
            backgroundColor="transparent"
            className="addBtn relative p-0"
            onClick={handleAddQuote}
          />
          <MoreFieldsRenderer
            currentBlock={currentBlock}
            onChangeBlock={onChangeBlock}
            moreFields={moreFields}
            setMoreFields={setMoreFields}
          />
        </>
      )}

      <div className="mt-5 flex items-center md:gap-8 gap-2">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        <div className="relative" ref={dropdownRef}>
          {activeQuoteIndex === null ? (
            <MoreFieldsEditor
              currentBlock={currentBlock}
              moreFields={moreFields}
              setMoreFields={setMoreFields}
              onChangeBlock={onChangeBlock}
            />
          ) : (
            <MoreFieldsEditor
              currentBlock={currentBlock}
              moreFields={nestedMoreFieldsMap[activeQuoteIndex] || []}
              setMoreFields={setNestedMoreFieldMap}
              onChangeBlock={onChangeBlock}
              contentKey="quotes"
              activeIndex={activeQuoteIndex}
            />
          )}
        </div>

        {show && (
          <ContentLibrary
            open={show}
            onClose={() => setShow(false)}
            uploadType="other"
            onSelect={(url: string) => {
              if (activeQuoteIndex != null) {
                handleQuoteChange(activeQuoteIndex, "quote_img_url", url);
              }
              setActiveQuoteIndex(null);
            }}
            mediaFilter="image"
          />
        )}
      </div>
    </>
  );
};

export default Testimonial;
