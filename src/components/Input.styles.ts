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

export const ToggleWrapper = styled.div<InputProps>`
   display: flex;
  align-items: center;
  justify-content: space-between; /* Adicione esta linha */
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
  width: ${(props) => props.width}px;
`;

export const ToggleLabel = styled.label`
  margin-right: 8px;
  font-size: 14px; 
  color: #757575;
`;

export const ToggleInput = styled.input`
  -webkit-appearance: none; 
  width: 50px; 
  height: 27px; 
  background: rgba(0, 0, 0, 0.25);  
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 15px;  
  position: relative;
  outline: none;
  cursor: pointer;
  
  &:checked {
    background: rgba(0, 128, 0, 0.7);  
  }

  &:checked::before {
    transform: translateX(25px);  
  }

  &::before {
    content: '';
    width: 25px;  
    height: 25px;  
    border-radius: 50%;  
    background: white;  
    position: absolute;
    transition: transform 0.2s; 
  }
`;
