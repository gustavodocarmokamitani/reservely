import { useCallback, useContext, useEffect, useRef } from "react";
import {
  getAppointmentByStoreId,
  getAppointmentRevenue,
} from "../../services/AppointmentServices";
import { AppContext } from "../../context/AppContext";
import { decodeToken } from "../../services/AuthService";
import { DecodedToken } from "../../models/DecodedToken";

export const useFetch = (
  storeUser: number,
  setAmountReceived: React.Dispatch<React.SetStateAction<number>>,
  setAppointmentCount: React.Dispatch<React.SetStateAction<number>>,
  setDecodedData: React.Dispatch<React.SetStateAction<DecodedToken | null>>,
  setAppointmentPercentageCanceled: React.Dispatch<React.SetStateAction<number>>
) => {
  const context = useContext(AppContext);
  const authToken = context?.authToken;

  useEffect(() => {
    const fetchDecodedToken = async () => {
      if (authToken) {
        try {
          const decoded = await decodeToken(authToken);
          setDecodedData(decoded);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      }
    };
    fetchDecodedToken();
  }, [authToken]);

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

      const filteredAppointments = responseAppointmentCount.filter(
        (appointment) => appointment.appointmentStatusId === 5
      );

      const totalAppointments = responseAppointmentCount.length;
      const totalAppointmentsAproved = filteredAppointments.length;
      setAppointmentCount(totalAppointmentsAproved);

      const canceledAppointments = responseAppointmentCount.filter(
        (appointment: any) => appointment.appointmentStatusId === 3
      );

      const percentageCanceled =
        totalAppointments > 0
          ? (canceledAppointments.length / totalAppointments) * 100
          : 0;

      setAppointmentPercentageCanceled(percentageCanceled);
    } catch (error) {
      console.error("Erro ao buscar dados de receita:", error);
    }
  }, [
    storeUser,
    setAmountReceived,
    setAppointmentCount,
    setAppointmentPercentageCanceled,
  ]);

  useEffect(() => {
    if (!fetchDataRef.current) {
      fetchData();
      fetchDataRef.current = true;
    }
  }, [fetchData]);

  return {};
};
