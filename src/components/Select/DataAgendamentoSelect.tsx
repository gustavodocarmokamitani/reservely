// ReactSelect.tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "../ReactSelect.styles";

interface ReactSelectProps {
  setDataAgendamento: (date: Date | null) => void;
}

const ReactSelect: React.FC<ReactSelectProps> = ({ setDataAgendamento }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectChangeDataAgendamento = (date: Date | null) => {
    setSelectedDate(date);
    setDataAgendamento(date); 
  };

  return (
    <S.StyledDatePicker style={{ width: "25rem" }}>
      <DatePicker
        selected={selectedDate}
        onChange={handleSelectChangeDataAgendamento}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecione a data de agendamento..."
        minDate={new Date()}
        className="custom-datepicker"
        inline
      />
    </S.StyledDatePicker>
  );
};

export default ReactSelect;
