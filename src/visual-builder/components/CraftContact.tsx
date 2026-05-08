import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftContactProps {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  showMap?: boolean;
  mapEmbedUrl?: string;
  titleFontSize?: number;
  titleColor?: string;
  textColor?: string;
  iconColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  borderWidth?: number;
  borderColor?: string;
  layout?: "vertical" | "horizontal";
  width?: string;
  height?: string;
  /** Responsive overrides */
  tabletPadding?: number | "";
  mobilePadding?: number | "";
  tabletTitleFontSize?: number | "";
  mobileTitleFontSize?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftContact = ({
  title = "Contact Us",
  description = "Get in touch with our team",
  phone = "+1 (555) 123-4567",
  email = "hello@example.com",
  address = "123 Main Street, City, State",
  showMap = false,
  mapEmbedUrl = "",
  titleFontSize = 24,
  titleColor = "#1f2937",
  textColor = "#4b5563",
  iconColor = "#f59e0b",
  backgroundColor = "#ffffff",
  borderRadius = 12,
  padding = 24,
  borderWidth = 1,
  borderColor = "#e5e7eb",
  layout = "vertical",
  width = "100%",
  height = "",
  tabletPadding = "",
  mobilePadding = "",
  tabletTitleFontSize = "",
  mobileTitleFontSize = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftContactProps) => {
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
  let activePadding = padding;
  let activeTitleFontSize = titleFontSize;

  if (device === "tablet") {
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
    if (tabletTitleFontSize !== "" && tabletTitleFontSize !== undefined)
      activeTitleFontSize = Number(tabletTitleFontSize);
  } else if (device === "mobile") {
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
    if (mobilePadding !== "" && mobilePadding !== undefined)
      activePadding = Number(mobilePadding);
    if (tabletTitleFontSize !== "" && tabletTitleFontSize !== undefined)
      activeTitleFontSize = Number(tabletTitleFontSize);
    if (mobileTitleFontSize !== "" && mobileTitleFontSize !== undefined)
      activeTitleFontSize = Number(mobileTitleFontSize);
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor,
    borderRadius: `${borderRadius}px`,
    border:
      borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
    padding: `${activePadding}px`,
    width: width || "100%",
    height: height || undefined,
    cursor: "grab",
    outline: isActive ? `2px solid #3b82f6` : "none",
    transition: "all 0.15s ease",
    boxSizing: "border-box",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: `${activeTitleFontSize}px`,
    fontWeight: "600",
    color: titleColor,
    margin: "0 0 8px 0",
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: "16px",
    color: textColor,
    margin: "0 0 24px 0",
    lineHeight: "1.6",
  };

  const contactItemsStyle: React.CSSProperties = {
    display: layout === "horizontal" ? "flex" : "block",
    gap: layout === "horizontal" ? "24px" : "0",
    flexWrap: "wrap",
    margin: "0 0 24px 0",
  };

  const contactItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: layout === "vertical" ? "16px" : "0",
    flex: layout === "horizontal" ? "1 1 auto" : "initial",
  };

  const iconStyle: React.CSSProperties = {
    fontSize: "20px",
    color: iconColor,
    flexShrink: 0,
    marginTop: "2px",
  };

  const contactTextStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  const contactLabelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: "600",
    color: titleColor,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
  };

  const contactValueStyle: React.CSSProperties = {
    fontSize: "15px",
    color: textColor,
    margin: 0,
    wordBreak: "break-word",
  };

  const mapContainerStyle: React.CSSProperties = {
    marginTop: "24px",
    borderRadius: `${borderRadius - 4}px`,
    overflow: "hidden",
  };

  const iframeStyle: React.CSSProperties = {
    width: "100%",
    height: "300px",
    border: "none",
    borderRadius: `${borderRadius - 4}px`,
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      <h2 style={titleStyle}>{title}</h2>
      <p style={descriptionStyle}>{description}</p>

      <div style={contactItemsStyle}>
        {/* Phone */}
        {phone && (
          <div style={contactItemStyle}>
            <div style={iconStyle}>📞</div>
            <div style={contactTextStyle}>
              <p style={contactLabelStyle}>Phone</p>
              <a
                href={`tel:${phone}`}
                style={{
                  ...contactValueStyle,
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                {phone}
              </a>
            </div>
          </div>
        )}

        {/* Email */}
        {email && (
          <div style={contactItemStyle}>
            <div style={iconStyle}>✉</div>
            <div style={contactTextStyle}>
              <p style={contactLabelStyle}>Email</p>
              <a
                href={`mailto:${email}`}
                style={{
                  ...contactValueStyle,
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                {email}
              </a>
            </div>
          </div>
        )}

        {/* Address */}
        {address && (
          <div style={contactItemStyle}>
            <div style={iconStyle}>📍</div>
            <div style={contactTextStyle}>
              <p style={contactLabelStyle}>Address</p>
              <p style={contactValueStyle}>{address}</p>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      {showMap && mapEmbedUrl && (
        <div style={mapContainerStyle}>
          <iframe src={mapEmbedUrl} style={iframeStyle} />
        </div>
      )}
    </div>
  );
};

CraftContact.craft = {
  displayName: "Contact Info",
  props: {
    title: "Contact Us",
    description: "Get in touch with our team",
    phone: "+1 (555) 123-4567",
    email: "hello@example.com",
    address: "123 Main Street, City, State",
    showMap: false,
    mapEmbedUrl: "",
    titleFontSize: 24,
    titleColor: "#1f2937",
    textColor: "#4b5563",
    iconColor: "#f59e0b",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    layout: "vertical",
    width: "100%",
    height: "",
    tabletPadding: "",
    mobilePadding: "",
    tabletTitleFontSize: "",
    mobileTitleFontSize: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: {
    canDrag: () => true,
  },
};

export default CraftContact;
