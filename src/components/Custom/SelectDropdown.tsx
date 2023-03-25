import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Select = styled.select`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
`;

interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

const SelectDropdown: React.FC<Props> = ({
  title,
  options,
  value,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <Select value={selectedOption} onChange={handleSelectChange}>
      <option value="">{title}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default SelectDropdown;
