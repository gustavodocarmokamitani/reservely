import { useCallback, useEffect, useRef } from "react";
import { Appointment } from "../../models/Appointment";
import { SelectOption } from "../../models/SelectOptions";
import { Service } from "../../models/Service";
import {
  getAppointmentById,
    getAppointmentByStoreId,
} from "../../services/AppointmentServices";
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
import {
    getStoreById,
    getStoreByStoreCode,
} from "../../services/StoreServices";

export const useFetch = (
    storeCode: string,
    storeUser: number,
    setSelectableBoxServices: React.Dispatch<React.SetStateAction<Service[]>>,
    setOptions: React.Dispatch<React.SetStateAction<SelectOption[]>>,
    setRows: React.Dispatch<React.SetStateAction<Appointment[]>>,
    setDecodedData: React.Dispatch<React.SetStateAction<DecodedToken | null>>,
    setStatusAppointment: React.Dispatch<React.SetStateAction<SelectOption[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setOptionsTime: React.Dispatch<React.SetStateAction<SelectOption[]>>,
    setClosedDates: React.Dispatch<React.SetStateAction<string[]>>,
    setOperatingDays: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const fetchDataRef = useRef(false);
    const storedToken = localStorage.getItem("authToken");

    const fetchData = useCallback(async () => {
        let decoded: DecodedToken | null = null;
        try {
            setIsLoading(true);

            // 1. Decodificar o Token e salvar os dados
            if (storedToken) {
                decoded = await decodeToken(storedToken);
                setDecodedData(decoded);
            }

            // 2. Buscar todos os agendamentos da loja
            const response = await getAppointmentByStoreId(storeUser);
            let appointmentData = response;

            // 3. FILTRO CONDICIONAL PARA EMPLOYEE
            if (decoded && decoded.userRole === "Employee") {
                const employeeId = decoded.userId; // Assumindo que employeeId está no token

                if (employeeId) {
                    appointmentData = response.filter(
                        (appointment: Appointment) => appointment.employeeId === parseFloat(employeeId)
                    );
                } else {
                    // Caso o token diga que é Employee, mas falte o employeeId
                    console.warn("User is an Employee but employeeId is missing. Showing no appointments.");
                    appointmentData = [];
                }
            }
            // FIM DO FILTRO

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
                            : "Removido",
                        clientId: userClientData
                            ? userClientData.name + " " + userClientData.lastName
                            : "Visitante",
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
    }, [setDecodedData, setIsLoading, setRows, storeUser, storedToken]); // Dependências mantidas

    useEffect(() => {
        if (!fetchDataRef.current) {
            fetchData();
            fetchDataRef.current = true;
        }
    }, [fetchData]);

    // ... (O restante das funções e useEffects permanecem inalterados)
    
    // ... (Função fetchWorkingDatesStore, fetchAppointmentInfoSelectableBoxServices, fetchAppointmentHistoryStatus, e fetchTime)

    useEffect(() => {
        const fetchWorkingDatesStore = async () => {
            try {
                if (storeCode === ":" || storeCode === "") {
                    const response = await getStoreById(storeUser);
                    setClosedDates(response?.closingDays);
                    setOperatingDays(response?.operatingDays);
                } else {
                    const formattedStoreCode = storeCode.toUpperCase().replace("_", "#");
                    const responseStoreCode = await getStoreByStoreCode(
                        formattedStoreCode
                    );
                    setClosedDates(responseStoreCode?.closingDays);
                    setOperatingDays(responseStoreCode?.operatingDays);
                }
            } catch (error) {
                console.error("Error fetching client:", error);
            }
        };

        fetchWorkingDatesStore();
    }, [setClosedDates, setOperatingDays, storeUser]);


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

    const fetchAppointmentHistoryStatus = async (
        appointmentHistoryId: number
    ) => {
        setIsLoading(true);
        try {
            const responseAppointmentSelectedStatus = await getAppointmentById(
                appointmentHistoryId
            );
            setStatusAppointment(
                responseAppointmentSelectedStatus.appointmentStatusId
            );

            const responseAppointmentAllStatus = await getAppointmentStatus();
            const formattedOptions = responseAppointmentAllStatus.map(
                (item: any) => ({
                    value: item.id,
                    label: item.name,
                })
            );

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

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const responseTime = await getStoreById(storeUser);

                const times = responseTime.operatingHours.includes(" - ")
                    ? responseTime.operatingHours.split(" - ")
                    : [responseTime.operatingHours, responseTime.operatingHours];

                const [start, end] = times.map((time: string) => {
                    const [hours, minutes] = time.split(":").map(Number);
                    return hours * 60 + minutes;
                });

                let adjustedEnd = end;
                if (end < start) {
                    adjustedEnd += 1440; // 24h em minutos
                }

                const generatedTimes = [];
                for (let time = start; time <= adjustedEnd; time += 30) {
                    const normalizedTime = time % 1440; // volta para 00:00 após meia-noite
                    const hours = Math.floor(normalizedTime / 60)
                        .toString()
                        .padStart(2, "0");
                    const minutes = (normalizedTime % 60).toString().padStart(2, "0");
                    generatedTimes.push(`${hours}:${minutes}`);
                }

                setOptionsTime([
                    { value: 0, label: "Selecione..." },
                    ...generatedTimes.map((time, index) => ({
                        value: index + 1,
                        label: time,
                    })),
                ]);
            } catch (error) {
                console.error("Erro ao buscar dados da store:", error);
            }
        };

        fetchTime();
    }, [storeUser, setOptionsTime]);


    return {
        fetchData,
        fetchAppointmentInfoSelectableBoxServices,
        fetchAppointmentHistoryStatus,
    };
};