import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedContainer = styled.div`
  animation: ${fadeInUp} 0.4s ease forwards;
  width: 100%;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const SelectServiceContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  padding: 25px 75px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  gap: 2rem;
  background: white;

  @media (max-width: 768px) {
    padding: 25px 2.5rem;
    width: 100%;
  }
`;

export const ServiceContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 4rem;
  padding-bottom: 1.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid rgb(199, 199, 199);
  }

  @media (max-width: 768px) {
    & h3,
    p {
      margin: 0 auto;
    }
  }

  @media (max-width: 768px) {
    height: 16rem;
    text-align: center;
  }
`;

export const ServiceNameDescription = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 55%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ServiceDurationPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 35%;
  gap: 10%;

  @media (max-width: 1050px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    margin: 1.5rem 0;
     width: 100%;
  }
`;

export const ServiceButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 25%;
`;
