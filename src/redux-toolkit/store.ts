import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import disclosureSlice from "./disclosureSlice";
import articleSlice from "./articleSlice";
import newsSlice from "./newsSlice";
import allArticlesSlice from "./allArticlesSlice";
import userDetailsSlice from "./userDetailSlice";
import contentLibrarySlice from "./contentLibrarySlice";
import breadcrumbSlice from "./breadcrumbSlice";
import photoAlbumSlice from "./photoAlbumSlice";
import videoSlice from "./videoSlice";
import pageSlice from "./pageSlice";
import tabSlice from "./tabSlice";
import tagSlice from "./tagSlice";
import tempTokenSlice from "./tempTokenSlice";
import roleSlice from "./roleSlice";
import eventSlice from "./eventsSlice";
import quizSlice from "./quizSlice";
import predictionSlice from "./predictionSlice";
import quizQuestionsSlice from "./quizQuestionsSlice";
import shopSlice from "./shopSlice";
import productSlice from "./productSlice";
import membershipSlice from "./membershipSlice";
import ourspacesSlice from "./ourspacesSlice";
import jobSlice from "./jobSlice";
import whereToWatchSlice from "./whereToWatchSlice";
import tournamentSlice from "./tournamentSlice";
import allUserSlice from "./allUserSlice";
import tournamentTravelSlice from "./tournamentTravelSlice";
import moduleSlice from "./moduleSlice";
import moduleGroupSlice from "./moduleGroupSlice";
import announcementsSlice from "./announcementsSlice";
import documentsSlice from "./documentationSlice";
import playersSlice from "./playersSlice";
import menuPermissionsSlice from "./menuPermissionsSlice";
import languageReducer from "./languageSlice";
import navigationSlice from "./navigationSlice";
import conversationSlice from "./conversationSlice";
import conversationGroupSlice from "./conversationGroupSlice";
import transportationSlice from "./transportationSlice";
import moduleListingSearchSlice from "./moduleListingSearchSlice";
import accommodationSlice from "./accommodationSlice";
import accreditationSlice from "./accreditationSlice";
import airportSlice from "./airportSlice";
import flightSlice from "./flightSlice";
import countrySlice from "./countrySlice";
import portalUserSlice from "./portalUserSlice";

const rootReducer = combineReducers({
  disclosure: disclosureSlice,
  article: articleSlice,
  news: newsSlice,
  allArticles: allArticlesSlice,
  userDetails: userDetailsSlice,
  contentLibrary: contentLibrarySlice,
  breadcrumb: breadcrumbSlice,
  photoAlbum: photoAlbumSlice,
  video: videoSlice,
  page: pageSlice,
  tab: tabSlice,
  tags: tagSlice,
  temptoken: tempTokenSlice,
  roles: roleSlice,
  event: eventSlice,
  quiz: quizSlice,
  quizQuestions: quizQuestionsSlice,
  prediction: predictionSlice,
  shop: shopSlice,
  broadcast: whereToWatchSlice,
  product: productSlice,
  membership: membershipSlice,
  ourspacesSlice: ourspacesSlice,
  job: jobSlice,
  tournament: tournamentSlice,
  allUser: allUserSlice,
  tournamentTravel: tournamentTravelSlice,
  module: moduleSlice,
  moduleGroup: moduleGroupSlice,
  announcements: announcementsSlice,
  documents: documentsSlice,
  player: playersSlice,
  menuPermissions: menuPermissionsSlice,
  language: languageReducer,
  navigation: navigationSlice,
  conversation: conversationSlice,
  conversationGroup: conversationGroupSlice,
  transportation: transportationSlice,
  listing: moduleListingSearchSlice,
  accommodation: accommodationSlice,
  accreditation: accreditationSlice,
  airport: airportSlice,
  flight: flightSlice,
  country: countrySlice,
  portalUser: portalUserSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userDetails", "breadcrumb", "tab", "menuPermissions"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
