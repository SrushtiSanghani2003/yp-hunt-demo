import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Translation {
  language_code: string;
  title: string | null;
  description: string | null;
  quiz_image_url: string | null;
}

interface Metadata {
  seo_title: string;
  seo_tag: string;
  seo_description: string;
}

export interface QuizState {
  translation: Translation;
  tag_ids: string[];
  category_ids: string[];
  player_ids: string[];

  status: string | null;
  scheduled_at: string | null;
  published_at: string | null;
  secret_key: string | null;

  must_be_logged_in: boolean;
  must_be_verified: boolean;
  must_be_over_18: boolean;

  geo_block_mode: string | null;
  geo_block_countries: string[];

  publish_platforms: string[];
  restriction_type: string | null;
  entitlements: string[];

  metadata: Metadata;
}

const initialState: QuizState = {
  translation: {
    language_code: "en",
    title: null,
    description: null,
    quiz_image_url: null,
  },
  tag_ids: [],
  category_ids: [],
  player_ids: [],

  status: "published",
  scheduled_at: null,
  published_at: null,
  secret_key: null,

  must_be_logged_in: false,
  must_be_verified: false,
  must_be_over_18: false,

  geo_block_mode: null,
  geo_block_countries: [],

  publish_platforms: [],
  restriction_type: "free",
  entitlements: [],

  metadata: {
    seo_title: "",
    seo_tag: "",
    seo_description: "",
  },
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizTranslationField(
      state,
      action: PayloadAction<{ field: keyof Translation; value: string }>
    ) {
      const { field, value } = action.payload;
      if (field in state.translation) {
        state.translation[field] = value;
      }
    },

    updateQuizMetadataField(
      state,
      action: PayloadAction<{
        field: keyof QuizState["metadata"];
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      if (field in state.metadata) {
        state.metadata[field] = value;
      }
    },
    setQuizHierarchyContent: (state, action) => {
      const { categoryIds, playerIds, tagIds } = action.payload;
      state.category_ids = categoryIds;
      state.player_ids = playerIds;
      state.tag_ids = tagIds;
    },
    setQuizAuthentication: (state, action) => {
      const {
        must_be_logged_in,
        must_be_verified,
        must_be_over_18,
        entitlements,
        restriction_type,
      } = action.payload;
      state.must_be_logged_in = must_be_logged_in;
      state.must_be_verified = must_be_verified;
      state.must_be_over_18 = must_be_over_18;
      state.entitlements = entitlements;
      state.restriction_type = restriction_type;
    },
    setQuizPublishContent: (state, action) => {
      const { platforms, status, dateTime } = action.payload;
      state.publish_platforms = platforms;
      state.status = status;
      if (status === "published") {
        state.published_at = dateTime;
        state.scheduled_at = null;
      } else if (status === "scheduled") {
        state.scheduled_at = dateTime;
        state.published_at = null;
      }
    },
    setQuizGeoBlockContent: (state, action) => {
      const { permission, countries } = action.payload;
      state.geo_block_mode = permission;
      state.geo_block_countries = countries;
    },
    setFullQuiz: (_state, action: PayloadAction<QuizState>) => {
      return action.payload;
    },
    resetQuiz: () => initialState,
  },
});

export default quizSlice.reducer;
export const {
  setQuizTranslationField,
  updateQuizMetadataField,
  setQuizHierarchyContent,
  setQuizAuthentication,
  setQuizPublishContent,
  setQuizGeoBlockContent,
  setFullQuiz,
  resetQuiz,
} = quizSlice.actions;
export const selectQuiz = (state: RootState) => state.quiz;
