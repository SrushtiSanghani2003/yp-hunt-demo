import api from "../lib/api";
import type { PlayerState } from "../redux-toolkit/playersSlice";

export const getPlayersList = async (
  currentPage: number,
  name?: string,
  gender?: string
) => {
  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
  };
  if (name) {
    params.search = name;
  }
  if (gender != "") {
    params.gender = gender;
  }

  const res = await api.get("/player", { params });
  return res.data;
};
export const updatePlayersAPI = (id: string, Player: PlayerState) => {
  return api.put(`/player/${id}`, Player);
};
export const fetchPlayersById = (id: string, languageCode?: string | null) => {
  return api.get(`/player/${id}`, {
    params: languageCode ? { language_code: languageCode } : {},
  });
};
