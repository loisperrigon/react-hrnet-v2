import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePickerInput.scss";

interface CustomDatePickerInputProps {
  label: string;
  icon?: React.ReactElement | null;
  selected: Date;
  onChange: (date: Date | null) => void; // Modifier le type de onChange
  name: string;
  placeholder?: string;
}

const CustomDatePickerInput = ({
  label,
  icon,
  selected,
  onChange,
  name,
  placeholder,
}: CustomDatePickerInputProps) => {
  const iconClasses = icon ? "input-with-icon" : "";

  const CustomInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick }, ref) => (
      <div className="relative">
        {icon && <div className="input-icon">{icon}</div>}
        <input
          name={name}
          className={`input-field ${iconClasses}`}
          onClick={onClick}
          ref={ref}
          value={value}
          readOnly
          placeholder={placeholder}
        />
      </div>
    )
  );

  return (
    <div>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <DatePicker
        selected={selected}
        onChange={(date) => onChange(date as Date)} // Assurez-vous de convertir date en Date ou Date | null
        customInput={<CustomInput />}
        className="custom-datepicker"
      />
    </div>
  );
};

export default CustomDatePickerInput;
