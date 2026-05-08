import api from "../lib/api";
import type { TournamentState } from "../redux-toolkit/tournamentSlice";

export const updateTournamentAPI = (
  id: string,
  tournament: TournamentState,
) => {
  return api.patch(`/tournament/${id}`, tournament);
};
export const updateTournamentInfoAPI = (
  id: string,
  tournament: TournamentState,
) => {
  return api.patch(`/tournament/structure/${id}`, tournament);
};
export const fetchTournamentById = (
  id: string,
  languageCode?: string | null,
) => {
  return api.get(`/tournament/${id}`, {
    params: languageCode ? { language_code: languageCode } : {},
  });
};
export const updateTournamentTravelAPI = (id: string, travelDetails: any[]) => {
  return api.patch(`/tournament/${id}/travel-detail`, travelDetails);
};
export const getTournamentTravelAPI = (id: string) => {
  return api.get(`/tournament/${id}/travel-detail`);
};
