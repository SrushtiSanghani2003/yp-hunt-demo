import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

interface ContactValue {
  value: string;
}

interface ContactItem {
  id?: string;
  title: string;
  description?: string;
  phone: ContactValue[];
  email: ContactValue[];
  order?: number;
}

export interface CraftContactProps {
  title?: string;
  description?: string;
  contacts?: string | ContactItem[];
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
  showDescription?: boolean;
  width?: string;
  height?: string;
  tabletPadding?: number | "";
  mobilePadding?: number | "";
  tabletTitleFontSize?: number | "";
  mobileTitleFontSize?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

const defaultContacts: ContactItem[] = [
  {
    title: "General Enquiries",
    description: "",
    phone: [{ value: "+1 (555) 123-4567" }],
    email: [{ value: "hello@example.com" }],
    order: 1,
  },
];

function normalizeContactValues(value: any): ContactValue[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => ({
        value: typeof item?.value === "string" ? item.value : (typeof item === "string" ? item : ""),
      }))
      .filter((item) => item.value);
  }

  if (typeof value === "string" && value.trim()) {
    return [{ value }];
  }

  return [];
}

function normalizeContacts(value: CraftContactProps["contacts"]): ContactItem[] {
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
      title: typeof item?.title === "string" && item.title.trim()
        ? item.title
        : `Contact ${index + 1}`,
      description: typeof item?.description === "string" ? item.description : "",
      phone: normalizeContactValues(item?.phone),
      email: normalizeContactValues(item?.email),
      order: typeof item?.order === "number" ? item.order : index + 1,
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export const CraftContact = ({
  title = "Contact Us",
  description = "Get in touch with our team",
  contacts = JSON.stringify(defaultContacts),
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
  showDescription = true,
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

  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try {
    device = useDeviceMode();
  } catch {
    /* context may not exist */
  }

  if (device === "mobile" && hideOnMobile) return null;
  if (device === "tablet" && hideOnTablet) return null;
  if (device === "desktop" && hideOnDesktop) return null;

  let activePadding = padding;
  let activeTitleFontSize = titleFontSize;

  if (device === "tablet") {
    if (tabletPadding !== "" && tabletPadding !== undefined) activePadding = Number(tabletPadding);
    if (tabletTitleFontSize !== "" && tabletTitleFontSize !== undefined) activeTitleFontSize = Number(tabletTitleFontSize);
  } else if (device === "mobile") {
    if (tabletPadding !== "" && tabletPadding !== undefined) activePadding = Number(tabletPadding);
    if (mobilePadding !== "" && mobilePadding !== undefined) activePadding = Number(mobilePadding);
    if (tabletTitleFontSize !== "" && tabletTitleFontSize !== undefined) activeTitleFontSize = Number(tabletTitleFontSize);
    if (mobileTitleFontSize !== "" && mobileTitleFontSize !== undefined) activeTitleFontSize = Number(mobileTitleFontSize);
  }

  const parsedContacts = normalizeContacts(contacts);
  const displayContacts = parsedContacts.length > 0
    ? parsedContacts
    : [
      {
        title: "Contact",
        description: "",
        phone: normalizeContactValues(phone),
        email: normalizeContactValues(email),
        order: 1,
      },
    ];

  const containerStyle: React.CSSProperties = {
    backgroundColor,
    borderRadius: `${borderRadius}px`,
    border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
    padding: `${activePadding}px`,
    width: width || "100%",
    height: height || undefined,
    cursor: "grab",
    outline: isActive ? "2px solid #3b82f6" : "none",
    transition: "all 0.15s ease",
    boxSizing: "border-box",
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
    flex: layout === "horizontal" ? "1 1 220px" : "initial",
    minWidth: 0,
  };

  const contactValueStyle: React.CSSProperties = {
    fontSize: "15px",
    color: textColor,
    margin: 0,
    wordBreak: "break-word",
  };

  const mapRadius = Math.max(borderRadius - 4, 0);

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      <h2
        style={{
          fontSize: `${activeTitleFontSize}px`,
          fontWeight: 600,
          color: titleColor,
          margin: "0 0 8px 0",
        }}
      >
        {title}
      </h2>
      {showDescription && description && (
        <p style={{ fontSize: "16px", color: textColor, margin: "0 0 24px 0", lineHeight: 1.6 }}>
          {description}
        </p>
      )}

      <div style={contactItemsStyle}>
        {displayContacts.map((contact, contactIndex) => (
          <div key={contact.id || contactIndex} style={contactItemStyle}>
            <div style={{ fontSize: "20px", color: iconColor, flexShrink: 0, marginTop: "2px" }}>
              i
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: titleColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  margin: 0,
                }}
              >
                {contact.title}
              </p>
              {contact.description && <p style={contactValueStyle}>{contact.description}</p>}
              {contact.phone.map((phoneItem, phoneIndex) => (
                <a
                  key={`phone-${phoneIndex}`}
                  href={`tel:${phoneItem.value}`}
                  style={{ ...contactValueStyle, textDecoration: "none", color: "inherit", cursor: "pointer" }}
                >
                  {phoneItem.value}
                </a>
              ))}
              {contact.email.map((emailItem, emailIndex) => (
                <a
                  key={`email-${emailIndex}`}
                  href={`mailto:${emailItem.value}`}
                  style={{ ...contactValueStyle, textDecoration: "none", color: "inherit", cursor: "pointer" }}
                >
                  {emailItem.value}
                </a>
              ))}
            </div>
          </div>
        ))}

        {address && (
          <div style={contactItemStyle}>
            <div style={{ fontSize: "20px", color: iconColor, flexShrink: 0, marginTop: "2px" }}>
              @
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: titleColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  margin: 0,
                }}
              >
                Address
              </p>
              <p style={contactValueStyle}>{address}</p>
            </div>
          </div>
        )}
      </div>

      {showMap && mapEmbedUrl && (
        <div style={{ marginTop: "24px", borderRadius: `${mapRadius}px`, overflow: "hidden" }}>
          <iframe
            src={mapEmbedUrl}
            style={{ width: "100%", height: "300px", border: "none", borderRadius: `${mapRadius}px` }}
          />
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
    contacts: JSON.stringify(defaultContacts),
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
    showDescription: true,
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
