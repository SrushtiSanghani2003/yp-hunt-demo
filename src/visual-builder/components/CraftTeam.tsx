import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface CraftTeamProps {
  members?: string | TeamMember[];
  columns?: number;
  gap?: number;
  cardBackgroundColor?: string;
  cardBorderRadius?: number;
  cardBorderWidth?: number;
  cardBorderColor?: string;
  cardPadding?: number;
  nameFontSize?: number;
  roleFontSize?: number;
  nameColor?: string;
  roleColor?: string;
  imageSize?: number;
  layout?: "grid" | "horizontal";
  showImage?: boolean;
  padding?: number;
  backgroundColor?: string;
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

export const CraftTeam = ({
  members = JSON.stringify([
    { name: "Jane Smith", role: "CEO", image: "" },
    { name: "John Doe", role: "CTO", image: "" },
    { name: "Alice Brown", role: "Designer", image: "" },
  ]),
  columns = 3,
  gap = 16,
  cardBackgroundColor = "#ffffff",
  cardBorderRadius = 12,
  cardBorderWidth = 1,
  cardBorderColor = "#e5e7eb",
  cardPadding = 16,
  nameFontSize = 16,
  roleFontSize = 13,
  nameColor = "#1f2937",
  roleColor = "#6b7280",
  imageSize = 80,
  layout = "grid",
  showImage = true,
  padding = 0,
  backgroundColor = "transparent",
  width = "100%",
  height = "",
  tabletColumns = 2,
  mobileColumns = 1,
  tabletGap = "",
  mobileGap = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftTeamProps) => {
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

  // Responsive overrides
  let activeColumns = columns;
  let activeGap = gap;

  if (device === "tablet") {
    if (tabletColumns !== "" && tabletColumns !== undefined)
      activeColumns = Number(tabletColumns);
    else activeColumns = Math.min(columns, 2);
    if (tabletGap !== "" && tabletGap !== undefined)
      activeGap = Number(tabletGap);
  } else if (device === "mobile") {
    if (tabletColumns !== "" && tabletColumns !== undefined)
      activeColumns = Number(tabletColumns);
    else activeColumns = Math.min(columns, 2);
    if (mobileColumns !== "" && mobileColumns !== undefined)
      activeColumns = Number(mobileColumns);
    else activeColumns = 1;
    if (tabletGap !== "" && tabletGap !== undefined)
      activeGap = Number(tabletGap);
    if (mobileGap !== "" && mobileGap !== undefined)
      activeGap = Number(mobileGap);
  }

  const normalizeMembers = (raw: any[]): TeamMember[] =>
    raw.map((item, index) => ({
      name: typeof item?.name === "string" && item.name.trim()
        ? item.name
        : `Member ${index + 1}`,
      role: typeof item?.role === "string" ? item.role : "",
      image: typeof item?.image === "string"
        ? item.image
        : (typeof item?.avatar === "string" ? item.avatar : ""),
    }));

  // Parse members
  let parsedMembers: TeamMember[] = [];
  if (Array.isArray(members)) {
    parsedMembers = normalizeMembers(members);
  } else if (typeof members === "string") {
    try {
      const parsed = JSON.parse(members);
      parsedMembers = Array.isArray(parsed) ? normalizeMembers(parsed) : [];
    } catch {
      parsedMembers = [];
    }
  }

  if (parsedMembers.length === 0) {
    parsedMembers = [
      { name: "Jane Smith", role: "CEO", image: "" },
      { name: "John Doe", role: "CTO", image: "" },
      { name: "Alice Brown", role: "Designer", image: "" },
    ];
  }

  // Get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const containerStyle: React.CSSProperties = {
    padding: `${padding}px`,
    backgroundColor,
    width: width || "100%",
    height: height || undefined,
    boxSizing: "border-box",
  };

  const gridStyle: React.CSSProperties = {
    display: layout === "grid" ? "grid" : "flex",
    gridTemplateColumns:
      layout === "grid" ? `repeat(${activeColumns}, minmax(0, 1fr))` : undefined,
    flexDirection: layout === "horizontal" ? "row" : undefined,
    flexWrap: layout === "horizontal" ? "wrap" : undefined,
    gap: `${activeGap}px`,
    cursor: "grab",
    outline: isActive ? `2px solid #3b82f6` : "none",
    transition: "all 0.15s ease",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: cardBackgroundColor,
    borderRadius: `${cardBorderRadius}px`,
    border:
      cardBorderWidth > 0
        ? `${cardBorderWidth}px solid ${cardBorderColor}`
        : "none",
    padding: `${cardPadding}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  };

  const imageStyle: React.CSSProperties = {
    width: `${imageSize}px`,
    height: `${imageSize}px`,
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "12px",
    flexShrink: 0,
  };

  const avatarStyle: React.CSSProperties = {
    width: `${imageSize}px`,
    height: `${imageSize}px`,
    borderRadius: "50%",
    backgroundColor: "#f59e0b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: `${Math.floor(imageSize / 2)}px`,
    fontWeight: "bold",
    marginBottom: "12px",
    flexShrink: 0,
  };

  const nameStyle: React.CSSProperties = {
    fontSize: `${nameFontSize}px`,
    fontWeight: "600",
    color: nameColor,
    margin: "0 0 4px 0",
  };

  const roleStyle: React.CSSProperties = {
    fontSize: `${roleFontSize}px`,
    color: roleColor,
    margin: 0,
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      <div style={gridStyle}>
        {parsedMembers.map((member, idx) => (
          <div key={idx} style={cardStyle}>
            {showImage && (
              <>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={imageStyle} />
                ) : (
                  <div style={avatarStyle}>{getInitials(member.name)}</div>
                )}
              </>
            )}
            <h3 style={nameStyle}>{member.name}</h3>
            <p style={roleStyle}>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

CraftTeam.craft = {
  displayName: "Team Members",
  props: {
    members: JSON.stringify([
      { name: "Jane Smith", role: "CEO", image: "" },
      { name: "John Doe", role: "CTO", image: "" },
      { name: "Alice Brown", role: "Designer", image: "" },
    ]),
    columns: 3,
    gap: 16,
    cardBackgroundColor: "#ffffff",
    cardBorderRadius: 12,
    cardBorderWidth: 1,
    cardBorderColor: "#e5e7eb",
    cardPadding: 16,
    nameFontSize: 16,
    roleFontSize: 13,
    nameColor: "#1f2937",
    roleColor: "#6b7280",
    imageSize: 80,
    layout: "grid",
    showImage: true,
    padding: 0,
    backgroundColor: "transparent",
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

export default CraftTeam;
