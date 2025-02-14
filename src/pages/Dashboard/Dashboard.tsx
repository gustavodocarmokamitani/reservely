import { Col, Row } from "react-bootstrap";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import { ContainerPage } from "../Styles/_Page.styles";
import DashboardCard from "../../components/Card/DashboardCard";
import ChartDashboard from "../../view/ChartsDashBoard/ChartDashboard";
import * as S from "./Dashboard.styles";
import { useEffect, useState } from "react";
import {
  getAppointmentByStoreId,
  getAppointmentRevenue,
} from "../../services/AppointmentServices";
import { formatCurrencyBRL } from "../../services/system/globalService";

const Dashboard = () => {
  const storeUser = Number(localStorage.getItem("storeUser"));
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [appointmentCount, setAppointmentCount] = useState<number>(0);
  const [appointmentPercentageCanceled, setAppointmentPercentageCanceled] =
    useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseRevenue = await getAppointmentRevenue(storeUser);

        if (responseRevenue && Array.isArray(responseRevenue)) {
          const totalRevenue = responseRevenue.reduce(
            (acc: number, currentValue: any) => acc + currentValue.totalRevenue,
            0
          );

          setAmountReceived(totalRevenue);

          const responseAppointmentCount = await getAppointmentByStoreId(
            storeUser
          );

          if (
            responseAppointmentCount &&
            Array.isArray(responseAppointmentCount)
          ) {
            const totalAppointments = responseAppointmentCount.length;
            setAppointmentCount(totalAppointments);

            const canceledAppointments = responseAppointmentCount.filter(
              (appointment: any) => appointment.appointmentStatusId === 3
            );

            const percentageCanceled =
              (canceledAppointments.length / totalAppointments) * 100;
            console.log(percentageCanceled);

            setAppointmentPercentageCanceled(percentageCanceled);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados de receita:", error);
      }
    };

    fetchData();
  }, [storeUser]);

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
          <DashboardCard
            title="Valor Recebido"
            value={formatCurrencyBRL(amountReceived)}
            icon="arrowUp"
          />
        </Col>
        <Col sm={12} xl={4}>
          <DashboardCard
            title="Agendamentos"
            value={appointmentCount.toString()}
            icon="arrowUp"
          />
        </Col>
        <Col sm={12} xl={4}>
          <DashboardCard
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
