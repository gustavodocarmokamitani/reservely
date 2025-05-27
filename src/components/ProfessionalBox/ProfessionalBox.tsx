import React from "react";
import * as S from "./ProfessionalBox.styles";
import { capitalizeFirstLetter } from "../../services/system/globalService";

interface ProfessionalBoxProps {
  onChange?: (selectedProfessional: number[]) => void;
  data: any[];
  selectedProfessional?: number[];
  setSelectedProfessional: React.Dispatch<React.SetStateAction<number[]>>;
}

const ProfessionalBox: React.FC<ProfessionalBoxProps> = ({
  onChange,
  data,
  selectedProfessional,
  setSelectedProfessional,
}) => {
  const toggleProfessional = (id: number) => {
    setSelectedProfessional((prev) => {
      const newSelectedProfessional = prev.includes(id) ? [] : [id];

      if (onChange) {
        onChange(newSelectedProfessional);
      }
      return newSelectedProfessional;
    });
  };

  return (
    <S.SelectedWrap>
      {data.length > 0 ? (
        data.map((professional: any) => (
          <S.SelectedContent
            key={professional.id}
            onClick={() => toggleProfessional(professional.id)}
            style={{
              userSelect: "none",
              background:
                selectedProfessional &&
                selectedProfessional.includes(professional.id)
                  ? "#f16855"
                  : "white",
            }}
          >
            <span
              style={{
                color:
                  selectedProfessional &&
                  selectedProfessional.includes(professional.id)
                    ? "white"
                    : "#f16855",
                fontSize: ".9rem",
                padding: "1rem 1.5rem",
                fontWeight:
                  selectedProfessional &&
                  selectedProfessional.includes(professional.id)
                    ? "500"
                    : "400",
              }}
            >
              {capitalizeFirstLetter(professional.name) +
                " " +
                capitalizeFirstLetter(professional.lastName)}
            </span>
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

export default ProfessionalBox;
