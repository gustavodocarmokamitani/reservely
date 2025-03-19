import { useState } from "react";
import { Store } from "../../models/Store";
import { SelectOption } from "../../models/SelectOptions";

export const useStateCustom = () => {
  const [formValuesStore, setFormValuesStore] = useState<{
    name: string;
    active: boolean;
    multipleAppointments: boolean;
  }>({
    name: "",
    active: false,
    multipleAppointments: false,
  });
  const [store, setStore] = useState<Store | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [openingWeekDay, setOpeningWeekDay] = useState<string[]>([]);
  const [closingDates, setClosingDates] = useState<Date[] | null>([]);
  const [statusStore, setStatusStore] = useState<boolean>(false);
  const [multipleAppointments, setMultipleAppointments] =
    useState<boolean>(false);
  const [optionsTime, setOptionsTime] = useState<SelectOption[]>([]);
  const [selectedTimesSelect, setSelectedTimesSelect] = useState<
    SelectOption[]
  >([]);
  const [openingWeekDaySelect, setOpeningWeekDaySelect] = useState<
    SelectOption[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [optionsWeekDay] = useState([
    {
      value: 1,
      label: "Segunda",
    },
    {
      value: 2,
      label: "Terça",
    },
    {
      value: 3,
      label: "Quarta",
    },
    {
      value: 4,
      label: "Quinta",
    },
    {
      value: 5,
      label: "Sexta",
    },
    {
      value: 6,
      label: "Sábado",
    },
    {
      value: 7,
      label: "Domingo",
    },
  ]);

  return {
    formValuesStore,
    setFormValuesStore,
    store,
    setStore,
    selectedTimes,
    setSelectedTimes,
    selectedTimesSelect,
    setSelectedTimesSelect,
    openingWeekDay,
    setOpeningWeekDay,
    openingWeekDaySelect,
    setOpeningWeekDaySelect,
    closingDates,
    setClosingDates,
    statusStore,
    setStatusStore,
    multipleAppointments,
    setMultipleAppointments,
    optionsTime,
    setOptionsTime,
    isLoading,
    setIsLoading,
    optionsWeekDay,
  };
};
