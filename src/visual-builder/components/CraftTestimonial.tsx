import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";
import { concatImgURL } from "../../config/function";

interface TestimonialQuote {
  id?: string;
  quote_img_url: string;
  author: string;
  job_title: string;
  rating: number;
  quote_text: string;
  order?: number;
}

export interface CraftTestimonialProps {
  quotes?: string | TestimonialQuote[];
  quote?: string;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string;
  rating?: number;
  limit?: number;
  columns?: number;
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
  tabletColumns?: number | "";
  mobileColumns?: number | "";
  tabletPadding?: number | "";
  mobilePadding?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

const defaultQuotes: TestimonialQuote[] = [
  {
    quote_img_url: "",
    author: "John Doe",
    job_title: "CEO, Company",
    rating: 5,
    quote_text: "This is an amazing product that changed our workflow completely.",
    order: 1,
  },
];

function normalizeQuotes(value: CraftTestimonialProps["quotes"]): TestimonialQuote[] {
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
      quote_img_url: typeof item?.quote_img_url === "string"
        ? item.quote_img_url
        : (typeof item?.authorImage === "string"
          ? item.authorImage
          : (typeof item?.avatarUrl === "string" ? item.avatarUrl : "")),
      author: typeof item?.author === "string" && item.author.trim()
        ? item.author
        : (typeof item?.authorName === "string" && item.authorName.trim() ? item.authorName : `Author ${index + 1}`),
      job_title: typeof item?.job_title === "string"
        ? item.job_title
        : (typeof item?.authorTitle === "string"
          ? item.authorTitle
          : (typeof item?.role === "string" ? item.role : "")),
      rating: Number.isFinite(Number(item?.rating)) ? Number(item.rating) : 0,
      quote_text: typeof item?.quote_text === "string"
        ? item.quote_text
        : (typeof item?.quote === "string" ? item.quote : ""),
      order: typeof item?.order === "number" ? item.order : index + 1,
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export const CraftTestimonial = ({
  quotes,
  quote = "This is an amazing product that changed our workflow completely.",
  authorName = "John Doe",
  authorTitle = "CEO, Company",
  authorImage = "",
  rating = 5,
  limit = 0,
  columns = 1,
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
  tabletColumns = "",
  mobileColumns = "",
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
  let activeColumns = columns;

  if (device === "tablet") {
    if (tabletFontSize !== "" && tabletFontSize !== undefined)
      activeFontSize = Number(tabletFontSize);
    if (tabletColumns !== "" && tabletColumns !== undefined)
      activeColumns = Number(tabletColumns);
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
    if (tabletFontSize !== "" && tabletFontSize !== undefined)
      activeFontSize = Number(tabletFontSize);
    if (mobileFontSize !== "" && mobileFontSize !== undefined)
      activeFontSize = Number(mobileFontSize);
    if (tabletColumns !== "" && tabletColumns !== undefined)
      activeColumns = Number(tabletColumns);
    if (mobileColumns !== "" && mobileColumns !== undefined)
      activeColumns = Number(mobileColumns);
    else activeColumns = 1;
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
    if (mobilePadding !== "" && mobilePadding !== undefined)
      activePadding = Number(mobilePadding);
  }

  const parsedQuotes = normalizeQuotes(quotes);
  const allDisplayQuotes = parsedQuotes.length > 0
    ? parsedQuotes
    : [{
      quote_img_url: authorImage,
      author: authorName,
      job_title: authorTitle,
      rating,
      quote_text: quote,
      order: 1,
    }];
  const displayQuotes = limit > 0 ? allDisplayQuotes.slice(0, limit) : allDisplayQuotes;

  // Render stars
  const renderStars = (quoteRating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < quoteRating ? accentColor : "#e5e7eb" }}>
          {i < quoteRating ? String.fromCharCode(9733) : String.fromCharCode(9734)}
        </span>
      );
    }
    return stars;
  };

  const containerStyle: React.CSSProperties = {
    width: width || "100%",
    height: height || undefined,
    boxSizing: "border-box",
    cursor: "grab",
    outline: isActive ? `2px solid #3b82f6` : "none",
    transition: "all 0.15s ease",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    padding: `${activePadding}px`,
    borderRadius: `${borderRadius}px`,
    border: borderWidth ? `${borderWidth}px solid ${borderColor}` : "none",
    boxShadow: layout === "minimal" ? "none" : "0 1px 3px rgba(0, 0, 0, 0.1)",
    textAlign: layout === "centered" ? "center" : "left",
    fontSize: `${activeFontSize}px`,
    lineHeight: "1.6",
    boxSizing: "border-box",
    minWidth: 0,
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.max(activeColumns, 1)}, minmax(0, 1fr))`,
          gap: "16px",
        }}
      >
        {displayQuotes.map((item, index) => (
          <div
            key={item.id || index}
            style={cardStyle}
          >
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

            <p
              style={{
                margin: "0 0 16px 0",
                fontSize: `${activeFontSize}px`,
                fontStyle: "italic",
                color: textColor,
              }}
            >
              {item.quote_text}
            </p>

            {item.rating > 0 && (
              <div
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  gap: "4px",
                  justifyContent: layout === "centered" ? "center" : "flex-start",
                }}
              >
                {renderStars(item.rating)}
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: layout === "centered" ? "center" : "flex-start",
                flexDirection: layout === "centered" ? "column" : "row",
              }}
            >
              {item.quote_img_url ? (
                <img
                  src={concatImgURL(item.quote_img_url)}
                  alt={item.author}
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
                  {item.author.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <div
                  style={{
                    fontWeight: "600",
                    color: textColor,
                    fontSize: `${activeFontSize}px`,
                  }}
                >
                  {item.author}
                </div>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: `${Math.max(activeFontSize - 2, 12)}px`,
                  }}
                >
                  {item.job_title}
                </div>
              </div>
            </div>
          </div>
        ))}
        {displayQuotes.length === 0 && (
          <div
            style={{
              ...cardStyle,
              color: "#9ca3af",
              textAlign: "center",
            }}
          >
            No testimonials added
          </div>
        )}
      </div>
    </div>
  );
};

CraftTestimonial.craft = {
  displayName: "Testimonial",
  props: {
    quotes: JSON.stringify(defaultQuotes),
    quote: "This is an amazing product that changed our workflow completely.",
    authorName: "John Doe",
    authorTitle: "CEO, Company",
    authorImage: "",
    rating: 5,
    limit: 0,
    columns: 1,
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
    tabletColumns: "",
    mobileColumns: "",
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
