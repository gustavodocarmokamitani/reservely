import React, { useEffect, useState } from "react";
import { SelectOption } from "../../models/SelectOptions";
import { getAppointmentStatus } from "../../services/AppointmentStatusServices";
import Select from "react-select";
import customStyles from "./styles/customStyles";

interface AppointmentStatusSelectProps {
  setAppointmentStatus: (option: SelectOption | null) => void;
  value?: number;
}

const AppointmentStatusSelect: React.FC<AppointmentStatusSelectProps> = ({ setAppointmentStatus, value }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await getAppointmentStatus();
        const formattedOptions = response.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));

        formattedOptions.unshift({ value: 0, label: "Selecione...", isDisabled: true });
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchFuncionarios();
  }, []);

  const handleChange = (option: any) => {
    setAppointmentStatus(option);
  };

  return (
    <Select
      options={options}
      placeholder="Selecione um status"
      onChange={handleChange}
      styles={customStyles}
      value={options.find(opt => opt.value === value)}
    />
  );
};

export default AppointmentStatusSelect;
