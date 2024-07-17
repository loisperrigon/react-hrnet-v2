import { ReactElement } from "react";
import "./input.scss";

interface InputProps {
  name: string;
  label?: string;
  icon?: ReactElement | null;
  type: string;
  textInput: string;
  handleChange: any;
}

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
