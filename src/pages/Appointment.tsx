// Appointment.tsx
import React, { useState } from "react";
import { ContainerPage } from './_Page.styles';
import { Col, Row } from 'react-bootstrap';
import HeaderTitle from '../view/HeaderTitle';
import Button from '../components/Button';
import * as S from './Appointment.styles';
import EmployeeSelect from '../components/Select/EmployeeSelect';
import ClientSelect from '../components/Select/ClientSelect';
import ServiceSelect from '../components/Select/ServiceSelect';
import TimeSelect from '../components/Select/TimeSelect';
import AppointmentDateSelect from "../components/Select/AppointmentDataSelect";
import { createAppointment } from "../services/AppointmentServices";
import { SelectOption } from "../models/SelectOptions";
import { getCorrigirIdByUserId, getEmployeeIdByUserId } from "../services/EmployeeServices";
import { useSnackbar } from 'notistack';
import EmployeeAppointmentSelect from "../components/Select/EmployeeAppointmentSelect";

export function Appointment() {
    const { enqueueSnackbar } = useSnackbar();
    const [employee, setEmployee] = useState<SelectOption | null>(null);
    const [client, setClient] = useState<SelectOption | null>(null);
    const [service, setService] = useState<SelectOption[] | null>([]);
    const [time, setTime] = useState<SelectOption | null>(null);
    const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<SelectOption | null>(null);

    const handleEmployeeChange = async (employee: SelectOption | null) => {
        setSelectedEmployee(employee);
    };
    
    const handleSubmit = async () => {
        try {
            if (!employee?.value) {
                enqueueSnackbar("Por favor, selecione um funcionário.", { variant: "warning" });
                return;
            }

            if (!client?.value) {
                enqueueSnackbar("Por favor, selecione um client.", { variant: "warning" });
                return;
            }

            if (!service || service.length === 0 || service[0].value === 0) {
                enqueueSnackbar("Por favor, selecione pelo menos um serviço.", { variant: "warning" });
                return;
            }

            if (!time?.value) {
                enqueueSnackbar("Por favor, selecione um horário.", { variant: "warning" });
                return;
            }

            if (!appointmentDate) {
                enqueueSnackbar("Por favor, selecione uma data para o agendamento.", { variant: "warning" });
                return;
            }

            const horarioStr = time?.value?.toString();
            if (!horarioStr) {
                enqueueSnackbar("Horário inválido.", { variant: "warning" });
                return;
            }

            const [horarioHoras, horarioMinutos] = horarioStr.split(":");

            const agendamentoData = new Date(appointmentDate);
            agendamentoData.setHours(parseInt(horarioHoras), parseInt(horarioMinutos));

            const funcionarioId = await getCorrigirIdByUserId(employee.value);

            const mapped = {
                id: 0,
                clientId: client.value,
                employeeId: funcionarioId.id,
                appointmentDate: agendamentoData,
                appointmentStatusId: 1,
                serviceIds: service.map((item) => item.value),
                storeId: 1
            };
                console.log(funcionarioId);
                
                // console.log(mapped);
                
            await createAppointment([mapped]);
            
            setEmployee({ value: 0, label: "Nenhum" });
            setClient({ value: 0, label: "Nenhum" });
            setService([{ value: 0, label: "Nenhum" }]);
            setTime({ value: 0, label: "Nenhum" });
            setAppointmentDate(null);
            enqueueSnackbar("Appointment criado com sucesso!", { variant: "success" });
        } catch (error) {
            console.error("Erro ao criar agendamento", error);
            enqueueSnackbar("Erro ao criar agendamento!", { variant: "error" });
        }
    };

    return (
        <ContainerPage style={{ height: "100vh" }}>
            <Row>
                <Col md={7} style={{ padding: "0px" }}>
                    <HeaderTitle title="Appointment" subTitle="Área destinada para realizar os agendamentos." />
                </Col>

                <Col md={5} className="d-flex flex-row justify-content-end align-items-center">
                    <Button onClick={handleSubmit} $isConfirm type="button" />
                </Col>
            </Row>

            <S.AppointmentContainer>
                <S.AppointmentContent>
                    <p>Funcionário</p>
                    <EmployeeAppointmentSelect value={employee?.value} setEmployee={setEmployee} handleEmployeeChange={handleEmployeeChange} />
                </S.AppointmentContent>

                <S.AppointmentContent>
                    <p>Cliente</p>
                    <ClientSelect value={client?.value} setClient={setClient} />
                </S.AppointmentContent>

                <S.AppointmentContent>
                    <p>Serviço</p>
                    <ServiceSelect
                        value={service?.map((s) => s.value) || undefined}
                        setService={setService}
                        selectedEmployee={selectedEmployee}
                    />  
                </S.AppointmentContent>

                <S.AppointmentContent>
                    <p>Horário</p>
                    <TimeSelect value={time?.value} setTime={setTime} />
                </S.AppointmentContent>

            </S.AppointmentContainer>

            <S.AppointmentContainer>

                <S.AppointmentContent>
                    <AppointmentDateSelect setAppointmentDate={setAppointmentDate} />
                </S.AppointmentContent>

            </S.AppointmentContainer>
        </ContainerPage>
    );
}

export default Appointment;
