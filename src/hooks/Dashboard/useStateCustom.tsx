import { useState } from "react";
import { DecodedToken } from "../../models/DecodedToken";

export const useStateCustom = () => {
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [appointmentCount, setAppointmentCount] = useState<number>(0);
  const [appointmentPercentageCanceled, setAppointmentPercentageCanceled] =
    useState<number>(0);
  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  return {
    amountReceived,
    setAmountReceived,
    appointmentCount,
    setAppointmentCount,
    appointmentPercentageCanceled,
    setAppointmentPercentageCanceled,
    decodedData,
    setDecodedData,
  };
};
