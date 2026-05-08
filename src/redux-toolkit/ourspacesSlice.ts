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

export interface OurSpacesState {

    metadata: {
        seo_title: string;
        seo_tag: string;
        seo_description: string;
    };

    image: string | null;
    translation: {
        language_code: string;
        title: string | null;
        description: string | null;
        button_label: string | null;
        button_url: string | null;

    };
    blocks: Block[];
}

const initialState: OurSpacesState = {

    metadata: {
        seo_title: "",
        seo_tag: "",
        seo_description: "",
    },  
    image: null,
    translation: {
        language_code: "en",
        title: "",
        description: "",
        button_label: "",
        button_url: "",
    },
    blocks: [],
};

const newsSlice = createSlice({
    name: "ourspaces",
    initialState,
    reducers: {
        setOurspaceTitle(state, action: PayloadAction<string>) {
            state.translation.title = action.payload;
        },
        setOurspaceButtonLabel(state, action: PayloadAction<string>) {
            state.translation.button_label = action.payload;
        },
        setOurspaceButtonUrl(state, action: PayloadAction<string>) {
            state.translation.button_url = action.payload;
        },

        setNewsSummary(state, action: PayloadAction<string>) {
            state.translation.description = action.payload;
        },


        updateourspacesMediaContentField: (
            state,
            action: PayloadAction<{ field: keyof OurSpacesState; value: any }>
        ) => {
            const { field, value } = action.payload;
            (state as any)[field] = value;
        },


        updateourspacesMetadataField(
            state,
            action: PayloadAction<{
                field: keyof OurSpacesState["metadata"];
                value: string;
            }>
        ) {
            const { field, value } = action.payload;
            if (field in state.metadata) {
                state.metadata[field] = value;
            }
        },

        //------------------------------- BLOCKS MANAGEMENT ------------------------------------------
        OurspacesChangeBlockStatus(state, action) {
            const { index } = action.payload;
            state.blocks[index].content.is_active =
                !state.blocks[index].content.is_active;
        },
        SpacesAddBlock(state, action: PayloadAction<BlockType | string>) {
            const sort_order = state.blocks.length + 1;
            const newBlock = createEmptyBlock(action.payload, sort_order);
            state.blocks.push(newBlock);
        },

        OurspacesChangeBlockType(
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

        OurspacesMoveBlock(
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

        OurspacesRemoveBlock(state, action: PayloadAction<number>) {
            const index = action.payload;
            state.blocks.splice(index, 1);
            // Update sort_order after removal
            state.blocks.forEach((block, i) => {
                block.sort_order = i + 1;
            });
        },

        OurspaceUpdateBlockContent(
            state,
            action: PayloadAction<{ index: number; updatedBlock: Block }>
        ) {
            const { index, updatedBlock } = action.payload;
            if (index >= 0 && index < state.blocks.length) {
                state.blocks[index] = updatedBlock;
            }
        },
      
        setFullspaces: (_state, action: PayloadAction<OurSpacesState>) => {
            return action.payload;
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
    setOurspaceTitle,
    setOurspaceButtonLabel,
    setOurspaceButtonUrl,
    setNewsSummary,
    updateourspacesMetadataField,
    updateourspacesMediaContentField,
    OurspacesChangeBlockStatus,
    SpacesAddBlock,
    OurspacesChangeBlockType,
    OurspacesMoveBlock,
    OurspaceUpdateBlockContent,
    OurspacesRemoveBlock,
    setFullspaces,
    resetNews,
} = newsSlice.actions;
export const selectOurSpaces = (state: RootState) => state.ourspacesSlice;
export default newsSlice.reducer;
