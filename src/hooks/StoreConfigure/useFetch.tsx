import { useCallback, useEffect, useRef } from "react";
import { getStoreById } from "../../services/StoreServices";
import { Store } from "../../models/Store";

export const useFetch = (
  storeUser: number,
  setStore: React.Dispatch<React.SetStateAction<Store | null>>,
  setFormValuesStore: React.Dispatch<
    React.SetStateAction<{
      name: string;
      storeCode: string;
      active: boolean;
      multipleAppointments: boolean;
    }>
  >,
  setStatusStore: React.Dispatch<React.SetStateAction<boolean>>,
  setMultipleAppointments: React.Dispatch<React.SetStateAction<boolean>>,
  selectedTimes: string[],
  setSelectedTimes: React.Dispatch<React.SetStateAction<string[]>>,
  openingWeekDay: string[],
  setOpeningWeekDay: React.Dispatch<React.SetStateAction<string[]>>,
  closingDates: Date[] | null,
  setClosingDates: React.Dispatch<React.SetStateAction<Date[] | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const fetchDataRef = useRef(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getStoreById(storeUser);
      if (response) {
        setStore(response);
        
        setFormValuesStore((prev) => ({
          ...prev,
          name: response.name,
          storeCode: response.storeCode,
          active: response.status,
          multipleAppointments: response.multipleAppointments,
        }));

        setStatusStore(response.status);
        setMultipleAppointments(response.multipleAppointments);

        if (selectedTimes.length === 0 && response.operatingHours) {
          const timeArray = response.operatingHours.split(" - ");
          setSelectedTimes(timeArray);
        }

        if (!openingWeekDay || openingWeekDay.length === 0) {
          const OpeningWeekDayArray = response.operatingDays
            ? response.operatingDays
            : [];
          setOpeningWeekDay(OpeningWeekDayArray);
        }

        if (!closingDates || closingDates.length === 0) {
          const ClosingDatesArray = response.closingDays
            ? response.closingDays
                .map((data: string) => {
                  const date = new Date(data);
                  return isNaN(date.getTime()) ? null : date;
                })
                .filter((date: any) => date !== null)
            : [];

          setClosingDates(
            ClosingDatesArray.sort(
              (a: Date, b: Date) => a.getTime() - b.getTime()
            )
          );
        }
      }
    } catch (error) {
      console.error("Erro na requisição da store", error);
    }
    setIsLoading(false);
  }, [
    storeUser,
    setStore,
    setFormValuesStore,
    setStatusStore,
    setMultipleAppointments,
    selectedTimes,
    setSelectedTimes,
    openingWeekDay,
    setOpeningWeekDay,
    closingDates,
    setClosingDates,
    setIsLoading,
  ]);

  useEffect(() => {
    if (!fetchDataRef.current) {
      fetchData();
      fetchDataRef.current = true;
    }
  }, [fetchData]);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
        const time = `${formattedHour}:${formattedMinute}`;
        times.push({ value: parseFloat(time), label: time });
      }
    }
    return times;
  };

  return { generateTimeOptions };
};
