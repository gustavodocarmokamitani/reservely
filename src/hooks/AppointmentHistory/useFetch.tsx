import { useCallback, useEffect, useRef } from "react";
import { Appointment } from "../../models/Appointment";
import { SelectOption } from "../../models/SelectOptions";
import { Service } from "../../models/Service";
import { getAppointmentById, getAppointmentByStoreId } from "../../services/AppointmentServices";
import {
  getAppointmentStatus,
  getAppointmentStatusById,
} from "../../services/AppointmentStatusServices";
import { getEmployeeById } from "../../services/EmployeeServices";
import { getServiceTypeById } from "../../services/ServiceTypeServices";
import { capitalizeFirstLetter } from "../../services/system/globalService";
import { getUserById } from "../../services/UserServices";
import { decodeToken } from "../../services/AuthService";
import { DecodedToken } from "../../models/DecodedToken";

export const useFetch = (
  storeUser: number,
  setSelectableBoxServices: React.Dispatch<React.SetStateAction<Service[]>>,
  setOptions: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setRows: React.Dispatch<React.SetStateAction<Appointment[]>>,
  setDecodedData: React.Dispatch<React.SetStateAction<DecodedToken | null>>,
  setStatusAppointment: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const fetchDataRef = useRef(false);
  const storedToken = localStorage.getItem("authToken");

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (storedToken) {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      }
      const appointmentData = await getAppointmentByStoreId(storeUser);

      const mappedAppointments = await Promise.all(
        appointmentData.map(async (appointment: Appointment) => {
          const employeeData = appointment.employeeId
            ? await getEmployeeById(appointment.employeeId)
            : null;

          const userClientData = appointment.clientId
            ? await getUserById(appointment.clientId)
            : null;

          const userData = employeeData?.userId
            ? await getUserById(employeeData.userId)
            : null;

          const appointmentStatusData = await getAppointmentStatusById(
            appointment.appointmentStatusId
          );

          return {
            ...appointment,
            employeeId: employeeData ? employeeData.id : 0,
            employeeFullName: userData
              ? `${capitalizeFirstLetter(
                  userData.name
                )} ${capitalizeFirstLetter(userData.lastName)}`
              : "N/A",
            clientId: userClientData ? userClientData.name : "Visitante",
            appointmentDate: new Date(appointment.appointmentDate),
            appointmentStatus: appointmentStatusData.name,
          };
        })
      );      

      setRows(mappedAppointments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  }, [setDecodedData, setIsLoading, setRows, storeUser, storedToken]);

  useEffect(() => {
    if (!fetchDataRef.current) {
      fetchData();
      fetchDataRef.current = true;
    }
  }, [fetchData]);

  const fetchAppointmentInfoSelectableBoxServices = async (
    appointmentHistoryId: number
  ) => {
    try {
      let fetchedServices: Service[] = [];

      const userIdArray = appointmentHistoryId;
      if (userIdArray && Array.isArray(userIdArray)) {
        try {
          const serviceRequests = userIdArray.map((id) =>
            getServiceTypeById(id)
          );

          const serviceResponses = await Promise.all(serviceRequests);

          fetchedServices = serviceResponses.map((response) => response?.data);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      }

      const uniqueServices = Array.from(
        new Map(
          fetchedServices.map((service) => [service.id, service])
        ).values()
      );      
      
      setSelectableBoxServices(uniqueServices);
    } catch (error) {
      console.error(
        "Error when searching for employee and service information:",
        error
      );
    }
  };

  const fetchAppointmentHistoryStatus = async (appointmentHistoryId: number) => {
    setIsLoading(true);
    try {
        const responseAppointmentSelectedStatus = await getAppointmentById(appointmentHistoryId);
        setStatusAppointment(responseAppointmentSelectedStatus.appointmentStatusId)        
        
      const responseAppointmenAlltStatus = await getAppointmentStatus();
      const formattedOptions = responseAppointmenAlltStatus.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));

      formattedOptions.unshift({
        value: 0,
        label: "Selecione...",
        isDisabled: true,
      });
      setOptions(formattedOptions);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
    setIsLoading(false);
  };

  return {
    fetchData,
    fetchAppointmentInfoSelectableBoxServices,
    fetchAppointmentHistoryStatus,
  };
};
