import { useNode } from "@craftjs/core";
import { ImageIcon } from "lucide-react";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  borderRadius?: number;
  margin?: number;
  opacity?: number;
  boxShadow?: string;
  borderWidth?: number;
  borderColor?: string;
  /** Responsive */
  mobileWidth?: string;
  tabletWidth?: string;
  mobileHeight?: string;
  tabletHeight?: string;
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

export const CraftImage = ({
  src = "",
  alt = "Image",
  width = "100%",
  height = "200px",
  objectFit = "cover",
  borderRadius = 0,
  margin = 0,
  opacity = 1,
  boxShadow = "none",
  borderWidth = 0,
  borderColor = "#e5e7eb",
  mobileWidth = "",
  tabletWidth = "",
  mobileHeight = "",
  tabletHeight = "",
  position = "static",
  top = "",
  left = "",
  right = "",
  bottom = "",
  zIndex,
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftImageProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try { device = useDeviceMode(); } catch { /* */ }

  if (device === "mobile" && hideOnMobile) return null;
  if (device === "tablet" && hideOnTablet) return null;
  if (device === "desktop" && hideOnDesktop) return null;

  let activeWidth = width;
  let activeHeight = height;
  if (device === "tablet") {
    if (tabletWidth) activeWidth = tabletWidth;
    if (tabletHeight) activeHeight = tabletHeight;
  } else if (device === "mobile") {
    if (tabletWidth) activeWidth = tabletWidth;
    if (mobileWidth) activeWidth = mobileWidth;
    if (tabletHeight) activeHeight = tabletHeight;
    if (mobileHeight) activeHeight = mobileHeight;
  }

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        width: activeWidth,
        maxWidth: "100%",
        height: src ? activeHeight : undefined,
        margin: `${margin}px`,
        borderRadius: `${borderRadius}px`,
        overflow: "hidden",
        cursor: "grab",
        opacity,
        boxShadow,
        border: borderWidth ? `${borderWidth}px solid ${borderColor}` : "none",
        boxSizing: "border-box",
        position: position && position !== "static" ? position : undefined,
        top: top || undefined,
        left: left || undefined,
        right: right || undefined,
        bottom: bottom || undefined,
        zIndex: zIndex !== undefined && zIndex !== 0 ? zIndex : undefined,
      } as React.CSSProperties}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit,
            display: "block",
          }}
          draggable={false}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: height || "200px",
            backgroundColor: "#f3f4f6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            border: "2px dashed #d1d5db",
            borderRadius: `${borderRadius}px`,
            color: "#9ca3af",
          }}
        >
          <ImageIcon size={32} />
          <span style={{ fontSize: "13px", textAlign: "center", padding: "0 12px" }}>
            Click to select, then upload or add URL in Settings
          </span>
        </div>
      )}
    </div>
  );
};

CraftImage.craft = {
  displayName: "Image",
  props: {
    src: "",
    alt: "Image",
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: 0,
    margin: 0,
    opacity: 1,
    boxShadow: "none",
    borderWidth: 0,
    borderColor: "#e5e7eb",
    mobileWidth: "",
    tabletWidth: "",
    mobileHeight: "",
    tabletHeight: "",
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

export default CraftImage;
