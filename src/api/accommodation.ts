import api from "../lib/api";
import type { AccommodationState } from "../redux-toolkit/accommodationSlice";

export const getAccommodationList = async (
  currentPage: number,
  name?: string,
  status?: string,
  from_date?: string,
  to_date?: string,
  tournamentId?: number | null,
) => {
  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
  };
  if (name) {
    params.search = name;
  }
  if (status) {
    params.status = status;
  }
  if (from_date) {
    params.from_date = from_date;
  }
  if (to_date) {
    params.to_date = to_date;
  }
  if (tournamentId) {
    params.tournament_id = tournamentId;
  }

  const res = await api.get("/travel-request/accommodation", { params });
  return res.data;
};
export const updateAccommodationAPI = (
  id: string,
  accommodation: AccommodationState,
) => {
  return api.put(`/travel-request/accommodation/${id}`, accommodation);
};
export const getAccommodationByIdAPI = async (id: string) => {
  const res = await api.get(`/travel-request/accommodation/${id}`);
  return res.data;
};
export const downloadAccommodationTemplate = async (): Promise<Blob> => {
  const blob = (await api.get("/travel-request/accommodation/export-sample", {
    responseType: "blob",
  })) as Blob; // ✅ Type assertion (correct & safe)

  return blob;
};
export const exporaccommodationCSV = async (status?: string): Promise<Blob> => {
  const blob = (await api.get("/travel-request/accommodation/export", {
    params: status ? { status } : {},
    responseType: "blob",
  })) as Blob;

  return blob;
};
