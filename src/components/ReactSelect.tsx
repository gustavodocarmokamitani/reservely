import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./ReactSelect.styles";
import { Col, Row } from "react-bootstrap";

interface ReactSelectProps {
  width: string;
  semana?: boolean;
  horario?: boolean;
  diasFechados?: boolean;
  pagamento?: boolean;
  funcionario?: boolean;
  agendamento?: boolean;
  servico?: boolean;
}

// Opções de semana
const semanaOptions = [
  { value: "segunda", label: "Segunda" },
  { value: "terca", label: "Terça" },
  { value: "quarta", label: "Quarta" },
  { value: "quinta", label: "Quinta" },
  { value: "sexta", label: "Sexta" },
  { value: "sabado", label: "Sábado" },
  { value: "domingo", label: "Domingo" },
];

// Opções de pagamento
const pagamentoOptions = [
  { value: "1", label: "Débito" },
  { value: "2", label: "Crédito" },
  { value: "3", label: "Dinheiro" },
  { value: "4", label: "Pix" },
];

// Opções de funcionário
const funcionarioOptions = [
  { value: "1", label: "João Silva" },
  { value: "2", label: "Maria Oliveira" },
  { value: "3", label: "Carlos Souza" },
  { value: "4", label: "Ana Santos" },
];

// Opções de servico
const servicoOptions = [
  { value: "1", label: "Corte Masculino" },
  { value: "2", label: "Barba e bigode" },
  { value: "3", label: "Coloração" },
  { value: "4", label: "Progressiva" },
];

// Função para gerar opções de horário
const generateHourOptions = (start: number, end: number) => {
  const options = [];
  for (let hour = start; hour <= end; hour++) {
    const label = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    options.push({ value: label, label });
  }
  return options;
};

const horarioOptions = generateHourOptions(1, 23);

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minWidth: "350px",
    minHeight: "40px",
    padding: "5px 25px",
    fontSize: "14px",
    border: "1px solid rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    boxShadow: "4px 4px 15px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    "&:hover": {
      borderColor: "#888",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#007bff" : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    "&:hover": {
      backgroundColor: "#e0e0e0",
      color: "#333",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: "15px",
    padding: "0 5px",
    backgroundColor: "#616060",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#fff",
    "&:hover": {
      borderRadius: "15px",
      backgroundColor: "#616060",
      color: "#fff",
    },
  }),
};

const ReactSelect: React.FC<ReactSelectProps> = ({ width, semana, horario, diasFechados, pagamento, funcionario, agendamento, servico }) => {
  const [selectedOptions, setSelectedOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState<{ value: string; label: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Determina as opções de acordo com o prop ativo
  const options = semana 
    ? semanaOptions 
    : horario 
    ? horarioOptions 
    : pagamento 
    ? pagamentoOptions 
    : funcionario 
    ? funcionarioOptions 
    : servico 
    ? servicoOptions
    : [];

  const handleSelectChange = (selected: any) => {
    if (funcionario) {
      setSelectedFuncionario(selected);
    } else {
      if (horario && selected.length > 2) {
        selected = selected.slice(0, 2);
      }
      setSelectedOptions(selected || []);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ width: `${width}` }}>
      {diasFechados ? (
        // Componente de datas fechadas com seleção de múltiplas datas
        <Row>
          <Col>
            <S.StyledDatePicker style={{ width: "35rem"}}>
              <DatePicker
                selected={null}
                onChange={(date) => handleDateChange(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione uma data..."
                className="custom-datepicker"
                inline
                filterDate={(date) => date > new Date()}
              />
              <div style={{ marginLeft: "40px", width: "250px" }}>
                {selectedDate && (
                  <S.TextList>
                    {selectedDate.toLocaleDateString("pt-BR", { day: '2-digit', month: 'short', year: "2-digit" }).replace('.', '')}
                  </S.TextList>
                )}
              </div>
            </S.StyledDatePicker>
          </Col>
        </Row>
      ) : agendamento ? (
        <S.StyledDatePicker style={{ width: "35rem"}}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => handleDateChange(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione a data de agendamento..."
          minDate={new Date()}
          className="custom-datepicker"
          inline
        />
       </S.StyledDatePicker>
      ) : (
        <Select
          options={options}
          isMulti={!funcionario || servico}
          onChange={handleSelectChange}
          value={funcionario ? selectedFuncionario : selectedOptions}
          placeholder="Selecione opções..."
          styles={customStyles}
        />
      )}
    </div>
  );
};

export default ReactSelect;
