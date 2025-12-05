import { styled } from "styled-components";

export const ChartDashboardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export const ChartDashboardWrapper = styled.div`
  width: 49.5%;
  padding: 25px;
  margin: 15px 0px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  background-color: white;

  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }
`;

export const ChartDashboardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 100%;
`;
