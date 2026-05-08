import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type TransportationStatus =
  | "Pending"
  | "Confirmed"
  | "Declined"
  | "Cancel";

export interface TransportationState {
  tournament_id: number | null;

  phone_code: string;
  contact_number: string;

  pick_up: string;
  pick_up_latitude: string;
  pick_up_longitude: string;

  drop_off: string;
  drop_off_latitude: string;
  drop_off_longitude: string;

  from_id: number | null;
  to_id: number | null;

  date: string | null;
  time: string | null;

  specific_requirements: string | null;

  reg_no: string | null;
  contact_details: string | null;
  admin_notes: string | null;

  decline_reason: string | null;

  passengers: string;
  bags: string;

  status: TransportationStatus;
}

const initialState: TransportationState = {
  tournament_id: null,

  phone_code: "",
  contact_number: "",

  pick_up: "",
  pick_up_latitude: "",
  pick_up_longitude: "",

  drop_off: "",
  drop_off_latitude: "",
  drop_off_longitude: "",

  from_id: null,
  to_id: null,

  date: null,
  time: null,

  specific_requirements: null,

  reg_no: null,
  contact_details: null,
  admin_notes: null,

  decline_reason: null,

  passengers: "1",
  bags: "0",

  status: "Pending",
};

const transportationSlice = createSlice({
  name: "transportation",
  initialState,
  reducers: {
    /** Generic field updater (same pattern as shop slice) */
    setTransportationField: <K extends keyof TransportationState>(
      state: TransportationState,
      action: PayloadAction<{
        field: K;
        value: TransportationState[K];
      }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    /** Set pickup details together */
    setPickupDetails: (
      state,
      action: PayloadAction<{
        pick_up: string;
        latitude: string;
        longitude: string;
        from_id: number;
      }>
    ) => {
      const { pick_up, latitude, longitude, from_id } = action.payload;
      state.pick_up = pick_up;
      state.pick_up_latitude = latitude;
      state.pick_up_longitude = longitude;
      state.from_id = from_id;
    },

    /** Set drop-off details together */
    setDropoffDetails: (
      state,
      action: PayloadAction<{
        drop_off: string;
        latitude: string;
        longitude: string;
        to_id: number;
      }>
    ) => {
      const { drop_off, latitude, longitude, to_id } = action.payload;
      state.drop_off = drop_off;
      state.drop_off_latitude = latitude;
      state.drop_off_longitude = longitude;
      state.to_id = to_id;
    },

    /** Update only status (Pending / Confirmed / Declined / Cancel) */
    setTransportationStatus: (
      state,
      action: PayloadAction<TransportationStatus>
    ) => {
      state.status = action.payload;
    },

    /** Full object replace (edit mode / API hydrate) */
    setFullTransportation: (
      _state,
      action: PayloadAction<TransportationState>
    ) => {
      return action.payload;
    },

    /** Reset */
    resetTransportation: () => initialState,
  },
});

export const {
  setTransportationField,
  setPickupDetails,
  setDropoffDetails,
  setTransportationStatus,
  setFullTransportation,
  resetTransportation,
} = transportationSlice.actions;

export const selectTransportation = (state: RootState) => state.transportation;

export default transportationSlice.reducer;
