import { useEditor, useNode } from "@craftjs/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftTextProps {
  text?: string;
  richText?: boolean;
  tagName?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  lineHeight?: string;
  letterSpacing?: string;
  fontFamily?: string;
  textDecoration?: "none" | "underline" | "line-through";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  margin?: number;
  padding?: number;
  backgroundColor?: string;
  borderRadius?: number;
  opacity?: number;
  width?: string;
  height?: string;
  minHeight?: string;
  mobileFontSize?: number | "";
  tabletFontSize?: number | "";
  mobileTextAlign?: "left" | "center" | "right" | "justify" | "";
  tabletTextAlign?: "left" | "center" | "right" | "justify" | "";
  position?: "static" | "relative" | "absolute";
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

const DEFAULT_TEXT =
  "Add your content here. Double-click to edit.";

function sanitizeHtml(html: string): string {
  if (typeof document === "undefined") return html || "";

  const div = document.createElement("div");
  div.innerHTML = html;

  div
    .querySelectorAll("script, iframe, object, embed, form, input, textarea, select, button, link, meta, noscript")
    .forEach((el) => el.remove());

  div.querySelectorAll("*").forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      const attrName = attr.name.toLowerCase();
      const attrValue = attr.value.trim().toLowerCase();
      if (
        attrName.startsWith("on") ||
        attrName === "srcdoc" ||
        ((attrName === "href" || attrName === "src") &&
          (attrValue.startsWith("javascript:") || attrValue.startsWith("data:text/html")))
      ) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return div.innerHTML.replace(/<!--[\s\S]*?-->/g, "").trim();
}

