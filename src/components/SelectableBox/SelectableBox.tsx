import React from "react";
import * as S from "./SelectableBox.styles";
import { Service } from "../../models/Service";

interface SelectableBoxProps {
  onChange?: (selectedServices: number[]) => void;
  data: Service[];
  selectedServices?: number[];
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>;
}

const SelectableBox: React.FC<SelectableBoxProps> = ({
  onChange,
  data,
  selectedServices,
  setSelectedServices,
}) => {  
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

  return (
    <S.SelectedWrap>
      {data.length > 0 ? (
        data.map((service) => (
          <S.SelectedContent
            key={service.id}
            onClick={() => toggleService(service.id)}
            style={{
              userSelect: "none",
              background:
                selectedServices && selectedServices.includes(service.id)
                  ? "#B6B6B6"
                  : "white",
            }}
          >
            <p>{service.name}</p>
          </S.SelectedContent>
        ))
      ) : (
        <p style={{ marginLeft: "15px" }}>
          Funcionário não possui serviços disponíveis.
        </p>
      )}
    </S.SelectedWrap>
  );
};

export default SelectableBox;
