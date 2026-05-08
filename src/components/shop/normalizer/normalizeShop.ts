import type { ShopState } from "../../../redux-toolkit/shopSlice";

export const normalizeShopResponse = (
  data: any,
  languageCode: string | null,
): ShopState => ({
  status: data.status ?? "draft",
  published_at: data.published_at ?? null,
  scheduled_at: data.scheduled_at ?? null,
  restriction_type: data.restriction_type ?? "free",
  entitlements: data.entitlements ?? [],
  must_be_logged_in: data.must_be_logged_in ?? false,
  must_be_verified: data.must_be_verified ?? false,
  must_be_over_18: data.must_be_over_18 ?? false,
  publish_platforms: data.publish_platforms ?? [],
  geo_block_mode: data.geo_block_mode ?? null,
  geo_block_countries: data.geo_block_countries ?? [],
  metadata: {
    seo_title: data.metadata?.seo_title ?? "",
    seo_tag: data.metadata?.seo_tag ?? "",
    seo_description: data.metadata?.seo_description ?? "",
  },
  translation: {
    language_code: languageCode || "en",
    shop_image_url: data.shop_image_url ?? null,
    shop_mobile_image_url: data.shop_mobile_image_url ?? null,
    redirect_url: data.redirect_url ?? null,
    description: data.description ?? null,
    sponsor_name: data.sponsor_name ?? null,
    sponsor_logo_url: data.sponsor_logo_url ?? null,
    sponsor_url: data.sponsor_url ?? null,
    author_name: data.author_name ?? null,
    author_title: data.author_title ?? null,
    author_image_url: data.author_image_url ?? null,
    author_social_urls: data.author_social_urls ?? {},
  },
});
