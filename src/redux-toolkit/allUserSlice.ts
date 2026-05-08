import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface AllUserState {
  role: number | null;
  player_ids: number[];
}

const initialState: AllUserState = {
  role: 4,
  player_ids: [],
};

const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {
    setAllUserRole(state, action: PayloadAction<number>) {
      state.role = action.payload;
    },

    setAllUserPlayers(state, action: PayloadAction<number[]>) {
      state.player_ids = action.payload;
    },

    setAllUser(state, action: PayloadAction<AllUserState>) {
      state.role = action.payload.role;
      state.player_ids = action.payload.player_ids;
    },

    // ✅ IMPORTANT: return new object
    resetAllUser: () => ({
      ...initialState,
    }),
  },
});

export const {
  setAllUserRole,
  setAllUserPlayers,
  setAllUser,
  resetAllUser,
} = allUserSlice.actions;

export const selectAllUser = (state: RootState) => state.allUser;

export default allUserSlice.reducer;
