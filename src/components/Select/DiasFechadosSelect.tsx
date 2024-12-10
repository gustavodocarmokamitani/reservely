import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "../ReactSelect.styles";
import { Col, Row } from "react-bootstrap";


const ReactSelect: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectChangeDataAgendamento = (date: Date | null) => {
    setSelectedDate(date);
  };

  
  return (
        <Row>
          <Col>
            <S.StyledDatePicker style={{ width: "35rem" }}>
              <DatePicker
                selected={null}
                onChange={(date) => handleSelectChangeDataAgendamento(date)}
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

export default ReactSelect;
