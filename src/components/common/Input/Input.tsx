import { ReactElement } from "react";
import "./Input.scss";

interface InputProps {
  name: string;
  label?: string;
  icon?: ReactElement | null;
  type: string;
  textInput: string;
  handleChange: any;
}

/**
 * Composant `Input`
 *
 * Un champ de saisie personnalisé avec une étiquette, une icône optionnelle et divers types d'entrées.
 *
 * @param {string} name - Identifiant unique du champ de saisie.
 * @param {string} [label] - Étiquette optionnelle pour le champ.
 * @param {ReactElement | null} [icon] - Icône optionnelle à afficher à gauche du champ.
 * @param {string} type - Type de champ de saisie (ex: "text", "password").
 * @param {string} textInput - Texte d'espace réservé dans le champ.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} handleChange - Fonction de gestion des changements dans le champ de saisie.
 */
export default function Input({
  name,
  label,
  icon,
  type,
  textInput,
  handleChange,
}: InputProps) {
  const iconClasses = icon ? "input-with-icon" : "";
  return (
    <div>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && <div className="input-icon">{icon}</div>}
        <input
          name={name}
          type={type}
          className={`input-field ${iconClasses}`}
          placeholder={textInput}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
