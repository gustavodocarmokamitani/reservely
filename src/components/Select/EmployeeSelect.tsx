
import React, { useEffect, useState } from "react";
import { getUserById } from "../../services/UserServices";
import { SelectOption } from "../../models/SelectOptions";
import { getEmployees } from "../../services/EmployeeServices";
import { Employee } from "../../models/Employee";
import customStyles from "./styles/customStyles";
import Select from "react-select";

interface EmployeeSelectProps {
  setEmployee: (option: SelectOption | null) => void;
  handleEmployeeChange: (option: SelectOption | null) => void;
  value?: number;
}

interface Option {
  value: any;
  label: string;
  isDisabled?: boolean;
}

const EmployeeSelect: React.FC<EmployeeSelectProps> = ({ setEmployee, value, handleEmployeeChange }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const responseEmployee = await getEmployees();

        const employeesActive = responseEmployee.filter((employee: Employee) => employee.active === "true");

        const usersActive = await Promise.all(
          employeesActive.map(async (employee: Employee) => {
            const usuario = await getUserById(employee.userId);
            return usuario;
          })
        );

        const formattedOptions: Option[] = usersActive.map((item: any) => ({
          value: item.id,
          label: item.name,
          isDisabled: false,
        }));

        formattedOptions.unshift({ value: 0, label: "Selecione...", isDisabled: true });

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchEmployees();
  }, []);


  const handleChange = (option: any) => {
    setEmployee(option);
    handleEmployeeChange(option)
  };

  return (
      <Select
        options={options}
        placeholder="Selecione um funcionário"
        onChange={handleChange}
        styles={customStyles}
        value={options.find(opt => opt.value === value)}
      />
  );
};

export default EmployeeSelect;
