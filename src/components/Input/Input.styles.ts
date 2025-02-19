import styled from "styled-components";

interface InputProps {
  width: string;
}

export const InputWrapper = styled.div<InputProps>`
  position: relative;
  width: ${(props) => Number(props.width) / (window.innerWidth > 1467 ? 16 : 12)}rem;
  height: 70px;
`;

export const PasswordIcon = styled.div`
  position: relative;
  top: -35px;
  left: 300px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #0;
`;

export const Input = styled.input<InputProps>`
  width: ${(props) => Number(props.width) / (window.innerWidth > 1467 ? 16 : 12)}rem;
  height: 3.125rem;
  padding: 0 1.562rem;
  font-size: 0.875rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.93rem;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);
  margin: 0.625rem 0;

  &:focus {
    outline: none;
    border: 2px solid rgba(0, 0, 0, 0.5);
  }

  &::placeholder {
    font-size: 1rem;    
  }
`;

export const ToggleWrapper = styled.div<InputProps>`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adicione esta linha */
  width: ${(props) => Number(props.width) / (window.innerWidth > 1467 ? 16 : 12)}rem;
  height: 3.125rem;
  padding: 0 25px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.93rem;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
    border: 2px solid rgba(0, 0, 0, 0.5);
  }
`;

export const ToggleLabel = styled.label`
  margin-right: 8px;
  font-size: 1rem;
  color: #757575;
`;

export const ToggleInput = styled.input`
  -webkit-appearance: none;
  width: 3.125rem;
  height: 1.68rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.9375rem;
  position: relative;
  outline: none;
  cursor: pointer;

  &:checked {
    background: rgba(0, 128, 0, 0.7);
  }

  &:checked::before {
    transform: translateX(1.45rem);
  }

  &::before {
    content: "";
    width: 1.56rem;
    height: 1.54rem;
    border-radius: 50%;
    background: white;
    position: absolute;
    transition: transform 0.2s;
  }
`;
