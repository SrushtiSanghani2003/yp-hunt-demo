import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  resetTournament,
  type TournamentState,
} from "../redux-toolkit/tournamentSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../utils/toastUtils";
import { paths } from "../config/paths";
import {
  fetchTournamentById,
  getTournamentTravelAPI,
  updateTournamentAPI,
  updateTournamentInfoAPI,
  updateTournamentTravelAPI,
} from "../api/tournament";

export const useUpdateTournament = (
  tournament: TournamentState,
  isTranslation: boolean,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => {
      const payload = {
        ...tournament,
        translation: {
          ...tournament.translation,
          auto_translate: isTranslation,
        },
      };

      return updateTournamentAPI(id, payload);
    },
    onSuccess: () => {
      showToast("Tournament Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["tournament"] });
      dispatch(resetTournament());
      navigate(paths.tournaments.path);
    },
    onError: (error) => {
      console.error("tournament update failed", error);
    },
  });
};
export const useUpdateTournamentInfo = (
  tournament: TournamentState,
  isTranslation: boolean,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => {
      const payload = {
        ...tournament,
        translation: {
          ...tournament.translation,
          auto_translate: isTranslation,
        },
      };

      return updateTournamentInfoAPI(id, payload);
    },
    onSuccess: () => {
      showToast("Tournament Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["tournament"] });
      dispatch(resetTournament());
      navigate(paths.tournaments.path);
    },
    onError: (error) => {
      console.error("Tournament Info update failed", error);
    },
  });
};

export const useTournamentById = (
  id: string | undefined,
  languageCode?: string | null,
) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["tournament", id, languageCode],
    queryFn: () => fetchTournamentById(id!, languageCode),
    enabled: isEditMode,
  });
};
export const useUpdateTournamentTravel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any[] }) =>
      updateTournamentTravelAPI(id, payload),

    onSuccess: () => {
      showToast("Tournament Travel Details Updated", "success");

      queryClient.invalidateQueries({
        queryKey: ["tournament"],
      });

      navigate(paths.tournaments.path);
    },

    onError: (error) => {
      console.error("Travel detail update failed", error);
      showToast("Failed to update travel details", "error");
    },
  });
};

export const useGetTournamentTravel = (id?: string) => {
  return useQuery({
    queryKey: ["tournament-travel", id],
    queryFn: () => getTournamentTravelAPI(id as string),
    enabled: !!id,
  });
};
