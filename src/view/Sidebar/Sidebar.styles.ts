import { Row } from "react-bootstrap";
import styled from "styled-components";

interface IndicatorProps {
  top: number;
}

export const SidebarContainer = styled.div`
  min-width: 18.75rem;
  position: fixed;
  box-shadow: 8px 0px 7px rgba(0, 0, 0, 0.25);
  border-radius: 0px 25px 25px 0px;
`;

export const MenuContainer = styled.div`
  height: 2.75rem;
  cursor: pointer;
  margin: 10px;
`;

export const StyledRow = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  padding-left: 20px;
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
  top: ${(props) => props.top}px;
  left: 10px;
  width: 95%;
  height: 2.75rem;
  background-color: #fff;
  border-radius: 25px;
  transition: top 0.5s ease-in-out;
  box-shadow: 2px 0px 7px rgba(0, 0, 0, 0.05);
  z-index: -1;

  @media (max-width: 1281px) {
    & {
      top: ${(props) => props.top - 5}px !important;
    }
  }
`;

// top: ${(props) => (props.top - 5)}px;
