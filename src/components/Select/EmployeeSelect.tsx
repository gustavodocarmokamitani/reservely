
import React, { useEffect, useState } from "react";
import { getUserById, getUserTypeIdById } from "../../services/UserServices";
import { SelectOption } from "../../models/SelectOptions";
import { getEmployees, getEmployeesByStoreId } from "../../services/EmployeeServices";
import { Employee } from "../../models/Employee";
import customStyles from "./styles/customStyles";
import Select from "react-select";
import { User } from "../../context/AppContext";

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

  let registeredEmployee: Employee;

  const fetchData = async () => {
    registeredEmployee = await getEmployeesByStoreId(1);
  };
  


  useEffect(() => {
    const fetchEmployees = async () => {
      try { 
        const responseEmployee = await getUserTypeIdById(2);
           console.log(registeredEmployee);
           
        const formattedOptions: Option[] = responseEmployee.map((employee: User) => ({
          value: employee.id,  
          label: employee.name,     
          isDisabled: false,       
        }));
         
        formattedOptions.unshift({ value: 0, label: "Selecione...", isDisabled: true });
       
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };
    fetchData();
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
