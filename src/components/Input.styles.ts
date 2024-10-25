import styled from "styled-components";

interface InputProps {
  width: string;
}

export const Input = styled.input<InputProps>`
  width: ${(props) => props.width}px; 
  height: 50px;
  padding: 0 25px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 15px;  
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
    border: 2px solid  rgba(0, 0, 0, 0.5);
  }
`;

