// TreeNode.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// DnD Kit imports
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../lib/api";
import { showToast } from "../../../utils/toastUtils";
import { deleteIcon, penIcon } from "../../../icons";
import DeleteConfirmModal from "../../articles/DeleteConfirmModal";
import { resetNavigation } from "../../../redux-toolkit/navigationSlice";
import { getPermissionFlags } from "../../sidebar/menuPermissions";
import { selectMenuPermissions } from "../../../redux-toolkit/menuPermissionsSlice";

type MenuItem = {
  id: number;
  title: string;
  languages?: string[];
  children?: MenuItem[];
  sort_order?: number;
};

export default function TreeNode({
  node,
  level,
  parentPath,
  onUpdateChildren,
  dragHandleListeners,
  dragHandleAttributes,
  openState,
  setOpenState,
}: {
  node: MenuItem;
  level: number;
  parentPath: number[];
  onUpdateChildren: (parentPath: number[], newChildren: MenuItem[]) => void;
  dragHandleListeners?: any;
  dragHandleAttributes?: any;
  openState: Map<number, boolean>;
  setOpenState: React.Dispatch<React.SetStateAction<Map<number, boolean>>>;
}) {
  const isOpen = openState.get(node.id) ?? true;

  const toggleOpen = () => {
    setOpenState((prev) => {
      const copy = new Map(prev);
      copy.set(node.id, !isOpen);
      return copy;
    });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [localChildren, setLocalChildren] = useState<MenuItem[]>(
    node.children || [],
  );
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isUpdate, isDelete } = getPermissionFlags(menuPermissions.navigation);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initialized = (node.children || []).map((c) => ({
      ...c,
      sort_order: c.sort_order ?? 1,
    }));
    setLocalChildren(initialized);
  }, [node.children]);

  // react-query delete (same as earlier)
  const deletePage = async (id: string) => {
    return await api.delete(`/menu/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deletePage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["navigation"],
        exact: false,
      });
      showToast("Navigation deleted successfully", "success");
      setShowDeleteModal(false);
      dispatch(resetNavigation());
    },
    onError: () => {
      console.error("Failed to delete a page");
    },
  });

  const hasChildren = localChildren && localChildren.length > 0;

  // const toggleOpen = () => {
  //     setOpen((prev) => {
  //         const newState = !prev;
  //         return newState;
  //     });
  // };

  const handleEditPage = (id: number | string) => {
    if (!id) return;
    navigate(`/navigation/edit/${id}`);
  };

  const handleTranslationClick = async (pagesId: string, lang: "en" | "es") => {
    navigate(`/navigation/edit/${pagesId}?lang=${lang}`);
  };

  // --- DnD Kit setup for this node's children ---
  const sensors = useSensors(useSensor(PointerSensor));
  const ids = useMemo(
    () => localChildren.map((c) => String(c.id)),
    [localChildren],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    const newChildren = arrayMove(localChildren, oldIndex, newIndex).map(
      (c, idx) => ({
        ...c,
        sort_order: idx + 1,
      }),
    );
    setLocalChildren(newChildren);
    // Inform parent to update global menus state
    // parentPath points to this node's id — so children live at path = parentPath
    onUpdateChildren(parentPath, newChildren);
  };

  // Sortable item component
  function SortableItem({
    id,
    children,
  }: {
    id: string;
    children: React.ReactNode;
  }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    } as React.CSSProperties;

    // Pass listeners & attributes into children (TreeNode)
    return (
      <div ref={setNodeRef} style={style}>
        {React.cloneElement(children as any, {
          dragHandleListeners: listeners,
          dragHandleAttributes: attributes,
        })}
      </div>
    );
  }

  return (
    <div
      className={`w-full border border-primary ${
        level === 0 ? "border-0" : ""
      } rounded-xl select-none my-1`}
    >
      <div
        className={`
    group flex items-center justify-between px-3 py-2 select-none transition-all duration-200 rounded-xl
    ${
      isOpen &&
      (level === 0 || // Level 0 always blue when open
        (level === 1 && hasChildren)) // Level 1 blue only if it has children
        ? "bg-blue-50/60"
        : "hover:bg-gray-50"
    }
  `}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* DRAG HANDLE */}
          {dragHandleListeners && (
            <span
              {...dragHandleListeners}
              {...dragHandleAttributes}
              onClick={(e) => e.stopPropagation()}
              className="cursor-grab active:cursor-grabbing text-gray-400"
            >
              <GripVertical size={16} />
            </span>
          )}

          {/* TITLE */}
          <span
            className={
              level === 0
                ? "font-semibold text-gray-900"
                : "font-medium text-gray-700"
            }
          >
            {node.title}
          </span>

          {/* COLLAPSE BUTTON */}
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleOpen();
              }}
              type="button"
              aria-label={isOpen ? "Collapse" : "Expand"}
              className="text-gray-500 hover:text-blue-600 ml-2"
            >
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* {level > 0 && (
                        <span className="text-sm text-gray-500 mr-4">
                            {node.sort_order}
                        </span>
                    )} */}

          {["en", "es"].map((lang) => {
            const active = node?.languages?.includes(lang);
            return (
              <button
                key={lang}
                disabled={!isUpdate}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTranslationClick(String(node.id), lang as "en" | "es");
                }}
                className={`h-7 px-3 flex items-center justify-center text-xs font-medium rounded-md border transition-all select-none ${
                  !isUpdate
                    ? "opacity-50 cursor-not-allowed bg-green-600 text-white border-green-700 shadow-sm"
                    : active
                      ? "bg-green-600 text-white border-green-700 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                } `}
              >
                {lang.toUpperCase()}
              </button>
            );
          })}

          <button
            disabled={!isUpdate}
            onClick={(e) => {
              e.stopPropagation();
              handleEditPage(node.id);
            }}
            className={`h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition-all shadow-sm ${
              !isUpdate && "opacity-50 cursor-not-allowed"
            }`}
          >
            <img src={penIcon} alt="icon" className={"w-4 h-4"} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
            disabled={!isDelete}
            className={`h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-red-50 transition-all shadow-sm ${!isDelete && "opacity-50 cursor-not-allowed"}`}
          >
            <img src={deleteIcon} alt="icon" className={"w-4 h-4"} />
          </button>
        </div>
      </div>

      {/* children list with dnd */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isOpen && hasChildren && (
          <div className="mx-4 pl-1 my-2 space-y-2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={localChildren.map((c) => String(c.id))}
                strategy={verticalListSortingStrategy}
              >
                {localChildren.map((child) => (
                  <SortableItem key={child.id} id={String(child.id)}>
                    <TreeNode
                      node={child}
                      level={level + 1}
                      parentPath={[...parentPath]}
                      onUpdateChildren={(path, newChildList) => {
                        const updated = localChildren.map((lc) =>
                          lc.id === child.id
                            ? { ...lc, children: newChildList }
                            : lc,
                        );

                        setLocalChildren(updated);
                        onUpdateChildren(path, updated);
                      }}
                      // dragHandleListeners={undefined}   // or pass actual listeners if needed
                      // dragHandleAttributes={undefined}  // or pass actual attributes if needed
                      openState={openState} // ✅ REQUIRED
                      setOpenState={setOpenState} // ✅ REQUIRED
                    />
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            if (node?.id) deleteMutation.mutate(String(node.id));
          }}
          itemName={node?.title}
          isLoading={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
