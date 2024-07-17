import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import des icônes de flèche
import "./dropDown.scss";

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <i className={`arrow ${isOpen ? "up" : "down"}`}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </i>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
