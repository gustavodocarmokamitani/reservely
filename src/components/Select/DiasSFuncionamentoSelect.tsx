import React, { useState } from "react";
import Select from "react-select";
import customStyles from "./styles/customStylesLoja";

interface DiasSFuncionamentoSelectProps {
  setDiasSFuncionamento: (horarios: string[]) => void;
}

const DiasSFuncionamentoSelect: React.FC<DiasSFuncionamentoSelectProps> = ({
  setDiasSFuncionamento,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const MAX_DIAS = 7;

  const horarios = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const options = horarios.map((horario) => ({
    value: horario,
    label: horario,
  }));

  const handleChange = (selectedOptions: any) => {
    const selectedValuesArr = selectedOptions?.map((option: any) => option.value) ?? [];

    if (selectedValuesArr.length > MAX_DIAS) {
      alert(`Limitação de dias: ${MAX_DIAS}`);
    }

    setSelectedValues(selectedValuesArr);
    setDiasSFuncionamento(selectedValuesArr);
  };

  return (
    <Select
      isMulti
      placeholder={`Selecione até ${MAX_DIAS} dias`}
      options={options}
      onChange={handleChange}
      value={options.filter((opt) => selectedValues.includes(opt.value))}
      styles={customStyles}
    />
  );
};

export default DiasSFuncionamentoSelect;
