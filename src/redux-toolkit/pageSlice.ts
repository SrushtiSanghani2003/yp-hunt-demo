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

export interface HeroMediaItem {
  media_type: "image" | "video" | "news" | "highlight";
  media_source: string;
  media_url: string;
  video_id: string;
  video_thumbnail: string;
  external_id?: number | null;
  is_latest?: boolean | null;
  title: string;
  description: string;
  link_text: string;
  link_url: string;
  sponsor_image_url: string;
  sponsor_text: string;
  sponsor_link_url: string;
  sort_order: number;
  button_details?: any[];
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

export interface PageState {
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
  hero_media: HeroMediaItem[];
    hero_design?: {
    mode: "form" | "design";
    craft_state: string;
    rendered_html: string;
  };
  hero_type: string;
  platform_type: string;
  parent_id: number | null;
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
    author_name: string | null;
    author_title: string | null;
    author_image_url: string | null;
    author_social_urls: { [key: string]: string };
  };
  blocks: Block[];
}

const createEmptyImageObject = {
  media_type: "image",
  media_source: "",
  media_url: "",
  img_width: 0,
  img_height: 0,
  title: "",
  description: "",
  button_details: [],
  sponsor_image_url: "",
  sponsor_text: "",
  sponsor_link_url: "",
  sort_order: 1,
};

const createEmptyVideoObject = {
  media_type: "video",
  media_source: "native",
  media_url: "",
  video_id: "",
  video_thumbnail: "",
  thumbnail_width: 0,
  thumbnail_height: 0,
  title: "",
  description: "",
  button_details: [],
  sponsor_image_url: "",
  sponsor_text: "",
  sponsor_link_url: "",
  sort_order: 1,
};
const createEmptyNewsObject = {
  media_type: "news",
  media_source: "native",
  external_id: null,
  media_url: "",
  button_details: [],
  is_latest: null,
  title: "",
  sort_order: 1,
};
const createEmptyHighlightObject = {
  media_type: "highlight",
  media_source: "native",
  media_url: "",
  external_id: null,
  button_details: [],
  is_latest: null,
  title: "",
  sort_order: 1,
};

