import { useState, useEffect, useCallback } from "react";
import { ContainerPage } from "../Styles/_Page.styles";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import AppointmentDataTable from "../../view/DataTable/AppointmentDataTable";
import Button from "../../components/Button/Button";
import { Col, Row } from "react-bootstrap";
import { deleteAppointment, getAppointmentByStoreId, getAppointments } from "../../services/AppointmentServices";
import { getEmployeeById } from "../../services/EmployeeServices";
import { getUserById } from "../../services/UserServices";
import { getAppointmentStatusById } from "../../services/AppointmentStatusServices";
import { decodeToken } from "../../services/AuthService";
import { useSnackbar } from "notistack";
import { Appointment } from "../../models/Appointment";
import { capitalizeFirstLetter } from "../../services/system/globalService";

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

function AppointmentHistory() {
  const [selectedAppointmentIds, setSelectedAppointmentIds] = useState<number[]>([]);
  const [update, setUpdate] = useState(false);
  const [rows, setRows] = useState<Appointment[]>([]);
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  const storedToken = localStorage.getItem("authToken");
  const storeUser = Number(localStorage.getItem("storeUser"));
  const { enqueueSnackbar } = useSnackbar();

  const mapAppointments = async (appointments: Appointment[]) => {
    return Promise.all(
      appointments.map(async (appointment) => {
        const employeeData = appointment.employeeId
          ? await getEmployeeById(appointment.employeeId)
          : null;
                  
        const userClientData = appointment.clientId
          ? await getUserById(appointment.clientId)
          : null;
  
        const userData = employeeData?.userId
          ? await getUserById(employeeData.userId)
          : null;
  
        const appointmentStatusData = await getAppointmentStatusById(
          appointment.appointmentStatusId
        );
        console.log(userData.name);
        
        return {
          ...appointment,
          employeeId: employeeData ? employeeData.id : 0,
          employeeFullName: userData ? `${capitalizeFirstLetter(userData.name)} ${capitalizeFirstLetter(userData.lastName)}` : "N/A",
          clientId: userClientData ? userClientData.name : "Visitante",  
          appointmentDate: new Date(appointment.appointmentDate),
          appointmentStatus: appointmentStatusData.name,
        };
      })
    );
  };
  

  const fetchData = useCallback(async () => {
    try {
      if (storedToken) {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      }

      const appointmentData = await getAppointmentByStoreId(storeUser);
      
      const mappedAppointments = await mapAppointments(appointmentData); 

      setRows(mappedAppointments);
      
      setUpdate(false);
      console.log(123);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [storedToken, storeUser]);

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
              enqueueSnackbar(`Agendamento apagado com sucesso!`, { variant: "success" });
            } else {
              enqueueSnackbar(`Agendamento com id: ${appointmentId} não encontrado.`, { variant: "error" });
            }
          } catch (error) {
            console.error(`Error deleting appointment ${appointmentId}:`, error);
          }
        })
      );
      setSelectedAppointmentIds([]);
      fetchData();
    } catch (error) {
      console.error("Error deleting appointments:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ContainerPage style={{ height: "100vh" }}>
      <Row>
        <Col lg={12} xl={7} style={{ padding: "0px" }}>
          <HeaderTitle
            title="Histórico Agendamentos"
            subTitle="Área destinada para gerenciamento do histórico de agendamentos."
          />
        </Col>

        <Col lg={12} xl={5} className="d-flex flex-row justify-content-md-center justify-content-lg-end align-items-center  mt-md-3 mt-lg-5 mt-xl-0"
       >
          {decodedData?.userRole === "Admin" && (
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
  );
}

export default AppointmentHistory;
