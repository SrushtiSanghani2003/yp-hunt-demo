import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

interface QuoteItem {
  id?: string;
  quote_text: string;
  author: string;
  order?: number;
}

export interface CraftQuoteProps {
  quotes?: string | QuoteItem[];
  quote?: string;
  author?: string;
  source?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: "normal" | "italic";
  textColor?: string;
  authorColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  borderWidth?: number;
  borderColor?: string;
  accentStyle?: "left-bar" | "quote-marks" | "top-bottom-bar";
  textAlign?: "left" | "center" | "right";
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

const defaultQuotes: QuoteItem[] = [
  {
    quote_text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    order: 1,
  },
];

function normalizeQuotes(value: CraftQuoteProps["quotes"]): QuoteItem[] {
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
      quote_text: typeof item?.quote_text === "string"
        ? item.quote_text
        : (typeof item?.quote === "string" ? item.quote : ""),
      author: typeof item?.author === "string" ? item.author : "",
      order: typeof item?.order === "number" ? item.order : index + 1,
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export const CraftQuote = ({
  quotes,
  quote = "The best way to predict the future is to create it.",
  author = "Peter Drucker",
  source = "",
  fontSize = 20,
  fontWeight = "500",
  fontStyle = "italic",
  textColor = "#1f2937",
  authorColor = "#6b7280",
  accentColor = "#f59e0b",
  backgroundColor = "#fffbeb",
  borderRadius = 8,
  padding = 24,
  borderWidth = 0,
  borderColor = "#e5e7eb",
  accentStyle = "left-bar",
  textAlign = "left",
  width = "100%",
  height = "",
  tabletFontSize = "",
  mobileFontSize = "",
  tabletPadding = "",
  mobilePadding = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftQuoteProps) => {
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
  let activeFontSize = fontSize;
  let activePadding = padding;

  if (device === "tablet") {
    if (tabletFontSize !== "" && tabletFontSize !== undefined)
      activeFontSize = Number(tabletFontSize);
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
  } else if (device === "mobile") {
    if (tabletFontSize !== "" && tabletFontSize !== undefined)
      activeFontSize = Number(tabletFontSize);
    if (mobileFontSize !== "" && mobileFontSize !== undefined)
      activeFontSize = Number(mobileFontSize);
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
    if (mobilePadding !== "" && mobilePadding !== undefined)
      activePadding = Number(mobilePadding);
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor,
    borderRadius: `${borderRadius}px`,
    border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
    padding: `${activePadding}px`,
    cursor: "grab",
    outline: isActive ? `2px solid #3b82f6` : "none",
    transition: "all 0.15s ease",
    boxSizing: "border-box",
    width: width || "100%",
    height: height || undefined,
    ...(accentStyle === "left-bar" && {
      borderLeftWidth: "4px",
      borderLeftStyle: "solid",
      borderLeftColor: accentColor,
    }),
    ...(accentStyle === "top-bottom-bar" && {
      borderTopWidth: "4px",
      borderTopStyle: "solid",
      borderTopColor: accentColor,
      borderBottomWidth: "4px",
      borderBottomStyle: "solid",
      borderBottomColor: accentColor,
    }),
  };

  const quoteTextStyle: React.CSSProperties = {
    fontSize: `${activeFontSize}px`,
    fontWeight,
    fontStyle,
    color: textColor,
    margin: "0 0 16px 0",
    lineHeight: "1.7",
    textAlign: textAlign as any,
  };

  const authorStyle: React.CSSProperties = {
    fontSize: `${Math.max(activeFontSize - 4, 14)}px`,
    color: authorColor,
    margin: 0,
    textAlign: textAlign as any,
  };

  const quoteMarkWrapperStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    justifyContent:
      textAlign === "center" ? "center" : textAlign === "right" ? "flex-end" : "flex-start",
  };

  const openQuoteMarkStyle: React.CSSProperties = {
    fontSize: `${activeFontSize + 20}px`,
    color: accentColor,
    fontWeight: "bold",
    lineHeight: "1",
    opacity: 0.6,
  };

  const closeQuoteMarkStyle: React.CSSProperties = {
    fontSize: `${activeFontSize + 20}px`,
    color: accentColor,
    fontWeight: "bold",
    lineHeight: "1",
    opacity: 0.6,
  };

  const topBottomBarStyle: React.CSSProperties = {
    width: "60px",
    height: "3px",
    backgroundColor: accentColor,
    margin:
      textAlign === "center"
        ? "0 auto"
        : textAlign === "right"
          ? "0 0 0 auto"
          : "0",
  };

  const parsedQuotes = normalizeQuotes(quotes);
  const displayQuotes = parsedQuotes.length > 0
    ? parsedQuotes
    : [{ quote_text: quote, author, order: 1 }];

  const renderQuoteBody = (item: QuoteItem) => {
    const quoteText = item.quote_text || quote;
    return (
      <>
        {accentStyle === "quote-marks" && (
          <div style={quoteMarkWrapperStyle}>
            <span style={openQuoteMarkStyle}>"</span>
            <p style={quoteTextStyle}>{quoteText}</p>
            <span style={closeQuoteMarkStyle}>"</span>
          </div>
        )}

        {accentStyle === "top-bottom-bar" && (
          <>
            <div style={topBottomBarStyle} />
            <p style={{ ...quoteTextStyle, marginTop: "16px" }}>{quoteText}</p>
            <div style={topBottomBarStyle} />
          </>
        )}

        {accentStyle === "left-bar" && <p style={quoteTextStyle}>{quoteText}</p>}

        {item.author && (
          <p style={authorStyle}>
            - {item.author}
            {source && ` (${source})`}
          </p>
        )}
      </>
    );
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {displayQuotes.map((item, index) => (
          <div key={item.id || index}>
            {renderQuoteBody(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

CraftQuote.craft = {
  displayName: "Quote",
  props: {
    quotes: JSON.stringify(defaultQuotes),
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    source: "",
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "italic",
    textColor: "#1f2937",
    authorColor: "#6b7280",
    accentColor: "#f59e0b",
    backgroundColor: "#fffbeb",
    borderRadius: 8,
    padding: 24,
    borderWidth: 0,
    borderColor: "#e5e7eb",
    accentStyle: "left-bar",
    textAlign: "left",
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

export default CraftQuote;
