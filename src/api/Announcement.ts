import api from "../lib/api";
import type { AnnouncementsState } from "../redux-toolkit/announcementsSlice";

export const getAnnouncementsList = async (
  currentPage: number,
  name?: string
) => {
  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
  };
  if (name) {
    params.search = name;
  }

  const res = await api.get("/announcements", { params });
  return res.data;
};
export const createAnnouncementsAPI = (Announcements: AnnouncementsState) => {
  return api.post("/announcements", Announcements);
};

export const updateAnnouncementsAPI = (
  id: string,
  Announcements: AnnouncementsState
) => {
  return api.put(`/announcements/${id}`, Announcements);
};
export const getAnnouncementsByIdAPI = async (id: string) => {
  const res = await api.get(`/announcements/${id}`);
  return res.data;
};
