import api from "../lib/api";
import type { ModuleGroupState } from "../redux-toolkit/moduleGroupSlice";

export const createModuleGroupAPI = (payload: ModuleGroupState) => {
  return api.post("/module-groups", {
    code: payload.code,
    status: 1,
    order: 1,
    translations: {
      language_code: payload.translations.language_code,
      name: payload.translations.name,
      description: payload.translations.description,
    },
  });
};
export const updateModuleGroupAPI = async (
  id: string | number,
  payload: ModuleGroupState
) => {
  const response = await api.put(`/module-groups/${id}`, payload);
  return response.data;
};
export const getModuleGroupByIdAPI = async (id: string) => {
  const res = await api.get(`/module-groups/${id}`);
  return res.data;
};
