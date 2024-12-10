// FuncionarioSelect.tsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getTipoUsuarioIdById } from "../../services/UsuarioServices";
import customStyles from "./styles/customStyles";
import { SelectOption } from "../../models/SelectOptions";

interface FuncionarioSelectProps {
  setFuncionario: (option: SelectOption | null) => void;
  value?: number;
}

const FuncionarioSelect: React.FC<FuncionarioSelectProps> = ({ setFuncionario, value }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await getTipoUsuarioIdById(2);
        const formattedOptions = response.map((item: any) => ({
          value: item.id,
          label: item.nome,
        }));

        formattedOptions.unshift({ value: 0, label: "Selecione...", isDisabled: true });
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchFuncionarios();
  }, []);

  const handleChange = (option: any) => {
    setFuncionario(option);
  };

  return (
    <Select
      options={options}
      placeholder="Selecione um funcionário"
      onChange={handleChange}
      styles={customStyles}
      value={options.find(opt => opt.value === value)}
    />
  );
};

export default FuncionarioSelect;
