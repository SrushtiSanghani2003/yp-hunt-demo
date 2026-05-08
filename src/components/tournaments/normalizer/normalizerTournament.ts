import type {
  TournamentContact,
  TournamentState,
} from "../../../redux-toolkit/tournamentSlice";
const normalizePhone = (value: string) =>
  value.replace(/\s+/g, "").replace(/-/g, "");

export const normalizeTournamentResponse = (
  data: any,
  languageCode: string | null,
): TournamentState => {
  return {
    broadcast_type: "youtube", // hard fixed
    broadcast_type_redbull: "redbull",
    image: data.image ?? null,
    sponsor_image: data.sponsor_image ?? null,
    ticket_url: data.ticket_url ?? null,
    broadcast_url: data.broadcast_url ?? null,
    broadcast_url_redbull: data?.broadcast_url_redbull ?? null,
    where_to_watch_url: data.where_to_watch_url ?? null,
    external_url: data.external_url ?? null,
    meta_title: data.meta_title ?? null,
    meta_description: data.meta_description ?? null,
    accommodation_start_date: data.accommodation_start_date ?? null,
    accommodation_end_date: data.accommodation_end_date ?? null,
    brodcast_youtube_start_date: data.brodcast_youtube_start_date ?? null,
    brodcast_youtube_end_date: data.brodcast_youtube_end_date ?? null,
    brodcast_redbull_start_date: data.brodcast_redbull_start_date ?? null,
    brodcast_redbull_end_date: data.brodcast_redbull_end_date ?? null,
    is_travel_button_visible: data.is_travel_button_visible ?? 0,
    is_accommodation_button_visible: data.is_accommodation_button_visible ?? 0,
    is_visa_button_visible: data.is_visa_button_visible ?? 0,
    is_accreditation_button_visible: data.is_accreditation_button_visible ?? 0,
    padel_zone_content_type: data.padel_zone_content_type ?? null,
    padel_zone_content_media_url: data.padel_zone_content_media_url ?? null,
    padel_zone_content_thumbnail: data.padel_zone_content_thumbnail ?? null,
    padel_zone_content_link: data.padel_zone_content_link ?? null,
    deadline_for_registration_url: data.deadline_for_registration_url ?? null,
    tournament_insights_type: data.tournament_insights_type ?? null,
    tournament_insights_media_url: data.tournament_insights_media_url ?? null,
    tournament_insights_thumbnail: data.tournament_insights_thumbnail ?? null,
    tournament_insights_fastest_serve:
      data.tournament_insights_fastest_serve ?? null,
    tournament_insights_emerging_player_title:
      data?.tournament_insights_emerging_player_title ?? null,
    tournament_insights_player_id: data.tournament_insights_player_id ?? null,
    tournament_insights_link: data.tournament_insights_link ?? null,
    tournament_contacts: Array.isArray(data.tournament_contacts)
      ? data.tournament_contacts.map(
        (contact: any): TournamentContact => ({
          name: contact.name ?? null,
          designation: contact.designation ?? null,
          mobile_number: contact.mobile_number
            ? normalizePhone(contact.mobile_number)
            : null,
          email: contact.email ?? "",
        }),
      )
      : [],
    translation: {
      language_code: languageCode || "en",
      padel_zone_content_title:
        data.translation?.padel_zone_content_title ?? null,
      tournament_insights_title:
        data.translation?.tournament_insights_title ?? null,
      about: data.translation?.about ?? null,
      background_name: data?.translation?.background_name ?? null,
      favourite_player_title: data?.translation?.favourite_player_title ?? null,
      tournament_insights_fastest_serve_unit:
        data?.translation?.tournament_insights_fastest_serve_unit ?? null,

      //tournament structure
      qualification_title: data?.translation.qualification_title ?? null,
      qualification_info: data?.translation.qualification_info ?? null,
      main_draw_title: data?.translation.main_draw_title ?? null,
      main_draw_info: data?.translation.main_draw_info ?? null,
      //
      //Player Order
      qualifying_title: data?.translation.qualifying_title ?? null,
      qualifying_info: data?.translation.qualifying_info ?? null,
      qualifying_info_2: data?.translation.qualifying_info_2 ?? null,
      main_draw_rd_1_title: data?.translation.main_draw_rd_1_title ?? null,
      main_draw_rd_1_info: data?.translation.main_draw_rd_1_info ?? null,
      main_draw_rd_2_title: data?.translation.main_draw_rd_2_title ?? null,
      main_draw_rd_2_info: data?.translation.main_draw_rd_2_info ?? null,
      main_draw_r_16_title: data?.translation.main_draw_r_16_title ?? null,
      main_draw_r_16_info: data?.translation.main_draw_r_16_info ?? null,
      main_draw_qf_title: data?.translation.main_draw_qf_title ?? null,
      main_draw_qf_info: data?.translation.main_draw_qf_info ?? null,
      main_draw_sf_title: data?.translation.main_draw_sf_title ?? null,
      main_draw_sf_info: data?.translation.main_draw_sf_info ?? null,
      main_draw_final_title: data?.translation.main_draw_final_title ?? null,
      main_draw_final_info: data?.translation.main_draw_final_info ?? null,
    },
  };
};
