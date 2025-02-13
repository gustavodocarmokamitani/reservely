import styled from "styled-components";

export const ContainerPage = styled.div`
  width: calc(100vw - 19.98rem);
  height: 100%;
  padding: 80px;
  margin-left: 10px;
  background: #fafafa;
`;

export const ContainerLogin = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 40px;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerRegister = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 40px;
`;

export const WrapperLogin = styled.div`
  width: 400px;
  height: 600px;
  background-color: f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    margin: 15px !important;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const WrapperVerticalLogin = styled.div`
  width: 1400px;
  height: 800px;
  background-color: f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: #ebebeb;
  border-radius: 15px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.5);
`;

export const ParagraphThin = styled.p`
  font-size: 12px !important;
  color: rgb(131, 131, 131) !important;
`;

export const ContainerReSendEmail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

`;
