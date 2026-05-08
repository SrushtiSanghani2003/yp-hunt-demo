import { useRef, useState } from "react";
import type { BlockTypeProps } from "../changeBlockTypes";
import ChangeBlockType from "../ChangeBlockType";
import MoreFieldsEditor from "../MoreFieldsEditor";
import MoreFieldsRenderer from "../MoreFieldsRenderer";
import { PlusIcon } from "lucide-react";
import DocumentAdd from "./DocumentAdd";
import { v4 as uuidv4 } from "uuid";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { SortableDocItem } from "./SortableDocItem";
import Input from "../../ui/input/Input";
import Button from "../../ui/button";
import {
  arrowDownIcon,
  arrowUpIcon,
  closeIcon,
  plusIcon,
} from "../../../icons";

const DocumentBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [show, setShow] = useState<any>(null);

  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: any, docIndex: number) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const updatedDocs = currentBlock.content.docs.map(
        (doc: any, index: number) => {
          if (index !== docIndex) return doc;

          const subDocs = [...doc.subDocs];

          const oldIndex = subDocs.findIndex((sd) => sd.order === active.id);
          const newIndex = subDocs.findIndex((sd) => sd.order === over.id);

          const reordered = arrayMove(subDocs, oldIndex, newIndex);

          // ✅ Reassign order immutably
          const updatedSubDocs = reordered.map((sd, idx) => ({
            ...sd,
            order: idx + 1,
          }));

          return {
            ...doc,
            subDocs: updatedSubDocs,
          };
        }
      );

      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          docs: updatedDocs,
        },
      });
    }
  };

  const handleSubDocAdd = (docIndex: number) => {
    const updatedDocs = currentBlock.content.docs.map(
      (doc: any, index: number) => {
        if (index !== docIndex) return doc;

        const subDocs = doc.subDocs || [];
        const nextOrder =
          Math.max(...subDocs.map((sd: any) => sd.order || 0), 0) + 1;

        const newSubDoc = {
          id: uuidv4(),
          doc_name: "",
          doc_img: "",
          document_url: "",
          order: nextOrder,
        };

        return {
          ...doc,
          subDocs: [...subDocs, newSubDoc],
        };
      }
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        docs: updatedDocs,
      },
    });
  };

  const handleSubDocRemove = (docIndex: number, subIndex: number) => {
    const updatedDocs = currentBlock.content.docs.map(
      (doc: any, index: number) => {
        if (index !== docIndex) return doc;

        let subDocs = [...doc.subDocs];
        if (subDocs.length <= 1) return doc;

        subDocs.splice(subIndex, 1);

        // Reorder subDocs
        subDocs = subDocs.map((sd, idx) => ({
          ...sd,
          order: idx + 1,
        }));

        return {
          ...doc,
          subDocs,
        };
      }
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        docs: updatedDocs,
      },
    });
  };

  const handleUpdate = (data: any, sortOrder: number, docIndex: number) => {
    // deep copy docs to avoid mutating props
    const updatedDocs = currentBlock.content.docs.map(
      (doc: any, index: number) =>
        index === docIndex
          ? {
              ...doc,
              subDocs: doc.subDocs.map((sd: any) =>
                sd.order === sortOrder
                  ? {
                      ...sd,
                      doc_name: data.docTitle,
                      doc_img: data.docImg,
                      document_url: data.docUrl,
                    }
                  : sd
              ),
            }
          : doc
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        docs: updatedDocs,
      },
    });
  };

  const handleAddDocument = () => {
    const docs = currentBlock.content.docs ?? [];

    // find next sortOrder for parent doc
    const nextSortOrder =
      Math.max(...docs.map((d: any) => d.sortOrder || 0), 0) + 1;

    // subDocs should have their own order starting at 1
    const newDoc = {
      title: "",
      description: "",
      sortOrder: nextSortOrder, // ✅ parent doc sort order
      subDocs: [
        {
          id: uuidv4(),
          doc_name: "",
          doc_img: "",
          document_url: "",
          order: 1,
        },
      ],
    };

    const updatedDocs = [...docs, newDoc];

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        docs: updatedDocs,
      },
    });
  };

  const handleDocRemove = (docIndex: number) => {
    const updatedDocs = (currentBlock.content?.docs || [])
      .filter((_item: unknown, i: number) => i !== docIndex)
      .map((doc: any, newIndex: number) => ({
        ...doc,
        sortOrder: newIndex + 1,
      }));

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        docs: updatedDocs,
      },
    });
  };

  const handleDocChange = (docIndex: number, label: string, value: string) => {
    const updatedDocs = [...currentBlock.content?.docs];

    const updateDoc = { ...updatedDocs[docIndex], [label]: value };
    updatedDocs[docIndex] = updateDoc;
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        docs: updatedDocs,
      },
    });
  };

  const reorderDocs = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.docs) return;

    const docsCopy = currentBlock.content.docs.map((doc: any) => ({ ...doc }));

    // Ensure valid indices
    if (toIndex < 0 || toIndex >= docsCopy.length) return;

    // Move the doc
    const [movedDoc] = docsCopy.splice(fromIndex, 1);
    docsCopy.splice(toIndex, 0, movedDoc);

    // Reassign sortOrder
    const reorderedDocs = docsCopy.map((doc: any, index: number) => ({
      ...doc,
      sortOrder: index + 1,
    }));

    // Update state
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        docs: reorderedDocs,
      },
    });
  };

  return (
    <>
      {currentBlock?.content?.docs?.map((doc: any, docIndex: number) => {
        const totalDocs = currentBlock.content.docs.length;
        const isFirst = docIndex === 0;
        const isLast = docIndex === totalDocs - 1;
        return (
          <div key={doc?.sortOrder} className="p-3 bg-f6f6f6 rounded-2xl mb-5">
            <div className="flex items-center gap-2 justify-end">
              {totalDocs > 1 && !isFirst && (
                <Button
                  icon={arrowUpIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => reorderDocs(docIndex, docIndex - 1)}
                />
              )}
              {totalDocs > 1 && !isLast && (
                <Button
                  icon={arrowDownIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => reorderDocs(docIndex, docIndex + 1)}
                />
              )}
              {totalDocs > 1 && (
                <Button
                  icon={closeIcon}
                  backgroundColor="transparent"
                  onClick={() => handleDocRemove(docIndex)}
                  className="p-0 w-5"
                />
              )}
            </div>
            <Input
              label="Title"
              className="md:mb-2"
              value={doc.title ?? ""}
              onChange={(e) =>
                handleDocChange(docIndex, "title", e.target.value)
              }
            />
            <div className="relative mb-3">
              <label
                htmlFor="desc"
                className="block md:text-base/4 text-sm mb-2 font-medium"
              >
                Description
              </label>
              <textarea
                id="desc"
                placeholder="Enter Description"
                className="w-full p-3 text-base border-0.5 border-primary rounded-2xl pr-10 resize-none"
                rows={2}
                value={doc?.description ?? ""}
                onChange={(e) =>
                  handleDocChange(docIndex, "description", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2">
                <div className="h-sp100 w-full flex flex-col gap-2">
                  <div
                    className="h-full border-0.5 rounded-xl border-primary flex items-center justify-center"
                    onClick={() => handleSubDocAdd(docIndex)}
                  >
                    <PlusIcon size={15} />
                  </div>
                </div>
              </div>
              <div className="col-span-10">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, docIndex)}
                >
                  <SortableContext
                    items={doc.subDocs.map((sd: any) => sd.order)}
                    strategy={rectSortingStrategy}
                  >
                    <div className="grid grid-cols-5 gap-2">
                      {doc.subDocs.map((subDoc: any, subIndex: number) => (
                        <SortableDocItem
                          key={subDoc.id}
                          doc={subDoc}
                          onEdit={() =>
                            setShow({ docIndex, order: subDoc.order })
                          }
                          onRemove={() =>
                            handleSubDocRemove(docIndex, subIndex)
                          }
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
                {show && show.docIndex === docIndex && (
                  <DocumentAdd
                    open={!!show}
                    onClose={() => setShow(null)}
                    initialData={
                      show?.docIndex === docIndex
                        ? doc.subDocs.find(
                            (sd: any) => sd.order === show?.order
                          )
                        : null
                    }
                    onSubmitMedia={(data: any) =>
                      handleUpdate(data, show?.order, show?.docIndex)
                    }
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}

      <Button
        text="Add Document"
        icon={plusIcon}
        backgroundColor="transparent"
        className="addSideBarBtn relative p-0"
        onClick={handleAddDocument}
      />

      <MoreFieldsRenderer
        currentBlock={currentBlock}
        onChangeBlock={onChangeBlock}
        moreFields={moreFields}
        setMoreFields={setMoreFields}
      />
      <div className="mt-5  md:gap-8 gap-2 flex items-center">
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

export default DocumentBlock;
