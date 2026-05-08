import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftTestimonialProps {
  quote?: string;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string;
  rating?: number;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  padding?: number;
  fontSize?: number;
  layout?: "card" | "minimal" | "centered";
  width?: string;
  height?: string;
  /** Responsive overrides */
  tabletFontSize?: number | "";
  mobileFontSize?: number | "";
  tabletPadding?: number | "";
  mobilePadding?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftTestimonial = ({
  quote = "This is an amazing product that changed our workflow completely.",
  authorName = "John Doe",
  authorTitle = "CEO, Company",
  authorImage = "",
  rating = 5,
  backgroundColor = "#ffffff",
  textColor = "#374151",
  accentColor = "#f59e0b",
  borderRadius = 12,
  borderWidth = 1,
  borderColor = "#e5e7eb",
  padding = 24,
  fontSize = 16,
  layout = "card",
  width = "100%",
  height = "",
  tabletFontSize = "",
  mobileFontSize = "",
  tabletPadding = "",
  mobilePadding = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftTestimonialProps) => {
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

  let activeFontSize = fontSize;
  let activePadding = padding;

  if (device === "tablet") {
    if (tabletFontSize !== "" && tabletFontSize !== undefined)
      activeFontSize = Number(tabletFontSize);
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
    if (tabletFontSize !== "" && tabletFontSize !== undefined)
      activeFontSize = Number(tabletFontSize);
    if (mobileFontSize !== "" && mobileFontSize !== undefined)
      activeFontSize = Number(mobileFontSize);
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
    if (mobilePadding !== "" && mobilePadding !== undefined)
      activePadding = Number(mobilePadding);
  }

  // Render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? accentColor : "#e5e7eb" }}>
          {i < rating ? String.fromCharCode(9733) : String.fromCharCode(9734)}
        </span>
      );
    }
    return stars;
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    padding: `${activePadding}px`,
    borderRadius: `${borderRadius}px`,
    border: borderWidth ? `${borderWidth}px solid ${borderColor}` : "none",
    boxShadow: layout === "minimal" ? "none" : "0 1px 3px rgba(0, 0, 0, 0.1)",
    cursor: "grab",
    textAlign: layout === "centered" ? "center" : "left",
    fontSize: `${activeFontSize}px`,
    lineHeight: "1.6",
    boxSizing: "border-box",
    transition: "all 0.15s ease",
    outline: isActive ? `2px solid #3b82f6` : "none",
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        ...cardStyle,
        width: width || "100%",
        height: height || undefined,
        boxSizing: "border-box",
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          fontSize: `${activeFontSize + 8}px`,
          color: accentColor,
          marginBottom: "12px",
          fontWeight: "bold",
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        style={{
          margin: "0 0 16px 0",
          fontSize: `${activeFontSize}px`,
          fontStyle: "italic",
          color: textColor,
        }}
      >
        {quote}
      </p>

      {/* Rating */}
      {rating > 0 && (
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            gap: "4px",
            justifyContent: layout === "centered" ? "center" : "flex-start",
          }}
        >
          {renderStars()}
        </div>
      )}

      {/* Author section */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: layout === "centered" ? "center" : "flex-start",
          flexDirection: layout === "centered" ? "column" : "row",
        }}
      >
        {/* Author avatar */}
        {authorImage ? (
          <img
            src={authorImage}
            alt={authorName}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {authorName.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Author info */}
        <div>
          <div
            style={{
              fontWeight: "600",
              color: textColor,
              fontSize: `${activeFontSize}px`,
            }}
          >
            {authorName}
          </div>
          <div
            style={{
              color: "#6b7280",
              fontSize: `${Math.max(activeFontSize - 2, 12)}px`,
            }}
          >
            {authorTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

CraftTestimonial.craft = {
  displayName: "Testimonial",
  props: {
    quote: "This is an amazing product that changed our workflow completely.",
    authorName: "John Doe",
    authorTitle: "CEO, Company",
    authorImage: "",
    rating: 5,
    backgroundColor: "#ffffff",
    textColor: "#374151",
    accentColor: "#f59e0b",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 24,
    fontSize: 16,
    layout: "card",
    width: "100%",
    height: "",
    tabletFontSize: "",
    mobileFontSize: "",
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

export default CraftTestimonial;
