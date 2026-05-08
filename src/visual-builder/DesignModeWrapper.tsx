import { useCallback, useEffect } from "react";
import { BlockModeToggle } from "./BlockModeToggle";
import { VisualBlockEditor } from "./VisualBlockEditor";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface DesignModeWrapperProps {
  /** The current block content object */
  content: {
    mode?: "form" | "design";
    craft_state?: string;
    rendered_html?: string;
    [key: string]: unknown;
  };
  /** Called when content changes (both form and design mode) */
  onContentChange: (updatedContent: {
    mode?: "form" | "design";
    craft_state?: string;
    rendered_html?: string;
    [key: string]: unknown;
  }) => void;
  /** The form-mode component (existing block UI) */
  formContent: ReactNode;
  /** Default canvas content for this block type */
  defaultCanvasContent?: ReactNode;
  /** Canvas height */
  canvasHeight?: string;
}

/**
 * Wraps any existing block component with a Form/Design mode toggle.
 * In Form mode: renders the existing block UI (formContent).
 * In Design mode: opens the Craft.js visual canvas in a popup.
 *
 * Content structure when in design mode:
 * {
 *   ...existingFields,
 *   mode: "design",
 *   craft_state: "...",  // serialized Craft.js state
 *   rendered_html: "..." // generated HTML
 * }
 */
export function DesignModeWrapper({
  content,
  onContentChange,
  formContent,
  defaultCanvasContent,
  canvasHeight = "500px",
}: DesignModeWrapperProps) {
  const currentMode = content?.mode === "design" ? "design" : "form";
  const popupCanvasHeight = canvasHeight === "500px" ? "calc(92vh - 52px)" : canvasHeight;

  useEffect(() => {
    if (currentMode !== "design") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [currentMode]);

  const handleModeChange = useCallback(
    (newMode: "form" | "design") => {
      if (newMode === currentMode) return;

      if (newMode === "design") {
        // Switch to design mode — preserve existing fields
        onContentChange({
          ...content,
          mode: "design",
          craft_state: content.craft_state || "",
          rendered_html: content.rendered_html || "",
        });
      } else {
        // Switch back to form mode — keep craft_state for future
        onContentChange({
          ...content,
          mode: "form",
        });
      }
    },
    [content, currentMode, onContentChange]
  );

  const handleDesignChange = useCallback(
    (craftState: string, renderedHtml: string) => {
      onContentChange({
        ...content,
        mode: "design",
        craft_state: craftState,
        rendered_html: renderedHtml,
      });
    },
    [content, onContentChange]
  );

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex justify-end mb-3">
        <BlockModeToggle mode={currentMode} onModeChange={handleModeChange} />
      </div>

      {/* Content area */}
      {formContent}

      {currentMode === "design" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              boxSizing: "border-box",
            }}
            onClick={() => handleModeChange("form")}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
                height: "92vh",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                  Visual Builder
                </h3>
                <button
                  type="button"
                  onClick={() => handleModeChange("form")}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#6b7280",
                    padding: "4px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Close Design Mode"
                >
                  <X size={16} />
                </button>
              </div>
              <div style={{ flex: 1, minHeight: 0 }}>
                <VisualBlockEditor
                  initialState={content.craft_state || undefined}
                  onChange={handleDesignChange}
                  defaultContent={defaultCanvasContent}
                  canvasHeight={popupCanvasHeight}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default DesignModeWrapper;
