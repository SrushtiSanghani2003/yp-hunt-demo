import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface BroadcastState {
  broadcast_url: string;
  image: string | null;
  country_id: number[];
}

const initialState: BroadcastState = {
  broadcast_url: "",
  image: null,
  country_id: [],
};

const broadcastSlice = createSlice({
  name: "broadcast",
  initialState,
  reducers: {
    setBroadcastField: (
      state,
      action: PayloadAction<{ field: keyof BroadcastState; value: any }>
    ) => {
      const { field, value } = action.payload;
      if (field in state) {
        state[field] = value;
      }
    },

    setBroadcastUrl: (state, action: PayloadAction<string>) => {
      state.broadcast_url = action.payload;
    },

    setBroadcastImage: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload;
    },

    setBroadcastCountries: (state, action: PayloadAction<number[]>) => {
      state.country_id = action.payload;
    },

    setFullBroadcast: (_state, action: PayloadAction<BroadcastState>) => {
      return action.payload;
    },

    resetBroadcast: () => initialState,
  },
});

export const {
  setBroadcastField,
  setBroadcastUrl,
  setBroadcastImage,
  setBroadcastCountries,
  setFullBroadcast,
  resetBroadcast,
} = broadcastSlice.actions;

export const selectBroadcast = (state: RootState) => state.broadcast;

export default broadcastSlice.reducer;
