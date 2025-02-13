import { useSnackbar } from "notistack";
import { SelectOption } from "../../models/SelectOptions";
import { getCorrigirIdByUserId } from "../../services/EmployeeServices";
import { createAppointment, getValidateAppointment } from "../../services/AppointmentServices";

export const useSubmit = () => {
  const { enqueueSnackbar } = useSnackbar();

  return async (
    employee: SelectOption[],
    client: SelectOption[],
    service: SelectOption[],
    appointmentTime: SelectOption[],
    appointmentDate: Date[],
    storeUser: number,    
  ) => {
    try {
      const selectedEmployee = employee[employee.length - 1];
      const selectedClient = client[client.length - 1];
      const selectedService = service;
      const selectedTime = appointmentTime[appointmentTime.length - 1];
      const selectedDate = appointmentDate[appointmentDate.length - 1];

      const funcionarioId = await getCorrigirIdByUserId(selectedEmployee.value);
      const serviceIds = selectedService.map(item => item.value).join(",");
      const isAvailable = await getValidateAppointment(funcionarioId.id, selectedDate, selectedTime.value.toString(), serviceIds);

      if (!isAvailable) {
        enqueueSnackbar("Este horário já está ocupado.", { variant: "warning" });
        return;
      }

      const newAppointment = {
        id: 0,
        clientId: selectedClient.value,
        employeeId: funcionarioId.id,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime.value.toString(),
        appointmentStatusId: 1,
        serviceIds: selectedService.map(item => item.value),
        storeId: storeUser,
      };

      const response = await createAppointment([newAppointment]);
      if (response) {
        enqueueSnackbar("Agendamento criado com sucesso!", { variant: "success" });
      }
    } catch (error) {
      console.error("Erro ao criar agendamento", error);
      enqueueSnackbar("Erro ao criar agendamento!", { variant: "error" });
    }
  };
};
