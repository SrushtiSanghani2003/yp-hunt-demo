import type { QuizState } from "../../../redux-toolkit/quizSlice";

export const normalizeQuizResponse = (data: any): QuizState => ({
  translation: {
    language_code: "en",
    title: data.translations[0].title ?? null,
    description: data.translations[0].description ?? null,
    quiz_image_url: data.translations[0].quiz_image_url ?? null,
  },
  tag_ids: data.tags?.map((tag: any) => tag.id) ?? [],
  category_ids: data.categories?.map((cat: any) => cat.id) ?? [],
  player_ids: data.players?.map((p: any) => p.id) ?? [],

  status: data.status ?? "published",
  scheduled_at: data.scheduled_at ?? null,
  published_at: data.published_at ?? null,
  secret_key: data.secret_key ?? null,

  must_be_logged_in: data.must_be_logged_in ?? false,
  must_be_verified: data.must_be_verified ?? false,
  must_be_over_18: data.must_be_over_18 ?? false,

  geo_block_mode: data.geo_block_mode ?? null,
  geo_block_countries: data.geo_block_countries ?? [],

  publish_platforms: data.publish_platforms ?? [],
  restriction_type: data.restriction_type ?? "free",
  entitlements: data.entitlements ?? [],

  metadata: {
    seo_title: data.metadata?.seo_title ?? "",
    seo_tag: data.metadata?.seo_tag ?? "",
    seo_description: data.metadata?.seo_description ?? "",
  },
});
