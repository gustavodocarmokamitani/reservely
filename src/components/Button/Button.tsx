import React from "react";
import addIcon from '../../assets/add.svg'; 
import removeIcon from '../../assets/remove.svg'; 
import confirmIcon from '../../assets/confirm.svg'; 
import closedIcon from '../../assets/closed.svg'; 
import googleIcon from '../../assets/googleIcon.svg';
import * as S from "./Button.styles";

interface ButtonProps {
  $isAdd?: boolean;
  $isRemove?: boolean;
  $isClosed?: boolean;
  $isConfirm?: boolean;
  $isConfigure?: boolean;
  $isBack?: boolean;
  $isLogin?: boolean;
  $isRegister?: boolean;
  $isResend?: boolean;
  $isGoogle?: boolean;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ $isResend, disabled, $isGoogle, $isAdd, $isRemove, $isClosed, $isConfirm, $isConfigure, $isBack, $isLogin, $isRegister, type, onClick }) => {
  let icon = null;
  let buttonText = "";

  if ($isAdd) {
    icon = <img src={addIcon} alt="Add Icon" style={{ marginRight: "0.5rem", verticalAlign: "middle" }} width={25} />;
    buttonText = "Adicionar";
  } else if ($isRemove) {
    icon = <img src={removeIcon} alt="Remove Icon" style={{ marginRight: "0.5rem" }} />;
    buttonText = "Remover";
  } else if ($isClosed) {
    icon = <img src={closedIcon} alt="Close Icon" style={{ marginRight: "0.5rem" }} />;
    buttonText = "Fechar";
  } else if ($isConfirm) {
    icon = <img src={confirmIcon} alt="Confirm Icon" style={{ marginRight: "0.5rem" }} />;
    buttonText = "Confirmar";
  } else if ($isConfigure) {
    icon = <img src={confirmIcon} alt="Confirm Icon" style={{ marginRight: "0.5rem" }} />;
    buttonText = "Configuração";
  } else if ($isBack) {
    icon = <img src={removeIcon} alt="Confirm Icon" style={{ marginRight: "0.5rem" }} />;
    buttonText = "Voltar";
  } else if ($isLogin) {
    buttonText = "Login";
  } else if ($isRegister) {
    buttonText = "Registrar";
  } else if ($isResend) {
    buttonText = "Reenviar e-mail";
  } else if ($isGoogle) {
    icon = <img src={googleIcon} alt="Google Icon" style={{ marginRight: "0.5rem" }} />;
    buttonText = "Google";
  }

  return (
    <S.Button disabled={disabled} type={type} $isResend={$isResend} $isGoogle={$isGoogle} $isRegister={$isRegister} $isLogin={$isLogin} $isBack={$isBack} $isAdd={$isAdd} $isConfigure={$isConfigure}  $isRemove={$isRemove} $isClosed={$isClosed} $isConfirm={$isConfirm} style={{ margin: "0 1rem" }} onClick={onClick}>
      <span className="d-flex align-items-center justify-content-center">
        {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
        <span>{buttonText}</span>
      </span>
    </S.Button>
  );
};

export default Button;
