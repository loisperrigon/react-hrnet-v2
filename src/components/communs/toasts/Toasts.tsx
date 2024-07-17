import { useToasts } from "../../../hooks/useToasts";
import Toast from "./toast/Toast";

const Toasts = () => {
  const { toasts } = useToasts();

  return (
    <>
      {toasts.map((toast, index) => {
        return <Toast key={toast.id} data={toast} index={index} />;
      })}
    </>
  );
};

export default Toasts;
