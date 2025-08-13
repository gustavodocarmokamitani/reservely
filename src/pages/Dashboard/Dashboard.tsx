import { Col, Row } from "react-bootstrap";
import ChartDashboard from "../../view/ChartsDashBoard/ChartDashboard";
import Card from "../../components/Card/Card";
import { formatCurrencyBRL } from "../../services/system/globalService";
import { useStateCustom } from "../../hooks/Dashboard/useStateCustom";
import { useFetch } from "../../hooks/Dashboard/useFetch";
import * as P from "../Styles/_Page.styles";
import * as S from "./Dashboard.styles";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import homeClient from "../../assets/homeClient.svg";
import UserMenu from "../../components/UserMenu/UserMenu";

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

  const handleExportExcel = () => {
    // Monta os dados da planilha
    const data = [
      ["Relatório Dashboard"],
      ["Valor Recebido", formatCurrencyBRL(amountReceived)],
      ["Agendamentos Finalizados", appointmentCount],
      ["Taxa de Cancelamento", `${Number(appointmentPercentageCanceled).toFixed(2)}%`],
    ];

    // Cria a planilha
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");

    // Gera o arquivo Excel e baixa
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "relatorio-dashboard.xlsx");
  };

  return (
    <P.ContainerPage style={{ height: "100%" }}>
      <UserMenu />
      <P.ContainerHeader>
        <P.ContentHeader align="start">
          <P.Title>
            Dashboard <br />
          </P.Title>
          <P.SubTitle>Área destinada para análise de dados.</P.SubTitle>
        </P.ContentHeader>

        {/* Botão Exportar */}
        {/* <button
          onClick={handleExportExcel}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Exportar para Excel
        </button> */}
      </P.ContainerHeader>

      <S.DashboardContainer>
        <Col xs={12} xl={4}>
          <Card
            type="dashboard"
            title="Valor Recebido"
            value={formatCurrencyBRL(amountReceived)}
            icon="arrowUp"
          />
        </Col>
        <Col xs={12} xl={4}>
          <Card
            type="dashboard"
            title="Agendamentos Finalizados"
            value={appointmentCount.toString()}
            icon="arrowUp"
          />
        </Col>
        <Col xs={12} xl={4}>
          <Card
            type="dashboard"
            title="Taxa de Cancelamento"
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
    </P.ContainerPage>
  );
};

export default Dashboard;
