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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        stroke="#141B34"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" />
                        <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" />
                      </svg>{" "}
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
                          display: "flex",
                          alignItems: "center",
                          color: "#f16855",
                          fontWeight: "500",
                          padding: "0px",
                          fontSize: "1rem",
                            gap: "0.25rem",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          color="#f16d55"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        >
                          <path d="M17.9583 8.38889C17.9583 6.24111 15.2907 4.5 12 4.5C8.7093 4.5 6.04167 6.24111 6.04167 8.38889C6.04167 10.5367 7.66667 11.7222 12 11.7222C16.3333 11.7222 18.5 12.8333 18.5 15.6111C18.5 18.3889 15.5899 19.5 12 19.5C8.41015 19.5 5.5 17.7589 5.5 15.6111" />
                          <path d="M12.5 2.5V4.21M12.5 21.5V19.79" />
                        </svg>
                        Valor
                      </S.Paragraph>
                      <S.Paragraph
                        style={{
                          width: "5.25rem",
                          fontWeight: "600",
                        }}
                      >
                        {formatToBRL(String(data.totalPrice * 100))}
                      </S.Paragraph>
                    </div>

                    {/* Bloco de Data */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <S.Paragraph
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#f16855",
                          fontWeight: "500",
                          padding: "0px",
                          fontSize: "1rem",
                            gap: "0.25rem",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          color="#f16855"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M16 2V6M8 2V6" />
                          <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" />
                          <path d="M3 10H21" />
                          <path d="M11 14H16M8 14H8.00898M13 18H8M16 18H15.991" />
                        </svg>
                        Data
                      </S.Paragraph>
                      <S.Paragraph
                        style={{ width: "5.25rem", fontWeight: "600" }}
                      >
                        {moment(data.appointmentDate).format("DD/MM/YYYY")}
                      </S.Paragraph>
                    </div>

                    {/* Bloco de Horário */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <S.Paragraph
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#f16855",
                          fontWeight: "500",
                          padding: "0px",
                          fontSize: "1rem",
                          gap: "0.25rem",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          color="#f16855"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M12 22C6.47714 22 2.00003 17.5228 2.00003 12C2.00003 6.47715 6.47718 2 12 2C16.4777 2 20.2257 4.94289 21.5 9H19" />
                          <path d="M12 8V12L14 14" />
                          <path d="M21.9551 13C21.9848 12.6709 22 12.3373 22 12M15 22C15.3416 21.8876 15.6753 21.7564 16 21.6078M20.7906 17C20.9835 16.6284 21.1555 16.2433 21.305 15.8462M18.1925 20.2292C18.5369 19.9441 18.8631 19.6358 19.1688 19.3065" />
                        </svg>
                        Horário
                      </S.Paragraph>
                      <S.Paragraph
                        style={{ width: "5.25rem", fontWeight: "600" }}
                      >
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          color="#f16855"
                          fill="none"
                          stroke="#f16855"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M4 14H22" />
                          <path d="M5 22L5.93056 21.0694C6.45933 20.5407 6.72371 20.2763 7.05684 20.126C7.38997 19.9756 7.76314 19.9523 8.50947 19.9057L11.7619 19.7024C13.3604 19.6025 14.1597 19.5525 14.863 19.2148C15.5664 18.877 16.1051 18.2844 17.1824 17.0993L20 14H16.5L14.7071 15.7929C14.5879 15.9121 14.5282 15.9718 14.4662 16.0244C14.1472 16.2954 13.7512 16.4594 13.3341 16.4934C13.2529 16.5 13.1686 16.5 13 16.5M2 19L5.07774 15.9223C5.81669 15.1833 6.18617 14.8138 6.62171 14.5564C6.94612 14.3647 7.29599 14.2198 7.66095 14.126C8.15093 14 8.67345 14 9.71849 14H10.5C10.9647 14 11.197 14 11.3902 14.0384C12.1836 14.1962 12.8038 14.8164 12.9616 15.6098C13 15.803 13 16.0353 13 16.5M13 16.5H9.5" />
                          <path d="M5 11.5C5 7.08171 8.58171 3.5 13 3.5M13 3.5C17.4183 3.5 21 7.08171 21 11.5M13 3.5V2" />
                        </svg>{" "}
                        Serviço
                      </S.Paragraph>
                      {data.services?.map((service: any, index: number) => (
                        <S.Paragraph
                          key={index}
                          style={{
                            padding: "0.50rem",
                            borderRadius: "0.5rem",
                            textAlign: "left",
                            backgroundColor: "#feeae7",
                          }}
                        >
                          {service.name}
                        </S.Paragraph>
                      ))}
                    </S.TextCard>

                    <S.TextCard
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          backgroundColor: "#f9f9f9",
                          padding: "0.5rem",
                          gap: "2.5rem",
                          borderRadius: "0.5rem",
                          width: "14rem",
                        }}
                      >
                        <S.Paragraph
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#f16855",
                            fontWeight: "500",
                            fontSize: ".875rem",
                            gap: ".2rem",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            color="#f16855"
                            fill="none"
                            stroke="#f16855"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          >
                            <path d="M2.46433 9.34375C2.21579 9.34375 1.98899 9.14229 2.00041 8.87895C2.06733 7.33687 2.25481 6.33298 2.78008 5.53884C3.08228 5.08196 3.45765 4.68459 3.88923 4.36468C5.05575 3.5 6.70139 3.5 9.99266 3.5H14.0074C17.2986 3.5 18.9443 3.5 20.1108 4.36468C20.5424 4.68459 20.9177 5.08196 21.2199 5.53884C21.7452 6.33289 21.9327 7.33665 21.9996 8.87843C22.011 9.14208 21.7839 9.34375 21.5351 9.34375C20.1493 9.34375 19.0259 10.533 19.0259 12C19.0259 13.467 20.1493 14.6562 21.5351 14.6562C21.7839 14.6562 22.011 14.8579 21.9996 15.1216C21.9327 16.6634 21.7452 17.6671 21.2199 18.4612C20.9177 18.918 20.5424 19.3154 20.1108 19.6353C18.9443 20.5 17.2986 20.5 14.0074 20.5H9.99266C6.70139 20.5 5.05575 20.5 3.88923 19.6353C3.45765 19.3154 3.08228 18.918 2.78008 18.4612C2.25481 17.667 2.06733 16.6631 2.00041 15.1211C1.98899 14.8577 2.21579 14.6562 2.46433 14.6562C3.85012 14.6562 4.97352 13.467 4.97352 12C4.97352 10.533 3.85012 9.34375 2.46433 9.34375Z" />
                            <path d="M9 3.5L9 20.5" />
                          </svg>
                          Status
                        </S.Paragraph>

                        <S.Paragraph
                          style={{
                            fontWeight: "500",
                            padding: "0px",
                            fontSize: ".875rem",
                          }}
                        >
                          {
                            data.appointmentStatus as keyof typeof appointmentStatusMap
                          }
                        </S.Paragraph>
                      </div>
                    </S.TextCard>
                    {data.professionalNumber && (
                      <S.TextCard
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            backgroundColor: "#f9f9f9",
                            padding: "0.5rem ",
                            gap: "2.5rem",
                            borderRadius: "0.5rem",
                            width: "14rem",
                          }}
                        >
                          <S.Paragraph
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#f16855",
                              fontWeight: "500",
                              fontSize: ".875rem",
                              gap: ".2rem",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="18"
                              height="18"
                              color="#f16855"
                              fill="none"
                              stroke="#f16855"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            >
                              <path d="M9.1585 5.71217L8.75584 4.80619C8.49256 4.21382 8.36092 3.91762 8.16405 3.69095C7.91732 3.40688 7.59571 3.19788 7.23592 3.08779C6.94883 2.99994 6.6247 2.99994 5.97645 2.99994C5.02815 2.99994 4.554 2.99994 4.15597 3.18223C3.68711 3.39696 3.26368 3.86322 3.09497 4.35054C2.95175 4.76423 2.99278 5.18937 3.07482 6.03964C3.94815 15.0901 8.91006 20.052 17.9605 20.9254C18.8108 21.0074 19.236 21.0484 19.6496 20.9052C20.137 20.7365 20.6032 20.3131 20.818 19.8442C21.0002 19.4462 21.0002 18.972 21.0002 18.0237C21.0002 17.3755 21.0002 17.0514 20.9124 16.7643C20.8023 16.4045 20.5933 16.0829 20.3092 15.8361C20.0826 15.6393 19.7864 15.5076 19.194 15.2443L18.288 14.8417C17.6465 14.5566 17.3257 14.414 16.9998 14.383C16.6878 14.3533 16.3733 14.3971 16.0813 14.5108C15.7762 14.6296 15.5066 14.8543 14.9672 15.3038C14.4304 15.7511 14.162 15.9748 13.834 16.0946C13.5432 16.2009 13.1588 16.2402 12.8526 16.1951C12.5071 16.1442 12.2426 16.0028 11.7135 15.7201C10.0675 14.8404 9.15977 13.9327 8.28011 12.2867C7.99738 11.7576 7.85602 11.4931 7.80511 11.1476C7.75998 10.8414 7.79932 10.457 7.90554 10.1662C8.02536 9.83822 8.24905 9.5698 8.69643 9.03294C9.14586 8.49362 9.37058 8.22396 9.48939 7.91885C9.60309 7.62688 9.64686 7.31234 9.61719 7.00042C9.58618 6.67446 9.44362 6.3537 9.1585 5.71217Z" />
                            </svg>{" "}
                            Telefone
                          </S.Paragraph>

                          <S.Paragraph
                            style={{
                              fontWeight: "500",
                              padding: "0px",
                              fontSize: ".875rem",
                            }}
                          >
                            {data.professionalNumber}
                          </S.Paragraph>
                        </div>
                      </S.TextCard>
                    )}
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
