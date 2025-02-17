import { useEffect, useRef } from "react";
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

  const fetchData = async () => {
    try {
      const responseRevenue = await getAppointmentRevenue(storeUser);

      if (responseRevenue && Array.isArray(responseRevenue)) {
        const totalRevenue = responseRevenue.reduce(
          (acc: number, currentValue: any) => acc + currentValue.totalRevenue,
          0
        );

        setAmountReceived(totalRevenue);

        const responseAppointmentCount = await getAppointmentByStoreId(
          storeUser
        );

        if (
          responseAppointmentCount &&
          Array.isArray(responseAppointmentCount)
        ) {
          const totalAppointments = responseAppointmentCount.length;
          setAppointmentCount(totalAppointments);

          const canceledAppointments = responseAppointmentCount.filter(
            (appointment: any) => appointment.appointmentStatusId === 3
          );

          const percentageCanceled =
            (canceledAppointments.length / totalAppointments) * 100;
          console.log(percentageCanceled);

          setAppointmentPercentageCanceled(percentageCanceled);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados de receita:", error);
    }
  };

  useEffect(() => {
    if (!fetchDataRef.current) {
      fetchData();
      fetchDataRef.current = true;
    }
  }, [fetchData]);

  return {};
};
