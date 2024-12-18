import React from "react";
import addIcon from '../assets/add.svg'; 
import removeIcon from '../assets/remove.svg'; 
import confirmIcon from '../assets/confirm.svg'; 
import closedIcon from '../assets/closed.svg'; 
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
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ $isAdd, $isRemove, $isClosed, $isConfirm, $isConfigure, $isBack, $isLogin, $isRegister, type, onClick }) => {
  let icon = null;
  let buttonText = "";

  if ($isAdd) {
    icon = <img src={addIcon} alt="Add Icon" style={{ marginRight: "8px", verticalAlign: "middle" }} width={25} />;
    buttonText = "Adicionar";
  } else if ($isRemove) {
    icon = <img src={removeIcon} alt="Remove Icon" style={{ marginRight: "8px" }} />;
    buttonText = "Remover";
  } else if ($isClosed) {
    icon = <img src={closedIcon} alt="Close Icon" style={{ marginRight: "8px" }} />;
    buttonText = "Fechar";
  } else if ($isConfirm) {
    icon = <img src={confirmIcon} alt="Confirm Icon" style={{ marginRight: "8px" }} />;
    buttonText = "Confirmar";
  } else if ($isConfigure) {
    icon = <img src={confirmIcon} alt="Confirm Icon" style={{ marginRight: "8px" }} />;
    buttonText = "Configuração";
  } else if ($isBack) {
    icon = <img src={removeIcon} alt="Confirm Icon" style={{ marginRight: "8px" }} />;
    buttonText = "Voltar";
  } else if ($isLogin) {
    buttonText = "Login";
  } else if ($isRegister) {
    buttonText = "Registrar";
  }

  return (
    <S.Button type={type} $isRegister={$isRegister} $isLogin={$isLogin} $isBack={$isBack} $isAdd={$isAdd} $isConfigure={$isConfigure}  $isRemove={$isRemove} $isClosed={$isClosed} $isConfirm={$isConfirm} style={{ margin: "0 1rem" }} onClick={onClick}>
      <div className="d-flex align-items-center justify-content-center">
        {icon}
        {buttonText}
      </div>
    </S.Button>
  );
};

export default Button;
