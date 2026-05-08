import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftDividerProps {
  thickness?: number;
  color?: string;
  lineStyle?: "solid" | "dashed" | "dotted";
  width?: string;
  marginY?: number;
  /** Responsive overrides */
  tabletMarginY?: number | "";
  mobileMarginY?: number | "";
  tabletWidth?: string;
  mobileWidth?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftDivider = ({
  thickness = 1,
  color = "#e5e7eb",
  lineStyle = "solid",
  width = "100%",
  marginY = 16,
  tabletMarginY = "",
  mobileMarginY = "",
  tabletWidth = "",
  mobileWidth = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftDividerProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  // Device-aware overrides
  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try { device = useDeviceMode(); } catch { /* context may not exist */ }

  // Visibility check
  if (device === "mobile" && hideOnMobile) return null;
  if (device === "tablet" && hideOnTablet) return null;
  if (device === "desktop" && hideOnDesktop) return null;

  let activeMarginY = marginY;
  let activeWidth = width;

  if (device === "tablet") {
    if (tabletMarginY !== "" && tabletMarginY !== undefined) activeMarginY = Number(tabletMarginY);
    if (tabletWidth) activeWidth = tabletWidth;
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
    if (tabletMarginY !== "" && tabletMarginY !== undefined) activeMarginY = Number(tabletMarginY);
    if (mobileMarginY !== "" && mobileMarginY !== undefined) activeMarginY = Number(mobileMarginY);
    if (tabletWidth) activeWidth = tabletWidth;
    if (mobileWidth) activeWidth = mobileWidth;
  }

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        cursor: "grab",
        padding: "4px 0",
        boxSizing: "border-box",
        maxWidth: "100%",
      }}
    >
      <hr
        style={{
          borderTop: `${thickness}px ${lineStyle} ${color}`,
          margin: `${activeMarginY}px 0`,
          width: activeWidth,
          maxWidth: "100%",
          border: "none",
          borderTopStyle: lineStyle,
          borderTopWidth: `${thickness}px`,
          borderTopColor: color,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

CraftDivider.craft = {
  displayName: "Divider",
  props: {
    thickness: 1,
    color: "#e5e7eb",
    lineStyle: "solid",
    width: "100%",
    marginY: 16,
    tabletMarginY: "",
    mobileMarginY: "",
    tabletWidth: "",
    mobileWidth: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: { canDrag: () => true },
};

export default CraftDivider;
