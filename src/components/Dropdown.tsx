import React from "react";
import "./Dropdown.css";

interface DropdownProps {
  options: { id: string; label: string }[];
  onChange: (selectedValue: string) => void;
  selectedValue: string;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  selectedValue,
  label,
}) => {
  return (
    <div>
      <label>{label}</label>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="dropdown-select"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
