import { useEditor } from "@craftjs/core";
import {
  ChevronRight, ChevronDown, Eye, EyeOff,
  GripVertical, Trash2, Copy,
} from "lucide-react";
import { useState, useCallback, useRef } from "react";

// ---- drag-and-drop state shared across all LayerNode instances ----
let draggedNodeId: string | null = null;
let dropTargetId: string | null = null;
let dropPosition: "before" | "inside" | "after" | null = null;

interface LayerNodeProps {
  nodeId: string;
  depth: number;
  onDragStateChange: () => void;
  dropTarget: string | null;
  dropPos: "before" | "inside" | "after" | null;
}

function LayerNode({ nodeId, depth, onDragStateChange, dropTarget, dropPos }: LayerNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const rowRef = useRef<HTMLDivElement>(null);

  const { node, isSelected, isHovered, actions, query } = useEditor((state) => {
    const n = state.nodes[nodeId];
    return {
      node: n
        ? {
            id: nodeId,
            name: n.data.custom?.displayName || n.data.displayName || n.data.name || "Element",
            children: n.data.nodes || [],
            linkedNodes: n.data.linkedNodes ? Object.values(n.data.linkedNodes) : [],
            hidden: n.data.hidden,
            isCanvas: n.data.isCanvas,
          }
        : null,
      isSelected: state.events.selected?.has(nodeId) || false,
      isHovered: state.events.hovered?.has(nodeId) || false,
    };
  });

  const isDeletable = node ? query.node(nodeId).isDeletable() : false;

  const handleSelect = useCallback(() => {
    actions.selectNode(nodeId);
  }, [nodeId, actions]);

  const handleToggleVisibility = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      actions.setHidden(nodeId, !node?.hidden);
    },
    [nodeId, node?.hidden, actions]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDeletable) {
        actions.delete(nodeId);
      }
    },
    [nodeId, isDeletable, actions]
  );

  const handleDuplicate = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        const { data: nodeData } = query.node(nodeId).get();
        const parentId = nodeData.parent;
        if (!parentId) return;

        const freshNode = query
          .parseFreshNode({
            data: {
              type: nodeData.type,
              props: { ...nodeData.props },
              isCanvas: nodeData.isCanvas,
              custom: nodeData.custom,
            },
          })
          .toNode();

        actions.add(freshNode, parentId);
      } catch (err) {
        console.warn("Failed to duplicate node:", err);
      }
    },
    [nodeId, query, actions]
  );

  // ---- Drag handlers ----
  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation();
      draggedNodeId = nodeId;
      e.dataTransfer.effectAllowed = "move";
      // Ghost image
      if (rowRef.current) {
        e.dataTransfer.setDragImage(rowRef.current, 0, 0);
      }
    },
    [nodeId]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!draggedNodeId || draggedNodeId === nodeId) return;

      // Prevent dropping onto own descendants
      try {
        const ancestors = getAncestors(draggedNodeId, query);
        if (ancestors.includes(nodeId)) return;
      } catch { /* ignore */ }

      const rect = rowRef.current?.getBoundingClientRect();
      if (!rect) return;

      const y = e.clientY - rect.top;
      const height = rect.height;

      let pos: "before" | "inside" | "after";
      if (node?.isCanvas) {
        // Canvas nodes: top 25% = before, middle 50% = inside, bottom 25% = after
        if (y < height * 0.25) pos = "before";
        else if (y > height * 0.75) pos = "after";
        else pos = "inside";
      } else {
        // Non-canvas: top half = before, bottom half = after
        if (y < height * 0.5) pos = "before";
        else pos = "after";
      }

      dropTargetId = nodeId;
      dropPosition = pos;
      onDragStateChange();
    },
    [nodeId, node?.isCanvas, query, onDragStateChange]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation();
      if (dropTargetId === nodeId) {
        dropTargetId = null;
        dropPosition = null;
        onDragStateChange();
      }
    },
    [nodeId, onDragStateChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!draggedNodeId || !dropTargetId || !dropPosition) {
        cleanupDrag();
        onDragStateChange();
        return;
      }

      if (draggedNodeId === dropTargetId) {
        cleanupDrag();
        onDragStateChange();
        return;
      }

      try {
        const targetNodeData = query.node(dropTargetId).get();
        const targetParent = targetNodeData.data.parent;

        if (dropPosition === "inside" && targetNodeData.data.isCanvas) {
          // Move into this canvas container
          actions.move(draggedNodeId, dropTargetId, 0);
        } else if (targetParent) {
          // Move before/after the target node within its parent
          const parentData = query.node(targetParent).get();
          const siblings = parentData.data.nodes || [];
          let targetIndex = siblings.indexOf(dropTargetId);
          if (targetIndex === -1) targetIndex = siblings.length;
          if (dropPosition === "after") targetIndex += 1;

          // If moving within the same parent, account for removal
          const draggedData = query.node(draggedNodeId).get();
          if (draggedData.data.parent === targetParent) {
            const draggedIndex = siblings.indexOf(draggedNodeId);
            if (draggedIndex !== -1 && draggedIndex < targetIndex) {
              targetIndex -= 1;
            }
          }

          actions.move(draggedNodeId, targetParent, targetIndex);
        }
      } catch (err) {
        console.warn("Failed to move node:", err);
      }

      cleanupDrag();
      onDragStateChange();
    },
    [query, actions, onDragStateChange]
  );

  if (!node) return null;

  const allChildren = [...node.children, ...node.linkedNodes];
  const hasChildren = allChildren.length > 0;
  const isRoot = nodeId === "ROOT";

  // Drop indicator styles
  const isDropTarget = dropTarget === nodeId;
  const showTopLine = isDropTarget && dropPos === "before";
  const showBottomLine = isDropTarget && dropPos === "after";
  const showInsideHighlight = isDropTarget && dropPos === "inside";

  return (
    <div>
      {!isRoot && (
        <div
          ref={rowRef}
          onClick={handleSelect}
          draggable={isDeletable}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            padding: "5px 6px",
            paddingLeft: `${depth * 16 + 6}px`,
            cursor: isDeletable ? "grab" : "pointer",
            backgroundColor: showInsideHighlight
              ? "#dbeafe"
              : isSelected
              ? "#FEF9C3"
              : isHovered
              ? "#f3f4f6"
              : "transparent",
            borderLeft: isSelected ? "2px solid #FCD100" : "2px solid transparent",
            borderTop: showTopLine ? "2px solid #3b82f6" : "2px solid transparent",
            borderBottom: showBottomLine ? "2px solid #3b82f6" : "2px solid transparent",
            transition: "background-color 0.1s ease",
            fontSize: "12px",
            userSelect: "none",
            position: "relative",
          }}
        >
          {/* Drag handle */}
          {isDeletable && (
            <span
              style={{
                color: "#d1d5db",
                cursor: "grab",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <GripVertical size={11} />
            </span>
          )}

          {/* Expand/collapse */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "1px",
                display: "flex",
                color: "#9ca3af",
                flexShrink: 0,
              }}
            >
              {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          ) : (
            <span style={{ width: "14px", flexShrink: 0 }} />
          )}

          {/* Type icon */}
          <span
            style={{
              fontSize: "10px",
              color: node.isCanvas ? "#8b5cf6" : "#6b7280",
              fontWeight: 600,
              marginRight: "3px",
              fontFamily: "monospace",
              flexShrink: 0,
            }}
          >
            {node.isCanvas ? "▣" : "◆"}
          </span>

          {/* Name */}
          <span
            style={{
              flex: 1,
              fontWeight: isSelected ? 600 : 400,
              color: node.hidden ? "#d1d5db" : isSelected ? "#1f2937" : "#4b5563",
              textDecoration: node.hidden ? "line-through" : "none",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {node.name}
          </span>

          {/* Action buttons — always visible */}
          <div
            className="layer-actions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1px",
              opacity: 1,
              transition: "opacity 0.15s",
              flexShrink: 0,
            }}
          >
            {/* Duplicate */}
            <button
              onClick={handleDuplicate}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                color: "#9ca3af",
                borderRadius: "3px",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#3b82f6";
                (e.currentTarget as HTMLElement).style.backgroundColor = "#eff6ff";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#9ca3af";
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
              title="Duplicate"
            >
              <Copy size={11} />
            </button>

            {/* Visibility */}
            <button
              onClick={handleToggleVisibility}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                color: node.hidden ? "#d1d5db" : "#9ca3af",
                borderRadius: "3px",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#6b7280";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.color = node?.hidden ? "#d1d5db" : "#9ca3af";
              }}
              title={node.hidden ? "Show" : "Hide"}
            >
              {node.hidden ? <EyeOff size={11} /> : <Eye size={11} />}
            </button>

            {/* Delete */}
            {isDeletable && (
              <button
                onClick={handleDelete}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                  display: "flex",
                  color: "#9ca3af",
                  borderRadius: "3px",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#ef4444";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#fef2f2";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#9ca3af";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
                title="Delete"
              >
                <Trash2 size={11} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Children */}
      {(expanded || isRoot) &&
        allChildren.map((childId: string) => (
          <LayerNode
            key={childId}
            nodeId={childId}
            depth={isRoot ? 0 : depth + 1}
            onDragStateChange={onDragStateChange}
            dropTarget={dropTarget}
            dropPos={dropPos}
          />
        ))}
    </div>
  );
}

