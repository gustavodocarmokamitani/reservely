// ServicoSelect.tsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getTipoServico, getTipoServicoById } from "../../services/TipoServicoServices";
import customStyles from "./styles/customStyles";
import { SelectOption } from "../../models/SelectOptions";
import { TipoServico } from "../../models/TipoServico";
import { getFuncionarioIdByUsuarioId } from "../../services/FuncionarioServices";
import { getServicoById } from "../../services/ServicoServices";

interface ServicoSelectProps {
  setServico: (option: SelectOption[] | null) => void;
  value?: number[] | undefined;
  selectedFuncionario: SelectOption | null;
}

const ServicoSelect: React.FC<ServicoSelectProps> = ({ setServico, value, selectedFuncionario}) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await getTipoServico();
  
        if (response && response.data) {
          const tipoServicosAtivos = response.data.filter((tipoServico: TipoServico) => tipoServico.ativo === true);
  
          if (selectedFuncionario) {
            try {
              const responseFuncionario = await getFuncionarioIdByUsuarioId(selectedFuncionario.value);
  
              if (responseFuncionario && responseFuncionario.servicosId) {
                const responseNomesServicos = await Promise.all(
                  responseFuncionario.servicosId.map(async (item: any) => {
                    try {
                      const resp = await getTipoServicoById(item);
                      return resp && resp.data ? resp.data : null;
                    } catch (error) {
                      console.error("Erro ao buscar serviço específico:", error);
                      return null;
                    }
                  })
                );
  
                const formattedOptions2 = responseNomesServicos.filter(Boolean).map((item: any) => ({
                  value: item.id,
                  label: item.nome
                }));
  
                setOptions(formattedOptions2);
              } else {
                const formattedOptions = tipoServicosAtivos.map((item: any) => ({
                  value: item.id,
                  label: item.nome
                }));
  
                formattedOptions.unshift({ value: 0, label: "Selecione..." });
                setOptions(formattedOptions);
              }
            } catch (error) {
              console.error("Erro ao buscar serviços do funcionário:", error);
  
              const formattedOptions = tipoServicosAtivos.map((item: any) => ({
                value: item.id,
                label: item.nome
              }));
  
              formattedOptions.unshift({ value: 0, label: "Selecione..." });
              setOptions(formattedOptions);
            }
          } else {
            const formattedOptions = tipoServicosAtivos.map((item: any) => ({
              value: item.id,
              label: item.nome
            }));
  
            formattedOptions.unshift({ value: 0, label: "Selecione..." });
            setOptions(formattedOptions);
          }
        } else {
          console.error("Erro ao buscar todos os serviços: resposta inválida.");
        }
      } catch (error) {
        console.error("Erro ao buscar todos os serviços:", error);
      }
    };
  
    fetchServicos();
  }, [selectedFuncionario]);
  
  
  
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
