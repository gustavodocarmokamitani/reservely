import React, { useEffect, useState } from "react";
import * as S from "../../view/ChartsDashBoard/ChartDashboard.styles";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieCharts";
import BarChart from "../Charts/BarChart";
import BarChartHorizontal from "../Charts/BarChartHorizontal";
import {
  getAppointmentByDay,
  getAppointmentMostRequestedServices,
  getAppointmentRevenue,
  getAppointmentStatusCount,
} from "../../services/AppointmentServices";
import { formatYearMonth } from "../../services/system/globalService";

const ChartDashboard: React.FC = () => {
  const storeUser = Number(localStorage.getItem("storeUser"));
  const [revenue, setRevenue] = useState<{
    revenueData: number[];
    revenueMonth: string[];
  }>();
  const [appointmentStatus, setAppointmentStatus] = useState<{
    pieData: number[];
    pieLabels: string[];
  }>();
  const [appointmentByDay, setAppointmentByDay] = useState<{
    count: number[];
    dayOfWeek: string[];
  }>();
  const [mostRequestedServices, setMostRequestedServices] = useState<{
    serviceName: string[];
    count: number[];
  }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseRevenue = await getAppointmentRevenue(storeUser);
  
        if (responseRevenue) {
          setRevenue({
            revenueData: responseRevenue.map((item: any) => item.totalRevenue),
            revenueMonth: responseRevenue.map((item: any) =>
              formatYearMonth(item.month)
            ),
          });
        }
  
        const responseStatusCount = await getAppointmentStatusCount(storeUser);
        if (responseStatusCount) {
          setAppointmentStatus(responseStatusCount);
        }
  
        const responseMostRequestedServices =
          await getAppointmentMostRequestedServices(storeUser);
        if (responseMostRequestedServices) {
          setMostRequestedServices({
            serviceName: responseMostRequestedServices.map(
              (item: any) => item.serviceName
            ),
            count: responseMostRequestedServices.map((item: any) => item.count),
          });
        }
  
        const responseAppointmentByDay = await getAppointmentByDay(storeUser);
        if (responseAppointmentByDay) {
          setAppointmentByDay({
            dayOfWeek: responseAppointmentByDay.map(
              (item: any) => item.dayOfWeek
            ), 
            count: responseAppointmentByDay.map((item: any) => item.count),
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados de receita:", error);
      }
    };
  
    fetchData();
  }, [storeUser]);
    
  return (
    <>
      <S.ChartDashboardContainer>
        <S.ChartDashboardWrapper>
          <h4>Receita Geral ao Longo do Tempo</h4>
          <S.ChartDashboardContent>
            <LineChart
              data={revenue?.revenueData || []}
              labels={revenue?.revenueMonth || []}
            />
          </S.ChartDashboardContent>
        </S.ChartDashboardWrapper>

        <S.ChartDashboardWrapper>
          <h4>Agendamentos por Status</h4>
          <S.ChartDashboardContent>
            <PieChart
              data={appointmentStatus?.pieData || []}
              labels={appointmentStatus?.pieLabels || []}
            />
          </S.ChartDashboardContent>
        </S.ChartDashboardWrapper>

        <S.ChartDashboardWrapper>
          <h4>Serviços mais Solicitados</h4>
          <S.ChartDashboardContent>
            <BarChart
              data={mostRequestedServices?.count || []}
              labels={mostRequestedServices?.serviceName || []}
            />
          </S.ChartDashboardContent>
        </S.ChartDashboardWrapper>

        <S.ChartDashboardWrapper>
          <h4>Agendamentos por Dia da Semana</h4>
          <S.ChartDashboardContent>
            <BarChartHorizontal
              data={appointmentByDay?.count || []}
              labels={appointmentByDay?.dayOfWeek || []}
            />
          </S.ChartDashboardContent>
        </S.ChartDashboardWrapper>
      </S.ChartDashboardContainer>
    </>
  );
};

export default ChartDashboard;