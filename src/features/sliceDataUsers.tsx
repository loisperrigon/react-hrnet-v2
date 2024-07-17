// src/features/toasts/toastSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Users } from "../types";

const initialState: Users = [];

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      // Assurez-vous que tous les champs de User sont inclus
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
      state.push(newUser);
    },
  },
});

export const { addUser } = userSlice.actions;
