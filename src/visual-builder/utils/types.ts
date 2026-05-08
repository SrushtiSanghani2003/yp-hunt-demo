/**
 * Shared types for the visual builder system
 */

// Content structure when in "design" mode
export interface DesignModeContent {
  mode: "design";
  craft_state: string; // JSON stringified Craft.js state for re-editing
  rendered_html: string; // Generated HTML output for frontend rendering
  is_dynamic: boolean;
  is_active: boolean;
  // Keep any original fields for backward compat
  [key: string]: any;
}

// Content structure when in "form" mode (existing behavior)
export interface FormModeContent {
  mode?: "form" | undefined; // undefined = form mode (backward compatible)
  is_dynamic: boolean;
  is_active: boolean;
  [key: string]: any;
}

export type BlockContent = DesignModeContent | FormModeContent;

export function isDesignMode(content: BlockContent): content is DesignModeContent {
  return content?.mode === "design";
}

export function isFormMode(content: BlockContent): content is FormModeContent {
  return !content?.mode || content.mode === "form";
}

// Settings panel prop types
export interface SettingsPanelProps {
  propKey: string;
  label: string;
  type: "text" | "number" | "color" | "select" | "slider" | "textarea" | "toggle";
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

// Component registration for toolbox
export interface ToolboxItem {
  name: string;
  icon: string;
  description: string;
  component: React.ElementType;
  defaultProps?: Record<string, any>;
}
