import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "../../ui/button";
import { closeIcon } from "../../../icons";
import { FileText } from "lucide-react";

export function SortableDocItem({ doc, onEdit, onRemove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: doc.order });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        className="flex items-center justify-center md:h-sp100 h-20 md:gap-4 gap-2 bg-white rounded-2xl"
        onClick={onEdit}
      >
        <div className="flex flex-col justify-center items-center">
          <FileText size={30} className="text-red-500" />
          {doc.doc_name && (
            <p className="text-xs text-center mt-1 line-clamp-1">
              {doc.doc_name}
            </p>
          )}
        </div>
      </div>

      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 cursor-grab bg-primary px-0.5 rounded shadow"
        onClick={(e) => e.stopPropagation()}
      >
        ⠿
      </button>

      <Button
        icon={closeIcon}
        backgroundColor="white md:p-0.5"
        className="absolute top-1 right-1"
        imageclassName="w-4 h-4"
        onClick={onRemove}
      />
    </div>
  );
}
