import { useNode } from "@craftjs/core";
import { useEffect, useState } from "react";
import {
  Newspaper, FileText, Video, ImageIcon, ShoppingBag,
  Handshake, LayoutGrid, Loader2,
} from "lucide-react";
import { useDeviceMode } from "../VisualBlockEditor";
import api from "../../lib/api";
import { concatImgURL } from "../../config/function";
import { bentoLayouts } from "../../components/blocks/bentobox/bentoLayouts";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type SectionModuleType =
  | "article"
  | "news"
  | "video"
  | "album"
  | "shop"
  | "partner"
  | "bentobox";

export type SectionDisplayStyle = "grid" | "list" | "carousel" | "bento";

export interface CraftSectionProps {
  moduleType?: SectionModuleType;
  displayStyle?: SectionDisplayStyle;
  categoryName?: string;
  partnerTiers?: PartnerTier[];
  limit?: number;
  columns?: number;
  gap?: number;
  showImage?: boolean;
  showTitle?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  cardBorderRadius?: number;
  cardBackgroundColor?: string;
  cardBorderWidth?: number;
  cardBorderColor?: string;
  sectionTitle?: string;
  showSectionTitle?: boolean;
  sectionTitleFontSize?: number;
  sectionTitleColor?: string;
  showCategoryDropdown?: boolean;
  bentoStyle?: string;
  bentoRowHeight?: number;
  bentoItems?: CraftBentoItem[] | string;
  bentoActiveItemIndex?: number;
  padding?: number;
  backgroundColor?: string;
  width?: string;
  height?: string;
  /** Responsive */
  tabletColumns?: number | "";
  mobileColumns?: number | "";
  tabletGap?: number | "";
  mobileGap?: number | "";
  tabletPadding?: number | "";
  mobilePadding?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
  /** Category handling */
  onCategoryChange?: (categoryName: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Module icons & labels                                              */
/* ------------------------------------------------------------------ */
export const MODULE_CONFIG: Record<
  SectionModuleType,
  { label: string; icon: React.ReactNode; color: string; apiPath: string; categoryType: string; categoryApiPath?: string }
> = {
  article: {
    label: "Articles",
    icon: <FileText size={16} />,
    color: "#3b82f6",
    apiPath: "/articles/list-by-category",
    categoryType: "article",
    categoryApiPath: "/category/categories/article",
  },
  news: {
    label: "News",
    icon: <Newspaper size={16} />,
    color: "#ef4444",
    apiPath: "/news",
    categoryType: "news",
    categoryApiPath: "/category/categories/news",
  },
  video: {
    label: "Videos",
    icon: <Video size={16} />,
    color: "#8b5cf6",
    apiPath: "/videos/list-by-category",
    categoryType: "video",
    categoryApiPath: "/category/categories/video",
  },
  album: {
    label: "Albums",
    icon: <ImageIcon size={16} />,
    color: "#10b981",
    apiPath: "/images/albums/list-by-category",
    categoryType: "image",
    categoryApiPath: "/category/categories/image",
  },
  shop: {
    label: "Shop",
    icon: <ShoppingBag size={16} />,
    color: "#f59e0b",
    apiPath: "/shop",
    categoryType: "",
  },
  partner: {
    label: "Partners",
    icon: <Handshake size={16} />,
    color: "#06b6d4",
    apiPath: "/common/common-partners?language_code=en",
    categoryType: "",
  },
  bentobox: {
    label: "BentoBox",
    icon: <LayoutGrid size={16} />,
    color: "#ec4899",
    apiPath: "",
    categoryType: "",
  },
};

const MODULE_LABELS = new Set(
  Object.values(MODULE_CONFIG).map((config) => config.label.toLowerCase())
);

function getSpanFromClassName(className: string, axis: "col" | "row"): number {
  const match = className.match(new RegExp(`${axis}-span-(\\d+)`));
  return match ? Number(match[1]) : 1;
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */
interface FetchedItem {
  id: number | string;
  title: string;
  image: string;
  author?: string;
  date?: string;
  description?: string;
  linkUrl?: string;
  openInNewTab?: boolean;
  buttons?: CraftBentoButton[];
}

export interface CraftBentoButton {
  id?: number | string;
  label?: string;
  url?: string;
  openInNewTab?: boolean;
}

export interface CraftBentoItem {
  id?: number | string;
  title?: string;
  image?: string;
  description?: string;
  linkUrl?: string;
  openInNewTab?: boolean;
  buttons?: CraftBentoButton[];
}

interface Category {
  id: number | string;
  name: string;
}

interface PartnerEntry {
  id: number | string;
  text: string;
  imageUrl: string;
  partnerUrl?: string;
}

interface PartnerTier {
  tierName: string;
  partners: PartnerEntry[];
}

function normalizeNewsCategories(data: any): Category[] {
  console.log("🚀 ~ normalizeNewsCategories ~ data:", data)
  const items = data?.response?.data || [];
  return items.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));
}

function normalizeArticleCategories(data: any): Category[] {
  const items = data?.response?.data || [];
  return items.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));
}

