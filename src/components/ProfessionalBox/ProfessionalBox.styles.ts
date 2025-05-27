import styled from "styled-components";

export const SelectedWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 40.5rem;
  max-height: 22rem;
  padding-top: 1rem;
  overflow-y: auto;
  scroll-behavior: smooth;
  width: 100%;
  gap: 1.5rem;
`;

export const SelectedContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 20rem;
  height: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  margin: 0 1rem 1rem 0.5rem;
  cursor: pointer;

  p {
    margin: 0;
    font-size: 0.8rem !important;
    padding: 1.3rem 1.3rem;
  }

  &:focus {
    outline: none;
    border: 2px solid rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    margin: 1.5rem 0;
  }
`;
