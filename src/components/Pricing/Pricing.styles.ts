import { motion } from "framer-motion";
import { Check } from "lucide-react";
import styled from "styled-components";

const MOBILE_BREAKPOINT = "1324px";

export const PlanContainer = styled(motion.div)<{ $isPopular: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  border-radius: 1rem;
  border: 2px solid ${({ $isPopular }) => ($isPopular ? "#F16855" : "#374151")};
  background-color: ${({ $isPopular }) => ($isPopular ? "white" : "#1f2937")};
  transition: all 0.3s ease-in-out;
  color: ${({ $isPopular }) => ($isPopular ? "#2C2C2C" : "white")};
`;

export const PopularBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #f16855;
  color: white;
  font-size: 0.875rem; /* text-sm */
  font-weight: 600; /* font-semibold */
  padding: 0.25rem 1rem;
  border-radius: 9999px; /* rounded-full */
  margin-bottom: 1rem;
`;

export const Title = styled.h3<{ $isPopular: boolean }>`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700; /* font-bold */
  text-align: center;
  margin-bottom: 0.5rem;
  color: ${({ $isPopular }) => ($isPopular ? "#2C2C2C" : "white")};
`;

export const SubTitle = styled.p<{ $isPopular: boolean }>`
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${({ $isPopular }) => ($isPopular ? "#4b5563" : "#9ca3af")};
`;

export const PricingContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  padding: 0 4rem;
  margin-bottom: 8rem;
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

export const Price = styled.span<{ $isPopular: boolean }>`
  font-size: 3rem; /* text-5xl */
  font-weight: 700; /* font-bold */
  color: ${({ $isPopular }) => ($isPopular ? "#2C2C2C" : "white")};
`;

export const Currency = styled.span<{ $isPopular: boolean }>`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700; /* font-bold */
  color: ${({ $isPopular }) => ($isPopular ? "#2C2C2C" : "white")};
`;

export const Per = styled.span<{ $isPopular: boolean }>`
  margin-left: 0.25rem;
  color: ${({ $isPopular }) => ($isPopular ? "#6b7280" : "#9ca3af")};
`;

export const FeaturesList = styled.ul`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FeatureItem = styled.li<{ $isPopular: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: ${({ $isPopular }) => ($isPopular ? "#4b5563" : "#d1d5db")};
`;

export const CheckIcon = styled(Check)<{ $isPopular: boolean }>`
  width: 1.25rem; /* w-5 */
  height: 1.25rem; /* h-5 */
  margin-top: 0.25rem;
  flex-shrink: 0;
  color: ${({ $isPopular }) => ($isPopular ? "#22c55e" : "#f16855")};
`;
