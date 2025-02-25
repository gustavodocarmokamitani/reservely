import { useCallback, useEffect, useRef } from "react";
import { decodeToken } from "../../services/AuthService";
import {
  getUserById,
  getUserByUseTypeStore,
} from "../../services/UserServices";
import { capitalizeFirstLetter } from "../../services/system/globalService";
import { Employee } from "../../models/Employee";
import { User } from "../../models/User";
import { Option } from "../../models/Option";
import { DecodedToken } from "../../models/DecodedToken";
import {
  getEmployeeIdByUserId,
  getEmployeesByStoreId,
} from "../../services/EmployeeServices";
import { Service } from "../../models/Service";
import { getServices } from "../../services/ServiceServices";
import {
  getServiceTypeById,
  getServiceTypesByStore,
} from "../../services/ServiceTypeServices";
import { UserEmployee } from "../../models/UserEmployee";

interface Rows {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  services: number[];
  active: boolean;
  storeId: number;
}

interface CombinedData extends Employee, User {}

export const useFetch = (
  storeUser: number,
  setDecodedData: React.Dispatch<React.SetStateAction<DecodedToken | null>>,
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>,
  setSelectableBoxServices: React.Dispatch<React.SetStateAction<Service[]>>,
  setCombinedData: React.Dispatch<React.SetStateAction<CombinedData | null>>,
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>,
  setRows: React.Dispatch<React.SetStateAction<Rows[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const storedToken = localStorage.getItem("authToken");

  const fetchDataRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (storedToken) {
      try {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
      }
    }
  
    setIsLoading(true);
  
    try {
      const usersData = await getUserByUseTypeStore(2, storeUser);
      const employeesData = await getEmployeesByStoreId(storeUser);
  
      const mappedRows: Rows[] = employeesData
        .map((employee: Employee) => {
          const user = usersData.find((u: any) => u.id === employee.userId);
  
          if (user) {
            return {
              id: user.id,
              name: capitalizeFirstLetter(user.name),
              lastName: capitalizeFirstLetter(user.lastName),
              phone: user.phone,
              email: user.email,
              active: employee.active,
              services: employee.serviceIds || [],
              storeId: user.storeId,
            };
          }
          return null;
        })
        .filter(Boolean) as Rows[];
  
      setRows(mappedRows);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  
    setIsLoading(false);
  }, [storedToken, storeUser, setDecodedData, setIsLoading, setRows]);   

  useEffect(() => {
    if (!fetchDataRef.current) {
      fetchData();      
      fetchDataRef.current = true;
    }
  }, [fetchData]);

  const fetchLoadDataAddEmployee = async () => {
    setIsLoading(true);
    try {
      const responseEmployee = await getUserByUseTypeStore(2, storeUser);
      const response = await getEmployeesByStoreId(storeUser);

      const filteredResponseEmployee = responseEmployee.filter(
        (emp: any) => !response.some((res: any) => res.userId === emp.id)
      );

      const formattedOptions: Option[] = filteredResponseEmployee.map(
        (employee: User) => ({
          value: employee.id,
          label:
            capitalizeFirstLetter(employee.name) +
            " " +
            capitalizeFirstLetter(employee.lastName),
          isDisabled: false,
        })
      );

      formattedOptions.unshift({
        value: 0,
        label: "Selecione...",
        isDisabled: true,
      });

      setOptions(formattedOptions);

      let fetchedServices: Service[] = [];
      const serviceData = await getServices();

      if (serviceData) {
        const filteredData = serviceData.filter(
          (servico: any) => servico.storeId === storeUser
        );

        const serviceTypePromises = filteredData.map(async (servico: any) => {
          try {
            const serviceTypeData = await getServiceTypeById(
              servico.serviceTypeId
            );
            return serviceTypeData?.data || [];
          } catch (error) {
            console.error(
              `Error when searching for the type of service for the id ${servico.serviceTypeId}:`,
              error
            );
            return [];
          }
        });

        const serviceTypeData = await Promise.all(serviceTypePromises);
        fetchedServices = [...fetchedServices, ...serviceTypeData.flat()];
      }

      const uniqueServices = Array.from(
        new Map(
          fetchedServices.map((service) => [service.id, service])
        ).values()
      );
      setSelectableBoxServices(uniqueServices);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
    setIsLoading(false);
  };

  const fetchLoadDataEditEmployee = async (selectedEmployeeId: number) => {
    setIsLoading(true);
    try {
      let fetchedServices: Service[] = [];

      const allServices = await getServiceTypesByStore(storeUser);

      fetchedServices = [...fetchedServices, ...allServices];

      const uniqueServices = Array.from(
        new Map(
          fetchedServices.map((service) => [service.id, service])
        ).values()
      );
      setSelectableBoxServices(uniqueServices);

      try {
        const resEmployee = await getEmployeeIdByUserId(selectedEmployeeId!);

        let employeeData = Array.isArray(resEmployee)
          ? resEmployee
          : [resEmployee];

        const mappedEmployee = employeeData.map((employee: UserEmployee) => ({
          id: employee.id,
          userId: employee.userId,
          name: employee.name,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          password: employee.password,
          active: employee.active,
          userTypeId: employee.userTypeId,
          serviceIds: employee.serviceIds || [],
          storeId: employee.storeId,
        }));

        if (mappedEmployee.length > 0) {
          const resUser = await getUserById(mappedEmployee[0].userId);

          let userData = Array.isArray(resUser) ? resUser : [resUser];

          const mappedUser = userData.map((user: User) => ({
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            password: user.password,
            userTypeId: user.userTypeId,
            storeId: storeUser,
          }));

          const combined = {
            ...mappedEmployee[0],
            ...mappedUser[0],
          };
          setSelectedServices(combined.serviceIds);
          setCombinedData(combined);
        }
      } catch (error) {
        console.error("Error when fetching service type", error);
      }
    } catch (error) {
      console.error(
        "Error when searching for employee and service information:",
        error
      );
    }
    setIsLoading(false);
  };

  const fetchLoadEditFormValues = (
    employeeSelected: CombinedData[],
    setFormValuesProfessional: React.Dispatch<
      React.SetStateAction<UserEmployee>
    >
  ) => {
    setIsLoading(true);
    if (employeeSelected?.[0]) {
      const newState = {
        id: employeeSelected[0].id,
        userId: employeeSelected[0].userId,
        name: employeeSelected[0].name,
        lastName: employeeSelected[0].lastName,
        email: employeeSelected[0].email,
        phone: employeeSelected[0].phone,
        active: employeeSelected[0].active,
        userTypeId: employeeSelected[0].userTypeId,
        password: employeeSelected[0].password,
        serviceIds: employeeSelected[0].serviceIds,
        storeId: employeeSelected[0].storeId,
      };

      setFormValuesProfessional?.((prevState) => {
        if (newState.id !== prevState.id) {
          return newState;
        }
        return prevState;
      });
    }
    setIsLoading(false);
  };

  return {
    setRows,
    fetchData,
    fetchLoadDataAddEmployee,
    fetchLoadDataEditEmployee,
    fetchLoadEditFormValues,
  };
};
