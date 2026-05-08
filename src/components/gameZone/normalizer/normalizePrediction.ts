import type { PredictionState } from "../../../redux-toolkit/predictionSlice";

export const normalizePredictionResponse = (data: any): PredictionState => ({
  status: data.status ?? "published",
  published_at: data.published_at ?? null,
  scheduled_at: data.scheduled_at ?? null,
  publish_platforms: data.publish_platforms ?? [],
  restriction_type: data.restriction_type ?? "free",
  entitlements: data.entitlements ?? [],
  must_be_logged_in: data.must_be_logged_in ?? false,
  must_be_verified: data.must_be_verified ?? false,
  must_be_over_18: data.must_be_over_18 ?? false,

  geo_block_mode: data.geo_block_mode ?? null,
  geo_block_countries: data.geo_block_countries ?? [],
  metadata: {
    seo_title: data.metadata?.seo_title ?? "",
    seo_tag: data.metadata?.seo_tag ?? "",
    seo_description: data.metadata?.seo_description ?? "",
  },
  tag_ids: data.tags?.map((tag: any) => tag.id) ?? [],
  category_ids: data.categories?.map((cat: any) => cat.id) ?? [],
  player_ids: data.players?.map((p: any) => p.id) ?? [],
  translation: {
    language_code: "en",
    title: data.translation.title ?? null,
    description: data.translation.description ?? null,
    prediction_image_url: data.translation.prediction_image_url ?? null,
  },
});
