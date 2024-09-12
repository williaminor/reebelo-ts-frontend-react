import React from "react";
import { Form } from "react-bootstrap";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder?: string;
  value?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select...",
  value,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <Form.Select
        value={value || ""}
        onChange={handleChange}
        className="dropdown-select py-0"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default Dropdown;
