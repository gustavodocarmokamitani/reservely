import { useSnackbar } from "notistack";
import { SelectOption } from "../../models/SelectOptions";
import { getCorrigirIdByUserId } from "../../services/EmployeeServices";
import {
  createAppointment,
  getValidateAppointment,
} from "../../services/AppointmentServices";
import { getStoreById } from "../../services/StoreServices";

export const useSubmit = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setEmployee: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setClient: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setService: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setAppointmentTime: React.Dispatch<React.SetStateAction<SelectOption[]>>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return async (
    employee: SelectOption[],
    client: SelectOption[],
    service: SelectOption[],
    appointmentTime: SelectOption[],
    appointmentDate: Date[],
    storeUser: number
  ) => {
    try {
      setIsLoading(true);
      const selectedEmployee = employee[employee.length - 1];
      const selectedClient = client[client.length - 1];
      const selectedService = service;
      const selectedTime = appointmentTime[appointmentTime.length - 1];
      const selectedDate = appointmentDate[appointmentDate.length - 1];

      if (!employee.length) {
        enqueueSnackbar("Por favor, selecione um funcionário.", {
          variant: "warning",
        });
      } else if (!client.length) {
        enqueueSnackbar("Por favor, selecione um cliente.", {
          variant: "warning",
        });
      } else if (!service.length) {
        enqueueSnackbar("Por favor, selecione um serviço.", {
          variant: "warning",
        });
      } else if (!appointmentTime.length) {
        enqueueSnackbar("Por favor, selecione um horário.", {
          variant: "warning",
        });
      } else if (!appointmentDate.length) {
        enqueueSnackbar("Por favor, selecione uma data.", {
          variant: "warning",
        });
      } else {
        return;
      }

      setIsLoading(false);

      const funcionarioId = await getCorrigirIdByUserId(selectedEmployee.value);
      const serviceIds = selectedService.map((item) => item.value).join(",");

      const responseStore = await getStoreById(storeUser);
      if (responseStore.multipleAppointments === false) {
        const isAvailable = await getValidateAppointment(
          funcionarioId.id,
          selectedDate,
          selectedTime.label.toString(),
          serviceIds
        );

        if (!isAvailable) {
          enqueueSnackbar("Este horário já está ocupado.", {
            variant: "warning",
          });
          setIsLoading(false);
          return;
        }
      }

      const newAppointment = {
        id: 0,
        clientId: selectedClient.value,
        employeeId: funcionarioId.id,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime.label.toString(),
        appointmentStatusId: 1,
        googleEventId: "",
        serviceIds: selectedService.map((item) => item.value),
        storeId: storeUser,
      };

      const response = await createAppointment([newAppointment]);
      if (response) {
        enqueueSnackbar("Agendamento criado com sucesso!", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Erro ao criar agendamento", error);
      enqueueSnackbar("Erro ao criar agendamento!", { variant: "error" });
    }
    setEmployee([]);
    setClient([]);
    setService([]);
    setAppointmentTime([]);
    setIsLoading(false);
  };
};
