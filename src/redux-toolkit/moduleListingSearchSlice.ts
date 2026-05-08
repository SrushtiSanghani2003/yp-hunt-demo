import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// ✅ Each module's listing state
export type ModuleListingState = {
  page: number;
  search: string;
  filters: Record<string, any>; // generic filters (status, year, tournament, etc.)
};

// ✅ Entire slice state keyed by module name
export type ListingState = {
  [module: string]: ModuleListingState;
};

const defaultListingState: ModuleListingState = {
  page: 1,
  search: "",
  filters: {},
};

const initialState: ListingState = {};

const moduleListingSearchSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setListingState: (
      state,
      action: PayloadAction<{
        module: string;
        page?: number;
        search?: string;
        filters?: Record<string, any>;
      }>,
    ) => {
      const { module, page, search, filters } = action.payload;

      if (!state[module]) {
        state[module] = { page: 1, search: "", filters: {} };
      }

      if (page !== undefined) state[module].page = page;
      if (search !== undefined) state[module].search = search;
      if (filters !== undefined)
        state[module].filters = { ...state[module].filters, ...filters };
    },

    resetListingState: (state, action: PayloadAction<{ module: string }>) => {
      const { module } = action.payload;
      state[module] = { page: 1, search: "", filters: {} };
    },
  },
});

// ✅ Actions
export const { setListingState, resetListingState } =
  moduleListingSearchSlice.actions;

// ✅ Selector
export const selectListingState =
  (module: string) =>
  (state: RootState): ModuleListingState =>
    state?.listing?.[module] ?? defaultListingState;

export default moduleListingSearchSlice.reducer;
