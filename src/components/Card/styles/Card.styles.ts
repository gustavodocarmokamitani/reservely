import styled from "styled-components";

export const CardStoreContainer = styled.div`
  min-width: 220px;
  height: 125px;
  padding: 25px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 25px 25px 0;
`;

// Corrigir
export const CardStoreContent = styled.div``;

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
// Corrigir
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