export const CraftText = ({
  text = DEFAULT_TEXT,
  richText = false,
  tagName = "p",
  fontSize = 16,
  fontWeight = "400",
  color = "#333333",
  textAlign = "left",
  lineHeight = "1.5",
  letterSpacing = "normal",
  fontFamily = "",
  textDecoration = "none",
  textTransform = "none",
  margin = 0,
  padding = 0,
  backgroundColor = "transparent",
  borderRadius = 0,
  opacity = 1,
  width = "100%",
  height = "",
  minHeight = "",
  mobileFontSize = "",
  tabletFontSize = "",
  mobileTextAlign = "",
  tabletTextAlign = "",
  position = "static",
  top = "",
  left = "",
  right = "",
  bottom = "",
  zIndex,
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftTextProps) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [isEditing, setIsEditing] = useState(false);
  const lastSavedRef = useRef<string>(text);
  const editableRef = useRef<HTMLElement | null>(null);

  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try {
    device = useDeviceMode();
  } catch {
    // Context may not exist during serialization.
  }

  useEffect(() => {
    lastSavedRef.current = text;
  }, [text]);

  const saveText = useCallback(
    (element: HTMLElement | null) => {
      if (!element) return;

      const nextContent = richText
        ? sanitizeHtml(element.innerHTML || "")
        : (element.textContent || "").trim();
      if (nextContent === lastSavedRef.current) return;

      lastSavedRef.current = nextContent;
      setProp((props: CraftTextProps) => {
        props.text = nextContent || DEFAULT_TEXT;
      });
    },
    [richText, setProp]
  );

  useEffect(() => {
    if (!enabled && isEditing) {
      setIsEditing(false);
    }
  }, [enabled, isEditing]);

  useEffect(() => {
    if (!isEditing || !editableRef.current) return;

    const element = editableRef.current;
    element.focus();

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, [isEditing]);

  if (device === "mobile" && hideOnMobile) return null;
  if (device === "tablet" && hideOnTablet) return null;
  if (device === "desktop" && hideOnDesktop) return null;

  let activeFontSize = fontSize;
  let activeTextAlign = textAlign;

  if (device === "tablet") {
    if (tabletFontSize !== "" && tabletFontSize !== undefined) activeFontSize = Number(tabletFontSize);
    if (tabletTextAlign) activeTextAlign = tabletTextAlign;
  } else if (device === "mobile") {
    if (tabletFontSize !== "" && tabletFontSize !== undefined) activeFontSize = Number(tabletFontSize);
    if (mobileFontSize !== "" && mobileFontSize !== undefined) activeFontSize = Number(mobileFontSize);
    if (tabletTextAlign) activeTextAlign = tabletTextAlign;
    if (mobileTextAlign) activeTextAlign = mobileTextAlign;
  }

  const baseStyle: React.CSSProperties = {
    fontSize: `${activeFontSize}px`,
    fontWeight,
    color,
    textAlign: activeTextAlign,
    lineHeight,
    letterSpacing,
    fontFamily: fontFamily || undefined,
    textDecoration,
    textTransform,
    margin: `${margin}px`,
    padding: `${padding}px`,
    backgroundColor,
    borderRadius: `${borderRadius}px`,
    opacity,
    width,
    height: height || undefined,
    minHeight: minHeight || "1em",
    maxWidth: "100%",
    minWidth: 0,
    overflowWrap: "break-word",
    wordBreak: "break-word",
    boxSizing: "border-box",
    position: position && position !== "static" ? position : undefined,
    top: top || undefined,
    left: left || undefined,
    right: right || undefined,
    bottom: bottom || undefined,
    zIndex: zIndex !== undefined && zIndex !== 0 ? zIndex : undefined,
  };

  if (richText) {
    return React.createElement(
      tagName,
      {
        ref: (ref: HTMLElement | null) => {
          editableRef.current = ref;
          if (ref) connect(drag(ref));
        },
        className: "vb-rich-text fr-view",
        contentEditable: enabled && isEditing,
        suppressContentEditableWarning: true,
        onMouseDown: (event: React.MouseEvent) => {
          if (!enabled) return;
          event.stopPropagation();
        },
        onClick: (event: React.MouseEvent) => {
          if (!enabled) return;
          event.stopPropagation();
          setIsEditing(true);
        },
        onDoubleClick: (event: React.MouseEvent) => {
          if (!enabled) return;
          event.stopPropagation();
          setIsEditing(true);
        },
        onBlur: (event: React.FocusEvent<HTMLElement>) => {
          saveText(event.currentTarget);
          setIsEditing(false);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
          if (event.key === "Escape") {
            event.preventDefault();
            saveText(event.currentTarget);
            setIsEditing(false);
            event.currentTarget.blur();
          }
        },
        style: { ...baseStyle, cursor: enabled ? "text" : undefined },
        dangerouslySetInnerHTML: { __html: text },
      }
    );
  }

  return React.createElement(
    tagName,
    {
      ref: (ref: HTMLElement | null) => {
        editableRef.current = ref;
        if (ref) connect(drag(ref));
      },
      contentEditable: enabled && isEditing,
      suppressContentEditableWarning: true,
      onMouseDown: (event: React.MouseEvent) => {
        if (!enabled) return;
        event.stopPropagation();
      },
      onClick: (event: React.MouseEvent) => {
        if (!enabled) return;
        event.stopPropagation();
        setIsEditing(true);
      },
      onDoubleClick: (event: React.MouseEvent) => {
        if (!enabled) return;
        event.stopPropagation();
        setIsEditing(true);
      },
      onBlur: (event: React.FocusEvent<HTMLElement>) => {
        saveText(event.currentTarget);
        setIsEditing(false);
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Escape") {
          event.preventDefault();
          saveText(event.currentTarget);
          setIsEditing(false);
          event.currentTarget.blur();
        }
      },
      style: { ...baseStyle, cursor: enabled ? "text" : undefined },
    },
    text
  );
};

CraftText.craft = {
  displayName: "Text",
  props: {
    text: DEFAULT_TEXT,
    richText: false,
    tagName: "p",
    fontSize: 16,
    fontWeight: "400",
    color: "#333333",
    textAlign: "left",
    lineHeight: "1.5",
    letterSpacing: "normal",
    fontFamily: "",
    textDecoration: "none",
    textTransform: "none",
    margin: 0,
    padding: 0,
    backgroundColor: "transparent",
    borderRadius: 0,
    opacity: 1,
    width: "100%",
    height: "",
    minHeight: "",
    mobileFontSize: "",
    tabletFontSize: "",
    mobileTextAlign: "",
    tabletTextAlign: "",
    position: "static",
    top: "",
    left: "",
    right: "",
    bottom: "",
    zIndex: 0,
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: {
    canDrag: () => true,
  },
};

export default CraftText;
