import React from "react";
import {
  PieDashboardContainer,
  LeftQuadrant,
  RightQuadrantContainer,
  RightTopQuadrant,
} from "./PieDashboard.styles";
import LineChart from "./Charts/LineChart";
import PieChart from "./Charts/PieCharts";
import BarChart from "./Charts/BarChart";
import BarChartHorizontal from "./Charts/BarChartHorizontal";

const PieDashboard: React.FC = () => {
  const receitaData = [1000, 1500, 2000, 2500, 3000, 3500, 4000];
  const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const pieData = [120, 30, 50];
  const pieLabels = ["Concluído", "Cancelado", "Pendente"];

  const services = [
    "Corte de Cabelo",
    "Limpeza de Pele",
    "Manicure",
    "Massagem",
  ];
  const bookings = [120, 80, 150, 90];

  const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const agendamentosPorDia = [120, 150, 80, 200, 250, 180, 90];

  return (
    <>
      <PieDashboardContainer>
        <LeftQuadrant>
          <h2 style={{ textAlign: "center" }}>
            Receita Geral ao Longo do Tempo
          </h2>
          <LineChart data={receitaData} labels={meses} />
        </LeftQuadrant>
        <RightQuadrantContainer>
          <RightTopQuadrant>
            <h2 className="mt-3" style={{ textAlign: "center" }}>
              Agendamentos por Status
            </h2>
            <div style={{ height: "100%", width: "100%" }}>
              <PieChart data={pieData} labels={pieLabels} />
            </div>
          </RightTopQuadrant>
        </RightQuadrantContainer>
      </PieDashboardContainer>

      <PieDashboardContainer className="mt-4">
        <LeftQuadrant>
          <h2 style={{ textAlign: "center" }}>Serviços mais Solicitados</h2>
          <BarChart data={bookings} labels={services} />
        </LeftQuadrant>
        <RightQuadrantContainer>
          <RightTopQuadrant>
            <h2 className="mt-3" style={{ textAlign: "center" }}>
              Agendamentos por Status
            </h2>
            <div className="pt-5" style={{ height: "100%", width: "500px" }}>
              <BarChartHorizontal
                data={agendamentosPorDia}
                labels={diasDaSemana}
              />
            </div>
          </RightTopQuadrant>
        </RightQuadrantContainer>
      </PieDashboardContainer>
    </>
  );
};

export default PieDashboard;
