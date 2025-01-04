import { useContext, useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import {
  deleteAppointment,
  getAppointments,
} from "../services/AppointmentServices";
import { Appointment } from "../models/Appointment";
import { getEmployeeById } from "../services/EmployeeServices";
import { getUserById } from "../services/UserServices";
import moment from "moment";
import { getAppointmentStatusById } from "../services/AppointmentStatusServices";

import { useSnackbar } from "notistack";
import AppointmentDataTable from "../view/DataTable/AppointmentDataTable";
import { AppContext } from "../context/AppContext";

function AppointmentHistory() {
  const [selectedAppointmentIds, setSelectedAppointmentIds] = useState<
    number[]
  >([]);
  const [update, setUpdate] = useState(false);
  const [rows, setRows] = useState<Appointment[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const context = useContext(AppContext);
  const { userRoleContext } = context || {};

  const fetchData = async () => {
    try {
      const appointmentData = await getAppointments();

      const mappedAppointment = await Promise.all(
        appointmentData.map(async (appointment: Appointment) => {
          const employeeData = await getEmployeeById(appointment.employeeId);
          const userClientData = await getUserById(appointment.clientId);
          const userData = await getUserById(employeeData.userId);
          const appointmentStatusData = await getAppointmentStatusById(
            appointment.appointmentStatusId
          );

          const formattedDate = moment(appointment.appointmentDate).format(
            "DD/MM/YYYY"
          );

          return {
            id: appointment.id,
            employeeId: userData.name,
            clientId: userClientData.name,
            appointmentDate: formattedDate,
            serviceIds: appointment.serviceIds,
            appointmentStatus: appointmentStatusData.name,
          };
        })
      );

      setRows(mappedAppointment);
      setUpdate(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowSelect = (ids: number[]) => {
    setSelectedAppointmentIds(ids);
  };

  const handleDeleteAppointment = async () => {
    try {
      await Promise.all(
        selectedAppointmentIds.map(async (appointmentId) => {
          try {
            const responseAppointment = await getAppointments();
            const appointment = responseAppointment.find(
              (a: Appointment) => a.id === appointmentId
            );

            if (appointment) {
              await deleteAppointment(appointment.id);
              enqueueSnackbar(`Appointment deleted successfully!`, {
                variant: "success",
              });
            } else {
              enqueueSnackbar(`No employee found with id:  ${appointmentId}`, {
                variant: "error",
              });
            }
          } catch (error) {
            console.error(`Erro deleting employee ${appointmentId}:`, error);
          }
        })
      );
      fetchData();
      setSelectedAppointmentIds([]);
    } catch (error) {
      console.error("Erro deleting employee:", error);
    }
  };

  return (
    <>
      <ContainerPage style={{ height: "100vh" }}>
        <Row>
          <Col md={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Histórico Agendamentos"
              subTitle="Área destinada para gerenciamento do histórico de agendamentos."
            />
          </Col>

          <Col
            md={5}
            className="d-flex flex-row justify-content-end align-items-center"
          >
            {userRoleContext?.userRole === "Admin" && (
            <Button onClick={handleDeleteAppointment} $isRemove type="button" />
            )}
          </Col>
        </Row>
        <AppointmentDataTable
          appointment
          rowsAppointment={rows}
          onRowSelect={handleRowSelect}
          setUpdate={setUpdate}
          update={update}
          fetchData={fetchData}
        />
      </ContainerPage>
    </>
  );
}

export default AppointmentHistory;
