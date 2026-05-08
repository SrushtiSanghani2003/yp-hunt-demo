import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserDetails {
  [key: string]: any;
}

const initialState: UserDetails = {};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      return { ...state, ...action.payload };
    },
    clearUserDetails: () => initialState,
  },
});

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;
export const selectUser = (state: RootState) => state.userDetails;
export default userDetailsSlice.reducer;
