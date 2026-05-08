import api from "../lib/api";
import type { AccreditationState } from "../redux-toolkit/accreditationSlice";

export const getAccreditationList = async (
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
  const res = await api.get("/travel-request/accreditation", { params });
  return res.data;
};
export const updateAccreditationAPI = (
  id: string,
  accreditation: AccreditationState,
) => {
  return api.put(`/travel-request/accreditation/${id}`, accreditation);
};
export const getAccreditationByIdAPI = async (id: string) => {
  const res = await api.get(`/travel-request/accreditation/${id}`);
  return res.data;
};
export const downloadAccreditationTemplate = async (): Promise<Blob> => {
  const blob = (await api.get("/travel-request/accreditation/export-sample", {
    responseType: "blob",
  })) as Blob; // ✅ Type assertion (correct & safe)

  return blob;
};
export const exporaccreditationCSV = async (status?: string): Promise<Blob> => {
  const blob = (await api.get("/travel-request/accreditation/export", {
    params: status ? { status } : {},
    responseType: "blob",
  })) as Blob;

  return blob;
};
