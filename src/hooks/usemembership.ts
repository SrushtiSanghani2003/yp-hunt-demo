import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { paths } from "../config/paths";
import { showToast } from "../utils/toastUtils";
import { useDispatch } from "react-redux";
import { resetProduct } from "../redux-toolkit/productSlice";
import {
  resetMembership,
  type MembershipState,
} from "../redux-toolkit/membershipSlice";
import {
  createMembershipAPI,
  deleteMembershipItem,
  fetchMembershipById,
  getMembershipList,
  updatemembershipAPI,
} from "../api/membershipapi";

export const useMembershiplist = (
  page: number,
  search: string,
  skip = false
) => {
  const query = useQuery({
    queryKey: ["membership", page, search],
    queryFn: () => getMembershipList(page, search),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};

export const useDeleteMembership = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMembershipItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membership"], exact: false });
    },
  });
};

export const useMembershipById = (
  id: string | undefined,
  languageCode?: string | null
) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["membership", id, languageCode],
    queryFn: () => fetchMembershipById(id!, languageCode),
    enabled: isEditMode,
  });
};

export const useCreateMembership = (membership: MembershipState) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => createMembershipAPI(membership),
    onSuccess: () => {
      showToast("Membership Created", "success");
      dispatch(resetMembership());
      navigate(paths.membership.path);
    },
    onError: (error) => {
      console.error("Error while adding shop", error);
      showToast("Failed to create membership", "error");
    },
  });
};

export const useUpdateMembership = (membership: MembershipState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updatemembershipAPI(id, membership),
    onSuccess: () => {
      showToast("Membership Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["membership"] });
      dispatch(resetProduct());
      navigate(paths.membership.path);
    },
    onError: (error) => {
      console.error("product update failed", error);
    },
  });
};
