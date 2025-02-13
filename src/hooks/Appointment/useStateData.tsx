import { useState } from "react";
import { SelectOption } from "../../models/SelectOptions";

export const useStateData = () => {
  const [employee, setEmployee] = useState<SelectOption[]>([]);
  const [client, setClient] = useState<SelectOption[]>([]);
  const [service, setService] = useState<SelectOption[]>([]);
  const [appointmentTime, setAppointmentTime] = useState<SelectOption[]>([]);
  const [appointmentDate, setAppointmentDate] = useState<Date[]>([]);

  return {
    employee, setEmployee,
    client, setClient,
    service, setService,
    appointmentTime, setAppointmentTime,
    appointmentDate, setAppointmentDate
  };
};
