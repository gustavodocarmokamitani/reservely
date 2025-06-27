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
`;

export const AppointmentContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: row;
  width: 100%;
  gap: 5rem;
  margin-bottom: 0rem;
`;

export const SelectServiceContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 9rem;
  border-radius: 15px;
  padding: 25px 75px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  gap: 2rem;
  background: white;
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
`;

export const ServiceNameDescription = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 55%;
`;

export const ServiceDurationPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 35%;
  gap: 10%;
`;

export const ServiceButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 25%;
`;

export const OpeningHoursContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 5rem;
  border-radius: 15px;
  padding: 10px 45px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  background: white;
`;

export const OpeningHoursContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid rgb(199, 199, 199);
  }
`;
