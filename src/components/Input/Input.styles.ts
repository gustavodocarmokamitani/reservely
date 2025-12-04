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
  position: absolute;
  left: 89%;
  top: 50%;
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

export const ToggleWrapper = styled.div`
background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adicione esta linha */
  width: 100%;    
  height: 3.125rem;
  padding: 0 25px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.93rem;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
    border: 2px solid rgba(0, 0, 0, 0.5);
  }
  width: 100%;
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
