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

export interface ShopState {
  status: string;
  published_at: string | null;
  scheduled_at: string | null;
  publish_platforms: string[];
  restriction_type: string | null;
  entitlements: string[];
  must_be_logged_in: boolean;
  must_be_verified: boolean;
  must_be_over_18: boolean;
  geo_block_mode: string | null;
  geo_block_countries: string[];
  metadata: {
    seo_title: string;
    seo_tag: string;
    seo_description: string;
  };
  translation: {
    language_code: string;
    shop_image_url: string | null;
    shop_mobile_image_url: string | null;
    redirect_url: string | null;
    description: string | null;
    sponsor_name: null;
    sponsor_logo_url: null;
    sponsor_url: null;
    author_name: null;
    author_title: null;
    author_image_url: null;
    author_social_urls: {};
  };
}

const initialState: ShopState = {
  status: "draft",
  published_at: null,
  scheduled_at: null,
  publish_platforms: [],
  restriction_type: null,
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
  translation: {
    language_code: "en",
    shop_image_url: null,
    shop_mobile_image_url: null,
    redirect_url: null,
    description: null,
    sponsor_name: null,
    sponsor_logo_url: null,
    sponsor_url: null,
    author_name: null,
    author_title: null,
    author_image_url: null,
    author_social_urls: {},
  },
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShopOwnerInfo: (state: any, action: PayloadAction<any>) => {
      const { field, value } = action.payload;
      if (field in state) {
        state[field] = value;
      }
    },
    setShopPublishPlatforms: (state, action: PayloadAction<string[]>) => {
      state.publish_platforms = action.payload;
    },
    setShopImageUrl: (state, action: PayloadAction<string | null>) => {
      state.translation.shop_image_url = action.payload;
    },
    setShopMobileImageUrl: (state, action: PayloadAction<string | null>) => {
      state.translation.shop_mobile_image_url = action.payload;
    },
    setShopRedirectUrl: (state, action: PayloadAction<string | null>) => {
      state.translation.redirect_url = action.payload;
    },

    updateShopMetadataField(
      state,
      action: PayloadAction<{
        field: keyof ShopState["metadata"];
        value: string;
      }>,
    ) {
      const { field, value } = action.payload;
      if (field in state.metadata) {
        state.metadata[field] = value;
      }
    },
    setShopDescription(state, action: PayloadAction<string>) {
      state.translation.description = action.payload;
    },

    setShopAuthentication: (state, action) => {
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
    setShopPublishContent: (state, action) => {
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
    setShopSponsorContent: (state, action) => {
      const { sponsor_img, sponsor_url, sponsor_name } = action.payload;
      state.translation.sponsor_logo_url = sponsor_img;
      state.translation.sponsor_name = sponsor_name;
      state.translation.sponsor_url = sponsor_url;
    },
    setShopGeoBlockContent: (state, action) => {
      const { permission, countries } = action.payload;
      state.geo_block_mode = permission;
      state.geo_block_countries = countries;
    },

    setLanguageCode: (state, action) => {
      state.translation.language_code = action.payload;
    },
    setFullShop: (_state, action: PayloadAction<ShopState>) => {
      return action.payload;
    },

    resetShop: () => initialState,
  },
});

export const {
  setShopDescription,
  setShopImageUrl,
  setShopMobileImageUrl,
  setShopRedirectUrl,
  updateShopMetadataField,
  setShopAuthentication,
  setShopGeoBlockContent,
  setLanguageCode,
  setFullShop,
  resetShop,
  setShopPublishContent,
  setShopSponsorContent,
} = shopSlice.actions;

export const selectShop = (state: RootState) => state.shop;

export default shopSlice.reducer;
