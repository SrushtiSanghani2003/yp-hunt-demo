import api from "../lib/api";
import type { DocumentsState } from "../redux-toolkit/documentationSlice";

export const getDocumentationList = async (
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

  const res = await api.get("/tournament-documentation", { params });
  return res.data;
};
export const createDocumentationAPI = (documents: DocumentsState) => {
  return api.post("/tournament-documentation", documents);
};

export const updateDocumentationAPI = (
  id: string,
  documents: DocumentsState
) => {
  return api.put(`/tournament-documentation/${id}`, documents);
};
export const getDocumentationByIdAPI = async (id: string) => {
  const res = await api.get(`/tournament-documentation/${id}`);
  return res.data;
};
