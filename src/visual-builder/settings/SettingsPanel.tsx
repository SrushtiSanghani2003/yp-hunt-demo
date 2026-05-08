import { useEditor } from "@craftjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { Settings2, X, Upload, FileText, Paintbrush, ChevronDown, ChevronRight, Loader2, Plus, Trash2, ImagePlus } from "lucide-react";
import "../visual-builder.css";
import { useBlockMode } from "../contexts/BlockModeContext";
import api from "../../lib/api";
import ToggleSwitch from "../../components/ui/switch/ToggleSwitch";
import { useCategoryDropdown } from "../hooks/useCategoryDropdown";
import { MODULE_CONFIG } from "../components/CraftSection";
import type { SectionModuleType } from "../components/CraftSection";
import { bentoLayouts } from "../../components/blocks/bentobox/bentoLayouts";
import { extractYouTubeId } from "../../config/function";

/**
 * Settings panel — reads the selected node's props and renders
 * appropriate form controls for editing them.
 */

interface PropConfig {
  key: string;
  label: string;
  type: "text" | "number" | "color" | "select" | "slider" | "toggle" | "textarea" | "image-upload" | "video-upload";
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  group?: string;
  placeholder?: string;
  /** Upload type for API endpoint (block, hero, etc.) */
  uploadType?: string;
  /** Which tab this setting belongs to: "form" (content/data) or "design" (visual styling). Auto-inferred from group if omitted. */
  tab?: "form" | "design";
}

interface PartnerTierEditorPartner {
  id: number | string;
  text: string;
  imageUrl: string;
  partnerUrl?: string;
}

interface PartnerTierEditorTier {
  tierName: string;
  partners: PartnerTierEditorPartner[];
}

const BENTO_STYLE_OPTIONS = Object.keys(bentoLayouts).map((key) => ({
  value: key,
  label: key,
}));

/** Groups that belong to the "form" tab (content, data, display toggles) */
const FORM_GROUPS = new Set([
  "Content", "Data", "Display", "Playback", "Header",
]);

/** Everything else goes to the "design" tab */
function getSettingTab(config: PropConfig): "form" | "design" {
  if (config.tab) return config.tab;
  return FORM_GROUPS.has(config.group || "") ? "form" : "design";
}

