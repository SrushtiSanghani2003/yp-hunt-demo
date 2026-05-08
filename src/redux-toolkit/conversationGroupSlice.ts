import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface ConversationGroupState {
  title: string;
  logo: string | null;
  parent_community_id: number | null;
  appuser_ids: number[];
  admin_appuser_ids: number[];
}

const initialState: ConversationGroupState = {
  title: "",
  logo: null,
  parent_community_id: null,
  appuser_ids: [],
  admin_appuser_ids: [],
};

const conversationGroupSlice = createSlice({
  name: "conversationGroup",
  initialState,
  reducers: {
    setConversationGroupField: (
      state,
      action: PayloadAction<{
        field: keyof ConversationGroupState;
        value: any;
      }>
    ) => {
      const { field, value } = action.payload;
      if (field in state) {
        // @ts-ignore
        state[field] = value;
      }
    },

    setConversationGroupTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },

    setConversationGroupLogo: (state, action: PayloadAction<string | null>) => {
      state.logo = action.payload;
    },

    setParentCommunityId: (state, action: PayloadAction<number | null>) => {
      state.parent_community_id = action.payload;
    },

    setConversationGroupAppUsers: (state, action: PayloadAction<number[]>) => {
      state.appuser_ids = action.payload;
    },

    setConversationGroupAdmins: (state, action: PayloadAction<number[]>) => {
      state.admin_appuser_ids = action.payload;
    },

    setFullConversationGroup: (
      _state,
      action: PayloadAction<ConversationGroupState>
    ) => {
      return action.payload;
    },

    resetConversationGroup: () => initialState,
  },
});

export const {
  setConversationGroupField,
  setConversationGroupTitle,
  setConversationGroupLogo,
  setParentCommunityId,
  setConversationGroupAppUsers,
  setConversationGroupAdmins,
  setFullConversationGroup,
  resetConversationGroup,
} = conversationGroupSlice.actions;

export const selectConversationGroup = (state: RootState) =>
  state.conversationGroup;

export default conversationGroupSlice.reducer;
