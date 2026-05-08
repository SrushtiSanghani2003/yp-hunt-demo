import { useNode } from "@craftjs/core";
import { useDeviceMode } from "../VisualBlockEditor";

interface DocumentItem {
  title?: string;
  type?: string;
  fileType?: string;
  url?: string;
  document_url?: string;
  size?: string;
  fileSize?: string;
}

export interface CraftDocumentsProps {
  documents?: string | DocumentItem[];
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  padding?: number;
  gap?: number;
  titleColor?: string;
  metaColor?: string;
  accentColor?: string;
  titleFontSize?: number;
  showFileSize?: boolean;
  showDownloadButton?: boolean;
  width?: string;
  height?: string;
  /** Responsive overrides */
  tabletPadding?: number | "";
  mobilePadding?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftDocuments = ({
  documents = JSON.stringify([
    {
      title: "Annual Report 2024",
      type: "pdf",
      url: "",
      size: "2.4 MB",
    },
    {
      title: "Product Catalog",
      type: "pdf",
      url: "",
      size: "5.1 MB",
    },
    {
      title: "Terms of Service",
      type: "doc",
      url: "",
      size: "450 KB",
    },
  ]),
  backgroundColor = "#ffffff",
  borderRadius = 8,
  borderWidth = 1,
  borderColor = "#e5e7eb",
  padding = 16,
  gap = 8,
  titleColor = "#1f2937",
  metaColor = "#6b7280",
  accentColor = "#f59e0b",
  titleFontSize = 14,
  showFileSize = true,
  showDownloadButton = true,
  width = "100%",
  height = "",
  tabletPadding = "",
  mobilePadding = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftDocumentsProps) => {
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

  const normalizeDocuments = (rawDocuments: unknown): DocumentItem[] => {
    if (!Array.isArray(rawDocuments)) return [];

    return rawDocuments.map((item, index) => ({
      title: typeof item?.title === "string" && item.title.trim()
        ? item.title
        : `Document ${index + 1}`,
      type: typeof item?.type === "string" && item.type.trim()
        ? item.type
        : (typeof item?.fileType === "string" ? item.fileType : "file"),
      fileType: typeof item?.fileType === "string" ? item.fileType : "",
      url: typeof item?.url === "string"
        ? item.url
        : (typeof item?.document_url === "string" ? item.document_url : ""),
      document_url: typeof item?.document_url === "string" ? item.document_url : "",
      size: typeof item?.size === "string"
        ? item.size
        : (typeof item?.fileSize === "string" ? item.fileSize : ""),
      fileSize: typeof item?.fileSize === "string" ? item.fileSize : "",
    }));
  };

  let parsedDocuments: DocumentItem[] = [];
  if (Array.isArray(documents)) {
    parsedDocuments = normalizeDocuments(documents);
  } else if (typeof documents === "string") {
    try {
      parsedDocuments = normalizeDocuments(JSON.parse(documents));
    } catch {
      parsedDocuments = [];
    }
  }

  const getFileTypeLabel = (type: string): string => {
    const normalized = type?.toUpperCase?.().trim();
    if (!normalized) return "FILE";
    return normalized.slice(0, 4);
  };

  const getDownloadFileName = (doc: DocumentItem): string => {
    const safeTitle = (doc.title || "document")
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, " ")
      .trim()
      .replace(/\s+/g, "_");
    const extension = (doc.type || doc.fileType || "file")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "") || "file";
    return `${safeTitle || "document"}.${extension}`;
  };

  const triggerDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      // Fallback for sources that block CORS fetches.
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor,
    borderRadius: `${borderRadius}px`,
    border:
      borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
    padding: `${activePadding}px`,
    width: width || "100%",
    height: height || undefined,
    cursor: "grab",
    outline: isActive ? "2px solid #3b82f6" : "none",
    boxSizing: "border-box",
  };

  const documentRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: `${gap}px`,
    gap: `${gap}px`,
    borderBottom: `1px solid ${borderColor}`,
    transition: "all 0.15s ease",
  };

  const lastRowStyle: React.CSSProperties = {
    ...documentRowStyle,
    borderBottom: "none",
    paddingBottom: 0,
  };

  const fileInfoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
  };

  const fileTypeBadgeStyle: React.CSSProperties = {
    minWidth: "42px",
    height: "34px",
    padding: "0 8px",
    borderRadius: "6px",
    backgroundColor: `${accentColor}20`,
    color: accentColor,
    fontSize: "11px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    flexShrink: 0,
  };

  const textWrapperStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: `${titleFontSize}px`,
    fontWeight: "600",
    color: titleColor,
    lineHeight: "1.4",
  };

  const metaStyle: React.CSSProperties = {
    margin: "4px 0 0 0",
    fontSize: `${Math.max(titleFontSize - 2, 12)}px`,
    color: metaColor,
    lineHeight: "1.3",
  };

  const downloadButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    backgroundColor: accentColor,
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.2s ease",
    flexShrink: 0,
  };

  const disabledDownloadButtonStyle: React.CSSProperties = {
    ...downloadButtonStyle,
    backgroundColor: "#e5e7eb",
    color: "#9ca3af",
    cursor: "not-allowed",
    pointerEvents: "none",
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      {parsedDocuments.length === 0 ? (
        <div style={{ color: metaColor, textAlign: "center", padding: "20px 0" }}>
          No documents added
        </div>
      ) : (
        parsedDocuments.map((doc, index) => {
          const docUrl = doc.url || doc.document_url || "";
          const fileType = doc.type || doc.fileType || "file";
          const fileSize = doc.size || doc.fileSize || "";

          return (
            <div
              key={index}
              style={
                index === parsedDocuments.length - 1 ? lastRowStyle : documentRowStyle
              }
            >
              <div style={fileInfoStyle}>
                <div style={fileTypeBadgeStyle}>{getFileTypeLabel(fileType)}</div>
                <div style={textWrapperStyle}>
                  <div style={titleStyle}>{doc.title}</div>
                  {showFileSize && fileSize && (
                    <div style={metaStyle}>{fileSize}</div>
                  )}
                </div>
              </div>
              {showDownloadButton && (
                docUrl ? (
                  <a
                    href={docUrl}
                    style={downloadButtonStyle}
                    download
                    onClick={(e) => {
                      e.preventDefault();
                      void triggerDownload(docUrl, getDownloadFileName(doc));
                    }}
                  >
                    Download
                  </a>
                ) : (
                  <span style={disabledDownloadButtonStyle}>Download</span>
                )
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

CraftDocuments.craft = {
  displayName: "Documents",
  props: {
    documents: JSON.stringify([
      {
        title: "Annual Report 2024",
        type: "pdf",
        url: "",
        size: "2.4 MB",
      },
      {
        title: "Product Catalog",
        type: "pdf",
        url: "",
        size: "5.1 MB",
      },
      {
        title: "Terms of Service",
        type: "doc",
        url: "",
        size: "450 KB",
      },
    ]),
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    gap: 8,
    titleColor: "#1f2937",
    metaColor: "#6b7280",
    accentColor: "#f59e0b",
    titleFontSize: 14,
    showFileSize: true,
    showDownloadButton: true,
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

export default CraftDocuments;
