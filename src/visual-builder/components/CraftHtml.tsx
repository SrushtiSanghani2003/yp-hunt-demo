import { useNode } from "@craftjs/core";
import { Code2 } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftHtmlProps {
  html?: string;
  customCss?: string;
  className?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  minHeight?: string;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  overflow?: "visible" | "hidden" | "auto";
  opacity?: number;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
  tabletWidth?: string;
  mobileWidth?: string;
  tabletHeight?: string;
  mobileHeight?: string;
  tabletPadding?: number;
  mobilePadding?: number;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

/**
 * Sanitize HTML to remove dangerous scripts and event handlers
 * while keeping safe HTML structure for preview
 */
function sanitizeHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;

  // Remove dangerous elements
  const dangerous = div.querySelectorAll(
    "script, object, embed, link, meta, noscript"
  );
  dangerous.forEach((el) => el.remove());

  // Remove event handler attributes and unsafe URLs while keeping useful embed HTML.
  const all = div.querySelectorAll("*");
  all.forEach((el) => {
    const attrs = Array.from(el.attributes);
    attrs.forEach((attr) => {
      const attrName = attr.name.toLowerCase();
      const attrValue = attr.value.trim().toLowerCase();
      if (
        attrName.startsWith("on") ||
        attrName === "srcdoc" ||
        ((attrName === "href" || attrName === "src" || attrName === "action") &&
          (attrValue.startsWith("javascript:") || attrValue.startsWith("data:text/html")))
      ) {
        el.removeAttribute(attr.name);
      }
    });

    if (el.tagName.toLowerCase() === "iframe") {
      const src = el.getAttribute("src") || "";
      if (!/^https?:\/\//i.test(src)) {
        el.remove();
        return;
      }
      el.setAttribute("loading", el.getAttribute("loading") || "lazy");
      el.setAttribute("referrerpolicy", el.getAttribute("referrerpolicy") || "no-referrer-when-downgrade");
    }
  });

  return div.innerHTML;
}

/**
 * CraftHtml Component for Visual Builder
 * Renders HTML content with styling props
 */
export const CraftHtml = ({
  html = "<p>Enter your HTML here</p>",
  customCss = "",
  className = "",
  width = "100%",
  height = "auto",
  maxWidth = "",
  minHeight = "100px",
  padding = 16,
  margin = 0,
  backgroundColor = "transparent",
  borderRadius = 0,
  borderWidth = 1,
  borderColor = "rgba(0, 0, 0, 0.1)",
  overflow = "visible",
  opacity = 1,
  position = "relative",
  top = "",
  left = "",
  right = "",
  bottom = "",
  zIndex = 0,
  tabletWidth = "",
  mobileWidth = "",
  tabletHeight = "",
  mobileHeight = "",
  tabletPadding,
  mobilePadding,
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftHtmlProps) => {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode();
  const [isEditing, setIsEditing] = useState(false);
  const [editHtml, setEditHtml] = useState(html);

  const device = useDeviceMode();

  useEffect(() => {
    if (!isEditing) setEditHtml(html);
  }, [html, isEditing]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditHtml(html);
  }, [html]);

  const handleSave = useCallback(() => {
    setProp((props: CraftHtmlProps) => {
      props.html = editHtml;
    });
    setIsEditing(false);
  }, [editHtml, setProp]);

  if (device === "mobile" && hideOnMobile) return null;
  if (device === "tablet" && hideOnTablet) return null;
  if (device === "desktop" && hideOnDesktop) return null;

  let activeWidth = width;
  let activeHeight = height;
  let activePadding = padding;

  if (device === "tablet") {
    if (tabletWidth) activeWidth = tabletWidth;
    if (tabletHeight) activeHeight = tabletHeight;
    if (tabletPadding !== undefined) activePadding = tabletPadding;
  } else if (device === "mobile") {
    if (tabletWidth) activeWidth = tabletWidth;
    if (mobileWidth) activeWidth = mobileWidth;
    if (tabletHeight) activeHeight = tabletHeight;
    if (mobileHeight) activeHeight = mobileHeight;
    if (tabletPadding !== undefined) activePadding = tabletPadding;
    if (mobilePadding !== undefined) activePadding = mobilePadding;
  }

  const sanitizedHtml = sanitizeHtml(html);
  const isEmpty = sanitizedHtml.trim().length === 0;

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      style={{
        width: activeWidth,
        height: activeHeight,
        maxWidth: maxWidth || "100%",
        minHeight,
        padding: `${activePadding}px`,
        margin: `${margin}px`,
        backgroundColor,
        borderRadius: `${borderRadius}px`,
        border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
        overflow,
        opacity,
        position,
        top: top || undefined,
        left: left || undefined,
        right: right || undefined,
        bottom: bottom || undefined,
        zIndex: zIndex || undefined,
        boxSizing: "border-box",
      }}
      className={`craft-html-block ${className}`.trim()}
    >
      {customCss ? <style>{customCss}</style> : null}
      {isEditing ? (
        <div className="absolute inset-0 bg-white bg-opacity-95 p-4 rounded-lg shadow-lg z-10">
          <textarea
            value={editHtml}
            onChange={(e) => setEditHtml(e.target.value)}
            placeholder="Enter HTML content here..."
            className="w-full h-32 p-2 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
          <div className="flex gap-2 mt-2 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : isEmpty ? (
        <div
          onClick={handleEdit}
          style={{
            minHeight: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            color: "#9ca3af",
            background: "#f9fafb",
            border: "1px dashed #d1d5db",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <Code2 size={18} />
          <span style={{ fontSize: "13px" }}>Click to add custom HTML</span>
        </div>
      ) : (
        <div
          className="html-content prose prose-sm max-w-none hover:cursor-pointer hover:opacity-70 transition-opacity"
          onClick={handleEdit}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      )}
    </div>
  );
};

// Craft.js settings
CraftHtml.craft = {
  displayName: "HTML",
  props: {
    html: "<p>Enter your HTML here</p>",
    customCss: "",
    className: "",
    width: "100%",
    height: "auto",
    maxWidth: "",
    minHeight: "100px",
    padding: 16,
    margin: 0,
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    overflow: "visible",
    opacity: 1,
    position: "relative",
    top: "",
    left: "",
    right: "",
    bottom: "",
    zIndex: 0,
    tabletWidth: "",
    mobileWidth: "",
    tabletHeight: "",
    mobileHeight: "",
    tabletPadding: undefined,
    mobilePadding: undefined,
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: {
    canDrag: () => true,
  },
  related: {},
};

export default CraftHtml;
