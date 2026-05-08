import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchPlayersById,
  getPlayersList,
  updatePlayersAPI,
} from "../api/players";
import { resetPlayer, type PlayerState } from "../redux-toolkit/playersSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../utils/toastUtils";
import { paths } from "../config/paths";

export const usePlayerslist = (
  page: number,
  search: string,
  gender: string,
  skip = false
) => {
  const query = useQuery({
    queryKey: ["players", page, search, gender],
    queryFn: () => getPlayersList(page, search ,gender),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};
export const useUpdatePlayers = (players: PlayerState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updatePlayersAPI(id, players),
    onSuccess: () => {
      showToast("Player Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["players"] });
      dispatch(resetPlayer());
      navigate(paths.players.path);
    },
    onError: (error) => {
      console.error("player update failed", error);
    },
  });
};
export const usePlayersById = (
  id: string | undefined,
  languageCode?: string | null
) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["players", id, languageCode],
    queryFn: () => fetchPlayersById(id!, languageCode),
    enabled: isEditMode,
  });
};
