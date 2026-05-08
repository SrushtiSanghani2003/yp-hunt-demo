import { PenLine, Brush } from "lucide-react";

interface BlockModeToggleProps {
  mode: "form" | "design";
  onModeChange: (mode: "form" | "design") => void;
}

/**
 * Toggle between Form mode (existing field-based editing)
 * and Design mode (Craft.js visual canvas).
 */
export function BlockModeToggle({ mode, onModeChange }: BlockModeToggleProps) {
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-xl p-0.5">
      <button
        onClick={() => onModeChange("form")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
          mode === "form"
            ? "bg-white text-black shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <PenLine size={13} />
        Form
      </button>
      <button
        onClick={() => onModeChange("design")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
          mode === "design"
            ? "bg-white text-black shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <Brush size={13} />
        Design
      </button>
    </div>
  );
}

export default BlockModeToggle;
