import { useNode, useEditor } from "@craftjs/core";
import { type ReactNode, useEffect, useRef } from "react";
import { useDeviceMode } from "../VisualBlockEditor";

/** Resolve overlay preset names to CSS rgba values */
function resolveOverlay(value: string): string {
  const presets: Record<string, string> = {
    light: "rgba(0,0,0,0.2)",
    medium: "rgba(0,0,0,0.4)",
    dark: "rgba(0,0,0,0.6)",
    "extra-dark": "rgba(0,0,0,0.75)",
    "light-warm": "rgba(30,20,0,0.25)",
    "dark-blue": "rgba(10,20,50,0.6)",
  };
  if (!value) return "";
  return presets[value] || value; // fallback to raw value if custom
}

export interface CraftContainerProps {
  /** Layout mode: "flex" for normal stacked layout, "freeform" for absolute positioning of children */
  layoutMode?: "flex" | "freeform";
  flexDirection?: "row" | "column";
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: "nowrap" | "wrap";
  gap?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  margin?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: "cover" | "contain" | "auto" | string;
  backgroundPosition?: string;
  backgroundRepeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  /** Semi-transparent color overlay on top of the background image */
  backgroundOverlay?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  width?: string;
  maxWidth?: string;
  minHeight?: string;
  height?: string;
  overflow?: "visible" | "hidden" | "auto";
  opacity?: number;
  /** Positioning — allows absolute/fixed placement for overlapping layouts */
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static";
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
  className?: string;
  children?: ReactNode;
  /** Responsive overrides */
  mobileFlexDirection?: "row" | "column" | "";
  tabletFlexDirection?: "row" | "column" | "";
  mobilePadding?: number | "";
  tabletPadding?: number | "";
  mobileGap?: number | "";
  tabletGap?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftContainer = ({
  layoutMode = "flex",
  flexDirection = "column",
  justifyContent = "flex-start",
  alignItems = "stretch",
  flexWrap = "nowrap",
  gap = 8,
  padding = 16,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin = 0,
  backgroundColor = "transparent",
  backgroundImage = "",
  backgroundSize = "cover",
  backgroundPosition = "center",
  backgroundRepeat = "no-repeat",
  backgroundOverlay = "",
  borderRadius = 0,
  borderWidth = 0,
  borderColor = "#e5e7eb",
  width = "100%",
  maxWidth = "",
  minHeight = "60px",
  height = "",
  overflow = "visible",
  opacity = 1,
  position = "relative",
  top = "",
  left = "",
  right = "",
  bottom = "",
  zIndex,
  children,
  mobileFlexDirection = "",
  tabletFlexDirection = "",
  mobilePadding = "",
  tabletPadding = "",
  mobileGap = "",
  tabletGap = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftContainerProps) => {
  const {
    id: nodeId,
    connectors: { connect, drag },
  } = useNode();

  /**
   * Free-form layout mode: automatically convert all children to
   * position:absolute so they can be placed anywhere within the container.
   * Runs when layoutMode changes to "freeform" or when new children are added.
   */
  const prevChildCount = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { childIds, enabled, query: editorQuery, actions: editorActions } = useEditor((state) => {
    const node = state.nodes[nodeId];
    return {
      childIds: (node?.data?.nodes as string[]) || [],
      enabled: state.options.enabled,
    };
  });

  // Auto-adjust container height when children change (flex mode only)
  useEffect(() => {
    if (layoutMode !== "flex" || !containerRef.current) return;

    // Use ResizeObserver to track content changes
    const resizeObserver = new ResizeObserver(() => {
      // Height will automatically adjust due to flex layout
      // Just update the layout to trigger re-render if needed
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [layoutMode]);

  // Handle converting children when switching layout modes
  useEffect(() => {
    if (!editorQuery || !editorActions) return;

    childIds.forEach((childId: string) => {
      try {
        const childNode = editorQuery.node(childId).get();
        const childProps = (childNode.data as any).props || {};

        if (layoutMode === "freeform") {
          // Converting TO freeform: set absolute positioning if not already set
          if (childProps.position !== "absolute") {
            const index = childIds.indexOf(childId);
            const yPos = 20 + index * 50;
            const xPos = 20;

            editorActions.setProp(childId, (props: any) => {
              props.position = "absolute";
              props.top = `${yPos}px`;
              props.left = `${xPos}px`;
            });
          }
        } else if (layoutMode === "flex") {
          // Converting TO flex: remove absolute positioning to allow flex layout
          if (childProps.position === "absolute") {
            editorActions.setProp(childId, (props: any) => {
              props.position = "static";
              props.top = "";
              props.left = "";
              props.right = "";
              props.bottom = "";
            });
          }
        }
      } catch {
        // Child might not exist yet during hot-reload
      }
    });

    prevChildCount.current = childIds.length;
  }, [layoutMode, childIds, editorQuery, editorActions]);

  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try {
    device = useDeviceMode();
  } catch {
    // Context may not be available during serialization
  }

  // Check visibility for current device
  if (device === "mobile" && hideOnMobile) return <div ref={(ref) => { if (ref) connect(drag(ref)); }} style={{ display: "none" }}>{children}</div>;
  if (device === "tablet" && hideOnTablet) return <div ref={(ref) => { if (ref) connect(drag(ref)); }} style={{ display: "none" }}>{children}</div>;
  if (device === "desktop" && hideOnDesktop) return <div ref={(ref) => { if (ref) connect(drag(ref)); }} style={{ display: "none" }}>{children}</div>;

  // Apply responsive overrides
  let activeFlexDirection = flexDirection;
  let activePadding = padding;
  let activeGap = gap;

  if (device === "tablet") {
    if (tabletFlexDirection) activeFlexDirection = tabletFlexDirection;
    if (tabletPadding !== "" && tabletPadding !== undefined) activePadding = Number(tabletPadding);
    if (tabletGap !== "" && tabletGap !== undefined) activeGap = Number(tabletGap);
  } else if (device === "mobile") {
    // Mobile: first apply tablet overrides, then mobile-specific ones
    if (tabletFlexDirection) activeFlexDirection = tabletFlexDirection;
    if (mobileFlexDirection) activeFlexDirection = mobileFlexDirection;
    if (tabletPadding !== "" && tabletPadding !== undefined) activePadding = Number(tabletPadding);
    if (mobilePadding !== "" && mobilePadding !== undefined) activePadding = Number(mobilePadding);
    if (tabletGap !== "" && tabletGap !== undefined) activeGap = Number(tabletGap);
    if (mobileGap !== "" && mobileGap !== undefined) activeGap = Number(mobileGap);
  }

  const paddingStyle = paddingTop !== undefined || paddingBottom !== undefined
    ? {
      paddingTop: `${paddingTop ?? activePadding}px`,
      paddingBottom: `${paddingBottom ?? activePadding}px`,
      paddingLeft: `${paddingLeft ?? activePadding}px`,
      paddingRight: `${paddingRight ?? activePadding}px`,
    }
    : { padding: `${activePadding}px` };

  return (
    <div
      ref={(ref) => {
        if (ref) {
          containerRef.current = ref;
          connect(drag(ref));
        }
      }}
      style={{
        display: layoutMode === "freeform" ? "block" : "flex",
        flexDirection: layoutMode === "freeform" ? undefined : activeFlexDirection,
        justifyContent: layoutMode === "freeform" ? undefined : justifyContent,
        alignItems: layoutMode === "freeform" ? undefined : alignItems,
        flexWrap: layoutMode === "freeform" ? undefined : flexWrap,
        gap: layoutMode === "freeform" ? undefined : `${activeGap}px`,
        ...paddingStyle,
        margin: `${margin}px`,
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: backgroundImage ? backgroundSize : undefined,
        backgroundPosition: backgroundImage ? backgroundPosition : undefined,
        backgroundRepeat: backgroundImage ? backgroundRepeat : undefined,
        borderRadius: `${borderRadius}px`,
        border: borderWidth ? `${borderWidth}px solid ${borderColor}` : enabled ? "1px dashed #e5e7eb" : "none",
        width,
        maxWidth: maxWidth || "100%",
        // In flex mode: minHeight as default, height auto to grow with content
        // In freeform mode: use height if set, fallback to minHeight
        minHeight: layoutMode === "freeform" ? undefined : minHeight,
        height: layoutMode === "freeform" ? (height || minHeight) : (height || "auto"),
        overflow: layoutMode === "freeform" ? (overflow || "visible") : "visible",
        opacity,
        position: position || "relative",
        top: top || undefined,
        left: left || undefined,
        right: right || undefined,
        bottom: bottom || undefined,
        zIndex: zIndex !== undefined && zIndex !== 0 ? zIndex : undefined,
        boxSizing: "border-box",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Background overlay — sits between bg image and content */}
      {backgroundImage && backgroundOverlay && resolveOverlay(backgroundOverlay) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: resolveOverlay(backgroundOverlay),
            borderRadius: `${borderRadius}px`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
      {/* Content — above overlay */}
      {backgroundImage && backgroundOverlay && resolveOverlay(backgroundOverlay) ? (
        <div style={{ position: "relative", zIndex: 1, display: "contents" }}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

CraftContainer.craft = {
  displayName: "Container",
  props: {
    layoutMode: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexWrap: "nowrap",
    gap: 8,
    padding: 16,
    margin: 0,
    backgroundColor: "transparent",
    backgroundImage: "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOverlay: "",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "#e5e7eb",
    width: "100%",
    maxWidth: "",
    minHeight: "60px",
    height: "",
    overflow: "visible",
    opacity: 1,
    position: "relative",
    top: "",
    left: "",
    right: "",
    bottom: "",
    zIndex: 0,
    mobileFlexDirection: "",
    tabletFlexDirection: "",
    mobilePadding: "",
    tabletPadding: "",
    mobileGap: "",
    tabletGap: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
  related: {},
};

export default CraftContainer;
