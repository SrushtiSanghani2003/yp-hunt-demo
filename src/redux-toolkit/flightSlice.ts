import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type FlightStatus = "Pending" | "Confirmed" | "Declined" | "Cancel";

/* -------------------- Types -------------------- */
export interface FlightState {
  tournaments_id: number | null;

  from_airport_id: number | null;
  to_airport_id: number | null;

  travel_date: string;
  travel_time: string;

  return_date: string;
  return_time: string;

  name: string;
  email: string;
  passport_number: string;

  birth_date: string;
  religion: string;
  nationality: string;
  visit_type: string;

  special_requests: string;
  ticket: string;
  time: string;
  airline: string;
  booking_provider: string;
  booking_reference: string;
  decline_reason: string;
  admin_notes: string;
  status: string;
}

/* -------------------- Initial State -------------------- */
const initialState: FlightState = {
  tournaments_id: null,

  from_airport_id: null,
  to_airport_id: null,

  travel_date: "",
  travel_time: "",
  ticket: "",
  return_date: "",
  return_time: "",

  name: "",
  email: "",
  passport_number: "",

  birth_date: "",
  religion: "",
  nationality: "",
  visit_type: "",

  special_requests: "",

  time: "",
  airline: "",
  booking_provider: "",
  booking_reference: "",
  decline_reason: "",
  admin_notes: "",
  status: "Pending",
};

/* -------------------- Slice -------------------- */
const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFlightField: (
      state,
      action: PayloadAction<{
        field: keyof FlightState;
        value: any;
      }>,
    ) => {
      const { field, value } = action.payload;
      if (field in state) {
        // @ts-ignore
        state[field] = value;
      }
    },

    setTicketFile: (state, action: PayloadAction<string>) => {
      state.ticket = action.payload; // overwrite previous file
    },

    setFlightFromAirport: (state, action: PayloadAction<number | null>) => {
      state.from_airport_id = action.payload;
    },

    setFlightToAirport: (state, action: PayloadAction<number | null>) => {
      state.to_airport_id = action.payload;
    },

    setFlightTravelDate: (state, action: PayloadAction<string | any>) => {
      state.travel_date = action.payload;
    },
    setFlightTravelTime: (state, action: PayloadAction<string | any>) => {
      state.travel_time = action.payload;
    },
    setTime: (state, action: PayloadAction<string | any>) => {
      state.time = action.payload;
    },
    setBirthdateDate: (state, action: PayloadAction<string | any>) => {
      state.birth_date = action.payload;
    },

    setFlightReturnDate: (state, action: PayloadAction<string>) => {
      state.return_date = action.payload;
    },

    setFlightStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },

    setFullFlight: (_state, action: PayloadAction<FlightState>) => {
      return action.payload;
    },

    resetFlight: () => initialState,
  },
});

/* -------------------- Exports -------------------- */
export const {
  setFlightField,
  setFlightFromAirport,
  setFlightToAirport,
  setFlightTravelDate,
  setBirthdateDate,
  setFlightTravelTime,
  setTime,
  setTicketFile,
  setFlightReturnDate,
  setFlightStatus,
  setFullFlight,
  resetFlight,
} = flightSlice.actions;

export const selectFlight = (state: RootState) => state.flight;

export default flightSlice.reducer;
