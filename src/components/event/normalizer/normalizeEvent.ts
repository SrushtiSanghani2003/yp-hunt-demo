import type { EventState } from "../../../redux-toolkit/eventsSlice";

export const normalizeEventResponse = (
  data: any,
  languageCode: string | null
): EventState => ({
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
  tag_ids: data.tags?.map((tag: any) => tag.id) ?? [],
  category_ids: data.categories?.map((cat: any) => cat.id) ?? [],
  player_ids: data.players?.map((p: any) => p.id) ?? [],
  logo_url: data?.logo_url || null,
  location: data.location || null,
  longitude: data.longitude || null,
  latitude: data.latitude || null,
  start_at: data.start_at || null,
  event_type_id: data.event_type_id || null,
  image: data?.image || null,


  metadata: {
    seo_title: data.metadata?.seo_title ?? "",
    seo_tag: data.metadata?.seo_tag ?? "",
    seo_description: data.metadata?.seo_description ?? "",
  },
  translation: {
    language_code: languageCode || "en",
    title: data.title ?? null,
    sponsor_name: data.sponsor_name ?? null,
    sponsor_logo_url: data.sponsor_logo_url ?? null,
    sponsor_url: data.sponsor_url ?? null,
    author_name: data.author_name ?? null,
    author_title: data.author_title ?? null,
    author_image_url: data.author_image_url ?? null,
    author_social_urls: data.author_social_urls ?? {},
    button_label: data?.button_label ?? "",
    button_url: data?.button_url ?? "",
  },
  // media:
  //   data.media.map((m: any) => ({
  //     media_type: m.media_type,
  //     media_url: m.media_url,
  //     sort_order: m.sort_order,
  //     media_source: m.media_source,
  //   })) ?? [],
});
