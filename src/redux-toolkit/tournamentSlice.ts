import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
export interface TournamentContact {
  name: string | null;
  designation: string | null;
  mobile_number: string | null;
  email: string | null;
}
export interface TournamentState {
  broadcast_type: string | null;
  broadcast_type_redbull: string | null;
  image: string | null;
  sponsor_image: string | null;
  ticket_url: string | null;
  broadcast_url: string | null;
  broadcast_url_redbull: string | null;
  where_to_watch_url: string | null;
  accommodation_start_date: string | null;
  accommodation_end_date: string | null;
  brodcast_youtube_start_date: string | null;
  brodcast_youtube_end_date: string | null;
  brodcast_redbull_start_date: string | null;
  brodcast_redbull_end_date: string | null;
  // Padel Zone
  padel_zone_content_type: "image" | "video" | null;
  padel_zone_content_media_url: string | null;
  padel_zone_content_thumbnail: string | null;
  padel_zone_content_link: string | null;
  deadline_for_registration_url: string | null;
  external_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_travel_button_visible: number | null;
  is_accommodation_button_visible: number | null;
  is_accreditation_button_visible: number | null;
  is_visa_button_visible: number | null;
  // Tournament Insights
  tournament_insights_type: "image" | "video" | null;
  tournament_insights_media_url: string | null;
  tournament_insights_thumbnail: string | null;
  tournament_insights_fastest_serve: string | null;
  tournament_insights_emerging_player_title: string | null;
  tournament_insights_player_id: number | null;
  tournament_insights_link: string | null;
  tournament_contacts: TournamentContact[];
  // Translation
  translation: {
    language_code: string | null;
    padel_zone_content_title: string | null;
    tournament_insights_fastest_serve_unit: string | null;
    background_name: string | null;
    tournament_insights_title: string | null;
    favourite_player_title: string | null;
    about: string | null;
    //tournament structure
    qualification_title: string | null;
    qualification_info: string | null;
    main_draw_title: string | null;
    main_draw_info: string | null;
    //
    //Player Order
    qualifying_title: string | null;
    qualifying_info: string | null;
    qualifying_info_2: string | null;
    main_draw_rd_1_title: string | null;
    main_draw_rd_1_info: string | null;
    main_draw_rd_2_title: string | null;
    main_draw_rd_2_info: string | null;
    main_draw_r_16_title: string | null;
    main_draw_r_16_info: string | null;
    main_draw_qf_title: string | null;
    main_draw_qf_info: string | null;
    main_draw_sf_title: string | null;
    main_draw_sf_info: string | null;
    main_draw_final_title: string | null;
    main_draw_final_info: string | null;
  };
}

const initialState: TournamentState = {
  broadcast_type: "youtube",
  broadcast_type_redbull: "redbull",
  image: null,
  sponsor_image: null,
  ticket_url: null,
  broadcast_url: null,
  broadcast_url_redbull: null,
  where_to_watch_url: null,
  accommodation_start_date: null,
  accommodation_end_date: null,
  brodcast_youtube_start_date: null,
  brodcast_youtube_end_date: null,
  brodcast_redbull_start_date: null,
  brodcast_redbull_end_date: null,

  padel_zone_content_type: null,
  padel_zone_content_media_url: null,
  padel_zone_content_thumbnail: null,
  padel_zone_content_link: null,
  deadline_for_registration_url: null,
  external_url: null,
  meta_title: null,
  meta_description: null,
  is_travel_button_visible: 0,
  is_accommodation_button_visible: 0,
  is_visa_button_visible: 0,
  is_accreditation_button_visible: 0,
  tournament_insights_type: null,
  tournament_insights_media_url: null,
  tournament_insights_fastest_serve: null,
  tournament_insights_emerging_player_title: null,
  tournament_insights_thumbnail: null,
  tournament_insights_player_id: null,
  tournament_insights_link: null,
  tournament_contacts: [],
  translation: {
    language_code: null,
    padel_zone_content_title: null,
    tournament_insights_title: null,
    tournament_insights_fastest_serve_unit: null,
    favourite_player_title: null,
    background_name: null,
    about: null,
    //tournament structure
    qualification_title: null,
    qualification_info: null,
    main_draw_title: null,
    main_draw_info: null,
    //
    //Player Order
    qualifying_title: null,
    qualifying_info: null,
    qualifying_info_2: null,
    main_draw_rd_1_title: null,
    main_draw_rd_1_info: null,
    main_draw_rd_2_title: null,
    main_draw_rd_2_info: null,
    main_draw_r_16_title: null,
    main_draw_r_16_info: null,
    main_draw_qf_title: null,
    main_draw_qf_info: null,
    main_draw_sf_title: null,
    main_draw_sf_info: null,
    main_draw_final_title: null,
    main_draw_final_info: null,
  },
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    // update single field dynamically
    updateTournamentField: <K extends keyof TournamentState>(
      state: TournamentState,
      action: PayloadAction<{ field: K; value: TournamentState[K] }>,
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    updateTournamentTranslationField: (
      state,
      action: PayloadAction<{
        field: keyof TournamentState["translation"];
        value: string | null;
      }>,
    ) => {
      const { field, value } = action.payload;
      state.translation[field] = value;
    },
    addTournamentContact: (state) => {
      state.tournament_contacts.push({
        name: null,
        designation: null,
        mobile_number: null,
        email: null,
      });
    },

    updateTournamentContact: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof TournamentContact;
        value: string | null;
      }>,
    ) => {
      const { index, field, value } = action.payload;
      if (state.tournament_contacts[index]) {
        state.tournament_contacts[index][field] = value;
      }
    },

    // 🔹 REMOVE CONTACT
    removeTournamentContact: (state, action: PayloadAction<number>) => {
      state.tournament_contacts.splice(action.payload, 1);
    },
    // set full tournament object from API
    setFullTournament: (_state, action: PayloadAction<TournamentState>) => {
      return action.payload;
    },

    // reset to initial state
    resetTournament: () => initialState,
  },
});

export const {
  updateTournamentField,
  setFullTournament,
  resetTournament,
  updateTournamentTranslationField,
  addTournamentContact,
  updateTournamentContact,
  removeTournamentContact,
} = tournamentSlice.actions;

export const selectTournament = (state: RootState) => state.tournament;

export default tournamentSlice.reducer;
