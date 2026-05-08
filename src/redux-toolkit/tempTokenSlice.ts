import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Token {
  tempToken: string;
}

const initialState: Token = {
  tempToken: "",
};

const tempTokenSlice = createSlice({
  name: "temptoken",
  initialState,
  reducers: {
    setToken(state, action) {
      state.tempToken = action.payload;
    },
    resetToken(state) {
      state.tempToken = "";
    },
  },
});

export default tempTokenSlice.reducer;
export const { setToken, resetToken } = tempTokenSlice.actions;
export const selectTempToken = (state: RootState) => state.temptoken;
