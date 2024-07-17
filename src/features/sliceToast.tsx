// src/features/toasts/toastSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Toast = {
  id: number;
  text: React.ReactNode;
};

type ToastState = Toast[];

const initialState: ToastState = [];

export const toastSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    // Utilisez PayloadAction pour définir le type de payload
    addToast: (state, action: PayloadAction<React.ReactNode>) => {
      const newToast: Toast = { id: Date.now(), text: action.payload };
      state.push(newToast);
    },
    removeToast: (state, action: PayloadAction<number>) => {
      return state.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
