import { useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   type CompetitionState,
// } from "../redux-toolkit/competitionSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../utils/toastUtils";
import { paths } from "../config/paths";
import { resetNavigation } from "../redux-toolkit/navigationSlice";
import { createNavigationAPI, updateNavigationAPI } from "../api/navigation";

export const useUpdateNavigation = (offer: any) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const location = useLocation();
  // const { paginationoffer = [] } = location.state || {};
  // const initialPage = paginationoffer.length ? paginationoffer[0] : 1;
  return useMutation({
    mutationFn: (id: string) => updateNavigationAPI(id, offer),
    onSuccess: () => {
      showToast("navigation Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["navigation"] });
      // navigate(paths.partneroffer.path);
      navigate(paths.navigation.path);
    },
    onError: (error) => {
      console.error("Error while updating partner offer", error);
    },
  });
};

export const useCreateNavigation = (navigation: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();
  // const { paginationoffer = [] } = location.state || {};
  // const initialPage = paginationoffer.length ? paginationoffer[0] : 1;

  return useMutation({
    mutationFn: () => createNavigationAPI(navigation),
    onSuccess: () => {
      showToast("Navigation Created", "success");
      dispatch(resetNavigation());
      // navigate(paths.partneroffer.path);
      navigate(paths.navigation.path);
    },
    onError: (error) => {
      console.error("Error while creating partner offer", error);
    },
  });
};
