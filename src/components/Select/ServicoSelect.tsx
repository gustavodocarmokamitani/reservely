// ServicoSelect.tsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getTipoServico } from "../../services/TipoServicoServices";
import customStyles from "./styles/customStyles";
import { SelectOption } from "../../models/SelectOptions";

interface ServicoSelectProps {
  setServico: (option: SelectOption[] | null) => void;
  value?: number[] | undefined;
}

const ServicoSelect: React.FC<ServicoSelectProps> = ({ setServico, value }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await getTipoServico();
        const formattedOptions = response.data.map((item: any) => ({
          value: item.id,
          label: item.nome,
        }));

        formattedOptions.unshift({ value: 0, label: "Selecione...", isDisabled: true });
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      }
    };

    fetchServicos();
  }, []);

  const handleChange = (selectedOptions: any) => {
    const filteredOptions = selectedOptions?.filter((option: SelectOption) => option.value !== 0) || [];
    setServico(filteredOptions.length > 0 ? filteredOptions : null);
  };

  return (
    <Select
      options={options}
      isMulti
      placeholder="Selecione um serviço"
      onChange={handleChange}
      styles={customStyles}
      value={options.filter(opt => value?.includes(opt.value))}
    />
  );
};

export default ServicoSelect;
