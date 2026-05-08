import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftSocialWallProps {
  platforms?: string | SocialPlatform[];
  iconSize?: number;
  gap?: number;
  iconColor?: string;
  hoverColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  layout?: "row" | "grid";
  columns?: number;
  showLabels?: boolean;
  labelFontSize?: number;
  labelColor?: string;
  width?: string;
  height?: string;
  /** Responsive overrides */
  tabletIconSize?: number | "";
  mobileIconSize?: number | "";
  tabletGap?: number | "";
  mobileGap?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

interface SocialPlatform {
  name: string;
  url: string;
  icon: string;
}

export const CraftSocialWall = ({
  platforms = JSON.stringify([
    { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
    { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  ]),
  iconSize = 32,
  gap = 16,
  iconColor = "#4b5563",
  hoverColor = "#f59e0b",
  backgroundColor = "transparent",
  borderRadius = 8,
  padding = 16,
  layout = "row",
  columns = 4,
  showLabels = false,
  labelFontSize = 12,
  labelColor = "#6b7280",
  width = "100%",
  height = "",
  tabletIconSize = "",
  mobileIconSize = "",
  tabletGap = "",
  mobileGap = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftSocialWallProps) => {
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

  let activeIconSize = iconSize;
  let activeGap = gap;

  if (device === "tablet") {
    if (tabletIconSize !== "" && tabletIconSize !== undefined) {
      activeIconSize = Number(tabletIconSize);
    }
    if (tabletGap !== "" && tabletGap !== undefined) {
      activeGap = Number(tabletGap);
    }
  } else if (device === "mobile") {
    if (tabletIconSize !== "" && tabletIconSize !== undefined) {
      activeIconSize = Number(tabletIconSize);
    }
    if (mobileIconSize !== "" && mobileIconSize !== undefined) {
      activeIconSize = Number(mobileIconSize);
    }
    if (tabletGap !== "" && tabletGap !== undefined) {
      activeGap = Number(tabletGap);
    }
    if (mobileGap !== "" && mobileGap !== undefined) {
      activeGap = Number(mobileGap);
    }
  }

  const normalizeSocialPlatforms = (raw: any[]): SocialPlatform[] =>
    raw.map((item) => ({
      name: typeof item?.name === "string" ? item.name : "",
      url: typeof item?.url === "string" ? item.url : "",
      icon: typeof item?.icon === "string" ? item.icon : "",
    }));

  let socialPlatforms: SocialPlatform[] = [];
  if (Array.isArray(platforms)) {
    socialPlatforms = normalizeSocialPlatforms(platforms);
  } else if (typeof platforms === "string") {
    try {
      const parsed = JSON.parse(platforms);
      socialPlatforms = Array.isArray(parsed) ? normalizeSocialPlatforms(parsed) : [];
    } catch {
      socialPlatforms = [];
    }
  }

  const getPlatformInitial = (name: string): string => {
    const initials: { [key: string]: string } = {
      facebook: "F",
      twitter: "T",
      instagram: "I",
      linkedin: "L",
      youtube: "Y",
      tiktok: "K",
      snapchat: "S",
      pinterest: "P",
      reddit: "R",
      whatsapp: "W",
      telegram: "T",
      discord: "D",
      twitch: "T",
      github: "G",
    };
    return initials[name.toLowerCase()] || name.charAt(0).toUpperCase();
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        cursor: "grab",
        backgroundColor,
        padding: `${padding}px`,
        boxSizing: "border-box",
        maxWidth: "100%",
        width: width || "100%",
        height: height || undefined,
      }}
    >
      <div
        style={{
          display: layout === "row" ? "flex" : "grid",
          flexDirection: layout === "row" ? "row" : undefined,
          gridTemplateColumns: layout === "grid" ? `repeat(${columns}, minmax(0, 1fr))` : undefined,
          gap: `${activeGap}px`,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: layout === "row" ? "wrap" : "nowrap",
        }}
      >
        {socialPlatforms.map((platform, index) => (
          <a
            key={index}
            href={platform.url}
            target={platform.url ? "_blank" : undefined}
            rel={platform.url ? "noopener noreferrer" : undefined}
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: `${activeGap / 2}px`,
              cursor: platform.url ? "pointer" : "default",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                width: `${activeIconSize}px`,
                height: `${activeIconSize}px`,
                borderRadius: `${borderRadius}px`,
                backgroundColor: iconColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: `${activeIconSize * 0.5}px`,
                fontWeight: "bold",
                color: "#ffffff",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = hoverColor;
                el.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = iconColor;
                el.style.transform = "scale(1)";
              }}
            >
              {getPlatformInitial(platform.icon)}
            </div>
            {showLabels && (
              <span
                style={{
                  fontSize: `${labelFontSize}px`,
                  color: labelColor,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {platform.name}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

CraftSocialWall.craft = {
  displayName: "Social Wall",
  props: {
    platforms: JSON.stringify([
      { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
      { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
      { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    ]),
    iconSize: 32,
    gap: 16,
    iconColor: "#4b5563",
    hoverColor: "#f59e0b",
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 16,
    layout: "row",
    columns: 4,
    showLabels: false,
    labelFontSize: 12,
    labelColor: "#6b7280",
    width: "100%",
    height: "",
    tabletIconSize: "",
    mobileIconSize: "",
    tabletGap: "",
    mobileGap: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: { canDrag: () => true },
};

export default CraftSocialWall;
