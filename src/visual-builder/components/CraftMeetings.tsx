import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

interface MeetingItem {
  title?: string;
  datetime?: string;
  date?: string;
  time?: string;
  location?: string;
  description?: string;
}

export interface CraftMeetingsProps {
  meetings?: string | MeetingItem[];
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  padding?: number;
  gap?: number;
  accentColor?: string;
  titleColor?: string;
  timeColor?: string;
  locationColor?: string;
  titleFontSize?: number;
  showLocation?: boolean;
  showDescription?: boolean;
  layout?: "list" | "cards";
  width?: string;
  height?: string;
  /** Responsive overrides */
  tabletPadding?: number | "";
  mobilePadding?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftMeetings = ({
  meetings = JSON.stringify([
    {
      title: "Team Standup",
      datetime: "2024-03-15T09:00:00",
      location: "Conference Room A",
      description: "Daily sync meeting",
    },
    {
      title: "Client Review",
      datetime: "2024-03-15T14:00:00",
      location: "Virtual - Zoom",
      description: "Q1 progress review",
    },
  ]),
  backgroundColor = "#ffffff",
  borderRadius = 8,
  borderWidth = 1,
  borderColor = "#e5e7eb",
  padding = 16,
  gap = 12,
  accentColor = "#f59e0b",
  titleColor = "#1f2937",
  timeColor = "#6b7280",
  locationColor = "#9ca3af",
  titleFontSize = 15,
  showLocation = true,
  showDescription = true,
  layout = "list",
  width = "100%",
  height = "",
  tabletPadding = "",
  mobilePadding = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftMeetingsProps) => {
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

  let activePadding = padding;

  if (device === "tablet") {
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
    if (mobilePadding !== "" && mobilePadding !== undefined)
      activePadding = Number(mobilePadding);
  }

  const normalizeMeetings = (rawMeetings: unknown): MeetingItem[] => {
    if (!Array.isArray(rawMeetings)) return [];

    return rawMeetings.map((item, index) => ({
      title: typeof item?.title === "string" && item.title.trim()
        ? item.title
        : `Meeting ${index + 1}`,
      datetime: typeof item?.datetime === "string"
        ? item.datetime
        : (
          typeof item?.date === "string" && item.date.trim()
            ? `${item.date}T${typeof item?.time === "string" && item.time.trim() ? item.time : "00:00"}`
            : ""
        ),
      date: typeof item?.date === "string" ? item.date : "",
      time: typeof item?.time === "string" ? item.time : "",
      location: typeof item?.location === "string" ? item.location : "",
      description: typeof item?.description === "string" ? item.description : "",
    }));
  };

  let parsedMeetings: MeetingItem[] = [];
  if (Array.isArray(meetings)) {
    parsedMeetings = normalizeMeetings(meetings);
  } else if (typeof meetings === "string") {
    try {
      parsedMeetings = normalizeMeetings(JSON.parse(meetings));
    } catch {
      parsedMeetings = [];
    }
  }

  const toDateObject = (meeting: MeetingItem): Date | null => {
    const dateTimeValue = typeof meeting.datetime === "string" ? meeting.datetime : "";
    if (dateTimeValue.trim()) {
      const dt = new Date(dateTimeValue);
      if (!Number.isNaN(dt.getTime())) {
        return dt;
      }
    }

    const dateValue = typeof meeting.date === "string" ? meeting.date : "";
    if (dateValue.trim()) {
      const full = `${dateValue}T${typeof meeting.time === "string" && meeting.time.trim() ? meeting.time : "00:00"}`;
      const dt = new Date(full);
      if (!Number.isNaN(dt.getTime())) {
        return dt;
      }
    }

    return null;
  };

  const formatDateTime = (meeting: MeetingItem): { month: string; day: string; time: string } => {
    const date = toDateObject(meeting);
    const explicitTime = typeof meeting.time === "string" ? meeting.time.trim() : "";

    if (!date) {
      return {
        month: "TBD",
        day: "--",
        time: explicitTime || "",
      };
    }

    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = String(date.getDate()).padStart(2, "0");
    const computedTime = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return {
      month,
      day,
      time: explicitTime || computedTime,
    };
  };

  const containerStyle: React.CSSProperties = {
    display: layout === "cards" ? "grid" : "flex",
    gridTemplateColumns: layout === "cards" ? "repeat(auto-fit, minmax(280px, 1fr))" : undefined,
    flexDirection: layout === "list" ? "column" : undefined,
    gap: `${gap}px`,
    padding: `${activePadding}px`,
    backgroundColor,
    borderRadius: `${borderRadius}px`,
    border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
    width: width || "100%",
    height: height || undefined,
    cursor: "grab",
    outline: isActive ? "2px solid #3b82f6" : "none",
    boxSizing: "border-box",
  };

  const cardStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
    padding: layout === "cards" ? "16px" : "0",
    borderRadius: layout === "cards" ? `${borderRadius}px` : "0",
    backgroundColor: layout === "cards" ? "#f9fafb" : "transparent",
    border:
      layout === "cards" && borderWidth > 0
        ? `${borderWidth}px solid ${borderColor}`
        : "none",
    borderBottom: layout === "list" ? `1px solid ${borderColor}` : "none",
    paddingBottom: layout === "list" ? `${gap}px` : undefined,
    transition: "all 0.15s ease",
  };

  const lastCardStyle: React.CSSProperties = {
    ...cardStyle,
    borderBottom: "none",
    paddingBottom: layout === "list" ? 0 : undefined,
  };

  const badgeStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: accentColor,
    color: "#ffffff",
    borderRadius: "6px",
    padding: "8px 10px",
    minWidth: "50px",
    textAlign: "center",
    flexShrink: 0,
  };

