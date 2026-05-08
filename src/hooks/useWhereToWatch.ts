import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { paths } from "../config/paths";
import { showToast } from "../utils/toastUtils";
import { useDispatch } from "react-redux";

import {
  resetBroadcast,
  type BroadcastState,
} from "../redux-toolkit/whereToWatchSlice";
import {
  createBroadcastAPI,
  deleteBroadcastItem,
  fetchBroadcastById,
  fetchCountries,
  getBroadcastList,
  updateBroadcastAPI,
  type Country,
} from "../api/whereToWatch";

export const useBroadcastlist = (
  page: number,
  search: string,
  skip = false
) => {
  const query = useQuery({
    queryKey: ["broadcast", page, search],
    queryFn: () => getBroadcastList(page, search),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};

export const useDeleteBroadcastItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBroadcastItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["broadcast"],
        exact: false,
      });
    },
  });
};

export const useBroadcastById = (
  id: string | undefined,
  languageCode?: string | null
) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["broadcast", id, languageCode],
    queryFn: () => fetchBroadcastById(id!, languageCode),
    enabled: isEditMode,
  });
};

export const useCreateWhereToWatch = (broadcast: BroadcastState) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => createBroadcastAPI(broadcast),
    onSuccess: () => {
      showToast("where to watch Created", "success");
      dispatch(resetBroadcast());
      navigate(paths.wheretowatch.path);
    },
    onError: (error) => {
      console.error("Error while adding where to watch", error);
      showToast("Failed to create where to watch", "error");
    },
  });
};

export const useUpdateBroadcast = (broadcast: BroadcastState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updateBroadcastAPI(id, broadcast),
    onSuccess: () => {
      showToast("Where To Watch Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["broadcast"] });
      dispatch(resetBroadcast());
      navigate(paths.wheretowatch.path);
    },
    onError: (error) => {
      console.error("where to watch update failed", error);
    },
  });
};
export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: ["broadcast-countries"],
    queryFn: fetchCountries,
  });
};
