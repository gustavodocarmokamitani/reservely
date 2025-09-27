import { Row } from "react-bootstrap";
import styled from "styled-components";

interface IndicatorProps {
  top: number;
}

export const SidebarContainer = styled.div`
  min-width: 18rem;
  position: fixed;
  box-shadow: 8px 0px 7px rgba(0, 0, 0, 0.25);
  border-radius: 0px 15px 15px 0px;
  background: white;
`;

export const MenuContainer = styled.div`
  height: 2.75rem;
  cursor: pointer;
  margin: 0.625rem;
`;

export const StyledRow = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  padding-left: 1.25rem;
  border-radius: 25px;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  cursor: pointer;

    &:hover {
      border: 1px solid #eaeaea;
      box-shadow: 8px 0px 7px rgba(0, 0, 0, 0.05);
  }
`;

export const Indicator = styled.div<IndicatorProps>`
  position: absolute;
  top: ${(props) => props.top}rem;
  left: 10px;
  width: 93.5%;
  height: 2.75rem;
  background-color: #f5f5f5ff;
  border-radius: 25px;
  transition: top 0.5s ease-in-out;
  box-shadow: 0px 0px 3px .5px rgba(2, 2, 2, 0.1);
  z-index: -1;
`;
