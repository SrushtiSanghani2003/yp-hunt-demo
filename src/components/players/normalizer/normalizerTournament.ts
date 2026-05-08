import type { PlayerState } from "../../../redux-toolkit/playersSlice";

export const normalizePlayerResponse = (
  data: any,
  languageCode: string | null,
): PlayerState => {
  return {
    external_player_id: data.external_player_id ?? null,
    first_name: data.first_name ?? "",
    last_name: data.last_name ?? "",
    display_name:
      data.display_name ??
      `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),

    gender: data.gender ?? null,
    country_code: data.country_code ?? null,
    country_code_iso_2: data.country_code_iso_2 ?? null,
    date_of_birth: data.date_of_birth ?? null,
    height_cm: data.height_cm ?? null,
    weight_kg: data.weight_kg ?? null,
    pro_year: data.pro_year ?? null,
    dominant_hand: data.dominant_hand ?? null,
    ranking: data.ranking ?? null,
    team_id: data.team_id ?? null,
    status: data.status ?? "active",

    career_prize_money: data.career_prize_money ?? "0.00",
    ytd_prize_money: data.ytd_prize_money ?? "0.00",

    profile_image_url: data.profile_image_url ?? null,
    background_img: data.background_img ?? null,
    next_previous_img: data.next_previous_img ?? null,
    match_center_img: data.match_center_img ?? null,

    social_instagram: data.social_instagram ?? null,
    social_facebook: data.social_facebook ?? null,
    social_twitter: data.social_twitter ?? null,
    social_youtube: data.social_youtube ?? null,
    fip_website_url: data.fip_website_url ?? null,

    seo_slug: data.seo_slug ?? null,
    seo_title: data.seo_title ?? "",
    seo_description: data.seo_description ?? "",

    is_featured: data.is_featured ?? false,
    is_active: data.is_active ?? true,

    translation: {
      language_code: languageCode || "en",
      translated_name: data.translation?.translated_name ?? null,
      biography: data.translation?.biography ?? null,
      seo_title: data.translation?.seo_title ?? "",
      seo_description: data.translation?.seo_description ?? "",
    },
  };
};
