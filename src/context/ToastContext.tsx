// src/context/ToastContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Toast, ToastContextProps } from "../types";

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (text: React.ReactNode) => {
    const newToast: Toast = { id: Date.now(), text };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const hideToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToasts = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToasts must be used within a ToastProvider");
  }
  return context;
};
