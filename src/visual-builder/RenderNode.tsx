import { useNode, useEditor } from "@craftjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { Move, Trash2, Copy, ChevronUp, ArrowUp, ArrowDown, FileText, Paintbrush } from "lucide-react";
import ReactDOM from "react-dom";
import { useBlockMode } from "./contexts/BlockModeContext";

/**
 * Stable, module-level handler for stopping native event propagation.
 * Used on the toolbar DOM element to prevent Craft.js canvas handlers
 * from deselecting the node when toolbar buttons are clicked/dragged.
 * ONLY stops mousedown/pointerdown — NOT click (React onClick still works).
 */
function stopNativePropagation(e: Event) {
  e.stopPropagation();
}

/**
 * Custom RenderNode — wraps every Craft.js node with:
 * - Hover outline (blue dashed)
 * - Selection outline (yellow solid) with floating toolbar
 * - Drag handle (only via toolbar grip icon)
 * - Resize handles (8 points: 4 corners + 4 midpoints)
 * - Full-screen overlay during resize to prevent focus loss
 * - Component name badge
 * - Delete / Duplicate / Move Up / Move Down / Select Parent actions
 */
export const RenderNode = ({ render }: { render: React.ReactNode }) => {
  const { id, actions, isActive, isHover, dom, name, parent } =
    useNode((node) => ({
      isActive: node.events.selected,
      isHover: node.events.hovered,
      dom: node.dom,
      name: node.data.custom?.displayName || node.data.displayName || node.data.name || "Element",
      parent: node.data.parent,
    }));

  const { enabled, actions: editorActions, query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const { mode: blockMode, setMode: setBlockMode } = useBlockMode();

  const moveable = query.node(id).isDraggable();
  const deletable = query.node(id).isDeletable();
  const isTextNode = name === "Text" || name === "CraftText";

  /**
   * Toolbar ref callback — attaches NATIVE mousedown/pointerdown
   * stopPropagation so Craft.js doesn't deselect the node when
   * the user interacts with toolbar buttons. We only block
   * mousedown/pointerdown (not click), so React's onClick delegation
   * continues to work for button actions.
   */
  const prevToolbarEl = useRef<HTMLDivElement | null>(null);
  const setToolbarRef = useCallback((el: HTMLDivElement | null) => {
    // Clean up previous element
    if (prevToolbarEl.current) {
      prevToolbarEl.current.removeEventListener("mousedown", stopNativePropagation);
      prevToolbarEl.current.removeEventListener("pointerdown", stopNativePropagation);
    }
    // Attach native listeners to new element
    if (el) {
      el.addEventListener("mousedown", stopNativePropagation);
      el.addEventListener("pointerdown", stopNativePropagation);
    }
    prevToolbarEl.current = el;
  }, []);

  // Resize state
  const [isResizing, setIsResizing] = useState(false);
  const [resizeSize, setResizeSize] = useState<{ w: number; h: number } | null>(null);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    direction: string;
  } | null>(null);

  // Add hover/selection styles to the DOM element
  useEffect(() => {
    if (!dom || !enabled) return;

    if (isActive) {
      dom.style.outline = "2px solid #FCD100";
      dom.style.outlineOffset = "-1px";
      if (!dom.style.position || dom.style.position === "static") {
        dom.style.position = "relative";
      }
    } else if (isHover) {
      dom.style.outline = "1px dashed #60a5fa";
      dom.style.outlineOffset = "-1px";
    } else {
      dom.style.outline = "none";
      dom.style.outlineOffset = "";
    }

    return () => {
      if (dom) {
        dom.style.outline = "none";
        dom.style.outlineOffset = "";
      }
    };
  }, [dom, isActive, isHover, enabled]);

  /**
   * Free-position drag system.
   *
   * KEY DESIGN: We commit position:absolute to Craft.js props IMMEDIATELY
   * at the start of the drag so that any React re-renders during the drag
   * preserve the absolute positioning. Direct DOM manipulation is used for
   * smooth frame-by-frame movement. Final position is committed on mouseup.
   *
   * The position indicator label is also managed via direct DOM (not React
   * state) to avoid triggering re-renders mid-drag which would cause jank.
   *
   * Flow: mousedown → commit absolute to Craft.js + lock parent height →
   *       mousemove (DOM only, zero re-renders) → mouseup (commit final pos)
   */
  const startFreeMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!dom) return;

      // Snapshot the element's current rendered position
      const startTop = dom.offsetTop;
      const startLeft = dom.offsetLeft;
      const startMouseX = clientX;
      const startMouseY = clientY;

      // ── Lock parent container height BEFORE child goes absolute ──
      // When a child becomes position:absolute it leaves flex flow, which
      // causes the parent container to shrink (often to minHeight: 60px).
      // We lock the parent's current rendered height so the background
      // image area stays full-size and the user can position blocks
      // anywhere within it.
      const parentEl = dom.parentElement as HTMLElement | null;
      let parentNodeId: string | null = null;
      let lockedParentHeight = 0;

      if (parentEl) {
        lockedParentHeight = parentEl.offsetHeight;
        parentEl.style.minHeight = `${lockedParentHeight}px`;

        // Get the Craft.js parent node id for committing on mouseup
        try {
          const nodeData = query.node(id).get();
          parentNodeId = nodeData.data.parent || null;
        } catch {
          // If query fails, we still have the DOM lock
        }
      }

      // ── Commit absolute position to Craft.js IMMEDIATELY ──
      // This is critical: any React re-render during the drag will
      // re-apply Craft.js props. If those props still say "relative",
      // the element snaps back. By committing now, re-renders are safe.
      actions.setProp((props: any) => {
        props.position = "absolute";
        props.top = `${startTop}px`;
        props.left = `${startLeft}px`;
      });

      // Also commit parent height to Craft.js immediately so re-renders
      // of the parent container don't shrink it
      if (parentNodeId && lockedParentHeight > 0) {
        editorActions.setProp(parentNodeId, (props: any) => {
          const currentMin = parseInt(props.minHeight || "60", 10);
          if (lockedParentHeight > currentMin) {
            props.minHeight = `${lockedParentHeight}px`;
          }
        });
      }

      // Direct DOM for instant visual positioning (backup for any render lag)
      dom.style.position = "absolute";
      dom.style.top = `${startTop}px`;
      dom.style.left = `${startLeft}px`;
      dom.style.zIndex = "10";
      dom.style.cursor = "move";

      // ── Position indicator label (pure DOM — no React state) ──
      const canvasRoot = dom.closest(".vb-canvas-root") || dom.parentElement || document.body;
      const posLabel = document.createElement("div");
      posLabel.id = "vb-move-pos-label";
      posLabel.style.cssText = `
        position: absolute; z-index: 60;
        background: rgba(0,0,0,0.85); color: #67e8f9;
        font-size: 11px; font-weight: 700; font-family: monospace;
        padding: 3px 8px; border-radius: 4px;
        pointer-events: none; white-space: nowrap;
      `;
      posLabel.textContent = `x: ${startLeft}  y: ${startTop}`;
      posLabel.style.top = `${startTop + dom.offsetHeight + 8}px`;
      posLabel.style.left = `${startLeft}px`;
      canvasRoot.appendChild(posLabel);

      // Full-screen overlay to capture all mouse events
      const overlay = document.createElement("div");
      overlay.id = "vb-move-overlay";
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 99999;
        cursor: move; user-select: none; -webkit-user-select: none;
      `;
      document.body.appendChild(overlay);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();

        const deltaX = moveEvent.clientX - startMouseX;
        const deltaY = moveEvent.clientY - startMouseY;

        const newTop = Math.max(0, startTop + deltaY);
        const newLeft = Math.max(0, startLeft + deltaX);

        // Direct DOM update — instant, zero React re-renders
        dom.style.top = `${newTop}px`;
        dom.style.left = `${newLeft}px`;

        // Update position label (also pure DOM)
        posLabel.textContent = `x: ${newLeft}  y: ${newTop}`;
        posLabel.style.top = `${newTop + dom.offsetHeight + 8}px`;
        posLabel.style.left = `${newLeft}px`;
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        // Calculate final position
        const deltaX = upEvent.clientX - startMouseX;
        const deltaY = upEvent.clientY - startMouseY;
        const finalTop = Math.max(0, startTop + deltaY);
        const finalLeft = Math.max(0, startLeft + deltaX);

        // Commit final position to Craft.js props
        actions.setProp((props: any) => {
          props.position = "absolute";
          props.top = `${finalTop}px`;
          props.left = `${finalLeft}px`;
        });

        // Reset DOM cursor
        dom.style.cursor = "";
        dom.style.zIndex = "";

        // Cleanup overlay + position label
        const overlayEl = document.getElementById("vb-move-overlay");
        if (overlayEl) overlayEl.remove();
        const labelEl = document.getElementById("vb-move-pos-label");
        if (labelEl) labelEl.remove();

        document.removeEventListener("mousemove", handleMouseMove, true);
        document.removeEventListener("mouseup", handleMouseUp, true);
      };

      // Capture phase — intercept before anything else
      document.addEventListener("mousemove", handleMouseMove, true);
      document.addEventListener("mouseup", handleMouseUp, true);
    },
    [dom, actions, id, query, editorActions]
  );

  /**
   * When the element is SELECTED, intercept mousedown to enable:
   * 1. Free-position drag directly on the element (click + drag > 4px)
   * 2. Block Craft.js native drag to prevent focus jumping
   */
  useEffect(() => {
    if (!dom || !isActive || !enabled) return;

    // Store startFreeMove in a ref-accessible way for the native handler
    const freeMoveHandler = startFreeMove;

    const handleElementMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't intercept toolbar clicks
      if (target.closest("[data-vb-toolbar]")) return;
      // Only intercept if mouse is on the actual element
      if (!dom.contains(target)) return;

      // Block Craft.js native drag
      e.stopPropagation();

      // Don't start move if clicking on editable content
      if (target.closest("[contenteditable='true']")) return;

      // Deadzone: distinguish click (select) from drag (move).
      // Track if mouse moves more than 4px before mouseup.
      const sx = e.clientX;
      const sy = e.clientY;

      const checkMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - sx;
        const dy = moveEvent.clientY - sy;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
          document.removeEventListener("mousemove", checkMove, true);
          document.removeEventListener("mouseup", cancelCheck, true);
          // Start free move from the original mousedown coordinates
          freeMoveHandler(sx, sy);
        }
      };

      const cancelCheck = () => {
        document.removeEventListener("mousemove", checkMove, true);
        document.removeEventListener("mouseup", cancelCheck, true);
      };

      document.addEventListener("mousemove", checkMove, true);
      document.addEventListener("mouseup", cancelCheck, true);
    };

    // Capture phase — fires BEFORE Craft.js handlers
    dom.addEventListener("mousedown", handleElementMouseDown, true);
    return () => {
      dom.removeEventListener("mousedown", handleElementMouseDown, true);
    };
  }, [dom, isActive, enabled, startFreeMove]);

  /**
   * Resize handler — uses a full-screen transparent overlay so the mouse
   * can never "escape" the drag zone (even if it moves fast or leaves
   * the canvas area). This prevents Craft.js from stealing the event.
   */
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault();
      e.stopPropagation();
      // Also block Craft.js native handlers
      e.nativeEvent.stopImmediatePropagation();
      if (!dom) return;

      const rect = dom.getBoundingClientRect();
      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startWidth: rect.width,
        startHeight: rect.height,
        direction,
      };
      setIsResizing(true);
      setResizeSize({ w: Math.round(rect.width), h: Math.round(rect.height) });

      // Create full-screen overlay to capture ALL mouse events during resize
      const overlay = document.createElement("div");
      overlay.id = "vb-resize-overlay";
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 99999;
        cursor: ${getCursorForDirection(direction)};
        user-select: none; -webkit-user-select: none;
      `;
      document.body.appendChild(overlay);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        if (!resizeRef.current || !dom) return;

        const { startX, startY, startWidth, startHeight, direction: dir } = resizeRef.current;
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;

        if (dir.includes("e")) newWidth = Math.max(40, startWidth + deltaX);
        if (dir.includes("w")) newWidth = Math.max(40, startWidth - deltaX);
        if (dir.includes("s")) newHeight = Math.max(20, startHeight + deltaY);
        if (dir.includes("n")) newHeight = Math.max(20, startHeight - deltaY);

        const roundedW = Math.round(newWidth);
        const roundedH = Math.round(newHeight);

        setResizeSize({ w: roundedW, h: roundedH });

        // Apply size to Craft.js props
        actions.setProp((props: any) => {
          if (dir.includes("e") || dir.includes("w")) {
            props.width = `${roundedW}px`;
          }
          if (dir.includes("s") || dir.includes("n")) {
            props.height = `${roundedH}px`;
            if (props.minHeight !== undefined) {
              props.minHeight = `${roundedH}px`;
            }
          }
        });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        setResizeSize(null);
        resizeRef.current = null;
        // Remove overlay
        const el = document.getElementById("vb-resize-overlay");
        if (el) el.remove();
        document.removeEventListener("mousemove", handleMouseMove, true);
        document.removeEventListener("mouseup", handleMouseUp, true);
      };

      // Capture phase so we intercept before any Craft.js handler
      document.addEventListener("mousemove", handleMouseMove, true);
      document.addEventListener("mouseup", handleMouseUp, true);
    },
    [dom, actions]
  );

  const handleDuplicate = useCallback(() => {
    const { data: nodeData } = query.node(id).get();
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

    editorActions.add(freshNode, parentId);
  }, [id, query, editorActions]);

  /**
   * Move this node one position UP within its parent.
   * If it's already the first child but the parent's justifyContent
   * isn't "flex-start", shift the alignment toward the start instead.
   */
  const handleMoveUp = useCallback(() => {
    const { data: nodeData } = query.node(id).get();
    const parentId = nodeData.parent;
    if (!parentId) return;
    const parentNode = query.node(parentId).get();
    const siblings: string[] = (parentNode.data as any).nodes || [];
    const idx = siblings.indexOf(id);

    if (idx > 0) {
      // Swap with sibling above
      editorActions.move(id, parentId, idx - 1);
    }
    // If already the first child, do nothing — use free-move for repositioning
  }, [id, query, editorActions]);

  /**
   * Move this node one position DOWN within its parent.
   * If it's already the last child but the parent's justifyContent
   * isn't "flex-end", shift the alignment toward the end instead.
   */
  const handleMoveDown = useCallback(() => {
    const { data: nodeData } = query.node(id).get();
    const parentId = nodeData.parent;
    if (!parentId) return;
    const parentNode = query.node(parentId).get();
    const siblings: string[] = (parentNode.data as any).nodes || [];
    const idx = siblings.indexOf(id);

    if (idx >= 0 && idx < siblings.length - 1) {
      // Swap with sibling below
      editorActions.move(id, parentId, idx + 1);
    }
    // If already the last child, do nothing — use free-move for repositioning
  }, [id, query, editorActions]);

  // Don't render anything extra if editor is disabled
  if (!enabled) return <>{render}</>;

  // Find the canvas root to portal resize handles into (stable container)
  const canvasRoot = dom?.closest(".vb-canvas-root") || dom?.parentElement || document.body;

  return (
    <>
      {render}

      {/* Hover badge — show component name */}
      {isHover && !isActive && dom &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              top: dom.offsetTop - 20,
              left: dom.offsetLeft,
              zIndex: 40,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                backgroundColor: "#60a5fa",
                color: "#fff",
                fontSize: "10px",
                fontWeight: 600,
                padding: "1px 6px",
                borderRadius: "3px 3px 0 0",
                display: "inline-block",
                lineHeight: "18px",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
          </div>,
          dom.parentElement || document.body
        )}

      {/* Selection toolbar + resize handles */}
      {isActive && dom && (
        <>
          {/* Toolbar — portaled to parent for correct positioning */}
          {ReactDOM.createPortal(
            <div
              ref={setToolbarRef}
              data-vb-toolbar="true"
              style={{
                position: "absolute",
                top: dom.offsetTop - 28,
                left: dom.offsetLeft,
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "#1f2937",
                borderRadius: "5px",
                padding: "3px 5px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                maxWidth: "100%",
              }}
            >
              {/* Component name */}
              <span
                style={{
                  color: "#FCD100",
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "2px 5px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "80px",

                }}
              >
                {name}
              </span>

              <div style={{ width: "1px", height: "14px", backgroundColor: "#4b5563", flexShrink: 0 }} />

              {!isTextNode && (
                <>
              {/* Form / Design toggle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#374151",
                  borderRadius: "3px",
                  padding: "1px",
                  margin: "0 1px",
                }}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); setBlockMode("form"); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "3px 5px",
                    border: "none",
                    borderRadius: "2px",
                    cursor: "pointer",
                    transition: "all 0.12s",
                    backgroundColor: blockMode === "form" ? "#FCD100" : "transparent",
                    color: blockMode === "form" ? "#1f2937" : "#9ca3af",
                  }}
                  title="Form — edit content & data"
                >
                  <FileText size={11} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setBlockMode("design"); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "3px 5px",
                    border: "none",
                    borderRadius: "2px",
                    cursor: "pointer",
                    transition: "all 0.12s",
                    backgroundColor: blockMode === "design" ? "#FCD100" : "transparent",
                    color: blockMode === "design" ? "#1f2937" : "#9ca3af",
                  }}
                  title="Design — edit styling & layout"
                >
                  <Paintbrush size={11} />
                </button>
              </div>

              <div style={{ width: "1px", height: "14px", backgroundColor: "#4b5563", flexShrink: 0 }} />
                </>
              )}

              {/* Free-position drag handle */}
              {moveable && (
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    startFreeMove(e.clientX, e.clientY);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#9ca3af",
                    cursor: "grab",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "2px",
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
                  title="Drag to position freely"
                >
                  <Move size={12} />
                </button>
              )}

              {/* Move Up */}
              {moveable && (
                <button
                  onClick={handleMoveUp}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#9ca3af",
                    cursor: "pointer",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "2px",
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
                  title="Move up"
                >
                  <ArrowUp size={12} />
                </button>
              )}

              {/* Move Down */}
              {moveable && (
                <button
                  onClick={handleMoveDown}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#9ca3af",
                    cursor: "pointer",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "2px",
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
                  title="Move down"
                >
                  <ArrowDown size={12} />
                </button>
              )}

              {/* Select parent */}
              {parent && (
                <button
                  onClick={() => editorActions.selectNode(parent)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#9ca3af",
                    cursor: "pointer",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "2px",
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
                  title="Select parent"
                >
                  <ChevronUp size={12} />
                </button>
              )}

              {/* Duplicate */}
              <button
                onClick={handleDuplicate}
                style={{
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "3px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "2px",
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
                title="Duplicate"
              >
                <Copy size={12} />
              </button>

              {/* Delete */}
              {deletable && (
                <button
                  onClick={() => editorActions.delete(id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#9ca3af",
                    cursor: "pointer",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "2px",
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
                  title="Delete"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>,
            dom.parentElement || document.body
          )}

          {/* Resize handles — portaled to canvas root for stable positioning */}
          {ReactDOM.createPortal(
            <ResizeHandles
              dom={dom}
              isResizing={isResizing}
              resizeSize={resizeSize}
              onResizeStart={handleResizeStart}
            />,
            canvasRoot
          )}

          {/* Position indicator is managed via direct DOM in startFreeMove
              to avoid React re-renders during drag */}
        </>
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Resize Handles — rendered as a separate component for clarity     */
/* ------------------------------------------------------------------ */

/** Get the correct offset relative to the canvas root */
function getOffsetRelativeTo(el: HTMLElement, ancestor: Element): { top: number; left: number } {
  let top = 0;
  let left = 0;
  let current: HTMLElement | null = el;
  while (current && current !== ancestor) {
    top += current.offsetTop;
    left += current.offsetLeft;
    current = current.offsetParent as HTMLElement | null;
  }
  return { top, left };
}

function getCursorForDirection(dir: string): string {
  const map: Record<string, string> = {
    n: "ns-resize", s: "ns-resize", e: "ew-resize", w: "ew-resize",
    nw: "nwse-resize", ne: "nesw-resize", sw: "nesw-resize", se: "nwse-resize",
  };
  return map[dir] || "default";
}

function ResizeHandles({
  dom,
  isResizing,
  resizeSize,
  onResizeStart,
}: {
  dom: HTMLElement;
  isResizing: boolean;
  resizeSize: { w: number; h: number } | null;
  onResizeStart: (e: React.MouseEvent, direction: string) => void;
}) {
  const canvasRoot = dom.closest(".vb-canvas-root");
  const offset = canvasRoot
    ? getOffsetRelativeTo(dom, canvasRoot)
    : { top: dom.offsetTop, left: dom.offsetLeft };

  const t = offset.top;
  const l = offset.left;
  const w = dom.offsetWidth;
  const h = dom.offsetHeight;

  const DOT = 10;   // corner handle size
  const EDGE = 16;  // invisible edge grab zone (wide for easy clicking)

  const cornerBase: React.CSSProperties = {
    position: "absolute",
    width: `${DOT}px`,
    height: `${DOT}px`,
    backgroundColor: "#FCD100",
    border: "1.5px solid #b8960a",
    borderRadius: "2px",
    zIndex: 48,
    boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
  };

  const midBase: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "#fff",
    border: "1.5px solid #FCD100",
    borderRadius: "2px",
    zIndex: 47,
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
  };

  const edgeBase: React.CSSProperties = {
    position: "absolute",
    zIndex: 46,
    backgroundColor: "transparent",
  };

  return (
    <>
      {/* ---- Invisible wide edge grab zones (16px wide) ---- */}
      {/* Top */}
      <div onMouseDown={(e) => onResizeStart(e, "n")} style={{ ...edgeBase, cursor: "ns-resize", top: t - EDGE / 2, left: l + DOT, width: w - DOT * 2, height: EDGE }} />
      {/* Bottom */}
      <div onMouseDown={(e) => onResizeStart(e, "s")} style={{ ...edgeBase, cursor: "ns-resize", top: t + h - EDGE / 2, left: l + DOT, width: w - DOT * 2, height: EDGE }} />
      {/* Left */}
      <div onMouseDown={(e) => onResizeStart(e, "w")} style={{ ...edgeBase, cursor: "ew-resize", top: t + DOT, left: l - EDGE / 2, width: EDGE, height: h - DOT * 2 }} />
      {/* Right */}
      <div onMouseDown={(e) => onResizeStart(e, "e")} style={{ ...edgeBase, cursor: "ew-resize", top: t + DOT, left: l + w - EDGE / 2, width: EDGE, height: h - DOT * 2 }} />

      {/* ---- Corner handles (yellow dots) ---- */}
      <div onMouseDown={(e) => onResizeStart(e, "nw")} style={{ ...cornerBase, cursor: "nwse-resize", top: t - DOT / 2, left: l - DOT / 2 }} />
      <div onMouseDown={(e) => onResizeStart(e, "ne")} style={{ ...cornerBase, cursor: "nesw-resize", top: t - DOT / 2, left: l + w - DOT / 2 }} />
      <div onMouseDown={(e) => onResizeStart(e, "sw")} style={{ ...cornerBase, cursor: "nesw-resize", top: t + h - DOT / 2, left: l - DOT / 2 }} />
      <div onMouseDown={(e) => onResizeStart(e, "se")} style={{ ...cornerBase, cursor: "nwse-resize", top: t + h - DOT / 2, left: l + w - DOT / 2 }} />

      {/* ---- Midpoint handles (white pills) ---- */}
      {/* Top mid */}
      <div onMouseDown={(e) => onResizeStart(e, "n")} style={{ ...midBase, cursor: "ns-resize", width: "14px", height: "6px", top: t - 3, left: l + w / 2 - 7 }} />
      {/* Bottom mid */}
      <div onMouseDown={(e) => onResizeStart(e, "s")} style={{ ...midBase, cursor: "ns-resize", width: "14px", height: "6px", top: t + h - 3, left: l + w / 2 - 7 }} />
      {/* Left mid */}
      <div onMouseDown={(e) => onResizeStart(e, "w")} style={{ ...midBase, cursor: "ew-resize", width: "6px", height: "14px", top: t + h / 2 - 7, left: l - 3 }} />
      {/* Right mid */}
      <div onMouseDown={(e) => onResizeStart(e, "e")} style={{ ...midBase, cursor: "ew-resize", width: "6px", height: "14px", top: t + h / 2 - 7, left: l + w - 3 }} />

      {/* ---- Live size label ---- */}
      {isResizing && resizeSize && (
        <div
          style={{
            position: "absolute",
            top: t + h + 8,
            left: l + w / 2 - 36,
            zIndex: 60,
            backgroundColor: "rgba(0,0,0,0.85)",
            color: "#FCD100",
            fontSize: "11px",
            fontWeight: 700,
            fontFamily: "monospace",
            padding: "3px 8px",
            borderRadius: "4px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {resizeSize.w} × {resizeSize.h}
        </div>
      )}
    </>
  );
}

export default RenderNode;
