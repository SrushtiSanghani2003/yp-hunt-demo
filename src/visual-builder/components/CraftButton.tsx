import { useNode } from "@craftjs/core";
import { useState, useRef, useEffect } from "react";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftButtonProps {
  text?: string;
  href?: string;
  openInNewTab?: boolean;
  backgroundColor?: string;
  color?: string;
  padding?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  fontSize?: number;
  fontWeight?: string;
  width?: string;
  height?: string;
  textAlign?: "left" | "center" | "right";
  margin?: number;
  opacity?: number;
  boxShadow?: string;
  hoverEffect?: "none" | "darken" | "lighten" | "scale";
  /** Responsive overrides */
  tabletFontSize?: number | "";
  mobileFontSize?: number | "";
  tabletWidth?: string;
  mobileWidth?: string;
  tabletPadding?: string;
  mobilePadding?: string;
  /** Positioning for overlay / absolute layouts */
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

export const CraftButton = ({
  text = "Click Me",
  href = "",
  openInNewTab = false,
  backgroundColor = "#000000",
  color = "#ffffff",
  padding = "10px 24px",
  borderRadius = 8,
  borderWidth = 0,
  borderColor = "transparent",
  fontSize = 16,
  fontWeight = "600",
  width = "auto",
  height = "",
  textAlign = "center",
  margin = 0,
  opacity = 1,
  boxShadow = "none",
  tabletFontSize = "",
  mobileFontSize = "",
  tabletWidth = "",
  mobileWidth = "",
  tabletPadding = "",
  mobilePadding = "",
  position = "static",
  top = "",
  left = "",
  right = "",
  bottom = "",
  zIndex,
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftButtonProps) => {
  const {
    connectors: { connect, drag },
    isActive,
    actions: { setProp },
  } = useNode((state) => ({
    isActive: state.events.selected,
  }));

  const [isEditing, setIsEditing] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isEditing && btnRef.current) {
      btnRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isActive && isEditing) setIsEditing(false);
  }, [isActive]);

  // Device-aware overrides
  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try { device = useDeviceMode(); } catch { /* context may not exist */ }

  // Visibility check
  if (device === "mobile" && hideOnMobile) return null;
  if (device === "tablet" && hideOnTablet) return null;
  if (device === "desktop" && hideOnDesktop) return null;

  let activeFontSize = fontSize;
  let activeWidth = width;
  let activePadding = padding;

  if (device === "tablet") {
    if (tabletFontSize !== "" && tabletFontSize !== undefined) activeFontSize = Number(tabletFontSize);
    if (tabletWidth) activeWidth = tabletWidth;
    if (tabletPadding) activePadding = tabletPadding;
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
    if (tabletFontSize !== "" && tabletFontSize !== undefined) activeFontSize = Number(tabletFontSize);
    if (mobileFontSize !== "" && mobileFontSize !== undefined) activeFontSize = Number(mobileFontSize);
    if (tabletWidth) activeWidth = tabletWidth;
    if (mobileWidth) activeWidth = mobileWidth;
    if (tabletPadding) activePadding = tabletPadding;
    if (mobilePadding) activePadding = mobilePadding;
  }

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        display: "inline-block",
        maxWidth: "100%",
        margin: `${margin}px`,
        cursor: "grab",
        textAlign,
        opacity,
        height: height || undefined,
        boxSizing: "border-box",
        position: position && position !== "static" ? position : undefined,
        top: top || undefined,
        left: left || undefined,
        right: right || undefined,
        bottom: bottom || undefined,
        zIndex: zIndex !== undefined && zIndex !== 0 ? zIndex : undefined,
      } as React.CSSProperties}
    >
      <button
        ref={btnRef}
        data-href={href || undefined}
        data-open-in-new-tab={href ? openInNewTab : undefined}
        title={href ? `Link: ${href}` : undefined}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onDoubleClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        onBlur={(e) => {
          setIsEditing(false);
          setProp((props: CraftButtonProps) => {
            props.text = e.currentTarget.innerText;
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsEditing(false);
            (e.currentTarget as HTMLElement).blur();
          }
        }}
        onClick={(e) => e.preventDefault()}
        style={{
          backgroundColor,
          color,
          padding: activePadding,
          borderRadius: `${borderRadius}px`,
          border: borderWidth ? `${borderWidth}px solid ${borderColor}` : "none",
          fontSize: `${activeFontSize}px`,
          fontWeight,
          cursor: isEditing ? "text" : "pointer",
          width: activeWidth,
          maxWidth: "100%",
          textDecoration: "none",
          display: "inline-block",
          lineHeight: "1.5",
          boxShadow: isEditing ? `inset 0 0 0 2px #3b82f6` : boxShadow,
          transition: "box-shadow 0.15s ease, transform 0.1s ease",
          outline: "none",
          boxSizing: "border-box",
        }}
      >
        {text}
      </button>
    </div>
  );
};

CraftButton.craft = {
  displayName: "Button",
  props: {
    text: "Click Me",
    href: "",
    openInNewTab: false,
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: "10px 24px",
    borderRadius: 8,
    borderWidth: 0,
    borderColor: "transparent",
    fontSize: 16,
    fontWeight: "600",
    width: "auto",
    height: "",
    textAlign: "center",
    margin: 0,
    opacity: 1,
    boxShadow: "none",
    tabletFontSize: "",
    mobileFontSize: "",
    tabletWidth: "",
    mobileWidth: "",
    tabletPadding: "",
    mobilePadding: "",
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

export default CraftButton;
