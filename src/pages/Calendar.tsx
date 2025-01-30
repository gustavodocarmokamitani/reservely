import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import { Col, Row } from "react-bootstrap";
import * as S from "./Calendar.styles";
import { ScheduleX } from "../view/ScheduleX"; // Ajuste na importação
import { useCallback, useEffect, useState } from "react";
import { getAppointmentByStoreId } from "../services/AppointmentServices";
import { getServiceTypeById } from "../services/ServiceTypeServices";
import { Appointment } from "../models/Appointment";
import moment from "moment";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  color?: string;
}

function Calendar() {
  const storeUser = Number(localStorage.getItem("storeUser"));
  const [events, setEvents] = useState<Event[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await getAppointmentByStoreId(storeUser);
      const fetchedEvents: Event[] = await Promise.all(
        response.map(async (appointment: Appointment) => {
          const serviceNames = await Promise.all(
            appointment.serviceIds.map(async (id) => {
              const service = await getServiceTypeById(id);
              if (service && service.data) {
                return service.data.name;
              }
              return "";
            })
          );          

          return {
            id: appointment.id.toString(),
            title: `${serviceNames}`,
            start: moment(appointment.appointmentDate).format("YYYY-MM-DD"),
            end: moment(appointment.appointmentDate).format("YYYY-MM-DD"),                        
          };
        })
      );
      setEvents(fetchedEvents);
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  }, [storeUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const generateScheduleX = () => {
    if (isDataLoaded) {
      return <ScheduleX events={events} />;
    }
    return <div>Carregando eventos...</div>;
  };

  return (
    <>
      <ContainerPage>
        <Row className="wrap">
          <Col md={12} lg={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Calendário"
              subTitle="Área dedicada ao gerenciamento e visualização de agendamentos."
            ></HeaderTitle>
          </Col>
        </Row>
        <S.CalendarContainer>
          <S.CalendarContent>{generateScheduleX()}</S.CalendarContent>
        </S.CalendarContainer>
      </ContainerPage>
    </>
  );
}

export default Calendar;
