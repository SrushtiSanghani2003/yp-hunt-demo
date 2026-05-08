import type { ConversationState } from "../../../redux-toolkit/conversationSlice";

export const normalizeConversationResponse = (data: any): ConversationState => {
  return {
    title: data.title ?? "",
    logo: data.logo ?? null,
    appuser_ids: Array.isArray(data.appuser_ids)
      ? data.appuser_ids.filter(Boolean)
      : [],
  };
};
