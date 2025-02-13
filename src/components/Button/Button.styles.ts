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
  $isGoogle?: boolean;
  $isResend?: boolean;
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 200px;
  min-width: 150px;
  height: 45px;
  border: transparent;
  border-radius: 50px;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.50);
  background-color: ${(props) => {
    if (props.$isAdd) return "#2B2B2B";
    if (props.$isRemove) return "#CDCDCD";
    if (props.$isClosed) return "#FF3535";
    if (props.$isConfirm) return "#1A8439";
    if (props.$isConfigure || props.$isResend) return "#2B2B2B";
    if (props.$isBack) return "#fff";
    if (props.$isLogin) return "#2A2A2A";
    if (props.$isRegister) return "#fff";
    if (props.$isGoogle) return "#fff";
    return "#FF060B"; 
  }};
  color: ${(props) => (props.$isRemove || props.$isBack || props.$isRegister || props.$isGoogle ? "black" : "white")};
  border: 1px solid ${(props) => (props.$isBack ? "rgba(0, 0, 0, 0.50);" : "none")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
 
`;
