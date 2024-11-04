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

const pagamentoOptions = [
  { value: "1", label: "Débito" },
  { value: "2", label: "Crédito" },
  { value: "3", label: "Dinheiro" },
  { value: "4", label: "Pix" },
];

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
    minWidth: "300px",
    minHeight: "50px",
    padding: "0 25px",
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

const ReactSelect: React.FC<ReactSelectProps> = ({ width, semana, horario, diasFechados, pagamento }) => {
  const [selectedOptions, setSelectedOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const options = semana ? semanaOptions : horario ? horarioOptions : pagamento ? pagamentoOptions : [];

  const handleSelectChange = (selected: any) => {
    if (horario && selected.length > 2) {
      selected = selected.slice(0, 2);
    }
    setSelectedOptions(selected || []);
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return; // Ignora se o valor for `null`

    setSelectedDates((prevDates) => {
      const isAlreadySelected = prevDates.some(
        (selectedDate) => selectedDate.getTime() === date.getTime()
      );

      if (isAlreadySelected) {
        return prevDates.filter(
          (selectedDate) => selectedDate.getTime() !== date.getTime()
        );
      } else {
        return [...prevDates, date];
      }
    });
  };

  return (
    <div style={{ width }}>
      {diasFechados ? (
        <Row>
          <Col>
            <S.StyledDatePicker style={{ width: "35rem" }}>
              <DatePicker
                selected={null}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione uma data..."
                className="custom-datepicker"
                inline
                filterDate={(date) => date > new Date()} // Permite apenas datas futuras
              />
              <div style={{ marginLeft: "10px", width: "200px" }}>
                {selectedDates.map((date, index) => (
                  <S.TextList key={index}>
                    {date.toLocaleDateString("pt-BR", { day: '2-digit', month: 'short', year: "2-digit" }).replace('.', '')}
                  </S.TextList>
                ))}
              </div>
            </S.StyledDatePicker>
          </Col>
        </Row>
      ) : (
        <Select
          options={options}
          isMulti
          onChange={handleSelectChange}
          value={selectedOptions}
          placeholder="Selecione opções..."
          styles={customStyles}
        />
      )}
    </div>
  );
};

export default ReactSelect;
