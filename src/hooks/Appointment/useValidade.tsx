import { useSnackbar } from "notistack";
import { SelectOption } from "../../models/SelectOptions";

export const useValidate = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    employee: SelectOption[],
    client: SelectOption[],
    service: SelectOption[],
    appointmentTime: SelectOption[],
    appointmentDate: Date[]
  ) => {
    const validationRules = [
      { condition: !employee[employee.length - 1]?.value, message: "Por favor, selecione um funcionário." },
      { condition: !client[client.length - 1]?.label, message: "Por favor, selecione um cliente." },
      { condition: !service?.length, message: "Por favor, selecione pelo menos um serviço." },
      { condition: !appointmentTime[appointmentTime.length - 1].label, message: "Por favor, selecione um horário." },
      { condition: !appointmentDate[appointmentDate.length - 1], message: "Por favor, selecione uma data." },
    ];

    for (const { condition, message } of validationRules) {
      if (condition) {
        enqueueSnackbar(message, { variant: "warning" });
        return false;
      }
    }

    return true;
  };
};
