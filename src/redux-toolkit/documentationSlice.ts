import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { extractFileType } from "../config/function";
export interface DocumentItem {
  title: string;
  files: string; // filename / url
  type: string;
  extension: string;
  display_order: number;
}

export interface DocumentsState {
  tournaments_id: number | null;
  status: "Active" | "Inactive";
  documents: DocumentItem[];
}

const initialState: DocumentsState = {
  tournaments_id: null,
  status: "Active", // ✅ DEFAULT value
  documents: [],
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setTournamentId: (state, action: PayloadAction<number | null>) => {
      state.tournaments_id = action.payload;
    },

    setDocumentStatus: (
      state,
      action: PayloadAction<"Active" | "Inactive">
    ) => {
      state.status = action.payload;
    },

    setDocuments: (state, action: PayloadAction<DocumentItem[]>) => {
      state.documents = action.payload;
    },

    /** ⭐ MAIN ACTION — single input upload */
    addDocumentFromFile: (
      state,
      action: PayloadAction<{
        file: File;
        title?: string;
      }>
    ) => {
      const { file, title } = action.payload;

      const extension = file.name.split(".").pop()?.toLowerCase() || "";
      const type = extractFileType(extension);

      state.documents.push({
        title: title || file.name,
        files: file.name, // API response ma URL aave to ae set karjo
        type,
        extension,
        display_order: state.documents.length + 1,
      });
    },

    updateDocument: (
      state,
      action: PayloadAction<{
        index: number;
        data: Partial<DocumentItem>;
      }>
    ) => {
      const { index, data } = action.payload;
      if (state.documents[index]) {
        state.documents[index] = {
          ...state.documents[index],
          ...data,
        };
      }
    },

    removeDocument: (state, action: PayloadAction<number>) => {
      state.documents.splice(action.payload, 1);

      // reorder display_order
      state.documents.forEach((doc, i) => {
        doc.display_order = i + 1;
      });
    },

    resetDocuments: () => initialState,
  },
});

export const {
  setTournamentId,
  setDocumentStatus,
  setDocuments,
  addDocumentFromFile,
  updateDocument,
  removeDocument,
  resetDocuments,
} = documentsSlice.actions;

export const selectDocuments = (state: RootState) => state.documents;

export default documentsSlice.reducer;
