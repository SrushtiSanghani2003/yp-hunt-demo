import { useCallback, useEffect, useRef, useState, createContext, useContext } from "react";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { BlockModeProvider } from "./contexts/BlockModeContext";
import { CraftContainer } from "./components/CraftContainer";
import { CraftText } from "./components/CraftText";
import { CraftImage } from "./components/CraftImage";
import { CraftButton } from "./components/CraftButton";
import { CraftVideo } from "./components/CraftVideo";
import { CraftSpacer } from "./components/CraftSpacer";
import { CraftDivider } from "./components/CraftDivider";
import { CraftSection } from "./components/CraftSection";
import { CraftTestimonial } from "./components/CraftTestimonial";
import { CraftFAQ } from "./components/CraftFAQ";
import { CraftGallery } from "./components/CraftGallery";
import { CraftTeam } from "./components/CraftTeam";
import { CraftContact } from "./components/CraftContact";
import { CraftQuote } from "./components/CraftQuote";
import { CraftTimeline } from "./components/CraftTimeline";
import { CraftSocialWall } from "./components/CraftSocialWall";
import { CraftAdvertisement } from "./components/CraftAdvertisement";
import { CraftPromotion } from "./components/CraftPromotion";
import { CraftTCard } from "./components/CraftTCard";
import { CraftDocuments } from "./components/CraftDocuments";
import { CraftMeetings } from "./components/CraftMeetings";
import { CraftHtml } from "./components/CraftHtml";
import { Toolbox } from "./panels/Toolbox";
import { SectionsPanel } from "./panels/SectionsPanel";
import { LayersPanel } from "./panels/LayersPanel";
import { SettingsPanel } from "./settings/SettingsPanel";
import { RenderNode } from "./RenderNode";
import { serializeToHtml } from "./utils/renderNodesToHtml";
import {
  Undo2, Redo2, Eye, Layers, Settings2, Database,
  Maximize2, Minimize2, LayoutGrid, Smartphone, Monitor, Tablet,
} from "lucide-react";

// ---- Device context ----
export type DeviceMode = "desktop" | "tablet" | "mobile";

export const DeviceContext = createContext<DeviceMode>("desktop");
export const useDeviceMode = () => useContext(DeviceContext);

// All user components must be registered
const resolver = {
  CraftContainer,
  CraftText,
  CraftImage,
  CraftButton,
  CraftVideo,
  CraftSpacer,
  CraftDivider,
  CraftSection,
  CraftTestimonial,
  CraftFAQ,
  CraftGallery,
  CraftTeam,
  CraftContact,
  CraftQuote,
  CraftTimeline,
  CraftSocialWall,
  CraftAdvertisement,
  CraftPromotion,
  CraftTCard,
  CraftDocuments,
  CraftMeetings,
  CraftHtml,
};

interface VisualBlockEditorProps {
  /** Initial Craft.js state to restore (for re-editing) */
  initialState?: string;
  /** Called whenever the design changes */
  onChange?: (craftState: string, renderedHtml: string) => void;
  /** Default elements to render when no initial state */
  defaultContent?: React.ReactNode;
  /** Canvas height */
  canvasHeight?: string;
  /** Canvas width */
  canvasWidth?: string;
}

/**
 * Inner component that has access to the editor context
 */
