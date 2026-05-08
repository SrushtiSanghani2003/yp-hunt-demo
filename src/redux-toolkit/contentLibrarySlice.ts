import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type MediaItem = Record<string, any> & {
  mediaType: "folder" | "file";
};

const contentLibrarySlice = createSlice({
  name: "contentLibrary",
  initialState: {
    folders: [] as MediaItem[],
    totalFoldersPages: 1,
    files: [] as MediaItem[],
    totalFilesPages: 1,
  },
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    setTotalFoldersPages: (state, action) => {
      state.totalFoldersPages = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setTotalFilesPages: (state, action) => {
      state.totalFilesPages = action.payload;
    },
    clearLibrary: (state) => {
      state.folders = [];
      state.files = [];
    },
  },
});

export default contentLibrarySlice.reducer;
export const {
  setFolders,
  setTotalFoldersPages,
  setFiles,
  setTotalFilesPages,
  clearLibrary,
} = contentLibrarySlice.actions;
export const selectContentMedia = (state: RootState) => state.contentLibrary;
