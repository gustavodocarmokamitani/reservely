import React from "react";
import { default as SelectReact } from "react-select";
import customStyles from "./styles/customStyles";
import { SelectOption } from "../../models/SelectOptions";

interface SelectProps {
  options: SelectOption[];
  setData: (option: SelectOption[]) => void;
  placeholder?: string;
  value?: SelectOption | SelectOption[];
  isMulti?: boolean;
  maxSelections?: number;
}

const Select: React.FC<SelectProps> = ({
  options,
  setData,
  placeholder = "Selecione...",
  value,
  isMulti = false,
  maxSelections,
}) => {
  const handleChange = (selectedOption: any) => {
    if (maxSelections && selectedOption?.length > maxSelections) {
      selectedOption.pop();
    }

    setData(
      isMulti || maxSelections
        ? selectedOption
        : selectedOption
        ? [selectedOption]
        : []
    );
  };

  const selectedValue =
    isMulti || maxSelections
      ? value
      : options.find(
          (opt) =>
            opt.value === ((value as SelectOption)?.value ?? Number(value))
        );

  return (
    <SelectReact
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
      styles={customStyles}
      value={selectedValue}
      isMulti={isMulti || !!maxSelections}
    />
  );
};

export default Select;
