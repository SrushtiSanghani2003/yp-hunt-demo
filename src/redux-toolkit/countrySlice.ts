import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

/* ================= TYPES ================= */

export interface CountryState {
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
}

/* ================= INITIAL STATE ================= */

const initialState: CountryState = {
  name: "",
  iso2: "",
  iso3: "",
  phonecode: "",
};

/* ================= SLICE ================= */

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    // Update single field (dynamic)
    setCountryField: (
      state,
      action: PayloadAction<{
        field: keyof CountryState;
        value: string;
      }>,
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    // Set full country object
    setFullCountry: (_state, action: PayloadAction<CountryState>) => {
      return action.payload;
    },

    // Reset country
    resetCountry: () => initialState,
  },
});

/* ================= EXPORTS ================= */

export const { setCountryField, setFullCountry, resetCountry } =
  countrySlice.actions;

export const selectCountry = (state: RootState) => state.country;

export default countrySlice.reducer;
