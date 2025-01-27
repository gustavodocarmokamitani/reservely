import { Col, Row } from "react-bootstrap";
import HeaderTitle from "../view/HeaderTitle";
import { ContainerPage } from "./_Page.styles";
import DashboardCard from "../components/Card/DashboardCard";
import PieDashboard from "../components/PieDashboard";

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

      <Row style={{ paddingTop: "50px" }}>
        <Col lg={12} xl={4} style={{ paddingLeft: "0px" }}>
          <DashboardCard title="Valor Recebido" value="50.8K" icon="arrowUp" />
        </Col>
        <Col lg={12} xl={4} style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          <DashboardCard title="Agendamentos" value="80" icon="arrowUp" />
        </Col>
        <Col lg={12} xl={4} style={{ paddingRight: "0px" }}>
          <DashboardCard title="Cancelamento" value="9%" icon="arrowDown" />
        </Col>
      </Row>

      <Row>
        <Col>
          <PieDashboard />
        </Col>
      </Row>
    </ContainerPage>
  );
};

export default Dashboard;
