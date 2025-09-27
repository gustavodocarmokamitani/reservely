import { motion } from "framer-motion";
import styled from "styled-components";

export const CardHomeClientPlanContainer = styled(motion.div)<{
  $isHistory: boolean;
}>`
  border-radius: 0.75rem;
  padding: 2rem;
  border: 2px solid "#868686ff";
  background-color: white;
  transition: all 0.3s;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.9);
  max-width: 380px;
  width: 100%;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.8);
  }
`;
 
export const CardHomeClientTitle = styled.h4<{ $isHistory: boolean }>`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
  color: ${({ $isHistory }) => ($isHistory ? "#2c2c2c" : "#F16855")};
`;

export const CardStoreContainer = styled.div`
  width: 100%;
  height: 7.8125rem;
  padding: 1.5625rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.937rem;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px 25px 0;

  & img {
    margin-bottom: 10px;
  }
`;

export const CardDashboardContainer = styled.div`
  min-width: 245px;
  width: 98%;
  height: 125px;
  padding: 25px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 25px 25px 0;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const CardDashboardContent = styled.div`
  width: 49.5%;
  min-width: 300px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

export const CardTitleHomeClientContainer = styled.div`
  width: 20rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2c2c2c;
  border-left: 1px solid #9c9c9c;
  border-top: 1px solid #9c9c9c;
  border-right: 1px solid #9c9c9c;
  border-radius: 15px 15px 0px 0px;

  h4 {
    color: white !important;
  }
`;

export const CardBodyHomeClientContainer = styled.div`
  width: 20rem;
  height: 100%;
  padding: 1.5625rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #9c9c9c;
  background: white;
`;

export const CardFooterHomeClientContainer = styled.div`
  width: 20rem;
  height: 4.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #9c9c9c;
  border-bottom: 1px solid #9c9c9c;
  border-right: 1px solid #9c9c9c;
  border-radius: 0px 0px 15px 15px;
  background: white;
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const CardScroll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
`;

export const Paragraph = styled.div`
  font-size: 0.875rem;
  padding: 0.5rem 0.15rem;
  text-align: center;
`;

export const TextCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
