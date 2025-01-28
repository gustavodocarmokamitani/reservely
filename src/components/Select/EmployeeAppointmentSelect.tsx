import React, { useEffect, useState } from "react";
import { getUserById } from "../../services/UserServices";
import { SelectOption } from "../../models/SelectOptions";
import { getEmployees } from "../../services/EmployeeServices";
import { Employee } from "../../models/Employee";
import customStyles from "./styles/customStyles";
import Select from "react-select";

interface EmployeeAppointmentSelectProps {
  setEmployee: (option: SelectOption | null) => void;
  handleEmployeeChange: (option: SelectOption | null) => void;
  value?: number;
}

interface Option {
  value: any;
  label: string;
  isDisabled?: boolean;
}

const EmployeeAppointmentSelect: React.FC<EmployeeAppointmentSelectProps> = ({
  setEmployee,
  value,
  handleEmployeeChange,
}) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  const storeUser = Number(localStorage.getItem("storeUser"));

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const responseEmployee = await getEmployees();

        const filteredEmployees = responseEmployee.filter(
          (employee: Employee) => employee.storeId === storeUser
        );

        const filteredWithUserData = await Promise.all(
          filteredEmployees.map(async (employee: Employee) => {
            const responseUser = await getUserById(employee.userId);
            return {
              ...employee,
              user: responseUser,
            };
          })
        );        
        
        const formattedOptions: Option[] = filteredWithUserData.map(
          (employeeWithUserData) => ({
            value: employeeWithUserData.user.id,
            label:
              employeeWithUserData.user.name +
              " " +
              employeeWithUserData.user.lastName,
            isDisabled: false,
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
    };

    fetchEmployees();
  }, [storeUser]);

  const handleChange = (option: any) => {
    setEmployee(option);
    handleEmployeeChange(option);
  };

  return (
    <Select
      options={options}
      placeholder="Selecione um funcionário"
      onChange={handleChange}
      styles={customStyles}
      value={options.find((opt) => opt.value === value)}
    />
  );
};

export default EmployeeAppointmentSelect;
