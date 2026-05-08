import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Translation {
  language_code: string | null;
  question_text?: string | null;
  question_image_url?: string | null;
  option_text?: string | null;
  option_image_url?: string | null;
}

export interface Option {
  order: number;
  is_correct: boolean;
  translations: Translation[];
}

export interface Question {
  type: string | null;
  question_mode: string | null;
  timer: number;
  points: number;
  order: number;
  is_required: boolean;
  translations: Translation[];
  options: Option[];
}

const initialState: Question[] = [
  {
    type: "",
    question_mode: "",
    timer: 0,
    points: 0,
    order: 1,
    is_required: true,
    translations: [
      {
        language_code: "en",
        question_text: "",
        question_image_url: "",
      },
    ],
    options: [
      {
        order: 1,
        is_correct: false,
        translations: [
          {
            language_code: "en",
            option_text: "",
            option_image_url: "",
          },
        ],
      },
    ],
  },
];

const quizQuestionsSlice = createSlice({
  name: "quizQuestions",
  initialState,
  reducers: {
    setAllQuestions: (_, action: PayloadAction<Question[]>) => {
      return action.payload;
    },
  },
});

export default quizQuestionsSlice.reducer;
export const { setAllQuestions } = quizQuestionsSlice.actions;
export const selectQuestions = (state: RootState) => state.quizQuestions;
