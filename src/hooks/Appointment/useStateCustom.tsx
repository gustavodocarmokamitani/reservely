import { useState } from "react";
import { SelectOption } from "../../models/SelectOptions";

export const useStateCustom = () => {
  const [employee, setEmployee] = useState<SelectOption[]>([]);
  const [client, setClient] = useState<SelectOption[]>([]);
  const [service, setService] = useState<SelectOption[]>([]);
  const [appointmentTime, setAppointmentTime] = useState<SelectOption[]>([]);
  const [appointmentDate, setAppointmentDate] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [optionsEmployee, setOptionsEmployee] = useState<SelectOption[]>([]);
  const [optionsService, setOptionsService] = useState<SelectOption[]>([]);
  const [optionsClient, setOptionsClient] = useState<SelectOption[]>([]);
  const [optionsTime, setOptionsTime] = useState<SelectOption[]>([]);

  return {
    employee,
    setEmployee,
    client,
    setClient,
    service,
    setService,
    appointmentTime,
    setAppointmentTime,
    appointmentDate,
    setAppointmentDate,
    isLoading,
    setIsLoading,
    optionsEmployee,
    setOptionsEmployee,
    optionsService,
    setOptionsService,
    optionsClient,
    setOptionsClient,
    optionsTime,
    setOptionsTime,
  };
};