function normalizeVideoCategories(data: any): Category[] {
  console.log("🚀 ~ normalizeVideoCategories ~ data:", data)
  const items = data?.response?.data || [];
  return items.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));
}

function normalizeAlbumCategories(data: any): Category[] {
  const items = data?.response?.data || [];
  return items.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));
}

function normalizeCategories(categoryType: string, data: any): Category[] {
  console.log("🚀 normalizeCategories raw:", data, "categoryType:", categoryType);

  switch (categoryType) {
    case "news":
      return normalizeNewsCategories(data);

    case "article":
      return normalizeArticleCategories(data);

    case "video":
      return normalizeVideoCategories(data);

    case "image":
      return normalizeAlbumCategories(data);


    default:
      return [];
  }
}

function normalizeNews(data: any): FetchedItem[] {
  const items = data?.news || [];
  console.log("🚀 ~ normalizeNews ~ data:", data)
  console.log("🚀 ~ normalizeNews ~ items:", items)

  return items.map((item: any) => ({
    id: item.id,
    title: item.title || "Untitled",
    image: item.hero_image_url || item.banner_url || "",
    author: item.author_name || "",
    date: item.created_at || "",
  }));
}
function normalizeArticles(data: any): FetchedItem[] {
  const items = data?.data || [];

  return items.map((item: any) => ({
    id: item.id,
    title: item.title,
    image: item.hero_image_url || "",
    author: item.author_name || "",
    date: item.published_at || "",
  }));
}
// shop normalize
function normalizeShop(data: any): FetchedItem[] {
  console.log("🚀 ~ normalizeShop ~ data:", data)
  const items = data?.shops || [];

  return items.map((item: any) => ({
    id: item.id,
    title: item.shop_name || item.name || item.title || "Untitled",
    image: item.shop_image_url || "",
    author: item.author_name || "",
    date: item.created_at || "",
  }));
}
function normalizeAlbums(data: any): FetchedItem[] {
  const items = data?.data || [];

  return items.map((item: any) => ({
    id: item.id,
    title: item.name,
    image: item.thumbnail_url || "",
    author: "",
    date: item.created_at || "",
  }));
}
function normalizeVideos(data: any): FetchedItem[] {
  const items = data?.data || [];

  return items.map((item: any) => ({
    id: item.id,
    title: item.title,
    image: item.video_thumbnail || "",
    author: "",
    date: item.created_at || "",
  }));
}

function normalizePartnerEntry(item: any, index: number): PartnerEntry {
  return {
    id: item?.id ?? item?._id ?? item?.partner_id ?? `partner-${index}`,
    text: item?.text || item?.partner_text || item?.title || item?.name || `Partner ${index + 1}`,
    imageUrl:
      item?.imageUrl ||
      item?.image_url ||
      item?.logo ||
      item?.logo_url ||
      item?.hero_image_url ||
      item?.image ||
      "",
    partnerUrl: item?.partner_url || item?.url || item?.link || "",
  };
}

function normalizePartnerTiers(data: any): PartnerTier[] {
  const tierCandidates =
    data?.tiers ??
    data?.content?.tiers ??
    data?.data?.tiers ??
    data?.response?.data?.tiers ??
    [];

  if (Array.isArray(tierCandidates) && tierCandidates.length > 0) {
    return tierCandidates
      .map((tier: any, tierIndex: number) => {
        const tierPartners = Array.isArray(tier?.partners) ? tier.partners : [];
        return {
          tierName: tier?.tierName || tier?.tier_name || tier?.name || `Tier ${tierIndex + 1}`,
          partners: tierPartners.map((partner: any, partnerIndex: number) =>
            normalizePartnerEntry(partner, partnerIndex)
          ),
        };
      })
      .filter((tier: PartnerTier) => tier.partners.length > 0);
  }

  const flatPartners =
    data?.partners ??
    data?.data ??
    data?.response?.data ??
    data?.content?.partners ??
    [];

  if (!Array.isArray(flatPartners) || flatPartners.length === 0) {
    return [];
  }

  const groupedByTier = new Map<string, PartnerEntry[]>();
  flatPartners.forEach((partner: any, index: number) => {
    const tierName = partner?.tierName || partner?.tier_name || partner?.tier || "Partners";
    const normalizedPartner = normalizePartnerEntry(partner, index);
    const current = groupedByTier.get(tierName) || [];
    groupedByTier.set(tierName, [...current, normalizedPartner]);
  });

  return Array.from(groupedByTier.entries()).map(([tierName, partners]) => ({
    tierName,
    partners,
  }));
}

