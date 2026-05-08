import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

/** Status type */
export type AccreditationStatus =
  | "Pending"
  | "Confirmed"
  | "Declined"
  | "Cancel";

/** State interface */
export interface AccreditationState {
  appuser_id: number | null;
  tournament_id: number | null;

  contact_phone_code: string;
  contact_number: string;

  first_name: string;
  last_name: string;
  email: string;

  phone_code: string;
  phone_number: string;

  document_type: string; // File / Image / PDF etc
  image: string; // document path

  admin_notes: string | null;
  decline_reason: string | null;

  created_type: string; // Self / Admin
  book_for: string; // Player / Official
  book_for_id: number | null;

  created_request_type: string; // Mobile / Web
  updated_by: number | null;

  status: AccreditationStatus;
  request_on: string | null; // ISO date
}

/** Initial state */
const initialState: AccreditationState = {
  appuser_id: null,
  tournament_id: null,

  contact_phone_code: "",
  contact_number: "",

  first_name: "",
  last_name: "",
  email: "",

  phone_code: "",
  phone_number: "",

  document_type: "",
  image: "",

  admin_notes: null,
  decline_reason: null,

  created_type: "Self",
  book_for: "",
  book_for_id: null,

  created_request_type: "Web",
  updated_by: null,

  status: "Pending",
  request_on: null,
};

const accreditationSlice = createSlice({
  name: "accreditation",
  initialState,
  reducers: {
    /** Generic field updater */
    setAccreditationField: <K extends keyof AccreditationState>(
      state: AccreditationState,
      action: PayloadAction<{
        field: K;
        value: AccreditationState[K];
      }>,
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    /** Update status only */
    setAccreditationStatus: (
      state,
      action: PayloadAction<AccreditationStatus>,
    ) => {
      state.status = action.payload;
    },

    /** Full object replace (edit / API hydrate) */
    setFullAccreditation: (
      _state,
      action: PayloadAction<AccreditationState>,
    ) => {
      return action.payload;
    },

    /** Reset */
    resetAccreditation: () => initialState,
  },
});

/** Actions */
export const {
  setAccreditationField,
  setAccreditationStatus,
  setFullAccreditation,
  resetAccreditation,
} = accreditationSlice.actions;

/** Selector */
export const selectAccreditation = (state: RootState) => state.accreditation;

export default accreditationSlice.reducer;
