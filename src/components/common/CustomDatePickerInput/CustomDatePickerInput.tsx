import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePickerInput.scss";

interface CustomDatePickerInputProps {
  label: string;
  icon?: React.ReactElement | null;
  selected: Date;
  onChange: (date: Date | null) => void; // Modifier le type de onChange
  name: string;
}

/**
 * Composant `CustomDatePickerInput`
 *
 * Un composant de sélection de date personnalisé avec une étiquette et une icône optionnelle.
 * Utilise `react-datepicker` pour afficher un calendrier pour la sélection de date.
 *
 * @param {string} label - L'étiquette du champ de date.
 * @param {React.ReactElement | null} [icon] - Icône optionnelle à afficher avec le champ.
 * @param {Date} selected - La date sélectionnée actuellement.
 * @param {(date: Date | null) => void} onChange - Fonction appelée lors du changement de date.
 * @param {string} name - Identifiant du champ de date.
 */
const CustomDatePickerInput = ({
  label,
  icon,
  selected,
  onChange,
  name,
}: CustomDatePickerInputProps) => {
  const iconClasses = icon ? "input-with-icon" : "";

  return (
    <div>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <DatePicker
        selected={selected}
        className={`input-field ${iconClasses}`}
        onChange={(date) => onChange(date as Date)}
        showYearDropdown
      />
    </div>
  );
};

export default CustomDatePickerInput;
