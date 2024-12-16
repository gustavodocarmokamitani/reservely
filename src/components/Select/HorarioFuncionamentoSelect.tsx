import React, { useState } from "react";
import Select from "react-select";
import customStyles from "./styles/customStylesLoja";

interface HorarioFuncionamentoSelectProps {
  setHorario: (horarios: string[]) => void;
}

const HorarioFuncionamentoSelect: React.FC<HorarioFuncionamentoSelectProps> = ({ setHorario }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const horarios = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "18:30",
    "20:00",
    "18:30",
    "21:00",
    "21:30",
    "21:00",
    "22:30",
    "21:00",
    "23:30",
    "00:00",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
  ];

  const options = horarios.map((horario) => ({
    value: horario,
    label: horario,
  }));

  const handleChange = (selectedOptions: any) => {
    const selectedValuesArr = selectedOptions?.map((option: any) => option.value) || [];

    if (selectedValuesArr.length > 2) {
      return;
    }

    setSelectedValues(selectedValuesArr);
    setHorario(selectedValuesArr);
  };

  return (
    <Select
      isMulti
      placeholder="Selecione até 2 horários"
      options={options}
      onChange={handleChange}
      value={options.filter((opt) => selectedValues.includes(opt.value))}
      styles={customStyles}
    />
  );
};

export default HorarioFuncionamentoSelect;
