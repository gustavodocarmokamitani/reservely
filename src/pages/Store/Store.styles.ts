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
    margin: 0 !important;
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

  @media (max-width: 768px) {
    padding-left: 3rem;
  }
`;

export const StoreSectionOne = styled.div`
  max-width: 350px;
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

export const Copy = styled.div`
  display: flex;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 2px;
  border: 1px solid #eee;
  border-radius: 15px;
  box-shadow: 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.6);
  }

  &:active {
    background-color: rgb(77, 76, 76);
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.5);
  }

  .copy-text {
    width: 100%;
    height: 100%;
    padding: 4px 16px;
    font-size: 14px;
    border-radius: 25px 0px 0px 25px;
    background-color: #2c2c2c;
    text-align: center;
    color: white;
    cursor: pointer;
  }

  .copy-button {
    height: 100%;
    width: 120px;
    padding: 4px 0px;
    font-size: 14px;
    border-left: 1px solid #ddd;
    border-radius: 0px 25px 25px 0px;
    background-color: #2c2c2c;
    text-align: center;
    color: white;
    cursor: pointer;
  }
`;
