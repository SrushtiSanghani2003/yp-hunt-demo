import api from "../lib/api";
import type { BroadcastState } from "../redux-toolkit/whereToWatchSlice";
export type Country = {
  id: number;
  name: string;
};
export const getBroadcastList = async (currentPage: number, name?: string) => {
  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
  };
  if (name) {
    params.search = name;
  }

  const res = await api.get("/broadcast/", { params });
  return res.data;
};

export const deleteBroadcastItem = (id: string) =>
  api.delete(`/broadcast/${id}`);

export const fetchBroadcastById = (
  id: string,
  languageCode?: string | null
) => {
  return api.get(`/broadcast/${id}`, {
    params: languageCode ? { language_code: languageCode } : {},
  });
};

export const createBroadcastAPI = (broadcast: BroadcastState) => {
  return api.post("/broadcast/", broadcast);
};

export const updateBroadcastAPI = (id: string, broadcast: BroadcastState) => {
  return api.patch(`/broadcast/${id}`, broadcast);
};

export const updateBroadcastStatus = (id: string, status: boolean) => {
  return api.put(`/broadcast/${id}/status`, { status });
};

export const fetchCountries = async (): Promise<Country[]> => {
  const res = await api.get("broadcast/get-country");
  return res.data; // <-- ensure this is an array of countries
};
