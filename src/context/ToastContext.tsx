// src/context/ToastContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Toast, ToastContextProps } from "../types";

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Ajoute un nouveau toast à la liste des toasts.
   *
   * @param text - Le contenu à afficher dans le toast. Cela peut être du texte ou un élément React.
   */
  const showToast = (text: React.ReactNode) => {
    const newToast: Toast = { id: Date.now(), text };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };
  /**
   * Supprime un toast de la liste en utilisant son identifiant unique.
   *
   * @param id - L'identifiant unique du toast à supprimer.
   */
  const hideToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

/**
 * Hook personnalisé pour accéder au contexte des toasts.
 *
 * @returns Le contexte des toasts, comprenant les toasts actuels,
 *          ainsi que les fonctions pour afficher et cacher les toasts.
 *
 * @throws Erreur si le hook est utilisé en dehors du ToastProvider.
 */
export const useToasts = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToasts must be used within a ToastProvider");
  }
  return context;
};
