// redux-toolkit/tabSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TabState = {
  isSubTab: string | null;
  activeTab: string | null;
  activeSubTab: string | null;
  lastActiveTab: string | null;
  lastActiveSubTab: string | null;
};

 

const initialState: TabState = {
  isSubTab: null,
  activeTab: null,
  activeSubTab: null,
  lastActiveTab: null,
  lastActiveSubTab: null,
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setIsSubTab: (state, action: PayloadAction<string | null>) => {
      state.isSubTab = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string | null>) => {
      state.activeTab = action.payload;
    },
    setActiveSubTab: (state, action: PayloadAction<string | null>) => {
      state.activeSubTab = action.payload;
    },
    setLastActiveTab: (state, action: PayloadAction<string | null>) => {
      state.lastActiveTab = action.payload;
    },
    setLastActiveSubTab: (state, action: PayloadAction<string | null>) => {
      state.lastActiveSubTab = action.payload;
    },
    resetTabs: (state) => {
      state.isSubTab = null;
      state.activeTab = null;
      state.activeSubTab = null;
    },
  },
});

export const {
  setIsSubTab,
  setActiveTab,
  setActiveSubTab,
  setLastActiveTab,
  setLastActiveSubTab,
  resetTabs,
} = tabSlice.actions;

export const selectTabState = (state: any) => state.tab;

export default tabSlice.reducer;
