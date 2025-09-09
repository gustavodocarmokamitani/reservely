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

  const handleSubmitAppointmentHistoryStatus = async (statusType: number) => {
    setIsLoading(true);

    try {
      const response = await getAppointmentById(selectedAppointmentHistoryId);
      const formattedDate =
        appointmentDate.length > 0
          ? new Date(appointmentDate[appointmentDate.length - 1]).toISOString()
          : null;

      const selectedDate = appointmentDate[appointmentDate.length - 1];

      if (statusType === 4) {
        const responseStore = await getStoreById(storeUser);
        if (responseStore.multipleAppointments === false) {
          const selectedTime = (appointmentTime.length > 0 && appointmentTime[appointmentTime.length - 1]?.label)
            ? appointmentTime[appointmentTime.length - 1].label
            : response.appointmentTime;
          const isAvailable = await getValidateAppointment(
            response.employeeId,
            selectedDate,
            selectedTime,
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
      }

      const mappedAppointment: Appointment =
        statusType !== 4
          ? {
              ...response,
              id: selectedAppointmentHistoryId,
              appointmentDate: response.appointmentDate,
              appointmentTime: response.appointmentTime,
              appointmentStatusId: statusType,
              storeId: Number(storeUser),
            }
          : {
              ...response,
              id: selectedAppointmentHistoryId,
              appointmentDate: formattedDate,
              appointmentTime:
                appointmentTime.length > 0 &&
                appointmentTime[appointmentTime.length - 1]?.label
                  ? appointmentTime[appointmentTime.length - 1].label
                  : response.appointmentTime,
              appointmentStatusId: statusType,
              storeId: Number(storeUser),
            };

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
