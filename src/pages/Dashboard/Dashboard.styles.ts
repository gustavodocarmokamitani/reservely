import { styled } from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 50px;
  padding: 0px;
  
  & div:nth-child(1) {
    margin: 0 auto !important;
    padding-right: 15px;
  }
  & div:nth-child(2) {
    margin: 0 auto !important;
    padding: 15px;
  }
  & div:nth-child(3) {
    margin: 0 auto !important;
    padding-left: 15px;
  }
`;
