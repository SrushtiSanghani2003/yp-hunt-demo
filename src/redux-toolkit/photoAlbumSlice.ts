import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Album {
  id: string;
  name: string;
  thumbnail_url: string;
  status: string;
  published_at: string | null;
  created_by: number;
  images: any[];
}

const initialState: Album[] = [];

const photoAlbumSlice = createSlice({
  name: "photoAlbum",
  initialState,
  reducers: {
    // setAlbums(state, action) {
    //   state = action.payload;
    // },
  },
});

export default photoAlbumSlice.reducer;
// export const { setAlbums } = photoAlbumSlice.actions;
export const selectPhotoAlbums = (state: RootState) => state.photoAlbum;
