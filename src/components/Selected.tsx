import React, { useState, useEffect } from "react";
import * as S from "./Selected.styles";

interface SelectedProps {
  onChange?: (selectedServices: number[]) => void;
  profissionalServices?: number[];
  options?: { id: number; nome: string }[];
}

const Selected: React.FC<SelectedProps> = ({ onChange, profissionalServices = [], options = [] }) => {
  const [selectedServices, setSelectedServices] = useState<number[]>(profissionalServices);
  const [services, setServices] = useState<{ id: number; nome: string }[]>([]);

  useEffect(() => {
    setServices(options);
  }, [options]);

  const toggleService = (id: number) => {
    setSelectedServices((prev) => {
      const newSelectedServices = prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id];

      if (onChange) {
        onChange(newSelectedServices);
      }

      return newSelectedServices;
    });
  };

  console.log(services); 
  return (
    <S.SelectedWrap>
      {services.map((service) => (
        <S.SelectedContent
          key={service.id}
          onClick={() => toggleService(service.id)}
          style={{
            background: selectedServices.includes(service.id) ? "#B6B6B6" : "white",
          }}
        >
          <p>{service.nome}</p>
        </S.SelectedContent>
      ))}
    </S.SelectedWrap>
  );
};

export default Selected;
