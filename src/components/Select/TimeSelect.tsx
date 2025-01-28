import React, { useEffect, useState } from "react";
import Select from "react-select";
import customStyles from "./styles/customStyles";
import { getStoreById } from "../../services/StoreServices";

interface HorarioSelectProps {
  setAppointmentTime: (option: any) => void;
  value?: number;
}

const TimeSelect: React.FC<HorarioSelectProps> = ({
  setAppointmentTime,
  value,
}) => {
  const storeUser = Number(localStorage.getItem("storeUser"));
  const [times, setTimes] = useState<string[]>([]);

  const fetchData = async () => {
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
        const hours = Math.floor(time / 60).toString().padStart(2, "0");
        const minutes = (time % 60).toString().padStart(2, "0");
        generatedTimes.push(`${hours}:${minutes}`);
      }

      setTimes(generatedTimes);
    } catch (error) {
      console.error("Erro ao buscar dados da store:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      value={options.find((opt) => opt.value === value)}
    />
  );
};

export default TimeSelect;
