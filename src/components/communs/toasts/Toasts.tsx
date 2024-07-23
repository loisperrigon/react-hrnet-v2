// src/components/Toasts.tsx
import React, { useEffect } from "react";
import { useToasts } from "../../../context/contextToasts";
import Toast from "./toast/Toast";

const Toasts: React.FC = () => {
  const { toasts } = useToasts();
  useEffect(() => {
    console.log(toasts);
  }, [toasts]);

  return (
    <>
      {toasts.map((toast, index) => (
        <Toast key={toast.id} data={toast} index={index} />
      ))}
    </>
  );
};

export default Toasts;
