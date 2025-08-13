import { useSnackbar } from "notistack";
import { Appointment } from "../../models/Appointment";
import {
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  getValidateAppointment,
  updateAppointment,
} from "../../services/AppointmentServices";
import { SelectOption } from "../../models/SelectOptions";
import { getStoreById } from "../../services/StoreServices";

export const useAction = (
  storeUser: number,
  selectedAppointmentHistoryId: number,
  statusAppointment: SelectOption[],
  handleClose: () => void,
  fetchData: () => void,
  selectedAppointmentIds: number[],
  setSelectedAppointmentIds: React.Dispatch<React.SetStateAction<number[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  appointmentDate: Date[],
  appointmentTime: SelectOption[]
) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitAppointmentHistoryStatus = async () => {
    setIsLoading(true); 
    
    try {
      const response = await getAppointmentById(selectedAppointmentHistoryId);
      const formattedDate =
        appointmentDate.length > 0
          ? new Date(appointmentDate[appointmentDate.length - 1]).toISOString()
          : null;

      const selectedDate = appointmentDate[appointmentDate.length - 1];

      const responseStore = await getStoreById(storeUser);
      if (responseStore.multipleAppointments === false) {
        const isAvailable = await getValidateAppointment(
          response.employeeId,
          selectedDate,
          appointmentTime[appointmentTime.length - 1].label,
          response.serviceIds[0]
        );

        if (!isAvailable) {
          enqueueSnackbar("Este horário já está ocupado.", {
            variant: "warning",
          });
          setIsLoading(false);
          return;
        }
      }

      const mappedAppointment: Appointment =
        statusAppointment[statusAppointment.length - 1].value !== 4
          ? {
              ...response,
              id: selectedAppointmentHistoryId,
              appointmentStatusId:
                statusAppointment[statusAppointment.length - 1].value,
              storeId: Number(storeUser),
            }
          : {
              ...response,
              id: selectedAppointmentHistoryId,
              appointmentDate: formattedDate,
              appointmentTime:
                appointmentTime[appointmentTime.length - 1].label,
              appointmentStatusId:
                statusAppointment[statusAppointment.length - 1].value,
              storeId: Number(storeUser),
            };
            console.log(mappedAppointment);
            
      const responseAppointment = await updateAppointment(
        mappedAppointment.id,
        mappedAppointment
      );

      setIsLoading(false);
      if (responseAppointment) {
        enqueueSnackbar("Status do appointment editado com sucesso!", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error(
        `Erro ao editar appointment ${selectedAppointmentHistoryId}:`,
        error
      );
      enqueueSnackbar("Erro ao editar o status do appointment.", {
        variant: "error",
      });
    }
    fetchData();
    handleClose();
  };

  const handleRowSelect = (ids: number[]) => {
    setSelectedAppointmentIds(ids);
  };

  const handleDeleteAppointment = async () => {
    setIsLoading(true);

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
              enqueueSnackbar(`Agendamento apagado com sucesso!`, {
                variant: "success",
              });
              setIsLoading(false);
            } else {
              enqueueSnackbar(
                `Agendamento com id: ${appointmentId} não encontrado.`,
                { variant: "error" }
              );
            }
          } catch (error) {
            console.error(
              `Error deleting appointment ${appointmentId}:`,
              error
            );
          }
        })
      );
      setSelectedAppointmentIds([]);
      fetchData();
    } catch (error) {
      console.error("Error deleting appointments:", error);
    }
  };
  return {
    handleSubmitAppointmentHistoryStatus,
    handleDeleteAppointment,
    handleRowSelect,
  };
};
