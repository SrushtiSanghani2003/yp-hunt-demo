import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface CraftGalleryProps {
  images?: string | GalleryImage[];
  columns?: number;
  gap?: number;
  imageHeight?: string;
  objectFit?: "cover" | "contain";
  borderRadius?: number;
  padding?: number;
  backgroundColor?: string;
  showCaptions?: boolean;
  width?: string;
  height?: string;
  /** Responsive overrides */
  tabletColumns?: number | "";
  mobileColumns?: number | "";
  tabletGap?: number | "";
  mobileGap?: number | "";
  tabletImageHeight?: string;
  mobileImageHeight?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftGallery = ({
  images = JSON.stringify([
    { src: "", alt: "Image 1" },
    { src: "", alt: "Image 2" },
    { src: "", alt: "Image 3" },
    { src: "", alt: "Image 4" },
  ]),
  columns = 3,
  gap = 8,
  imageHeight = "200px",
  objectFit = "cover",
  borderRadius = 8,
  padding = 0,
  backgroundColor = "transparent",
  showCaptions = false,
  width = "100%",
  height = "",
  tabletColumns = 2,
  mobileColumns = 1,
  tabletGap = "",
  mobileGap = "",
  tabletImageHeight = "",
  mobileImageHeight = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftGalleryProps) => {
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
  let activeImageHeight = imageHeight;

  if (device === "tablet") {
    if (tabletColumns !== "" && tabletColumns !== undefined)
      activeColumns = Number(tabletColumns);
    else activeColumns = Math.min(columns, 2);
    if (tabletGap !== "" && tabletGap !== undefined)
      activeGap = Number(tabletGap);
    if (tabletImageHeight) activeImageHeight = tabletImageHeight;
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
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
    if (tabletImageHeight) activeImageHeight = tabletImageHeight;
    if (mobileImageHeight) activeImageHeight = mobileImageHeight;
  }

  const normalizeGalleryImages = (raw: any[]): GalleryImage[] =>
    raw.map((item, index) => ({
      src: typeof item?.src === "string" ? item.src : "",
      alt: typeof item?.alt === "string" && item.alt.trim()
        ? item.alt
        : (typeof item?.caption === "string" && item.caption.trim() ? item.caption : `Image ${index + 1}`),
    }));

  let galleryImages: GalleryImage[] = [];
  if (Array.isArray(images)) {
    galleryImages = normalizeGalleryImages(images);
  } else if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      galleryImages = Array.isArray(parsed) ? normalizeGalleryImages(parsed) : [];
    } catch {
      galleryImages = [];
    }
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${activeColumns}, minmax(0, 1fr))`,
    gap: `${activeGap}px`,
    padding: `${padding}px`,
    backgroundColor,
    width: width || "100%",
    height: height || undefined,
    cursor: "grab",
    outline: isActive ? `2px solid #3b82f6` : "none",
    boxSizing: "border-box",
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={gridStyle}
    >
      {galleryImages.map((image, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {image.src ? (
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: activeImageHeight,
                objectFit: objectFit as any,
                borderRadius: `${borderRadius}px`,
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: activeImageHeight,
                borderRadius: `${borderRadius}px`,
                border: "2px dashed #d1d5db",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9fafb",
                flexDirection: "column",
                gap: "8px",
                fontSize: "14px",
                color: "#9ca3af",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Image</div>
              <span>No image</span>
            </div>
          )}

          {showCaptions && (
            <div
              style={{
                fontSize: "14px",
                color: "#6b7280",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {image.alt}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

CraftGallery.craft = {
  displayName: "Gallery",
  props: {
    images: JSON.stringify([
      { src: "", alt: "Image 1" },
      { src: "", alt: "Image 2" },
      { src: "", alt: "Image 3" },
      { src: "", alt: "Image 4" },
    ]),
    columns: 3,
    gap: 8,
    imageHeight: "200px",
    objectFit: "cover",
    borderRadius: 8,
    padding: 0,
    backgroundColor: "transparent",
    showCaptions: false,
    width: "100%",
    height: "",
    tabletColumns: 2,
    mobileColumns: 1,
    tabletGap: "",
    mobileGap: "",
    tabletImageHeight: "",
    mobileImageHeight: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: {
    canDrag: () => true,
  },
};

export default CraftGallery;
