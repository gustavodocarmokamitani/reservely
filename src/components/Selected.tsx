import React, { useState } from "react";
import * as S from "./Selected.styles";

interface SelectedProps {
  onChange?: (selectedServices: number[]) => void;
}

const Selected: React.FC<SelectedProps> = ({ onChange }) => {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const rows = [
    { id: 1, nome: "Corte Masculino " },
    { id: 2, nome: "Barba e Bigode" },
    { id: 3, nome: "Coloração e Mechas" },
    { id: 4, nome: "Hidratação Capilar" },
    { id: 5, nome: "Corte Masculino" },
    { id: 6, nome: "Barba e Bigode" },
    { id: 7, nome: "Coloração e Mechas" },
    { id: 8, nome: "Hidratação Capilar" },
    { id: 9, nome: "Corte Masculino" },
    { id: 12, nome: "Barba e Bigode" },
    { id: 13, nome: "Coloração e Mechas" },
    { id: 14, nome: "Hidratação Capilar" },
    { id: 21, nome: "Corte Masculino " },
    { id: 22, nome: "Barba e Bigode" },
    { id: 23, nome: "Coloração e Mechas" },
    { id: 24, nome: "Hidratação Capilar" },
    { id: 25, nome: "Corte Masculino" },
    { id: 26, nome: "Barba e Bigode" },
    { id: 27, nome: "Coloração e Mechas" },
    { id: 28, nome: "Hidratação Capilar" },
    { id: 29, nome: "Corte Masculino" },
  ];

  const toggleService = (id: number) => {
    setSelectedServices((prev) => {
      const newSelectedServices = prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id];

      // Atualize o estado apenas se houver serviços selecionados
      if (onChange && newSelectedServices.length > 0) {
        onChange(newSelectedServices);
      }

      return newSelectedServices;
    });
  };

  const handleConfirm = () => {
    // Verifica se há serviços selecionados antes de chamar onChange
    if (onChange && selectedServices.length > 0) {
      console.log("Serviços selecionados:", selectedServices);
      onChange(selectedServices); // Chame a função aqui
    } else {
      console.log("Nenhum serviço selecionado.");
    }
  };

  return (
    <>
      <S.SelectedWrap>
        {rows.map((row) => (
          <S.SelectedContent
            key={row.id}
            onClick={() => toggleService(row.id)}
            style={{
              background: selectedServices.includes(row.id) ? "#B6B6B6" : "white",
            }}
          >
            <p>{row.nome}</p>
          </S.SelectedContent>
        ))}
      </S.SelectedWrap>
    </>
  );
};

export default Selected;
