import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type {
  CTABlock,
  FaqBlock,
  GalleryBlock,
  ImageBlock,
  PartnerBlock,
  PromotionBlock,
  QuoteBlock,
  SocialBlock,
  TextBlock,
  VideoBlock,
} from "../components/blocks/blockTypes";

interface AuthorPayload {
  name: string;
  title: string;
  imgUrl: string;
  socialUrls: Record<string, string>;
}

export type Block =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | CTABlock
  | QuoteBlock
  | PromotionBlock
  | GalleryBlock
  | FaqBlock
  | SocialBlock
  | PartnerBlock
  | { [key: string]: any };

export interface EventState {
  status: string;
  published_at: string | null;
  scheduled_at: string | null;
  restriction_type: string | null;
  entitlements: string[];
  metadata: {
    seo_title: string;
    seo_tag: string;
    seo_description: string;
  };
  must_be_logged_in: boolean;
  must_be_verified: boolean;
  must_be_over_18: boolean;
  publish_platforms: string[];
  geo_block_mode: string | null;
  geo_block_countries: string[];
  tag_ids: number[];
  category_ids: number[];
  player_ids: number[];
  event_type_id: number | null;
  logo_url: string | null;
  location: string | null;
  longitude: number | null;
  latitude: number | null;
  start_at: string | null;
  translation: {
    language_code: string;
    title: string | null;
    sponsor_name: string | null;
    sponsor_logo_url: string | null;
    sponsor_url: string | null;
    author_name: string | null;
    author_title: string | null;
    author_image_url: string | null;
    author_social_urls: { [key: string]: string };
    button_url: string | null; // Added for Button URL
    button_label: string | null; // Added for Button Label
  };
  image: string | null;
  // media: [
  //   {
  //     media_url: string | null;
  //     media_source: string | null;
  //     media_type: string | null;
  //     sort_order: number | null;
  //   }
  // ];
}

