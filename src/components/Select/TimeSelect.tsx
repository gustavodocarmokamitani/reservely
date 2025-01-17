import React from "react";
import Select from "react-select";
import customStyles from "./styles/customStyles";

interface HorarioSelectProps {
  setAppointmentTime: (option: any) => void;
  value?: number;
}

const TimeSelect: React.FC<HorarioSelectProps> = ({ setAppointmentTime, value }) => {
  const times = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const options = [
    { value: 0, label: "Selecione...", isDisabled: true },
    ...times.map((time) => ({
      value: time,
      label: time,
    })),
  ];

  const handleChange = (option: any) => {
    setAppointmentTime(option);
  };

  return (
    <Select
      options={options}
      placeholder="Selecione um horário"
      onChange={handleChange}
      styles={customStyles}
      value={options.find(opt => opt.value === value)}
    />
  );
};

export default TimeSelect;
