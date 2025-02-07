import React, { useEffect, useState } from "react";
import Select from "react-select";
import customStyles from "./styles/customStyles";

interface DurationMinuteSelectProps {
  setFormValuesService: (updatedValues: any) => void;
  value?: string;
}

const DurationMinuteSelect: React.FC<DurationMinuteSelectProps> = ({
  setFormValuesService,
  value,
}) => {
  const [times, setTimes] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const generatedTimes = [];

    for (let hour = 0; hour < 6; hour++) {
      if (hour > 0) {
        generatedTimes.push({
          label: `${String(hour).padStart(2, '0')}:00`,
          value: String(hour * 60),
        });
      }

      for (let minute = 15; minute < 60; minute += 15) {
        const label =
          hour === 0
            ? `${String(minute).padStart(2, '0')}`
            : `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        const value = String(hour * 60 + minute);

        generatedTimes.push({ label, value });
      }
    }

    generatedTimes.push({ label: "06:00", value: "360" });

    setTimes(generatedTimes);
  }, []);

  const options = [
    { value: "", label: "Selecione a duração", isDisabled: true },
    ...times,
  ];

  const handleChange = (option: any) => {
    setFormValuesService((prevValues: any) => ({
      ...prevValues,
      durationMinutes: option.value,
    }));
  };

  return (
    <Select
      options={options}
      placeholder="Selecione a duração"
      onChange={handleChange}
      styles={customStyles}
      value={options.find((opt) => opt.value === value) || options[0]}
    />
  );
};

export default DurationMinuteSelect;
