import { Col, Row } from "react-bootstrap";
import HeaderTitle from "../view/HeaderTitle";
import { ContainerPage } from "./_Page.styles";
import DashboardCard from "../components/Card/DashboardCard";
import ChartDashboard from "../components/ChartDashboard";
import * as S from "./Dashboard.styles"

const Dashboard = () => {
  return (
    <ContainerPage style={{ height: "100%", width: "99.4%" }}>
      <Row>
        <Col style={{ padding: "0px" }}>
          <HeaderTitle
            title="Dashboard"
            subTitle="Área destinada para análise de dados."
          ></HeaderTitle>
        </Col>
      </Row>

      <S.DashboardContainer>
        <Col sm={12} xl={4}>
          <DashboardCard title="Valor Recebido" value="50.8K" icon="arrowUp" />
        </Col>
        <Col sm={12} xl={4}>
          <DashboardCard title="Agendamentos" value="80" icon="arrowUp" />
        </Col>
        <Col sm={12} xl={4}>
          <DashboardCard title="Cancelamento" value="9%" icon="arrowDown" />
        </Col>
      </S.DashboardContainer>

      <Row>
        <Col>
          <ChartDashboard />
        </Col>
      </Row>
    </ContainerPage>
  );
};

export default Dashboard;
