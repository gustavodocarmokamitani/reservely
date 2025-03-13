import { useState } from "react";
import { SelectOption } from "../../models/SelectOptions";
import { Store } from "../../models/Store";
import { DecodedToken } from "../../models/DecodedToken";

export const useStateCustom = () => {
  const [storeData, setStoreData] = useState<Store>();
  const [employee, setEmployee] = useState<SelectOption[]>([]);
  const [client, setClient] = useState<SelectOption[]>([]);
  const [service, setService] = useState<SelectOption[]>([]);
  const [store, setStore] = useState<SelectOption[]>([]);
  const [appointmentTime, setAppointmentTime] = useState<SelectOption[]>([]);
  const [appointmentDate, setAppointmentDate] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [optionsEmployee, setOptionsEmployee] = useState<SelectOption[]>([]);
  const [optionsService, setOptionsService] = useState<SelectOption[]>([]);
  const [optionsClient, setOptionsClient] = useState<SelectOption[]>([]);
  const [optionsTime, setOptionsTime] = useState<SelectOption[]>([]);
  const [optionsStore, setOptionsStore] = useState<SelectOption[]>([]);
  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);

  return {
    storeData,
    setStoreData,
    employee,
    setEmployee,
    client,
    setClient,
    service,
    setService,
    store,
    setStore,
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
    optionsStore,
    setOptionsStore,
    decodedData,
    setDecodedData,
  };
};
