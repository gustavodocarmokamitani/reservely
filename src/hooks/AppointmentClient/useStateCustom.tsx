import { useState } from "react";
import { Appointment } from "../../models/Appointment";
import { Store } from "../../models/Store";
import { ServiceType } from "../../models/ServiceType";
import { User } from "../../models/User";
import { DecodedToken } from "../../models/DecodedToken";

export const useStateCustom = () => {
  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleServiceCount, setVisibleServiceCount] = useState(5);
  const [storeData, setStoreData] = useState<Store>();
  const [serviceData, setServiceData] = useState<ServiceType[]>([]);
  const [professionalData, setProfessionalData] = useState<User[]>();
  const [appointmentData, setAppointmentData] = useState<
    Record<string, Appointment[]>
  >({});
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<number[]>(
    []
  );
  const [filteredEmployees, setFilteredEmployees] = useState<User[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<{
    date: string;
    time: string;
  } | null>(null);

  return {
    decodedData,
    setDecodedData,
    isLoading,
    setIsLoading,
    visibleServiceCount,
    setVisibleServiceCount,
    storeData,
    setStoreData,
    serviceData,
    setServiceData,
    professionalData,
    setProfessionalData,
    appointmentData,
    setAppointmentData,
    selectedService,
    setSelectedService,
    selectedProfessional,
    setSelectedProfessional,
    filteredEmployees,
    setFilteredEmployees,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
  };
};