function applyPartnerTierLimit(tiers: PartnerTier[], limit: number): PartnerTier[] {
  let remaining = Math.max(limit, 0);
  if (remaining === 0) return [];

  const limitedTiers: PartnerTier[] = [];
  for (const tier of tiers) {
    if (remaining <= 0) break;
    const tierPartners = tier.partners.slice(0, remaining);
    if (tierPartners.length > 0) {
      limitedTiers.push({ ...tier, partners: tierPartners });
      remaining -= tierPartners.length;
    }
  }

  return limitedTiers;
}

function flattenPartnerTiersToItems(tiers: PartnerTier[]): FetchedItem[] {
  return tiers.flatMap((tier) =>
    tier.partners.map((partner, index) => ({
      id: `${tier.tierName}-${partner.id}-${index}`,
      title: partner.text,
      image: partner.imageUrl,
      author: "",
      date: "",
    }))
  );
}

function placeholderPartnerTiers(count: number): PartnerTier[] {
  const partnerCount = Math.max(count, 1);
  return [
    {
      tierName: "Tier 1",
      partners: Array.from({ length: partnerCount }, (_, index) => ({
        id: `partner-placeholder-${index}`,
        text: `Partner ${index + 1}`,
        imageUrl: "",
        partnerUrl: "",
      })),
    },
  ];
}

function normalizePartnerTiersFromProp(tiers: PartnerTier[] | undefined): PartnerTier[] {
  if (!Array.isArray(tiers)) {
    return [];
  }

  return tiers
    .map((tier: PartnerTier, tierIndex: number) => {
      const rawPartners = Array.isArray(tier?.partners) ? tier.partners : [];
      return {
        tierName: tier?.tierName || `Tier ${tierIndex + 1}`,
        partners: rawPartners.map((partner: PartnerEntry, partnerIndex: number) =>
          normalizePartnerEntry(partner, partnerIndex)
        ),
      };
    })
    .filter((tier: PartnerTier) => tier.partners.length > 0);
}

function normalizeItems(moduleType: SectionModuleType, data: any): FetchedItem[] {
  console.log("🚀 normalizeItems raw:", data);

  switch (moduleType) {
    case "news":
      return normalizeNews(data);

    case "article":
      return normalizeArticles(data);

    case "video":
      return normalizeVideos(data);

    case "album":
      return normalizeAlbums(data);

    case "shop":
      return normalizeShop(data);

    case "partner":
      return flattenPartnerTiersToItems(normalizePartnerTiers(data));

    default:
      return [];
  }
}

/* ------------------------------------------------------------------ */
/*  Placeholder cards for editor preview                               */
/* ------------------------------------------------------------------ */
function placeholderItems(moduleType: SectionModuleType, count: number): FetchedItem[] {
  const cfg = MODULE_CONFIG[moduleType];
  return Array.from({ length: count }, (_, i) => ({
    id: `placeholder-${i}`,
    title: `${cfg.label} Item ${i + 1}`,
    image: "",
    author: "Author Name",
    date: new Date().toISOString(),
  }));
}

function normalizeBentoItems(value: CraftBentoItem[] | string | undefined): FetchedItem[] {
  let rawItems: any[] = [];

  if (Array.isArray(value)) {
    rawItems = value;
  } else if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      rawItems = Array.isArray(parsed) ? parsed : [];
    } catch {
      rawItems = [];
    }
  }

  return rawItems
    .map((item, index) => ({
      id: item?.id ?? `custom-bento-${index}`,
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
          id: button?.id ?? `custom-bento-${index}-button-${buttonIndex}`,
          label: typeof button?.label === "string" ? button.label : "",
          url: typeof button?.url === "string" ? button.url : "",
          openInNewTab: button?.openInNewTab !== false,
        })).filter((button: CraftBentoButton) => button.label || button.url)
        : [],
    }))
    .filter((item) => item.title || item.image || item.description || item.linkUrl || item.buttons.length > 0);
}

