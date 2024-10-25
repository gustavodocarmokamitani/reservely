import styled from "styled-components";

interface ButtonProps {
    addIconIs: boolean;
    removeIconIs: boolean;
  }

  export const Button = styled.button<ButtonProps>`
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
  color: ${(props) => {
    if (props.addIconIs && props.removeIconIs) {
      return "white";
    } else if (!props.addIconIs && !props.removeIconIs) {
      return "white"; 
    } else if (props.removeIconIs) {
      return "black";
    } else if (props.addIconIs) {
      return "white";
    }
  }};
`;