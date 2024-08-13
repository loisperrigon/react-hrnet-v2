import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { config, ENV } from "../../../../config";
import { useToasts } from "../../../../context/ToastContext";
import "./Toast.scss";

interface ToastProps {
  data: {
    id: number;
    text: React.ReactNode;
  };
  index: number;
}

/**
 * Composant `Toast`
 *
 * Affiche une notification temporaire avec un message. Les notifications sont positionnées
 * en bas et s'effacent après un certain temps. Chaque toast peut être fermé manuellement.
 *
 * @param {Object} data - Données du toast.
 * @param {number} data.id - Identifiant unique du toast.
 * @param {React.ReactNode} data.text - Contenu du message du toast.
 * @param {number} index - Position du toast pour le calcul du margin et du z-index.
 */
const Toast: React.FC<ToastProps> = ({ data, index }) => {
  const [transition, setTransition] = useState(0);
  const { hideToast } = useToasts();
  const marginToast = 20 + index * 30; // Calcul du margin
  const timeClose = config[ENV].durationToast;
  const [opacity, setOpacity] = useState(0);
  const [pointerEvent, setPointerEvent] = useState<"auto" | "none">("auto");

  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, +timeClose);

    const valueTransitionBrut = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--transition");

    const resultatMatch = valueTransitionBrut.match(/\d+/);

    const dureeTransition = resultatMatch ? Number(resultatMatch[0]) : 100;

    setTransition(dureeTransition);

    setOpacity(1); // Transition de l'opacité de 0 à 1
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpacity(0);
    setPointerEvent("none");

    setTimeout(() => hideToast(data.id), transition);
  };

  return (
    <div
      style={{
        bottom: `${marginToast}px`,
        opacity: opacity,
        pointerEvents: pointerEvent,
        zIndex: index, // Utilisation de zIndex pour le z-index
      }}
      className="toast-container"
    >
      <div className="toast-content">{data.text}</div>

      <MdClose onClick={handleClose} className="toast-close-icon" />
    </div>
  );
};

export default Toast;
