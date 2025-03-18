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
import employee from "../../assets/employee.png";
import price from "../../assets/price.png";
import time from "../../assets/time.png";
import date from "../../assets/date.png";
import service from "../../assets/service.png";
import moment from "moment";
import { formatToBRL } from "../../services/system/globalService";

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

  return (
    <>
      {type === "homeClient" ? (
        <div
          style={{
            borderRadius: "15px",
            boxShadow: "4px 4px 15px 0px rgba(0, 0, 0, 0.5)",
          }}
        >
          <S.CardTitleHomeClientContainer>
            <h4>{data.storeName}</h4>
          </S.CardTitleHomeClientContainer>
          <S.CardBodyHomeClientContainer>
            {history && (
              <>
                <S.CardContent>
                  <S.TextCard>
                    <img
                      src={employee}
                      alt="employee"
                      width="10%"
                    />
                    <S.Paragraph style={{ width: "9.25rem" }}>
                      {data.employeeName}
                    </S.Paragraph>
                  </S.TextCard>

                  <S.TextCard>
                    <img
                      src={price}
                      alt="employee"
                      width="10%"
                    />
                    <S.Paragraph style={{ width: "9.25rem" }}>
                      {formatToBRL(String(data.totalPrice * 100))}
                    </S.Paragraph>
                  </S.TextCard>
                </S.CardContent>
                <S.CardContent>
                  <S.TextCard>
                    <img src={date} alt="employee" width="10%" />
                    <S.Paragraph style={{ width: "9.25rem" }}>
                      {moment(data.appointmentDate).format("DD/MM/YYYY")}
                    </S.Paragraph>
                  </S.TextCard>
                  <S.TextCard>
                    <img src={time} alt="employee" width="10%" />
                    <S.Paragraph style={{ width: "9.25rem" }}>
                      {data.appointmentTime}
                    </S.Paragraph>
                  </S.TextCard>
                </S.CardContent>
                <S.CardContent>
                  <S.CardScroll>
                    <S.TextCard>
                      <img
                        src={service}
                        alt="employee"
                        width="5%"                       
                      />
                      {data.services?.map((service: any, index: number) => (
                        <S.Paragraph key={index}>{service.name}</S.Paragraph>
                      ))}
                    </S.TextCard>
                  </S.CardScroll>
                </S.CardContent>
              </>
            )}
            {rating && (
              <>
                <Row>
                  <Col md={12}>
                    <p style={{ width: "100%", textAlign: "center" }}>
                      Profissional habilidoso, atencioso e pontual. Atendimento
                      de qualidade, com ambiente confortável e resultados sempre
                      impecáveis. Recomendo para quem busca cortes precisos e
                      estilo personalizado.
                    </p>
                  </Col>
                </Row>
              </>
            )}
          </S.CardBodyHomeClientContainer>
          <S.CardFooterHomeClientContainer>
            {history && (
              <>
                <Button
                  $isRating
                  type="button"
                  onClick={handleNavigateRating}
                />
                <Button
                  $isRescheduling
                  type="button"
                  onClick={handleNavigateAppointment}
                />
              </>
            )}

            {rating && (
              <>
                <img src={star} alt="star rating" />
                <img src={star} alt="star rating" />
                <img src={star} alt="star rating" />
                <img src={star} alt="star rating" />
                <img src={star} alt="star rating" />
              </>
            )}
          </S.CardFooterHomeClientContainer>
        </div>
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
                <Col md={8}>
                  <p style={{ textAlign: "center" }}>
                    {statusStore !== undefined
                      ? statusStore
                        ? "Ativo"
                        : "Fechado"
                      : "Sem Status"}
                  </p>
                </Col>
                <Col md={4}>
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
                  <Col md={8}>
                    <p style={{ textAlign: "center" }}>{text}</p>
                  </Col>
                  <Col md={4}>
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
                <Col md={8}>
                  {title === "Hora de abertura" ? (
                    <p style={{ textAlign: "center" }}>
                      {selectedTimes && selectedTimes[0] !== "string"
                        ? selectedTimes[0]
                        : null}
                    </p>
                  ) : (
                    <p style={{ textAlign: "center" }}>
                      {selectedTimes ? selectedTimes[1] : null}
                    </p>
                  )}
                </Col>
                <Col md={4}>
                  <img
                    src={iconMap[icon]}
                    alt={icon}
                    style={{ cursor: "pointer", width: "1.375rem" }}
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
