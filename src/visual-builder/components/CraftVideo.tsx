import { useNode } from "@craftjs/core";
import { VideoIcon } from "lucide-react";
import { useDeviceMode } from "../VisualBlockEditor";
import { concatImgURL } from "../../config/function";

export interface CraftVideoProps {
  videoType?: "youtube" | "native";
  video_type?: "youtube" | "native";
  src?: string;
  video_url?: string;
  videoId?: string;
  video_id?: string;
  thumbnail?: string;
  thumbnail_url?: string;
  width?: string;
  height?: string;
  borderRadius?: number;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  objectFit?: "cover" | "contain" | "fill";
  preload?: "auto" | "metadata" | "none";
  showThumbnail?: boolean;
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
  video_type,
  src = "",
  video_url = "",
  videoId = "",
  video_id = "",
  thumbnail = "",
  thumbnail_url = "",
  width = "100%",
  height = "315px",
  borderRadius = 0,
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  playsInline = true,
  objectFit = "cover",
  preload = "metadata",
  showThumbnail = true,
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

  const resolvedVideoType = video_type || videoType;
  const resolvedSrc = video_url || src;
  const resolvedVideoId = video_id || videoId || (resolvedSrc ? extractYouTubeId(resolvedSrc) : "");
  const hasVideo = resolvedVideoType === "youtube" ? !!resolvedVideoId : !!resolvedSrc;

  // Auto-generate YouTube thumbnail if not provided
  const thumbnailUrl = thumbnail_url || thumbnail || (resolvedVideoId ? `https://i.ytimg.com/vi/${resolvedVideoId}/maxresdefault.jpg` : "");
  const embedParams = new URLSearchParams();
  if (autoplay) embedParams.set("autoplay", "1");
  if (muted) embedParams.set("mute", "1");
  if (loop) {
    embedParams.set("loop", "1");
    if (resolvedVideoId) embedParams.set("playlist", resolvedVideoId);
  }
  const embedQuery = embedParams.toString();

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
        resolvedVideoType === "youtube" ? (
          <div style={{ position: "relative", width: "100%", height: activeHeight }}>
            <iframe
              src={`https://www.youtube.com/embed/${resolvedVideoId}${embedQuery ? `?${embedQuery}` : ""}`}
              style={{ width: "100%", height: activeHeight, border: "none", borderRadius: `${borderRadius}px`, pointerEvents: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            {showThumbnail && thumbnailUrl && !autoplay && (
              <img
                src={concatImgURL(thumbnailUrl)}
                alt="Video thumbnail"
                style={{ position: "absolute", inset: 0, width: "100%", height: activeHeight, objectFit, borderRadius: `${borderRadius}px`, opacity: 0, pointerEvents: "none" }}
                draggable={false}
              />
            )}
          </div>
        ) : (
          <video
            src={concatImgURL(resolvedSrc)}
            poster={showThumbnail && thumbnailUrl ? concatImgURL(thumbnailUrl) : undefined}
            controls={controls}
            autoPlay={autoplay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            preload={preload}
            style={{ width: "100%", height: activeHeight, objectFit, borderRadius: `${borderRadius}px`, pointerEvents: "none" }}
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
    video_type: undefined,
    src: "",
    video_url: "",
    videoId: "",
    video_id: "",
    thumbnail: "",
    thumbnail_url: "",
    width: "100%",
    height: "315px",
    borderRadius: 0,
    autoplay: false,
    muted: false,
    loop: false,
    controls: true,
    playsInline: true,
    objectFit: "cover",
    preload: "metadata",
    showThumbnail: true,
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
