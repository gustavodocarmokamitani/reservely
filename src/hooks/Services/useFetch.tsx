import { useCallback, useEffect, useRef } from "react";
import { SelectOption } from "../../models/SelectOptions";
import { decodeToken } from "../../services/AuthService";
import {
  getServiceTypeById,
  getServiceTypesByStore,
} from "../../services/ServiceTypeServices";
import { DecodedToken } from "../../models/DecodedToken";
import { ServiceType } from "../../models/ServiceType";
import { Service } from "../../models/Service";

export const useFetch = (
  storeUser: number,
  setOptions: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setDecodedData: React.Dispatch<React.SetStateAction<DecodedToken | null>>,
  setRows: React.Dispatch<React.SetStateAction<ServiceType[]>>,
  setServiceType: React.Dispatch<React.SetStateAction<Service | null>>,
  setFormValuesService: React.Dispatch<React.SetStateAction<Service>>,
  durationMinutes: SelectOption[],
  setDurationMinutes: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const storedToken = localStorage.getItem("authToken");
  const fetchDataRef = useRef(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
  
    if (storedToken) {
      const data = await decodeToken(storedToken);
      setDecodedData(data);
    }
  
    try {
      const serviceData = await getServiceTypesByStore(storeUser);
      setRows(serviceData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  
    setIsLoading(false);
  }, [storedToken, storeUser, setDecodedData, setRows, setIsLoading]);

  useEffect(() => {
    if (!fetchDataRef.current) {
      fetchData();
      fetchDataRef.current = true;
    }
  }, [fetchData]);

  const generateTimes = useCallback(() => {
    const generatedTimes = [];

    for (let hour = 0; hour < 6; hour++) {
      if (hour > 0) {
        generatedTimes.push({
          label: `${String(hour).padStart(2, "0")}:00`,
          value: hour * 60,
        });
      }

      for (let minute = 15; minute < 60; minute += 15) {
        const label =
          hour === 0
            ? `${String(minute).padStart(2, "0")}`
            : `${String(hour).padStart(2, "0")}:${String(minute).padStart(
                2,
                "0"
              )}`;
        const value = hour * 60 + minute;

        generatedTimes.push({ label, value });
      }
    }

    generatedTimes.push({ label: "06:00", value: 360 });

    setOptions(generatedTimes);
    return generatedTimes;
  },[setOptions]);

  const fetchEditService = useCallback(async (serviceId: number) => {
    setIsLoading(true);
    try {
      const response = await getServiceTypeById(serviceId);
  
      if (response) {
        const data = response.data;
        setServiceType(data);
  
        setFormValuesService({
          id: data.id,
          name: data.name,
          description: data.description,
          value: data.value,
          durationMinutes: data.durationMinutes.toString(),
          active: data.active ? "true" : "false",
          storeId: data.storeId,
        });
  
        let generatedTimes: SelectOption[] = generateTimes();
        const selectedTime =
          generatedTimes.find((option) => option.value === data.durationMinutes) || {
            label: "",
            value: 0,
          };
  
        setDurationMinutes([selectedTime]);
  
        setFormValuesService((prevValues) => ({
          ...prevValues,
          durationMinutes: String(selectedTime.value),
        }));
      }
    } catch (error) {
      console.error("Error when fetching service:", error);
    }
    setIsLoading(false);
  }, [generateTimes, setDurationMinutes, setFormValuesService, setServiceType, setIsLoading]); // ✅ Adiciona todas as dependências necessárias 

  return { fetchData, fetchEditService, generateTimes };
};
