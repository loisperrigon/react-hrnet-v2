// src/features/toasts/toastSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Users } from "../types";

// Définition de l'état initial : un tableau vide d'utilisateurs
const initialState: Users = [];

// Création d'un slice Redux pour gérer l'état des utilisateurs
export const userSlice = createSlice({
  name: "users", // Nom du slice
  initialState, // État initial du slice
  reducers: {
    // Définition du reducer pour ajouter un utilisateur
    addUser: (state, action: PayloadAction<User>) => {
      // Extraction des données de l'utilisateur à partir de l'action
      const newUser: User = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        dateOfBirth: action.payload.dateOfBirth,
        startDate: action.payload.startDate,
        street: action.payload.street,
        city: action.payload.city,
        state: action.payload.state,
        zipCode: action.payload.zipCode,
        department: action.payload.department,
      };
      // Ajout du nouvel utilisateur à l'état
      state.push(newUser);
    },
  },
});

// Exportation de l'action pour pouvoir l'utiliser ailleurs dans l'application
export const { addUser } = userSlice.actions;
