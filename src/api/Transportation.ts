import api from "../lib/api";
import type { TransportationState } from "../redux-toolkit/transportationSlice";

export const getTransportationList = async (
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

  const res = await api.get("/travel-request/transportation", { params });
  return res.data;
};
export const updatetransportationAPI = (
  id: string,
  transportation: TransportationState,
) => {
  return api.put(`/travel-request/transportation/${id}`, transportation);
};
export const fetchTransportationById = (
  id: string,
  languageCode?: string | null,
) => {
  return api.get(`/travel-request/transportation/${id}`, {
    params: languageCode ? { language_code: languageCode } : {},
  });
};
export const downloadTransportationTemplate = async (): Promise<Blob> => {
  const blob = (await api.get("/travel-request/transportation/export-sample", {
    responseType: "blob",
  })) as Blob; // ✅ Type assertion (correct & safe)

  return blob;
};
export const exportTransportationCSV = async (
  status?: string,
): Promise<Blob> => {
  const blob = (await api.get("/travel-request/transportation/export", {
    params: status ? { status } : {},
    responseType: "blob",
  })) as Blob;

  return blob;
};