/** Walk up the tree to collect ancestors (prevents dropping into own children) */
function getAncestors(nodeId: string, query: any): string[] {
  const ancestors: string[] = [];
  const visited = new Set<string>();
  let current = nodeId;

  while (current) {
    if (visited.has(current)) break;
    visited.add(current);

    try {
      const nodeData = query.node(current).get();
      const children = nodeData.data.nodes || [];
      const linked = nodeData.data.linkedNodes
        ? Object.values(nodeData.data.linkedNodes) as string[]
        : [];
      ancestors.push(...children, ...linked);

      // Recurse into children
      for (const childId of [...children, ...linked]) {
        if (!visited.has(childId)) {
          ancestors.push(...getAncestorsDeep(childId, query, visited));
        }
      }
    } catch {
      break;
    }
    break; // Only process the dragged node's descendants
  }

  return ancestors;
}

function getAncestorsDeep(nodeId: string, query: any, visited: Set<string>): string[] {
  if (visited.has(nodeId)) return [];
  visited.add(nodeId);

  const result: string[] = [];
  try {
    const nodeData = query.node(nodeId).get();
    const children = nodeData.data.nodes || [];
    const linked = nodeData.data.linkedNodes
      ? Object.values(nodeData.data.linkedNodes) as string[]
      : [];
    result.push(...children, ...linked);
    for (const childId of [...children, ...linked]) {
      result.push(...getAncestorsDeep(childId, query, visited));
    }
  } catch { /* ignore */ }
  return result;
}

function cleanupDrag() {
  draggedNodeId = null;
  dropTargetId = null;
  dropPosition = null;
}

export function LayersPanel() {
  // Force re-render when drag state changes
  const [, setRenderTick] = useState(0);
  const triggerRender = useCallback(() => setRenderTick((t) => t + 1), []);

  return (
    <div
      className="p-2"
      onDragEnd={() => {
        cleanupDrag();
        triggerRender();
      }}
    >
      <h3
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          margin: "4px 0 8px 4px",
        }}
      >
        Element Tree
      </h3>
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          overflow: "hidden",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <LayerNode
          nodeId="ROOT"
          depth={0}
          onDragStateChange={triggerRender}
          dropTarget={dropTargetId}
          dropPos={dropPosition}
        />
      </div>
      <p
        style={{
          fontSize: "10px",
          color: "#9ca3af",
          marginTop: "8px",
          paddingLeft: "4px",
        }}
      >
        Drag layers to reorder. Drop onto containers to nest.
      </p>
    </div>
  );
}

export default LayersPanel;
