import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Translation {
  language_code: string;
  title: string | null;
  description: string | null;
  prediction_image_url: string | null;
}

// interface OptionTranslation {
//   language_code: string | null;
//   option_text?: string | null;
//   option_image_url?: string | null;
// }
// interface Option {
//   order: number;
//   is_correct: boolean;
//   translations: OptionTranslation[];
// }

interface Metadata {
  seo_title: string;
  seo_tag: string;
  seo_description: string;
}

export interface PredictionState {
  translation: Translation;
  tag_ids: string[];
  category_ids: string[];
  player_ids: string[];

  status: string | null;
  scheduled_at: string | null;
  published_at: string | null;

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

const initialState: PredictionState = {
  status: "published",
  published_at: null,
  scheduled_at: null,
  publish_platforms: [],
  restriction_type: "free",
  entitlements: [],
  must_be_logged_in: false,
  must_be_verified: false,
  must_be_over_18: false,

  geo_block_mode: null,
  geo_block_countries: [],
  metadata: {
    seo_title: "",
    seo_tag: "",
    seo_description: "",
  },
  tag_ids: [],
  category_ids: [],
  player_ids: [],
  translation: {
    language_code: "en",
    title: null,
    description: null,
    prediction_image_url: null,
  },
};

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    setPredictionTranslationField(
      state,
      action: PayloadAction<{ field: keyof Translation; value: string }>
    ) {
      const { field, value } = action.payload;
      if (field in state.translation) {
        state.translation[field] = value;
      }
    },
    updatePredictionMetadataField(
      state,
      action: PayloadAction<{
        field: keyof PredictionState["metadata"];
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      if (field in state.metadata) {
        state.metadata[field] = value;
      }
    },
    setPredictionHierarchyContent: (state, action) => {
      const { categoryIds, playerIds, tagIds } = action.payload;
      state.category_ids = categoryIds;
      state.player_ids = playerIds;
      state.tag_ids = tagIds;
    },
    setPredictionAuthentication: (state, action) => {
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
    setPredictionPublishContent: (state, action) => {
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
    setPredictionGeoBlockContent: (state, action) => {
      const { permission, countries } = action.payload;
      state.geo_block_mode = permission;
      state.geo_block_countries = countries;
    },
    setFullPrediction: (_state, action: PayloadAction<PredictionState>) => {
      return action.payload;
    },
    resetPrediction: () => initialState,
  },
});

export default predictionSlice.reducer;
export const {
  setPredictionTranslationField,
  updatePredictionMetadataField,
  setPredictionHierarchyContent,
  setPredictionAuthentication,
  setPredictionPublishContent,
  setPredictionGeoBlockContent,
  setFullPrediction,
  resetPrediction,
} = predictionSlice.actions;
export const selectPrediction = (state: RootState) => state.prediction;
