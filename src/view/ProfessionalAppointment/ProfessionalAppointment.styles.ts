import styled from "styled-components";

export const AppointmentContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: row;
  width: 100%;
  gap: 5rem;
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
