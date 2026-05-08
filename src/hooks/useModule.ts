import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  createModuleAPI,
  createPermissionsAPI,
  getModuleByIdAPI,
  getPermissionsByModuleIdAPI,
  updateModuleAPI,
} from "../api/module";
import { showToast } from "../utils/toastUtils";

import { useDispatch } from "react-redux";
import { paths } from "../config/paths";
import { resetModule, type ModuleState } from "../redux-toolkit/moduleSlice";

/* -------- Types -------- */
export interface CreateModulePayload {
  code: string;
  module_group_id: number;
  parent_id: number | null;
  status: "draft" | "published" | "scheduled";
  published_at: string | null;
  translations: {
    language_code: string;
    name: string;
    description: string | null;
  };
}

export const useCreateModule = (module: ModuleState) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => createModuleAPI(module),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dynamicSideMenu"],
        exact: false,
      });
      showToast("module Created", "success");
      dispatch(resetModule());
      navigate(paths.module.path);
    },
    onError: (error: any) => {
      console.error("Error while adding module", error);
      const message =
        error?.response?.data?.message || "Failed to create module";
      showToast(message, "error");
    },
  });
};
export const useGetModuleById = (id?: string) => {
  return useQuery({
    queryKey: ["module", id],
    queryFn: () => getModuleByIdAPI(id as string),
    enabled: !!id,
  });
};
export const useUpdateModule = (module: ModuleState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (id: string) => {
      // Exclude `code` when updating
      const { code, ...updatePayload }: any = module;
      return updateModuleAPI(id, updatePayload);
    },
    onSuccess: () => {
      showToast("Module Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["module"] });
      queryClient.invalidateQueries({
        queryKey: ["dynamicSideMenu"],
        exact: false,
      });
      dispatch(resetModule());
      navigate(paths.module.path);
    },
    onError: (error) => {
      console.error("Module update failed", error);
      showToast("Failed to update module", "error");
    },
  });
};
//permissions
export const useCreatePermissions = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: any[]) => createPermissionsAPI(payload),
    onSuccess: () => {
      showToast("Permissions created successfully", "success");
      navigate(paths.module.path);
    },
    onError: (error: any) => {
      showToast(
        error?.response?.data?.message || "Failed to create permissions",
        "error",
      );
    },
  });
};
export const useGetPermissionsByModuleId = (moduleId?: number | any) => {
  return useQuery({
    queryKey: ["permissions", moduleId],
    queryFn: () => getPermissionsByModuleIdAPI(moduleId!),
    enabled: !!moduleId,
  });
};
