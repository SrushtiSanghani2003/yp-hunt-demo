import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type jobState = {
  status: "draft" | "published" | string;
  scheduled_at: string | null;
  published_at: string | null;
  closing_date: string;
  translation: {
    language_code: string;
    title: string;
    location: string;
    salary: string;
    description: string;
    job_role: {
      title: string;
      description: string;
    }[];
    job_form: any[];
  };
  category_ids: number[];
};

export type JobRoleType = {
  title: string;
  description: string;
};

export type JobQuestionType = {
  title: string;
  is_required: boolean;
  type: string;
  options: { value: string }[];
  slider_title: string;
  min: number;
  max: number;
};

const initialState: jobState = {
  status: "draft",
  scheduled_at: null,
  published_at: null,
  closing_date: "",
  translation: {
    language_code: "en",
    title: "",
    location: "",
    salary: "",
    description: "",
    job_role: [
      {
        title: "",
        description: "",
      },
    ],
    job_form: [],
  },
  category_ids: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setTranslationFields(
      state,
      action: { payload: { field: keyof jobState["translation"]; value: any } },
    ) {
      const { field, value } = action.payload;
      state.translation[field] = value;
    },
    setJobClosingDate(state, action: PayloadAction<string>) {
      state.closing_date = action.payload;
    },
    setJobCategories(state, action: PayloadAction<number[]>) {
      state.category_ids = action.payload;
    },

    // updateJobRoles(
    //   state: any,
    //   action: PayloadAction<{ index: number; jobRoles: JobRoleType }>
    // ) {
    //   const { index, jobRoles } = action.payload;
    //   state.job_role[index] = jobRoles;
    // },
    updateJobRoles: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof JobRoleType;
        value: any;
      }>,
    ) => {
      const { index, field, value } = action.payload;

      // 🔴 SAFETY CHECK
      if (!state.translation.job_role[index]) {
        state.translation.job_role[index] = {} as JobRoleType;
      }

      state.translation.job_role[index][field] = value;
    },
    addJobRoles: (state, action: PayloadAction<JobRoleType>) => {
      state.translation.job_role.push(action.payload);
    },
    removeJobRoles: (state, action: PayloadAction<number>) => {
      state.translation.job_role = state.translation.job_role.filter(
        (_, idx) => idx !== action.payload,
      );
    },
    addJobQuestion: (state, action: PayloadAction<any>) => {
      state.translation.job_form.push(action.payload);
    },
    updateJobQuestions(
      state: any,
      action: PayloadAction<{ index: number; jobQuestions: JobQuestionType }>,
    ) {
      const { index, jobQuestions } = action.payload;
      state.translation.job_form[index] = jobQuestions;
    },
    removeJobQuestion: (state, action: PayloadAction<number>) => {
      state.translation.job_form = state.translation.job_form.filter(
        (_, idx) => idx !== action.payload,
      );
    },
    setJobPublishContent: (state, action) => {
      const { status, dateTime } = action.payload;
      state.status = status;
      if (status === "published") {
        state.published_at = dateTime;
        state.scheduled_at = null;
      } else if (status === "scheduled") {
        state.scheduled_at = dateTime;
        state.published_at = null;
      }
    },
    setFullJob: (_state, action) => {
      return action.payload;
    },
    setJobLanguage(state, action: PayloadAction<string>) {
      state.translation.language_code = action.payload;
    },
    resetJob: () => initialState,
  },
});

export default jobSlice.reducer;
export const selectJob = (state: RootState) => state.job;
export const {
  setTranslationFields,
  setJobCategories,
  setJobClosingDate,
  updateJobRoles,
  setJobLanguage,
  updateJobQuestions,
  addJobRoles,
  addJobQuestion,
  removeJobRoles,
  removeJobQuestion,
  setFullJob,
  resetJob,
} = jobSlice.actions;
