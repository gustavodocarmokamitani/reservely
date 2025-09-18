import React, { useEffect, useState } from "react";
import * as S from "../../view/ChartsDashBoard/ChartDashboard.styles";
import LineChart from "../../components/Charts/LineChart";
import PieChart from "../../components/Charts/PieCharts";
import BarChartHorizontal from "../../components/Charts/BarChartHorizontal";
import BarChart from "../../components/Charts/BarChart";
import {
  getAppointmentByDay,
  getAppointmentByStoreId,
  getAppointmentMostRequestedServices,
  getAppointmentRevenue,
  getAppointmentStatusCount,
  GetEmployeePerformance,
} from "../../services/AppointmentServices";
import { formatYearMonth } from "../../services/system/globalService";
import EmployeePerformanceBarChart from "../../components/Charts/EmployeePerformanceBarChart";
import EmployeeMostServiceBarChart from "../../components/Charts/EmployeeMostServiceBarChart";

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
  const [busyTimes, setBusyTimes] = useState<{
    labels: string[];
    data: number[];
  }>();
  const [employeePerformance, setEmployeePerformance] = useState<{
    employeeNames: string[];
    totalRevenue: number[];
    totalServices: number[];
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

        const responseAppointments = await getAppointmentByStoreId(storeUser);

        if (Array.isArray(responseAppointments)) {
          const filteredTimes = responseAppointments
            .filter((appointment: any) => appointment.appointmentStatusId === 5)
            .map((appointment: any) => appointment.appointmentTime);

          const frequencyMap: { [key: string]: number } = {};
          filteredTimes.forEach((time) => {
            frequencyMap[time] = (frequencyMap[time] || 0) + 1;
          });

          const labels = Object.keys(frequencyMap);
          const data = Object.values(frequencyMap);

          setBusyTimes({ labels, data });
        }
        const employeeData = await GetEmployeePerformance(storeUser);
        if (employeeData && Array.isArray(employeeData)) {
          const names: string[] = [];
          const revenues: number[] = [];
          const servicesCompleted: number[] = [];

          employeeData.forEach((employee: any) => {
            names.push(employee.employeeName);
 
            const totalRevenue = employee.monthlyPerformance.reduce(
              (sum: number, month: any) => sum + month.totalRevenue,
              0
            );
            revenues.push(totalRevenue);
 
            const totalServices = employee.monthlyPerformance.reduce(
              (sum: number, month: any) => sum + month.servicesCompleted,
              0
            );
            servicesCompleted.push(totalServices);
          });

          setEmployeePerformance({
            employeeNames: names,
            totalRevenue: revenues,
            totalServices: servicesCompleted, 
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

        <S.ChartDashboardWrapper>
          <h4>Horários mais movimentados</h4>
          <S.ChartDashboardContent>
            <BarChartHorizontal
              data={busyTimes?.data || []}
              labels={busyTimes?.labels || []}
            />
          </S.ChartDashboardContent>
        </S.ChartDashboardWrapper>

          <S.ChartDashboardWrapper>
          <h4>Receita Total por Funcionário</h4>
          <S.ChartDashboardContent>
            <EmployeePerformanceBarChart
              data={employeePerformance?.totalRevenue || []}
              labels={employeePerformance?.employeeNames || []}
            />
          </S.ChartDashboardContent>
        </S.ChartDashboardWrapper>

          <S.ChartDashboardWrapper>
          <h4>Quantidade de Serviços Realizado por Funcionário</h4>
          <S.ChartDashboardContent>
            <EmployeeMostServiceBarChart
              data={employeePerformance?.totalServices || []}
              labels={employeePerformance?.employeeNames || []}
            />
          </S.ChartDashboardContent>
        </S.ChartDashboardWrapper>

      </S.ChartDashboardContainer>
    </>
  );
};

export default ChartDashboard;
