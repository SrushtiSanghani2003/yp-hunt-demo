import { PlusIcon, PlayIcon } from "lucide-react";
import { useState } from "react";
import { closeIcon, newsIcon, videosIcon } from "../../icons";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import { concatImgURL } from "../../config/function";

/* DND */
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
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import MediaSelectModal from "./MediaSelectModal/MediaSelectModal";
type NewsSelectedValue =
  | { type: "latest" }
  | { type: "manual"; news_id: number; title: string };

type VideoSelectedValue = string;

type MediaSelectedValue = NewsSelectedValue | VideoSelectedValue;

type MediaItem = {
  id: number;
  media_type: "news" | "video";
  image_url?: string;
  video_thumbnail?: string;
  sort_order: number;
  selected_value?: MediaSelectedValue;
};

const MAX_MEDIA = 10;

/* ---------------- SORTABLE ITEM ---------------- */
const SortableMediaItem = ({
  media,
  onDelete,
  onClick,
}: {
  media: MediaItem;
  onDelete: () => void;
  onClick: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: media.sort_order });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className="relative h-sp100 rounded-2xl border-0.5 border-primary overflow-hidden cursor-pointer"
    >
      {/* MEDIA */}
      {media.media_type === "news" ? (
        media.image_url ? (
          <img
            src={concatImgURL(media.image_url)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full bg-f6f6f6 flex flex-col items-center justify-center gap-1">
            {!media.selected_value && <img src={newsIcon} />}

            {media.selected_value &&
              typeof media.selected_value === "object" && (
                <span className="px-2 py-0.5 text-xs rounded-md capitalize   bg-primary text-black font-medium text-center line-clamp-2">
                  {media.selected_value.type === "latest"
                    ? "Latest News"
                    : media.selected_value.title}
                </span>
              )}
          </div>
        )
      ) : media.video_thumbnail ? (
        <>
          <img
            src={concatImgURL(media.video_thumbnail)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1">
            <PlayIcon className="w-6 h-6 text-white" />
            {media.selected_value &&
              typeof media.selected_value === "string" && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-white">
                  {media.selected_value}
                </span>
              )}
          </div>
        </>
      ) : (
        <div className="h-full bg-f6f6f6 flex flex-col items-center justify-center gap-1">
          {!media.selected_value && <img src={videosIcon} />}
          {media.selected_value && typeof media.selected_value === "string" && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-primary text-black font-medium capitalize">
              {media.selected_value == "moment_video"
                ? "Moment Video"
                : media.selected_value}
            </span>
          )}
        </div>
      )}

      {/* DELETE */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-1 right-1 z-10"
      >
        <img src={closeIcon} />
      </button>

      {/* DRAG */}
      <button
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1 left-1 bg-primary text-black px-1 rounded cursor-grab"
      >
        ⠿
      </button>
    </div>
  );
};

/* ---------------- MAIN BLOCK ---------------- */
const MixMediaBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const mediaList: MediaItem[] = currentBlock.content.media || [];
  const totalMediaCount = mediaList.length;

  /* ---------- UPDATE HELPERS ---------- */
  const updateMedia = (media: MediaItem[]) => {
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        media,
      },
    });
  };

  const addMedia = (type: "news" | "video") => {
    if (totalMediaCount >= MAX_MEDIA) return;

    let selected_value: MediaSelectedValue;

    if (type === "news") {
      selected_value = { type: "latest" }; // ✅ exact literal
    } else {
      selected_value = "highlight"; // ✅ valid VideoSelectedValue
    }

    updateMedia([
      ...mediaList,
      {
        id: Date.now(),
        media_type: type,
        sort_order: mediaList.length + 1,
        selected_value,
      },
    ]);
  };
  const deleteMedia = (id: number) => {
    const updated = mediaList
      .filter((m) => m.id !== id)
      .map((m, idx) => ({ ...m, sort_order: idx + 1 }));

    updateMedia(updated);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = mediaList.findIndex((m) => m.sort_order === active.id);
    const newIndex = mediaList.findIndex((m) => m.sort_order === over.id);

    const reordered = arrayMove(mediaList, oldIndex, newIndex).map(
      (m, idx) => ({ ...m, sort_order: idx + 1 })
    );

    updateMedia(reordered);
  };

  return (
    <>
      {/* FEATURE MEDIA */}
      <div className="mt-2">
        <p className="font-medium mb-2">
          Feature Media<sup>*</sup>
        </p>

        <div className="grid grid-cols-12 gap-2">
          {/* ADD BUTTONS */}
          <div className="col-span-2">
            <div className="flex flex-col gap-2 h-sp100">
              {/* News Button */}
              <div
                onClick={() => totalMediaCount < MAX_MEDIA && addMedia("news")}
                className={`h-1/2 border-1 border-primary rounded-xl flex items-center justify-center gap-2
        ${
          totalMediaCount >= MAX_MEDIA
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
              >
                News <PlusIcon size={14} />
              </div>

              {/* Video Button */}
              <div
                onClick={() => totalMediaCount < MAX_MEDIA && addMedia("video")}
                className={`h-1/2 border-1 border-primary rounded-xl flex items-center justify-center gap-2
        ${
          totalMediaCount >= MAX_MEDIA
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
              >
                Video <PlusIcon size={14} />
              </div>
            </div>
          </div>

          {/* MEDIA GRID */}
          <div className="col-span-10">
            {mediaList.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={mediaList.map((m) => m.sort_order)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-5 gap-2">
                    {mediaList.map((media) => (
                      <SortableMediaItem
                        key={media.id}
                        media={media}
                        onDelete={() => deleteMedia(media.id)}
                        onClick={() => {
                          setActiveMedia(media);
                          setIsModalOpen(true);
                        }}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </div>

      {/* MEDIA SELECT MODAL */}
      <MediaSelectModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveMedia(null);
        }}
        mediaType={activeMedia?.media_type || null}
        selectedValue={activeMedia?.selected_value} // <-- pass the current selection
        onSave={(value) => {
          if (!activeMedia) return;
          updateMedia(
            mediaList.map((m) =>
              m.id === activeMedia.id ? { ...m, selected_value: value } : m
            )
          );
          setIsModalOpen(false);
          setActiveMedia(null);
        }}
      />

      {/* BLOCK TYPE */}
      <div className="mt-4">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
      </div>
    </>
  );
};

export default MixMediaBlock;
