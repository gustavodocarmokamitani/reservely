import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles/dataStyles";

interface StoreDataSelectProps {
    setClosingDates: (date: Date[] | null) => void;
}

const StoreDataSelect: React.FC<StoreDataSelectProps> = ({ setClosingDates }) => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const handleDateChange = (date: Date | null) => {
        if (date) {
            const updatedDates = selectedDates.some(d => d.getTime() === date.getTime())
                ? selectedDates
                : [...selectedDates, date];

            setSelectedDates(updatedDates);
            setClosingDates(updatedDates);
        }
    };

    const dayClassName = (date: Date) => {
        return selectedDates.some(d => d.getTime() === date.getTime()) ? "selected-day" : "";
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
                    dayClassName={dayClassName}
                />
            </S.StyledDatePicker>
        </>
    );
};

export default StoreDataSelect;
