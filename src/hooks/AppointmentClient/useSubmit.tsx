import { useSnackbar } from "notistack";
import { SelectOption } from "../../models/SelectOptions";
import { getCorrigirIdByUserId } from "../../services/EmployeeServices";
import {
  createAppointment,
  getValidateAppointment,
} from "../../services/AppointmentServices";
import {
  getStoreById,
  getStoreByStoreCode,
} from "../../services/StoreServices";
import { DecodedToken } from "../../models/DecodedToken";

export const useSubmit = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedService: React.Dispatch<React.SetStateAction<number | null>>,
  setSelectedProfessional: React.Dispatch<React.SetStateAction<number[]>>,
  setSelectedTime: React.Dispatch<
    React.SetStateAction<{ date: string; time: string } | null>
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return async (
    selectedService: number,
    selectedProfessional: number[],
    selectedTime: { date: string; time: string },
    storeCode: string,
    decodedData: DecodedToken
  ) => {
    try {
      setIsLoading(true);
      let shouldProceed = true;
      if (!selectedProfessional.length) {
        enqueueSnackbar("Por favor, selecione um funcionário.", {
          variant: "warning",
        });
        shouldProceed = false;
      } else if (selectedService === 0) {
        enqueueSnackbar("Por favor, selecione um serviço.", {
          variant: "warning",
        });

        shouldProceed = true;
      } else if (selectedTime.date === "" && selectedTime.time === "") {
        enqueueSnackbar("Por favor, selecione um horário.", {
          variant: "warning",
        });

        shouldProceed = true;
      }
      if (!shouldProceed) {
        setIsLoading(false);
        return;
      }
      let storeUser;

      const formattedStoreCode = storeCode.toUpperCase().replace("_", "#");
      const responseStoreCode = await getStoreByStoreCode(formattedStoreCode);
      if (responseStoreCode) {
        storeUser = responseStoreCode.id;
      }

      const newAppointment = {
        id: 0,
        clientId: Number(decodedData.userId),
        employeeId: selectedProfessional[0],
        appointmentDate: new Date(`${selectedTime.date}T03:00:00Z`),
        appointmentTime: selectedTime.time,
        appointmentStatusId: 1,
        googleEventId: "",
        serviceIds: [selectedService],
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

    setSelectedService(null);
    setSelectedProfessional([]);
    setSelectedTime({ date: "", time: "" });

    window.location.reload();
    setIsLoading(false);
  };
};
