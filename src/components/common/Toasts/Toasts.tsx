// src/components/Toasts.tsx
import React from "react";
import { useToasts } from "../../../context/ToastContext";
import Toast from "./Toast/Toast";

/**
 * Composant `Toasts`
 *
 * Affiche une liste de notifications (toasts) en utilisant le contexte `useToasts`.
 * Chaque toast est rendu avec un composant `Toast` qui prend en charge son affichage
 * et sa fermeture.
 */
const Toasts: React.FC = () => {
  const { toasts } = useToasts();

  return (
    <>
      {toasts.map((toast, index) => (
        <Toast key={toast.id} data={toast} index={index} />
      ))}
    </>
  );
};

export default Toasts;
