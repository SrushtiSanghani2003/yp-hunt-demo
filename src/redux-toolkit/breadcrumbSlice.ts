import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Crumb {
  id: string | null;
  name: string;
}

interface BreadcrumbState {
  crumbs: Crumb[];
}

const initialState: BreadcrumbState = {
  crumbs: [{ id: null, name: "Home" }],
};

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    pushCrumb: (state, action: PayloadAction<Crumb>) => {
      state.crumbs.push(action.payload);
    },
    popToIndex: (state, action: PayloadAction<number>) => {
      state.crumbs = state.crumbs.slice(0, action.payload + 1);
    },
    setCrumbs(state, action) {
      state.crumbs = action.payload;
    },
    resetCrumbs: (state) => {
      state.crumbs = [{ id: null, name: "Home" }];
    },
  },
});

export const { pushCrumb, popToIndex, setCrumbs, resetCrumbs } =
  breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
export const selectBreadCrumbs = (state: RootState) => state.breadcrumb;
