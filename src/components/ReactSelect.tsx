import React, { useState } from "react";
import Select from "react-select";

interface ReactSelectProps {
  width: string;
  semana?: boolean;
  horario?: boolean;
}

// Opções de semana
const semanaOptions = [
  { value: "segunda", label: "Segunda" },
  { value: "terca", label: "Terça" },
  { value: "quarta", label: "Quarta" },
  { value: "quinta", label: "Quinta" },
  { value: "sexta", label: "Sexta" },
  { value: "sabado", label: "Sábado" },
  { value: "domingo", label: "Domingo" },
];

// Gera as opções de horário
const generateHourOptions = (start: number, end: number) => {
  const options = [];
  for (let hour = start; hour <= end; hour++) {
    const label = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    options.push({ value: label, label });
  }
  return options;
};
const horarioOptions = generateHourOptions(1, 23);

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minWidth: "300px",
    minHeight: "50px",
    padding: "0 25px",
    fontSize: "14px",
    border: "1px solid rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    boxShadow: "4px 4px 15px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    "&:hover": {
      borderColor: "#888",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#007bff" : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    "&:hover": {
      backgroundColor: "#e0e0e0",
      color: "#333",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: "15px",
    padding: "0 5px",
    backgroundColor: "#616060",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#fff",
    "&:hover": {
      borderRadius: "15px",
      backgroundColor: "#616060",
      color: "#fff",
    },
  }),
};

const ReactSelect: React.FC<ReactSelectProps> = ({ width, semana, horario }) => {
  const [selectedOptions, setSelectedOptions] = useState<{ value: string; label: string }[]>([]);

  // Define as opções com base nas props
  const options = semana ? semanaOptions : horario ? horarioOptions : [];

  const handleChange = (selected: any) => {
    setSelectedOptions(selected || []);
  };

  return (
    <Select
      options={options}
      isMulti
      onChange={handleChange}
      value={selectedOptions}
      placeholder="Selecione opções..."
      styles={customStyles}
    />
  );
};

export default ReactSelect;
