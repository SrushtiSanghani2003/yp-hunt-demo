import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

/* =======================
   Types
======================= */

export interface ModuleGroupTranslation {
  language_code: string;
  name: string;
  description: string | null;
}

export interface ModuleGroupState {
  code: string;
  status: number; // 1 = active, 0 = inactive
  order: number;
  icon: string;
  translations: ModuleGroupTranslation;
}

/* =======================
   Initial State
======================= */

const initialState: ModuleGroupState = {
  code: "",
  status: 1,
  order: 1,
  icon: "",
  translations: {
    language_code: "en",
    name: "",
    description: null,
  },
};

/* =======================
   Slice
======================= */

const moduleGroupSlice = createSlice({
  name: "moduleGroup",
  initialState,
  reducers: {
    setModuleGroupCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },

    setModuleGroupStatus: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    },

    setModuleGroupOrder: (state, action: PayloadAction<number>) => {
      state.order = action.payload;
    },
    setModuleGroupIcon: (state, action: PayloadAction<string>) => {
      state.icon = action.payload;
    },
    setModuleGroupTranslation: (
      state,
      action: PayloadAction<ModuleGroupTranslation>,
    ) => {
      state.translations = action.payload;
    },

    setModuleGroupTranslationField: (
      state,
      action: PayloadAction<{
        field: keyof ModuleGroupTranslation;
        value: string | null;
      }>,
    ) => {
      state.translations[action.payload.field] = action.payload.value as never;
    },

    setFullModuleGroup: (_state, action: PayloadAction<ModuleGroupState>) => {
      return action.payload;
    },

    resetModuleGroup: () => initialState,
  },
});

/* =======================
   Exports
======================= */

export const {
  setModuleGroupCode,
  setModuleGroupStatus,
  setModuleGroupIcon,
  setModuleGroupOrder,
  setModuleGroupTranslation,
  setModuleGroupTranslationField,
  setFullModuleGroup,
  resetModuleGroup,
} = moduleGroupSlice.actions;

export const selectModuleGroup = (state: RootState) => state.moduleGroup;

export default moduleGroupSlice.reducer;
