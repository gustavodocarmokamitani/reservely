import styled from "styled-components";
import { motion } from "framer-motion";

// --- Container Principal (motion.div para o Hover) ---
export const Container = styled(motion.div)<{ $popular: boolean }>`
  /* Estilo Base do Card (Dark Mode) */
  border-radius: 0.75rem;
  padding: 2rem;
  border: 2px solid ${({ $popular }) => ($popular ? "#F16855" : "#868686ff")};
  background-color: ${({ $popular }) => ($popular ? "white" : "#2c2c2c")};
  transition: all 0.3s;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.9);
  max-width: 380px;
  width: 100%;

  /* Efeito Hover (usando a sintaxe do styled-components) */
  &:hover {
    transform: scale(1.03); /* Aumenta um pouco */
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.8); /* Aumenta a sombra */
  }
`;

// --- Badge "Mais Popular" ---
export const PopularBadge = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #f16855;
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.25rem 1rem;
    border-radius: 9999px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
  }
`;

// --- Nome e Descrição do Plano ---
export const PlanName = styled.span<{ $popular: boolean }>`
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
  color: ${({ $popular }) => ($popular ? "#2c2c2c" : "white")};
`;

export const PlanDescription = styled.span<{ $popular: boolean }>`
  display: block;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${({ $popular }) => ($popular ? "#4b5563" : "#9ca3af")};
`;

// --- Display de Preço ---
export const PriceContainer = styled.div`
  text-align: center;
`;

export const CurrencySign = styled.span<{ $popular: boolean }>`
  display: block;
  font-size: 1.875rem;
  font-weight: bold;
  color: ${({ $popular }) => ($popular ? "#2c2c2c" : "white")};
`;

export const PriceValue = styled.span<{ $popular: boolean }>`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ $popular }) => ($popular ? "#2c2c2c" : "white")};
`;

export const PricePeriod = styled.span<{ $popular: boolean }>`
  margin-left: 0.25rem;
  color: ${({ $popular }) => ($popular ? "#6b7280" : "#9ca3af")};
`;

// --- Lista de Funcionalidades ---
export const FeatureList = styled.ul`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
`;

export const FeatureItem = styled.li<{ $popular: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: ${({ $popular }) => ($popular ? "#4b5563" : "#d1d5db")};

  svg {
    /* Cor do ícone Check */
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    color: ${({ $popular }) => ($popular ? "#22c55e" : "#f16855")};
  }
`;
