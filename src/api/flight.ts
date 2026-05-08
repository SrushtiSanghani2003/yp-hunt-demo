import api from "../lib/api";
import type { FlightState } from "../redux-toolkit/flightSlice";

export const getFlightList = async (
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

  const res = await api.get("/travel-request/flight", { params });
  return res.data;
};
export const updateFlightAPI = (id: string, flight: FlightState) => {
  return api.put(`/travel-request/flight/${id}`, flight);
};
export const fetchFlightById = (id: string, languageCode?: string | null) => {
  return api.get(`/travel-request/flight/${id}`, {
    params: languageCode ? { language_code: languageCode } : {},
  });
};
export const downloadFlightTemplate = async (): Promise<Blob> => {
  const blob = (await api.get("/travel-request/flight/export-sample", {
    responseType: "blob",
  })) as Blob; // ✅ Type assertion (correct & safe)

  return blob;
};
export const exporflightCSV = async (status?: string): Promise<Blob> => {
  const blob = (await api.get("/travel-request/flight/export", {
    params: status ? { status } : {},
    responseType: "blob",
  })) as Blob;

  return blob;
};
