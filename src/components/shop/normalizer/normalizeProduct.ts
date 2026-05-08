import type { ProductState } from "../../../redux-toolkit/productSlice";

export const normalizeProductResponse = (
  data: any,
  languageCode: string | null
): ProductState => ({
  shop_id: data.shop_id || null,
  category_ids: data.categories?.map((cat: any) => cat.id) ?? [],
  tag_ids: data.tags?.map((tag: any) => tag.id) ?? [],
  type: data.type || "simple",
  status: data.status ?? "draft",
  published_at: data.published_at ?? null,
  scheduled_at: data.scheduled_at ?? null,
  thumbnail_url: data.thumbnail_url ?? null,
  price: data.price ? Number(data.price) : null,
  is_taxable: data.is_taxable ?? false,
  tax_percent: data.tax_percent ? String(data.tax_percent) : null,
  geo_block_mode: data.geo_block_mode ?? null,
  geo_block_countries: data.geo_block_countries ?? [],
  must_be_logged_in: data.must_be_logged_in ?? false,
  must_be_verified: data.must_be_verified ?? false,
  must_be_over_18: data.must_be_over_18 ?? false,
  restriction_type: data.restriction_type ?? "free",
  entitlements: data.entitlements ?? [],
  publish_platforms: data.publish_platforms ?? [],
  read_time: data.read_time ?? 0,
  metadata: {
    seo_title: data.metadata?.seo_title ?? "",
    seo_tag: data.metadata?.seo_tag ?? "",
    seo_description: data.metadata?.seo_description ?? "",
  },
  translation: {
    language_code: languageCode || "en",
    name: data.name ?? null,
    description: data.description ?? null,
    locale: data.locale ?? null,
  },

  discount: data.discount.map((d: any) => ({
    discount_type: d.discount_type || "flat",
    value: d.value != null ? Number(d.value) : null,
    valid_from: d.valid_from ?? null,
    valid_to: d.valid_to ?? null,
  })),
  variants: data.variants.map((v: any) => ({
    attributes: {
      size: v.attributes?.size || "",
      color: v.attributes?.color || "",
      material: v.attributes?.material || "",
    },
    sku: (v.sku) || 0,
    price: Number(v.price) || 0,
    stock_quantity: Number(v.stock_quantity) || 0,
  })),
  media: data.media.map((m: any) => ({
    media_type:
      m.media_type ||
      (m.media_url?.match(/\.(mp4|webm|ogg)$/i) ? "video" : "image"),
    media_url: m.media_url ?? null,
    sort_order: m.sort_order ?? 0,
    media_source: m.media_source || "default",
  })),
});
