import { Col, Row } from "react-bootstrap";
import * as S from "../Appointment/Appointment.styles";
import Button from "../../components/Button/Button";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import Select from "../../components/Select/Select";
import SelectDataPicker from "../../components/Select/SelectDataPicker";
import { useFetch } from "../../hooks/Appointment/useFetch";
import { useStateCustom } from "../../hooks/Appointment/useStateCustom";
import { useParams } from "react-router-dom";
import {
  ContainerHeader,
  ContainerPage,
  ContentHeader,
  ContentHeaderImg,
  SubTitle,
  Title,
} from "../Styles/_Page.styles";
import { useSubmitClient } from "../../hooks/Appointment/useSubmitClient";

export function AppointmentClientLEGACY() {
  const { storeCodeParams } = useParams();
  const storeCode = storeCodeParams ? storeCodeParams : "";
  const storeUser = Number(localStorage.getItem("storeUser"));

  const {
    storeData,
    setStoreData,
    employee,
    setEmployee,
    client,
    setClient,
    service,
    setService,
    store,
    setStore,
    appointmentTime,
    setAppointmentTime,
    appointmentDate,
    setAppointmentDate,
    isLoading,
    setIsLoading,
    optionsEmployee,
    setOptionsEmployee,
    optionsService,
    setOptionsService,
    optionsClient,
    setOptionsClient,
    optionsTime,
    setOptionsTime,
    optionsStore,
    setOptionsStore,
    decodedData,
    setDecodedData,
    closedDates,
    setClosedDates,
    operatingDays,
    setOperatingDays,
  } = useStateCustom();

  useFetch(
    storeCode,
    storeUser,
    store,
    employee,
    setStoreData,
    setOptionsEmployee,
    setOptionsService,
    setOptionsClient,
    setOptionsTime,
    setOptionsStore,
    setIsLoading,
    setDecodedData,
    setClosedDates,
    setOperatingDays
  );

  const handleSubmit = async () => {
    await submit(
      employee,
      client,
      service,
      appointmentTime,
      appointmentDate,
      storeUser
    );
  };

  const submit = useSubmitClient(
    setIsLoading,
    setEmployee,
    setClient,
    setService,
    setAppointmentTime,
    decodedData,
    storeData,
    store
  );

  return (
    <ContainerPage>
      <ContainerHeader>
        <ContentHeader align="start">
          <Title>
            Agendamento <br />
            {storeCode !== ":" ? (
              <>
                {storeData?.name}{" "}
                <span>{storeData?.storeCode.match(/#\d+/)}</span>
              </>
            ) : (
              ""
            )}
          </Title>
          <SubTitle>
            Garanta seu horário com facilidade. Informe os seguintes dados.
          </SubTitle>
        </ContentHeader>
        <ContentHeaderImg align="end">
          <Button onClick={handleSubmit} $isConfirm type="button" />
        </ContentHeaderImg>
      </ContainerHeader>

      <S.AppointmentClientSelect>
        {storeCode === ":" ? (
          <S.AppointmentClientContainer>
            <S.AppointmentContent>
              <Paragraph text="Loja" />
              <Select
                setData={setStore}
                options={optionsStore}
                placeholder="Selecione ..."
                value={store[store.length - 1]}
              />
            </S.AppointmentContent>
          </S.AppointmentClientContainer>
        ) : null}

        {store.length > 0 || storeCode ? (
          <>
            <S.AppointmentClientContainer>
              <S.AppointmentContent>
                <Paragraph text="Funcionário" />
                <Select
                  setData={setEmployee}
                  options={optionsEmployee}
                  placeholder="Selecione ..."
                  value={employee[employee.length - 1]}
                />
              </S.AppointmentContent>

              <S.AppointmentContent>
                <Paragraph text="Serviço" />
                <Select
                  setData={setService}
                  options={optionsService}
                  placeholder="Selecione ..."
                  value={service}
                  isMulti={true}
                />
              </S.AppointmentContent>

              <S.AppointmentContent>
                <div style={{marginBottom: "25px"}}>
                  <Paragraph text="Horário" />
                  <Select
                    setData={setAppointmentTime}
                    options={optionsTime}
                    placeholder="Selecione ..."
                    value={appointmentTime}
                  />
                </div>
              </S.AppointmentContent>
            </S.AppointmentClientContainer>
          </>
        ) : null}
        <S.AppointmentClientContainer>
          {(store.length > 0 || storeCode) && (
            <S.AppointmentContent>
              <SelectDataPicker
                setDate={setAppointmentDate}
                type="appointment"
                operatingDays={operatingDays}
                closedDates={closedDates}
              />
            </S.AppointmentContent>
          )}
        </S.AppointmentClientContainer>
      </S.AppointmentClientSelect>
    </ContainerPage>
  );
}
