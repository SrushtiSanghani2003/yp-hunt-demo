import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Block {
  [key: string]: any;
}

interface Translation {
  language_code: string;
  title: string;
  icon_url: string;
  description: string;
  menu_url: string;
  content: Record<string, Block>;  // FIXED → content is object
}

interface NavigationState {
  status: string;
  published_at: string | null;
  scheduled_at: string | null;
  parent_id: number | null;

  type: string;
  module_type: string;
  list_type: string;
  external_id: number | null;
  visible_on: string;
  display_on: string;

  translation: Translation;
}


const initialState: NavigationState = {
  status: "published",
  published_at: null,
  scheduled_at: null,
  parent_id: null,

  type: "",
  module_type: "",
  list_type: "",
  external_id: null,
  visible_on: "",
  display_on: "",

  translation: {
    language_code: "",
    title: "",
    icon_url: "",
    description: "",
    menu_url: "",
    content: {}
  }
};


const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigationName: (state, action) => {
      state.translation.title = action.payload;
    },

    setNavigationIcon: (state, action) => {
      state.translation.icon_url = action.payload;
    },
    setDisplayOn: (state, action) => {
      state.display_on = action.payload;
    },
    setExternalId: (state, action) => {
      state.external_id = action.payload;
    },

    setModule: (state, action) => {
      state.module_type = action.payload;
    },

    setType: (state, action) => {
      state.type = action.payload;
    },

    setListType: (state, action) => {
      state.list_type = action.payload;
    },

    setMenuUrl: (state, action) => {
      state.translation.menu_url = action.payload;
    },

    setIndividual: (state, action) => {
      state.list_type = action.payload;
    },
    setParentId: (state, action) => {
      state.parent_id = action.payload;
    },

    updateContentField: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      if (!state.translation) state.translation = {} as any;

      if (!state.translation.content || typeof state.translation.content !== "object") {
        state.translation.content = {};
      }

      state.translation.content[action.payload.key] = action.payload.value;
    },

    setFullNavigation: (_state, action: PayloadAction<NavigationState>) => {
      return action.payload;
    },
    resetNavigation: () => initialState,
  },
},
);

export const {
  setNavigationName,
  setNavigationIcon,
  setExternalId,
  setDisplayOn,
  setParentId,
  setMenuUrl,
  setModule,
  setType,
  setListType,
  setIndividual,
  setFullNavigation,
  resetNavigation,
  updateContentField
} = navigationSlice.actions;

export const selectNavigation = (state: RootState) => state.navigation;

export default navigationSlice.reducer;
