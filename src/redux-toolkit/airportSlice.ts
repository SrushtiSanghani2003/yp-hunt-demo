import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

/* =======================
   Types
======================= */

export interface Airport {
  airport_id: string;
  airport_name: string;
  short_code: string;
  city_name: string;
  state_name: string;
  country_name: string;
  latitude: string;
  longitude: string;
  status: string;
  created_at: string;
  updated_at: string | null;
}

export interface AirportState {
  airport_id: string | null;
  airport_name: string;
  short_code: string;
  city_name: string;
  state_name: string;
  country_name: string;
  latitude: string;
  longitude: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
}

/* =======================
   Initial State
======================= */

const initialState: AirportState = {
  airport_id: null,
  airport_name: "",
  short_code: "",
  city_name: "",
  state_name: "",
  country_name: "",
  latitude: "",
  longitude: "",
  status: "Active",
  created_at: null,
  updated_at: null,
};

/* =======================
   Slice
======================= */

const airportSlice = createSlice({
  name: "airport",
  initialState,
  reducers: {
    /* Generic field updater (same pattern as shopSlice) */
    setAirportField(
      state,
      action: PayloadAction<{
        field: keyof AirportState;
        value: any;
      }>
    ) {
      const { field, value } = action.payload;
      if (field in state) {
        state[field] = value;
      }
    },

    /* Update Airport Form – ONLY editable fields */
    setAirportForm(
      state,
      action: PayloadAction<{
        airport_name: string;
        short_code: string;
        city_name: string;
        state_name: string;
        country_name: string;
        latitude: string;
        longitude: string;
      }>
    ) {
      state.airport_name = action.payload.airport_name;
      state.short_code = action.payload.short_code;
      state.city_name = action.payload.city_name;
      state.state_name = action.payload.state_name;
      state.country_name = action.payload.country_name;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },

    /* Load full airport from API */
    setFullAirport(
      _state,
      action: PayloadAction<AirportState>
    ) {
      return action.payload;
    },

    /* Reset slice */
    resetAirport: () => initialState,
  },
});

/* =======================
   Exports
======================= */

export const {
  setAirportField,
  setAirportForm,
  setFullAirport,
  resetAirport,
} = airportSlice.actions;

export const selectAirport = (state: RootState) => state?.airport;

export default airportSlice.reducer;
