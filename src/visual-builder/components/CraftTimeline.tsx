import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftTimelineProps {
  items?: string | TimelineItem[];
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  dateColor?: string;
  lineColor?: string;
  titleFontSize?: number;
  dateFontSize?: number;
  descriptionFontSize?: number;
  padding?: number;
  gap?: number;
  dotSize?: number;
  lineWidth?: number;
  layout?: "left" | "alternating";
  width?: string;
  height?: string;
  /** Responsive overrides */
  tabletPadding?: number | "";
  mobilePadding?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

interface TimelineItem {
  title: string;
  date: string;
  description: string;
}

export const CraftTimeline = ({
  items = JSON.stringify([
    { title: "Founded", date: "2020", description: "Company was established" },
    { title: "Growth", date: "2022", description: "Reached 1M users" },
    { title: "Expansion", date: "2024", description: "Launched globally" },
  ]),
  accentColor = "#f59e0b",
  backgroundColor = "transparent",
  textColor = "#1f2937",
  dateColor = "#6b7280",
  lineColor = "#e5e7eb",
  titleFontSize = 16,
  dateFontSize = 13,
  descriptionFontSize = 14,
  padding = 16,
  gap = 24,
  dotSize = 12,
  lineWidth = 2,
  layout = "left",
  width = "100%",
  height = "",
  tabletPadding = "",
  mobilePadding = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftTimelineProps) => {
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

  let activePadding = padding;

  if (device === "tablet") {
    if (tabletPadding !== "" && tabletPadding !== undefined) {
      activePadding = Number(tabletPadding);
    }
  } else if (device === "mobile") {
    if (tabletPadding !== "" && tabletPadding !== undefined) {
      activePadding = Number(tabletPadding);
    }
    if (mobilePadding !== "" && mobilePadding !== undefined) {
      activePadding = Number(mobilePadding);
    }
  }

  const normalizeTimelineItems = (raw: any[]): TimelineItem[] =>
    raw.map((item, index) => ({
      title: typeof item?.title === "string" && item.title.trim()
        ? item.title
        : `Milestone ${index + 1}`,
      date: typeof item?.date === "string" ? item.date : "",
      description: typeof item?.description === "string" ? item.description : "",
    }));

  let timelineItems: TimelineItem[] = [];
  if (Array.isArray(items)) {
    timelineItems = normalizeTimelineItems(items);
  } else if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items);
      timelineItems = Array.isArray(parsed) ? normalizeTimelineItems(parsed) : [];
    } catch {
      timelineItems = [];
    }
  }

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        cursor: "grab",
        backgroundColor,
        padding: `${activePadding}px`,
        boxSizing: "border-box",
        maxWidth: "100%",
        width: width || "100%",
        height: height || undefined,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: `${gap}px`,
          paddingLeft: layout === "left" ? `${dotSize + gap + 8}px` : "0",
        }}
      >
        {/* Vertical line */}
        {layout === "left" && (
          <div
            style={{
              position: "absolute",
              left: `${dotSize / 2 - lineWidth / 2}px`,
              top: 0,
              bottom: 0,
              width: `${lineWidth}px`,
              backgroundColor: lineColor,
            }}
          />
        )}

        {timelineItems.map((item, index) => {
          const isAlternatingRight = layout === "alternating" && index % 2 === 1;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: `${gap}px`,
                justifyContent: isAlternatingRight ? "flex-end" : "flex-start",
              }}
            >
              {/* Dot - always on left for "left" layout, alternates for "alternating" */}
              {layout === "left" ? (
                <div
                  style={{
                    position: "absolute",
                    left: `-${dotSize / 2 + gap + 8}px`,
                    width: `${dotSize}px`,
                    height: `${dotSize}px`,
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    marginTop: "4px",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: `${dotSize}px`,
                    height: `${dotSize}px`,
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    marginTop: "4px",
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Content */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: `${titleFontSize}px`,
                    fontWeight: "bold",
                    color: textColor,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: `${dateFontSize}px`,
                    color: dateColor,
                  }}
                >
                  {item.date}
                </p>
                <p
                  style={{
                    margin: "0",
                    fontSize: `${descriptionFontSize}px`,
                    color: textColor,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CraftTimeline.craft = {
  displayName: "Timeline",
  props: {
    items: JSON.stringify([
      { title: "Founded", date: "2020", description: "Company was established" },
      { title: "Growth", date: "2022", description: "Reached 1M users" },
      { title: "Expansion", date: "2024", description: "Launched globally" },
    ]),
    accentColor: "#f59e0b",
    backgroundColor: "transparent",
    textColor: "#1f2937",
    dateColor: "#6b7280",
    lineColor: "#e5e7eb",
    titleFontSize: 16,
    dateFontSize: 13,
    descriptionFontSize: 14,
    padding: 16,
    gap: 24,
    dotSize: 12,
    lineWidth: 2,
    layout: "left",
    width: "100%",
    height: "",
    tabletPadding: "",
    mobilePadding: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: { canDrag: () => true },
};

export default CraftTimeline;
