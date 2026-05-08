import { useEditor } from "@craftjs/core";
import {
  Newspaper, FileText, Video, ImageIcon, ShoppingBag,
  Handshake, LayoutGrid,
} from "lucide-react";
import { CraftSection, type SectionModuleType } from "../components/CraftSection";

interface SectionItemConfig {
  moduleType: SectionModuleType;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  defaults?: Partial<Record<string, any>>;
}

const sectionItems: SectionItemConfig[] = [
  {
    moduleType: "article",
    name: "Articles",
    description: "Article cards from CMS",
    icon: <FileText size={18} />,
    color: "#3b82f6",
    defaults: { columns: 3, limit: 6 },
  },
  {
    moduleType: "news",
    name: "News",
    description: "Latest news items",
    icon: <Newspaper size={18} />,
    color: "#ef4444",
    defaults: { columns: 3, limit: 6 },
  },
  {
    moduleType: "video",
    name: "Videos",
    description: "Video gallery from CMS",
    icon: <Video size={18} />,
    color: "#8b5cf6",
    defaults: { columns: 3, limit: 6 },
  },
  {
    moduleType: "album",
    name: "Albums",
    description: "Photo albums & galleries",
    icon: <ImageIcon size={18} />,
    color: "#10b981",
    defaults: { columns: 4, limit: 8 },
  },
  {
    moduleType: "shop",
    name: "Shop",
    description: "Products & store items",
    icon: <ShoppingBag size={18} />,
    color: "#f59e0b",
    defaults: { columns: 4, limit: 8, showAuthor: false, showDate: false },
  },
  {
    moduleType: "partner",
    name: "Partners",
    description: "Partner logos & info",
    icon: <Handshake size={18} />,
    color: "#06b6d4",
    defaults: { columns: 4, limit: 8, showDate: false, showAuthor: false },
  },
  {
    moduleType: "bentobox",
    name: "BentoBox",
    description: "Bento grid layout",
    icon: <LayoutGrid size={18} />,
    color: "#ec4899",
    defaults: { columns: 3, limit: 6, displayStyle: "grid" },
  },
];

function SectionItem({ item }: { item: SectionItemConfig }) {
  const { connectors } = useEditor();

  const element = (
    <CraftSection
      moduleType={item.moduleType}
      sectionTitle={item.name}
      {...(item.defaults || {})}
    />
  );

  return (
    <div
      ref={(ref) => {
        if (ref) connectors.create(ref, element);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 10px",
        borderRadius: "10px",
        cursor: "grab",
        border: "1px solid transparent",
        transition: "all 0.15s ease",
        userSelect: "none",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = item.color;
        (e.currentTarget as HTMLElement).style.backgroundColor = `${item.color}08`;
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
      }}
      title={item.description}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          backgroundColor: `${item.color}14`,
          color: item.color,
          flexShrink: 0,
        }}
      >
        {item.icon}
      </div>
      <div>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#1f2937",
            display: "block",
            lineHeight: 1.3,
          }}
        >
          {item.name}
        </span>
        <span style={{ fontSize: "11px", color: "#9ca3af", lineHeight: 1.3 }}>
          {item.description}
        </span>
      </div>
    </div>
  );
}

export function SectionsPanel() {
  return (
    <div style={{ padding: "12px" }}>
      <h3
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "8px",
          padding: "0 4px",
        }}
      >
        CMS Sections
      </h3>
      <p
        style={{
          fontSize: "11px",
          color: "#9ca3af",
          margin: "0 0 10px",
          padding: "0 4px",
          lineHeight: 1.4,
        }}
      >
        Drag a section to the canvas. It will fetch live data from your CMS modules.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {sectionItems.map((item) => (
          <SectionItem key={item.moduleType} item={item} />
        ))}
      </div>
    </div>
  );
}

export default SectionsPanel;
