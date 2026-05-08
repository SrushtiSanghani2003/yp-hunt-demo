import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface TagObject {
  id: number;
  name: string;
}

interface TagState {
  tags: TagObject[];
}

const initialTagState: TagState = {
  tags: [],
};

const tagSlice = createSlice({
  name: "tags",
  initialState: initialTagState,
  reducers: {
    setTags(state, action: PayloadAction<TagObject[]>) {
      state.tags = action.payload;
    },
    resetTags(state) {
      state.tags = [];
    },
    updateTag(state, action: PayloadAction<TagObject>) {
      const index = state.tags.findIndex((t) => t.id === action.payload.id);
      if (index >= 0) {
        state.tags[index] = action.payload;
      } else {
        state.tags.push(action.payload);
      }
    },
  },
});

export default tagSlice.reducer;
export const { setTags, resetTags } = tagSlice.actions;
export const selectTags = (state: RootState) => state.tags;
