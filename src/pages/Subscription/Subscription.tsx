import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import * as P from "../Styles/_Page.styles";
import UserMenu from "../../components/UserMenu/UserMenu";
import { decodeToken, refreshToken } from "../../services/AuthService";
import { DecodedToken } from "../../models/DecodedToken";
import { getPaymentLink } from "../../services/MercadoPagoService";
import Button from "../../components/Button/Button";

function Subscription() {
  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  const [showPlans, setShowPlans] = useState(false);

  const context = useContext(AppContext);
  const authToken = context?.authToken; 
  
  useEffect(() => {
    const refreshNewToken = async () => {
      if (authToken) {
        try {
          const response = await refreshToken(authToken);
          context?.setAuthToken(response.token);
         
        } catch (error) {
          console.error("Erro ao atualizar o token:", error);
        }
      }
    };
    refreshNewToken();
  }, []);

  useEffect(() => {
    const fetchDecodedToken = async () => {
      if (authToken) {
        try {
          const decoded = await decodeToken(authToken);

          setDecodedData(decoded);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      }
    };

    fetchDecodedToken();
  }, [authToken]);

  const handleSubscribe = async (planId: number) => {
    try {
      const initPoint = await getPaymentLink(planId);

      if (initPoint) {
        window.location.href = initPoint;
      }
    } catch (error) {
      console.error("Erro ao iniciar a assinatura:", error);
    }
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

  const isSubscriptionActive = decodedData?.isSubscriptionActive === "True";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <P.ContainerPage style={{ height: "100%" }}>
      <UserMenu />
      <P.ContainerHeader>
        <P.ContentHeader align="start">
          <P.Title>Assinatura</P.Title>
          <P.SubTitle>
            Área destinada para gerenciamento da assinatura.
          </P.SubTitle>
        </P.ContentHeader>
        {isSubscriptionActive ? (
          <Button
            type="button"
            $isUpgrade={showPlans !== true}
            $isBack={showPlans !== false}
            onClick={() => setShowPlans(!showPlans)}
          />
        ) : (
          <div
            style={{
              marginTop: 16,
              fontSize: 16,
              fontWeight: 500,
              color: "#fff",
              background: "rgba(44,44,44,0.7)",
              borderRadius: 16,
              padding: "12px 32px",
              display: "inline-block",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.18)",
              letterSpacing: 0.5,
              transition: "all 0.3s",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 18, marginRight: 8 }}>
              Plano:
            </span>
            <span
              style={{
                color: "#f06754",
                fontWeight: 700,
                fontSize: 18,
                textShadow: "0 1px 8px #7220157b",
              }}
            >
              Grátis
            </span>
          </div>
        )}
      </P.ContainerHeader>

      {/* Renderização Condicional Principal */}
      {isSubscriptionActive && !showPlans ? ( // 👈 Mostra os detalhes se estiver ativo e não estiver no modo de upgrade
        <div
          style={{
            maxWidth: 400,
            padding: 32,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            margin: "40px 0",
          }}
        >
          <p style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Plano: </span>
            <span
              style={{
                color: "#f06754",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {decodedData?.subscriptionStatus === "approved" && "Professional"}
            </span>
          </p>
          <p style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Status:</span>{" "}
            {decodedData?.subscriptionStatus === "approved"
              ? "Ativo"
              : "Inativo"}
          </p>
          <p style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Início:</span>{" "}
            {decodedData?.subscriptionStartDate
              ? formatDate(decodedData.subscriptionStartDate)
              : "N/A"}
          </p>
          <p style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Vencimento:</span>{" "}
            {decodedData?.subscriptionDueDate
              ? formatDate(decodedData.subscriptionDueDate)
              : "N/A"}
          </p>
        </div>
      ) : (
        // 👈 Mostra os cards para usuários grátis ou para quem clicou em upgrade
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            margin: "40px auto",
            flexWrap: "wrap",
          }}
        >
          {/* Card para 1 Mês */}
          <div
            style={{
              maxWidth: 300,
              padding: 24,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              flex: "1 1 300px",
              minWidth: 250,
            }}
          >
            <h2 style={{ marginBottom: 16 }}>Plano 1 Mês</h2>
            <ul style={{ marginBottom: 24, listStyle: "none", paddingLeft: 0 }}>
              <li>✔️ Acesso total ao sistema</li>
              <li>✔️ Cadastro ilimitado de profissionais e serviços</li>
              <li>✔️ Agendamento de serviços</li>
              <li>✔️ Notificação de agendamentos</li>
              <li>✔️ Dashboard de desempenho</li>
            </ul>
            <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>
              R$ 49,90/mês
            </div>
            <button
              style={{
                background: "#2c2c2c",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px 32px",
                fontSize: 18,
                cursor: "pointer",
                width: "100%",
              }}
              onClick={() => {
                decodedData?.isSubscriptionActive === "True"
                  ? handleUpdateSubscribe(1)
                  : handleSubscribe(1);
              }}
            >
              {decodedData?.isSubscriptionActive === "True"
                ? "Adicionar Plano Professional "
                : "Assinar Plano Professional "}
            </button>
          </div>

          {/* Card para 6 Meses */}
          <div
            style={{
              maxWidth: 300,
              padding: 24,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              flex: "1 1 300px",
              minWidth: 250,
            }}
          >
            <h2 style={{ marginBottom: 16 }}>Pacote 6 Meses</h2>
            <ul style={{ marginBottom: 24, listStyle: "none", paddingLeft: 0 }}>
              <li>✔️ Acesso total ao sistema</li>
              <li>✔️ Cadastro ilimitado de profissionais e serviços</li>
              <li>✔️ Agendamento de serviços</li>
              <li>✔️ Notificação de agendamentos</li>
              <li>✔️ Dashboard de desempenho</li>
            </ul>
            <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>
              R$ 299,40/6 meses
            </div>
            <button
              style={{
                background: "#2c2c2c",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px 32px",
                fontSize: 18,
                cursor: "pointer",
                width: "100%",
              }}
              onClick={() => {
                decodedData?.isSubscriptionActive === "True"
                  ? handleUpdateSubscribe(2)
                  : handleSubscribe(2);
              }}
            >
              {decodedData?.isSubscriptionActive === "True"
                ? "Adicionar Plano Professional "
                : "Assinar Plano Professional "}
            </button>
          </div>

          {/* Card para 1 Ano */}
          <div
            style={{
              maxWidth: 300,
              padding: 24,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              flex: "1 1 300px",
              minWidth: 250,
            }}
          >
            <h2 style={{ marginBottom: 16 }}>Pacote 1 Ano</h2>
            <ul style={{ marginBottom: 24, listStyle: "none", paddingLeft: 0 }}>
              <li>✔️ Acesso total ao sistema</li>
              <li>✔️ Cadastro ilimitado de profissionais e serviços</li>
              <li>✔️ Agendamento de serviços</li>
              <li>✔️ Notificação de agendamentos</li>
              <li>✔️ Dashboard de desempenho</li>
            </ul>
            <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>
              R$ 598,80/ano
            </div>
            <button
              style={{
                background: "#2c2c2c",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px 32px",
                fontSize: 18,
                cursor: "pointer",
                width: "100%",
              }}
              onClick={() => {
                decodedData?.isSubscriptionActive === "True"
                  ? handleUpdateSubscribe(3)
                  : handleSubscribe(3);
              }}
            >
              {decodedData?.isSubscriptionActive === "True"
                ? "Adicionar Plano Professional "
                : "Assinar Plano Professional "}
            </button>
          </div>
        </div>
      )}
    </P.ContainerPage>
  );
}

export default Subscription;
