import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface RoleObject {
  id: number;
  name: string;
}

interface RoleState {
  roles: RoleObject[];
}

const initialRoleState: RoleState = {
  roles: [],
};

const roleSlice = createSlice({
  name: "roles",
  initialState: initialRoleState,
  reducers: {
    setRoles(state, action: PayloadAction<RoleObject[]>) {
      state.roles = action.payload;
    },
    resetRoles(state) {
      state.roles = [];
    },
    updateRole(state, action: PayloadAction<RoleObject>) {
      const index = state.roles.findIndex((r) => r.id === action.payload.id);
      if (index >= 0) {
        state.roles[index] = action.payload;
      } else {
        state.roles.push(action.payload);
      }
    },
  },
});

export default roleSlice.reducer;
export const { setRoles, resetRoles } = roleSlice.actions;
export const selectRoles = (state: RootState) => state.roles;

