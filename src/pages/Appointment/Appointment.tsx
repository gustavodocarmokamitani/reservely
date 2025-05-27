import { Col, Row } from "react-bootstrap";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import Button from "../../components/Button/Button";
import SelectDataPicker from "../../components/Select/SelectDataPicker";
import Select from "../../components/Select/Select";
import { useFetch } from "../../hooks/Appointment/useFetch";
import { useStateCustom } from "../../hooks/Appointment/useStateCustom";
import { useSubmit } from "../../hooks/Appointment/useSubmit";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import {
  ContainerHeader,
  ContainerPage,
  ContentHeader,
  ContentHeaderImg,
  SubTitle,
  Title,
} from "../Styles/_Page.styles";
import * as S from "./Appointment.styles";
import Loading from "../../components/Loading/loading";

export function Appointment() {
  const storeCode = "";
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

  const submit = useSubmit(
    setIsLoading,
    setEmployee,
    setClient,
    setService,
    setAppointmentTime
  );

  return (
    <>
      {isLoading && <Loading />}
      <ContainerPage style={{ height: "100vh" }}>
        <ContainerHeader>
          <ContentHeader align="start">
            <Title>
              Agendamento <br />
            </Title>
            <SubTitle>Área destinada para realizar agendamentos.</SubTitle>
          </ContentHeader>
          <ContentHeaderImg align="end">
            <Button onClick={handleSubmit} $isConfirm type="button" />
          </ContentHeaderImg>
        </ContainerHeader>
        <S.AppointmentContainer>
          <Row
            className="justify-content-center align"
            style={{ width: "100%", flexWrap: "wrap" }}
          >
            <Col sx={12} md={6} lg={6} xl={3}>
              <S.AppointmentContent>
                <Paragraph text="Funcionário" />
                <Select
                  setData={setEmployee}
                  options={optionsEmployee}
                  placeholder="Selecione..."
                  value={employee[employee.length - 1]}
                />
              </S.AppointmentContent>
            </Col>
            <Col sx={12} md={6} lg={6} xl={3}>
              <S.AppointmentContent>
                <Paragraph text="Cliente" />
                <Select
                  setData={setClient}
                  options={optionsClient}
                  placeholder="Selecione..."
                  value={client}
                />
              </S.AppointmentContent>
            </Col>
            <Col sx={12} md={6} lg={6} xl={3}>
              <S.AppointmentContent>
                <Paragraph text="Serviço" />
                <Select
                  setData={setService}
                  options={optionsService}
                  placeholder="Selecione..."
                  value={service}
                  isMulti={true}
                />
              </S.AppointmentContent>
            </Col>
            <Col sx={12} md={6} lg={6} xl={3}>
              <S.AppointmentContent>
                <Paragraph text="Horário" />
                <Select
                  setData={setAppointmentTime}
                  options={optionsTime}
                  placeholder="Selecione..."
                  value={appointmentTime}
                />
              </S.AppointmentContent>
            </Col>
          </Row>
        </S.AppointmentContainer>
        <S.AppointmentContainer className="justify-content-center justify-content-xl-start pb-5">
          <S.AppointmentContent className="mb-5">
            <SelectDataPicker
              setDate={setAppointmentDate}
              type="appointment"
              operatingDays={operatingDays}
              closedDates={closedDates}
            />
          </S.AppointmentContent>
        </S.AppointmentContainer>
      </ContainerPage>
    </>
  );
}

export default Appointment;
