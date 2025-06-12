import { useContext, useEffect } from "react";
import { Appointment } from "../../models/Appointment";
import { ServiceType } from "../../models/ServiceType";
import { Store } from "../../models/Store";
import { User } from "../../models/User";
import { getAppointmentByStoreId } from "../../services/AppointmentServices";
import { getServiceTypeById } from "../../services/ServiceTypeServices";
import { getStoreByStoreCode } from "../../services/StoreServices";
import { getUserByUseTypeStore } from "../../services/UserServices";
import { AppContext } from "../../context/AppContext";
import { decodeToken } from "../../services/AuthService";
import { DecodedToken } from "../../models/DecodedToken";

export const useFetch = (
  storeCode: string,
  setStoreData: React.Dispatch<React.SetStateAction<Store | undefined>>,
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType[]>>,
  setProfessionalData: React.Dispatch<React.SetStateAction<User[] | undefined>>,
  setAppointmentData: React.Dispatch<
    React.SetStateAction<Record<string, Appointment[]>>
  >,
  setDecodedData: React.Dispatch<React.SetStateAction<DecodedToken | null>>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedStoreCode = storeCode.toUpperCase().replace("_", "#");
        const responseStore = await getStoreByStoreCode(formattedStoreCode);
        setStoreData(responseStore);

        const servicePromises = responseStore.ServiceIds.map((id: any) =>
          getServiceTypeById(id)
        );
        const responseServices = await Promise.all(servicePromises);
        const allServiceData = responseServices
          .map((res) => res?.data)
          .filter((service) => service?.active === true);

        setServiceData(allServiceData);

        const responseProfessional = await getUserByUseTypeStore(2, 1);

        setProfessionalData(responseProfessional);

        const responseAppointment = await getAppointmentByStoreId(1);

        const appointmentByDate = responseAppointment.reduce(
          (acc: any, appointment: Appointment) => {
            const dateKey = new Date(appointment.appointmentDate)
              .toISOString()
              .split("T")[0];
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(appointment);
            return acc;
          },
          {} as Record<string, typeof responseAppointment>
        );

        setAppointmentData(appointmentByDate);
      } catch (error) {
        console.error("Erro ao buscar dados da loja:", error);
      }
    };
    fetchData();
  }, [storeCode]);

  return {};
};
