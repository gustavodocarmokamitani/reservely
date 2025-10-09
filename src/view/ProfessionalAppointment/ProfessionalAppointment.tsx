import React from "react";
import * as S from "./ProfessionalAppointment.styles";
import ProfessionalBox from "../../components/ProfessionalBox/ProfessionalBox";
import { User } from "../../models/User";

interface ProfessionalAppointmentProps {
  filteredEmployees: User[];
  selectedProfessional: number[];
  setSelectedProfessional: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function ProfessionalAppointment({
  filteredEmployees,
  selectedProfessional,
  setSelectedProfessional,
}: ProfessionalAppointmentProps) { 
  return (
    
    <>
      <h2 className="mt-5 mb-3 px-3">Profissionais</h2>
      <S.AppointmentContainer>
        <S.SelectServiceContainer>
          {filteredEmployees.length > 0 ? (
            <ProfessionalBox
              data={filteredEmployees}
              {...{ selectedProfessional, setSelectedProfessional }}
            />
          ) : (
            <p>Nenhum profissional disponível para os serviços selecionados.</p>
          )}
        </S.SelectServiceContainer>
      </S.AppointmentContainer>
    </>
  );
}
