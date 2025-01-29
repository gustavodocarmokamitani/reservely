import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import { Col, Row } from "react-bootstrap";
import * as S from "./Calendar.styles";
import ScheduleX from "../view/ScheduleX";

function Calendar() {
  return (
    <>
      <ContainerPage>
        <Row className="wrap">
          <Col md={12} lg={7} style={{ padding: "0px" }}>
            <HeaderTitle title="Calendário" subTitle="Área dedicada ao gerenciamento e visualização de agendamentos."></HeaderTitle>
          </Col>
        </Row>
        <S.CalendarContainer>
          <S.CalendarContent>
            <ScheduleX />
          </S.CalendarContent>
        </S.CalendarContainer>
      </ContainerPage>
    </>
  );
}

export default Calendar;
