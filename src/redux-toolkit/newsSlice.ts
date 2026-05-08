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
import {
  createEmptyBlock,
  type BlockType,
} from "../components/blocks/blocksObjectConfig";

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

export interface NewsState {
  status: string;
  published_at: string | null;
  scheduled_at: string | null;
  read_time: number;
  restriction_type: string | null;
  entitlements: string[];
  must_be_logged_in: boolean;
  is_featured: boolean;
  must_be_verified: boolean;
  must_be_over_18: boolean;
  publish_platforms: string[];
  geo_block_mode: string | null;
  geo_block_countries: string[];
  metadata: {
    seo_title: string;
    seo_tag: string;
    seo_description: string;
  };
  tag_ids: number[];
  category_ids: number[];
  player_ids: number[];
  tournament_ids: number[];
  translation: {
    language_code: string;
    title: string | null;
    description: string | null;
    sponsor_name: string | null;
    sponsor_logo_url: string | null;
    sponsor_url: string | null;
    hero_title: string | null;
    hero_description: string | null;
    hero_image_url: string | null;
    img_width: number | null;
    img_height: number | null;
    hero_video_url: string | null;
    hero_video_source: string | null;
    hero_media_type: string | null;
    hero_media_thumbnail: string | null;
    thumbnail_width: number;
    thumbnail_height: number;
    author_name: string | null;
    author_title: string | null;
    author_image_url: string | null;
    author_social_urls: { [key: string]: string };
  };
  blocks: Block[];
}

const initialState: NewsState = {
  status: "draft",
  published_at: null,
  scheduled_at: null,
  read_time: 0,
  restriction_type: "free",
  entitlements: [],
  must_be_logged_in: false,
  must_be_verified: false,
  must_be_over_18: false,
  is_featured: false,
  publish_platforms: [],
  geo_block_mode: null,
  geo_block_countries: [],
  tag_ids: [],
  category_ids: [],
  player_ids: [],
  tournament_ids: [],
  metadata: {
    seo_title: "",
    seo_tag: "",
    seo_description: "",
  },
  translation: {
    language_code: "en",
    title: null,
    description: null,
    sponsor_name: null,
    sponsor_logo_url: null,
    sponsor_url: null,
    hero_title: null,
    hero_description: null,
    hero_image_url: null,
    img_width: 0,
    img_height: 0,
    hero_video_source: "native",
    hero_media_thumbnail: null,
    thumbnail_width: 0,
    thumbnail_height: 0,
    hero_video_url: null,
    hero_media_type: null,
    author_name: null,
    author_title: null,
    author_image_url: null,
    author_social_urls: {},
  },
  blocks: [],
};

