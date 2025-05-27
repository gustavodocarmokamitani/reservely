import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 70px;
`;

export const PasswordIcon = styled.div`
  position: relative;
  top: -35px;
  left: 300px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #000;
`;


export const Input = styled.input`
  width: 100%;
  height: 3.125rem;
  padding: 0 1.562rem;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 15px;  
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  margin: 10px 0;
  &:focus {
    outline: none;
    border: 2px solid  rgba(0, 0, 0, 0.5);
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adicione esta linha */
  width: 100%;    
  height: 3.125rem;
  padding: 0 25px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 15px;  
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
    border: 2px solid  rgba(0, 0, 0, 0.5);
  }
  width: 100%;
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
