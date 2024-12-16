// FuncionarioSelect.tsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getTipoUsuarioIdById, getUsuarioById } from "../../services/UsuarioServices";
import customStyles from "./styles/customStyles";
import { SelectOption } from "../../models/SelectOptions";
import { getFuncionarios } from "../../services/FuncionarioServices";
import { Funcionario } from "../../models/Funcionario";

interface FuncionarioSelectProps {
  setFuncionario: (option: SelectOption | null) => void;
  handleFuncionarioChange: (option: SelectOption | null) => void;
  value?: number;
}

interface Option {
  value: any;
  label: string;
  isDisabled?: boolean;
}

const FuncionarioSelect: React.FC<FuncionarioSelectProps> = ({ setFuncionario, value, handleFuncionarioChange }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const responseFuncionario = await getFuncionarios();

        // Filtrar apenas os funcionários ativos
        const funcionariosAtivos = responseFuncionario.filter((funcionario: Funcionario) => funcionario.ativo === "true");

        // Obter os usuários relacionados aos IDs dos funcionários ativos
        const usuariosAtivos = await Promise.all(
          funcionariosAtivos.map(async (funcionario: Funcionario) => {
            const usuario = await getUsuarioById(funcionario.usuarioId);
            return usuario;
          })
        );

        // Mapear os dados das respostas no formato desejado
        const formattedOptions: Option[] = usuariosAtivos.map((item: any) => ({
          value: item.id,
          label: item.nome,
          isDisabled: false,
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
    handleFuncionarioChange(option)
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
