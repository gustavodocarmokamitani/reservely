import { Col, Row } from "react-bootstrap";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import ChartDashboard from "../../view/ChartsDashBoard/ChartDashboard";
import Card from "../../components/Card/Card";
import { formatCurrencyBRL } from "../../services/system/globalService";
import { useStateCustom } from "../../hooks/Dashboard/useStateCustom";
import { useFetch } from "../../hooks/Dashboard/useFetch";
import { ContainerPage } from "../Styles/_Page.styles";
import * as S from "./Dashboard.styles";

const Dashboard = () => {
  const storeUser = Number(localStorage.getItem("storeUser"));
  const {
    amountReceived,
    setAmountReceived,
    appointmentCount,
    setAppointmentCount,
    appointmentPercentageCanceled,
    setAppointmentPercentageCanceled,
  } = useStateCustom();

  useFetch(
    storeUser,
    setAmountReceived,
    setAppointmentCount,
    setAppointmentPercentageCanceled
  );

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
          <Card
            type="dashboard"
            title="Valor Recebido"
            value={formatCurrencyBRL(amountReceived)}
            icon="arrowUp"
          />
        </Col>
        <Col sm={12} xl={4}>
          <Card
            type="dashboard"
            title="Agendamentos"
            value={appointmentCount.toString()}
            icon="arrowUp"
          />
        </Col>
        <Col sm={12} xl={4}>
          <Card
            type="dashboard"
            title="Cancelamento"
            value={`${Number(appointmentPercentageCanceled).toFixed(2)}%`}
            icon="arrowDown"
          />
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
