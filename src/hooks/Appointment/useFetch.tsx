import { useStateCustom } from "./useStateCustom";
import { useEffect, useState } from "react";
import { SelectOption } from "../../models/SelectOptions";
import { ServiceType } from "../../models/ServiceType";
import { Option } from "../../models/Option";
import { Employee as EmployeeModel } from "../../models/Employee";
import { getUserById, getUserTypeIdById } from "../../services/UserServices";
import { getStoreById } from "../../services/StoreServices";
import {
  getEmployeeIdByUserId,
  getEmployees,
} from "../../services/EmployeeServices";
import {
  getServiceTypeById,
  getServiceTypesByStore,
} from "../../services/ServiceTypeServices";
import { capitalizeFirstLetter } from "../../services/system/globalService";

export const useFetch = (
  storeUser: number,
  optionsEmployee: SelectOption[],
  setOptionsEmployee: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  optionsService: SelectOption[],
  setOptionsService: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  optionsClient: SelectOption[],
  setOptionsClient: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  optionsTime: SelectOption[],
  setOptionsTime: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { employee } = useStateCustom();

  useEffect(() => {
    setIsLoading(true);
    const fetchEmployees = async () => {
      try {
        const responseEmployee = await getEmployees();

        const filteredEmployees = responseEmployee.filter(
          (employee: EmployeeModel) =>
            employee.storeId === storeUser && employee.active === "true"
        );

        const filteredWithUserData = await Promise.all(
          filteredEmployees.map(async (employee: EmployeeModel) => {
            const responseUser = await getUserById(employee.userId);
            return {
              ...employee,
              user: responseUser,
            };
          })
        );

        const formattedOptions: Option[] = filteredWithUserData.map(
          (employeeWithUserData: any) => ({
            value: employeeWithUserData.user.id,
            label:
              capitalizeFirstLetter(employeeWithUserData.user.name) +
              " " +
              capitalizeFirstLetter(employeeWithUserData.user.lastName),
            isDisabled: false,
          })
        );

        formattedOptions.unshift({
          value: 0,
          label: "Selecione...",
          isDisabled: true,
        });

        setOptionsEmployee(formattedOptions);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchEmployees();
  }, [storeUser]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServiceTypesByStore(storeUser);

        if (response) {
          const serviceTypesActives = response.filter(
            (serviceType: ServiceType) => serviceType.active === true
          );

          if (employee) {
            try {
              const responseEmployee = await getEmployeeIdByUserId(
                employee[0].value
              );

              if (responseEmployee && responseEmployee.serviceIds) {
                const responseServiceNames = await Promise.all(
                  responseEmployee.serviceIds.map(async (item: any) => {
                    try {
                      const resp = await getServiceTypeById(item);
                      return resp && resp.data ? resp.data : null;
                    } catch (error) {
                      console.error(
                        "Erro ao buscar serviço específico:",
                        error
                      );
                      return null;
                    }
                  })
                );

                const formattedOptions2 = responseServiceNames
                  .filter(Boolean)
                  .map((item: any) => ({
                    value: item.id,
                    label: item.name,
                  }));

                setOptionsService(formattedOptions2);
              } else {
                const formattedOptions = serviceTypesActives.map(
                  (item: any) => ({
                    value: item.id,
                    label: item.name,
                  })
                );

                formattedOptions.unshift({ value: 0, label: "Selecione..." });
                setOptionsService(formattedOptions);
              }
            } catch (error) {
              console.error("Erro ao buscar serviços do funcionário:", error);

              const formattedOptions = serviceTypesActives.map((item: any) => ({
                value: item.id,
                label: item.name,
              }));

              formattedOptions.unshift({ value: 0, label: "Selecione..." });
              setOptionsService(formattedOptions);
            }
          } else {
            const formattedOptions = serviceTypesActives.map((item: any) => ({
              value: item.id,
              label: item.name,
            }));

            formattedOptions.unshift({ value: 0, label: "Selecione..." });
            setOptionsService(formattedOptions);
          }
        } else {
          console.error("Erro ao buscar todos os serviços: resposta inválida.");
        }
      } catch (error) {
        console.error("Erro ao buscar todos os serviços:", error);
      }
    };

    fetchServices();
  }, [employee, storeUser]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await getUserTypeIdById(3);
        const formattedOptions = response.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
        formattedOptions.unshift({
          value: 0,
          label: "Selecione...",
          isDisabled: true,
        });
        formattedOptions.splice(1, 0, {
          value: null,
          label: "Visitante",
          isDisabled: false,
        });
        setOptionsClient(formattedOptions);
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const responseTime = await getStoreById(storeUser);

        const [start, end] = responseTime.operatingHours
          .split(" - ")
          .map((time: string) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
          });

        const generatedTimes = [];
        for (let time = start; time <= end; time += 30) {
          const hours = Math.floor(time / 60)
            .toString()
            .padStart(2, "0");
          const minutes = (time % 60).toString().padStart(2, "0");
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
  }, [storeUser]);

  return {};
};
