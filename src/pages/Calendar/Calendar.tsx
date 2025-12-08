import * as P from "../Styles/_Page.styles"; 
import * as S from "./Calendar.styles";
import { ScheduleX } from "../../view/ScheduleX/ScheduleX";
import { useCallback, useContext, useEffect, useState } from "react";
import { getAppointmentByStoreId } from "../../services/AppointmentServices";
import { getServiceTypeById } from "../../services/ServiceTypeServices";
import { Appointment } from "../../models/Appointment";
import moment from "moment";
import LoadingLocale from "../../components/Loading/loadingLocale";

import homeClient from "../../assets/homeClient.svg";
import UserMenu from "../../components/UserMenu/UserMenu";
import { DecodedToken } from "../../models/DecodedToken";
import { AppContext } from "../../context/AppContext";
import { decodeToken } from "../../services/AuthService";

interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    color?: string;
}

function Calendar() {
    const context = useContext(AppContext);

    const storeUser = Number(localStorage.getItem("storeUser"));
    const [events, setEvents] = useState<Event[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);

    const authToken = context?.authToken;

    useEffect(() => {
        const fetchDecodedToken = async () => {
            if (authToken) {
                try {
                    const decoded = await decodeToken(authToken);
                    setDecodedData(decoded);
                } catch (error) {
                    console.error("Erro ao decodificar o token:", error);
                }
            }
        };

        fetchDecodedToken();
    }, [authToken]);
 
    const fetchData = useCallback(async () => { 
        if (!decodedData || !storeUser) { 
            return; 
        }

        try { 
            const response = await getAppointmentByStoreId(storeUser);
            
            let appointmentsToProcess: Appointment[] = response;
            
            const isEmployee = decodedData.userRole === "Employee";
            const employeeId = decodedData.userId;
 
            if (isEmployee) {
                if (employeeId) {
                    appointmentsToProcess = response.filter(
                        (appointment: Appointment) => appointment.employeeId === parseFloat(employeeId)
                    );
                } else {
                    console.warn("User is an Employee but employeeId is missing in the decoded token.");
                    appointmentsToProcess = [];  
                }
            }
             
            const fetchedEvents: Event[] = await Promise.all(
                appointmentsToProcess.map(async (appointment: Appointment) => {
                    const serviceNames = await Promise.all(
                        appointment.serviceIds.map(async (id) => {
                            const servicesName = await getServiceTypeById(id);
                            if (servicesName && servicesName.data) {
                                return servicesName.data.name;
                            }
                            return `Serviço Removido Id:${id} `;
                        })
                    );

                    const serviceDurationMinute = await Promise.all(
                        appointment.serviceIds.map(async (id) => {
                            const serviceDurationMinutes = await getServiceTypeById(id);
                            return serviceDurationMinutes?.data?.durationMinutes || 0;
                        })
                    );

                    const totalDuration = serviceDurationMinute.reduce(
                        (acc, curr) => acc + curr,
                        0
                    );

                    const startDateTime =
                        moment(appointment.appointmentDate).format("YYYY-MM-DD") +
                        " " +
                        appointment.appointmentTime;

                    const endDateTimeFull = moment(appointment.appointmentTime, "HH:mm")
                        .add(totalDuration, "minutes")
                        .format("HH:mm");

                    const endDateTime =
                        moment(appointment.appointmentDate).format("YYYY-MM-DD") +
                        " " +
                        endDateTimeFull;

                    return {
                        id: appointment.id.toString(),
                        title: `${serviceNames}`,
                        start: startDateTime,
                        end: endDateTime,
                    };
                })
            );

            setEvents(fetchedEvents);
            setIsDataLoaded(true);
        } catch (error) {
            console.error("Error fetching appointments", error);
        }
    }, [storeUser, decodedData]); 

    useEffect(() => { 
        if (decodedData) {
            fetchData();
        }
    }, [fetchData, decodedData]);  

    const generateScheduleX = () => {
        if (isDataLoaded) {
            return <ScheduleX events={events} />;
        } 
        if (!decodedData) {
            return <LoadingLocale />;
        }
        return <LoadingLocale />;
    };

    return (
        <>
            <P.ContainerPage style={{ height: "100%" }}>
                <UserMenu />
                <P.ContainerHeader>
                    <P.ContentHeader align="start">
                        <P.Title>
                            Calendário <br />
                        </P.Title>
                        <P.SubTitle>
                            Área dedicada a visualização de agendamentos.
                        </P.SubTitle>
                    </P.ContentHeader>
                </P.ContainerHeader>
                <S.CalendarContainer>
                    <S.CalendarContent>{generateScheduleX()}</S.CalendarContent>
                </S.CalendarContainer>
            </P.ContainerPage>
        </>
    );
}

export default Calendar;