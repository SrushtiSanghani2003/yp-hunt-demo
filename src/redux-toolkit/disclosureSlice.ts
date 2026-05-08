import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface DisclosureState {
  isOpen: boolean;
  collapsed: boolean;
}

const initialState: DisclosureState = {
  isOpen: false,
  collapsed: false,
};

const disclosureSlice = createSlice({
  name: "disclosure",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    changeCollapsed(state,action) {
      state.collapsed = action.payload;
    },
    toggleCollapse: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { open, close, toggle, toggleCollapse,changeCollapsed } = disclosureSlice.actions;
export const selectState = (state: RootState) => state.disclosure;
export default disclosureSlice.reducer;
