import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { BlockModeToggle, heroMediaPresetContent, VisualBlockEditor } from "../../visual-builder";

interface HeroMediaDesignModeProps {
  /** The hero media design state stored at page level */
  heroDesignState?: {
    mode?: "form" | "design";
    craft_state?: string;
    rendered_html?: string;
  };
  /** Called when the design state changes */
  onDesignStateChange: (state: {
    mode: "form" | "design";
    craft_state: string;
    rendered_html: string;
  }) => void;
  /** The form-mode content (existing hero media UI) */
  formContent: ReactNode;
}

/**
 * Wraps the Hero Media section with a Form/Design mode toggle.
 * Unlike regular blocks, hero media doesn't have a single `content` object.
 * This component manages a separate design state for the hero section.
 */
export function HeroMediaDesignMode({
  heroDesignState,
  onDesignStateChange,
  formContent,
}: HeroMediaDesignModeProps) {
  const currentMode = heroDesignState?.mode === "design" ? "design" : "form";

  const handleModeChange = useCallback(
    (newMode: "form" | "design") => {
      if (newMode === currentMode) return;

      onDesignStateChange({
        mode: newMode,
        craft_state: heroDesignState?.craft_state || "",
        rendered_html: heroDesignState?.rendered_html || "",
      });
    },
    [currentMode, heroDesignState, onDesignStateChange]
  );

  const handleDesignChange = useCallback(
    (craftState: string, renderedHtml: string) => {
      onDesignStateChange({
        mode: "design",
        craft_state: craftState,
        rendered_html: renderedHtml,
      });
    },
    [onDesignStateChange]
  );

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex justify-end mb-3">
        <BlockModeToggle mode={currentMode} onModeChange={handleModeChange} />
      </div>

      {/* Content area */}
      {currentMode === "form" ? (
        formContent
      ) : (
        <VisualBlockEditor
          initialState={heroDesignState?.craft_state || undefined}
          onChange={handleDesignChange}
          defaultContent={heroMediaPresetContent}
          canvasHeight="500px"
        />
      )}
    </div>
  );
}

export default HeroMediaDesignMode;
