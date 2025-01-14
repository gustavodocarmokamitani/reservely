import { useState } from "react";
import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";
import HeaderTitle from "../view/HeaderTitle";
import Button from "../components/Button";
import EmployeeSelect from "../components/Select/EmployeeSelect";
import ClientSelect from "../components/Select/ClientSelect";
import ServiceSelect from "../components/Select/ServiceSelect";
import TimeSelect from "../components/Select/TimeSelect";
import AppointmentDateSelect from "../components/Select/AppointmentDataSelect";
import EmployeeAppointmentSelect from "../components/Select/EmployeeAppointmentSelect";
import * as S from "./Appointment.styles";
import { createAppointment } from "../services/AppointmentServices";
import { getCorrigirIdByUserId } from "../services/EmployeeServices";
import { SelectOption } from "../models/SelectOptions";
import { useSnackbar } from "notistack";

export function Appointment() {
  const { enqueueSnackbar } = useSnackbar();
  const [employee, setEmployee] = useState<SelectOption | null>(null);
  const [client, setClient] = useState<SelectOption | null>(null);
  const [service, setService] = useState<SelectOption[] | null>([]);
  const [appointmentTime, setAppointmentTime] = useState<SelectOption | null>(
    null
  );
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<SelectOption | null>(
    null
  );

  const storeUser = Number(localStorage.getItem("storeUser"));

  const handleEmployeeChange = async (employee: SelectOption | null) => {
    setSelectedEmployee(employee);
  };

  const validateAppointment = (
    employee: SelectOption | null,
    client: SelectOption | null,
    service: SelectOption[] | null,
    appointmentTime: SelectOption | null,
    appointmentDate: Date | null,
    enqueueSnackbar: (message: string, options: { variant: string }) => void
  ): boolean => {
    const validationRules = [
      {
        condition: !employee?.value,
        message: "Por favor, selecione um funcionário.",
      },
      {
        condition: !client?.value,
        message: "Por favor, selecione um cliente.",
      },
      {
        condition: !service || service.length === 0 || service[0].value === 0,
        message: "Por favor, selecione pelo menos um serviço.",
      },
      {
        condition: !appointmentTime?.value,
        message: "Por favor, selecione um horário.",
      },
      {
        condition: !appointmentDate,
        message: "Por favor, selecione uma data para o agendamento.",
      },
    ];

    for (const { condition, message } of validationRules) {
      if (condition) {
        enqueueSnackbar(message, { variant: "warning" });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      if (
        !validateAppointment(
          employee,
          client,
          service,
          appointmentTime,
          appointmentDate,
          enqueueSnackbar
        )
      ) {
        return;
      }
      const horarioStr = appointmentTime?.value?.toString();
      if (!horarioStr) {
        enqueueSnackbar("Horário inválido.", { variant: "warning" });
        return;
      }
      const [horarioHoras, horarioMinutos] = horarioStr.split(":");
      const agendamentoData = new Date(appointmentDate!);
      agendamentoData.setHours(
        parseInt(horarioHoras, 10),
        parseInt(horarioMinutos, 10)
      );
      const funcionarioId = await getCorrigirIdByUserId(employee!.value);
      const mapped = {
        id: 0,
        clientId: client!.value,
        employeeId: funcionarioId.id,
        appointmentDate: agendamentoData,
        appointmentTime: appointmentTime?.value
          ? appointmentTime.value.toString()
          : "",
        appointmentStatusId: 1,
        serviceIds: service!.map((item) => item.value),
        storeId: storeUser,
      };
      const responseCraeteAppointment = await createAppointment([mapped]);
      if (responseCraeteAppointment) {
        setEmployee({ value: 0, label: "Nenhum" });
        setClient({ value: 0, label: "Nenhum" });
        setService([{ value: 0, label: "Nenhum" }]);
        setAppointmentTime({ value: 0, label: "Nenhum" });
        setAppointmentDate(null);
        enqueueSnackbar("Appointment criado com sucesso!", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Erro ao criar agendamento", error);
      enqueueSnackbar("Erro ao criar agendamento!", { variant: "error" });
    }
  };

  return (
    <ContainerPage style={{ height: "100vh" }}>
      <Row>
        <Col md={7} style={{ padding: "0px" }}>
          <HeaderTitle
            title="Appointment"
            subTitle="Área destinada para realizar os agendamentos."
          />
        </Col>
        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          <Button onClick={handleSubmit} $isConfirm type="button" />
        </Col>
      </Row>
      <S.AppointmentContainer>
        <S.AppointmentContent>
          <p>Funcionário</p>
          <EmployeeAppointmentSelect
            value={employee?.value}
            setEmployee={setEmployee}
            handleEmployeeChange={handleEmployeeChange}
          />
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
          <TimeSelect
            value={appointmentTime?.value}
            setAppointmentTime={setAppointmentTime}
          />
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
