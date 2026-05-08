import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

/* ---------- Types ---------- */

export interface PlayerTranslation {
  language_code: string;
  translated_name: string;
  biography: string;
  seo_title: string;
  seo_description: string;
}

export interface PlayerState {
  external_player_id: string | null;
  first_name: string;
  last_name: string;
  display_name: string;
  gender: string | null;
  country_code: string | null;
  country_code_iso_2: string | null;
  date_of_birth: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  pro_year: number | null;
  dominant_hand: string | null;
  ranking: number | null;
  team_id: string | null;
  status: string;
  career_prize_money: string;
  ytd_prize_money: string;
  profile_image_url: string | null;
  background_img: string | null;
  next_previous_img: string | null;
  match_center_img: string | null;

  social_instagram: string | null;
  social_facebook: string | null;
  social_twitter: string | null;
  social_youtube: string | null;
  fip_website_url: string | null;

  seo_slug: string | null;
  seo_title: string | null;
  seo_description: string | null;

  is_featured: boolean;
  is_active: boolean;

  translation: PlayerTranslation;
}

/* ---------- Initial State ---------- */

const initialState: PlayerState = {
  external_player_id: null,
  first_name: "",
  last_name: "",
  display_name: "",
  gender: null,
  country_code: null,
  country_code_iso_2: null,
  date_of_birth: null,
  height_cm: null,
  weight_kg: null,
  pro_year: null,
  dominant_hand: null,
  ranking: null,
  team_id: null,
  status: "active",
  career_prize_money: "0.00",
  ytd_prize_money: "0.00",
  profile_image_url: null,
  background_img: null,
  next_previous_img: null,
  match_center_img: null,

  social_instagram: null,
  social_facebook: null,
  social_twitter: null,
  social_youtube: null,
  fip_website_url: null,
  seo_slug: null,
  seo_title: "",
  seo_description: "",

  is_featured: false,
  is_active: true,

  translation: {
    language_code: "en",
    translated_name: "",
    biography: "",
    seo_title: "",
    seo_description: "",
  },
};

/* ---------- Slice ---------- */

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerField: (
      state,
      action: PayloadAction<{ field: keyof PlayerState; value: any }>,
    ) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },

    setPlayerName: (
      state,
      action: PayloadAction<{
        first_name: string;
        last_name: string;
        display_name: string;
      }>,
    ) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.display_name = action.payload.display_name;
    },

    setPlayerImages: (
      state,
      action: PayloadAction<{
        profile_image_url?: string | null;
        background_img?: string | null;
        next_previous_img?: string | null;
        match_center_img?: string | null;
      }>,
    ) => {
      if ("background_img" in action.payload) {
        state.background_img = action.payload.background_img ?? null;
      }
      if ("profile_image_url" in action.payload) {
        state.profile_image_url = action.payload.profile_image_url ?? null;
      }
      if ("next_previous_img" in action.payload) {
        state.next_previous_img = action.payload.next_previous_img ?? null;
      }
      if ("match_center_img" in action.payload) {
        state.match_center_img = action.payload.match_center_img ?? null;
      }
    },

    setPlayerSocials: (
      state,
      action: PayloadAction<{
        instagram?: string | null;
        facebook?: string | null;
        twitter?: string | null;
        youtube?: string | null;
        FIPWebsite?: string | null;
      }>,
    ) => {
      if ("instagram" in action.payload) {
        state.social_instagram = action.payload.instagram ?? null;
      }
      if ("facebook" in action.payload) {
        state.social_facebook = action.payload.facebook ?? null;
      }
      if ("twitter" in action.payload) {
        state.social_twitter = action.payload.twitter ?? null;
      }
      if ("youtube" in action.payload) {
        state.social_youtube = action.payload.youtube ?? null;
      }
      if ("FIPWebsite" in action.payload) {
        state.fip_website_url = action.payload.FIPWebsite ?? null;
      }
    },

    updatePlayerTranslationField: (
      state,
      action: PayloadAction<{
        field: keyof PlayerTranslation;
        value: string;
      }>,
    ) => {
      const { field, value } = action.payload;
      state.translation[field] = value;
    },

    setLanguageCode: (state, action: PayloadAction<string>) => {
      state.translation.language_code = action.payload;
    },

    setFullPlayer: (_state, action: PayloadAction<PlayerState>) => {
      return action.payload;
    },

    resetPlayer: () => initialState,
  },
});

/* ---------- Exports ---------- */

export const {
  setPlayerField,
  setPlayerName,
  setPlayerImages,
  setPlayerSocials,
  updatePlayerTranslationField,
  setLanguageCode,
  setFullPlayer,
  resetPlayer,
} = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;
