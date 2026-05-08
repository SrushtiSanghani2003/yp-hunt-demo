// src/redux-toolkit/languageSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  lang: string;
  isTranslation: boolean;
}

const savedLang = localStorage.getItem("language") || "en";
console.log("🚀 ~ savedLang:", savedLang)

const initialState: LanguageState = {
  lang: savedLang,
  isTranslation: false,
};
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
      localStorage.setItem("language", action.payload); // persist change
    },
    setTranslation: (state, action) => {
      state.isTranslation = action.payload;
    },
    rehydrateLanguage: (state) => {
      const saved = localStorage.getItem("language");
      if (saved) state.lang = saved;
    },
  },
});

export const { setLanguage, rehydrateLanguage, setTranslation } =
  languageSlice.actions;
export const selectLanguage = (state: any) => state.language.lang;
export const selectTranslation = (state: any) => state.language.isTranslation;
export default languageSlice.reducer;
