import styled from "styled-components";

interface ButtonProps {
  isAdicionar?: boolean;
  isRemover?: boolean;
  isFechar?: boolean;
  isConfirmar?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 150px;
  height: 45px;
  border: transparent;
  border-radius: 50px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.50);
  background-color: ${(props) => {
    if (props.isAdicionar) return "#2B2B2B";
    if (props.isRemover) return "#CDCDCD";
    if (props.isFechar) return "#FF3535";
    if (props.isConfirmar) return "#1A8439";
    return "#FF060B"; // cor padrão
  }};
  color: ${(props) => (props.isRemover ? "black" : "white")};
`;
