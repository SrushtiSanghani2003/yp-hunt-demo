import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftSpacerProps {
  height?: number;
  width?: string;
  /** Responsive overrides */
  tabletHeight?: number | "";
  mobileHeight?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftSpacer = ({
  height = 20,
  width = "100%",
  tabletHeight = "",
  mobileHeight = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftSpacerProps) => {
  const {
    connectors: { connect, drag },
    isActive,
  } = useNode((state) => ({
    isActive: state.events.selected,
  }));

  // Device-aware overrides
  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try { device = useDeviceMode(); } catch { /* context may not exist */ }

  // Visibility check
  if (device === "mobile" && hideOnMobile) return null;
  if (device === "tablet" && hideOnTablet) return null;
  if (device === "desktop" && hideOnDesktop) return null;

  let activeHeight = height;

  if (device === "tablet") {
    if (tabletHeight !== "" && tabletHeight !== undefined) activeHeight = Number(tabletHeight);
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
    if (tabletHeight !== "" && tabletHeight !== undefined) activeHeight = Number(tabletHeight);
    if (mobileHeight !== "" && mobileHeight !== undefined) activeHeight = Number(mobileHeight);
  }

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        height: `${activeHeight}px`,
        width: width || "100%",
        backgroundColor: isActive ? "rgba(252, 209, 0, 0.08)" : "transparent",
        cursor: "grab",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s ease",
        borderTop: "1px dashed #e5e7eb",
        borderBottom: "1px dashed #e5e7eb",
        boxSizing: "border-box",
      }}
    >
      <span style={{ fontSize: "10px", color: "#9ca3af", userSelect: "none" }}>{activeHeight}px</span>
    </div>
  );
};

CraftSpacer.craft = {
  displayName: "Spacer",
  props: {
    height: 20,
    width: "100%",
    tabletHeight: "",
    mobileHeight: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: { canDrag: () => true },
};

export default CraftSpacer;
