import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftAdvertisementProps {
  imageUrl?: string;
  linkUrl?: string;
  openInNewTab?: boolean;
  altText?: string;
  width?: string;
  height?: string;
  objectFit?: "cover" | "contain" | "fill";
  borderRadius?: number;
  backgroundColor?: string;
  borderWidth?: number;
  borderColor?: string;
  padding?: number;
  label?: string;
  showLabel?: boolean;
  labelPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Responsive overrides */
  tabletWidth?: string;
  mobileWidth?: string;
  tabletHeight?: string;
  mobileHeight?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftAdvertisement = ({
  imageUrl = "",
  linkUrl = "",
  openInNewTab = true,
  altText = "Advertisement",
  width = "100%",
  height = "250px",
  objectFit = "cover",
  borderRadius = 8,
  backgroundColor = "#f3f4f6",
  borderWidth = 0,
  borderColor = "#e5e7eb",
  padding = 0,
  label = "Sponsored",
  showLabel = true,
  labelPosition = "top-right",
  tabletWidth = "",
  mobileWidth = "",
  tabletHeight = "",
  mobileHeight = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftAdvertisementProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  // Device-aware overrides
  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try {
    device = useDeviceMode();
  } catch {
    /* context may not exist */
  }

  // Visibility check
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

  const getLabelPosition = (
    position: string
  ): { top?: string; bottom?: string; left?: string; right?: string } => {
    switch (position) {
      case "top-left":
        return { top: "8px", left: "8px" };
      case "top-right":
        return { top: "8px", right: "8px" };
      case "bottom-left":
        return { bottom: "8px", left: "8px" };
      case "bottom-right":
        return { bottom: "8px", right: "8px" };
      default:
        return { top: "8px", right: "8px" };
    }
  };

  const isValidUrl = linkUrl && linkUrl.trim().length > 0;

  const content = (
    <div
      style={{
        position: "relative",
        width: activeWidth,
        height: activeHeight,
        borderRadius: `${borderRadius}px`,
        border:
          borderWidth > 0
            ? `${borderWidth}px solid ${borderColor}`
            : "none",
        backgroundColor,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {imageUrl && imageUrl.trim().length > 0 ? (
        <img
          src={imageUrl}
          alt={altText}
          style={{
            width: "100%",
            height: "100%",
            objectFit,
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#9ca3af",
            backgroundColor,
          }}
        >
          Ad
        </div>
      )}

      {/* Label Badge */}
      {showLabel && (
        <div
          style={{
            position: "absolute",
            ...getLabelPosition(labelPosition),
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#ffffff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "10px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            zIndex: 10,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        cursor: "grab",
        padding: `${padding}px`,
        boxSizing: "border-box",
        maxWidth: "100%",
        display: "inline-block",
        width:activeWidth || "100%",
        height: activeHeight || undefined,

      }}
    >
      {isValidUrl ? (
        <a
          href={linkUrl}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          style={{
            textDecoration: "none",
            display: "block",
            cursor: "pointer",
          }}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};

CraftAdvertisement.craft = {
  displayName: "Advertisement",
  props: {
    imageUrl: "",
    linkUrl: "",
    openInNewTab: true,
    altText: "Advertisement",
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    borderWidth: 0,
    borderColor: "#e5e7eb",
    padding: 0,
    label: "Sponsored",
    showLabel: true,
    labelPosition: "top-right",
    tabletWidth: "",
    mobileWidth: "",
    tabletHeight: "",
    mobileHeight: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: { canDrag: () => true },
};

export default CraftAdvertisement;
