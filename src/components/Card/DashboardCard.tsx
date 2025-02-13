import React from "react";
import { Col, Row } from "react-bootstrap";
import * as S from "./styles/Card.styles";
import arrowUp from "../../assets/arrowUp.svg";
import arrowDown from "../../assets/arrowDown.svg";

interface DashboardCardProps {
  title?: string;
  value?: string;
  icon?: "arrowUp" | "arrowDown";
}

const iconMap = {
  arrowDown,
  arrowUp,
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <S.CardDashboardContainer>
      <S.CardDashboardContent>
        <h4 style={{ marginBottom: "5px", textAlign: "center" }}>{title}</h4>
        {icon && iconMap[icon] && (
          <Row>
            <Col className="d-flex justify-content-center align-items-center ">
              <h1 style={{ textAlign: "center", padding: "0 10px" }}>
                {value}
              </h1>
              <img
                src={iconMap[icon]}
                alt={icon}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  width: "20px",
                }}
              />
            </Col>
          </Row>
        )}
      </S.CardDashboardContent>
    </S.CardDashboardContainer>
  );
};

export default DashboardCard;
