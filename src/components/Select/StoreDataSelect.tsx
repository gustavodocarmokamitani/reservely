import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles/dataStyles";

interface StoreDataSelectProps {
  setClosingDates: React.Dispatch<React.SetStateAction<Date[] | null>>;
}

const StoreDataSelect: React.FC<StoreDataSelectProps> = ({
  setClosingDates,
}) => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setClosingDates((prevDates) => {
        const isDuplicate = prevDates?.some(
          (existingDate) => existingDate.toDateString() === date.toDateString()
        );

        return isDuplicate ? prevDates : [...(prevDates || []), date];
      });
    }
  };

  return (
    <>
      <S.StyledDatePicker>
        <DatePicker
          selected={null}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          placeholderText="Selecione a data"
          isClearable
          inline
        />
      </S.StyledDatePicker>
    </>
  );
};

export default StoreDataSelect;
