import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface ModuleTranslation {
  language_code: string;
  name: string;
  description: string | null;
}

export interface ModuleState {
  code: string;
  path: string;
  icon: string ;
  module_group_id: number | null;
  parent_id: number | null;
  status: "draft" | "published" | "scheduled";
  published_at: string | null;
  scheduled_at: string | null;
  translations: ModuleTranslation;
}

const initialState: ModuleState = {
  code: "",
  path: "",
  icon: "",
  module_group_id: null,
  parent_id: 1,
  status: "draft",
  published_at: null,
  scheduled_at: null,
  translations: {
    language_code: "en",
    name: "",
    description: null,
  },
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setModuleCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setModulePath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
    setModuleIcon: (state, action: PayloadAction<string>) => {
      state.icon = action.payload;
    },
    setModuleGroupId: (state, action: PayloadAction<number>) => {
      state.module_group_id = action.payload;
    },
    setModuleParentId: (state, action: PayloadAction<number | null>) => {
      state.parent_id = action.payload;
    },
    setModuleStatus: (
      state,
      action: PayloadAction<"draft" | "published" | "scheduled">
    ) => {
      state.status = action.payload;
    },
    setModulePublishedAt: (state, action: PayloadAction<string | null>) => {
      state.published_at = action.payload;
    },
    setModuleScheduledAt: (state, action: PayloadAction<string | null>) => {
      state.scheduled_at = action.payload;
    },
    setModuleTranslation: (state, action: PayloadAction<ModuleTranslation>) => {
      state.translations = action.payload;
    },
    setModuleTranslationField: (
      state,
      action: PayloadAction<{
        field: keyof ModuleTranslation;
        value: string | null;
      }>
    ) => {
      const { field, value } = action.payload;

      if (field === "description") {
        state.translations[field] = value; // ok, string | null
      } else {
        state.translations[field] = value as string; // cast because language_code and name can't be null
      }
    },

    setFullModule: (_state, action: PayloadAction<ModuleState>) => {
      return action.payload;
    },
    resetModule: () => initialState,
  },
});

export const {
  setModuleCode,
  setModulePath, 
  setModuleIcon,
  setModuleGroupId,
  setModuleParentId,
  setModuleStatus,
  setModulePublishedAt,
  setModuleScheduledAt,
  setModuleTranslation,
  setModuleTranslationField,
  setFullModule,
  resetModule,
} = moduleSlice.actions;

export const selectModule = (state: RootState) => state.module;

export default moduleSlice.reducer;
