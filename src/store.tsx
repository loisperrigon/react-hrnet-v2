// src/app/store.ts

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage as default storage for web

import { userSlice } from "./features/sliceDataUsers";

// Configuration de redux-persist pour chaque slice
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"], // Noms des slices à persister
};

// Combine tous les reducers
const rootReducer = combineReducers({
  users: userSlice.reducer,
});

// Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure le store Redux
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store); // Persistor pour redux-persist

export type RootState = ReturnType<typeof store.getState>; // Type de l'état global
export type AppDispatch = typeof store.dispatch; // Type de la fonction dispatch
