import { useState } from "react";

export const useStateCustom = () => {
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [appointmentCount, setAppointmentCount] = useState<number>(0);
  const [appointmentPercentageCanceled, setAppointmentPercentageCanceled] =
    useState<number>(0);

  return {
    amountReceived,
    setAmountReceived,
    appointmentCount,
    setAppointmentCount,
    appointmentPercentageCanceled,
    setAppointmentPercentageCanceled,
  };
};
