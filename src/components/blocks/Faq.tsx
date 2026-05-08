import { useEffect, useRef, useState } from "react";
import { arrowDownIcon, arrowUpIcon, closeIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import type { BlockTypeProps } from "./changeBlockTypes";
import ChangeBlockType from "./ChangeBlockType";
import Input from "../ui/input/Input";
import ContentLibrary from "../contentPanel/ContentLibrary";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import FaqPreview from "./BlockPreviews/FaqPreview";
import FroalaEditor from "./FroalaEditor";
import { v4 as uuidv4 } from "uuid";

const Faq = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [isPreview, _setIsPreview] = useState(false);

  const divisions = currentBlock.content.divisions ?? [];

  // -------------------------------
  // ADD NEW DIVISION
  // -------------------------------
  const addDivision = () => {
    const updated = [
      ...divisions,
      {
        id: uuidv4(),
        title: "",
        faqs: [
          {
            id: uuidv4(),
            faq_question: "",
            faq_answer: "",
            order: 1,
          },
        ],
      },
    ];

    onChangeBlock?.({
      ...currentBlock,
      content: { ...currentBlock.content, divisions: updated },
    });
  };

  const removeDivision = (dIndex: number) => {
    const updated = divisions.filter((_: any, i: number) => i !== dIndex);
    onChangeBlock?.({
      ...currentBlock,
      content: { ...currentBlock.content, divisions: updated },
    });
  };

  // -------------------------------
  // UPDATE DIVISION TITLE
  // -------------------------------
  const updateDivisionTitle = (index: number, value: string) => {
    const updated = divisions.map((division: any, i: number) => {
      if (i !== index) return division;

      return {
        ...division, // clone object
        title: value, // update safely
      };
    });

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        divisions: updated,
      },
    });
  };

  // -------------------------------
  // ADD FAQ INSIDE A DIVISION
  // -------------------------------
  const addFaq = (dIndex: number) => {
    const updatedDivisions = divisions.map((division: any, i: number) => {
      if (i !== dIndex) return division;

      const nextOrder =
        Math.max(...division.faqs.map((f: any) => f.order ?? 0), 0) + 1;

      return {
        ...division,
        faqs: [
          ...division.faqs,
          {
            id: uuidv4(),
            faq_question: "",
            faq_answer: "",
            order: nextOrder,
          },
        ],
      };
    });

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        divisions: updatedDivisions,
      },
    });
  };

  // -------------------------------
  // UPDATE FAQ
  // -------------------------------
  const updateFaq = (
    dIndex: number,
    fIndex: number,
    field: "faq_question" | "faq_answer" | "is_dark",
    value: string | boolean
  ) => {
    const updatedDivisions = divisions.map((division: any, i: number) => {
      if (i !== dIndex) return division;

      return {
        ...division,
        faqs: division.faqs.map((faq: any, j: number) => {
          if (j !== fIndex) return faq;

          return {
            ...faq,
            [field]: value, // safe immutable update
          };
        }),
      };
    });

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        divisions: updatedDivisions,
      },
    });
  };

  // -------------------------------
  // REMOVE FAQ
  // -------------------------------
  const removeFaq = (dIndex: number, fIndex: number) => {
    const updatedDivisions = divisions.map((division: any, i: number) => {
      if (i !== dIndex) return division;

      const filtered = division.faqs.filter(
        (_: any, idx: number) => idx !== fIndex
      );

      return {
        ...division,
        faqs: filtered.map((faq: any, index: number) => ({
          ...faq,
          order: index + 1,
        })),
      };
    });

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        divisions: updatedDivisions,
      },
    });
  };

  // -------------------------------
  // REORDER FAQ INSIDE A DIVISION
  // -------------------------------
  const reorderFaq = (dIndex: number, from: number, to: number) => {
    if (to < 0 || to >= divisions[dIndex].faqs.length) return;

    const updated = divisions.map((division: any, i: number) => {
      if (i !== dIndex) return division;

      // Clone faqs
      const faqs = [...division.faqs];
      const [moved] = faqs.splice(from, 1);
      faqs.splice(to, 0, moved);

      return {
        ...division, // clone division
        faqs: faqs.map((f, idx) => ({
          ...f,
          order: idx + 1,
        })),
      };
    });

    onChangeBlock?.({
      ...currentBlock,
      content: { ...currentBlock.content, divisions: updated },
    });
  };

  useEffect(() => {
    if (currentBlock.content?.more) {
      setMoreFields(Object.keys(currentBlock.content.more));
    }
  }, [currentBlock]);

  return (
    <>
      {isPreview ? (
        <FaqPreview data={currentBlock} />
      ) : (
        <div className="border-b-0.5 border-b-primary pb-6">
          {divisions.map((division: any, dIndex: number) => (
            <div
              key={division.id}
              className="p-5 bg-white rounded-xl mb-6 border border-primary"
            >
              <div className="flex items-center justify-end">
                {divisions.length > 1 && (
                  <Button
                    icon={closeIcon}
                    backgroundColor="transparent"
                    onClick={() => removeDivision(dIndex)}
                  />
                )}
              </div>
              {/* DIVISION TITLE */}
              <div className="mb-4">
                <Input
                  label="Division Title"
                  value={division.title}
                  onChange={(e) => updateDivisionTitle(dIndex, e.target.value)}
                />
              </div>

              {/* FAQ LIST INSIDE DIVISION */}
              {division.faqs.map((faq: any, fIndex: number) => {
                const total = division.faqs.length;
                const isFirst = fIndex === 0;
                const isLast = fIndex === total - 1;

                return (
                  <div
                    key={faq.id}
                    className="p-4 bg-f6f6f6 rounded-xl mb-3 relative"
                  >
                    <div className="flex justify-end items-center gap-2">
                      {!isFirst && (
                        <Button
                          icon={arrowUpIcon}
                          backgroundColor="transparent"
                          onClick={() => reorderFaq(dIndex, fIndex, fIndex - 1)}
                        />
                      )}
                      {!isLast && (
                        <Button
                          icon={arrowDownIcon}
                          backgroundColor="transparent"
                          onClick={() => reorderFaq(dIndex, fIndex, fIndex + 1)}
                        />
                      )}
                      {total > 1 && (
                        <Button
                          icon={closeIcon}
                          backgroundColor="transparent"
                          onClick={() => removeFaq(dIndex, fIndex)}
                        />
                      )}
                    </div>

                    <Input
                      label="Question"
                      value={faq.faq_question}
                      className="mb-3"
                      onChange={(e) =>
                        updateFaq(
                          dIndex,
                          fIndex,
                          "faq_question",
                          e.target.value
                        )
                      }
                    />

                    <p className="block font-medium mb-1">Answer</p>
                    <FroalaEditor
                      model={faq.faq_answer}
                      onModelChange={(content) =>
                        updateFaq(dIndex, fIndex, "faq_answer", content)
                      }
                      isDark={faq.is_dark}
                      onThemeChange={(value) =>
                        updateFaq(dIndex, fIndex, "is_dark", value)
                      }
                    />
                  </div>
                );
              })}

              <Button
                text="Add FAQ"
                icon={plusIcon}
                className="addSideBarBtn relative"
                backgroundColor="transparent"
                onClick={() => addFaq(dIndex)}
              />
            </div>
          ))}

          <Button
            text="Add Division"
            icon={plusIcon}
            backgroundColor="transparent"
            className="mt-3 addSideBarBtn relative"
            onClick={addDivision}
          />

          <MoreFieldsRenderer
            currentBlock={currentBlock}
            onChangeBlock={onChangeBlock}
            moreFields={moreFields}
            setMoreFields={setMoreFields}
          />
        </div>
      )}

      <div className="mt-5 flex items-center gap-4">
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
            fieldsToShow={["description"]}
          />
        </div>
      </div>

      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="imageUrl"
          mediaFilter="image"
          onSelect={(url: string) =>
            onChangeBlock?.({
              ...currentBlock,
              content: { ...currentBlock.content, imageUrl: url },
            })
          }
        />
      )}
    </>
  );
};

export default Faq;