/* ------------------------------------------------------------------ */
/*  CraftSection component                                             */
/* ------------------------------------------------------------------ */
export const CraftSection = ({
  moduleType = "article",
  displayStyle = "grid",
  categoryName = "",
  partnerTiers = [],
  limit = 6,
  columns = 3,
  gap = 16,
  showImage = true,
  showTitle = true,
  showDate = true,
  showAuthor = true,
  cardBorderRadius = 8,
  cardBackgroundColor = "#ffffff",
  cardBorderWidth = 1,
  cardBorderColor = "#e5e7eb",
  sectionTitle = "",
  showSectionTitle = true,
  sectionTitleFontSize = 24,
  sectionTitleColor = "#1f2937",
  showCategoryDropdown = false,
  bentoStyle = "1V2H",
  bentoRowHeight = 160,
  bentoItems: bentoItemsProp = [],
  bentoActiveItemIndex = 0,
  padding = 16,
  backgroundColor = "transparent",
  width = "100%",
  height = "",
  tabletColumns = "",
  mobileColumns = "",
  tabletGap = "",
  mobileGap = "",
  tabletPadding = "",
  mobilePadding = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
  onCategoryChange,
}: CraftSectionProps) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();

  const [items, setItems] = useState<FetchedItem[]>([]);
  const [resolvedPartnerTiers, setResolvedPartnerTiers] = useState<PartnerTier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState(categoryName);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Device mode
  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try { device = useDeviceMode(); } catch { /* */ }

  const isHiddenForDevice =
    (device === "mobile" && hideOnMobile) ||
    (device === "tablet" && hideOnTablet) ||
    (device === "desktop" && hideOnDesktop);

  // Keep local category state in sync with external prop changes
  useEffect(() => {
    setSelectedCategoryName(categoryName || "");
  }, [moduleType, categoryName]);

  // Fetch categories from API
  useEffect(() => {
    if (isHiddenForDevice) {
      setLoadingCategories(false);
      return;
    }

    const cfg = MODULE_CONFIG[moduleType];
    if (!cfg.categoryApiPath) {
      setCategories([]);
      return;
    }

    setLoadingCategories(true);

    api
      .get(cfg.categoryApiPath)
      .then((res: any) => {
        const normalized = normalizeCategories(cfg.categoryType, res?.data || res);
        setCategories(normalized);
      })
      .catch(() => {
        setCategories([]);
      })
      .finally(() => setLoadingCategories(false));
  }, [moduleType, isHiddenForDevice]);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryName = e.target.value;
    setSelectedCategoryName(newCategoryName);
    if (onCategoryChange) {
      onCategoryChange(newCategoryName);
    }
  };

  // Responsive overrides
  let activeColumns = columns;
  let activeGap = gap;
  let activePadding = padding;

  if (device === "tablet") {
    if (tabletColumns !== "" && tabletColumns !== undefined) activeColumns = Number(tabletColumns);
    if (tabletGap !== "" && tabletGap !== undefined) activeGap = Number(tabletGap);
    if (tabletPadding !== "" && tabletPadding !== undefined) activePadding = Number(tabletPadding);
  } else if (device === "mobile") {
    if (tabletColumns !== "" && tabletColumns !== undefined) activeColumns = Number(tabletColumns);
    if (mobileColumns !== "" && mobileColumns !== undefined) activeColumns = Number(mobileColumns);
    if (tabletGap !== "" && tabletGap !== undefined) activeGap = Number(tabletGap);
    if (mobileGap !== "" && mobileGap !== undefined) activeGap = Number(mobileGap);
    if (tabletPadding !== "" && tabletPadding !== undefined) activePadding = Number(tabletPadding);
    if (mobilePadding !== "" && mobilePadding !== undefined) activePadding = Number(mobilePadding);
  }

  // Fetch data from API
  useEffect(() => {
    if (isHiddenForDevice) {
      setLoading(false);
      return;
    }

    if (moduleType === "partner") {
      const normalizedCustomTiers = normalizePartnerTiersFromProp(partnerTiers);
      if (normalizedCustomTiers.length > 0) {
        const limitedCustomTiers = applyPartnerTierLimit(normalizedCustomTiers, limit);
        setResolvedPartnerTiers(limitedCustomTiers);
        setItems(flattenPartnerTiersToItems(limitedCustomTiers));
        setLoading(false);
        setError("");
        return;
      }
    }

    const cfg = MODULE_CONFIG[moduleType];
    if (!cfg.apiPath) {
      setItems(placeholderItems(moduleType, limit));
      if (moduleType === "partner") {
        setResolvedPartnerTiers(placeholderPartnerTiers(limit));
      } else {
        setResolvedPartnerTiers([]);
      }
      return;
    }

    if (moduleType !== "partner") {
      setResolvedPartnerTiers([]);
    }

    setLoading(true);
    setError("");

    const params: Record<string, any> = {};
    if (selectedCategoryName) params.category_name = selectedCategoryName;
    if (moduleType === "shop") {
      params.page = 1;
      params.limit = limit;
    }

    api
      .get(cfg.apiPath, { params })
      .then((res: any) => {
        const responseData = res?.data || res;

        if (moduleType === "partner") {
          const normalizedTiers = normalizePartnerTiers(responseData);
          const limitedTiers = applyPartnerTierLimit(normalizedTiers, limit);

          if (limitedTiers.length > 0) {
            setResolvedPartnerTiers(limitedTiers);
            setItems(flattenPartnerTiersToItems(limitedTiers));
            return;
          }

          const placeholderTiers = placeholderPartnerTiers(limit);
          setResolvedPartnerTiers(placeholderTiers);
          setItems(flattenPartnerTiersToItems(placeholderTiers));
          return;
        }

        const normalized = normalizeItems(moduleType, responseData);
        setItems(
          normalized.length > 0 ? normalized.slice(0, limit) : placeholderItems(moduleType, limit)
        );
      })
      .catch(() => {
        setError("Failed to load");
        if (moduleType === "partner") {
          const placeholderTiers = placeholderPartnerTiers(limit);
          setResolvedPartnerTiers(placeholderTiers);
          setItems(flattenPartnerTiersToItems(placeholderTiers));
        } else {
          setItems(placeholderItems(moduleType, limit));
        }
      })
      .finally(() => setLoading(false));
  }, [moduleType, selectedCategoryName, limit, isHiddenForDevice, partnerTiers]);

  const cfg = MODULE_CONFIG[moduleType];
  const trimmedSectionTitle = typeof sectionTitle === "string" ? sectionTitle.trim() : "";
  const normalizedCurrentModuleLabel = cfg.label.toLowerCase();
  const isStaleModuleLabel =
    Boolean(trimmedSectionTitle) &&
    MODULE_LABELS.has(trimmedSectionTitle.toLowerCase()) &&
    trimmedSectionTitle.toLowerCase() !== normalizedCurrentModuleLabel;
  const displayTitle = trimmedSectionTitle && !isStaleModuleLabel ? sectionTitle : cfg.label;
  const isBentoLayout = moduleType === "bentobox" || displayStyle === "bento";
  const fallbackBentoStyle = Object.keys(bentoLayouts)[0] || "1V2H";
  const activeBentoStyle = bentoLayouts[bentoStyle] ? bentoStyle : fallbackBentoStyle;
  const bentoLayout = bentoLayouts[activeBentoStyle] || [];
  const normalizedBentoLayout =
    bentoLayout.length > 0 ? bentoLayout : [{ className: "col-span-12 row-span-1" }];
  const isPartnerLayout = moduleType === "partner";
  const clampedColumns = Math.max(Number(activeColumns) || 1, 1);
  const customBentoItems = normalizeBentoItems(bentoItemsProp);

  const getPartnerItemsContainerStyle = (): React.CSSProperties => {
    if (displayStyle === "carousel") {
      return {
        display: "flex",
        gap: `${activeGap}px`,
        overflowX: "auto",
        paddingBottom: "4px",
      };
    }

    if (displayStyle === "list") {
      return {
        display: "flex",
        flexDirection: "column",
        gap: `${activeGap}px`,
      };
    }

    return {
      display: "grid",
      gridTemplateColumns: `repeat(${clampedColumns}, minmax(0, 1fr))`,
      gap: `${activeGap}px`,
    };
  };

  // ---- Card renderer ----
  const renderCard = (item: FetchedItem) => (
    <div
      key={item.id}
      style={{
        backgroundColor: cardBackgroundColor,
        borderRadius: `${cardBorderRadius}px`,
        border: `${cardBorderWidth}px solid ${cardBorderColor}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {showImage && (
        <div
          style={{
            width: "100%",
            height: "160px",
            backgroundColor: "#f3f4f6",
            overflow: "hidden",
          }}
        >
          {item.image ? (
            <img
              src={concatImgURL(item.image)}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              draggable={false}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: cfg.color,
                opacity: 0.4,
              }}
            >
              {cfg.icon}
            </div>
          )}
        </div>
      )}
      <div style={{ padding: "12px", flex: 1 }}>
        {showTitle && (
          <h4
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#1f2937",
              margin: "0 0 6px",
              lineHeight: 1.3,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.title}
          </h4>
        )}
        {showAuthor && item.author && (
          <span style={{ fontSize: "12px", color: "#6b7280" }}>{item.author}</span>
        )}
        {showDate && item.date && (
          <span style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginTop: "4px" }}>
            {new Date(item.date).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );

  // ---- List-style card ----
  const renderListCard = (item: FetchedItem) => (
    <div
      key={item.id}
      style={{
        backgroundColor: cardBackgroundColor,
        borderRadius: `${cardBorderRadius}px`,
        border: `${cardBorderWidth}px solid ${cardBorderColor}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        gap: "12px",
        padding: "10px",
        alignItems: "center",
      }}
    >
      {showImage && (
        <div
          style={{
            width: "80px",
            height: "60px",
            borderRadius: `${Math.max(cardBorderRadius - 2, 0)}px`,
            backgroundColor: "#f3f4f6",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              draggable={false}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: cfg.color,
                opacity: 0.4,
              }}
            >
              {cfg.icon}
            </div>
          )}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {showTitle && (
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#1f2937",
              margin: 0,
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.title}
          </h4>
        )}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
          {showAuthor && item.author && (
            <span style={{ fontSize: "11px", color: "#6b7280" }}>{item.author}</span>
          )}
          {showDate && item.date && (
            <span style={{ fontSize: "11px", color: "#9ca3af" }}>
              {new Date(item.date).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const renderPartnerCard = (partner: PartnerEntry, tierIndex: number, partnerIndex: number) => {
    const hasImage = showImage && Boolean(partner.imageUrl);
    const partnerTitle = partner.text || `Partner ${partnerIndex + 1}`;
    const cardContent = (
      <div
        style={{
          backgroundColor: cardBackgroundColor,
          borderRadius: `${cardBorderRadius}px`,
          border: `${cardBorderWidth}px solid ${cardBorderColor}`,
          overflow: "hidden",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          minHeight: "110px",
          flex: displayStyle === "carousel" ? "0 0 180px" : undefined,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "56px",
            borderRadius: `${Math.max(cardBorderRadius - 2, 0)}px`,
            backgroundColor: "#f3f4f6",
            border: `1px solid ${cardBorderColor}`,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {hasImage ? (
            <img
              src={concatImgURL(partner.imageUrl)}
              alt={partnerTitle}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              draggable={false}
            />
          ) : (
            <span style={{ fontSize: "12px", color: "#6b7280" }}>No Image</span>
          )}
        </div>
        {showTitle && (
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              fontWeight: 600,
              color: "#1f2937",
              textAlign: "center",
              lineHeight: 1.3,
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {partnerTitle}
          </p>
        )}
      </div>
    );

    if (partner.partnerUrl) {
      return (
        <a
          key={`${tierIndex}-${partner.id}-${partnerIndex}`}
          href={partner.partnerUrl}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {cardContent}
        </a>
      );
    }

    return <div key={`${tierIndex}-${partner.id}-${partnerIndex}`}>{cardContent}</div>;
  };

  const renderPartnerTier = (tier: PartnerTier, tierIndex: number) => (
    <div key={`${tier.tierName}-${tierIndex}`} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h4
        style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: 700,
          color: "#111827",
          textTransform: "uppercase",
        }}
      >
        {tier.tierName}
      </h4>
      <div style={getPartnerItemsContainerStyle()}>
        {tier.partners.map((partner, partnerIndex) => renderPartnerCard(partner, tierIndex, partnerIndex))}
      </div>
    </div>
  );

  const renderBentoCard = (item: FetchedItem, index: number) => {
    const bentoCell = normalizedBentoLayout[index % normalizedBentoLayout.length];
    const colSpan = getSpanFromClassName(bentoCell.className, "col");
    const rowSpan = getSpanFromClassName(bentoCell.className, "row");
    const isSmallDevice = device === "mobile";
    const hasImage = showImage && Boolean(item.image);
    const isActiveBentoItem = index === bentoActiveItemIndex;
    const itemButtons = Array.isArray(item.buttons) ? item.buttons : [];
    const handleSelectBentoItem = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setProp((props: CraftSectionProps) => {
        props.bentoActiveItemIndex = index;
      });
    };
    const cardStyle: React.CSSProperties = {
      gridColumn: isSmallDevice ? "span 1 / span 1" : `span ${colSpan} / span ${colSpan}`,
      gridRow: isSmallDevice ? "span 1 / span 1" : `span ${rowSpan} / span ${rowSpan}`,
      backgroundColor: cardBackgroundColor,
      borderRadius: `${cardBorderRadius}px`,
      border: `${cardBorderWidth}px solid ${cardBorderColor}`,
      overflow: "hidden",
      position: "relative",
      minHeight: `${bentoRowHeight}px`,
      display: "block",
      color: "inherit",
      textDecoration: "none",
      cursor: "pointer",
      outline: isActiveBentoItem ? "2px solid #f59e0b" : undefined,
      outlineOffset: isActiveBentoItem ? "2px" : undefined,
    };

    const content = (
      <>
        {hasImage ? (
          <>
            <img
              src={concatImgURL(item.image)}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              draggable={false}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
                pointerEvents: "none",
              }}
            />
          </>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#f6f6f6",
              display: "flex",
              alignItems: "flex-end",
              padding: "12px",
              color: "#111827",
              fontSize: "13px",
              fontWeight: 700,
            }}
          />
        )}

        {(showTitle || item.description) && (
          <div
            style={{
              position: "absolute",
              left: "10px",
              bottom: "8px",
              maxWidth: itemButtons.length > 0 ? "58%" : "calc(100% - 20px)",
              margin: 0,
              color: hasImage ? "#ffffff" : "#111827",
              lineHeight: 1.2,
              textShadow: hasImage ? "0 1px 2px rgba(0,0,0,0.35)" : undefined,
            }}
          >
            {showTitle && (
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </p>
            )}
            {item.description && (
              <p
                style={{
                  margin: showTitle ? "4px 0 0" : 0,
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  opacity: 0.92,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.description}
              </p>
            )}
          </div>
        )}
        {itemButtons.length > 0 && (
          <div
            style={{
              position: "absolute",
              right: "10px",
              bottom: "8px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: "6px",
              maxWidth: "40%",
            }}
          >
            {itemButtons.map((button, buttonIndex) => (
              <a
                key={`${button.id || buttonIndex}`}
                href={button.url || "#"}
                target={button.openInNewTab === false ? undefined : "_blank"}
                rel={button.openInNewTab === false ? undefined : "noreferrer"}
                onClick={(event) => {
                  event.stopPropagation();
                  if (!button.url) {
                    event.preventDefault();
                  }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "26px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  backgroundColor: hasImage ? "rgba(255,255,255,0.92)" : "#111827",
                  color: hasImage ? "#111827" : "#ffffff",
                  fontSize: "11px",
                  fontWeight: 700,
                  lineHeight: 1,
                  textDecoration: "none",
                  boxShadow: hasImage ? "0 1px 3px rgba(0,0,0,0.18)" : undefined,
                }}
              >
                {button.label || `Button ${buttonIndex + 1}`}
              </a>
            ))}
          </div>
        )}
      </>
    );

    if (item.linkUrl && itemButtons.length === 0) {
      return (
        <a
          key={`${item.id}-${index}`}
          href={item.linkUrl}
          target={item.openInNewTab === false ? undefined : "_blank"}
          rel={item.openInNewTab === false ? undefined : "noreferrer"}
          style={cardStyle}
          onClick={handleSelectBentoItem}
        >
          {content}
        </a>
      );
    }

    return (
      <div key={`${item.id}-${index}`} style={cardStyle} onClick={handleSelectBentoItem}>
        {content}
      </div>
    );
  };

  const requiredBentoItems = Math.max(
    isBentoLayout ? limit : normalizedBentoLayout.length,
    customBentoItems.length,
    normalizedBentoLayout.length,
    1
  );
  const defaultBentoItems = placeholderItems(moduleType, requiredBentoItems);
  const bentoSource = customBentoItems.length > 0
    ? customBentoItems
    : (items.length > 0 ? items : defaultBentoItems);
  const bentoItems = Array.from({ length: requiredBentoItems }, (_, index) => {
    return bentoSource[index] || defaultBentoItems[index];
  });
  const bentoItemsPerPage = Math.max(normalizedBentoLayout.length, 1);
  const bentoPages = Array.from(
    { length: Math.ceil(bentoItems.length / bentoItemsPerPage) },
    (_, pageIndex) =>
      bentoItems.slice(pageIndex * bentoItemsPerPage, (pageIndex + 1) * bentoItemsPerPage)
  );

  if (isHiddenForDevice) {
    return (
      <div
        ref={(ref) => { if (ref) connect(drag(ref)); }}
        style={{ display: "none" }}
      />
    );
  }

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      style={{
        padding: `${activePadding}px`,
        backgroundColor,
        boxSizing: "border-box",
        maxWidth: "100%",
        cursor: "grab",
        width: width || "100%",
        height: height || undefined,
      }}
    >
      {/* Section header */}
      {showSectionTitle && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: `${activeGap}px`,
          }}
        >
          <div
            style={{
              width: "4px",
              height: `${sectionTitleFontSize}px`,
              backgroundColor: cfg.color,
              borderRadius: "2px",
            }}
          />
          <h3
            style={{
              fontSize: `${sectionTitleFontSize}px`,
              fontWeight: 700,
              color: sectionTitleColor,
              margin: 0,
            }}
          >
            {displayTitle}
          </h3>
          {loading && <Loader2 size={16} className="animate-spin" style={{ color: "#9ca3af" }} />}
        </div>
      )}

      {/* Category dropdown */}
      {showCategoryDropdown && categories.length > 0 && (
        <div style={{ marginBottom: `${activeGap}px` }}>
          <select
            value={selectedCategoryName}
            onChange={handleCategoryChange}
            disabled={loadingCategories}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "4px",
              border: `1px solid ${cardBorderColor}`,
              backgroundColor: cardBackgroundColor,
              fontSize: "14px",
              cursor: loadingCategories ? "not-allowed" : "pointer",
              opacity: loadingCategories ? 0.6 : 1,
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {error && !loading && items.length === 0 && (
        <div style={{ fontSize: "12px", color: "#ef4444", padding: "8px 0" }}>{error}</div>
      )}

      {/* Content grid / list */}
      {isPartnerLayout ? (
        <div style={{ display: "flex", flexDirection: "column", gap: `${activeGap}px` }}>
          {resolvedPartnerTiers.map((tier, tierIndex) => renderPartnerTier(tier, tierIndex))}
        </div>
      ) : isBentoLayout ? (
        <div
          style={{
            display: "flex",
            gap: `${activeGap}px`,
            overflowX: "auto",
            overflowY: "hidden",
            paddingBottom: "4px",
            scrollSnapType: "x proximity",
          }}
        >
          {bentoPages.map((pageItems, pageIndex) => (
            <div
              key={`bento-page-${pageIndex}`}
              style={{
                display: "grid",
                gridTemplateColumns: device === "mobile" ? "1fr" : "repeat(12, minmax(0, 1fr))",
                gap: `${activeGap}px`,
                gridAutoRows: `${bentoRowHeight}px`,
                gridAutoFlow: "dense",
                flex: "0 0 100%",
                minWidth: 0,
                scrollSnapAlign: "start",
              }}
            >
              {pageItems.map((item, itemIndex) =>
                renderBentoCard(item, pageIndex * bentoItemsPerPage + itemIndex)
              )}
            </div>
          ))}
        </div>
      ) : displayStyle === "list" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: `${activeGap}px` }}>
          {items.map(renderListCard)}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${clampedColumns}, minmax(0, 1fr))`,
            gap: `${activeGap}px`,
          }}
        >
          {items.map(renderCard)}
        </div>
      )}
    </div>
  );
};

CraftSection.craft = {
  displayName: "Section",
  props: {
    moduleType: "article",
    displayStyle: "grid",
    categoryName: "",
    partnerTiers: [],
    limit: 6,
    columns: 3,
    gap: 16,
    showImage: true,
    showTitle: true,
    showDate: true,
    showAuthor: true,
    cardBorderRadius: 8,
    cardBackgroundColor: "#ffffff",
    cardBorderWidth: 1,
    cardBorderColor: "#e5e7eb",
    sectionTitle: "",
    showSectionTitle: true,
    sectionTitleFontSize: 24,
    sectionTitleColor: "#1f2937",
    showCategoryDropdown: false,
    bentoStyle: "1V2H",
    bentoRowHeight: 160,
    bentoItems: [],
    bentoActiveItemIndex: 0,
    padding: 16,
    backgroundColor: "transparent",
    width: "100%",
    height: "",
    tabletColumns: "",
    mobileColumns: "",
    tabletGap: "",
    mobileGap: "",
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

export default CraftSection;
