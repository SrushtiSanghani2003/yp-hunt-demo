import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Attribute {
  size?: string;
  color?: string;
  material?: string;
}

export interface ProductVariant {
  attributes: Attribute;
  sku:  string; 
  price: number;
  stock_quantity: number;
}

export interface ProductMedia {
  media_type: "image" | "video";
  media_url: string | null;
  sort_order: number | null;
  // media_source : string
}

export interface ProductDiscount {
  discount_type: "flat" | "percentage";
  value: number | string | null;
  valid_from: string | null;
  valid_to: string | null;
}

export interface ProductState {
  shop_id: string | number | null;
  category_ids: number[];
  tag_ids: number[];
  type: string | null;
  status: string;
  scheduled_at: string | null;
  published_at: string | null;
  thumbnail_url: string | null;
  price: number | null;
  is_taxable: boolean;
  tax_percent: string | null;
  geo_block_mode: string | null;
  geo_block_countries: string[];
  must_be_logged_in: boolean;
  must_be_verified: boolean;
  must_be_over_18: boolean;
  restriction_type: string | null;
  entitlements: string[];
  publish_platforms: string[];
  read_time: number | null;
  metadata: {
    seo_title: string;
    seo_tag: string;
    seo_description: string;
  };
  translation: {
    language_code: string | null;
    name: string | null;
    description: string | null;
    locale: string | null;
  };
  discount: ProductDiscount[];
  variants: ProductVariant[];
  media: ProductMedia[];
}

const initialState: ProductState = {
  shop_id: null,
  tag_ids: [],
  category_ids: [],
  type: "simple",
  status: "draft",
  scheduled_at: null,
  published_at: null,
  thumbnail_url: null,
  price: 0,
  is_taxable: false,
  tax_percent: null,
  geo_block_mode: null,
  geo_block_countries: [],
  must_be_logged_in: false,
  must_be_verified: false,
  must_be_over_18: false,
  restriction_type: "free",
  entitlements: [],
  publish_platforms: [],
  read_time: 0,
  metadata: {
    seo_title: "",
    seo_tag: "",
    seo_description: "",
  },
  translation: {
    language_code: "en",
    name: null,
    description: null,
    locale: null,
  },
  discount: [],
  variants: [],
  media: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFullProduct: (_state, action: PayloadAction<ProductState>) => {
      return action.payload;
    },
    setProductInfo: (state: any, action: PayloadAction<any>) => {
      const { field, value } = action.payload;
      state.translation[field] = value;
    },

    resetProduct: () => initialState,

    updateProductField: (
      state,
      action: PayloadAction<{
        field: keyof ProductState;
        value: any;
      }>
    ) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },

    updateProductMetadata: (
      state,
      action: PayloadAction<{
        field: keyof ProductState["metadata"];
        value: string;
      }>
    ) => {
      const { field, value } = action.payload;
      state.metadata[field] = value;
    },

    addProductVariant: (state, action: PayloadAction<ProductVariant>) => {
      state.variants.push(action.payload);
    },
    removeProductVariant: (state, action: PayloadAction<number>) => {
      state.variants = state.variants.filter(
        (_, index) => index !== action.payload
      );
    },
    addProductMedia: (state, action: PayloadAction<string>) => {
      const url = action.payload;
      const mediaType = url.match(/\.(mp4|webm|ogg)$/i) ? "video" : "image";
      state.media = [
        ...state.media.map((item, index) => {
          return {
            ...item,
            sort_order: index + 1,
          };
        }),
        { media_url: url, media_type: mediaType, sort_order: 0 },
      ];
    },
    removeProductMedia: (state, action: PayloadAction<string>) => {
      state.media = state.media
        .filter((item) => item.media_url !== action.payload)
        .map((item, index) => ({
          ...item,
          sort_order: index,
        }));
    },
    setProductDiscount: (state, action: PayloadAction<ProductDiscount>) => {
      state.discount.push(action.payload);
    },
    removeProductDiscount: (state, action: PayloadAction<number>) => {
      state.discount = state.discount.filter(
        (_, index) => index !== action.payload
      );
    },
    updateProductDiscounts: (
      state,
      action: PayloadAction<ProductDiscount[]>
    ) => {
      state.discount = action.payload;
    },
    setShopId: (state, action: PayloadAction<string | number | null>) => {
      state.shop_id = action.payload;
    },
    updateProductMetadataField(
      state,
      action: PayloadAction<{
        field: keyof ProductState["metadata"];
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      if (field in state.metadata) {
        state.metadata[field] = value;
      }
    },
    // block management
    setProductPublishContent: (state, action) => {
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
    setProductGeoBlockContent: (state, action) => {
      const { permission, countries } = action.payload;
      state.geo_block_mode = permission;
      state.geo_block_countries = countries;
    },
    setProductHierarchyContent: (state, action) => {
      const { categoryIds, tagIds } = action.payload;
      state.category_ids = categoryIds;
      // state.player_ids = playerIds;
      state.tag_ids = tagIds;
    },
    setProductAuthentication: (state, action) => {
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
    setProductReadTime: (state, action: PayloadAction<number>) => {
      state.read_time = action.payload;
    },
  },
});

export const {
  setFullProduct,
  resetProduct,
  updateProductField,
  setProductInfo,
  updateProductMetadata,
  addProductVariant,
  removeProductVariant,
  addProductMedia,
  setShopId,
  updateProductDiscounts,
  removeProductDiscount,
  setProductPublishContent,
  updateProductMetadataField,
  removeProductMedia,
  setProductGeoBlockContent,
  setProductHierarchyContent,
  setProductAuthentication,
  setProductReadTime,
  setProductDiscount,
} = productSlice.actions;

export const selectProduct = (state: RootState) => state.product;

export default productSlice.reducer;
