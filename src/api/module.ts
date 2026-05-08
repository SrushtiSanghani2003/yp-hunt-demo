import api from "../lib/api";
import type { ModuleState } from "../redux-toolkit/moduleSlice";

export const createModuleAPI = (payload: ModuleState) => {
  return api.post("/modules", {
    code: payload.code,
    module_group_id: payload.module_group_id,
    icon: payload.icon,
    path: payload.path,
    parent_id: payload.parent_id,
    status: payload.status,
    published_at: payload.published_at,
    translations: {
      language_code: payload.translations.language_code,
      name: payload.translations.name,
      description: payload.translations.description,
    },
  });
};
/* ---------- API Calls ---------- */
export const getModuleByIdAPI = async (id: string) => {
  const res = await api.get(`/modules/${id}`);
  return res.data;
};
export const updateModuleAPI = async (
  id: string | number,
  payload: ModuleState
) => {
  const response = await api.put(`/modules/${id}`, payload);
  return response.data;
};
//permissions
export const createPermissionsAPI = (data: any[]) => {
  return api.post("/permissions", data);
};

export const getPermissionsByModuleIdAPI = async (moduleId: number) => {
  const res = await api.get(`/permissions/getByModuleId/${moduleId}`);
  return res.data;
};
