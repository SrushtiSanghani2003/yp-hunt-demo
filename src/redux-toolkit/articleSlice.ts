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

export interface ArticleState {
  status: string;
  published_at: string | null;
  scheduled_at: string | null;
  read_time: number;
  restriction_type: string | null;
  entitlements: string[];
  must_be_logged_in: boolean;
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
    hero_video_url: string | null;
    hero_video_source: string | null;
    hero_media_thumbnail: string | null;
    hero_media_type: string | null;
    author_name: string | null;
    author_title: string | null;
    author_image_url: string | null;
    author_social_urls: { [key: string]: string };
  };
  blocks: Block[];
}

const initialState: ArticleState = {
  status: "draft",
  published_at: null,
  scheduled_at: null,
  read_time: 0,
  restriction_type: "free",
  entitlements: [],
  must_be_logged_in: false,
  must_be_verified: false,
  must_be_over_18: false,
  publish_platforms: [],
  geo_block_mode: null,
  geo_block_countries: [],
  tag_ids: [],
  category_ids: [],
  player_ids: [],
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
    hero_video_source: 'native',
    hero_video_url: null,
    hero_media_type: null,
    hero_media_thumbnail: null,
    author_name: null,
    author_title: null,
    author_image_url: null,
    author_social_urls: {},
  },
  blocks: [],
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticleTitle(state, action: PayloadAction<string>) {
      state.translation.title = action.payload;
    },
    setArticleSummary(state, action: PayloadAction<string>) {
      state.translation.description = action.payload;
    },
    setArticleMediaType(
      state,
      action: PayloadAction<"image" | "video" | string | null>
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
    setArticleVideoType(
      state,
      action: PayloadAction<"youtube" | "native" | string>
    ) {
      if (state.translation.hero_media_type !== "video") return;

      const videoType = action.payload;

      state.translation.hero_video_source = videoType;
      state.translation.hero_video_url = "";
    },
    removeArticleMediaType(state) {
      state.translation.hero_media_type = null;
      state.translation.hero_image_url = null;
      state.translation.hero_video_source = null;
      state.translation.hero_video_url = null;
    },
    updateArticleMediaContentField(
      state,
      action: PayloadAction<{
        field: Exclude<keyof ArticleState["translation"], "author_social_urls">;
        value: string;
      }>
    ) {
      state.translation[action.payload.field] = action.payload.value;
    },
    updateArticleMetadataField(
      state,
      action: PayloadAction<{
        field: keyof ArticleState["metadata"];
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      if (field in state.metadata) {
        state.metadata[field] = value;
      }
    },

    //------------------------------- BLOCKS MANAGEMENT ------------------------------------------
    ArticleChangeBlockStatus(state, action) {
      const { index } = action.payload;
      state.blocks[index].content.is_active =
        !state.blocks[index].content.is_active;
    },
    ArticleAddBlock(state, action: PayloadAction<BlockType | string>) {
      const sort_order = state.blocks.length + 1;
      const newBlock = createEmptyBlock(action.payload, sort_order);
      state.blocks.push(newBlock);
    },
    ArticleChangeBlockType(
      state,
      action: PayloadAction<{ index: number; newType: BlockType | string }>
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

    ArticleMoveBlock(
      state,
      action: PayloadAction<{ index: number; direction: "up" | "down" }>
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

    ArticleRemoveBlock(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.blocks.splice(index, 1);
      // Update sort_order after removal
      state.blocks.forEach((block, i) => {
        block.sort_order = i + 1;
      });
    },

    ArticleUpdateBlockContent(
      state,
      action: PayloadAction<{ index: number; updatedBlock: Block }>
    ) {
      const { index, updatedBlock } = action.payload;
      if (index >= 0 && index < state.blocks.length) {
        state.blocks[index] = updatedBlock;
      }
    },

    setArticleAuthorInfo: (state, action: PayloadAction<AuthorPayload>) => {
      state.translation.author_name = action.payload.name;
      state.translation.author_title = action.payload.title;
      state.translation.author_image_url = action.payload.imgUrl;
      state.translation.author_social_urls = action.payload.socialUrls;
    },
    setArticleReadTime: (state, action: PayloadAction<number>) => {
      state.read_time = action.payload;
    },
    setArticleAuthentication: (state, action) => {
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
    setArticlePublishContent: (state, action) => {
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

    setArticleGeoBlockContent: (state, action) => {
      const { permission, countries } = action.payload;
      state.geo_block_mode = permission;
      state.geo_block_countries = countries;
    },

    setArticleHierarchyContent: (state, action) => {
      const { categoryIds, playerIds, tagIds } = action.payload;
      state.category_ids = categoryIds;
      state.player_ids = playerIds;
      state.tag_ids = tagIds;
    },

    setArticleSponsorContent: (state, action) => {
      const { sponsor_img, sponsor_url, sponsor_name } = action.payload;
      state.translation.sponsor_logo_url = sponsor_img;
      state.translation.sponsor_name = sponsor_name;
      state.translation.sponsor_url = sponsor_url;
    },

    setLanguageCode: (state, action) => {
      state.translation.language_code = action.payload;
    },

    setFullArticle: (_state, action: PayloadAction<ArticleState>) => {
      return action.payload;
    },

    resetArticle: () => initialState,
  },
});

function updateSortOrder(blocks: any[]) {
  blocks.forEach((block, i) => {
    block.sort_order = i + 1;
  });
}

export const {
  setArticleTitle,
  setArticleSummary,
  setArticleMediaType,
  setArticleVideoType,
  removeArticleMediaType,
  updateArticleMetadataField,
  updateArticleMediaContentField,
  ArticleChangeBlockStatus,
  ArticleAddBlock,
  ArticleChangeBlockType,
  ArticleMoveBlock,
  ArticleUpdateBlockContent,
  ArticleRemoveBlock,
  setArticleAuthorInfo,
  setArticleReadTime,
  setArticleAuthentication,
  setArticlePublishContent,
  setArticleGeoBlockContent,
  setArticleHierarchyContent,
  setArticleSponsorContent,
  setLanguageCode,
  setFullArticle,
  resetArticle,
} = articleSlice.actions;
export const selectArticle = (state: RootState) => state.article;
export default articleSlice.reducer;
