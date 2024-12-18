import React, { useState } from "react";
import Select from "react-select";
import customStyles from "./styles/customStylesLoja";

interface OpeningWeekDaysSelectProps {
  setOpeningWeekDay: (times: string[]) => void;
}

const OpeningWeekDaysSelect: React.FC<OpeningWeekDaysSelectProps> = ({
  setOpeningWeekDay,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const MAX_DAYS = 7;

  const times = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const options = times.map((horario) => ({
    value: horario,
    label: horario,
  }));

  const handleChange = (selectedOptions: any) => {
    const selectedValuesArr = selectedOptions?.map((option: any) => option.value) ?? [];

    setSelectedValues(selectedValuesArr);
    setOpeningWeekDay(selectedValuesArr);
  };

  return (
    <Select
      isMulti
      placeholder={`Selecione até ${MAX_DAYS} dias`}
      options={options}
      onChange={handleChange}
      value={options.filter((opt) => selectedValues.includes(opt.value))}
      styles={customStyles}
    />
  );
};

export default OpeningWeekDaysSelect;
