import api from "../lib/api";
// import type { CompetitionState } from "../redux-toolkit/competitionSlice";

export const createNavigationAPI = (article: any) => {
  return api.post("/menu/create", article);
};

export const updateNavigationAPI = (id: string, article: any) => {
  return api.put(`/menu/${id}`, article);
};
