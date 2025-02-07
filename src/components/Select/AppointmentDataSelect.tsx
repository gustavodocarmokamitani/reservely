import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles/DataPicker.styles"
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";

interface AppointmentDataSelectProps {
  setAppointmentDate: (date: Date | null) => void;
}

const AppointmentDataSelect: React.FC<AppointmentDataSelectProps> = ({ setAppointmentDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectChangeAppointmentDate = (date: Date | null) => {
    setSelectedDate(date);
    setAppointmentDate(date); 
  };

  return (
    <S.StyledDatePicker style={{ width: "100%" }}>
      <DatePicker
        selected={selectedDate}
        onChange={handleSelectChangeAppointmentDate}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecione a data de agendamento..."
        minDate={new Date()}
        className="custom-datepicker"
        inline
        locale={ptBR}
      />
    </S.StyledDatePicker>
  );
};

export default AppointmentDataSelect;
