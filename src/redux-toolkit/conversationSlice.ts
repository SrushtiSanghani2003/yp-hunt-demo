import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface ConversationState {
  title: string;
  logo: string | null;
  appuser_ids: number[];
}

const initialState: ConversationState = {
  title: "",
  logo: null,
  appuser_ids: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversationField: (
      state,
      action: PayloadAction<{
        field: keyof ConversationState;
        value: any;
      }>
    ) => {
      const { field, value } = action.payload;
      if (field in state) {
        // @ts-ignore
        state[field] = value;
      }
    },

    setConversationTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },

    setConversationLogo: (state, action: PayloadAction<string | null>) => {
      state.logo = action.payload;
    },


    setConversationAppUsers: (state, action: PayloadAction<number[]>) => {
      state.appuser_ids = action.payload;
    },

    setFullConversation: (_state, action: PayloadAction<ConversationState>) => {
      return action.payload;
    },

    resetConversation: () => initialState,
  },
});

export const {
  setConversationField,
  setConversationTitle,
  setConversationLogo,
  setConversationAppUsers,
  setFullConversation,
  resetConversation,
} = conversationSlice.actions;

export const selectConversation = (state: RootState) => state.conversation;

export default conversationSlice.reducer;