function EditorContent({
  initialState,
  onChange,
  defaultContent,
  canvasHeight = "500px",
}: VisualBlockEditorProps) {
  const { actions, query, enabled, selectedNodeId } = useEditor((state) => ({
    enabled: state.options.enabled,
    selectedNodeId: state.events.selected ? Array.from(state.events.selected)[0] || null : null,
  }));

  const canUndo = enabled && query.history.canUndo();
  const canRedo = enabled && query.history.canRedo();

  const [activePanel, setActivePanel] = useState<"elements" | "sections" | "layers" | "settings">("elements");

  // Auto-switch to Settings tab when a block is selected on the canvas
  useEffect(() => {
    if (selectedNodeId && selectedNodeId !== "ROOT") {
      try {
        query.node(selectedNodeId).get();
        setActivePanel("settings");
      } catch {
        // Selection can be briefly stale while Craft.js is updating nodes.
      }
    }
  }, [selectedNodeId, query]);
  const [isPreview, setIsPreview] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canvasDevice, setCanvasDevice] = useState<DeviceMode>("desktop");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevStateRef = useRef<string>("");

  // Load initial state if provided
  useEffect(() => {
    if (initialState) {
      try {
        const parsed = JSON.parse(initialState);
        setTimeout(() => {
          actions.deserialize(parsed);
        }, 100);
      } catch (e) {
        console.warn("Failed to load initial craft state:", e);
      }
    }
  }, []);

  // Debounced onChange handler
  const handleStateChange = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      try {
        const serializedState = query.serialize();
        if (serializedState !== prevStateRef.current) {
          prevStateRef.current = serializedState;
          const parsedNodes = JSON.parse(serializedState);
          const html = serializeToHtml(parsedNodes);
          onChange?.(serializedState, html);
        }
      } catch (e) {
        console.warn("Failed to serialize craft state:", e);
      }
    }, 500);
  }, [query, onChange]);

  // Listen to changes
  useEffect(() => {
    const interval = setInterval(handleStateChange, 1000);
    return () => {
      clearInterval(interval);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [handleStateChange]);

  // Toggle preview mode
  const togglePreview = useCallback(() => {
    const newPreview = !isPreview;
    setIsPreview(newPreview);
    actions.setOptions((options) => {
      options.enabled = !newPreview;
    });
  }, [isPreview, actions]);

  const canvasWidthMap = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isExpanded]);

  return (
    <DeviceContext.Provider value={canvasDevice}>
      {/* ✅ BACKDROP (put here) */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] transition-opacity duration-300"
          onClick={() => setIsExpanded(false)}
        />
      )}
      <div
        className={`border border-gray-200 rounded-2xl overflow-hidden bg-white ${isExpanded
          ? "fixed inset-4 z-[9999] shadow-2xl transition-all duration-300 ease-in-out"
          : "relative transition-all duration-300 ease-in-out"
          }`}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Visual Builder
            </span>
            {/* Device switcher */}
            <div className="flex items-center gap-0.5 bg-gray-200 rounded-lg p-0.5">
              {[
                { key: "desktop" as const, icon: <Monitor size={14} />, label: "Desktop" },
                { key: "tablet" as const, icon: <Tablet size={14} />, label: "Tablet" },
                { key: "mobile" as const, icon: <Smartphone size={14} />, label: "Mobile" },
              ].map(({ key, icon, label }) => (
                <button
                  key={key}
                  onClick={() => setCanvasDevice(key)}
                  className={`p-1.5 rounded-md transition-colors ${canvasDevice === key
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                  title={label}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => canUndo && actions.history.undo()}
              disabled={!canUndo}
              className={`p-1.5 rounded-lg transition-colors ${canUndo ? "hover:bg-gray-200 text-gray-700" : "text-gray-300 cursor-not-allowed"
                }`}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={16} />
            </button>
            <button
              onClick={() => canRedo && actions.history.redo()}
              disabled={!canRedo}
              className={`p-1.5 rounded-lg transition-colors ${canRedo ? "hover:bg-gray-200 text-gray-700" : "text-gray-300 cursor-not-allowed"
                }`}
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={16} />
            </button>

            <div className="w-px h-5 bg-gray-300 mx-1" />

            <button
              onClick={togglePreview}
              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${isPreview ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200 text-gray-700"
                }`}
              title={isPreview ? "Back to Edit" : "Preview"}
            >
              <Eye size={16} />
              <span className="text-xs font-medium">{isPreview ? "Edit" : "Preview"}</span>
            </button>

            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-all duration-200"
              title={isExpanded ? "Collapse (Esc)" : "Fullscreen"}
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        <div className="flex" style={{ height: isExpanded ? "calc(100% - 42px)" : canvasHeight }}>
          {/* Left panel */}
          {!isPreview && (
            <div className="w-60 border-r border-gray-200 flex flex-col shrink-0 bg-white">
              {/* Panel tabs */}
              <div className="flex border-b border-gray-200">
                {[
                  { key: "elements" as const, icon: <LayoutGrid size={15} />, label: "Elements" },
                  { key: "sections" as const, icon: <Database size={15} />, label: "Sections" },
                  { key: "layers" as const, icon: <Layers size={15} />, label: "Layers" },
                  { key: "settings" as const, icon: <Settings2 size={15} />, label: "Settings" },
                ].map(({ key, icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setActivePanel(key)}
                    className={`flex-1 py-2.5 transition-colors flex items-center justify-center ${activePanel === key
                      ? "text-black border-b-2 border-primary bg-yellow-50/50"
                      : "text-gray-400 hover:text-gray-700"
                      }`}
                    title={label}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              {/* Panel content */}
              <div className="flex-1 overflow-hidden" style={{ position: "relative" }}>
                <div className="vb-settings-panel" style={{ position: "absolute", inset: 0, overflowY: "auto", overflowX: "hidden" }}>
                  {activePanel === "elements" && <Toolbox />}
                  {activePanel === "sections" && <SectionsPanel />}
                  {activePanel === "layers" && <LayersPanel />}
                  {activePanel === "settings" && <SettingsPanel />}
                </div>
              </div>
            </div>
          )}

          {/* Center: Canvas */}
          <div
            className="flex-1 overflow-hidden p-4 craft-canvas-scroll"
            style={{
              backgroundColor: "#f8f9fa",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                actions.selectNode();
              }
            }}
          >
            <div
              className="mx-auto bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 vb-canvas-root"
              data-vb-device={canvasDevice}
              style={{
                width: canvasWidthMap[canvasDevice],
                maxWidth: "100%",
                height: "500px",              // ✅ fixed height
                overflowY: "auto",            // ✅ enable scroll
                position: "relative",
                boxSizing: "border-box",
                flex: "1 1 auto",
              }}
            >
              <Frame>
                {defaultContent || (
                  <Element
                    is={CraftContainer}
                    canvas
                    padding={20}
                    flexDirection="column"
                    gap={12}
                    minHeight="300px"
                  >
                    <CraftText text="Start designing here..." fontSize={18} color="#9ca3af" textAlign="center" />
                  </Element>
                )}
              </Frame>
            </div>
          </div>
        </div>
      </div>
    </DeviceContext.Provider>
  );
}

/**
 * Main Visual Block Editor component.
 * Wraps content in Craft.js Editor provider with custom onRender.
 */
export function VisualBlockEditor(props: VisualBlockEditorProps) {
  return (
    <BlockModeProvider>
      <Editor
        resolver={resolver}
        enabled={true}
        onRender={RenderNode}
      >
        <EditorContent {...props} />
      </Editor>
    </BlockModeProvider>
  );
}

export default VisualBlockEditor;
