import React from "react";
import { Col, Row } from "react-bootstrap";
import * as S from "./styles/Card.styles";
import remove from "../../assets/removeRed.svg";
import confirm from "../../assets/confirmCardStore.svg";
import calendar from "../../assets/calendar.svg";
import arrowUp from "../../assets/arrowUp.svg";
import arrowDown from "../../assets/arrowDown.svg";

interface CardProps {
  type: "status" | "closingDate" | "weekDay" | "dashboard" | "time"; 
  title?: string;
  text?: string;
  value?: string;
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
  icon,
  statusStore,
  onRemove,
  selectedTimes,
}) => {
  const selectedIcon = statusStore ? confirm : remove;

  return (
    <S.CardStoreContainer>
      <div>
        <h4 style={{  marginBottom: type === "dashboard" ? "0px" : "20px", textAlign: "center" }}>{title}</h4>

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
              <img src={iconMap[icon]} alt={icon} style={{ cursor: "pointer", width: "1.375rem" }}/>
            </Col>
          </Row>
        )}
        
      </div>
    </S.CardStoreContainer>
  );
};

export default Card;