  const badgeMonthStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: "700",
    lineHeight: "1.2",
    letterSpacing: "0.5px",
  };

  const badgeDayStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "1",
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const titleStyle: React.CSSProperties = {
    margin: "0 0 4px 0",
    fontSize: `${titleFontSize}px`,
    fontWeight: "600",
    color: titleColor,
    lineHeight: "1.4",
  };

  const metaStyle: React.CSSProperties = {
    margin: "2px 0",
    fontSize: `${Math.max(titleFontSize - 2, 12)}px`,
    color: timeColor,
    lineHeight: "1.3",
  };

  const locationStyle: React.CSSProperties = {
    margin: "4px 0",
    fontSize: `${Math.max(titleFontSize - 2, 12)}px`,
    color: locationColor,
    lineHeight: "1.3",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  const descriptionStyle: React.CSSProperties = {
    margin: "8px 0 0 0",
    fontSize: `${Math.max(titleFontSize - 3, 11)}px`,
    color: "#6b7280",
    lineHeight: "1.4",
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      {parsedMeetings.length === 0 ? (
        <div style={{ color: timeColor, textAlign: "center", padding: "20px 0" }}>
          No meetings added
        </div>
      ) : (
        parsedMeetings.map((meeting, index) => {
          const { month, day, time } = formatDateTime(meeting);
          return (
            <div
              key={index}
              style={
                index === parsedMeetings.length - 1 && layout === "list"
                  ? lastCardStyle
                  : cardStyle
              }
            >
              <div style={badgeStyle}>
                <div style={badgeMonthStyle}>{month}</div>
                <div style={badgeDayStyle}>{day}</div>
              </div>
              <div style={contentStyle}>
                <div style={titleStyle}>{meeting.title}</div>
                {time && <div style={metaStyle}>{time}</div>}
                {showLocation && meeting.location && (
                  <div style={locationStyle}>Location: {meeting.location}</div>
                )}
                {showDescription && meeting.description && (
                  <div style={descriptionStyle}>{meeting.description}</div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

CraftMeetings.craft = {
  displayName: "Meetings",
  props: {
    meetings: JSON.stringify([
      {
        title: "Team Standup",
        datetime: "2024-03-15T09:00:00",
        location: "Conference Room A",
        description: "Daily sync meeting",
      },
      {
        title: "Client Review",
        datetime: "2024-03-15T14:00:00",
        location: "Virtual - Zoom",
        description: "Q1 progress review",
      },
    ]),
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    gap: 12,
    accentColor: "#f59e0b",
    titleColor: "#1f2937",
    timeColor: "#6b7280",
    locationColor: "#9ca3af",
    titleFontSize: 15,
    showLocation: true,
    showDescription: true,
    layout: "list",
    width: "100%",
    height: "",
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

export default CraftMeetings;
