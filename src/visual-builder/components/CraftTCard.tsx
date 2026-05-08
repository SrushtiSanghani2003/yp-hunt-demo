import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

interface TCardItem {
  image?: string;
  title?: string;
  description?: string;
}

export interface CraftTCardProps {
  items?: string | TCardItem[];
  columns?: number;
  gap?: number;
  cardBackgroundColor?: string;
  cardBorderRadius?: number;
  cardBorderWidth?: number;
  cardBorderColor?: string;
  imageHeight?: string;
  titleFontSize?: number;
  descriptionFontSize?: number;
  titleColor?: string;
  descriptionColor?: string;
  padding?: number;
  backgroundColor?: string;
  layout?: "vertical" | "horizontal";
  width?: string;
  height?: string;
  /** Responsive overrides */
  tabletColumns?: number | "";
  mobileColumns?: number | "";
  tabletGap?: number | "";
  mobileGap?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftTCard = ({
  items = JSON.stringify([
    {
      image: "",
      title: "Feature One",
      description: "Description of the first feature",
    },
    {
      image: "",
      title: "Feature Two",
      description: "Description of the second feature",
    },
    {
      image: "",
      title: "Feature Three",
      description: "Description of the third feature",
    },
  ]),
  columns = 3,
  gap = 16,
  cardBackgroundColor = "#ffffff",
  cardBorderRadius = 8,
  cardBorderWidth = 1,
  cardBorderColor = "#e5e7eb",
  imageHeight = "180px",
  titleFontSize = 16,
  descriptionFontSize = 14,
  titleColor = "#1f2937",
  descriptionColor = "#6b7280",
  padding = 0,
  backgroundColor = "transparent",
  layout = "vertical",
  width = "100%",
  height = "",
  tabletColumns = 2,
  mobileColumns = 1,
  tabletGap = "",
  mobileGap = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftTCardProps) => {
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

  let activeColumns = columns;
  let activeGap = gap;

  if (device === "tablet") {
    if (tabletColumns !== "" && tabletColumns !== undefined)
      activeColumns = Number(tabletColumns);
    else activeColumns = Math.min(columns, 2);
    if (tabletGap !== "" && tabletGap !== undefined) activeGap = Number(tabletGap);
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
    if (tabletColumns !== "" && tabletColumns !== undefined)
      activeColumns = Number(tabletColumns);
    else activeColumns = Math.min(columns, 2);
    if (mobileColumns !== "" && mobileColumns !== undefined)
      activeColumns = Number(mobileColumns);
    else activeColumns = 1;
    if (tabletGap !== "" && tabletGap !== undefined) activeGap = Number(tabletGap);
    if (mobileGap !== "" && mobileGap !== undefined) activeGap = Number(mobileGap);
  }

  const normalizeItems = (raw: any[]): TCardItem[] =>
    raw.map((item) => ({
      image: typeof item?.image === "string"
        ? item.image
        : (typeof item?.image_url === "string" ? item.image_url : ""),
      title: typeof item?.title === "string" ? item.title : "",
      description: typeof item?.description === "string" ? item.description : "",
    }));

  let parsedItems: TCardItem[] = [];
  if (Array.isArray(items)) {
    parsedItems = normalizeItems(items);
  } else if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items);
      parsedItems = Array.isArray(parsed) ? normalizeItems(parsed) : [];
    } catch {
      parsedItems = [];
    }
  }

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns:
      layout === "vertical"
        ? `repeat(${Math.max(1, activeColumns)}, minmax(0, 1fr))`
        : "1fr",
    gap: `${activeGap}px`,
    padding: `${padding}px`,
    backgroundColor,
    width: width || "100%",
    height: height || undefined,
    cursor: "grab",
    outline: isActive ? `2px solid #3b82f6` : "none",
    boxSizing: "border-box",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: cardBackgroundColor,
    borderRadius: `${cardBorderRadius}px`,
    border:
      cardBorderWidth > 0
        ? `${cardBorderWidth}px solid ${cardBorderColor}`
        : "none",
    overflow: "hidden",
    transition: "all 0.15s ease",
    display: layout === "horizontal" ? "flex" : "block",
    gap: layout === "horizontal" ? `${activeGap}px` : undefined,
    alignItems: layout === "horizontal" ? "center" : undefined,
    boxSizing: "border-box",
  };

  const imageWrapperStyle: React.CSSProperties = {
    width: layout === "horizontal" ? "200px" : "100%",
    height: layout === "horizontal" ? "150px" : imageHeight,
    backgroundColor: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "#9ca3af",
    flexShrink: 0,
  };

  const textWrapperStyle: React.CSSProperties = {
    padding: layout === "horizontal" ? "0" : "16px",
    flex: layout === "horizontal" ? 1 : undefined,
    minWidth: 0,
  };

  const titleStyle: React.CSSProperties = {
    margin: "0 0 8px 0",
    fontSize: `${titleFontSize}px`,
    fontWeight: "600",
    color: titleColor,
    lineHeight: "1.4",
  };

  const descriptionStyle: React.CSSProperties = {
    margin: 0,
    fontSize: `${descriptionFontSize}px`,
    color: descriptionColor,
    lineHeight: "1.5",
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      {parsedItems.map((item, index) => (
        <div key={index} style={cardStyle}>
          <div style={imageWrapperStyle}>
            {item.image ? (
              <img
                src={item.image}
                alt={item.title || `Card ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              "Image"
            )}
          </div>
          <div style={textWrapperStyle}>
            <div style={titleStyle}>{item.title}</div>
            <div style={descriptionStyle}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

CraftTCard.craft = {
  displayName: "T-Card",
  props: {
    items: JSON.stringify([
      {
        image: "",
        title: "Feature One",
        description: "Description of the first feature",
      },
      {
        image: "",
        title: "Feature Two",
        description: "Description of the second feature",
      },
      {
        image: "",
        title: "Feature Three",
        description: "Description of the third feature",
      },
    ]),
    columns: 3,
    gap: 16,
    cardBackgroundColor: "#ffffff",
    cardBorderRadius: 8,
    cardBorderWidth: 1,
    cardBorderColor: "#e5e7eb",
    imageHeight: "180px",
    titleFontSize: 16,
    descriptionFontSize: 14,
    titleColor: "#1f2937",
    descriptionColor: "#6b7280",
    padding: 0,
    backgroundColor: "transparent",
    layout: "vertical",
    width: "100%",
    height: "",
    tabletColumns: 2,
    mobileColumns: 1,
    tabletGap: "",
    mobileGap: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: {
    canDrag: () => true,
  },
};

export default CraftTCard;