const initialState: PageState = {
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
  hero_media: [],
  hero_type: "home",
  platform_type: "web",
  parent_id: null,
  translation: {
    language_code: "en",
    title: null,
    description: null,
    sponsor_name: null,
    sponsor_logo_url: null,
    sponsor_url: null,
    author_name: null,
    author_title: null,
    author_image_url: null,
    author_social_urls: {},
  },
  blocks: [],
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageTitle(state, action: PayloadAction<string>) {
      state.translation.title = action.payload;
    },
    setPageSummary(state, action: PayloadAction<string>) {
      state.translation.description = action.payload;
    },
    updatePageMediaContentField(
      state,
      action: PayloadAction<{
        field: Exclude<keyof PageState["translation"], "author_social_urls">;
        value: string;
      }>,
    ) {
      state.translation[action.payload.field] = action.payload.value;
    },
    updatePageMetadataField(
      state,
      action: PayloadAction<{
        field: keyof PageState["metadata"];
        value: string;
      }>,
    ) {
      const { field, value } = action.payload;
      if (field in state.metadata) {
        state.metadata[field] = value;
      }
    },
    setPageParentId(state, action) {
      state.parent_id = action.payload;
    },
    setHeroMediaContent(state, action) {
      const { mediaType } = action.payload;

      let emptyMedia;

      switch (mediaType) {
        case "image":
          emptyMedia = { ...createEmptyImageObject };
          break;

        case "video":
          emptyMedia = { ...createEmptyVideoObject };
          break;

        case "news":
          emptyMedia = { ...createEmptyNewsObject };
          break;

        case "highlight":
          emptyMedia = { ...createEmptyHighlightObject };
          break;

        default:
          return;
      }

      state.hero_media.unshift(emptyMedia as any);

      state.hero_media = state.hero_media.map((item, index) => ({
        ...item,
        sort_order: index + 1,
      }));
    },

    // setHeroMediaCount: (state: any, action) => {
    //   const { mediaType, count } = action.payload;
    //   const emptyObj =
    //     mediaType === "image" ? createEmptyImageObject : createEmptyVideoObject;

    //   // Separate existing media
    //   const existingMediaOfType = state.hero_media.filter(
    //     (item: any) => item.media_type === mediaType
    //   );
    //   const otherMedia = state.hero_media.filter(
    //     (item: any) => item.media_type !== mediaType
    //   );

    //   const existingCount = existingMediaOfType.length;

    //   // If we need more, create and append the remaining empty objects
    //   let updatedMediaOfType = [...existingMediaOfType];
    //   if (count > existingCount) {
    //     const missing = count - existingCount;
    //     const newItems = Array.from({ length: missing }, (_, i) =>
    //       emptyObj(existingCount + i + 1)
    //     );
    //     updatedMediaOfType = [...updatedMediaOfType, ...newItems];
    //   } else if (count < existingCount) {
    //     // Trim if needed
    //     updatedMediaOfType = updatedMediaOfType.slice(0, count);
    //   }

    //   // Combine and sort
    //   const combined = [
    //     ...(mediaType === "image" ? updatedMediaOfType : otherMedia),
    //     ...(mediaType === "image" ? otherMedia : updatedMediaOfType),
    //   ];

    //   // Reassign sort_order globally
    //   state.hero_media = combined.map((item, idx) => ({
    //     ...item,
    //     sort_order: idx + 1,
    //   }));
    // },

    updateHeroMediaBySortOrder: (
      state,
      action: PayloadAction<{
        mediaType: string;
        sortOrder: number;
        data: Partial<HeroMediaItem>;
      }>,
    ) => {
      const { mediaType, sortOrder, data } = action.payload;

      const index = state.hero_media.findIndex(
        (item) =>
          item.media_type === mediaType && item.sort_order === sortOrder,
      );

      if (index !== -1) {
        state.hero_media[index] = {
          ...state.hero_media[index],
          ...data,
        };
      }
    },

    removeHeroMediaBySortOrder: (state, action) => {
      const { mediaType, sortOrder } = action.payload;

      // 1. Filter out the specific media item
      const updatedMedia = state.hero_media.filter(
        (item) =>
          !(item.media_type === mediaType && item.sort_order === sortOrder),
      );

      // 2. Reassign global sort_order after removal
      state.hero_media = updatedMedia.map((item, idx) => ({
        ...item,
        sort_order: idx + 1,
      }));
    },

    updateHeroMediaOrder: (state, action) => {
      state.hero_media = action.payload.map((item: any, idx: number) => ({
        ...item,
        sort_order: idx + 1,
        button_details: item.button_details ?? [], // ✅ news & highlight safe
      }));
    },
     setHeroDesignState: (
      state,
      action: PayloadAction<{
        mode: "form" | "design";
        craft_state: string;
        rendered_html: string;
      }>
    ) => {
      state.hero_design = action.payload;
    },


    setPageHeroType(state, action) {
      state.hero_type = action.payload;
    },
    setPageType(state, action) {
      state.platform_type = action.payload;
    },

    //------------------------------- BLOCKS MANAGEMENT ------------------------------------------
    PageChangeBlockStatus(state, action) {
      const { index } = action.payload;
      state.blocks[index].is_active = !state.blocks[index].is_active;
      state.blocks[index].content.is_active =
        !state.blocks[index].content.is_active;
    },
    PageAddBlock(state, action: PayloadAction<BlockType | string>) {
      const sort_order = state.blocks.length + 1;
      const newBlock = createEmptyBlock(action.payload, sort_order);
      state.blocks.push(newBlock);
    },
    PageChangeBlockType(
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

    PageMoveBlock(
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

    PageRemoveBlock(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.blocks.splice(index, 1);
      // Update sort_order after removal
      state.blocks.forEach((block, i) => {
        block.sort_order = i + 1;
      });
    },

    PageUpdateBlockContent(
      state,
      action: PayloadAction<{ index: number; updatedBlock: Block }>,
    ) {
      const { index, updatedBlock } = action.payload;
      if (index >= 0 && index < state.blocks.length) {
        state.blocks[index] = updatedBlock;
      }
    },

    setPageAuthorInfo: (state, action: PayloadAction<AuthorPayload>) => {
      state.translation.author_name = action.payload.name;
      state.translation.author_title = action.payload.title;
      state.translation.author_image_url = action.payload.imgUrl;
      state.translation.author_social_urls = action.payload.socialUrls;
    },
    setPageReadTime: (state, action: PayloadAction<number>) => {
      state.read_time = action.payload;
    },
    setPageAuthentication: (state, action) => {
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
    setPagePublishContent: (state, action) => {
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

    setPageGeoBlockContent: (state, action) => {
      const { permission, countries } = action.payload;
      state.geo_block_mode = permission;
      state.geo_block_countries = countries;
    },

    setPageHierarchyContent: (state, action) => {
      const { categoryIds, playerIds, tagIds } = action.payload;
      state.category_ids = categoryIds;
      state.player_ids = playerIds;
      state.tag_ids = tagIds;
    },

    setPageSponsorContent: (state, action) => {
      const { sponsor_img, sponsor_url, sponsor_name } = action.payload;
      state.translation.sponsor_logo_url = sponsor_img;
      state.translation.sponsor_name = sponsor_name;
      state.translation.sponsor_url = sponsor_url;
    },

    setLanguageCode: (state, action) => {
      state.translation.language_code = action.payload;
    },

    setFullPage: (_state, action: PayloadAction<PageState>) => {
      return action.payload;
    },

    resetPage: () => initialState,
  },
});

function updateSortOrder(blocks: any[]) {
  blocks.forEach((block, i) => {
    block.sort_order = i + 1;
  });
}

export const {
  setPageTitle,
  setPageSummary,
  updatePageMetadataField,
  updatePageMediaContentField,
  setPageParentId,
  PageChangeBlockStatus,
  PageAddBlock,
  PageChangeBlockType,
  PageMoveBlock,
  PageUpdateBlockContent,
  PageRemoveBlock,
  setPageAuthorInfo,
  setPageReadTime,
  setPageAuthentication,
  setPagePublishContent,
  setPageGeoBlockContent,
  setPageHierarchyContent,
  setPageSponsorContent,
  setLanguageCode,
  setFullPage,
  resetPage,
  // setHeroMediaCount,
  setHeroMediaContent,
  updateHeroMediaBySortOrder,
  removeHeroMediaBySortOrder,
  updateHeroMediaOrder,
  setHeroDesignState,
  setPageHeroType,
  setPageType,

} = pageSlice.actions;
export const selectPage = (state: RootState) => state.page;
export default pageSlice.reducer;
