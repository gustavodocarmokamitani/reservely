// StatusAgendamentoSelect.tsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getTipoUsuarioIdById } from "../../services/UsuarioServices";
import customStyles from "./styles/customStyles";
import { SelectOption } from "../../models/SelectOptions";
import { getStatusAgendamento } from "../../services/StatusAgendamentoServices";

interface StatusAgendamentoSelectProps {
  setStatusAgendamento: (option: SelectOption | null) => void;
  value?: number;
}

const StatusAgendamentoSelect: React.FC<StatusAgendamentoSelectProps> = ({ setStatusAgendamento, value }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await getStatusAgendamento();
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
    setStatusAgendamento(option);
  };

  return (
    <Select
      options={options}
      placeholder="Selecione um status"
      onChange={handleChange}
      styles={customStyles}
      value={options.find(opt => opt.value === value)}
    />
  );
};

export default StatusAgendamentoSelect;
