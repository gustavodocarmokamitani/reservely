import React from "react";
import { ServiceType } from "../../models/ServiceType";
import { Service } from "../../models/Service";
import { formatToBRL } from "../../services/system/globalService";
import Button from "../../components/Button/Button";
import { User } from "../../models/User";
import { getEmployeeIdByUserId } from "../../services/EmployeeServices";
import ProfessionalBox from "../../components/ProfessionalBox/ProfessionalBox";
import * as S from "./ServiceAppointment.styles";

interface ServiceAppointmentProps {
  serviceData: ServiceType[];
  selectedService: number | null;
  setSelectedService: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedProfessional: React.Dispatch<React.SetStateAction<number[]>>;
  setFilteredEmployees: React.Dispatch<React.SetStateAction<User[]>>;
  visibleServiceCount: number;
  setVisibleServiceCount: React.Dispatch<React.SetStateAction<number>>;
  professionalData: User[] | undefined;
}

export default function ServiceAppointment({
  serviceData,
  selectedService,
  setSelectedService,
  setSelectedProfessional,
  setFilteredEmployees,
  visibleServiceCount,
  setVisibleServiceCount,
  professionalData,
}: ServiceAppointmentProps) {
  const handleServiceSelect = async (id: number) => {
    setSelectedProfessional([]);
    if (selectedService === id) {
      setSelectedService(null);
      setFilteredEmployees([]);
      return;
    }

    setSelectedService(id);

    try {
      if (!professionalData) return;

      const employeePromises = professionalData.map((user: User) =>
        getEmployeeIdByUserId(user.id).then((employee) => ({
          user,
          employee,
        }))
      );

      const userEmployeePairs = await Promise.all(employeePromises);

      const matchedUsers = userEmployeePairs
        .filter(({ employee }) => employee.serviceIds.includes(id))
        .map(({ user }) => user);

      setFilteredEmployees(matchedUsers);
    } catch (error) {
      console.error("Erro ao buscar empregados:", error);
    }
  };

  const handleShowMoreServices = () => {
    setVisibleServiceCount((prev) => prev + 5);
  };

  const handleShowLessServices = () => {
    setVisibleServiceCount(5);
  };
  console.log(serviceData);
  
  return (
    <>
      <h2 className="mb-3 px-3">Serviços</h2>
      <S.SelectServiceContainer>
        {serviceData && serviceData.length > 0 ? (
          (selectedService !== null
            ? serviceData.filter((s) => s.id === selectedService)
            : serviceData.slice(0, visibleServiceCount)
          ).map((service) => (
            <S.ServiceContent key={service.id}>
              <S.AnimatedContainer>
                <S.ServiceNameDescription>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </S.ServiceNameDescription>
                <S.ServiceDurationPrice>
                  <p>{service.durationMinutes} minutos</p>
                  <p>●</p>
                  <p>
                    {formatToBRL(
                      String(Number(service.value.toFixed(2)) * 100)
                    )}
                  </p>
                </S.ServiceDurationPrice>
                <S.ServiceButton>
                  {selectedService === service.id ? (
                    <Button
                      type="button"
                      $noIcon
                      $isRemove
                      onClick={() => handleServiceSelect(service.id)}
                    />
                  ) : (
                    <Button
                      type="button"
                      $noIcon
                      $isAdd
                      onClick={() => handleServiceSelect(service.id)}
                    />
                  )}
                </S.ServiceButton>
              </S.AnimatedContainer>
            </S.ServiceContent>
          ))
        ) : (
          <p>Carregando serviços...</p>
        )}
        {serviceData.length > visibleServiceCount &&
        selectedService === null ? (
          <span
            style={{ cursor: "pointer", color: "#1d62d9" }}
            onClick={handleShowMoreServices}
          >
            Exibir mais serviços
          </span>
        ) : (
          selectedService === null && (
            <span
              style={{ cursor: "pointer", color: "#1d62d9" }}
              onClick={handleShowLessServices}
            >
              Exibir menos serviços
            </span>
          )
        )}
      </S.SelectServiceContainer>
    </>
  );
}
