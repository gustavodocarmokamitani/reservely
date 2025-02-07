import React, { useContext, useEffect, useState } from "react";
import {
  getUserByUseTypeStore,
  getUserTypeIdById,
} from "../../services/UserServices";
import { SelectOption } from "../../models/SelectOptions";
import { getEmployeesByStoreId } from "../../services/EmployeeServices";
import { Employee } from "../../models/Employee";
import customStyles from "./styles/customStyles";
import Select from "react-select";
import { User } from "../../context/AppContext";
import { capitalizeFirstLetter } from "../../services/system/globalService";

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

const EmployeeSelect: React.FC<EmployeeSelectProps> = ({
  setEmployee,
  value,
  handleEmployeeChange,
}) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  const storeUser = Number(localStorage.getItem("storeUser"));

  useEffect(() => {
    const fetchEmployees = async () => {
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

export default EmployeeSelect;
