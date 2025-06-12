import { useStateCustom } from "./useStateCustom";
import { useContext, useEffect } from "react";
import { SelectOption } from "../../models/SelectOptions";
import { ServiceType } from "../../models/ServiceType";
import { Option } from "../../models/Option";
import { Employee as EmployeeModel } from "../../models/Employee";
import { getUserById, getUserTypeIdById } from "../../services/UserServices";
import {
  getStoreById,
  getStoreByStoreCode,
  getStores,
} from "../../services/StoreServices";
import {
  getEmployeeIdByUserId,
  getEmployees,
  getEmployeesByStoreId,
} from "../../services/EmployeeServices";
import {
  getServiceTypeById,
  getServiceTypesByStore,
} from "../../services/ServiceTypeServices";
import { capitalizeFirstLetter } from "../../services/system/globalService";
import { Store } from "../../models/Store";
import { DecodedToken } from "../../models/DecodedToken";
import { AppContext } from "../../context/AppContext";
import { decodeToken } from "../../services/AuthService";

export const useFetch = (
  storeCode: string,
  storeUser: number,
  store: SelectOption[],
  employee: SelectOption[],
  setStoreData: React.Dispatch<React.SetStateAction<Store | undefined>>,
  setOptionsEmployee: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setOptionsService: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setOptionsClient: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setOptionsTime: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setOptionsStore: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDecodedData: React.Dispatch<React.SetStateAction<DecodedToken | null>>,
  setClosedDates: React.Dispatch<React.SetStateAction<string[]>>,
  setOperatingDays: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const context = useContext(AppContext);
  const authToken = context?.authToken;
  useEffect(() => {
    const fetchStoreData = async () => {
      const formattedStoreCode = storeCode.toUpperCase().replace("_", "#");
      const response = await getStoreByStoreCode(formattedStoreCode);
      setStoreData(response);
    };
    fetchStoreData();
  }, [storeCode]);

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
    setIsLoading(true);
    const fetchEmployees = async () => {
      try {
        if (storeCode !== ":") {
          const formattedStoreCode = storeCode.toUpperCase().replace("_", "#");
          const responseStoreCode = await getStoreByStoreCode(
            formattedStoreCode
          );
          if (responseStoreCode) {
            storeUser = responseStoreCode.id;
          }
        } else {
          storeUser = store[0]?.value;
        }

        const responseEmployee = await getEmployeesByStoreId(storeUser);

        const filteredEmployees = responseEmployee.filter(
          (employee: EmployeeModel) => employee.active === "true"
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
  }, [storeUser, store, setIsLoading, setOptionsEmployee]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const formattedStoreCode = storeCode.toUpperCase().replace("_", "#");
        const responseStoreCode = await getStoreByStoreCode(formattedStoreCode);
        if (responseStoreCode) {
          storeUser = responseStoreCode.id;
        }
        const response = await getServiceTypesByStore(
          storeUser !== 0 ? storeUser : store[store.length - 1].value
        );

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
                      if (resp && resp.data && resp.data.active === true) {
                        return resp.data;
                      }
                      return null;
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

              formattedOptions.unshift({
                value: 0,
                label: "Selecione...",
                isDisabled: true,
              });
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
  }, [employee, storeUser, store, setOptionsService]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await getUserTypeIdById(99); // fix
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
  }, [setOptionsClient]);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await getStores();
        const formattedOptions = response.map((item: any) => ({
          value: item.id,
          label: item.name + " " + item.storeCode.match(/#\d+/)[0],
        }));
        formattedOptions.unshift({
          value: 0,
          label: "Selecione...",
          isDisabled: true,
        });
        setOptionsStore(formattedOptions);
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };

    fetchStore();
  }, [setOptionsStore]);

  useEffect(() => {
    const fetchWorkingDatesStore = async () => {
      try {
        if (storeCode === ":" || storeCode === "") {
          const response = await getStoreById(
            storeUser !== 0 ? storeUser : store[0].value
          );
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
  }, [setClosedDates, setOperatingDays, storeUser, store]);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const responseStoreCode = await getStoreByStoreCode(storeCode);
        if (responseStoreCode) {
          storeUser = responseStoreCode.id;
        }

        const responseTime = await getStoreById(
          storeUser !== 0 ? storeUser : store[store.length - 1].value
        );

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
  }, [storeUser, store, setOptionsTime]);

  return {};
};
