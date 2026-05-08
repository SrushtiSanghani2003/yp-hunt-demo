import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

/** Status type */
export type AccommodationStatus =
  | "Pending"
  | "Confirmed"
  | "Declined"
  | "Cancel";

/** State interface */
export interface AccommodationState {
  tournament_id: number | null;

  phone_code: string;
  contact_number: string;

  check_in: string | null; // YYYY-MM-DD
  check_out: string | null; // YYYY-MM-DD

  specific_requirements: string | null;

  travel_detail_id: number | null;

  hotel_name: string;
  hotel_address: string;
  hotel_address_map_url: string;

  contact_details: string | null;
  admin_notes: string | null;
  decline_reason: string | null;

  guests: string;
  rooms: string;
  room_type: string;

  status: AccommodationStatus;
}

/** Initial state */
const initialState: AccommodationState = {
  tournament_id: null,

  phone_code: "",
  contact_number: "",

  check_in: null,
  check_out: null,

  specific_requirements: null,

  travel_detail_id: null,

  hotel_name: "",
  hotel_address: "",
  hotel_address_map_url: "",

  contact_details: null,
  admin_notes: null,
  decline_reason: null,

  guests: "1",
  rooms: "1",
  room_type: "",

  status: "Pending",
};

const accommodationSlice = createSlice({
  name: "accommodation",
  initialState,
  reducers: {
    /** Generic field updater */
    setAccommodationField: <K extends keyof AccommodationState>(
      state: AccommodationState,
      action: PayloadAction<{
        field: K;
        value: AccommodationState[K];
      }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    /** Update status only */
    setAccommodationStatus: (
      state,
      action: PayloadAction<AccommodationStatus>
    ) => {
      state.status = action.payload;
    },

    /** Full object replace (edit mode / API hydrate) */
    setFullAccommodation: (
      _state,
      action: PayloadAction<AccommodationState>
    ) => {
      return action.payload;
    },

    /** Reset */
    resetAccommodation: () => initialState,
  },
});

/** Actions */
export const {
  setAccommodationField,
  setAccommodationStatus,
  setFullAccommodation,
  resetAccommodation,
} = accommodationSlice.actions;

/** Selector */
export const selectAccommodation = (state: RootState) => state.accommodation;

export default accommodationSlice.reducer;
