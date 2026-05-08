import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface AnnouncementItem {
  title: string;
  description: string;
  date: string;
}

export interface AnnouncementsState {
  tournaments_id: number | null;
  status: "Active" | "Inactive";
  announcements: AnnouncementItem[];
}

const initialState: AnnouncementsState = {
  tournaments_id: null,
  status: "Active",
  announcements: [],
};

const announcementsSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    setTournamentId: (state, action: PayloadAction<number | null>) => {
      state.tournaments_id = action.payload;
    },

    setAnnouncementStatus: (
      state,
      action: PayloadAction<"Active" | "Inactive">
    ) => {
      state.status = action.payload;
    },

    setAnnouncements: (state, action: PayloadAction<AnnouncementItem[]>) => {
      state.announcements = action.payload;
    },

    addAnnouncement: (state, action: PayloadAction<AnnouncementItem>) => {
      state.announcements.push(action.payload);
    },

    updateAnnouncement: (
      state,
      action: PayloadAction<{
        index: number;
        data: Partial<AnnouncementItem>;
      }>
    ) => {
      const { index, data } = action.payload;
      if (state.announcements[index]) {
        state.announcements[index] = {
          ...state.announcements[index],
          ...data,
        };
      }
    },

    removeAnnouncement: (state, action: PayloadAction<number>) => {
      state.announcements.splice(action.payload, 1);
    },

    resetAnnouncements: () => initialState,
  },
});

export const {
  setTournamentId,
  setAnnouncementStatus,
  setAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  removeAnnouncement,
  resetAnnouncements,
} = announcementsSlice.actions;

export const selectAnnouncements = (state: RootState) => state.announcements;

export default announcementsSlice.reducer;
