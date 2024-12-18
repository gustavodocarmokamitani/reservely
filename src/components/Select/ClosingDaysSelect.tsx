import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import * as S from "../ReactSelect.styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ClosingDaysSelect: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectChangeAppointmentData = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
        <Row>
          <Col>
            <S.StyledDatePicker style={{ width: "35rem" }}>
              <DatePicker
                selected={null}
                onChange={(date) => handleSelectChangeAppointmentData(date)}
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
  );
};

export default ClosingDaysSelect;
