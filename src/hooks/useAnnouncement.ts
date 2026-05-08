import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAnnouncementsAPI,
  getAnnouncementsByIdAPI,
  getAnnouncementsList,
  updateAnnouncementsAPI,
} from "../api/Announcement";
import {
  resetAnnouncements,
  type AnnouncementsState,
} from "../redux-toolkit/announcementsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../utils/toastUtils";
import { paths } from "../config/paths";

export const useAnnouncementslist = (
  page: number,
  search: string,
  skip = false
) => {
  const query = useQuery({
    queryKey: ["announcements", page, search],
    queryFn: () => getAnnouncementsList(page, search),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};

export const useCreateAnnouncements = (announcements: AnnouncementsState) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => createAnnouncementsAPI(announcements),
    onSuccess: () => {
      showToast("announcements Created", "success");
      dispatch(resetAnnouncements());
      navigate(paths.announcements.path);
    },
    onError: (error) => {
      console.error("Error while adding announcements", error);
      showToast("Failed to create announcements", "error");
    },
  });
};
export const useUpdateAnnouncements = (announcements: AnnouncementsState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updateAnnouncementsAPI(id, announcements),
    onSuccess: () => {
      showToast("announcements Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      dispatch(resetAnnouncements());
      navigate(paths.announcements.path);
    },
    onError: (error) => {
      console.error("announcements update failed", error);
    },
  });
};
export const useGetAnnouncementsById = (id?: string) => {
  return useQuery({
    queryKey: ["announcements", id],
    queryFn: () => getAnnouncementsByIdAPI(id as string),
    enabled: !!id, // 🔥 id hoy tyare j call
  });
};