const initialState: EventState = {
  status: "draft",
  published_at: null,
  scheduled_at: null,
  restriction_type: "free",
  entitlements: [],
  metadata: {
    seo_title: "",
    seo_tag: "",
    seo_description: "",
  },
  must_be_logged_in: false,
  must_be_verified: false,
  must_be_over_18: false,
  publish_platforms: [],
  geo_block_mode: null,
  geo_block_countries: [],
  tag_ids: [],
  category_ids: [],
  player_ids: [],
  logo_url: null,
  location: null,
  longitude: 78.0421,
  latitude: 27.1751,
  start_at: null,
  event_type_id: null,
  translation: {
    language_code: "en",
    title: null,
    sponsor_name: null,
    sponsor_logo_url: null,
    sponsor_url: null,
    author_name: null,
    author_title: null,
    author_image_url: null,
    author_social_urls: {},
    button_url: null, // Initialize new field
    button_label: null, // Initialize new field
  },
  // media: [
  //   {
  //     media_url: null,
  //     media_source: null,
  //     media_type: null,
  //     sort_order: 1,
  //   },
  // ],
  image: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    // Existing action for Event Title
    setEventTitle(state, action: PayloadAction<string>) {
      state.translation.title = action.payload;
    },
    // Existing action for Event Description (Summary)
    setEventImage(state, action: PayloadAction<string>) {
      // if (state.media[0]) {
      //   state.media[0].media_url = action.payload;
      //   state.media[0].media_type = "image";
      // }
      state.image = action.payload;
    },
    // New action for Event Logo (using sponsor_logo_url)
    setEventLogo(state, action: PayloadAction<string>) {
      state.logo_url = action.payload;
    },
    // New action for Event Type
    // setEventType(state, action: PayloadAction<string>) {
    //   state.translation.event_type = action.payload;
    // },
    // // New action for Event Date
    // setEventDate(state, action: PayloadAction<string>) {
    //   state.translation.event_date = action.payload;
    // },
    // New action for Location
    setEventLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    // New action for Button URL
    setEventButtonUrl(state, action: PayloadAction<string>) {
      state.translation.button_url = action.payload;
    },
    // New action for Button Label
    setEventButtonLabel(state, action: PayloadAction<string>) {
      state.translation.button_label = action.payload;
    },
    setEventTypeId(state, action: PayloadAction<number>) {
      state.event_type_id = action.payload;
    },
    setStartAt(state, action: PayloadAction<string>) {
      state.start_at = action.payload;
    },
    // Existing action for Metadata fields (Meta Title, Meta Tag, Meta Description)
    updateEventMetadataField(
      state,
      action: PayloadAction<{
        field: keyof EventState["metadata"];
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      if (field in state.metadata) {
        state.metadata[field] = value;
      }
    },
    // Existing media type action
    // setEventMediaType(
    //   state,
    //   action: PayloadAction<"image" | "video" | string | null>
    // ) {
    //   const type = action.payload;
    //   state.translation.hero_media_type = type;
    //   if (type === "image") {
    //     state.translation.hero_image_url = "";
    //     state.translation.hero_video_source = null;
    //     state.translation.hero_video_url = null;
    //   } else if (type === "video") {
    //     state.translation.hero_image_url = null;
    //     state.translation.hero_video_source = "";
    //     state.translation.hero_video_url = "";
    //   }
    // },
    // setEventVideoType(
    //   state,
    //   action: PayloadAction<"youtube" | "native" | string>
    // ) {
    //   if (state.translation.hero_media_type !== "video") return;
    //   state.translation.hero_video_source = action.payload;
    //   state.translation.hero_video_url = "";
    // },
    // removeEventMediaType(state) {
    //   state.translation.hero_media_type = null;
    //   state.translation.hero_image_url = null;
    //   state.translation.hero_video_source = null;
    //   state.translation.hero_video_url = null;
    // },
    updateEventMediaContentField(
      state,
      action: PayloadAction<{
        field: Exclude<keyof EventState["translation"], "author_social_urls">;
        value: string;
      }>
    ) {
      state.translation[action.payload.field] = action.payload.value;
    },
    // Block management actions (unchanged)
    setEventAuthorInfo: (state, action: PayloadAction<AuthorPayload>) => {
      state.translation.author_name = action.payload.name;
      state.translation.author_title = action.payload.title;
      state.translation.author_image_url = action.payload.imgUrl;
      state.translation.author_social_urls = action.payload.socialUrls;
    },

    setEventAuthentication: (state, action) => {
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
    setEventPublishContent: (state, action) => {
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
    setEventGeoBlockContent: (state, action) => {
      const { permission, countries } = action.payload;
      state.geo_block_mode = permission;
      state.geo_block_countries = countries;
    },
    setEventHierarchyContent: (state, action) => {
      const { categoryIds, playerIds, tagIds } = action.payload;
      state.category_ids = categoryIds;
      state.player_ids = playerIds;
      state.tag_ids = tagIds;
    },
    setEventSponsorContent: (state, action) => {
      const { sponsor_img, sponsor_url, sponsor_name } = action.payload;
      state.translation.sponsor_logo_url = sponsor_img;
      state.translation.sponsor_name = sponsor_name;
      state.translation.sponsor_url = sponsor_url;
    },
    setLanguageCode: (state, action) => {
      state.translation.language_code = action.payload;
    },
    setFullEvent: (_state, action: PayloadAction<EventState>) => {
      return action.payload;
    },
    resetEvent: () => initialState,
  },
});



export const {
  setEventTitle,
  setEventImage,
  setEventLogo,
  // setEventType,
  // setEventDate,
  setEventLocation,
  setEventButtonUrl,
  setEventButtonLabel,
  updateEventMetadataField,
  // setEventMediaType,
  // setEventVideoType,
  // removeEventMediaType,
  setStartAt,
  updateEventMediaContentField,
  setEventAuthorInfo,
  setEventAuthentication,
  setEventPublishContent,
  setEventGeoBlockContent,
  setEventHierarchyContent,
  setEventSponsorContent,
  setLanguageCode,
  setEventTypeId,
  setFullEvent,
  resetEvent,
} = eventSlice.actions;

export const selectEvent = (state: RootState) => state.event;
export default eventSlice.reducer;
