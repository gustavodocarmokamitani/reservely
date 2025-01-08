// Imports principais (React e estilos)
import { useState } from "react";
import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";

// Imports de componentes
import HeaderTitle from "../view/HeaderTitle";
import Button from "../components/Button";
import EmployeeSelect from "../components/Select/EmployeeSelect";
import ClientSelect from "../components/Select/ClientSelect";
import ServiceSelect from "../components/Select/ServiceSelect";
import TimeSelect from "../components/Select/TimeSelect";
import AppointmentDateSelect from "../components/Select/AppointmentDataSelect";
import EmployeeAppointmentSelect from "../components/Select/EmployeeAppointmentSelect";

// Imports de estilos específicos
import * as S from "./Appointment.styles";

// Imports de serviços
import { createAppointment } from "../services/AppointmentServices";
import {
  getCorrigirIdByUserId,
  getEmployeeIdByUserId,
} from "../services/EmployeeServices";

// Imports de modelos e bibliotecas
import { SelectOption } from "../models/SelectOptions";
import { useSnackbar } from "notistack";

export function Appointment() {
  // Hooks para gerenciamento de estado
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

  // Informações do usuário armazenadas localmente
  const storeUser = localStorage.getItem("storeUser");

  // Função para atualizar o funcionário selecionado
  const handleEmployeeChange = async (employee: SelectOption | null) => {
    setSelectedEmployee(employee);
  };

  //Função para validação do agendamento
  const validateAppointment = (
    employee: SelectOption | null,
    client: SelectOption | null,
    service: SelectOption[] | null,
    appointmentTime: SelectOption | null,
    appointmentDate: Date | null,
    enqueueSnackbar: (message: string, options: { variant: string }) => void
  ): boolean => {
    if (!employee?.value) {
      enqueueSnackbar("Por favor, selecione um funcionário.", {
        variant: "warning",
      });
      return false;
    }

    if (!client?.value) {
      enqueueSnackbar("Por favor, selecione um cliente.", {
        variant: "warning",
      });
      return false;
    }

    if (!service || service.length === 0 || service[0].value === 0) {
      enqueueSnackbar("Por favor, selecione pelo menos um serviço.", {
        variant: "warning",
      });
      return false;
    }

    if (!appointmentTime?.value) {
      enqueueSnackbar("Por favor, selecione um horário.", {
        variant: "warning",
      });
      return false;
    }

    if (!appointmentDate) {
      enqueueSnackbar("Por favor, selecione uma data para o agendamento.", {
        variant: "warning",
      });
      return false;
    }

    return true;
  };

  // Função para realizar o envio dos dados do agendamento
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
        appointmentTime: appointmentTime?.value ? appointmentTime.value.toString() : "",  
        appointmentStatusId: 1,
        serviceIds: service!.map((item) => item.value),
        storeId: Number(storeUser),
      };

      const responseCraeteAppointment = await createAppointment([mapped]);

      // Reseta os estados após sucesso
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

  // Renderização da página de agendamento
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
