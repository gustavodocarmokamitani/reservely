import styled from "styled-components";

interface InputFormComponentProps {
  width: string;
}

interface ButtonRoundedComponentProps {
  addIconIs: boolean;
  removeIconIs: boolean;
}

export const InputFormComponent = styled.input<InputFormComponentProps>`
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

export const ButtonRoundedComponent = styled.button<ButtonRoundedComponentProps>`
  width: 150px;
  height: 45px;
  border: transparent;
  border-radius: 50px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.50);
  background-color: ${(props) => {
    if (props.addIconIs && props.removeIconIs) {
      return "#FF060B";
    } else if (!props.addIconIs && !props.removeIconIs) {
      return "#FF060B"; 
    } else if (props.removeIconIs) {
      return "#CDCDCD";
    } else if (props.addIconIs) {
      return "#2B2B2B";
    }
  }};
  color: white;
`;

