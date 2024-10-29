import styled from "styled-components";

export const SelectedWrap = styled.div`
  display: flex;
  justity-content: center;
  flex-wrap: wrap;
  max-width: 40.5rem;
  max-height: 19rem;
  padding-top: 1rem;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export const SelectedContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 13rem;
  height: 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  margin: 0 1rem 1rem .5rem;
  cursor: pointer;


  p {
    margin: 0;
    font-size: 0.8rem !important;
    padding: 1.3rem 1.3rem;
  }

  &:focus {
    outline: none;
    border: 2px solid  rgba(0, 0, 0, 0.5);
  }
`;
