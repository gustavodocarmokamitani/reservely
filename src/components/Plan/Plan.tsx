import React from "react";
import { motion } from "framer-motion";
import * as S from "./Plan.styles"; // Assumindo que você tem Plan.styles.ts no mesmo diretório
import { formatDataMonth } from "../../services/system/globalService";

// Mock Icons (Ícones que você forneceu)
const Star = (props: any) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.917 1.48-8.279-6.064-5.828 8.332-1.151z" />
  </svg>
);
const Check = (props: any) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

// Dados dos planos com IDs de string para busca
const currentPlans = [
  {
    id: "plan-basico", // ID de busca: 1
    name: "Básico",
    price: "49,90",
    per: "/mês",
    popular: false,
    features: [
      "Até 2 funcionários",
      "Agendamentos ilimitados",
      "Notificação integrada com E-mail",
    ],
    description: "Ideal para quem está começando.",
  },
  {
    id: "plan-essencial", // ID de busca: 2
    name: "Essencial",
    price: "99,90",
    per: "/mês",
    popular: true,
    features: ["Tudo do Básico", "Página de dashboard para análise gráfica"],
    description: "A solução completa para o crescimento do seu negócio.",
  },
  {
    id: "plan-enterprise", // ID de busca: 3
    name: "Enterprise",
    price: "149,90",
    per: "/mês",
    popular: false,
    features: [
      "Tudo do Essencial",
      "Planejamento financeiro",
      "Marketing Digital",
    ],
    description: "Para operações que buscam máxima performance e estratégia.",
  },
];

interface PlanProps {
  subscriptionPlanId?: string | number;
  subscriptionStartDate?: string | number;
  subscriptionDueDate?: string | number;
  subscriptionStatus?: string | number;
}

/**
 * Mapeia o ID de entrada (numérico ou string curta) para o ID de string definido em currentPlans.
 * @param input O ID recebido, ex: '1'
 * @returns O ID formatado para busca, ex: 'plan-basico'
 */
const mapPlanId = (input: string | number | undefined): string | undefined => {
  if (!input) return undefined;

  // Garante que o input é tratado como string
  const idString = String(input);

  switch (idString) {
    case "1":
      return "plan-basico";
    case "2":
      return "plan-essencial";
    case "3":
      return "plan-enterprise";
    // Caso o input já venha formatado corretamente
    case "plan-basico":
    case "plan-essencial":
    case "plan-enterprise":
      return idString;
    default:
      return undefined;
  }
};

const Plan: React.FC<PlanProps> = ({
  subscriptionPlanId,
  subscriptionStartDate,
  subscriptionDueDate,
  subscriptionStatus,
}) => {
  const mappedId = mapPlanId(subscriptionPlanId);

  const activePlan = currentPlans.find((p) => p.id === mappedId);

  if (!activePlan) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "4rem",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Plano Atual</h1>
      <S.Container
        key={activePlan.name}
        $popular={activePlan.popular}
        variants={{
          center: { opacity: 1, y: 0, scale: 1 },
        }}
        initial="center"
        transition={{ duration: 0.15, delay: 0 }}
      >
        {/* Nome e Descrição */}
        <S.PlanName $popular={activePlan.popular}>{activePlan.name}</S.PlanName>
        <S.PlanDescription $popular={activePlan.popular}>
          {activePlan.description}
        </S.PlanDescription>

        {/* Preço */}
        <S.PriceContainer>
          <S.CurrencySign $popular={activePlan.popular}>até</S.CurrencySign>
          <S.PriceValue $popular={activePlan.popular}>
            {formatDataMonth(String(subscriptionDueDate))}
          </S.PriceValue>
        </S.PriceContainer>

        {/* Botão de Status (sempre desabilitado para o plano atual) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1.2rem 0",
          }}
        >
          <span
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#1A8439",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "default",
            }}
          >
            {subscriptionStatus === "approved" ? "ATIVADO" : "SEM PLANO ATIVO"}
          </span>
        </div>

        {/* Lista de Funcionalidades */}
        <S.FeatureList>
          {activePlan.features.map((feature) => (
            <S.FeatureItem key={feature} $popular={activePlan.popular}>
              <Check />
              <span>{feature}</span>
            </S.FeatureItem>
          ))}
        </S.FeatureList>
      </S.Container>
    </div>
  );
};

export default Plan;
