import React, { useState } from "react";
import DatePicker from "react-datepicker";
import * as S from "./styles/DataPicker.styles";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";

interface SelectDataPickerProps {
  setDate: (date: Date[]) => void;
  isClearable?: boolean;
  type: "appointment" | "store";
  operatingDays: string[];
  closedDates: string[];
}

const SelectDataPicker: React.FC<SelectDataPickerProps> = ({
  setDate,
  isClearable,
  type,
  operatingDays,
  closedDates,
}) => {
  const [selected, setSelected] = useState<Date[]>([]);
 
  const dayMap: { [key: string]: number } = {
    Domingo: 0,
    Segunda: 1,
    Terça: 2,
    Quarta: 3,
    Quinta: 4,
    Sexta: 5,
    Sábado: 6,
  };

  const workingDays =
    operatingDays.length > 0
      ? operatingDays.map((day) => dayMap[day])
      : [0, 1, 2, 3, 4, 5, 6];

  const parseDateLocal = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const parsedClosedDates =
    closedDates.length > 0 ? closedDates.map(parseDateLocal) : [];

  const filterWeekDays = (date: Date) => {
    const dayOfWeek = date.getDay();
    return workingDays.includes(dayOfWeek);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelected([date]);
      setDate([date]);
    }
  };

  const handleDateChangeAppointment = (date: Date | null) => {
    if (date) {
      setSelected([date]);
      setDate([date]);
    }
  };

  return (
    <S.StyledDatePicker style={{ width: "100%" }}>
      <DatePicker
        selected={selected.length > 0 ? selected[selected.length - 1] : null}
        onChange={
          type === "appointment"
            ? handleDateChangeAppointment
            : handleDateChange
        }
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        className="custom-datepicker"
        inline
        locale={ptBR}
        isClearable={isClearable}
        filterDate={(date) =>
          filterWeekDays(date) &&
          !parsedClosedDates.some(
            (closed) => closed.toDateString() === date.toDateString()
          )
        }
      />
    </S.StyledDatePicker>
  );
};

export default SelectDataPicker;
