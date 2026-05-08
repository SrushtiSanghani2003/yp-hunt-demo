import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// ---------- Variant ----------
export interface MembershipVariant {
    id?: string;
    name: string;
    description: string;
    price: number;
    currency: "€" | "$" | "£" | "₨" | string;
    allowed_for: "per person" | "per adult" | "per child" | string ; // e.g. ["post", "page"]
    note: string;
    vat: number;
}

// ---------- Main State ----------
export interface MembershipState {
    id: string | null;
    type: string; // e.g. "membership"
    title: string;
    overview: string;
    other_details: string;
    thumbnail_url: string | null;
    button_text: string;
    button_link: string;
    status: "draft" | "published";
    variants: MembershipVariant[];
    metadata: {
        seo_title: string;
        seo_tag: string;
        seo_description: string;
    };
    translation: {
        language_code: string | null;
        name: string | null;
        description: string | null;
        other_details: string | null;
        locale: string | null;
    };
}

// ---------- Initial State ----------
const initialState: MembershipState = {
    id: null,
    type: "",
    title: "",
    overview: "",
    other_details: "",
    thumbnail_url: null,
    button_text: "",
    button_link: "",
    status: "draft",
    variants: [],
    metadata: {
        seo_title: "",
        seo_tag: "",
        seo_description: "",
    },
    translation: {
        language_code: "en",
        name: null,
        description: null,
        other_details: null,
        locale: null,
    },
};

// ---------- Slice ----------
const membershipSlice = createSlice({
    name: "membership",
    initialState,
    reducers: {
        // ✅ Transform API response into slice state
        setMembershipFromApi: (state, action: PayloadAction<any>) => {
            const payload = action.payload;

            state.id = payload.id ?? null;
            state.type = payload.type?.toLowerCase() ?? "";
            state.title = payload.title ?? ""; // ✅ direct title
            state.overview = payload.overview ?? ""; // ✅ overview
            state.other_details = payload.other_details ?? "";
            state.thumbnail_url = payload.thumbnail_url ?? null; // ✅ thumbnail_url
            state.button_text = payload.button_text ?? "";
            state.button_link = payload.button_link ?? "";
            state.status = payload.status ?? "draft";


            // map packages → variants
            state.variants = []; // 🔥 clear first to avoid stale items
            state.variants = (payload.variants || []).map((variant: any) => ({
                id: variant.id ?? "",
                name: variant.name ?? "",
                description: variant.description ?? "",
                price: variant.price ?? 0,
                currency: variant.currency ?? "",
                allowed_for: variant.allowed_for ?? "",
                note: variant.note ?? "",
                vat: variant.vat ?? 0,
            }));
            // ✅ metadata
            state.metadata = {
                seo_title: payload.metadata?.seo_title ?? "",
                seo_tag: payload.metadata?.seo_tag ?? "",
                seo_description: payload.metadata?.seo_description ?? "",
            };

            // translation
            state.translation = {
                language_code: payload.translation?.language_code ?? "en",
                name: payload.translation?.name ?? "",
                description: payload.translation?.description ?? "",
                other_details: payload.translation?.other_details ?? "",
                locale: payload.translation?.locale ?? "en",
            };
        },  

        resetMembership: () => initialState,

        updateMembershipField: (
            state,
            action: PayloadAction<{ field: keyof MembershipState; value: any }>
        ) => {
            const { field, value } = action.payload;
            (state as any)[field] = value;
        },

        updateMembershipMetadata: (
            state,
            action: PayloadAction<{
                field: keyof MembershipState["metadata"];
                value: string;
            }>
        ) => {
            const { field, value } = action.payload;
            state.metadata[field] = value;
        },

        addMembershipVariant: (state, action: PayloadAction<MembershipVariant>) => {
            state.variants.push(action.payload);
        },

        removeMembershipVariant: (state, action: PayloadAction<number>) => {
            state.variants = state.variants.filter((_, idx) => idx !== action.payload);
        },

        updateMembershipVariant: (
            state,
            action: PayloadAction<{ index: number; variant: MembershipVariant }>
        ) => {
            state.variants[action.payload.index] = action.payload.variant;
        },
    },
});

// ---------- Helpers ----------
// const normalizeCurrency = (symbol: string): string => {
//     switch (symbol) {
//         case "€":
//             return "EUR";
//         case "₨":
//             return "INR";
//         case "$":
//             return "USD";
//         case "£":
//             return "GBP";
//         default:
//             return symbol; // fallback to whatever API sends
//     }
// };

// ---------- Actions ----------
export const {
    setMembershipFromApi,
    resetMembership,
    updateMembershipField,
    updateMembershipMetadata,
    addMembershipVariant,
    removeMembershipVariant,
    updateMembershipVariant,
} = membershipSlice.actions;

// ---------- Selector ----------
export const selectMembership = (state: RootState) => state.membership;

// ---------- Reducer ----------
export default membershipSlice.reducer;