// Settings configs per component type
const componentSettings: Record<string, PropConfig[]> = {
  Text: [
    { key: "text", label: "Text Content", type: "textarea", group: "Content" },
    { key: "richText", label: "Rich Text (HTML)", type: "toggle", group: "Content" },
    {
      key: "tagName", label: "Tag", type: "select", options: [
        { value: "p", label: "Paragraph" }, { value: "h1", label: "H1" },
        { value: "h2", label: "H2" }, { value: "h3", label: "H3" },
        { value: "h4", label: "H4" }, { value: "h5", label: "H5" },
        { value: "h6", label: "H6" }, { value: "span", label: "Span" },
      ], group: "Typography"
    },
    { key: "fontSize", label: "Font Size", type: "slider", min: 10, max: 72, step: 1, group: "Typography" },
    {
      key: "fontWeight", label: "Weight", type: "select", options: [
        { value: "300", label: "Light" }, { value: "400", label: "Regular" },
        { value: "500", label: "Medium" }, { value: "600", label: "Semibold" },
        { value: "700", label: "Bold" }, { value: "800", label: "Extra Bold" },
      ], group: "Typography"
    },
    { key: "color", label: "Color", type: "color", group: "Typography" },
    {
      key: "textAlign", label: "Alignment", type: "select", options: [
        { value: "left", label: "Left" }, { value: "center", label: "Center" },
        { value: "right", label: "Right" }, { value: "justify", label: "Justify" },
      ], group: "Typography"
    },
    { key: "lineHeight", label: "Line Height", type: "text", group: "Typography" },
    { key: "letterSpacing", label: "Letter Spacing", type: "text", group: "Typography", placeholder: "normal" },
    {
      key: "fontFamily", label: "Font Family", type: "select", options: [
        { value: "", label: "Default" }, { value: "Inter, sans-serif", label: "Inter" },
        { value: "Montserrat, sans-serif", label: "Montserrat" },
        { value: "Roboto, sans-serif", label: "Roboto" },
        { value: "Georgia, serif", label: "Georgia" },
        { value: "monospace", label: "Monospace" },
      ], group: "Typography"
    },
    {
      key: "textDecoration", label: "Decoration", type: "select", options: [
        { value: "none", label: "None" }, { value: "underline", label: "Underline" },
        { value: "line-through", label: "Strikethrough" },
      ], group: "Typography"
    },
    {
      key: "textTransform", label: "Transform", type: "select", options: [
        { value: "none", label: "None" }, { value: "uppercase", label: "UPPERCASE" },
        { value: "lowercase", label: "lowercase" }, { value: "capitalize", label: "Capitalize" },
      ], group: "Typography"
    },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 50, step: 1, group: "Style" },
    { key: "opacity", label: "Opacity", type: "slider", min: 0, max: 1, step: 0.05, group: "Style" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "minHeight", label: "Min Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "margin", label: "Margin", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    {
      key: "position", label: "Position", type: "select", options: [
        { value: "static", label: "Static" }, { value: "relative", label: "Relative" },
        { value: "absolute", label: "Absolute" },
      ], group: "Position"
    },
    { key: "top", label: "Top", type: "text", group: "Position", placeholder: "auto" },
    { key: "left", label: "Left", type: "text", group: "Position", placeholder: "auto" },
    { key: "right", label: "Right", type: "text", group: "Position", placeholder: "auto" },
    { key: "bottom", label: "Bottom", type: "text", group: "Position", placeholder: "auto" },
    { key: "zIndex", label: "Z-Index", type: "number", group: "Position" },
    { key: "tabletFontSize", label: "Tablet Font Size", type: "slider", min: 10, max: 72, step: 1, group: "Responsive" },
    { key: "mobileFontSize", label: "Mobile Font Size", type: "slider", min: 10, max: 72, step: 1, group: "Responsive" },
    {
      key: "tabletTextAlign", label: "Tablet Align", type: "select", options: [
        { value: "", label: "Same as Desktop" }, { value: "left", label: "Left" },
        { value: "center", label: "Center" }, { value: "right", label: "Right" },
      ], group: "Responsive"
    },
    {
      key: "mobileTextAlign", label: "Mobile Align", type: "select", options: [
        { value: "", label: "Same as Desktop" }, { value: "left", label: "Left" },
        { value: "center", label: "Center" }, { value: "right", label: "Right" },
      ], group: "Responsive"
    },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Image: [
    { key: "src", label: "Image Source", type: "image-upload", group: "Content", uploadType: "block" },
    { key: "alt", label: "Alt Text", type: "text", group: "Content" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "200px" },
    {
      key: "objectFit", label: "Object Fit", type: "select", options: [
        { value: "cover", label: "Cover" }, { value: "contain", label: "Contain" },
        { value: "fill", label: "Fill" }, { value: "none", label: "None" },
      ], group: "Dimensions"
    },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 50, step: 1, group: "Style" },
    { key: "borderWidth", label: "Border", type: "slider", min: 0, max: 5, step: 1, group: "Style" },
    { key: "borderColor", label: "Border Color", type: "color", group: "Style" },
    { key: "opacity", label: "Opacity", type: "slider", min: 0, max: 1, step: 0.05, group: "Style" },
    { key: "boxShadow", label: "Shadow", type: "text", group: "Style", placeholder: "none" },
    { key: "margin", label: "Margin", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    {
      key: "position", label: "Position", type: "select", options: [
        { value: "static", label: "Static" }, { value: "relative", label: "Relative" },
        { value: "absolute", label: "Absolute" },
      ], group: "Position"
    },
    { key: "top", label: "Top", type: "text", group: "Position", placeholder: "auto" },
    { key: "left", label: "Left", type: "text", group: "Position", placeholder: "auto" },
    { key: "right", label: "Right", type: "text", group: "Position", placeholder: "auto" },
    { key: "bottom", label: "Bottom", type: "text", group: "Position", placeholder: "auto" },
    { key: "zIndex", label: "Z-Index", type: "number", group: "Position" },
    { key: "tabletWidth", label: "Tablet Width", type: "text", group: "Responsive", placeholder: "Same as desktop" },
    { key: "mobileWidth", label: "Mobile Width", type: "text", group: "Responsive", placeholder: "100%" },
    { key: "tabletHeight", label: "Tablet Height", type: "text", group: "Responsive", placeholder: "Same as desktop" },
    { key: "mobileHeight", label: "Mobile Height", type: "text", group: "Responsive", placeholder: "auto" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Button: [
    { key: "text", label: "Button Text", type: "text", group: "Content" },
    { key: "href", label: "Link URL", type: "text", group: "Content", placeholder: "https://..." },
    { key: "openInNewTab", label: "Open in New Tab", type: "toggle", group: "Content" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "color", label: "Text Color", type: "color", group: "Style" },
    { key: "fontSize", label: "Font Size", type: "slider", min: 12, max: 32, step: 1, group: "Typography" },
    {
      key: "fontWeight", label: "Weight", type: "select", options: [
        { value: "400", label: "Regular" }, { value: "500", label: "Medium" },
        { value: "600", label: "Semibold" }, { value: "700", label: "Bold" },
      ], group: "Typography"
    },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 50, step: 1, group: "Style" },
    { key: "borderWidth", label: "Border", type: "slider", min: 0, max: 5, step: 1, group: "Style" },
    { key: "borderColor", label: "Border Color", type: "color", group: "Style" },
    { key: "opacity", label: "Opacity", type: "slider", min: 0, max: 1, step: 0.05, group: "Style" },
    { key: "boxShadow", label: "Shadow", type: "text", group: "Style", placeholder: "none" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "text", group: "Spacing", placeholder: "10px 24px" },
    { key: "margin", label: "Margin", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    {
      key: "position", label: "Position", type: "select", options: [
        { value: "static", label: "Static" }, { value: "relative", label: "Relative" },
        { value: "absolute", label: "Absolute" },
      ], group: "Position"
    },
    { key: "top", label: "Top", type: "text", group: "Position", placeholder: "auto" },
    { key: "left", label: "Left", type: "text", group: "Position", placeholder: "auto" },
    { key: "right", label: "Right", type: "text", group: "Position", placeholder: "auto" },
    { key: "bottom", label: "Bottom", type: "text", group: "Position", placeholder: "auto" },
    { key: "zIndex", label: "Z-Index", type: "number", group: "Position" },
    { key: "tabletFontSize", label: "Tablet Font Size", type: "slider", min: 12, max: 32, step: 1, group: "Responsive" },
    { key: "mobileFontSize", label: "Mobile Font Size", type: "slider", min: 12, max: 32, step: 1, group: "Responsive" },
    { key: "tabletWidth", label: "Tablet Width", type: "text", group: "Responsive", placeholder: "Same as desktop" },
    { key: "mobileWidth", label: "Mobile Width", type: "text", group: "Responsive", placeholder: "100%" },
    { key: "tabletPadding", label: "Tablet Padding", type: "text", group: "Responsive", placeholder: "Same as desktop" },
    { key: "mobilePadding", label: "Mobile Padding", type: "text", group: "Responsive", placeholder: "8px 16px" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Video: [
    {
      key: "videoType", label: "Video Type", type: "select", options: [
        { value: "youtube", label: "YouTube" }, { value: "native", label: "Native" },
      ], group: "Content"
    },
    { key: "src", label: "Video Source", type: "video-upload", group: "Content", uploadType: "block" },
    { key: "videoId", label: "YouTube ID (Auto)", type: "text", group: "Content" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "315px" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 30, step: 1, group: "Style" },
    { key: "opacity", label: "Opacity", type: "slider", min: 0, max: 1, step: 0.05, group: "Style" },
    { key: "autoplay", label: "Autoplay", type: "toggle", group: "Playback" },
    { key: "muted", label: "Muted", type: "toggle", group: "Playback" },
    { key: "loop", label: "Loop", type: "toggle", group: "Playback" },
    { key: "tabletWidth", label: "Tablet Width", type: "text", group: "Responsive", placeholder: "Same as desktop" },
    { key: "mobileWidth", label: "Mobile Width", type: "text", group: "Responsive", placeholder: "100%" },
    { key: "tabletHeight", label: "Tablet Height", type: "text", group: "Responsive", placeholder: "Same as desktop" },
    { key: "mobileHeight", label: "Mobile Height", type: "text", group: "Responsive", placeholder: "auto" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  HTML: [
    { key: "html", label: "HTML Markup", type: "textarea", group: "Content", placeholder: "<div>Custom content</div>" },
    { key: "customCss", label: "Custom CSS", type: "textarea", group: "Content", placeholder: ".my-class { color: #111827; }" },
    { key: "className", label: "CSS Class", type: "text", group: "Content", placeholder: "my-custom-block" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "maxWidth", label: "Max Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "minHeight", label: "Min Height", type: "text", group: "Dimensions", placeholder: "100px" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 96, step: 1, group: "Spacing" },
    { key: "margin", label: "Margin", type: "slider", min: 0, max: 96, step: 1, group: "Spacing" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 50, step: 1, group: "Style" },
    { key: "borderWidth", label: "Border", type: "slider", min: 0, max: 8, step: 1, group: "Style" },
    { key: "borderColor", label: "Border Color", type: "color", group: "Style" },
    {
      key: "overflow", label: "Overflow", type: "select", options: [
        { value: "visible", label: "Visible" },
        { value: "hidden", label: "Hidden" },
        { value: "auto", label: "Auto" },
      ], group: "Style"
    },
    { key: "opacity", label: "Opacity", type: "slider", min: 0, max: 1, step: 0.05, group: "Style" },
    {
      key: "position", label: "Position", type: "select", options: [
        { value: "relative", label: "Relative" }, { value: "static", label: "Static" },
        { value: "absolute", label: "Absolute" }, { value: "fixed", label: "Fixed" },
        { value: "sticky", label: "Sticky" },
      ], group: "Position"
    },
    { key: "top", label: "Top", type: "text", group: "Position", placeholder: "auto" },
    { key: "left", label: "Left", type: "text", group: "Position", placeholder: "auto" },
    { key: "right", label: "Right", type: "text", group: "Position", placeholder: "auto" },
    { key: "bottom", label: "Bottom", type: "text", group: "Position", placeholder: "auto" },
    { key: "zIndex", label: "Z-Index", type: "number", group: "Position" },
    { key: "tabletWidth", label: "Tablet Width", type: "text", group: "Responsive", placeholder: "Same as desktop" },
    { key: "mobileWidth", label: "Mobile Width", type: "text", group: "Responsive", placeholder: "100%" },
    { key: "tabletHeight", label: "Tablet Height", type: "text", group: "Responsive", placeholder: "Same as desktop" },
    { key: "mobileHeight", label: "Mobile Height", type: "text", group: "Responsive", placeholder: "auto" },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 96, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 96, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Container: [
    {
      key: "layoutMode", label: "Layout Mode", type: "select", options: [
        { value: "flex", label: "Stacked (flex layout)" }, { value: "freeform", label: "Free-form (place anywhere)" },
      ], group: "Layout"
    },
    {
      key: "flexDirection", label: "Direction", type: "select", options: [
        { value: "column", label: "Vertical (top to bottom)" }, { value: "row", label: "Horizontal (side by side)" },
      ], group: "Layout"
    },
    {
      key: "justifyContent", label: "Content Position", type: "select", options: [
        { value: "flex-start", label: "Top / Left" }, { value: "center", label: "Center" },
        { value: "flex-end", label: "Bottom / Right" }, { value: "space-between", label: "Space Between" },
        { value: "space-around", label: "Space Around" }, { value: "space-evenly", label: "Space Evenly" },
      ], group: "Layout"
    },
    {
      key: "alignItems", label: "Align Items", type: "select", options: [
        { value: "stretch", label: "Stretch (fill width)" }, { value: "flex-start", label: "Left / Top" },
        { value: "center", label: "Center" }, { value: "flex-end", label: "Right / Bottom" },
      ], group: "Layout"
    },
    {
      key: "flexWrap", label: "Wrap", type: "select", options: [
        { value: "nowrap", label: "No Wrap" }, { value: "wrap", label: "Wrap" },
      ], group: "Layout"
    },
    { key: "gap", label: "Gap", type: "slider", min: 0, max: 64, step: 1, group: "Layout" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "margin", label: "Margin", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "backgroundImage", label: "BG Image", type: "image-upload", group: "Style", uploadType: "block" },
    {
      key: "backgroundSize", label: "BG Size", type: "select", options: [
        { value: "cover", label: "Cover" }, { value: "contain", label: "Contain" },
        { value: "auto", label: "Auto" }, { value: "100% 100%", label: "Stretch" },
      ], group: "Style"
    },
    {
      key: "backgroundPosition", label: "BG Position", type: "select", options: [
        { value: "center", label: "Center" }, { value: "top", label: "Top" },
        { value: "bottom", label: "Bottom" }, { value: "left", label: "Left" },
        { value: "right", label: "Right" }, { value: "top left", label: "Top Left" },
        { value: "top right", label: "Top Right" }, { value: "bottom left", label: "Bottom Left" },
        { value: "bottom right", label: "Bottom Right" },
      ], group: "Style"
    },
    {
      key: "backgroundRepeat", label: "BG Repeat", type: "select", options: [
        { value: "no-repeat", label: "No Repeat" }, { value: "repeat", label: "Repeat" },
        { value: "repeat-x", label: "Repeat X" }, { value: "repeat-y", label: "Repeat Y" },
      ], group: "Style"
    },
    {
      key: "backgroundOverlay", label: "BG Overlay", type: "select", options: [
        { value: "", label: "None" },
        { value: "light", label: "Light" },
        { value: "medium", label: "Medium" },
        { value: "dark", label: "Dark" },
        { value: "extra-dark", label: "Extra Dark" },
        { value: "light-warm", label: "Light Warm" },
        { value: "dark-blue", label: "Dark Blue" },
      ], group: "Style"
    },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 50, step: 1, group: "Style" },
    { key: "borderWidth", label: "Border", type: "slider", min: 0, max: 5, step: 1, group: "Style" },
    { key: "borderColor", label: "Border Color", type: "color", group: "Style" },
    { key: "opacity", label: "Opacity", type: "slider", min: 0, max: 1, step: 0.05, group: "Style" },
    {
      key: "overflow", label: "Overflow", type: "select", options: [
        { value: "visible", label: "Visible" }, { value: "hidden", label: "Hidden" },
        { value: "auto", label: "Auto" },
      ], group: "Style"
    },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "maxWidth", label: "Max Width", type: "text", group: "Dimensions", placeholder: "" },
    { key: "minHeight", label: "Min Height", type: "text", group: "Dimensions", placeholder: "60px" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    {
      key: "position", label: "Position", type: "select", options: [
        { value: "relative", label: "Relative" }, { value: "absolute", label: "Absolute" },
        { value: "fixed", label: "Fixed" }, { value: "sticky", label: "Sticky" },
        { value: "static", label: "Static" },
      ], group: "Position"
    },
    { key: "top", label: "Top", type: "text", group: "Position", placeholder: "auto" },
    { key: "left", label: "Left", type: "text", group: "Position", placeholder: "auto" },
    { key: "right", label: "Right", type: "text", group: "Position", placeholder: "auto" },
    { key: "bottom", label: "Bottom", type: "text", group: "Position", placeholder: "auto" },
    { key: "zIndex", label: "Z-Index", type: "number", group: "Position" },
    {
      key: "tabletFlexDirection", label: "Tablet Direction", type: "select", options: [
        { value: "", label: "Same as Desktop" }, { value: "column", label: "Vertical" }, { value: "row", label: "Horizontal" },
      ], group: "Responsive"
    },
    {
      key: "mobileFlexDirection", label: "Mobile Direction", type: "select", options: [
        { value: "", label: "Same as Desktop" }, { value: "column", label: "Vertical" }, { value: "row", label: "Horizontal" },
      ], group: "Responsive"
    },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "tabletGap", label: "Tablet Gap", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobileGap", label: "Mobile Gap", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Spacer: [
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height (px)", type: "slider", min: 4, max: 200, step: 1, group: "Spacing" },
    { key: "tabletHeight", label: "Tablet Height", type: "slider", min: 0, max: 200, step: 1, group: "Responsive" },
    { key: "mobileHeight", label: "Mobile Height", type: "slider", min: 0, max: 200, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Divider: [
    { key: "thickness", label: "Thickness", type: "slider", min: 1, max: 10, step: 1, group: "Style" },
    { key: "color", label: "Color", type: "color", group: "Style" },
    {
      key: "lineStyle", label: "Style", type: "select", options: [
        { value: "solid", label: "Solid" }, { value: "dashed", label: "Dashed" },
        { value: "dotted", label: "Dotted" },
      ], group: "Style"
    },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "marginY", label: "V. Margin", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletMarginY", label: "Tablet V. Margin", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobileMarginY", label: "Mobile V. Margin", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "tabletWidth", label: "Tablet Width", type: "text", group: "Responsive", placeholder: "Same as desktop" },
    { key: "mobileWidth", label: "Mobile Width", type: "text", group: "Responsive", placeholder: "100%" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Section: [
    {
      key: "moduleType", label: "Module", type: "select", options: [
        { value: "article", label: "Articles" }, { value: "news", label: "News" },
        { value: "video", label: "Videos" }, { value: "album", label: "Albums" },
        { value: "shop", label: "Shop" }, { value: "partner", label: "Partners" },
        { value: "bentobox", label: "BentoBox" },
      ], group: "Data"
    },
    { key: "categoryName", label: "Category", type: "text", group: "Data", placeholder: "Leave empty for all" },
    { key: "bentoItems", label: "Bento Boxes", type: "textarea", group: "Data" },
    { key: "limit", label: "Item Limit", type: "slider", min: 1, max: 24, step: 1, group: "Data" },
    {
      key: "displayStyle", label: "Display", type: "select", options: [
        { value: "grid", label: "Grid" }, { value: "list", label: "List" },
        { value: "carousel", label: "Carousel" }, { value: "bento", label: "Bento" },
      ], group: "Layout"
    },
    { key: "bentoStyle", label: "Bento Style", type: "select", options: BENTO_STYLE_OPTIONS, group: "Layout" },
    { key: "bentoRowHeight", label: "Bento Row Height", type: "slider", min: 80, max: 360, step: 10, group: "Layout" },
    { key: "columns", label: "Columns", type: "slider", min: 1, max: 6, step: 1, group: "Layout" },
    { key: "gap", label: "Gap", type: "slider", min: 0, max: 48, step: 1, group: "Layout" },
    { key: "showImage", label: "Show Image", type: "toggle", group: "Display" },
    { key: "showTitle", label: "Show Title", type: "toggle", group: "Display" },
    { key: "showDate", label: "Show Date", type: "toggle", group: "Display" },
    { key: "showAuthor", label: "Show Author", type: "toggle", group: "Display" },
    { key: "showSectionTitle", label: "Show Section Title", type: "toggle", group: "Header" },
    { key: "sectionTitle", label: "Title Text", type: "text", group: "Header", placeholder: "Auto from module" },
    { key: "sectionTitleFontSize", label: "Title Size", type: "slider", min: 14, max: 48, step: 1, group: "Header" },
    { key: "sectionTitleColor", label: "Title Color", type: "color", group: "Header" },
    { key: "cardBorderRadius", label: "Card Radius", type: "slider", min: 0, max: 24, step: 1, group: "Card Style" },
    { key: "cardBackgroundColor", label: "Card BG", type: "color", group: "Card Style" },
    { key: "cardBorderWidth", label: "Card Border", type: "slider", min: 0, max: 4, step: 1, group: "Card Style" },
    { key: "cardBorderColor", label: "Border Color", type: "color", group: "Card Style" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "tabletColumns", label: "Tablet Columns", type: "slider", min: 1, max: 4, step: 1, group: "Responsive" },
    { key: "mobileColumns", label: "Mobile Columns", type: "slider", min: 1, max: 3, step: 1, group: "Responsive" },
    { key: "tabletGap", label: "Tablet Gap", type: "slider", min: 0, max: 48, step: 1, group: "Responsive" },
    { key: "mobileGap", label: "Mobile Gap", type: "slider", min: 0, max: 48, step: 1, group: "Responsive" },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Testimonial: [
    { key: "quote", label: "Quote Text", type: "textarea", group: "Content" },
    { key: "authorName", label: "Author Name", type: "text", group: "Content" },
    { key: "authorTitle", label: "Author Title", type: "text", group: "Content" },
    { key: "authorImage", label: "Author Image", type: "image-upload", group: "Content", uploadType: "block" },
    { key: "rating", label: "Rating", type: "slider", min: 0, max: 5, step: 1, group: "Content" },
    {
      key: "layout", label: "Layout", type: "select", options: [
        { value: "card", label: "Card" }, { value: "minimal", label: "Minimal" }, { value: "centered", label: "Centered" },
      ], group: "Layout"
    },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "textColor", label: "Text Color", type: "color", group: "Style" },
    { key: "accentColor", label: "Accent", type: "color", group: "Style" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "borderWidth", label: "Border", type: "slider", min: 0, max: 4, step: 1, group: "Style" },
    { key: "borderColor", label: "Border Color", type: "color", group: "Style" },
    { key: "fontSize", label: "Font Size", type: "slider", min: 12, max: 28, step: 1, group: "Typography" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletFontSize", label: "Tablet Font Size", type: "slider", min: 12, max: 28, step: 1, group: "Responsive" },
    { key: "mobileFontSize", label: "Mobile Font Size", type: "slider", min: 12, max: 28, step: 1, group: "Responsive" },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  FAQ: [
    { key: "items", label: "FAQ Items", type: "textarea", group: "Content" },
    { key: "accentColor", label: "Accent", type: "color", group: "Style" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "textColor", label: "Text Color", type: "color", group: "Style" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "borderWidth", label: "Border", type: "slider", min: 0, max: 4, step: 1, group: "Style" },
    { key: "borderColor", label: "Border Color", type: "color", group: "Style" },
    { key: "gap", label: "Gap", type: "slider", min: 0, max: 24, step: 1, group: "Layout" },
    { key: "questionFontSize", label: "Question Size", type: "slider", min: 12, max: 28, step: 1, group: "Typography" },
    { key: "answerFontSize", label: "Answer Size", type: "slider", min: 12, max: 24, step: 1, group: "Typography" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "tabletQuestionFontSize", label: "Tablet Q. Size", type: "slider", min: 12, max: 28, step: 1, group: "Responsive" },
    { key: "mobileQuestionFontSize", label: "Mobile Q. Size", type: "slider", min: 12, max: 28, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Gallery: [
    { key: "images", label: "Images", type: "textarea", group: "Content" },
    { key: "columns", label: "Columns", type: "slider", min: 1, max: 6, step: 1, group: "Layout" },
    { key: "gap", label: "Gap", type: "slider", min: 0, max: 32, step: 1, group: "Layout" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "imageHeight", label: "Image Height", type: "text", group: "Dimensions", placeholder: "200px" },
    {
      key: "objectFit", label: "Object Fit", type: "select", options: [
        { value: "cover", label: "Cover" }, { value: "contain", label: "Contain" },
      ], group: "Dimensions"
    },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "showCaptions", label: "Show Captions", type: "toggle", group: "Display" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "tabletColumns", label: "Tablet Columns", type: "slider", min: 1, max: 4, step: 1, group: "Responsive" },
    { key: "mobileColumns", label: "Mobile Columns", type: "slider", min: 1, max: 3, step: 1, group: "Responsive" },
    { key: "tabletGap", label: "Tablet Gap", type: "slider", min: 0, max: 32, step: 1, group: "Responsive" },
    { key: "mobileGap", label: "Mobile Gap", type: "slider", min: 0, max: 32, step: 1, group: "Responsive" },
    { key: "tabletImageHeight", label: "Tablet Img Height", type: "text", group: "Responsive", placeholder: "Same" },
    { key: "mobileImageHeight", label: "Mobile Img Height", type: "text", group: "Responsive", placeholder: "150px" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Team: [
    { key: "members", label: "Members", type: "textarea", group: "Content" },
    { key: "columns", label: "Columns", type: "slider", min: 1, max: 6, step: 1, group: "Layout" },
    { key: "gap", label: "Gap", type: "slider", min: 0, max: 32, step: 1, group: "Layout" },
    {
      key: "layout", label: "Layout", type: "select", options: [
        { value: "grid", label: "Grid" }, { value: "horizontal", label: "Horizontal" },
      ], group: "Layout"
    },
    { key: "showImage", label: "Show Image", type: "toggle", group: "Display" },
    { key: "imageSize", label: "Avatar Size", type: "slider", min: 40, max: 120, step: 4, group: "Style" },
    { key: "cardBackgroundColor", label: "Card BG", type: "color", group: "Style" },
    { key: "cardBorderRadius", label: "Card Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "cardBorderWidth", label: "Card Border", type: "slider", min: 0, max: 4, step: 1, group: "Style" },
    { key: "cardBorderColor", label: "Border Color", type: "color", group: "Style" },
    { key: "nameFontSize", label: "Name Size", type: "slider", min: 12, max: 24, step: 1, group: "Typography" },
    { key: "roleFontSize", label: "Role Size", type: "slider", min: 10, max: 18, step: 1, group: "Typography" },
    { key: "nameColor", label: "Name Color", type: "color", group: "Typography" },
    { key: "roleColor", label: "Role Color", type: "color", group: "Typography" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletColumns", label: "Tablet Columns", type: "slider", min: 1, max: 4, step: 1, group: "Responsive" },
    { key: "mobileColumns", label: "Mobile Columns", type: "slider", min: 1, max: 3, step: 1, group: "Responsive" },
    { key: "tabletGap", label: "Tablet Gap", type: "slider", min: 0, max: 32, step: 1, group: "Responsive" },
    { key: "mobileGap", label: "Mobile Gap", type: "slider", min: 0, max: 32, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Contact: [
    { key: "title", label: "Title", type: "text", group: "Content" },
    { key: "description", label: "Description", type: "textarea", group: "Content" },
    { key: "phone", label: "Phone", type: "text", group: "Content" },
    { key: "email", label: "Email", type: "text", group: "Content" },
    { key: "address", label: "Address", type: "textarea", group: "Content" },
    { key: "showMap", label: "Show Map", type: "toggle", group: "Content" },
    { key: "mapEmbedUrl", label: "Map Embed URL", type: "text", group: "Content", placeholder: "https://..." },
    {
      key: "layout", label: "Layout", type: "select", options: [
        { value: "vertical", label: "Vertical" }, { value: "horizontal", label: "Horizontal" },
      ], group: "Layout"
    },
    { key: "titleFontSize", label: "Title Size", type: "slider", min: 14, max: 48, step: 1, group: "Typography" },
    { key: "titleColor", label: "Title Color", type: "color", group: "Typography" },
    { key: "textColor", label: "Text Color", type: "color", group: "Typography" },
    { key: "iconColor", label: "Icon Color", type: "color", group: "Style" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "borderWidth", label: "Border", type: "slider", min: 0, max: 4, step: 1, group: "Style" },
    { key: "borderColor", label: "Border Color", type: "color", group: "Style" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "tabletTitleFontSize", label: "Tablet Title Size", type: "slider", min: 14, max: 48, step: 1, group: "Responsive" },
    { key: "mobileTitleFontSize", label: "Mobile Title Size", type: "slider", min: 14, max: 48, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Quote: [
    { key: "quote", label: "Quote Text", type: "textarea", group: "Content" },
    { key: "author", label: "Author", type: "text", group: "Content" },
    { key: "source", label: "Source", type: "text", group: "Content" },
    {
      key: "accentStyle", label: "Accent Style", type: "select", options: [
        { value: "left-bar", label: "Left Bar" }, { value: "quote-marks", label: "Quote Marks" },
        { value: "top-bottom-bar", label: "Top/Bottom Bar" },
      ], group: "Style"
    },
    {
      key: "textAlign", label: "Alignment", type: "select", options: [
        { value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" },
      ], group: "Style"
    },
    { key: "fontSize", label: "Font Size", type: "slider", min: 14, max: 36, step: 1, group: "Typography" },
    {
      key: "fontWeight", label: "Weight", type: "select", options: [
        { value: "400", label: "Regular" }, { value: "500", label: "Medium" }, { value: "600", label: "Semibold" },
      ], group: "Typography"
    },
    {
      key: "fontStyle", label: "Style", type: "select", options: [
        { value: "normal", label: "Normal" }, { value: "italic", label: "Italic" },
      ], group: "Typography"
    },
    { key: "textColor", label: "Text Color", type: "color", group: "Typography" },
    { key: "authorColor", label: "Author Color", type: "color", group: "Typography" },
    { key: "accentColor", label: "Accent Color", type: "color", group: "Style" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletFontSize", label: "Tablet Font Size", type: "slider", min: 14, max: 36, step: 1, group: "Responsive" },
    { key: "mobileFontSize", label: "Mobile Font Size", type: "slider", min: 14, max: 36, step: 1, group: "Responsive" },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Timeline: [
    { key: "items", label: "Timeline Items", type: "textarea", group: "Content" },
    {
      key: "layout", label: "Layout", type: "select", options: [
        { value: "left", label: "Left" }, { value: "alternating", label: "Alternating" },
      ], group: "Layout"
    },
    { key: "accentColor", label: "Accent", type: "color", group: "Style" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "textColor", label: "Text Color", type: "color", group: "Style" },
    { key: "dateColor", label: "Date Color", type: "color", group: "Style" },
    { key: "lineColor", label: "Line Color", type: "color", group: "Style" },
    { key: "titleFontSize", label: "Title Size", type: "slider", min: 12, max: 24, step: 1, group: "Typography" },
    { key: "dateFontSize", label: "Date Size", type: "slider", min: 10, max: 18, step: 1, group: "Typography" },
    { key: "descriptionFontSize", label: "Desc Size", type: "slider", min: 10, max: 18, step: 1, group: "Typography" },
    { key: "gap", label: "Gap", type: "slider", min: 8, max: 48, step: 1, group: "Layout" },
    { key: "dotSize", label: "Dot Size", type: "slider", min: 6, max: 20, step: 1, group: "Style" },
    { key: "lineWidth", label: "Line Width", type: "slider", min: 1, max: 4, step: 1, group: "Style" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  "Social Wall": [
    { key: "platforms", label: "Platforms", type: "textarea", group: "Content" },
    {
      key: "layout", label: "Layout", type: "select", options: [
        { value: "row", label: "Row" }, { value: "grid", label: "Grid" },
      ], group: "Layout"
    },
    { key: "columns", label: "Columns", type: "slider", min: 2, max: 8, step: 1, group: "Layout" },
    { key: "showLabels", label: "Show Labels", type: "toggle", group: "Display" },
    { key: "iconSize", label: "Icon Size", type: "slider", min: 16, max: 64, step: 2, group: "Style" },
    { key: "gap", label: "Gap", type: "slider", min: 4, max: 32, step: 1, group: "Layout" },
    { key: "iconColor", label: "Icon Color", type: "color", group: "Style" },
    { key: "hoverColor", label: "Hover Color", type: "color", group: "Style" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletIconSize", label: "Tablet Icon Size", type: "slider", min: 16, max: 64, step: 2, group: "Responsive" },
    { key: "mobileIconSize", label: "Mobile Icon Size", type: "slider", min: 16, max: 64, step: 2, group: "Responsive" },
    { key: "tabletGap", label: "Tablet Gap", type: "slider", min: 4, max: 32, step: 1, group: "Responsive" },
    { key: "mobileGap", label: "Mobile Gap", type: "slider", min: 4, max: 32, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Advertisement: [
    { key: "imageUrl", label: "Image", type: "image-upload", group: "Content", uploadType: "block" },
    { key: "linkUrl", label: "Link URL", type: "text", group: "Content", placeholder: "https://..." },
    { key: "openInNewTab", label: "New Tab", type: "toggle", group: "Content" },
    { key: "altText", label: "Alt Text", type: "text", group: "Content" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "250px" },
    {
      key: "objectFit", label: "Object Fit", type: "select", options: [
        { value: "cover", label: "Cover" }, { value: "contain", label: "Contain" }, { value: "fill", label: "Fill" },
      ], group: "Dimensions"
    },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "showLabel", label: "Show Label", type: "toggle", group: "Display" },
    { key: "label", label: "Label Text", type: "text", group: "Display" },
    {
      key: "labelPosition", label: "Label Position", type: "select", options: [
        { value: "top-left", label: "Top Left" }, { value: "top-right", label: "Top Right" },
        { value: "bottom-left", label: "Bottom Left" }, { value: "bottom-right", label: "Bottom Right" },
      ], group: "Display"
    },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 32, step: 1, group: "Spacing" },
    { key: "tabletWidth", label: "Tablet Width", type: "text", group: "Responsive", placeholder: "Same" },
    { key: "mobileWidth", label: "Mobile Width", type: "text", group: "Responsive", placeholder: "100%" },
    { key: "tabletHeight", label: "Tablet Height", type: "text", group: "Responsive", placeholder: "Same" },
    { key: "mobileHeight", label: "Mobile Height", type: "text", group: "Responsive", placeholder: "auto" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Promotion: [
    { key: "title", label: "Title", type: "text", group: "Content" },
    { key: "subtitle", label: "Subtitle", type: "text", group: "Content" },
    { key: "description", label: "Description", type: "textarea", group: "Content" },
    { key: "ctaText", label: "CTA Text", type: "text", group: "Content" },
    { key: "ctaUrl", label: "CTA URL", type: "text", group: "Content", placeholder: "https://..." },
    {
      key: "layout", label: "Layout", type: "select", options: [
        { value: "banner", label: "Banner" }, { value: "split", label: "Split" },
      ], group: "Layout"
    },
    {
      key: "textAlign", label: "Alignment", type: "select", options: [
        { value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" },
      ], group: "Layout"
    },
    { key: "backgroundImage", label: "BG Image", type: "image-upload", group: "Style", uploadType: "block" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "textColor", label: "Text Color", type: "color", group: "Style" },
    { key: "subtitleColor", label: "Subtitle Color", type: "color", group: "Style" },
    { key: "ctaBackgroundColor", label: "CTA BG", type: "color", group: "Style" },
    { key: "ctaTextColor", label: "CTA Text Color", type: "color", group: "Style" },
    { key: "ctaBorderRadius", label: "CTA Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "titleFontSize", label: "Title Size", type: "slider", min: 16, max: 48, step: 1, group: "Typography" },
    { key: "descriptionFontSize", label: "Desc Size", type: "slider", min: 12, max: 24, step: 1, group: "Typography" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletTitleFontSize", label: "Tablet Title Size", type: "slider", min: 16, max: 48, step: 1, group: "Responsive" },
    { key: "mobileTitleFontSize", label: "Mobile Title Size", type: "slider", min: 16, max: 48, step: 1, group: "Responsive" },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  "T-Card": [
    { key: "items", label: "Items", type: "textarea", group: "Content" },
    { key: "columns", label: "Columns", type: "slider", min: 1, max: 6, step: 1, group: "Layout" },
    { key: "gap", label: "Gap", type: "slider", min: 0, max: 32, step: 1, group: "Layout" },
    {
      key: "layout", label: "Layout", type: "select", options: [
        { value: "vertical", label: "Vertical" }, { value: "horizontal", label: "Horizontal" },
      ], group: "Layout"
    },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "imageHeight", label: "Image Height", type: "text", group: "Dimensions", placeholder: "180px" },
    { key: "cardBackgroundColor", label: "Card BG", type: "color", group: "Style" },
    { key: "cardBorderRadius", label: "Card Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "cardBorderWidth", label: "Card Border", type: "slider", min: 0, max: 4, step: 1, group: "Style" },
    { key: "cardBorderColor", label: "Border Color", type: "color", group: "Style" },
    { key: "titleFontSize", label: "Title Size", type: "slider", min: 12, max: 24, step: 1, group: "Typography" },
    { key: "descriptionFontSize", label: "Desc Size", type: "slider", min: 10, max: 18, step: 1, group: "Typography" },
    { key: "titleColor", label: "Title Color", type: "color", group: "Typography" },
    { key: "descriptionColor", label: "Desc Color", type: "color", group: "Typography" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletColumns", label: "Tablet Columns", type: "slider", min: 1, max: 4, step: 1, group: "Responsive" },
    { key: "mobileColumns", label: "Mobile Columns", type: "slider", min: 1, max: 3, step: 1, group: "Responsive" },
    { key: "tabletGap", label: "Tablet Gap", type: "slider", min: 0, max: 32, step: 1, group: "Responsive" },
    { key: "mobileGap", label: "Mobile Gap", type: "slider", min: 0, max: 32, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Documents: [
    { key: "documents", label: "Documents", type: "textarea", group: "Content" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "borderWidth", label: "Border", type: "slider", min: 0, max: 4, step: 1, group: "Style" },
    { key: "borderColor", label: "Border Color", type: "color", group: "Style" },
    { key: "accentColor", label: "Accent", type: "color", group: "Style" },
    { key: "titleColor", label: "Title Color", type: "color", group: "Typography" },
    { key: "metaColor", label: "Meta Color", type: "color", group: "Typography" },
    { key: "titleFontSize", label: "Title Size", type: "slider", min: 12, max: 20, step: 1, group: "Typography" },
    { key: "gap", label: "Gap", type: "slider", min: 0, max: 24, step: 1, group: "Layout" },
    { key: "showFileSize", label: "Show File Size", type: "toggle", group: "Display" },
    { key: "showDownloadButton", label: "Show Download", type: "toggle", group: "Display" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],

  Meetings: [
    { key: "meetings", label: "Meetings", type: "textarea", group: "Content" },
    {
      key: "layout", label: "Layout", type: "select", options: [
        { value: "list", label: "List" }, { value: "cards", label: "Cards" },
      ], group: "Layout"
    },
    { key: "accentColor", label: "Accent", type: "color", group: "Style" },
    { key: "backgroundColor", label: "Background", type: "color", group: "Style" },
    { key: "borderRadius", label: "Radius", type: "slider", min: 0, max: 24, step: 1, group: "Style" },
    { key: "borderWidth", label: "Border", type: "slider", min: 0, max: 4, step: 1, group: "Style" },
    { key: "borderColor", label: "Border Color", type: "color", group: "Style" },
    { key: "titleColor", label: "Title Color", type: "color", group: "Typography" },
    { key: "timeColor", label: "Time Color", type: "color", group: "Typography" },
    { key: "locationColor", label: "Location Color", type: "color", group: "Typography" },
    { key: "titleFontSize", label: "Title Size", type: "slider", min: 12, max: 24, step: 1, group: "Typography" },
    { key: "gap", label: "Gap", type: "slider", min: 0, max: 24, step: 1, group: "Layout" },
    { key: "showLocation", label: "Show Location", type: "toggle", group: "Display" },
    { key: "showDescription", label: "Show Description", type: "toggle", group: "Display" },
    { key: "width", label: "Width", type: "text", group: "Dimensions", placeholder: "100%" },
    { key: "height", label: "Height", type: "text", group: "Dimensions", placeholder: "auto" },
    { key: "padding", label: "Padding", type: "slider", min: 0, max: 64, step: 1, group: "Spacing" },
    { key: "tabletPadding", label: "Tablet Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "mobilePadding", label: "Mobile Padding", type: "slider", min: 0, max: 64, step: 1, group: "Responsive" },
    { key: "hideOnMobile", label: "Hide on Mobile", type: "toggle", group: "Responsive" },
    { key: "hideOnTablet", label: "Hide on Tablet", type: "toggle", group: "Responsive" },
    { key: "hideOnDesktop", label: "Hide on Desktop", type: "toggle", group: "Responsive" },
  ],
};

/* ------------------------------------------------------------------ */
/*  File upload helper — sends to /articles/upload/{type}             */
/* ------------------------------------------------------------------ */
async function uploadFileToApi(file: File, uploadType: string): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post(`/articles/upload/${uploadType}`, formData);
    return data?.data?.[0]?.url || null;
  } catch (err) {
    console.warn("Upload failed:", err);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  ImageUploadControl — URL input + local file picker                */
/* ------------------------------------------------------------------ */
function ImageUploadControl({
  value,
  onChange,
  propKey,
  uploadType = "block",
  label,
}: {
  value: string;
  onChange: (key: string, val: string) => void;
  propKey: string;
  uploadType?: string;
  label: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Immediately show local preview
      const localUrl = URL.createObjectURL(file);
      onChange(propKey, localUrl);

      // Upload to server
      const serverUrl = await uploadFileToApi(file, uploadType);
      if (serverUrl) {
        onChange(propKey, serverUrl);
        URL.revokeObjectURL(localUrl);
      }
    },
    [propKey, uploadType, onChange]
  );

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 500,
    color: "#6b7280",
    display: "block",
    marginBottom: "4px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box" as const,
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      {/* Preview thumbnail */}
      {value && (
        <div style={{ marginBottom: "6px", position: "relative" }}>
          <img
            src={value}
            alt="Preview"
            style={{
              width: "100%",
              height: "80px",
              objectFit: "cover",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              display: "block",
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <button
            onClick={() => onChange(propKey, "")}
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              fontSize: "11px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
            title="Remove"
          >
            ×
          </button>
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={() => fileRef.current?.click()}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12px",
          fontWeight: 500,
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#fafafa",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          color: "#6b7280",
          marginBottom: "6px",
          transition: "border-color 0.15s, background-color 0.15s",
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#f59e0b";
          (e.currentTarget as HTMLElement).style.backgroundColor = "#fffbeb";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db";
          (e.currentTarget as HTMLElement).style.backgroundColor = "#fafafa";
        }}
      >
        <Upload size={13} />
        Upload from device
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />

      {/* URL input */}
      <input
        type="text"
        value={value ?? ""}
        placeholder="or paste URL here..."
        onChange={(e) => onChange(propKey, e.target.value)}
        style={inputStyle}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  VideoUploadControl — URL input + local file picker + auto-fetch   */
/* ------------------------------------------------------------------ */
function VideoUploadControl({
  value,
  onChange,
  propKey,
  uploadType = "block",
  label,
  onAutoFetch,
}: {
  value: string;
  onChange: (key: string, val: string) => void;
  propKey: string;
  uploadType?: string;
  label: string;
  onAutoFetch?: (data: { videoId: string; thumbnail: string }) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const localUrl = URL.createObjectURL(file);
      onChange(propKey, localUrl);
      setVideoPreview(localUrl);

      const serverUrl = await uploadFileToApi(file, uploadType);
      if (serverUrl) {
        onChange(propKey, serverUrl);
        setVideoPreview(serverUrl);
        URL.revokeObjectURL(localUrl);
      }
    },
    [propKey, uploadType, onChange]
  );

  const handleUrlChange = useCallback(
    (url: string) => {
      onChange(propKey, url);

      // Auto-extract YouTube ID and thumbnail
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = extractYouTubeId(url);
        if (videoId) {
          const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
          onAutoFetch?.({ videoId, thumbnail });
        }
      }
    },
    [propKey, onChange, onAutoFetch]
  );

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 500,
    color: "#6b7280",
    display: "block",
    marginBottom: "4px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box" as const,
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      {/* Video preview for native videos */}
      {videoPreview && (
        <div style={{ marginBottom: "6px", position: "relative" }}>
          <video
            src={videoPreview}
            style={{
              width: "100%",
              height: "80px",
              objectFit: "cover",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              display: "block",
              backgroundColor: "#f3f4f6",
            }}
            onError={() => setVideoPreview("")}
          />
          <button
            onClick={() => {
              onChange(propKey, "");
              setVideoPreview("");
            }}
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              fontSize: "11px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
            title="Remove"
          >
            ×
          </button>
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={() => fileRef.current?.click()}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12px",
          fontWeight: 500,
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#fafafa",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          color: "#6b7280",
          marginBottom: "6px",
          transition: "border-color 0.15s, background-color 0.15s",
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#f59e0b";
          (e.currentTarget as HTMLElement).style.backgroundColor = "#fffbeb";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db";
          (e.currentTarget as HTMLElement).style.backgroundColor = "#fafafa";
        }}
      >
        <Upload size={13} />
        Upload from device
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />

      {/* URL input with auto-fetch */}
      <input
        type="text"
        value={value ?? ""}
        placeholder="or paste URL here..."
        onChange={(e) => handleUrlChange(e.target.value)}
        style={inputStyle}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
      />

      {value && (
        <button
          onClick={() => {
            onChange(propKey, "");
            setVideoPreview("");
          }}
          style={{
            marginTop: "4px",
            padding: "3px 8px",
            fontSize: "11px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#fef2f2",
            color: "#ef4444",
            cursor: "pointer",
          }}
        >
          Remove video
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SettingsControl — renders one control based on PropConfig type     */
/* ------------------------------------------------------------------ */
function SettingsControl({
  config,
  value,
  onChange,
}: {
  config: PropConfig;
  value: any;
  onChange: (key: string, value: any) => void;
}) {
  const { key, label, type, placeholder } = config;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 500,
    color: "#6b7280",
    display: "block",
    marginBottom: "3px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  // Handle auto-fetch for video uploads
  const handleAutoFetch = useCallback(
    (data: { videoId: string; thumbnail: string }) => {
      // Update videoId if it's a YouTube video
      onChange("videoId", data.videoId);
    },
    [onChange]
  );

  switch (type) {
    case "text":
      return (
        <div style={{ marginBottom: "8px" }}>
          <label style={labelStyle}>{label}</label>
          <input
            type="text"
            value={value ?? ""}
            placeholder={placeholder}
            onChange={(e) => onChange(key, e.target.value)}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
          />
        </div>
      );

    case "textarea":
      const isTextContentTextarea = key === "text";
      return (
        <div style={{ marginBottom: "8px" }}>
          <label style={labelStyle}>{label}</label>
          <textarea
            value={value ?? ""}
            placeholder={placeholder}
            onChange={(e) => onChange(key, e.target.value)}
            onPaste={(e) => {
              setTimeout(() => {
                const el = e.target as HTMLTextAreaElement;
                el.style.height = "auto";
                el.style.height = Math.min(el.scrollHeight, 300) + "px";
              }, 0);
            }}
            onInput={(e) => {
              const el = e.target as HTMLTextAreaElement;
              el.style.height = "auto";
              el.style.height = Math.min(el.scrollHeight, 300) + "px";
            }}
            rows={isTextContentTextarea ? 8 : 3}
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: isTextContentTextarea ? "160px" : "60px",
              maxHeight: isTextContentTextarea ? "420px" : "300px",
              overflowY: "auto",
              fontFamily: isTextContentTextarea ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" : undefined,
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
          />
        </div>
      );

    case "number":
      return (
        <div style={{ marginBottom: "8px" }}>
          <label style={labelStyle}>{label}</label>
          <input
            type="number"
            value={value ?? 0}
            min={config.min}
            max={config.max}
            step={config.step}
            onChange={(e) => onChange(key, Number(e.target.value))}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
          />
        </div>
      );

    case "slider":
      return (
        <div style={{ marginBottom: "8px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2px",
          }}>
            <label style={{ ...labelStyle, marginBottom: 0, flex: "1 1 auto", minWidth: 0 }}>{label}</label>
            <input
              type="number"
              value={value ?? config.min ?? 0}
              min={config.min}
              max={config.max}
              step={config.step}
              onChange={(e) => onChange(key, Number(e.target.value))}
              style={{
                width: "48px",
                padding: "2px 4px",
                fontSize: "11px",
                textAlign: "right" as const,
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                outline: "none",
                backgroundColor: "#fff",
                color: "#374151",
                flexShrink: 0,
                marginLeft: "6px",
                boxSizing: "border-box" as const,
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>
          <input
            type="range"
            className="vb-slider"
            value={value ?? config.min ?? 0}
            min={config.min ?? 0}
            max={config.max ?? 100}
            step={config.step ?? 1}
            onChange={(e) => onChange(key, Number(e.target.value))}
          />
        </div>
      );

    case "color":
      return (
        <div style={{ marginBottom: "8px" }}>
          <label style={labelStyle}>{label}</label>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input
              type="color"
              className="vb-color-input"
              value={value && value !== "transparent" ? value : "#000000"}
              onChange={(e) => onChange(key, e.target.value)}
              style={{ width: "28px", height: "28px", flexShrink: 0, borderRadius: "6px" }}
            />
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder="#000000"
              style={{ ...inputStyle, flex: 1, width: "auto" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>
        </div>
      );

    case "select":
      return (
        <div style={{ marginBottom: "8px" }}>
          <label style={labelStyle}>{label}</label>
          <select
            value={value ?? ""}
            onChange={(e) => onChange(key, e.target.value)}
            style={{ ...inputStyle, cursor: "pointer", paddingRight: "24px" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
          >
            {config.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );

    case "toggle":
      return (
        <div
          style={{
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label style={{ ...labelStyle, marginBottom: 0 }}>
            {label}
          </label>

          <ToggleSwitch
            checked={value}
            onChange={(checked) => onChange(key, checked)}
          />
        </div>
      );
    case "image-upload":
      return (
        <ImageUploadControl
          value={value ?? ""}
          onChange={onChange}
          propKey={key}
          uploadType={config.uploadType}
          label={label}
        />
      );

    case "video-upload":
      return (
        <VideoUploadControl
          value={value ?? ""}
          onChange={onChange}
          propKey={key}
          uploadType={config.uploadType}
          label={label}
          onAutoFetch={handleAutoFetch}
        />
      );

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  CategoryDropdownControl — module-wise category selection           */
/* ------------------------------------------------------------------ */
function CategoryDropdownControl({
  moduleType,
  value,
  onChange,
  label,
}: {
  moduleType?: SectionModuleType;
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  const { categories, loading } = useCategoryDropdown(moduleType);
  const [isOpen, setIsOpen] = useState(false);

  // Show if module is selected (categories may be loading)
  if (!moduleType) {
    return null;
  }

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 500,
    color: "#6b7280",
    display: "block",
    marginBottom: "4px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box" as const,
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <label style={labelStyle}>{label}</label>
        {loading && <Loader2 size={12} style={{ animation: "spin 1s linear infinite", color: "#f59e0b" }} />}
      </div>

      <div style={{ position: "relative" }}>
        {/* Main dropdown button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading && categories.length === 0}
          style={{
            ...inputStyle,
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
            cursor: loading && categories.length === 0 ? "not-allowed" : "pointer",
            transition: "border-color 0.15s",
            opacity: loading && categories.length === 0 ? 0.6 : 1,
          }}
          onMouseOver={(e) => {
            if (!(loading && categories.length === 0)) {
              (e.currentTarget as HTMLElement).style.borderColor = "#f59e0b";
            }
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
          }}
        >
          <span style={{ flex: 1, textAlign: "left" }}>
            {loading && categories.length === 0 && <span style={{ color: "#9ca3af" }}>Loading categories...</span>}
            {!loading && value && categories.find((c) => c.name === value)?.name}
            {!loading && !value && categories.length > 0 && <span style={{ color: "#9ca3af" }}>All Categories</span>}
            {!loading && categories.length === 0 && <span style={{ color: "#d1d5db" }}>No categories available</span>}
          </span>
          <ChevronDown
            size={14}
            style={{
              transform: isOpen && categories.length > 0 ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              flexShrink: 0,
              color: "#9ca3af",
            }}
          />
        </button>

        {/* Dropdown options */}
        {isOpen && categories.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              marginTop: "2px",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1000,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* "All Categories" option */}
            <button
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "none",
                background: !value ? "#f0f9ff" : "transparent",
                color: !value ? "#0284c7" : "#4b5563",
                textAlign: "left",
                fontSize: "12px",
                cursor: "pointer",
                transition: "background-color 0.1s",
                fontWeight: !value ? 600 : 400,
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#f3f4f6";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = !value
                  ? "#f0f9ff"
                  : "transparent";
              }}
            >
              All Categories
            </button>

            {/* Category options */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onChange(cat.name);
                  setIsOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "none",
                  background: value === cat.name ? "#fef9c3" : "transparent",
                  color: value === cat.name ? "#1f2937" : "#4b5563",
                  textAlign: "left",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "background-color 0.1s",
                  fontWeight: value === cat.name ? 600 : 400,
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#f3f4f6";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = value === cat.name
                    ? "#fef9c3"
                    : "transparent";
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface FAQEditorItem {
  question: string;
  answer: string;
}

interface SocialPlatformEditorItem {
  name: string;
  url: string;
  icon: string;
}

interface GalleryEditorImageItem {
  src: string;
  alt: string;
}

interface BentoEditorButton {
  id: number | string;
  label: string;
  url: string;
  openInNewTab: boolean;
}

interface BentoEditorItem {
  id: number | string;
  title: string;
  image: string;
  description: string;
  linkUrl: string;
  openInNewTab: boolean;
  buttons: BentoEditorButton[];
}

interface TCardEditorItem {
  image: string;
  title: string;
  description: string;
}

interface TeamMemberEditorItem {
  name: string;
  role: string;
  image: string;
}

interface TimelineEditorItem {
  title: string;
  date: string;
  description: string;
}

interface DocumentEditorItem {
  title: string;
  type: string;
  url: string;
  size: string;
}

interface MeetingEditorItem {
  title: string;
  date: string;
  time: string;
  datetime: string;
  location: string;
  description: string;
}

function createDefaultFaqItem(): FAQEditorItem {
  return {
    question: "",
    answer: "",
  };
}

function createDefaultSocialPlatformItem(): SocialPlatformEditorItem {
  return {
    name: "",
    url: "",
    icon: "facebook",
  };
}

function createDefaultGalleryImageItem(index = 0): GalleryEditorImageItem {
  return {
    src: "",
    alt: `Image ${index + 1}`,
  };
}

function createDefaultBentoItem(index = 0): BentoEditorItem {
  return {
    id: `bento-${Date.now()}-${index}`,
    title: `Bento Item ${index + 1}`,
    image: "",
    description: "",
    linkUrl: "",
    openInNewTab: true,
    buttons: [],
  };
}

function createDefaultBentoButton(index = 0): BentoEditorButton {
  return {
    id: `bento-button-${Date.now()}-${index}`,
    label: `Button ${index + 1}`,
    url: "",
    openInNewTab: true,
  };
}

function createDefaultTCardItem(index = 0): TCardEditorItem {
  return {
    image: "",
    title: `Card ${index + 1}`,
    description: "",
  };
}

function createDefaultTeamMemberItem(index = 0): TeamMemberEditorItem {
  return {
    name: `Member ${index + 1}`,
    role: "",
    image: "",
  };
}

function createDefaultTimelineItem(index = 0): TimelineEditorItem {
  return {
    title: `Milestone ${index + 1}`,
    date: "",
    description: "",
  };
}

function createDefaultDocumentItem(index = 0): DocumentEditorItem {
  return {
    title: `Document ${index + 1}`,
    type: "pdf",
    url: "",
    size: "",
  };
}

function createDefaultMeetingItem(index = 0): MeetingEditorItem {
  return {
    title: `Meeting ${index + 1}`,
    date: "",
    time: "",
    datetime: "",
    location: "",
    description: "",
  };
}

function normalizeTimeForInput(rawTime: string): string {
  const timeValue = rawTime.trim();
  if (!timeValue) return "";

  if (/^\d{2}:\d{2}$/.test(timeValue)) {
    return timeValue;
  }

  const twelveHourMatch = timeValue.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
  if (!twelveHourMatch) return "";

  let hours = Number(twelveHourMatch[1]);
  const minutes = twelveHourMatch[2];
  const period = twelveHourMatch[3].toUpperCase();

  if (period === "AM") {
    if (hours === 12) hours = 0;
  } else if (hours < 12) {
    hours += 12;
  }

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

function extractDateFromDateTime(rawDateTime: string): string {
  const value = rawDateTime.trim();
  if (!value) return "";

  const isoDateMatch = value.match(/^(\d{4}-\d{2}-\d{2})/);
  if (isoDateMatch) {
    return isoDateMatch[1];
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function extractTimeFromDateTime(rawDateTime: string): string {
  const value = rawDateTime.trim();
  if (!value) return "";

  const isoTimeMatch = value.match(/T(\d{2}:\d{2})/);
  if (isoTimeMatch) {
    return isoTimeMatch[1];
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  const hours = String(parsed.getHours()).padStart(2, "0");
  const minutes = String(parsed.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function buildDateTimeFromParts(date: string, time: string): string {
  const safeDate = date.trim();
  if (!safeDate) return "";
  const safeTime = normalizeTimeForInput(time);
  return `${safeDate}T${safeTime || "00:00"}`;
}

function sanitizeFaqItemsValue(value: unknown): FAQEditorItem[] {
  const normalize = (items: any[]): FAQEditorItem[] =>
    items.map((item) => ({
      question: typeof item?.question === "string"
        ? item.question
        : (typeof item?.faq_question === "string" ? item.faq_question : ""),
      answer: typeof item?.answer === "string"
        ? item.answer
        : (typeof item?.faq_answer === "string" ? item.faq_answer : ""),
    }));

  if (Array.isArray(value)) {
    return normalize(value);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalize(parsed);
      }
    } catch {
      return [];
    }
  }

  return [];
}

function sanitizeSocialPlatformsValue(value: unknown): SocialPlatformEditorItem[] {
  const normalize = (items: any[]): SocialPlatformEditorItem[] =>
    items.map((item) => ({
      name: typeof item?.name === "string" ? item.name : "",
      url: typeof item?.url === "string" ? item.url : "",
      icon: typeof item?.icon === "string" && item.icon.trim() ? item.icon : "facebook",
    }));

  if (Array.isArray(value)) {
    return normalize(value);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalize(parsed);
      }
    } catch {
      return [];
    }
  }

  return [];
}

function sanitizeGalleryImagesValue(value: unknown): GalleryEditorImageItem[] {
  const normalize = (items: any[]): GalleryEditorImageItem[] =>
    items.map((item, index) => ({
      src: typeof item?.src === "string" ? item.src : "",
      alt: typeof item?.alt === "string" && item.alt.trim()
        ? item.alt
        : (typeof item?.caption === "string" && item.caption.trim() ? item.caption : `Image ${index + 1}`),
    }));

  if (Array.isArray(value)) {
    return normalize(value);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalize(parsed);
      }
    } catch {
      return [];
    }
  }

  return [];
}

function sanitizeBentoItemsValue(value: unknown): BentoEditorItem[] {
  const normalize = (items: any[]): BentoEditorItem[] =>
    items.map((item, index) => ({
      id: item?.id ?? `bento-${index}`,
      title: typeof item?.title === "string" && item.title.trim()
        ? item.title
        : `Bento Item ${index + 1}`,
      image: typeof item?.image === "string"
        ? item.image
        : (typeof item?.imgUrl === "string" ? item.imgUrl : ""),
      description: typeof item?.description === "string" ? item.description : "",
      linkUrl: typeof item?.linkUrl === "string"
        ? item.linkUrl
        : (typeof item?.buttonUrl === "string" ? item.buttonUrl : ""),
      openInNewTab: item?.openInNewTab !== false,
      buttons: Array.isArray(item?.buttons)
        ? item.buttons.map((button: any, buttonIndex: number) => ({
          id: button?.id ?? `bento-button-${index}-${buttonIndex}`,
          label: typeof button?.label === "string" && button.label.trim()
            ? button.label
            : `Button ${buttonIndex + 1}`,
          url: typeof button?.url === "string" ? button.url : "",
          openInNewTab: button?.openInNewTab !== false,
        }))
        : [],
    }));

  if (Array.isArray(value)) {
    return normalize(value);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalize(parsed);
      }
    } catch {
      return [];
    }
  }

  return [];
}

function sanitizeTCardItemsValue(value: unknown): TCardEditorItem[] {
  const normalize = (items: any[]): TCardEditorItem[] =>
    items.map((item, index) => ({
      image: typeof item?.image === "string"
        ? item.image
        : (typeof item?.image_url === "string" ? item.image_url : ""),
      title: typeof item?.title === "string" && item.title.trim()
        ? item.title
        : `Card ${index + 1}`,
      description: typeof item?.description === "string" ? item.description : "",
    }));

  if (Array.isArray(value)) {
    return normalize(value);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalize(parsed);
      }
    } catch {
      return [];
    }
  }

  return [];
}

function sanitizeTeamMembersValue(value: unknown): TeamMemberEditorItem[] {
  const normalize = (items: any[]): TeamMemberEditorItem[] =>
    items.map((item, index) => ({
      name: typeof item?.name === "string" && item.name.trim()
        ? item.name
        : `Member ${index + 1}`,
      role: typeof item?.role === "string" ? item.role : "",
      image: typeof item?.image === "string"
        ? item.image
        : (typeof item?.avatar === "string" ? item.avatar : ""),
    }));

  if (Array.isArray(value)) {
    return normalize(value);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalize(parsed);
      }
    } catch {
      return [];
    }
  }

  return [];
}

function sanitizeTimelineItemsValue(value: unknown): TimelineEditorItem[] {
  const normalize = (items: any[]): TimelineEditorItem[] =>
    items.map((item, index) => ({
      title: typeof item?.title === "string" && item.title.trim()
        ? item.title
        : `Milestone ${index + 1}`,
      date: typeof item?.date === "string" ? item.date : "",
      description: typeof item?.description === "string" ? item.description : "",
    }));

  if (Array.isArray(value)) {
    return normalize(value);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalize(parsed);
      }
    } catch {
      return [];
    }
  }

  return [];
}

function sanitizeDocumentsValue(value: unknown): DocumentEditorItem[] {
  const normalize = (items: any[]): DocumentEditorItem[] =>
    items.map((item, index) => ({
      title: typeof item?.title === "string" && item.title.trim()
        ? item.title
        : `Document ${index + 1}`,
      type: typeof item?.type === "string" && item.type.trim()
        ? item.type
        : (typeof item?.fileType === "string" && item.fileType.trim() ? item.fileType : "pdf"),
      url: typeof item?.url === "string"
        ? item.url
        : (typeof item?.document_url === "string" ? item.document_url : ""),
      size: typeof item?.size === "string"
        ? item.size
        : (typeof item?.fileSize === "string" ? item.fileSize : ""),
    }));

  if (Array.isArray(value)) {
    return normalize(value);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalize(parsed);
      }
    } catch {
      return [];
    }
  }

  return [];
}

function sanitizeMeetingsValue(value: unknown): MeetingEditorItem[] {
  const normalize = (items: any[]): MeetingEditorItem[] =>
    items.map((item, index) => {
      const datetimeRaw = typeof item?.datetime === "string" ? item.datetime : "";
      const dateFromDatetime = extractDateFromDateTime(datetimeRaw);
      const timeFromDatetime = extractTimeFromDateTime(datetimeRaw);

      const date = typeof item?.date === "string" && item.date.trim()
        ? item.date
        : dateFromDatetime;
      const normalizedTime = typeof item?.time === "string" && item.time.trim()
        ? normalizeTimeForInput(item.time)
        : normalizeTimeForInput(timeFromDatetime);
      const datetime = datetimeRaw.trim() || buildDateTimeFromParts(date, normalizedTime);

      return {
        title: typeof item?.title === "string" && item.title.trim()
          ? item.title
          : `Meeting ${index + 1}`,
        date,
        time: normalizedTime,
        datetime,
        location: typeof item?.location === "string" ? item.location : "",
        description: typeof item?.description === "string" ? item.description : "",
      };
    });

  if (Array.isArray(value)) {
    return normalize(value);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalize(parsed);
      }
    } catch {
      return [];
    }
  }

  return [];
}

function FAQItemsEditorControl({
  value,
  onChange,
  label,
}: {
  value: unknown;
  onChange: (nextValue: string) => void;
  label: string;
}) {
  const parsedItems = sanitizeFaqItemsValue(value);
  const items = parsedItems.length > 0 ? parsedItems : [createDefaultFaqItem()];

  const updateItems = useCallback((nextItems: FAQEditorItem[]) => {
    onChange(JSON.stringify(nextItems));
  }, [onChange]);

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      {items.map((item, index) => (
        <div
          key={`faq-item-${index}`}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#4b5563" }}>
              FAQ {index + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                const nextItems = items.filter((_, i) => i !== index);
                updateItems(nextItems.length > 0 ? nextItems : [createDefaultFaqItem()]);
              }}
              style={{
                border: "none",
                borderRadius: "4px",
                background: "transparent",
                color: "#ef4444",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
              }}
              title="Remove FAQ"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Question</label>
            <input
              type="text"
              value={item.question}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], question: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="Enter question"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>

          <div>
            <label style={fieldLabelStyle}>Answer</label>
            <textarea
              value={item.answer}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], answer: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="Enter answer"
              rows={3}
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "72px",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => updateItems([...items, createDefaultFaqItem()])}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12px",
          fontWeight: 600,
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#fff",
          color: "#4b5563",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <Plus size={14} />
        Add FAQ
      </button>
    </div>
  );
}

function SocialPlatformsEditorControl({
  value,
  onChange,
  label,
}: {
  value: unknown;
  onChange: (nextValue: string) => void;
  label: string;
}) {
  const parsedPlatforms = sanitizeSocialPlatformsValue(value);
  const platforms = parsedPlatforms.length > 0
    ? parsedPlatforms
    : [createDefaultSocialPlatformItem()];

  const updatePlatforms = useCallback((nextPlatforms: SocialPlatformEditorItem[]) => {
    onChange(JSON.stringify(nextPlatforms));
  }, [onChange]);

  const iconOptions = [
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "youtube",
    "tiktok",
    "pinterest",
    "reddit",
    "whatsapp",
    "telegram",
    "discord",
    "github",
  ];

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      {platforms.map((platform, index) => (
        <div
          key={`social-platform-${index}`}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#4b5563" }}>
              Platform {index + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                const nextPlatforms = platforms.filter((_, i) => i !== index);
                updatePlatforms(nextPlatforms.length > 0 ? nextPlatforms : [createDefaultSocialPlatformItem()]);
              }}
              style={{
                border: "none",
                borderRadius: "4px",
                background: "transparent",
                color: "#ef4444",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
              }}
              title="Remove platform"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Platform Name</label>
            <input
              type="text"
              value={platform.name}
              onChange={(e) => {
                const nextPlatforms = [...platforms];
                nextPlatforms[index] = { ...nextPlatforms[index], name: e.target.value };
                updatePlatforms(nextPlatforms);
              }}
              placeholder="e.g. Facebook"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>URL</label>
            <input
              type="text"
              value={platform.url}
              onChange={(e) => {
                const nextPlatforms = [...platforms];
                nextPlatforms[index] = { ...nextPlatforms[index], url: e.target.value };
                updatePlatforms(nextPlatforms);
              }}
              placeholder="https://..."
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>

          <div>
            <label style={fieldLabelStyle}>Icon</label>
            <select
              value={platform.icon}
              onChange={(e) => {
                const nextPlatforms = [...platforms];
                nextPlatforms[index] = { ...nextPlatforms[index], icon: e.target.value };
                updatePlatforms(nextPlatforms);
              }}
              style={{ ...inputStyle, cursor: "pointer", paddingRight: "24px" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => updatePlatforms([...platforms, createDefaultSocialPlatformItem()])}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12px",
          fontWeight: 600,
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#fff",
          color: "#4b5563",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <Plus size={14} />
        Add Platform
      </button>
    </div>
  );
}

function GalleryImagesEditorControl({
  value,
  onChange,
  label,
}: {
  value: unknown;
  onChange: (nextValue: string) => void;
  label: string;
}) {
  const parsedImages = sanitizeGalleryImagesValue(value);
  const images = parsedImages.length > 0
    ? parsedImages
    : [createDefaultGalleryImageItem(0)];
  const fileRefs = useRef<Array<HTMLInputElement | null>>([]);

  const updateImages = useCallback((nextImages: GalleryEditorImageItem[]) => {
    onChange(JSON.stringify(nextImages));
  }, [onChange]);

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      {images.map((image, index) => (
        <div
          key={`gallery-image-${index}`}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#4b5563" }}>
              Image {index + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                const nextImages = images.filter((_, i) => i !== index);
                updateImages(nextImages.length > 0 ? nextImages : [createDefaultGalleryImageItem(0)]);
              }}
              style={{
                border: "none",
                borderRadius: "4px",
                background: "transparent",
                color: "#ef4444",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
              }}
              title="Remove image item"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {image.src && (
            <div style={{ marginBottom: "8px", position: "relative" }}>
              <img
                src={image.src}
                alt={image.alt || `Image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                  display: "block",
                }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => fileRefs.current[index]?.click()}
            style={{
              width: "100%",
              padding: "7px 10px",
              fontSize: "12px",
              fontWeight: 500,
              border: "1px dashed #d1d5db",
              borderRadius: "6px",
              backgroundColor: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: "#4b5563",
              marginBottom: "8px",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#f59e0b";
              (e.currentTarget as HTMLElement).style.backgroundColor = "#fffbeb";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db";
              (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
            }}
          >
            <Upload size={13} />
            Upload image
          </button>
          <input
            ref={(el) => { fileRefs.current[index] = el; }}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const localUrl = URL.createObjectURL(file);
              const withLocal = [...images];
              withLocal[index] = { ...withLocal[index], src: localUrl };
              updateImages(withLocal);

              const serverUrl = await uploadFileToApi(file, "block");
              if (serverUrl) {
                const withServer = [...withLocal];
                withServer[index] = { ...withServer[index], src: serverUrl };
                updateImages(withServer);
                URL.revokeObjectURL(localUrl);
              }
            }}
          />

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Image URL</label>
            <input
              type="text"
              value={image.src}
              onChange={(e) => {
                const nextImages = [...images];
                nextImages[index] = { ...nextImages[index], src: e.target.value };
                updateImages(nextImages);
              }}
              placeholder="https://..."
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>

          <div>
            <label style={fieldLabelStyle}>Alt Text / Caption</label>
            <input
              type="text"
              value={image.alt}
              onChange={(e) => {
                const nextImages = [...images];
                nextImages[index] = { ...nextImages[index], alt: e.target.value };
                updateImages(nextImages);
              }}
              placeholder="Describe the image"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => updateImages([...images, createDefaultGalleryImageItem(images.length)])}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12px",
          fontWeight: 600,
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#fff",
          color: "#4b5563",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <Plus size={14} />
        Add Image
      </button>
    </div>
  );
}

function BentoItemsEditorControl({
  value,
  onChange,
  label,
  activeIndex,
  onActiveIndexChange,
  slotCount,
}: {
  value: unknown;
  onChange: (nextValue: BentoEditorItem[]) => void;
  label: string;
  activeIndex: number;
  onActiveIndexChange: (nextIndex: number) => void;
  slotCount: number;
}) {
  const parsedItems = sanitizeBentoItemsValue(value);
  const normalizedSlotCount = Math.max(slotCount || 1, parsedItems.length, 1);
  const items = Array.from({ length: normalizedSlotCount }, (_, index) => (
    parsedItems[index] || createDefaultBentoItem(index)
  ));
  const selectedIndex = Math.min(Math.max(Number(activeIndex) || 0, 0), items.length - 1);
  const [pendingUploadIndex, setPendingUploadIndex] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeIndex !== selectedIndex) {
      onActiveIndexChange(selectedIndex);
    }
  }, [activeIndex, selectedIndex, onActiveIndexChange]);

  const updateItems = useCallback((nextItems: BentoEditorItem[]) => {
    onChange(nextItems);
  }, [onChange]);

  const activeItem = items[selectedIndex];

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  const updateItemField = (
    index: number,
    field: keyof BentoEditorItem,
    fieldValue: string | boolean | BentoEditorButton[]
  ) => {
    updateItems(items.map((item, itemIndex) => (
      itemIndex === index ? { ...item, [field]: fieldValue } : item
    )));
  };

  const addButton = (index: number) => {
    const currentButtons = items[index]?.buttons || [];
    updateItemField(index, "buttons", [...currentButtons, createDefaultBentoButton(currentButtons.length)]);
  };

  const updateButtonField = (
    itemIndex: number,
    buttonIndex: number,
    field: keyof BentoEditorButton,
    fieldValue: string | boolean
  ) => {
    const currentButtons = items[itemIndex]?.buttons || [];
    const nextButtons = currentButtons.map((button, index) => (
      index === buttonIndex ? { ...button, [field]: fieldValue } : button
    ));
    updateItemField(itemIndex, "buttons", nextButtons);
  };

  const removeButton = (itemIndex: number, buttonIndex: number) => {
    const currentButtons = items[itemIndex]?.buttons || [];
    updateItemField(itemIndex, "buttons", currentButtons.filter((_, index) => index !== buttonIndex));
  };

  const addItem = () => {
    const nextItem = createDefaultBentoItem(items.length);
    updateItems([...items, nextItem]);
    onActiveIndexChange(items.length);
  };

  const removeItem = (index: number) => {
    const nextItems = items.map((item, itemIndex) => (
      itemIndex === index ? createDefaultBentoItem(index) : item
    ));
    updateItems(nextItems);
    onActiveIndexChange(index);
  };

  const handlePickImage = (index: number) => {
    setPendingUploadIndex(index);
    fileRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetIndex = pendingUploadIndex;
    if (!file || targetIndex === null) return;

    const localUrl = URL.createObjectURL(file);
    updateItemField(targetIndex, "image", localUrl);

    const serverUrl = await uploadFileToApi(file, "block");
    if (serverUrl) {
      updateItemField(targetIndex, "image", serverUrl);
      URL.revokeObjectURL(localUrl);
    }

    setPendingUploadIndex(null);
    e.target.value = "";
  };

  return (
    <div style={{ marginBottom: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <label style={labelStyle}>{label}</label>
        <button
          type="button"
          onClick={addItem}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            background: "#fff",
            padding: "4px 8px",
            fontSize: "11px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Plus size={12} />
          Add More
        </button>
      </div>

      <div
        style={{
          fontSize: "11px",
          color: "#6b7280",
          backgroundColor: "#f9fafb",
          border: "1px solid #f3f4f6",
          borderRadius: "6px",
          padding: "7px 8px",
          marginBottom: "8px",
          lineHeight: 1.4,
        }}
      >
        Click any bento box on canvas, then edit its image, title, description and redirect URL here.
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
        {items.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            type="button"
            onClick={() => onActiveIndexChange(index)}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "11px",
              background: index === selectedIndex ? "#fef3c7" : "#fff",
              cursor: "pointer",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Box {index + 1}
          </button>
        ))}
      </div>

      {activeItem && (
        <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563" }}>
              Box {selectedIndex + 1}
            </span>
            <button
              type="button"
              onClick={() => removeItem(selectedIndex)}
              style={{
                border: "1px solid #fee2e2",
                color: "#ef4444",
                background: "#fff",
                borderRadius: "6px",
                padding: "5px",
                cursor: "pointer",
                display: "inline-flex",
              }}
              title="Clear box details"
            >
              <Trash2 size={13} />
            </button>
          </div>

          {activeItem.image && (
            <div style={{ marginBottom: "8px", position: "relative" }}>
              <img
                src={activeItem.image}
                alt={activeItem.title || `Box ${selectedIndex + 1}`}
                style={{
                  width: "100%",
                  height: "96px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                  display: "block",
                }}
              />
              <button
                type="button"
                onClick={() => updateItemField(selectedIndex, "image", "")}
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "rgba(0,0,0,0.55)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
                title="Remove image"
              >
                <X size={12} />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => handlePickImage(selectedIndex)}
            style={{
              width: "100%",
              border: "1px dashed #d1d5db",
              borderRadius: "6px",
              padding: "7px 10px",
              fontSize: "12px",
              background: "#fafafa",
              color: "#6b7280",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              marginBottom: "8px",
            }}
          >
            <ImagePlus size={13} />
            Upload Box Image
          </button>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Image URL</label>
            <input
              type="text"
              value={activeItem.image}
              onChange={(e) => updateItemField(selectedIndex, "image", e.target.value)}
              placeholder="https://..."
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Title</label>
            <input
              type="text"
              value={activeItem.title}
              onChange={(e) => updateItemField(selectedIndex, "title", e.target.value)}
              placeholder="Box title"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Description</label>
            <textarea
              value={activeItem.description}
              onChange={(e) => updateItemField(selectedIndex, "description", e.target.value)}
              placeholder="Optional short text"
              rows={2}
              style={{ ...inputStyle, resize: "vertical", minHeight: "56px" }}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Redirect Link URL</label>
            <input
              type="text"
              value={activeItem.linkUrl}
              onChange={(e) => updateItemField(selectedIndex, "linkUrl", e.target.value)}
              placeholder="https://..."
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ ...fieldLabelStyle, marginBottom: 0 }}>Open Link In New Tab</label>
            <ToggleSwitch
              checked={activeItem.openInNewTab}
              onChange={(checked) => updateItemField(selectedIndex, "openInNewTab", checked)}
            />
          </div>

          <div
            style={{
              marginTop: "12px",
              borderTop: "1px solid #f3f4f6",
              paddingTop: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <label style={{ ...fieldLabelStyle, marginBottom: 0 }}>Box Buttons</label>
              <button
                type="button"
                onClick={() => addButton(selectedIndex)}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  background: "#fff",
                  padding: "4px 8px",
                  fontSize: "11px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Plus size={12} />
                Add Button
              </button>
            </div>

            {activeItem.buttons.length === 0 && (
              <div
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  backgroundColor: "#f9fafb",
                  border: "1px dashed #e5e7eb",
                  borderRadius: "6px",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              >
                Add one or more buttons for this box. The redirect link above still controls the full box click.
              </div>
            )}

            {activeItem.buttons.map((button, buttonIndex) => (
              <div
                key={`${button.id}-${buttonIndex}`}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "8px",
                  marginBottom: "8px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#4b5563" }}>
                    Button {buttonIndex + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeButton(selectedIndex, buttonIndex)}
                    style={{
                      border: "1px solid #fee2e2",
                      color: "#ef4444",
                      background: "#fff",
                      borderRadius: "6px",
                      padding: "4px",
                      cursor: "pointer",
                      display: "inline-flex",
                    }}
                    title="Remove button"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                <div style={{ marginBottom: "8px" }}>
                  <label style={fieldLabelStyle}>Button Title</label>
                  <input
                    type="text"
                    value={button.label}
                    onChange={(e) => updateButtonField(selectedIndex, buttonIndex, "label", e.target.value)}
                    placeholder="Button text"
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginBottom: "8px" }}>
                  <label style={fieldLabelStyle}>Button URL</label>
                  <input
                    type="text"
                    value={button.url}
                    onChange={(e) => updateButtonField(selectedIndex, buttonIndex, "url", e.target.value)}
                    placeholder="https://..."
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <label style={{ ...fieldLabelStyle, marginBottom: 0 }}>Open In New Tab</label>
                  <ToggleSwitch
                    checked={button.openInNewTab}
                    onChange={(checked) => updateButtonField(selectedIndex, buttonIndex, "openInNewTab", checked)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
}

function TCardItemsEditorControl({
  value,
  onChange,
  label,
}: {
  value: unknown;
  onChange: (nextValue: string) => void;
  label: string;
}) {
  const parsedItems = sanitizeTCardItemsValue(value);
  const items = parsedItems.length > 0 ? parsedItems : [createDefaultTCardItem(0)];
  const fileRefs = useRef<Array<HTMLInputElement | null>>([]);

  const updateItems = useCallback((nextItems: TCardEditorItem[]) => {
    onChange(JSON.stringify(nextItems));
  }, [onChange]);

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      {items.map((item, index) => (
        <div
          key={`tcard-item-${index}`}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#4b5563" }}>
              Card {index + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                const nextItems = items.filter((_, i) => i !== index);
                updateItems(nextItems.length > 0 ? nextItems : [createDefaultTCardItem(0)]);
              }}
              style={{
                border: "none",
                borderRadius: "4px",
                background: "transparent",
                color: "#ef4444",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
              }}
              title="Remove card"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {item.image && (
            <div style={{ marginBottom: "8px", position: "relative" }}>
              <img
                src={item.image}
                alt={item.title || `Card ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                  display: "block",
                }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => fileRefs.current[index]?.click()}
            style={{
              width: "100%",
              padding: "7px 10px",
              fontSize: "12px",
              fontWeight: 500,
              border: "1px dashed #d1d5db",
              borderRadius: "6px",
              backgroundColor: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: "#4b5563",
              marginBottom: "8px",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#f59e0b";
              (e.currentTarget as HTMLElement).style.backgroundColor = "#fffbeb";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db";
              (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
            }}
          >
            <Upload size={13} />
            Upload image
          </button>
          <input
            ref={(el) => { fileRefs.current[index] = el; }}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const localUrl = URL.createObjectURL(file);
              const withLocal = [...items];
              withLocal[index] = { ...withLocal[index], image: localUrl };
              updateItems(withLocal);

              const serverUrl = await uploadFileToApi(file, "block");
              if (serverUrl) {
                const withServer = [...withLocal];
                withServer[index] = { ...withServer[index], image: serverUrl };
                updateItems(withServer);
                URL.revokeObjectURL(localUrl);
              }
            }}
          />

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Image URL</label>
            <input
              type="text"
              value={item.image}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], image: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="https://..."
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Title</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], title: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="Card title"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>

          <div>
            <label style={fieldLabelStyle}>Description</label>
            <textarea
              value={item.description}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], description: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="Card description"
              rows={3}
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "72px",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => updateItems([...items, createDefaultTCardItem(items.length)])}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12px",
          fontWeight: 600,
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#fff",
          color: "#4b5563",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <Plus size={14} />
        Add Card
      </button>
    </div>
  );
}

function TeamMembersEditorControl({
  value,
  onChange,
  label,
}: {
  value: unknown;
  onChange: (nextValue: string) => void;
  label: string;
}) {
  const parsedMembers = sanitizeTeamMembersValue(value);
  const members = parsedMembers.length > 0 ? parsedMembers : [createDefaultTeamMemberItem(0)];
  const fileRefs = useRef<Array<HTMLInputElement | null>>([]);

  const updateMembers = useCallback((nextMembers: TeamMemberEditorItem[]) => {
    onChange(JSON.stringify(nextMembers));
  }, [onChange]);

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      {members.map((member, index) => (
        <div
          key={`team-member-${index}`}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#4b5563" }}>
              Member {index + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                const nextMembers = members.filter((_, i) => i !== index);
                updateMembers(nextMembers.length > 0 ? nextMembers : [createDefaultTeamMemberItem(0)]);
              }}
              style={{
                border: "none",
                borderRadius: "4px",
                background: "transparent",
                color: "#ef4444",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
              }}
              title="Remove member"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {member.image && (
            <div style={{ marginBottom: "8px" }}>
              <img
                src={member.image}
                alt={member.name || `Member ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                  display: "block",
                }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => fileRefs.current[index]?.click()}
            style={{
              width: "100%",
              padding: "7px 10px",
              fontSize: "12px",
              fontWeight: 500,
              border: "1px dashed #d1d5db",
              borderRadius: "6px",
              backgroundColor: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: "#4b5563",
              marginBottom: "8px",
            }}
          >
            <Upload size={13} />
            Upload photo
          </button>
          <input
            ref={(el) => { fileRefs.current[index] = el; }}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const localUrl = URL.createObjectURL(file);
              const withLocal = [...members];
              withLocal[index] = { ...withLocal[index], image: localUrl };
              updateMembers(withLocal);

              const serverUrl = await uploadFileToApi(file, "block");
              if (serverUrl) {
                const withServer = [...withLocal];
                withServer[index] = { ...withServer[index], image: serverUrl };
                updateMembers(withServer);
                URL.revokeObjectURL(localUrl);
              }
            }}
          />

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Image URL</label>
            <input
              type="text"
              value={member.image}
              onChange={(e) => {
                const nextMembers = [...members];
                nextMembers[index] = { ...nextMembers[index], image: e.target.value };
                updateMembers(nextMembers);
              }}
              placeholder="https://..."
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Name</label>
            <input
              type="text"
              value={member.name}
              onChange={(e) => {
                const nextMembers = [...members];
                nextMembers[index] = { ...nextMembers[index], name: e.target.value };
                updateMembers(nextMembers);
              }}
              placeholder="Member name"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={fieldLabelStyle}>Role</label>
            <input
              type="text"
              value={member.role}
              onChange={(e) => {
                const nextMembers = [...members];
                nextMembers[index] = { ...nextMembers[index], role: e.target.value };
                updateMembers(nextMembers);
              }}
              placeholder="Member role"
              style={inputStyle}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => updateMembers([...members, createDefaultTeamMemberItem(members.length)])}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12px",
          fontWeight: 600,
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#fff",
          color: "#4b5563",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <Plus size={14} />
        Add Member
      </button>
    </div>
  );
}

function TimelineItemsEditorControl({
  value,
  onChange,
  label,
}: {
  value: unknown;
  onChange: (nextValue: string) => void;
  label: string;
}) {
  const parsedItems = sanitizeTimelineItemsValue(value);
  const items = parsedItems.length > 0 ? parsedItems : [createDefaultTimelineItem(0)];

  const updateItems = useCallback((nextItems: TimelineEditorItem[]) => {
    onChange(JSON.stringify(nextItems));
  }, [onChange]);

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      {items.map((item, index) => (
        <div
          key={`timeline-item-${index}`}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#4b5563" }}>
              Item {index + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                const nextItems = items.filter((_, i) => i !== index);
                updateItems(nextItems.length > 0 ? nextItems : [createDefaultTimelineItem(0)]);
              }}
              style={{
                border: "none",
                borderRadius: "4px",
                background: "transparent",
                color: "#ef4444",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
              }}
              title="Remove timeline item"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Title</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], title: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="Event title"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Date</label>
            <input
              type="text"
              value={item.date}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], date: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="2026 or Jan 2026"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={fieldLabelStyle}>Description</label>
            <textarea
              value={item.description}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], description: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="Describe this milestone"
              rows={3}
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "72px",
              }}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => updateItems([...items, createDefaultTimelineItem(items.length)])}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12px",
          fontWeight: 600,
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#fff",
          color: "#4b5563",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <Plus size={14} />
        Add Timeline Item
      </button>
    </div>
  );
}

function DocumentsItemsEditorControl({
  value,
  onChange,
  label,
}: {
  value: unknown;
  onChange: (nextValue: string) => void;
  label: string;
}) {
  const parsedItems = sanitizeDocumentsValue(value);
  const items = parsedItems.length > 0 ? parsedItems : [createDefaultDocumentItem(0)];
  const fileRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const updateItems = useCallback((nextItems: DocumentEditorItem[]) => {
    const normalized = nextItems.map((item) => ({
      title: item.title,
      type: item.type,
      fileType: item.type,
      url: item.url,
      size: item.size,
      fileSize: item.size,
    }));
    onChange(JSON.stringify(normalized));
  }, [onChange]);

  const getFileExtension = (fileName: string): string => {
    const parts = fileName.split(".");
    if (parts.length < 2) return "file";
    const ext = parts.pop()?.trim().toLowerCase();
    return ext || "file";
  };

  const formatFileSize = (bytes: number): string => {
    if (!Number.isFinite(bytes) || bytes <= 0) return "";
    const units = ["B", "KB", "MB", "GB", "TB"];
    let value = bytes;
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }

    const precision = value >= 100 || unitIndex === 0 ? 0 : 1;
    return `${value.toFixed(precision)} ${units[unitIndex]}`;
  };

  const uploadDocument = useCallback(async (file: File, index: number) => {
    setUploadingIndex(index);

    const detectedType = getFileExtension(file.name);
    const detectedSize = formatFileSize(file.size);

    const withDetectedMeta = [...items];
    withDetectedMeta[index] = {
      ...withDetectedMeta[index],
      type: detectedType,
      size: detectedSize,
    };
    updateItems(withDetectedMeta);

    const uploadedUrl =
      (await uploadFileToApi(file, "documents")) ||
      (await uploadFileToApi(file, "block"));

    if (uploadedUrl) {
      const withUploadedUrl = [...withDetectedMeta];
      withUploadedUrl[index] = {
        ...withUploadedUrl[index],
        url: uploadedUrl,
      };
      updateItems(withUploadedUrl);
    }

    setUploadingIndex(null);
  }, [items, updateItems]);

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      {items.map((item, index) => (
        <div
          key={`document-item-${index}`}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#4b5563" }}>
              Document {index + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                const nextItems = items.filter((_, i) => i !== index);
                updateItems(nextItems.length > 0 ? nextItems : [createDefaultDocumentItem(0)]);
              }}
              style={{
                border: "none",
                borderRadius: "4px",
                background: "transparent",
                color: "#ef4444",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
              }}
              title="Remove document"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Title</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], title: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="Document title"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>File URL</label>
            <input
              type="text"
              value={item.url}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], url: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="https://..."
              style={inputStyle}
            />
          </div>

          <button
            type="button"
            onClick={() => fileRefs.current[index]?.click()}
            disabled={uploadingIndex === index}
            style={{
              width: "100%",
              padding: "7px 10px",
              fontSize: "12px",
              fontWeight: 500,
              border: "1px dashed #d1d5db",
              borderRadius: "6px",
              backgroundColor: "#fff",
              cursor: uploadingIndex === index ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: uploadingIndex === index ? "#9ca3af" : "#4b5563",
              marginBottom: "8px",
              opacity: uploadingIndex === index ? 0.8 : 1,
            }}
          >
            <Upload size={13} />
            {uploadingIndex === index ? "Uploading..." : "Upload File (All Extensions)"}
          </button>
          <input
            ref={(el) => { fileRefs.current[index] = el; }}
            type="file"
            accept="*/*"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              await uploadDocument(file, index);
              e.currentTarget.value = "";
            }}
          />

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Type</label>
            <input
              type="text"
              value={item.type}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], type: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="pdf, docx, xlsx"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={fieldLabelStyle}>File Size (Auto)</label>
            <input
              type="text"
              value={item.size}
              readOnly
              disabled
              placeholder="Auto from uploaded file"
              style={{
                ...inputStyle,
                backgroundColor: "#f3f4f6",
                color: "#6b7280",
                cursor: "not-allowed",
              }}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => updateItems([...items, createDefaultDocumentItem(items.length)])}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12px",
          fontWeight: 600,
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#fff",
          color: "#4b5563",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <Plus size={14} />
        Add Document
      </button>
    </div>
  );
}

function MeetingsItemsEditorControl({
  value,
  onChange,
  label,
}: {
  value: unknown;
  onChange: (nextValue: string) => void;
  label: string;
}) {
  const parsedItems = sanitizeMeetingsValue(value);
  const items = parsedItems.length > 0 ? parsedItems : [createDefaultMeetingItem(0)];

  const normalizeMeetingForSave = useCallback((item: MeetingEditorItem) => {
    const normalizedTime = normalizeTimeForInput(item.time);
    const datetime = buildDateTimeFromParts(item.date, normalizedTime);

    return {
      title: item.title,
      date: item.date,
      time: normalizedTime,
      datetime,
      location: item.location,
      description: item.description,
    };
  }, []);

  const updateItems = useCallback((nextItems: MeetingEditorItem[]) => {
    onChange(JSON.stringify(nextItems.map((item) => normalizeMeetingForSave(item))));
  }, [normalizeMeetingForSave, onChange]);

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      {items.map((item, index) => (
        <div
          key={`meeting-item-${index}`}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#4b5563" }}>
              Meeting {index + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                const nextItems = items.filter((_, i) => i !== index);
                updateItems(nextItems.length > 0 ? nextItems : [createDefaultMeetingItem(0)]);
              }}
              style={{
                border: "none",
                borderRadius: "4px",
                background: "transparent",
                color: "#ef4444",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
              }}
              title="Remove meeting"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Title</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], title: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="Meeting title"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div>
              <label style={fieldLabelStyle}>Date</label>
              <input
                type="date"
                value={item.date}
                onChange={(e) => {
                  const nextItems = [...items];
                  nextItems[index] = { ...nextItems[index], date: e.target.value };
                  updateItems(nextItems);
                }}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={fieldLabelStyle}>Time</label>
              <input
                type="time"
                value={item.time}
                onChange={(e) => {
                  const nextItems = [...items];
                  nextItems[index] = { ...nextItems[index], time: e.target.value };
                  updateItems(nextItems);
                }}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={fieldLabelStyle}>Location</label>
            <input
              type="text"
              value={item.location}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], location: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="Meeting location"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={fieldLabelStyle}>Description</label>
            <textarea
              value={item.description}
              onChange={(e) => {
                const nextItems = [...items];
                nextItems[index] = { ...nextItems[index], description: e.target.value };
                updateItems(nextItems);
              }}
              placeholder="Agenda or notes"
              rows={3}
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "72px",
              }}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => updateItems([...items, createDefaultMeetingItem(items.length)])}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12px",
          fontWeight: 600,
          border: "1px dashed #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#fff",
          color: "#4b5563",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <Plus size={14} />
        Add Meeting
      </button>
    </div>
  );
}

function ContactInfoEditorControl({
  values,
  onChange,
  label,
}: {
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  label: string;
}) {
  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    display: "block",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>

      <div style={{ marginBottom: "8px" }}>
        <label style={fieldLabelStyle}>Title</label>
        <input
          type="text"
          value={values.title ?? ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Contact section title"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        <label style={fieldLabelStyle}>Description</label>
        <textarea
          value={values.description ?? ""}
          onChange={(e) => onChange("description", e.target.value)}
          rows={3}
          placeholder="Short contact description"
          style={{ ...inputStyle, resize: "vertical", minHeight: "72px" }}
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        <label style={fieldLabelStyle}>Phone</label>
        <input
          type="text"
          value={values.phone ?? ""}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        <label style={fieldLabelStyle}>Email</label>
        <input
          type="text"
          value={values.email ?? ""}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="hello@example.com"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        <label style={fieldLabelStyle}>Address</label>
        <textarea
          value={values.address ?? ""}
          onChange={(e) => onChange("address", e.target.value)}
          rows={2}
          placeholder="Street, City, State"
          style={{ ...inputStyle, resize: "vertical", minHeight: "56px" }}
        />
      </div>

      <div
        style={{
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label style={{ ...fieldLabelStyle, marginBottom: 0 }}>Show Map</label>
        <ToggleSwitch
          checked={Boolean(values.showMap)}
          onChange={(checked) => onChange("showMap", checked)}
        />
      </div>

      {values.showMap && (
        <div>
          <label style={fieldLabelStyle}>Map Embed URL</label>
          <input
            type="text"
            value={values.mapEmbedUrl ?? ""}
            onChange={(e) => onChange("mapEmbedUrl", e.target.value)}
            placeholder="https://maps.google.com/..."
            style={inputStyle}
          />
        </div>
      )}
    </div>
  );
}

function createDefaultPartner(tierIndex: number, partnerIndex: number): PartnerTierEditorPartner {
  return {
    id: `${Date.now()}-${tierIndex}-${partnerIndex}`,
    text: `Partner ${partnerIndex + 1}`,
    imageUrl: "",
    partnerUrl: "",
  };
}

function createDefaultTier(index: number): PartnerTierEditorTier {
  return {
    tierName: `Tier ${index + 1}`,
    partners: [createDefaultPartner(index, 0)],
  };
}

function sanitizePartnerTierValue(value: unknown): PartnerTierEditorTier[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((tier: any, tierIndex: number) => {
      const partners = Array.isArray(tier?.partners) ? tier.partners : [];
      return {
        tierName: typeof tier?.tierName === "string" && tier.tierName.trim()
          ? tier.tierName
          : `Tier ${tierIndex + 1}`,
        partners: partners.map((partner: any, partnerIndex: number) => ({
          id: partner?.id ?? `partner-${tierIndex}-${partnerIndex}`,
          text: partner?.text || `Partner ${partnerIndex + 1}`,
          imageUrl: partner?.imageUrl || "",
          partnerUrl: partner?.partnerUrl || "",
        })),
      };
    })
    .filter((tier: PartnerTierEditorTier) => tier.partners.length > 0);
}

function PartnerTierEditorControl({
  value,
  onChange,
  label,
}: {
  value: unknown;
  onChange: (nextValue: PartnerTierEditorTier[]) => void;
  label: string;
}) {
  const tiers = sanitizePartnerTierValue(value);
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState(0);
  const [pendingUploadTarget, setPendingUploadTarget] = useState<{ tierIndex: number; partnerIndex: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tiers.length === 0) {
      setSelectedTierIndex(0);
      setSelectedPartnerIndex(0);
      return;
    }
    if (selectedTierIndex > tiers.length - 1) {
      setSelectedTierIndex(tiers.length - 1);
      setSelectedPartnerIndex(0);
      return;
    }

    const activeTier = tiers[selectedTierIndex];
    if (!activeTier || selectedPartnerIndex > activeTier.partners.length - 1) {
      setSelectedPartnerIndex(0);
    }
  }, [tiers, selectedTierIndex, selectedPartnerIndex]);

  const updateTiers = useCallback((nextTiers: PartnerTierEditorTier[]) => {
    onChange(nextTiers);
  }, [onChange]);

  const activeTier = tiers[selectedTierIndex];
  const activePartner = activeTier?.partners[selectedPartnerIndex];

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "8px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#1f2937",
    boxSizing: "border-box",
    lineHeight: "1.4",
  };

  const addTier = () => {
    const nextIndex = tiers.length;
    const nextTiers = [...tiers, createDefaultTier(nextIndex)];
    updateTiers(nextTiers);
    setSelectedTierIndex(nextIndex);
    setSelectedPartnerIndex(0);
  };

  const removeTier = (tierIndex: number) => {
    if (tiers.length <= 1) return;
    const nextTiers = tiers.filter((_, index) => index !== tierIndex);
    updateTiers(nextTiers);
    setSelectedTierIndex(Math.max(0, Math.min(selectedTierIndex, nextTiers.length - 1)));
    setSelectedPartnerIndex(0);
  };

  const updateTierName = (tierIndex: number, tierName: string) => {
    const nextTiers = tiers.map((tier, index) => (
      index === tierIndex ? { ...tier, tierName } : tier
    ));
    updateTiers(nextTiers);
  };

  const addPartner = (tierIndex: number) => {
    const nextTiers = tiers.map((tier, index) => {
      if (index !== tierIndex) return tier;
      const nextPartnerIndex = tier.partners.length;
      return {
        ...tier,
        partners: [...tier.partners, createDefaultPartner(tierIndex, nextPartnerIndex)],
      };
    });
    updateTiers(nextTiers);
    setSelectedPartnerIndex(activeTier?.partners.length || 0);
  };

  const removePartner = (tierIndex: number, partnerIndex: number) => {
    const targetTier = tiers[tierIndex];
    if (!targetTier || targetTier.partners.length <= 1) return;
    const nextTiers = tiers.map((tier, index) => {
      if (index !== tierIndex) return tier;
      return {
        ...tier,
        partners: tier.partners.filter((_, idx) => idx !== partnerIndex),
      };
    });
    updateTiers(nextTiers);
    setSelectedPartnerIndex(0);
  };

  const updatePartnerField = (
    tierIndex: number,
    partnerIndex: number,
    field: keyof PartnerTierEditorPartner,
    fieldValue: string
  ) => {
    const nextTiers = tiers.map((tier, tIndex) => {
      if (tIndex !== tierIndex) return tier;
      return {
        ...tier,
        partners: tier.partners.map((partner, pIndex) => (
          pIndex === partnerIndex ? { ...partner, [field]: fieldValue } : partner
        )),
      };
    });
    updateTiers(nextTiers);
  };

  const handlePickImage = (tierIndex: number, partnerIndex: number) => {
    setPendingUploadTarget({ tierIndex, partnerIndex });
    fileRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const target = pendingUploadTarget;
    if (!file || !target) return;

    const localUrl = URL.createObjectURL(file);
    updatePartnerField(target.tierIndex, target.partnerIndex, "imageUrl", localUrl);

    const serverUrl = await uploadFileToApi(file, "block");
    if (serverUrl) {
      updatePartnerField(target.tierIndex, target.partnerIndex, "imageUrl", serverUrl);
      URL.revokeObjectURL(localUrl);
    }

    setPendingUploadTarget(null);
    e.target.value = "";
  };

  return (
    <div style={{ marginBottom: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <label style={labelStyle}>{label}</label>
        <button
          onClick={addTier}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            background: "#fff",
            padding: "4px 8px",
            fontSize: "11px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Plus size={12} />
          Add Tier
        </button>
      </div>

      {tiers.length === 0 && (
        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
          No tiers yet. Click Add Tier.
        </div>
      )}

      {tiers.length > 0 && (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
            {tiers.map((tier, index) => (
              <button
                key={`${tier.tierName}-${index}`}
                onClick={() => {
                  setSelectedTierIndex(index);
                  setSelectedPartnerIndex(0);
                }}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "999px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  background: index === selectedTierIndex ? "#fef3c7" : "#fff",
                  cursor: "pointer",
                }}
              >
                {tier.tierName}
              </button>
            ))}
          </div>

          {activeTier && (
            <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "10px" }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "8px" }}>
                <input
                  type="text"
                  value={activeTier.tierName}
                  onChange={(e) => updateTierName(selectedTierIndex, e.target.value)}
                  placeholder="Tier title"
                  style={inputStyle}
                />
                <button
                  onClick={() => removeTier(selectedTierIndex)}
                  disabled={tiers.length <= 1}
                  style={{
                    border: "1px solid #fee2e2",
                    color: tiers.length <= 1 ? "#d1d5db" : "#ef4444",
                    background: "#fff",
                    borderRadius: "6px",
                    padding: "6px",
                    cursor: tiers.length <= 1 ? "not-allowed" : "pointer",
                    flexShrink: 0,
                  }}
                  title="Delete tier"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                {activeTier.partners.map((partner, partnerIndex) => (
                  <button
                    key={`${partner.id}-${partnerIndex}`}
                    onClick={() => setSelectedPartnerIndex(partnerIndex)}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      fontSize: "11px",
                      background: partnerIndex === selectedPartnerIndex ? "#ecfeff" : "#fff",
                      cursor: "pointer",
                    }}
                  >
                    {partner.text || `Partner ${partnerIndex + 1}`}
                  </button>
                ))}
                <button
                  onClick={() => addPartner(selectedTierIndex)}
                  style={{
                    border: "1px dashed #d1d5db",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    fontSize: "11px",
                    background: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Plus size={11} />
                  Add Partner
                </button>
              </div>

              {activePartner && (
                <div style={{ border: "1px solid #f3f4f6", borderRadius: "8px", padding: "8px" }}>
                  <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
                    <input
                      type="text"
                      value={activePartner.text}
                      onChange={(e) => updatePartnerField(selectedTierIndex, selectedPartnerIndex, "text", e.target.value)}
                      placeholder="Partner title"
                      style={inputStyle}
                    />
                    <button
                      onClick={() => removePartner(selectedTierIndex, selectedPartnerIndex)}
                      disabled={activeTier.partners.length <= 1}
                      style={{
                        border: "1px solid #fee2e2",
                        color: activeTier.partners.length <= 1 ? "#d1d5db" : "#ef4444",
                        background: "#fff",
                        borderRadius: "6px",
                        padding: "6px",
                        cursor: activeTier.partners.length <= 1 ? "not-allowed" : "pointer",
                        flexShrink: 0,
                      }}
                      title="Delete partner"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={activePartner.partnerUrl || ""}
                    onChange={(e) => updatePartnerField(selectedTierIndex, selectedPartnerIndex, "partnerUrl", e.target.value)}
                    placeholder="Partner URL (optional)"
                    style={{ ...inputStyle, marginBottom: "6px" }}
                  />

                  {activePartner.imageUrl && (
                    <div style={{ marginBottom: "6px", position: "relative" }}>
                      <img
                        src={activePartner.imageUrl}
                        alt={activePartner.text || "Partner"}
                        style={{
                          width: "100%",
                          height: "74px",
                          objectFit: "contain",
                          borderRadius: "6px",
                          border: "1px solid #e5e7eb",
                          background: "#fff",
                        }}
                      />
                      <button
                        onClick={() => updatePartnerField(selectedTierIndex, selectedPartnerIndex, "imageUrl", "")}
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: "none",
                          backgroundColor: "rgba(0,0,0,0.5)",
                          color: "#fff",
                          fontSize: "11px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          lineHeight: 1,
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => handlePickImage(selectedTierIndex, selectedPartnerIndex)}
                    style={{
                      width: "100%",
                      border: "1px dashed #d1d5db",
                      borderRadius: "6px",
                      padding: "7px 10px",
                      fontSize: "12px",
                      background: "#fafafa",
                      color: "#6b7280",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      marginBottom: "6px",
                    }}
                  >
                    <ImagePlus size={13} />
                    Upload Partner Image
                  </button>

                  <input
                    type="text"
                    value={activePartner.imageUrl || ""}
                    onChange={(e) => updatePartnerField(selectedTierIndex, selectedPartnerIndex, "imageUrl", e.target.value)}
                    placeholder="or paste image URL..."
                    style={inputStyle}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SettingsGroup — collapsible group of settings                     */
/* ------------------------------------------------------------------ */

/** Groups that are collapsed by default (advanced / less-used) */
const COLLAPSED_BY_DEFAULT = new Set(["Position", "Responsive"]);

function SettingsGroup({
  groupName,
  configs,
  selectedProps,
  onChange,
  componentName,
}: {
  groupName: string;
  configs: PropConfig[];
  selectedProps: Record<string, any>;
  onChange: (key: string, value: any) => void;
  componentName?: string;
}) {
  const isAdvanced = COLLAPSED_BY_DEFAULT.has(groupName);
  const [isOpen, setIsOpen] = useState(!isAdvanced);

  const headerLabel = isAdvanced ? `${groupName} (Advanced)` : groupName;

  // For Section component's Data group, add category dropdown
  const isSectionDataGroup = componentName === "Section" && groupName === "Data";
  const moduleType = selectedProps?.moduleType as SectionModuleType | undefined;
  const categoryName = selectedProps?.categoryName || "";
  const sectionDisplayStyle = selectedProps?.displayStyle as string | undefined;
  const isBentoMode = moduleType === "bentobox" || sectionDisplayStyle === "bento";
  const activeBentoStyle = typeof selectedProps?.bentoStyle === "string" && bentoLayouts[selectedProps.bentoStyle]
    ? selectedProps.bentoStyle
    : (Object.keys(bentoLayouts)[0] || "1V2H");
  const bentoSlotCount = Math.max(
    Number(selectedProps?.limit) || 1,
    bentoLayouts[activeBentoStyle]?.length || 1,
    1
  );
  const isPartnerMode = moduleType === "partner";
  const supportsCategoryDropdown = Boolean(moduleType && MODULE_CONFIG[moduleType]?.categoryApiPath);
  const isFaqContentGroup = componentName === "FAQ" && groupName === "Content";
  const isSocialWallContentGroup = componentName === "Social Wall" && groupName === "Content";
  const isGalleryContentGroup = componentName === "Gallery" && groupName === "Content";
  const isTCardContentGroup = componentName === "T-Card" && groupName === "Content";
  const isTeamContentGroup = (componentName === "Team" || componentName === "Team Members") && groupName === "Content";
  const isTimelineContentGroup = componentName === "Timeline" && groupName === "Content";
  const isDocumentsContentGroup = componentName === "Documents" && groupName === "Content";
  const isMeetingsContentGroup = componentName === "Meetings" && groupName === "Content";
  const isContactContentGroup = (componentName === "Contact" || componentName === "Contact Info") && groupName === "Content";

  return (
    <div style={{ marginBottom: "12px" }}>
      <h4
        onClick={() => setIsOpen(!isOpen)}
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: isAdvanced ? "#b0b0b0" : "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: isOpen ? "6px" : "0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          userSelect: "none",
        }}
      >
        {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        {headerLabel}
      </h4>
      {isOpen && (
        <>
          {/* Category dropdown for Section component */}
          {isSectionDataGroup && supportsCategoryDropdown && (
            <CategoryDropdownControl
              key={`section-category-${moduleType || "none"}`}
              moduleType={moduleType}
              value={categoryName}
              onChange={(value) => onChange("categoryName", value)}
              label="Category"
            />
          )}

          {isSectionDataGroup && isPartnerMode && (
            <PartnerTierEditorControl
              value={selectedProps?.partnerTiers}
              onChange={(value) => onChange("partnerTiers", value)}
              label="Partner Tiers"
            />
          )}

          {isSectionDataGroup && isBentoMode && (
            <BentoItemsEditorControl
              value={selectedProps?.bentoItems}
              onChange={(value) => onChange("bentoItems", value)}
              activeIndex={Number(selectedProps?.bentoActiveItemIndex) || 0}
              onActiveIndexChange={(value) => onChange("bentoActiveItemIndex", value)}
              slotCount={bentoSlotCount}
              label="Bento Boxes"
            />
          )}

          {isFaqContentGroup && (
            <FAQItemsEditorControl
              value={selectedProps?.items}
              onChange={(value) => onChange("items", value)}
              label="FAQ Items"
            />
          )}

          {isSocialWallContentGroup && (
            <SocialPlatformsEditorControl
              value={selectedProps?.platforms}
              onChange={(value) => onChange("platforms", value)}
              label="Platforms"
            />
          )}

          {isGalleryContentGroup && (
            <GalleryImagesEditorControl
              value={selectedProps?.images}
              onChange={(value) => onChange("images", value)}
              label="Images"
            />
          )}

          {isTCardContentGroup && (
            <TCardItemsEditorControl
              value={selectedProps?.items}
              onChange={(value) => onChange("items", value)}
              label="Items"
            />
          )}

          {isTeamContentGroup && (
            <TeamMembersEditorControl
              value={selectedProps?.members}
              onChange={(value) => onChange("members", value)}
              label="Team Members"
            />
          )}

          {isTimelineContentGroup && (
            <TimelineItemsEditorControl
              value={selectedProps?.items}
              onChange={(value) => onChange("items", value)}
              label="Timeline Items"
            />
          )}

          {isDocumentsContentGroup && (
            <DocumentsItemsEditorControl
              value={selectedProps?.documents}
              onChange={(value) => onChange("documents", value)}
              label="Documents"
            />
          )}

          {isMeetingsContentGroup && (
            <MeetingsItemsEditorControl
              value={selectedProps?.meetings}
              onChange={(value) => onChange("meetings", value)}
              label="Meetings"
            />
          )}

          {isContactContentGroup && (
            <ContactInfoEditorControl
              values={selectedProps}
              onChange={onChange}
              label="Contact Details"
            />
          )}

          {/* Regular settings controls */}
          {configs.map((config) => {
            if (componentName === "Section") {
              // Bento settings only make sense in bento mode.
              if ((config.key === "bentoStyle" || config.key === "bentoRowHeight") && !isBentoMode) {
                return null;
              }

              // Columns controls do not apply to bento layouts.
              if (isBentoMode && ["columns", "tabletColumns", "mobileColumns"].includes(config.key)) {
                return null;
              }
            }

            // Skip categoryName if we're showing the custom dropdown for Section
            if (isSectionDataGroup && config.key === "categoryName") {
              return null;
            }
            if (isSectionDataGroup && isPartnerMode && config.key === "partnerTiers") {
              return null;
            }
            if (isSectionDataGroup && config.key === "bentoItems") {
              return null;
            }
            if (isFaqContentGroup && config.key === "items") {
              return null;
            }
            if (isSocialWallContentGroup && config.key === "platforms") {
              return null;
            }
            if (isGalleryContentGroup && config.key === "images") {
              return null;
            }
            if (isTCardContentGroup && config.key === "items") {
              return null;
            }
            if (isTeamContentGroup && config.key === "members") {
              return null;
            }
            if (isTimelineContentGroup && config.key === "items") {
              return null;
            }
            if (isDocumentsContentGroup && config.key === "documents") {
              return null;
            }
            if (isMeetingsContentGroup && config.key === "meetings") {
              return null;
            }
            if (isContactContentGroup && [
              "title",
              "description",
              "phone",
              "email",
              "address",
              "showMap",
              "mapEmbedUrl",
            ].includes(config.key)) {
              return null;
            }
            return (
              <SettingsControl
                key={config.key}
                config={config}
                value={selectedProps?.[config.key]}
                onChange={onChange}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SettingsPanel — main export                                       */
/* ------------------------------------------------------------------ */
export function SettingsPanel() {
  const { selected, actions } = useEditor((state) => {
    const currentNodeId = state.events.selected
      ? Array.from(state.events.selected)[0]
      : null;
    let selectedNode = null;

    if (currentNodeId) {
      const node = state.nodes[currentNodeId];
      if (node) {
        const displayName =
          node.data.displayName ||
          (typeof node.data.type !== "string" && (node.data.type as any)?.craft?.displayName) ||
          node.data.name ||
          "Unknown";

        selectedNode = {
          id: currentNodeId,
          name: displayName,
          props: node.data.props,
          isDeletable: currentNodeId !== "ROOT",
        };
      }
    }

    return { selected: selectedNode };
  });

  const handleChange = useCallback(
    (key: string, value: any) => {
      if (selected?.id) {
        actions.setProp(selected.id, (props: Record<string, any>) => {
          const previousModuleType = props.moduleType as SectionModuleType | undefined;
          const previousModuleLabel = previousModuleType
            ? MODULE_CONFIG[previousModuleType]?.label
            : "";
          const nextModuleType = value as SectionModuleType | undefined;
          const nextModuleLabel = nextModuleType
            ? MODULE_CONFIG[nextModuleType]?.label
            : "";
          const currentSectionTitle = typeof props.sectionTitle === "string"
            ? props.sectionTitle.trim()
            : "";
          const normalizedCurrentTitle = currentSectionTitle.toLowerCase();
          const isModulePresetTitle = Object.values(MODULE_CONFIG).some(
            (config) => config.label.toLowerCase() === normalizedCurrentTitle
          );

          props[key] = value;

          // When module type changes, reset category to empty to show all items from new module
          if (key === "moduleType") {
            props.categoryName = "";

            if (nextModuleType === "bentobox") {
              props.displayStyle = "bento";
              if (!props.bentoStyle) {
                props.bentoStyle = Object.keys(bentoLayouts)[0] || "1V2H";
              }
            }

            if (previousModuleType === "bentobox" && nextModuleType !== "bentobox" && props.displayStyle === "bento") {
              props.displayStyle = "grid";
            }

            // Keep custom titles, but update auto/preset titles to the new module label.
            if (!currentSectionTitle || isModulePresetTitle || currentSectionTitle === previousModuleLabel) {
              props.sectionTitle = nextModuleLabel || "";
            }
          }
        });
      }
    },
    [selected?.id, actions]
  );

  if (!selected) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <div style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#f3f4f6",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
        }}>
          <Settings2 size={20} color="#9ca3af" />
        </div>
        <p style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280", margin: 0 }}>No Element Selected</p>
        <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>Click an element on the canvas to edit</p>
      </div>
    );
  }

  const { mode: blockMode, setMode: setBlockMode } = useBlockMode();

  const allSettings = componentSettings[selected.name] || [];

  // Check which tabs have content
  const hasFormSettings = allSettings.some((s) => getSettingTab(s) === "form");
  const hasDesignSettings = allSettings.some((s) => getSettingTab(s) === "design");
  const hasBothTabs = hasFormSettings && hasDesignSettings;

  // Filter settings by active block mode (from context, set by the toolbar toggle)
  const activeTab = blockMode;
  const settings = hasBothTabs
    ? allSettings.filter((s) => getSettingTab(s) === activeTab)
    : allSettings;

  // Group settings
  const groups: Record<string, PropConfig[]> = {};
  settings.forEach((s) => {
    const group = s.group || "General";
    if (!groups[group]) groups[group] = [];
    groups[group].push(s);
  });

  return (
    <div className="vb-settings-panel" style={{ padding: "12px", maxHeight: "100%", overflow: "auto" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
        paddingBottom: "8px",
        borderBottom: "1px solid #e5e7eb",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#facc15" }} />
          <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#1f2937", margin: 0 }}>{selected.name}</h3>
        </div>
        {selected.isDeletable && (
          <button
            onClick={() => { if (selected.id) actions.delete(selected.id); }}
            style={{
              padding: "3px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "transparent",
              color: "#9ca3af",
              cursor: "pointer",
              display: "flex",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#ef4444";
              (e.currentTarget as HTMLElement).style.backgroundColor = "#fef2f2";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#9ca3af";
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
            title="Delete element"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Form / Design tab switcher */}
      {hasBothTabs && (
        <div style={{
          display: "flex",
          marginBottom: "12px",
          background: "#f3f4f6",
          borderRadius: "8px",
          padding: "3px",
          gap: "2px",
        }}>
          <button
            onClick={() => setBlockMode("form")}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "6px 0",
              fontSize: "12px",
              fontWeight: 600,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.15s",
              backgroundColor: activeTab === "form" ? "#fff" : "transparent",
              color: activeTab === "form" ? "#1f2937" : "#9ca3af",
              boxShadow: activeTab === "form" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <FileText size={13} />
            Form
          </button>
          <button
            onClick={() => setBlockMode("design")}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "6px 0",
              fontSize: "12px",
              fontWeight: 600,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.15s",
              backgroundColor: activeTab === "design" ? "#fff" : "transparent",
              color: activeTab === "design" ? "#1f2937" : "#9ca3af",
              boxShadow: activeTab === "design" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <Paintbrush size={13} />
            Design
          </button>
        </div>
      )}

      {/* Settings groups */}
      {Object.entries(groups).map(([groupName, configs]) => (
        <SettingsGroup
          key={groupName}
          groupName={groupName}
          configs={configs}
          selectedProps={selected.props}
          onChange={handleChange}
          componentName={selected.name}
        />
      ))}

      {settings.length === 0 && (
        <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", padding: "16px 0" }}>
          No configurable properties for this element.
        </p>
      )}
    </div>
  );
}

export default SettingsPanel;
