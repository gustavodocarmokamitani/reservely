import { useCallback, useEffect, useRef } from "react";
import {
  getAppointmentByStoreId,
  getAppointmentRevenue,
} from "../../services/AppointmentServices";

export const useFetch = (
  storeUser: number,
  setAmountReceived: React.Dispatch<React.SetStateAction<number>>,
  setAppointmentCount: React.Dispatch<React.SetStateAction<number>>,
  setAppointmentPercentageCanceled: React.Dispatch<React.SetStateAction<number>>
) => {
  const fetchDataRef = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      const responseRevenue = await getAppointmentRevenue(storeUser);
  
      if (!Array.isArray(responseRevenue)) return;
  
      const totalRevenue = responseRevenue.reduce(
        (acc: number, currentValue: any) => acc + currentValue.totalRevenue,
        0
      );
  
      setAmountReceived(totalRevenue);
  
      const responseAppointmentCount = await getAppointmentByStoreId(storeUser);
  
      if (!Array.isArray(responseAppointmentCount)) return;
  
      const totalAppointments = responseAppointmentCount.length;
      setAppointmentCount(totalAppointments);
  
      const canceledAppointments = responseAppointmentCount.filter(
        (appointment: any) => appointment.appointmentStatusId === 3
      );
  
      const percentageCanceled =
        totalAppointments > 0
          ? (canceledAppointments.length / totalAppointments) * 100
          : 0;
  
      console.log(percentageCanceled);
      setAppointmentPercentageCanceled(percentageCanceled);
    } catch (error) {
      console.error("Erro ao buscar dados de receita:", error);
    }
  }, [storeUser, setAmountReceived, setAppointmentCount, setAppointmentPercentageCanceled]); // ✅ Dependências corretas
  
  useEffect(() => {
    if (!fetchDataRef.current) {
      fetchData();
      fetchDataRef.current = true;
    }
  }, [fetchData]);

  return {};
};
