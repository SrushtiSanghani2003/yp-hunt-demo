import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy, // ✅ use this for grid layouts
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PageImageMedia from "./PageImageMedia";
import PageVideoMedia from "./PageVideoMedia";
import PageNewsMedia from "./PageNewsMedia";
import PageHighlightMedia from "./PageHighlightMedia";

function SortableMediaItem({ media }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: media.sort_order });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Your media component stays fully clickable */}
      {media.media_type === "image" ? (
        <PageImageMedia sortOrder={media.sort_order} media={media} />
      ) : media.media_type === "video" ? (
        <PageVideoMedia sortOrder={media.sort_order} media={media} />
      ) : media.media_type === "news" ? (
        <PageNewsMedia sortOrder={media.sort_order} media={media} />
      ) : (
        <PageHighlightMedia sortOrder={media.sort_order} media={media} />
      )}

      {/* Drag handle (top-right corner for example) */}
      <button
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 left-2 cursor-grab bg-primary px-1 rounded"
      >
        ⠿
      </button>
    </div>
  );
}

export default function HeroMediaGrid({ pages, updateMediaOrder }: any) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = pages.hero_media.findIndex(
        (m: any) => m.sort_order === active.id
      );
      const newIndex = pages.hero_media.findIndex(
        (m: any) => m.sort_order === over.id
      );

      const reordered = arrayMove(pages.hero_media, oldIndex, newIndex);

      // ✅ Reassign sort_order after reordering
      const updated = reordered.map((m: any, idx: number) => ({
        ...m,
        sort_order: idx + 1,
      }));

      updateMediaOrder(updated);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={pages.hero_media.map((m: any) => m.sort_order)}
        strategy={rectSortingStrategy} // ✅ instead of vertical list
      >
        <div className="grid grid-cols-5 gap-2">
          {pages.hero_media.map((media: any) => {
            return <SortableMediaItem key={media.sort_order} media={media} />;
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
