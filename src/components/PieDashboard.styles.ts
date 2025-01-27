import { styled } from "styled-components";

export const PieDashboardContainer = styled.div`
  width: 100%;
  padding: 25px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const LeftQuadrant = styled.div`
  flex: 1 1 60%;
  min-width: 320px; 
  height: 100%;
  padding: 15px 50px 0px 15px;
  border-radius: 15px 0px 0px 15px;
`;

export const RightQuadrantContainer = styled.div`
  flex: 1 1 38%;
  min-width: 320px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RightTopQuadrant = styled.div`
  flex: 1;
  border-radius: 0px 15px 0px 0px;
`;
