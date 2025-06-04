import { useParams } from "react-router-dom";
import {
  ContainerHeader,
  ContainerPage,
  ContentHeader,
  ContentHeaderImg,
  SubTitle,
  Title,
} from "../Styles/_Page.styles";

import * as S from "./AppointmentClient.styles";
import { getStoreByStoreCode } from "../../services/StoreServices";
import { useEffect, useState } from "react";
import { Store } from "../../models/Store";
import { getServiceTypeById } from "../../services/ServiceTypeServices";
import { ServiceType } from "../../models/ServiceType";
import { getUserByUseTypeStore } from "../../services/UserServices";
import { User } from "../../models/User";
import { getAppointmentByStoreId } from "../../services/AppointmentServices";
import { Appointment } from "../../models/Appointment";
import ServiceAppointment from "../../view/ServiceAppointment/ServiceAppointment";
import ProfessionalAppointment from "../../view/ProfessionalAppointment/ProfessionalAppointment";
import TimeAppointment from "../../view/TimeAppointment/TimeAppointment";
import { useStateCustom } from "../../hooks/AppointmentClient/useStateCustom";
import { useFetch } from "../../hooks/AppointmentClient/useFetch";
import Button from "../../components/Button/Button";
import { useSubmit } from "../../hooks/AppointmentClient/useSubmit";
import UserMenu from "../../components/UserMenu/UserMenu";
import Loading from "../../components/Loading/loading";

export const AppointmentClient = () => {
  const { storeCodeParams } = useParams();
  const storeCode = storeCodeParams ? storeCodeParams : "";
  const storeUser = Number(localStorage.getItem("storeUser"));

  const {
    decodedData,
    setDecodedData,
    isLoading,
    setIsLoading,
    visibleServiceCount,
    setVisibleServiceCount,
    storeData,
    setStoreData,
    serviceData,
    setServiceData,
    professionalData,
    setProfessionalData,
    appointmentData,
    setAppointmentData,
    selectedService,
    setSelectedService,
    selectedProfessional,
    setSelectedProfessional,
    filteredEmployees,
    setFilteredEmployees,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
  } = useStateCustom();

  useFetch(
    storeCode,
    setStoreData,
    setServiceData,
    setProfessionalData,
    setAppointmentData,
    setDecodedData
  );

  const handleSubmit = async () => {
    if (
      selectedService === null ||
      selectedTime === null ||
      decodedData === null
    ) {
      return;
    }

    await submit(
      selectedService,
      selectedProfessional,
      selectedTime,
      storeCode,
      decodedData
    );
  };

  const submit = useSubmit(
    setIsLoading,
    setSelectedService,
    setSelectedProfessional,
    setSelectedTime
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <ContainerPage style={{ minHeight: "100%" }}>
        <UserMenu />
        <ContainerHeader>
          <ContentHeader align="start">
            <Title>Agendamento</Title>
            <SubTitle>
              Garanta seu horário com facilidade. Informe os seguintes dados.
            </SubTitle>
          </ContentHeader>
          <ContentHeaderImg align="end">
            <Button onClick={() => handleSubmit()} $isConfirm type="button" />
          </ContentHeaderImg>
        </ContainerHeader>

        <S.AppointmentContainer>
          <div style={{ height: "100%", width: "100%" }}>
            <ServiceAppointment
              {...{
                serviceData,
                selectedService,
                setSelectedService,
                setSelectedProfessional,
                setFilteredEmployees,
                visibleServiceCount,
                setVisibleServiceCount,
                professionalData,
              }}
            />

            {selectedService ? (
              <S.AnimatedContainer>
                <ProfessionalAppointment
                  {...{
                    filteredEmployees,
                    selectedProfessional,
                    setSelectedProfessional,
                  }}
                />
              </S.AnimatedContainer>
            ) : null}
          </div>
          {windowWidth > 1500 ? (
            <div style={{ height: "100%", width: "40%" }}>
              <h2 className="mb-3">Horário de Funcionamento</h2>
              <S.OpeningHoursContainer>
                {Array.isArray(storeData?.operatingDays) &&
                storeData.operatingDays.length > 0 ? (
                  storeData.operatingDays.map((day, index) => (
                    <S.OpeningHoursContent key={index}>
                      <h4 className="py-2 my-2">{day}</h4>
                      <h4>{storeData?.operatingHours}</h4>
                    </S.OpeningHoursContent>
                  ))
                ) : (
                  <S.OpeningHoursContent>
                    <h4>Nenhum horário disponível</h4>
                  </S.OpeningHoursContent>
                )}
              </S.OpeningHoursContainer>
            </div>
          ) : null}
        </S.AppointmentContainer>

        <div style={{ position: "relative" }}>
          {selectedProfessional.length !== 0 ? (
            <S.AnimatedContainer>
              <TimeAppointment
                {...{
                  storeData,
                  appointmentData,
                  selectedDate,
                  selectedTime,
                  setSelectedDate,
                  setSelectedTime,
                }}
              />
            </S.AnimatedContainer>
          ) : null}
        </div>
      </ContainerPage>
    </>
  );
};
