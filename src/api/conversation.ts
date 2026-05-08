import api from "../lib/api";
import type { ConversationGroupState } from "../redux-toolkit/conversationGroupSlice";
import type { ConversationState } from "../redux-toolkit/conversationSlice";

export const getConversationList = async (
  currentPage: number,
  name?: string
) => {
  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
  };
  if (name) {
    params.search = name;
  }

  const res = await api.get("/conversations", { params });
  return res.data;
};
export const createConversationAPI = (conversations: ConversationState) => {
  return api.post("/conversations", conversations);
};

export const updateConversationAPI = (
  id: string,
  conversations: ConversationState
) => {
  return api.put(`/conversations/${id}`, conversations);
};
export const fetchConversationById = (id: string) => {
  return api.get(`/conversations/${id}`);
};

// group
export const getConversationGroupList = async (
  currentPage: number,
  name?: string,
  groupId?: number
) => {
  if (!groupId) return null;

  const params: Record<string, any> = {
    page: currentPage,
    limit: 8,
  };
  if (name) {
    params.search = name;
  }

  const res = await api.get(`conversations/${groupId}/groups`, {
    params,
  });
  return res.data;
};
export const createConversationGroupAPI = (
  conversationsgroup: ConversationGroupState
) => {
  return api.post("/conversations/group", conversationsgroup);
};

export const updateConversationGroupAPI = (
  id: string,
  conversationsgroup: ConversationGroupState
) => {
  return api.put(`/conversations/group/${id}`, conversationsgroup);
};
export const fetchConversationGroupById = (id: string) => {
  return api.get(`/conversations/group/${id}`);
};
