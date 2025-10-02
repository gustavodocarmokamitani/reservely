import React from "react";
import { Col, Row } from "react-bootstrap";
import * as S from "./styles/Card.styles";
import remove from "../../assets/removeRed.svg";
import confirm from "../../assets/confirmCardStore.svg";
import calendar from "../../assets/calendar.svg";
import arrowUp from "../../assets/arrowUp.svg";
import arrowDown from "../../assets/arrowDown.svg";
import Button from "../Button/Button";
import star from "../../assets/star.png";
import moment from "moment";
import { formatToBRL } from "../../services/system/globalService";
import { Store } from "../../models/Store";

interface CardProps {
  type:
    | "status"
    | "closingDate"
    | "weekDay"
    | "dashboard"
    | "time"
    | "homeClient";
  history?: boolean;
  rating?: boolean;
  title?: string;
  text?: string;
  value?: string;
  handleNavigateAppointment?: () => void;
  handleNavigateRating?: () => void;
  data?: any;
  icon?: "remove" | "confirm" | "calendar" | "arrowUp" | "arrowDown";
  statusStore?: boolean;
  onRemove?: () => void;
  selectedTimes?: string[];
}

const iconMap = {
  remove: remove,
  confirm: confirm,
  calendar: calendar,
  arrowUp: arrowUp,
  arrowDown: arrowDown,
};

