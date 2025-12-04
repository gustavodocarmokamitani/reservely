import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import * as P from "../Styles/_Page.styles";
import UserMenu from "../../components/UserMenu/UserMenu";
import { decodeToken, refreshToken } from "../../services/AuthService";
import { DecodedToken } from "../../models/DecodedToken";
import { getPaymentLink } from "../../services/MercadoPagoService";
import Button from "../../components/Button/Button";
import Pricing from "../../components/Pricing/Pricing";
import Plan from "../../components/Plan/Plan";

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
        window.open(initPoint, "_blank");
      }
    } catch (error) {
      console.error("Erro ao iniciar a assinatura:", error);
    }
  };

  const handleUpdateSubscribe = async (planId: number) => {
    try {
      const initPoint = await getPaymentLink(planId);
      if (initPoint) {
        window.open(initPoint, "_blank");
      }
    } catch (error) {
      console.error("Erro ao iniciar a assinatura:", error);
    }
  };

  const isSubscriptionActive = decodedData?.isSubscriptionActive === "True";

  const plansData = {
    monthly: [
      {
        name: "Essencial",
        price: "1,00",
        discount: "",
        per: "/mês",
        planId: 98,
        features: [
          "Até 2 funcionários",
          `Agendamento Online ilimitado`,
          "Notificação de agendamento",
        ],
      },
      {
        name: "Profissional",
        price: "99,90",
        popular: true,
        discount: "",
        per: "/mês",
        planId: 2,
        features: [
          "Tudo do Essencial",
          "Até 10 funcionários",
          "Relatórios via Dashboard",
        ],
      },
      {
        name: "Enterprise",
        price: "1,00",
        discount: "",
        per: "/mês",
        planId: 99,
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
        name: "Essencial",
        price: "548,90",
        discount: "598,80",
        per: "/ano",
        planId: 4,
        discountedPrice: "45,74",
        features: [
          "Até 2 funcionários",
          `Agendamento Online ilimitado`,
          "Notificação de agendamento",
        ],
      },
      {
        name: "Profissional",
        price: "1.098,84",
        popular: true,
        discount: "1198,80",
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
        discount: "1798,80",
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
      {isSubscriptionActive && !showPlans ? (
        <Plan
          subscriptionPlanId={3}
          subscriptionStartDate={decodedData?.subscriptionStartDate}
          subscriptionDueDate={decodedData?.subscriptionDueDate}
          subscriptionStatus={decodedData?.subscriptionStatus}
        />
      ) : (
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
            handleSubscribe={handleSubscribe}
            handleUpdateSubscribe={handleUpdateSubscribe}
            isSubscriptionActive={isSubscriptionActive}
          />
        </div>
      )}
    </P.ContainerPage>
  );
}

export default Subscription;
