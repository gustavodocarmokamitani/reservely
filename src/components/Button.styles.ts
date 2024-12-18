import styled from "styled-components";

interface ButtonProps {
  $isAdd?: boolean;
  $isRemove?: boolean;
  $isClosed?: boolean;
  $isConfirm?: boolean;
  $isConfigure?: boolean;
  $isBack?: boolean;
  $isLogin?: boolean;
  $isRegister?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 200px;
  height: 45px;
  border: transparent;
  border-radius: 50px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.50);
  background-color: ${(props) => {
    if (props.$isAdd) return "#2B2B2B";
    if (props.$isRemove) return "#CDCDCD";
    if (props.$isClosed) return "#FF3535";
    if (props.$isConfirm) return "#1A8439";
    if (props.$isConfigure) return "#346eba";
    if (props.$isBack) return "#fff";
    if (props.$isLogin) return "#2A2A2A";
    if (props.$isRegister) return "#fff";
    return "#FF060B"; 
  }};
  color: ${(props) => (props.$isRemove || props.$isBack || props.$isRegister ? "black" : "white")};
  border: 1px solid ${(props) => (props.$isBack ? "black" : "none")};
`;

