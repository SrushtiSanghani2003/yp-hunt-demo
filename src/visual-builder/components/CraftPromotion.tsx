import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftPromotionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaBackgroundColor?: string;
  ctaTextColor?: string;
  ctaBorderRadius?: number;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  subtitleColor?: string;
  titleFontSize?: number;
  descriptionFontSize?: number;
  borderRadius?: number;
  padding?: number;
  textAlign?: "left" | "center" | "right";
  layout?: "banner" | "split";
  width?: string;
  height?: string;
  /** Responsive overrides */
  tabletTitleFontSize?: number | "";
  mobileTitleFontSize?: number | "";
  tabletPadding?: number | "";
  mobilePadding?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftPromotion = ({
  title = "Special Offer",
  subtitle = "Limited time only",
  description = "Get 50% off on all premium plans",
  ctaText = "Get Started",
  ctaUrl = "",
  ctaBackgroundColor = "#f59e0b",
  ctaTextColor = "#000000",
  ctaBorderRadius = 8,
  backgroundImage = "",
  backgroundColor = "#1f2937",
  textColor = "#ffffff",
  subtitleColor = "#fbbf24",
  titleFontSize = 28,
  descriptionFontSize = 16,
  borderRadius = 12,
  padding = 32,
  textAlign = "center",
  layout = "banner",
  width = "100%",
  height = "",
  tabletTitleFontSize = "",
  mobileTitleFontSize = "",
  tabletPadding = "",
  mobilePadding = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftPromotionProps) => {
  const {
    connectors: { connect, drag },
    isActive,
  } = useNode((state) => ({
    isActive: state.events.selected,
  }));

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

  let activeTitleFontSize = titleFontSize;
  let activePadding = padding;

  if (device === "tablet") {
    if (tabletTitleFontSize !== "" && tabletTitleFontSize !== undefined)
      activeTitleFontSize = Number(tabletTitleFontSize);
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
    if (tabletTitleFontSize !== "" && tabletTitleFontSize !== undefined)
      activeTitleFontSize = Number(tabletTitleFontSize);
    if (mobileTitleFontSize !== "" && mobileTitleFontSize !== undefined)
      activeTitleFontSize = Number(mobileTitleFontSize);
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
    if (mobilePadding !== "" && mobilePadding !== undefined)
      activePadding = Number(mobilePadding);
  }

  const containerStyle: React.CSSProperties = {
    position: "relative",
    borderRadius: `${borderRadius}px`,
    overflow: "hidden",
    backgroundColor,
    cursor: "grab",
    outline: isActive ? `2px solid #3b82f6` : "none",
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: width || "100%",
    height: height || undefined,
    boxSizing: "border-box",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: backgroundImage
      ? `rgba(31, 41, 55, 0.7)`
      : "transparent",
    zIndex: 1,
  };

  const contentStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 2,
    padding: `${activePadding}px`,
    display: layout === "split" ? "flex" : "block",
    gap: "40px",
    alignItems: layout === "split" ? "center" : undefined,
    justifyContent: layout === "split" ? "space-between" : undefined,
  };

  const textWrapperStyle: React.CSSProperties = {
    flex: layout === "split" ? 1 : undefined,
    minWidth: 0,
    textAlign: textAlign as any,
  };

  const subtitleStyle: React.CSSProperties = {
    margin: "0 0 8px 0",
    fontSize: "14px",
    color: subtitleColor,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "600",
  };

  const titleStyle: React.CSSProperties = {
    margin: "0 0 16px 0",
    fontSize: `${activeTitleFontSize}px`,
    fontWeight: "700",
    color: textColor,
    lineHeight: "1.2",
  };

  const descriptionStyle: React.CSSProperties = {
    margin: "0 0 24px 0",
    fontSize: `${descriptionFontSize}px`,
    color: textColor,
    lineHeight: "1.6",
  };

  const ctaButtonStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "12px 32px",
    backgroundColor: ctaBackgroundColor,
    color: ctaTextColor,
    borderRadius: `${ctaBorderRadius}px`,
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  };

  const imageSpaceStyle: React.CSSProperties = {
    flex: layout === "split" ? 1 : undefined,
    minHeight: layout === "split" ? "300px" : undefined,
    backgroundColor: layout === "split" ? "rgba(255, 255, 255, 0.1)" : undefined,
    borderRadius: "8px",
    display: layout === "split" ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "14px",
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      {backgroundImage && <div style={overlayStyle}></div>}
      <div style={contentStyle}>
        <div style={textWrapperStyle}>
          <div style={subtitleStyle}>{subtitle}</div>
          <div style={titleStyle}>{title}</div>
          <div style={descriptionStyle}>{description}</div>
          <a href={ctaUrl || "#"} style={ctaButtonStyle}>
            {ctaText}
          </a>
        </div>
        {layout === "split" && <div style={imageSpaceStyle}>Image Space</div>}
      </div>
    </div>
  );
};

CraftPromotion.craft = {
  displayName: "Promotion",
  props: {
    title: "Special Offer",
    subtitle: "Limited time only",
    description: "Get 50% off on all premium plans",
    ctaText: "Get Started",
    ctaUrl: "",
    ctaBackgroundColor: "#f59e0b",
    ctaTextColor: "#000000",
    ctaBorderRadius: 8,
    backgroundImage: "",
    backgroundColor: "#1f2937",
    textColor: "#ffffff",
    subtitleColor: "#fbbf24",
    titleFontSize: 28,
    descriptionFontSize: 16,
    borderRadius: 12,
    padding: 32,
    textAlign: "center",
    layout: "banner",
    width: "100%",
    height: "",
    tabletTitleFontSize: "",
    mobileTitleFontSize: "",
    tabletPadding: "",
    mobilePadding: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: {
    canDrag: () => true,
  },
};

export default CraftPromotion;
