import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ArticleState } from "./articleSlice";
import type { RootState } from "./store";

interface ArticlesState {
  allArticles: ArticleState[];
}

const initialState: ArticlesState = {
  allArticles: [],
};

const allArticlesSlice = createSlice({
  name: "allArticles",
  initialState,
  reducers: {
    addArticle(state, action: PayloadAction<ArticleState>) {
      state.allArticles.push(action.payload);
    },
    removeArticle(state, action: PayloadAction<number>) {
      state.allArticles.splice(action.payload, 1);
    },
    updateArticle(
      state,
      action: PayloadAction<{ index: number; updated: ArticleState }>
    ) {
      const { index, updated } = action.payload;
      if (state.allArticles[index]) {
        state.allArticles[index] = updated;
      }
    },
    clearArticles(state) {
      state.allArticles = [];
    },
  },
});

export default allArticlesSlice.reducer;
export const { addArticle, removeArticle, updateArticle, clearArticles } =
  allArticlesSlice.actions;
export const selectArticles = (state: RootState) => state.allArticles;
