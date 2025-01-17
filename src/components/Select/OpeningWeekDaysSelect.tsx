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

  const TIMES = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const OPTIONS = TIMES.map((horario) => ({
    value: horario,
    label: horario,
  }));

  const handleChange = (selectedOptions: any) => {
    const selectedValuesArr =
      selectedOptions?.map((option: any) => option.value) ?? [];

    setSelectedValues(selectedValuesArr);
    setOpeningWeekDay(selectedValuesArr);
  };

  return (
    <Select
      isMulti
      placeholder={`Selecione até ${MAX_DAYS} dias`}
      options={OPTIONS}
      onChange={handleChange}
      value={OPTIONS.filter((opt) => selectedValues.includes(opt.value))}
      styles={customStyles}
    />
  );
};

export default OpeningWeekDaysSelect;
