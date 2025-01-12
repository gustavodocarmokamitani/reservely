import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles/dataStyles";

interface StoreDataSelectProps {
    setClosingDates: React.Dispatch<React.SetStateAction<Date[] | null>>;
}

const StoreDataSelect: React.FC<StoreDataSelectProps> = ({ setClosingDates }) => {

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setClosingDates(prevDates => prevDates ? [...prevDates, date] : [date]);
        }
    };
 
    return (
        <>
            <S.StyledDatePicker>
                <DatePicker
                    selected={null}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy" 
                    placeholderText="Selecione a data"
                    isClearable
                    inline
                />
            </S.StyledDatePicker>
        </>
    );
};

export default StoreDataSelect;
