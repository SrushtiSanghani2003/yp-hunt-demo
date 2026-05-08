import api from "../lib/api";

export const getAppUserById = (id: string) => {
  return api.get(`/appuser/${id}`);
};

export const updateAppUser = (id: string, payload: any) => {
  return api.patch(`/appuser/${id}`, payload);
};
