import { Col, Row } from "react-bootstrap";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import Button from "../../components/Button/Button";
import SelectDataPicker from "../../components/Select/SelectDataPicker";
import Select from "../../components/Select/Select";
import { useFetch } from "../../hooks/Appointment/useFetch";
import { useStateCustom } from "../../hooks/Appointment/useStateCustom";
import { useValidate } from "../../hooks/Appointment/useValidade";
import { useSubmit } from "../../hooks/Appointment/useSubmit";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import { ContainerPage } from "../Styles/_Page.styles";
import * as S from "./Appointment.styles";
import Loading from "../../components/Loading/loading";

export function Appointment() {
  const storeUser = Number(localStorage.getItem("storeUser"));

  const {
    employee,
    setEmployee,
    client,
    setClient,
    service,
    setService,
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
  } = useStateCustom();

  useFetch(
    storeUser,
    optionsEmployee,
    setOptionsEmployee,
    optionsService,
    setOptionsService,
    optionsClient,
    setOptionsClient,
    optionsTime,
    setOptionsTime,
    setIsLoading
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

  const validate = useValidate();
  const submit = useSubmit(setIsLoading);

  return (
    <>
      {isLoading && <Loading />}
      <ContainerPage style={{ height: "100vh" }}>
        <Row className="wrap">
          <Col md={12} lg={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Agendamento"
              subTitle="Área destinada para realizar os agendamentos."
            />
          </Col>
          <Col
            md={12}
            lg={5}
            className="d-flex flex-row justify-content-md-center justify-content-lg-end align-items-center mt-md-5 mt-lg-0"
          >
            <Button onClick={handleSubmit} $isConfirm type="button" />
          </Col>
        </Row>
        <S.AppointmentContainer>
          <Row
            className="justify-content-center align"
            style={{ width: "100%", flexWrap: "wrap" }}
          >
            <Col>
              <S.AppointmentContent>
                <Paragraph text="Funcionário" />
                <Select
                  setData={setEmployee}
                  options={optionsEmployee}
                  placeholder="Selecione um funcionário"
                  value={employee[employee.length - 1]}
                />
              </S.AppointmentContent>
            </Col>
            <Col>
              <S.AppointmentContent>
                <Paragraph text="Cliente" />
                <Select
                  setData={setClient}
                  options={optionsClient}
                  placeholder="Selecione um cliente"
                  value={client}
                />
              </S.AppointmentContent>
            </Col>
            <Col>
              <S.AppointmentContent>
                <Paragraph text="Serviço" />
                <Select
                  setData={setService}
                  options={optionsService}
                  placeholder="Selecione um serviço"
                  value={service}
                  isMulti={true}
                />
              </S.AppointmentContent>
            </Col>
            <Col>
              <S.AppointmentContent>
                <Paragraph text="Horário" />
                <Select
                  setData={setAppointmentTime}
                  options={optionsTime}
                  placeholder="Selecione um horário"
                  value={appointmentTime}
                />
              </S.AppointmentContent>
            </Col>
          </Row>
        </S.AppointmentContainer>
        <S.AppointmentContainer className="justify-content-center justify-content-xl-start pb-5">
          <S.AppointmentContent>
            <SelectDataPicker setDate={setAppointmentDate} />
          </S.AppointmentContent>
        </S.AppointmentContainer>
      </ContainerPage>
    </>
  );
}

export default Appointment;
