// MetodoPagamentoSelect.tsx
import React from "react";
import Select from "react-select";
import customStyles from "./styles/customStyles";
import { MetodoPagamento } from "../../models/MetodoPagamento";

interface MetodoPagamentoSelectProps {
  setPagamento: (pagamento: MetodoPagamento[]) => void;
  value?: MetodoPagamento[];
}

const MetodoPagamentoSelect: React.FC<MetodoPagamentoSelectProps> = ({ setPagamento, value }) => {
  const metodosPagamento: MetodoPagamento[] = [
    { id: 1, nome: "Débito" },
    { id: 2, nome: "Crédito" },
    { id: 3, nome: "Pix" },
    { id: 4, nome: "Dinheiro" }
  ];

  const options = metodosPagamento.map((metodo) => ({
    value: metodo.id,
    label: metodo.nome
  }));

  const handleChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions?.map((option: any) => option.value) || [];
    const selectedMetodos = metodosPagamento.filter(m => selectedIds.includes(m.id));
    setPagamento(selectedMetodos);
  };

  return (
    <Select
      options={options}
      isMulti
      placeholder="Selecione um método de pagamento"
      onChange={handleChange}
      styles={customStyles}
      value={options.filter(opt => value?.some(v => v.id === opt.value))}
    />
  );
};

export default MetodoPagamentoSelect;
