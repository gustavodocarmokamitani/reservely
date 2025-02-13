import React, { useState } from "react";
import DatePicker from "react-datepicker";
import * as S from "./styles/DataPicker.styles"; 
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";

interface SelectDataPickerProps {
  setDate: (date: Date[]) => void;
  isClearable?: boolean;
}

const SelectDataPicker: React.FC<SelectDataPickerProps> = ({ setDate, isClearable }) => {
  const [selected, setSelected] = useState<Date[]>([]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelected((prevDates) => {
        const isDuplicate = prevDates.some((existingDate) => existingDate.toDateString() === date.toDateString());

        if (!isDuplicate) {
          const updatedDates = [...prevDates, date];
          setDate(updatedDates);
          return updatedDates;
        }
        return prevDates;
      });
    }
  };

  return (
    <S.StyledDatePicker style={{ width: "100%" }}>
      <DatePicker
        selected={selected.length > 0 ? selected[selected.length - 1] : null} 
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        className="custom-datepicker"
        inline
        locale={ptBR}
        isClearable={isClearable}
      />
    </S.StyledDatePicker>
  );
};

export default SelectDataPicker;
