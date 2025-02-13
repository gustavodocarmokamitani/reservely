import styled from "styled-components";

export const StoreContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;
export const StoreContent = styled.div`
  margin-right: 25px;
  margin-bottom: 30px;

  & input {
    margin: 0; !important
  }
`;

export const CardStoreWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Store = styled.div`
  display: flex;
  width: 100vw;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const StoreSectionOne = styled.div`
    width: 350px
    flex-shrink: 0;

    @media (max-width: 1200px) {
    width: 100%; 
  }
`;

export const StoreSectionTwo = styled.div`
  flex: 1;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    margin-left: 0;
    width: 100%;
  }
`;
