import React, { useEffect, useState } from "react";
import { getUserById, getUserTypeIdById } from "../../services/UserServices";
import { SelectOption } from "../../models/SelectOptions";
import {
  getEmployees,
  getEmployeesByStoreId,
} from "../../services/EmployeeServices";
import { Employee } from "../../models/Employee";
import customStyles from "./styles/customStyles";
import Select from "react-select";
import { User } from "../../context/AppContext";

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

  let registeredEmployee: Employee;

  const fetchData = async () => {
    registeredEmployee = await getEmployeesByStoreId(1);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const responseEmployee = await getEmployees(); 
   
        const filteredEmployees = responseEmployee.filter(
          (employee: Employee) => employee.storeId === 1 // TODO alterar store
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
  
        // Formatação dos dados para o formato Option
        const formattedOptions: Option[] = filteredWithUserData.map(
          (employeeWithUserData) => ({
            value: employeeWithUserData.user.id,  
            label: employeeWithUserData.user.name,  
            isDisabled: false,
          })
        );
  
        console.log(formattedOptions);
  
        // Adiciona a opção "Selecione..."
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
  }, []);
  

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
