import { createSlice } from "@reduxjs/toolkit";

interface Translation {
  language_code: string | null;
  locale?: string | null;
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
  question_mode: string | null;
  type: string | null;
  closed_at: string | null;
  order: number;
  translations: Translation[];
  options: Option[];
}

const initialState: Question[] = [
  {
    question_mode: null,
    type: null,
    closed_at: null,
    order: 1,
    translations: [
      {
        language_code: "en",
        locale: "en_HI",
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

const predictionQuestionsSlice = createSlice({
  name: "predictionQuestions",
  initialState,
  reducers: {},
});

export default predictionQuestionsSlice.reducer;