const Card: React.FC<CardProps> = ({
  type,
  title,
  text,
  value,
  handleNavigateAppointment,
  handleNavigateRating,
  icon,
  statusStore,
  onRemove,
  selectedTimes,
  history,
  rating,
  data,
}) => {
  const selectedIcon = statusStore ? confirm : remove;

  const appointmentStatusMap = {
    1: "Aguardando Aprovação",
    2: "Aprovado",
    3: "Cancelado",
    4: "Remarcado",
    5: "Finalizado",
  };

  return (
    <>
      {type === "homeClient" ? (
        <S.CardHomeClientPlanContainer
          $isHistory={!!history}
          variants={{ center: { opacity: 1, y: 0, scale: 1 } }}
          initial="center"
          transition={{ duration: 0.15, delay: 0 }}
          style={{ marginBottom: "25px", margin: "25px auto" }}
        >
          <S.CardHomeClientTitle $isHistory={!!history}>
            {data.storeName}
          </S.CardHomeClientTitle>

          {history && (
            <>
              <S.CardContent>
                <S.TextCard>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <S.Paragraph
                      style={{
                        width: "18.25rem",
                        fontWeight: "500",
                        fontSize: "1.2rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {data.employeeName}
                    </S.Paragraph>
                  </div>
                </S.TextCard>
                <S.TextCard>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: "100%",
                      marginBottom: "1rem",
                    }}
                  >
                    {/* Bloco de Valor */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <S.Paragraph
                        style={{
                          color: "#f16855",
                          fontWeight: "500",
                          padding: "0px",
                          fontSize: "1rem",
                        }}
                      >
                        Valor
                      </S.Paragraph>
                      <S.Paragraph style={{ width: "5.25rem" }}>
                        {formatToBRL(String(data.totalPrice * 100))}
                      </S.Paragraph>
                    </div>

                    {/* Bloco de Data */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <S.Paragraph
                        style={{
                          color: "#f16855",
                          fontWeight: "500",
                          padding: "0px",
                          fontSize: "1rem",
                        }}
                      >
                        Data
                      </S.Paragraph>
                      <S.Paragraph style={{ width: "5.25rem" }}>
                        {moment(data.appointmentDate).format("DD/MM/YYYY")}
                      </S.Paragraph>
                    </div>

                    {/* Bloco de Horário */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <S.Paragraph
                        style={{
                          color: "#f16855",
                          fontWeight: "500",
                          padding: "0px",
                          fontSize: "1rem",
                        }}
                      >
                        Horário
                      </S.Paragraph>
                      <S.Paragraph style={{ width: "5.25rem" }}>
                        {data.appointmentTime}
                      </S.Paragraph>
                    </div>
                  </div>
                </S.TextCard>

                {/* Linha 2 de Dados (Serviço, Status) */}
                <S.TextCard>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "100%",
                      margin: ".5rem 0",
                    }}
                  >
                    <S.TextCard
                      style={{
                        flexDirection: "column",
                        margin: "0 0 1rem 0",
                      }}
                    >
                      <S.Paragraph
                        style={{
                          color: "#f16855",
                          fontWeight: "500",
                          padding: "0px",
                          fontSize: "1rem",
                        }}
                      >
                        Serviço
                      </S.Paragraph>
                      {data.services?.map((service: any, index: number) => (
                        <S.Paragraph
                          key={index}
                          style={{
                            padding: "0.25rem 0.15rem",
                            textAlign: "left",
                          }}
                        >
                          {service.name}
                        </S.Paragraph>
                      ))}
                    </S.TextCard>

                    <S.TextCard
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <S.Paragraph
                        style={{
                          color: "#f16855",
                          fontWeight: "500",
                          padding: "0px",
                          fontSize: "1rem",
                        }}
                      >
                        Status
                      </S.Paragraph>
                      <S.Paragraph
                        style={{
                          height: "2.25rem",
                          padding: "0.25rem 0.15rem",
                          textAlign: "center",
                        }}
                      >
                        {
                          data.appointmentStatus as keyof typeof appointmentStatusMap
                        }
                      </S.Paragraph>
                    </S.TextCard>
                    <S.TextCard
                      style={{
                        flexDirection: "column",
                        margin: "0 0 1rem 0",
                      }}
                    >
                      <S.Paragraph
                        style={{
                          color: "#f16855",
                          fontWeight: "500",
                          padding: "0px",
                          fontSize: "1rem",
                        }}
                      >
                        Telefone
                      </S.Paragraph>

                      <S.Paragraph
                        style={{
                          padding: "0.25rem 0.15rem",
                          textAlign: "left",
                        }}
                      >
                        {data.professionalNumber}
                      </S.Paragraph>
                    </S.TextCard>
                  </div>
                </S.TextCard>
              </S.CardContent>
            </>
          )}

          {/* Seção de Rating */}
          {rating && (
            <Row style={{ marginTop: "1rem", padding: "0 1rem" }}>
              <Col md={12}>
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#4b5563" /* Cor similar ao PlanDescription */,
                  }}
                >
                  Profissional habilidoso, atencioso e pontual. Atendimento de
                  qualidade, com ambiente confortável e resultados sempre
                  impecáveis. Recomendo para quem busca cortes precisos e estilo
                  personalizado.
                </p>
              </Col>
            </Row>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1.2rem 0",
            }}
          >
            {history && (
              <>
                <Button
                  $isRescheduling
                  type="button"
                  onClick={handleNavigateAppointment}
                />
              </>
            )}

            {rating && (
              <>
                <img
                  src={star}
                  alt="star rating"
                  style={{ width: "1.5rem", margin: "0 0.25rem" }}
                />
                <img
                  src={star}
                  alt="star rating"
                  style={{ width: "1.5rem", margin: "0 0.25rem" }}
                />
                <img
                  src={star}
                  alt="star rating"
                  style={{ width: "1.5rem", margin: "0 0.25rem" }}
                />
                <img
                  src={star}
                  alt="star rating"
                  style={{ width: "1.5rem", margin: "0 0.25rem" }}
                />
                <img
                  src={star}
                  alt="star rating"
                  style={{ width: "1.5rem", margin: "0 0.25rem" }}
                />
              </>
            )}
          </div>
        </S.CardHomeClientPlanContainer>
      ) : (
        <S.CardStoreContainer>
          <div>
            <h4
              style={{
                marginBottom: type === "dashboard" ? "0px" : "20px",
                textAlign: "center",
              }}
            >
              {title}
            </h4>
            {type === "status" && (
              <Row>
                <Col sx={8}>
                  <p style={{ textAlign: "center", paddingRight: "1rem" }}>
                    {statusStore !== undefined
                      ? statusStore
                        ? "Ativado"
                        : "Desativado"
                      : "Sem Status"}
                  </p>
                </Col>
                <Col sx={4}>
                  <img
                    src={selectedIcon}
                    alt={statusStore ? "confirm" : "remove"}
                    style={{ cursor: "pointer", width: "1.375rem" }}
                  />
                </Col>
              </Row>
            )}

            {(type === "closingDate" || type === "weekDay") &&
              icon &&
              iconMap[icon] && (
                <Row>
                  <Col sx={8}>
                    <p style={{ textAlign: "center", paddingRight: "1rem" }}>
                      {text}
                    </p>
                  </Col>
                  <Col sx={4}>
                    <img
                      src={iconMap[icon]}
                      alt={icon}
                      onClick={icon === "remove" ? onRemove : undefined}
                      style={{ cursor: "pointer", width: "1.375rem" }}
                    />
                  </Col>
                </Row>
              )}

            {type === "dashboard" && icon && iconMap[icon] && (
              <Row>
                <Col className="d-flex justify-content-center align-items-center">
                  <h1 style={{ textAlign: "center", padding: "0 10px" }}>
                    {value}
                  </h1>
                  <img
                    src={iconMap[icon]}
                    alt={icon}
                    style={{
                      textAlign: "center",
                      cursor: "pointer",
                      width: "1.375rem",
                    }}
                  />
                </Col>
              </Row>
            )}

            {type === "time" && icon && iconMap[icon] && (
              <Row>
                <Col sx={8}>
                  {title === "Abertura" ? (
                    <>
                      <p style={{ textAlign: "center", margin: 0 }}>
                        {selectedTimes && selectedTimes[0] !== "string"
                          ? selectedTimes[0]
                          : null}
                      </p>
                    </>
                  ) : (
                    <p style={{ textAlign: "center", margin: 0 }}>
                      {selectedTimes && selectedTimes[1] !== "string"
                        ? selectedTimes[1]
                        : null}
                    </p>
                  )}
                </Col>
                <Col sx={4}>
                  <img
                    src={iconMap[icon]}
                    alt={icon}
                    style={{
                      cursor: "pointer",
                      width: "1.375rem",
                      marginLeft: ".5rem",
                    }}
                  />
                </Col>
              </Row>
            )}
          </div>
        </S.CardStoreContainer>
      )}
    </>
  );
};

export default Card;
