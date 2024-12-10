// ClienteSelect.tsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getTipoUsuarioIdById } from "../../services/UsuarioServices";
import customStyles from "./styles/customStyles";
import { SelectOption } from "../../models/SelectOptions";

interface ClienteSelectProps {
  setCliente: (option: SelectOption | null) => void;
  value?: number;
}

const ClienteSelect: React.FC<ClienteSelectProps> = ({ setCliente, value }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await getTipoUsuarioIdById(3);
        const formattedOptions = response.map((item: any) => ({
          value: item.id,
          label: item.nome,
        }));
        formattedOptions.unshift({ value: 0, label: "Selecione...", isDisabled: true });
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleChange = (option: any) => {
    setSelectedOption(option);
    setCliente(option);
  };

  return (
    <Select
      onChange={handleChange}
      options={options}
      placeholder="Selecione um cliente"
      styles={customStyles}
      value={options.find(opt => opt.value === value)}
    />
  );
};

export default ClienteSelect;
