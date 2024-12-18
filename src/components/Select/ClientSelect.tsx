// ClientSelect.tsx
import React, { useEffect, useState } from "react";
import { getUserTypeIdById } from "../../services/UserServices";
import { SelectOption } from "../../models/SelectOptions";
import Select from "react-select";
import customStyles from "./styles/customStyles";

interface ClientSelectProps {
  setClient: (option: SelectOption | null) => void;
  value?: number;
}

const ClientSelect: React.FC<ClientSelectProps> = ({ setClient, value }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await getUserTypeIdById(3);
        const formattedOptions = response.map((item: any) => ({
          value: item.id,
          label: item.nome,
        }));
        formattedOptions.unshift({ value: 0, label: "Selecione...", isDisabled: true });
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleChange = (option: any) => {
    setSelectedOption(option);
    setClient(option);
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

export default ClientSelect;
