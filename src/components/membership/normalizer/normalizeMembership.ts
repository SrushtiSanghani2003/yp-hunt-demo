import type { MembershipState, MembershipVariant } from "../../../redux-toolkit/membershipSlice";

export const normalizeMembership = (
  data: any,
  languageCode: string | null = "en"
): MembershipState => {
  // Map API packages → MembershipVariant
  const variants: MembershipVariant[] = (data.packages || []).map((pkg: any, idx: number) => ({
    id: String(idx),
    type: pkg.type?.toLowerCase() || "",
    name: pkg.packageTranslation?.title || "",
    description: pkg.packageTranslation?.description || "",
    price: pkg.price != null ? Number(pkg.price) : 0,
    currency: normalizeCurrency(pkg.currency) || "",
    allowed_for: normalizeAllowedFor(pkg.allowed_for) || "",
    note: pkg.packageTranslation?.note || "",
    vat: Number(pkg.valued_added_tax) || 0, 
  }));

  return {
    id: data.id ?? null,
    type: data.type?.toLowerCase() || "",
    title: data.translation?.title ?? "",
    overview: data.translation?.description ?? "",
    other_details: data.translation?.other_details ?? "",
    thumbnail_url: data.image ?? null,
    button_text: data.translation?.button_label ?? "",
    button_link: data.translation?.button_url ?? "",
    status: data.status ?? "draft",
    variants: variants || [],
    metadata: {
      seo_title: data.metadata?.seo_title ?? "",
      seo_tag: data.metadata?.seo_tag ?? "",
      seo_description: data.metadata?.seo_description ?? "",
    },
    translation: {
      language_code: languageCode || data.translation?.language_code || "en",
      name: data.translation?.title ?? "",
      description: data.translation?.description ?? "",
      other_details: data.translation?.other_details ?? "",
      locale: data.translation?.language_code ?? "en",
    },
  };
};

// Helper to normalize currency symbols
const normalizeCurrency = (symbol: string): string => {
  switch (symbol) {
   
    case "$":
      return "$";
    case "£":
      return "£";
    default:
      return symbol || "£"; // fallback
  }
};

const normalizeAllowedFor = (allowedFor: string): string => {
  switch (allowedFor?.toLowerCase()) {
    case "per person":
      return "per person";
    case "per adult":
      return "per adult";
    case "per child":
      return "per child";
    default:
      return allowedFor?.toLowerCase() || "per person";
  }
};
