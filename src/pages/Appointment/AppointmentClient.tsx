import { Col, Row } from "react-bootstrap";
import { TypingText } from "../Styles/animationTyping.styles";
import * as S from "./Appointment.styles";
import Button from "../../components/Button/Button";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import Select from "../../components/Select/Select";
import SelectDataPicker from "../../components/Select/SelectDataPicker";
import { useFetch } from "../../hooks/Appointment/useFetch";
import { useStateCustom } from "../../hooks/Appointment/useStateCustom";
import { useSubmit } from "../../hooks/Appointment/useSubmit";
import { useParams } from "react-router-dom";

export function AppointmentClient() {
  const { storeCodeParams } = useParams();
  const storeCode = storeCodeParams ?? "";
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
    storeCode,
    storeUser,
    setOptionsEmployee,
    setOptionsService,
    setOptionsClient,
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

  const submit = useSubmit(
    setIsLoading,
    setEmployee,
    setClient,
    setService,
    setAppointmentTime
  );
  return (
    <S.AppointmentClientContainer>
      <Row style={{ justifyContent: "center", paddingTop: "20px" }}>
        <Col
          md={6}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TypingText style={{ maxWidth: "580px" }} numLetters={22}>
            Realize seu agendamento 🔥
          </TypingText>

          <p style={{ textAlign: "center" }}>
            Garanta seu horário com facilidade. Informe os seguintes dados.
          </p>
          <S.AppointmentClientContainerInput>
            <S.AppointmenClienttWrapperInput>
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
                  <SelectDataPicker
                    setDate={setAppointmentDate}
                    type="appointment"
                  />
                </S.AppointmentContent>
              </S.AppointmentContainer>
            </S.AppointmenClienttWrapperInput>
          </S.AppointmentClientContainerInput>

          <Row className="text-center" style={{ padding: "15px 0 50px 0" }}>
            <Col>
              <Button onClick={handleSubmit} $isConfirm type="button" />
            </Col>
          </Row>
        </Col>
      </Row>
    </S.AppointmentClientContainer>
  );
}