type EditableTranslationField = {
  [K in keyof NewsState["translation"]]: NewsState["translation"][K] extends
    | string
    | null
    | number
    ? K
    : never;
}[keyof NewsState["translation"]];

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsTitle(state, action: PayloadAction<string>) {
      state.translation.title = action.payload;
    },
    setNewsSummary(state, action: PayloadAction<string>) {
      state.translation.description = action.payload;
    },
    setNewsFeatured: (state, action) => {
      state.is_featured = action.payload;
    },

    setNewsMediaType(
      state,
      action: PayloadAction<"image" | "video" | string | null>,
    ) {
      const type = action.payload;

      state.translation.hero_media_type = type;

      if (type === "image") {
        state.translation.hero_image_url = "";
      } else {
        state.translation.hero_image_url = "";
      }
    },
    //
    setNewsVideoType(
      state,
      action: PayloadAction<"youtube" | "native" | string>,
    ) {
      if (state.translation.hero_media_type !== "video") return;

      const videoType = action.payload;

      state.translation.hero_video_source = videoType;
      state.translation.hero_video_url = null;
    },
    removeNewsMediaType(state) {
      state.translation.hero_media_type = null;
      state.translation.hero_image_url = null;
      state.translation.hero_video_source = null;
      state.translation.hero_video_url = null;
    },

    updateNewsMediaContentField(
      state,
      action: PayloadAction<{
        field: EditableTranslationField;
        value: string | null | number;
      }>,
    ) {
      const { field, value } = action.payload;
      (state.translation[field] as any) = value;
      // state.translation[action.payload.field] = action.payload.value as any;
    },
    resetNewsMediaDimensions(state) {
      state.translation.img_width = 0;
      state.translation.img_height = 0;
      state.translation.thumbnail_width = 0;
      state.translation.thumbnail_height = 0;
    },
    updateNewsMetadataField(
      state,
      action: PayloadAction<{
        field: keyof NewsState["metadata"];
        value: string;
      }>,
    ) {
      const { field, value } = action.payload;
      if (field in state.metadata) {
        state.metadata[field] = value;
      }
    },

    //------------------------------- BLOCKS MANAGEMENT ------------------------------------------
    NewsChangeBlockStatus(state, action) {
      const { index } = action.payload;
      state.blocks[index].is_active = !state.blocks[index].is_active;
      state.blocks[index].content.is_active =
        !state.blocks[index].content.is_active;
    },
    NewsAddBlock(state, action: PayloadAction<BlockType | string>) {
      const sort_order = state.blocks.length + 1;
      const newBlock = createEmptyBlock(action.payload, sort_order);
      state.blocks.push(newBlock);
    },
    NewsChangeBlockType(
      state,
      action: PayloadAction<{ index: number; newType: BlockType | string }>,
    ) {
      const { index, newType } = action.payload;
      if (state.blocks[index]) {
        const sort_order = state.blocks[index].sort_order;
        const newBlock = createEmptyBlock(newType, sort_order);

        state.blocks[index] = {
          ...newBlock,
        };
      }
    },

    NewsMoveBlock(
      state,
      action: PayloadAction<{ index: number; direction: "up" | "down" }>,
    ) {
      const { index, direction } = action.payload;
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= state.blocks.length) return;
      [state.blocks[index], state.blocks[newIndex]] = [
        state.blocks[newIndex],
        state.blocks[index],
      ];
      updateSortOrder(state.blocks);
    },

    NewsRemoveBlock(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.blocks.splice(index, 1);
      // Update sort_order after removal
      state.blocks.forEach((block, i) => {
        block.sort_order = i + 1;
      });
    },

    NewsUpdateBlockContent(
      state,
      action: PayloadAction<{ index: number; updatedBlock: Block }>,
    ) {
      const { index, updatedBlock } = action.payload;
      if (index >= 0 && index < state.blocks.length) {
        state.blocks[index] = updatedBlock;
      }
    },

    setNewsAuthorInfo: (state, action: PayloadAction<AuthorPayload>) => {
      state.translation.author_name = action.payload.name;
      state.translation.author_title = action.payload.title;
      state.translation.author_image_url = action.payload.imgUrl;
      state.translation.author_social_urls = action.payload.socialUrls;
    },
    setNewsReadTime: (state, action: PayloadAction<number>) => {
      state.read_time = action.payload;
    },
    setNewsAuthentication: (state, action) => {
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
    setNewsPublishContent: (state, action) => {
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

    setNewsGeoBlockContent: (state, action) => {
      const { permission, countries } = action.payload;
      state.geo_block_mode = permission;
      state.geo_block_countries = countries;
    },

    setNewsHierarchyContent: (state, action) => {
      const { categoryIds, playerIds, tagIds, tournamentIds } = action.payload;
      state.category_ids = categoryIds;
      state.player_ids = playerIds;
      state.tag_ids = tagIds;
      state.tournament_ids = tournamentIds;
    },

    setNewsSponsorContent: (state, action) => {
      const { sponsor_img, sponsor_url, sponsor_name } = action.payload;
      state.translation.sponsor_logo_url = sponsor_img;
      state.translation.sponsor_name = sponsor_name;
      state.translation.sponsor_url = sponsor_url;
    },

    setFullNews: (_state, action: PayloadAction<NewsState>) => {
      return action.payload;
    },
    setNewsLanguage(state, action: PayloadAction<string>) {
      state.translation.language_code = action.payload;
    },
    resetNews: () => initialState,
  },
});

function updateSortOrder(blocks: any[]) {
  blocks.forEach((block, i) => {
    block.sort_order = i + 1;
  });
}

export const {
  setNewsTitle,
  setNewsSummary,
  setNewsLanguage,
  setNewsFeatured,
  setNewsMediaType,
  setNewsVideoType,
  removeNewsMediaType,
  updateNewsMetadataField,
  updateNewsMediaContentField,
  NewsChangeBlockStatus,
  NewsAddBlock,
  NewsChangeBlockType,
  NewsMoveBlock,
  NewsUpdateBlockContent,
  NewsRemoveBlock,
  setNewsAuthorInfo,
  setNewsReadTime,
  setNewsAuthentication,
  setNewsPublishContent,
  setNewsGeoBlockContent,
  setNewsHierarchyContent,
  setNewsSponsorContent,
  setFullNews,
  resetNewsMediaDimensions,
  resetNews,
} = newsSlice.actions;
export const selectNews = (state: RootState) => state.news;
export default newsSlice.reducer;
