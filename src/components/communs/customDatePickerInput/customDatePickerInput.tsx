import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePickerInput.scss";

interface CustomDatePickerInputProps {
  label: string;
  icon?: React.ReactElement | null;
  selected: Date;
  onChange: (date: Date | null) => void; // Modifier le type de onChange
  name: string;
}

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
