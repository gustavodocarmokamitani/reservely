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
import { getPaymentLink } from "../../services/MercadoPagoService";
import Pricing from "../../components/Pricing/Pricing";

const plansData = {
  monthly: [
    {
      name: "Profissional",
      price: "99,90",
      popular: true,
      per: "/mês",
      planId: 2, // Adicione o ID do plano
      features: [
        "Tudo do Essencial",
        "Até 10 funcionários",
        "Relatórios via Dashboard",
      ],
    },
    {
      name: "Enterprise",
      price: "149,90",
      per: "/mês",
      planId: 3, // Adicione o ID do plano
      features: [
        "Tudo do Profissional",
        "Funcionários ilimitados",
        "Planejamento financeiro",
        "Marketing Digital",
      ],
    },
  ],
  annually: [
    {
      name: "Profissional",
      price: "1.098,84",
      popular: true,
      per: "/ano",
      planId: 5,
      discountedPrice: "91,57",
      features: [
        "Tudo do Essencial",
        "Até 10 funcionários",
        "Relatórios via Dashboard",
      ],
    },
    {
      name: "Enterprise",
      price: "1.648,90",
      per: "/ano",
      planId: 6,
      discountedPrice: "137,4",
      features: [
        "Tudo do Profissional",
        "Funcionários ilimitados",
        "Planejamento financeiro",
        "Marketing Digital",
      ],
    },
  ],
};

const Dashboard = () => {
  const storeUser = Number(localStorage.getItem("storeUser"));
  const {
    amountReceived,
    setAmountReceived,
    appointmentCount,
    setAppointmentCount,
    appointmentPercentageCanceled,
    setAppointmentPercentageCanceled,
    decodedData,
    setDecodedData,
  } = useStateCustom();

  useFetch(
    storeUser,
    setAmountReceived,
    setAppointmentCount,
    setDecodedData,
    setAppointmentPercentageCanceled
  );

  const handleExportExcel = () => {
    const data = [
      ["Relatório Dashboard"],
      ["Valor Recebido", formatCurrencyBRL(amountReceived)],
      ["Agendamentos Finalizados", appointmentCount],
      [
        "Taxa de Cancelamento",
        `${Number(appointmentPercentageCanceled).toFixed(2)}%`,
      ],
    ];

    // Cria a planilha
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");

    // Gera o arquivo Excel e baixa
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "relatorio-dashboard.xlsx");
  };

  const handleUpdateSubscribe = async (planId: number) => {
    try {
      const initPoint = await getPaymentLink(planId);
      if (initPoint) {
        window.location.href = initPoint;
      }
    } catch (error) {
      console.error("Erro ao iniciar a assinatura:", error);
    }
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

      {decodedData?.subscriptionPlanId == "1" ||
      decodedData?.subscriptionPlanId == "4" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Pricing
            plansData={plansData}
            handleSubscribe={async (planId: number) => {}}
            handleUpdateSubscribe={handleUpdateSubscribe}
            isSubscriptionActive={decodedData?.isSubscriptionActive === "true"}
          />
        </div>
      ) : (
        <>
          <S.DashboardContainer>
            <Col xs={12} xl={4}>
              <Card
                type="dashboard"
                title="Valor Total Recebido"
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
        </>
      )}
    </P.ContainerPage>
  );
};

export default Dashboard;
