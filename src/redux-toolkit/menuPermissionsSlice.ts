import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { MenuPermissionsState } from "../components/sidebar/menuPermissions";

// Initial state with two keys
const initialState: MenuPermissionsState = {
  sidebarMenus: {},
  administrationMenus: {},
};

const menuPermissions = createSlice({
  name: "menuPermissions",
  initialState,
  reducers: {
    setMenuPermissions(_state, action: PayloadAction<MenuPermissionsState>) {
      return action.payload;
    },
    setAdministrationPermissions(
      _state,
      action: PayloadAction<MenuPermissionsState>
    ) {
      return action.payload;
    },
    resetMenuPermissions() {
      return {
        sidebarMenus: {},
        administrationMenus: {},
      };
    },
  },
});

export default menuPermissions.reducer;
export const {
  setMenuPermissions,
  setAdministrationPermissions,
  resetMenuPermissions,
} = menuPermissions.actions;

export const selectMenuPermissions = (state: RootState) =>
  state.menuPermissions.sidebarMenus;
export const selectAdministrationPermissions = (state: RootState) =>
  state.menuPermissions.administrationMenus;
