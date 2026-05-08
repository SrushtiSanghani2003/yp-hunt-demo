import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface PortalUserState {
  role: number | null;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  player_ids: number[];
  team_ids: number[];
}

const initialState: PortalUserState = {
  role: null,
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  player_ids: [],
  team_ids: [],
};

const portalUserSlice = createSlice({
  name: "portalUser",
  initialState,
  reducers: {
    setPortalUserRole(state, action: PayloadAction<number>) {
      state.role = action.payload;
    },

    setPortalUserFirstName(state, action: PayloadAction<string>) {
      state.first_name = action.payload;
    },
    setPortalUserLastName(state, action: PayloadAction<string>) {
      state.last_name = action.payload;
    },

    setPortalUserEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },

    setPortalUserPhone(state, action: PayloadAction<string>) {
      state.phone_number = action.payload;
    },

    setPortalUserPlayers(state, action: PayloadAction<number []>) {
      state.player_ids = action.payload;
    },

    setPortalUserTeams(state, action: PayloadAction<number[]>) {
      state.team_ids = action.payload;
    },

    // 🔥 Set entire object (useful for edit API response)
    setPortalUser(state, action: PayloadAction<PortalUserState>) {
      state.role = action.payload.role;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.phone_number = action.payload.phone_number;
      state.player_ids = action.payload.player_ids;
      state.team_ids = action.payload.team_ids;
    },

    // ✅ Reset
    resetPortalUser: () => ({
      ...initialState,
    }),
  },
});

export const {
  setPortalUserRole,
  setPortalUserFirstName,
  setPortalUserLastName,
  setPortalUserEmail,
  setPortalUserPhone,
  setPortalUserPlayers,
  setPortalUserTeams,
  setPortalUser,
  resetPortalUser,
} = portalUserSlice.actions;

export const selectPortalUser = (state: RootState) => state.portalUser;

export default portalUserSlice.reducer;
