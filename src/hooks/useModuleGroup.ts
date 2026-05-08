import { useNavigate } from "react-router-dom";
import {
  resetModuleGroup,
  type ModuleGroupState,
} from "../redux-toolkit/moduleGroupSlice";
import { useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../utils/toastUtils";
import { paths } from "../config/paths";
import {
  createModuleGroupAPI,
  getModuleGroupByIdAPI,
  updateModuleGroupAPI,
} from "../api/modelGroup";

export const useCreateModuleGroup = (moduleGroup: ModuleGroupState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => createModuleGroupAPI(moduleGroup),
    onSuccess: () => {
      showToast("module group Created", "success");
      queryClient.invalidateQueries({
        queryKey: ["dynamicSideMenu"],
        exact: false,
      });
      dispatch(resetModuleGroup());
      navigate(paths.groupmodule.path);
    },
    onError: (error: any) => {
      console.error("Error while adding module group", error);
      const message =
        error?.response?.data?.message || "Failed to create module group";
      showToast(message, "error");
    },
  });
};
export const useUpdateModuleGroup = (moduleGroup: ModuleGroupState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (id: string) => {
      // Exclude `code` when updating
      const { code, ...updatePayload }: any = moduleGroup;
      return updateModuleGroupAPI(id, updatePayload);
    },
    onSuccess: () => {
      showToast("Module Group Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["module-group"] });
      queryClient.invalidateQueries({
        queryKey: ["dynamicSideMenu"],
        exact: false,
      });
      dispatch(resetModuleGroup());
      navigate(paths.groupmodule.path);
    },
    onError: (error) => {
      console.error("Module Group update failed", error);
      showToast("Failed to update module group", "error");
    },
  });
};
export const useGetModuleGroupById = (id?: string) => {
  return useQuery({
    queryKey: ["module-group", id],
    queryFn: () => getModuleGroupByIdAPI(id as string),
    enabled: !!id,
  });
};
