import styled from "styled-components";

interface ButtonProps {
  text: "adicionar" | "remover" | "fechar" | "confirmar";
}

export const Button = styled.button<ButtonProps>`
  width: 150px;
  height: 45px;
  border: transparent;
  border-radius: 50px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.50);
  background-color: ${(props) => {
    switch (props.text) {
      case "adicionar":
        return "#2B2B2B"; 
      case "remover":
        return "#CDCDCD";
      case "fechar":
        return "#FF3535"; 
      case "confirmar":
        return "#1A8439"; 
      default:
        return "#FF060B"; 
    }
  }};
  color: ${(props) => {
    return (props.text === "remover") ? "black" : "white";
  }};
`;
