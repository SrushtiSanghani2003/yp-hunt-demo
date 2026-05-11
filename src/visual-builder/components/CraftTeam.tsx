import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";
import { concatImgURL } from "../../config/function";

interface TeamMember {
  id?: string;
  name: string;
  designation: string;
  short_bio: string;
  image_url: string;
  order?: number;
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
  bioFontSize?: number;
  nameColor?: string;
  roleColor?: string;
  bioColor?: string;
  imageSize?: number;
  layout?: "grid" | "horizontal";
  showImage?: boolean;
  showBio?: boolean;
  padding?: number;
  backgroundColor?: string;
  width?: string;
  height?: string;
  tabletColumns?: number | "";
  mobileColumns?: number | "";
  tabletGap?: number | "";
  mobileGap?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

const defaultMembers: TeamMember[] = [
  { name: "Jane Smith", designation: "CEO", short_bio: "", image_url: "", order: 1 },
  { name: "John Doe", designation: "CTO", short_bio: "", image_url: "", order: 2 },
  { name: "Alice Brown", designation: "Designer", short_bio: "", image_url: "", order: 3 },
];

function normalizeMembers(value: CraftTeamProps["members"]): TeamMember[] {
  let rawItems: any[] = [];

  if (Array.isArray(value)) {
    rawItems = value;
  } else if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      rawItems = Array.isArray(parsed) ? parsed : [];
    } catch {
      rawItems = [];
    }
  }

  return rawItems
    .map((item, index) => ({
      id: typeof item?.id === "string" ? item.id : undefined,
      name: typeof item?.name === "string" && item.name.trim()
        ? item.name
        : `Member ${index + 1}`,
      designation: typeof item?.designation === "string"
        ? item.designation
        : (typeof item?.role === "string" ? item.role : ""),
      short_bio: typeof item?.short_bio === "string"
        ? item.short_bio
        : (typeof item?.bio === "string" ? item.bio : ""),
      image_url: typeof item?.image_url === "string"
        ? item.image_url
        : (typeof item?.image === "string"
          ? item.image
          : (typeof item?.avatar === "string" ? item.avatar : "")),
      order: typeof item?.order === "number" ? item.order : index + 1,
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export const CraftTeam = ({
  members = JSON.stringify(defaultMembers),
  columns = 3,
  gap = 16,
  cardBackgroundColor = "#ffffff",
  cardBorderRadius = 12,
  cardBorderWidth = 1,
  cardBorderColor = "#e5e7eb",
  cardPadding = 16,
  nameFontSize = 16,
  roleFontSize = 13,
  bioFontSize = 13,
  nameColor = "#1f2937",
  roleColor = "#6b7280",
  bioColor = "#4b5563",
  imageSize = 80,
  layout = "grid",
  showImage = true,
  showBio = true,
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

  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try {
    device = useDeviceMode();
  } catch {
    /* context may not exist */
  }

  if (device === "mobile" && hideOnMobile) return null;
  if (device === "tablet" && hideOnTablet) return null;
  if (device === "desktop" && hideOnDesktop) return null;

  let activeColumns = columns;
  let activeGap = gap;

  if (device === "tablet") {
    if (tabletColumns !== "" && tabletColumns !== undefined) activeColumns = Number(tabletColumns);
    else activeColumns = Math.min(columns, 2);
    if (tabletGap !== "" && tabletGap !== undefined) activeGap = Number(tabletGap);
  } else if (device === "mobile") {
    if (tabletColumns !== "" && tabletColumns !== undefined) activeColumns = Number(tabletColumns);
    else activeColumns = Math.min(columns, 2);
    if (mobileColumns !== "" && mobileColumns !== undefined) activeColumns = Number(mobileColumns);
    else activeColumns = 1;
    if (tabletGap !== "" && tabletGap !== undefined) activeGap = Number(tabletGap);
    if (mobileGap !== "" && mobileGap !== undefined) activeGap = Number(mobileGap);
  }

  const parsedMembers = normalizeMembers(members);
  const displayMembers = parsedMembers.length > 0 ? parsedMembers : defaultMembers;

  const getInitials = (name: string): string =>
    name
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);

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
    outline: isActive ? "2px solid #3b82f6" : "none",
    transition: "all 0.15s ease",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: cardBackgroundColor,
    borderRadius: `${cardBorderRadius}px`,
    border: cardBorderWidth > 0 ? `${cardBorderWidth}px solid ${cardBorderColor}` : "none",
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

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      <div style={gridStyle}>
        {displayMembers.map((member, idx) => (
          <div key={member.id || idx} style={cardStyle}>
            {showImage && (
              member.image_url ? (
                <img src={concatImgURL(member.image_url)} alt={member.name} style={imageStyle} />
              ) : (
                <div style={avatarStyle}>{getInitials(member.name)}</div>
              )
            )}
            <h3 style={{ fontSize: `${nameFontSize}px`, fontWeight: 600, color: nameColor, margin: "0 0 4px" }}>
              {member.name}
            </h3>
            {member.designation && (
              <p style={{ fontSize: `${roleFontSize}px`, color: roleColor, margin: 0 }}>
                {member.designation}
              </p>
            )}
            {showBio && member.short_bio && (
              <p style={{ fontSize: `${bioFontSize}px`, color: bioColor, margin: "8px 0 0", lineHeight: 1.5 }}>
                {member.short_bio}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

CraftTeam.craft = {
  displayName: "Team Members",
  props: {
    members: JSON.stringify(defaultMembers),
    columns: 3,
    gap: 16,
    cardBackgroundColor: "#ffffff",
    cardBorderRadius: 12,
    cardBorderWidth: 1,
    cardBorderColor: "#e5e7eb",
    cardPadding: 16,
    nameFontSize: 16,
    roleFontSize: 13,
    bioFontSize: 13,
    nameColor: "#1f2937",
    roleColor: "#6b7280",
    bioColor: "#4b5563",
    imageSize: 80,
    layout: "grid",
    showImage: true,
    showBio: true,
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
