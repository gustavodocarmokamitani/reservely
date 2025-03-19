import { useSnackbar } from "notistack";
import { SelectOption } from "../../models/SelectOptions";
import { getCorrigirIdByUserId } from "../../services/EmployeeServices";
import {
  createAppointment,
  getValidateAppointment,
} from "../../services/AppointmentServices";
import { DecodedToken } from "../../models/DecodedToken";
import { Store } from "../../models/Store";
import { useNavigate } from "react-router-dom";
import { getStoreById } from "../../services/StoreServices";

export const useSubmitClient = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setEmployee: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setClient: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setService: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setAppointmentTime: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  decodedData: DecodedToken | null,
  storeData: Store | undefined,
  store: SelectOption[]
) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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

      const funcionarioId = await getCorrigirIdByUserId(selectedEmployee.value);
      const serviceIds = selectedService.map((item) => item.value).join(",");

      const responseStore = await getStoreById(
        storeData ? storeData?.id : store?.[store.length - 1].value
      );

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
        clientId: Number(decodedData?.userId),
        employeeId: funcionarioId.id,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime.label.toString(),
        appointmentStatusId: 1,
        googleEventId: "",
        serviceIds: selectedService.map((item) => item.value),
        storeId: storeData ? storeData?.id : store?.[store.length - 1].value,
      };

      const response = await createAppointment([newAppointment]);
      if (response) {
        enqueueSnackbar("Agendamento criado com sucesso!", {
          variant: "success",
        });
        navigate("/home-client/:");
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
