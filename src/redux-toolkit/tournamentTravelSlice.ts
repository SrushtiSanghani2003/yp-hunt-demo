import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

/* -------------------- TYPES -------------------- */

export interface TournamentTravel {
  type: string; // hotel | airport | train | bus
  title: string;

  // Hotel specific
  hotel_address?: string | null;
  hotel_address_map_url?: string | null;
  contact_details?: string | null;
}

export interface TournamentTravelState {
  travels: TournamentTravel[];
}

/* -------------------- INITIAL STATE -------------------- */

const initialState: TournamentTravelState = {
  travels: [],
};

/* -------------------- SLICE -------------------- */

const tournamentTravelSlice = createSlice({
  name: "tournamentTravel",
  initialState,
  reducers: {
    /* Set entire travel data (EDIT / API LOAD) */
    setFullTournamentTravel: (
      _state,
      action: PayloadAction<TournamentTravelState>
    ) => {
      return action.payload;
    },

    /* Add new travel block */
    addTournamentTravel: (
      state,
      action: PayloadAction<TournamentTravel>
    ) => {
      state.travels.push(action.payload);
    },

    /* Update travel by index */
    updateTournamentTravel: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof TournamentTravel;
        value: any;
      }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.travels[index]) {
        state.travels[index][field] = value;
      }
    },

    /* Update multiple fields at once */
    updateTournamentTravelBlock: (
      state,
      action: PayloadAction<{
        index: number;
        data: Partial<TournamentTravel>;
      }>
    ) => {
      const { index, data } = action.payload;
      if (state.travels[index]) {
        state.travels[index] = {
          ...state.travels[index],
          ...data,
        };
      }
    },

    /* Remove travel block */
    removeTournamentTravel: (state, action: PayloadAction<number>) => {
      state.travels.splice(action.payload, 1);
    },

    /* Reset slice */
    resetTournamentTravel: () => initialState,
  },
});

/* -------------------- EXPORTS -------------------- */

export const {
  setFullTournamentTravel,
  addTournamentTravel,
  updateTournamentTravel,
  updateTournamentTravelBlock,
  removeTournamentTravel,
  resetTournamentTravel,
} = tournamentTravelSlice.actions;

export const selectTournamentTravel = (state: RootState) =>
  state.tournamentTravel;

export default tournamentTravelSlice.reducer;
