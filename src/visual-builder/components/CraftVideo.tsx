import { useNode } from "@craftjs/core";
import { VideoIcon } from "lucide-react";
import { useDeviceMode } from "../VisualBlockEditor";

export interface CraftVideoProps {
  videoType?: "youtube" | "native";
  src?: string;
  videoId?: string;
  thumbnail?: string;
  width?: string;
  height?: string;
  borderRadius?: number;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  margin?: number;
  opacity?: number;
  /** Responsive overrides */
  tabletWidth?: string;
  mobileWidth?: string;
  tabletHeight?: string;
  mobileHeight?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

function extractYouTubeId(url: string): string {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
}


export const CraftVideo = ({
  videoType = "youtube",
  src = "",
  videoId = "",
  thumbnail = "",
  width = "100%",
  height = "315px",
  borderRadius = 0,
  autoplay = false,
  muted = false,
  loop = false,
  margin = 0,
  opacity = 1,
  tabletWidth = "",
  mobileWidth = "",
  tabletHeight = "",
  mobileHeight = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftVideoProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  // Device-aware overrides
  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try { device = useDeviceMode(); } catch { /* context may not exist */ }

  // Visibility check
  if (device === "mobile" && hideOnMobile) return null;
  if (device === "tablet" && hideOnTablet) return null;
  if (device === "desktop" && hideOnDesktop) return null;

  let activeWidth = width;
  let activeHeight = height;

  if (device === "tablet") {
    if (tabletWidth) activeWidth = tabletWidth;
    if (tabletHeight) activeHeight = tabletHeight;
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
    if (tabletWidth) activeWidth = tabletWidth;
    if (mobileWidth) activeWidth = mobileWidth;
    if (tabletHeight) activeHeight = tabletHeight;
    if (mobileHeight) activeHeight = mobileHeight;
  }

  const resolvedVideoId = videoId || (src ? extractYouTubeId(src) : "");
  const hasVideo = videoType === "youtube" ? !!resolvedVideoId : !!src;

  // Auto-generate YouTube thumbnail if not provided
  const thumbnailUrl = thumbnail || (resolvedVideoId ? `https://i.ytimg.com/vi/${resolvedVideoId}/maxresdefault.jpg` : "");

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        width: activeWidth,
        maxWidth: "100%",
        margin: `${margin}px`,
        borderRadius: `${borderRadius}px`,
        overflow: "hidden",
        cursor: "grab",
        opacity,
        boxSizing: "border-box",
      }}
    >
      {hasVideo ? (
        videoType === "youtube" ? (
          <div style={{ position: "relative", width: "100%", height: activeHeight }}>
            <iframe
              src={`https://www.youtube.com/embed/${resolvedVideoId}${autoplay ? "?autoplay=1" : ""}`}
              style={{ width: "100%", height: activeHeight, border: "none", borderRadius: `${borderRadius}px`, pointerEvents: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            src={src}
            poster={thumbnailUrl}
            controls={false}
            autoPlay={autoplay}
            muted={muted}
            loop={loop}
            style={{ width: "100%", height: activeHeight, objectFit: "cover", borderRadius: `${borderRadius}px`, pointerEvents: "none" }}
          />
        )
      ) : (
        <div
          style={{
            width: "100%",
            height: activeHeight,
            backgroundColor: "#f3f4f6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            border: "2px dashed #d1d5db",
            borderRadius: `${borderRadius}px`,
            color: "#9ca3af",
          }}
        >
          <VideoIcon size={32} />
          <span style={{ fontSize: "13px", textAlign: "center", padding: "0 12px" }}>
            Upload or add video URL in Settings
          </span>
        </div>
      )}
    </div>
  );
};

CraftVideo.craft = {
  displayName: "Video",
  props: {
    videoType: "youtube",
    src: "",
    videoId: "",
    thumbnail: "",
    width: "100%",
    height: "315px",
    borderRadius: 0,
    autoplay: false,
    muted: false,
    loop: false,
    margin: 0,
    opacity: 1,
    tabletWidth: "",
    mobileWidth: "",
    tabletHeight: "",
    mobileHeight: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: {
    canDrag: () => true,
  },
};

export default CraftVideo;
