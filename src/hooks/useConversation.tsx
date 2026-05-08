import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createConversationAPI,
  createConversationGroupAPI,
  fetchConversationById,
  fetchConversationGroupById,
  getConversationGroupList,
  getConversationList,
  updateConversationAPI,
  updateConversationGroupAPI,
} from "../api/conversation";
import {
  resetConversation,
  type ConversationState,
} from "../redux-toolkit/conversationSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../utils/toastUtils";
import { paths } from "../config/paths";
import type { ConversationGroupState } from "../redux-toolkit/conversationGroupSlice";

export const useConversationlist = (
  page: number,
  search: string,
  skip = false
) => {
  const query = useQuery({
    queryKey: ["conversation", page, search],
    queryFn: () => getConversationList(page, search),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};
export const useCreateConversation = (conversation: ConversationState) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => createConversationAPI(conversation),
    onSuccess: () => {
      showToast("Conversation Created", "success");
      dispatch(resetConversation());
      navigate(paths.conversation.path);
    },
    onError: (error) => {
      console.error("Error while adding Conversation", error);
      showToast("Failed to create Conversation", "error");
    },
  });
};

export const useUpdateConversation = (conversation: ConversationState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) => updateConversationAPI(id, conversation),
    onSuccess: () => {
      showToast("Conversation Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["conversation"] });
      dispatch(resetConversation());
      navigate(paths.conversation.path);
    },
    onError: (error) => {
      console.error("Conversation update failed", error);
    },
  });
};
export const useConversationById = (id: string | undefined) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["conversation", id],
    queryFn: () => fetchConversationById(id!),
    enabled: isEditMode,
  });
};

//group

export const useConversationGrouplist = (
  page: number,
  search: string,
  groupId: number,
  skip = false
) => {
  const query = useQuery({
    queryKey: ["conversation-group", page, search, groupId],
    queryFn: () => getConversationGroupList(page, search, groupId),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    enabled: !skip,
  });

  return query;
};

export const useCreateConversationGroup = (
  conversationgroup: ConversationGroupState,
  groupId: number
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => createConversationGroupAPI(conversationgroup),
    onSuccess: () => {
      showToast("Conversation group Created", "success");
      dispatch(resetConversation());
      navigate(`/conversation/group/${groupId}`);
    },
    onError: (error) => {
      console.error("Error while adding Conversation group", error);
      showToast("Failed to create Conversation group", "error");
    },
  });
};
export const useUpdateConversationGroup = (
  conversationgroup: ConversationGroupState,
  groupId?: number
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id: string) =>
      updateConversationGroupAPI(id, conversationgroup),
    onSuccess: () => {
      showToast("Conversation group Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["conversation-group"] });
      dispatch(resetConversation());
      navigate(`/conversation/group/${groupId}`);
    },
    onError: (error) => {
      console.error("Conversation group update failed", error);
    },
  });
};
export const useConversationGroupById = (id: string | undefined) => {
  const isEditMode = Boolean(id);
  return useQuery({
    queryKey: ["conversation-group", id],
    queryFn: () => fetchConversationGroupById(id!),
    enabled: isEditMode,
  });
};
