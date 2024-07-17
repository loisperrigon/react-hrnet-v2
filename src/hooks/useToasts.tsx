// src/hooks/useToasts.js
import { useDispatch, useSelector } from "react-redux";
import { addToast, removeToast } from "../features/sliceToast";
import { RootState } from "../store";

export const useToasts = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toasts);

  const showToast = (text: React.ReactNode) => {
    dispatch(addToast(text));
  };

  const hideToast = (id: number) => {
    dispatch(removeToast(id));
  };

  return { toasts, showToast, hideToast };
};
