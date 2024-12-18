// PaymentMethodSelect.tsx
import React from "react";
import Select from "react-select";
import customStyles from "./styles/customStyles";
import { PaymentMethod } from "../../models/PaymentMethod";

interface PaymentMethodSelectProps {
  setPayment: (payment: PaymentMethod[]) => void;
  value?: PaymentMethod[];
}

const PaymentMethodSelect: React.FC<PaymentMethodSelectProps> = ({ setPayment, value }) => {
  const paymentMethod: PaymentMethod[] = [
    { id: 1, name: "Débito" },
    { id: 2, name: "Crédito" },
    { id: 3, name: "Pix" },
    { id: 4, name: "Dinheiro" }
  ];

  const options = paymentMethod.map((metodo) => ({
    value: metodo.id,
    label: metodo.name
  }));

  const handleChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions?.map((option: any) => option.value) || [];
    const selectedMetodos = paymentMethod.filter(m => selectedIds.includes(m.id));
    setPayment(selectedMetodos);
  };

  return (
    <Select
      options={options}
      isMulti
      placeholder="Selecione um método de payment"
      onChange={handleChange}
      styles={customStyles}
      value={options.filter(opt => value?.some(v => v.id === opt.value))}
    />
  );
};

export default PaymentMethodSelect;
