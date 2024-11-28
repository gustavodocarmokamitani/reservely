import React from "react";
import addIcon from '../assets/add.svg'; 
import removeIcon from '../assets/remove.svg'; 
import confirmarIcon from '../assets/confirmar.svg'; 
import fecharIcon from '../assets/fechar.svg'; 
import * as S from "./Button.styles";

interface ButtonProps {
  $isAdicionar?: boolean;
  $isRemover?: boolean;
  $isFechar?: boolean;
  $isConfirmar?: boolean;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ $isAdicionar, $isRemover, $isFechar, $isConfirmar, type, onClick }) => {
  let icon = null;
  let buttonText = "";

  if ($isAdicionar) {
    icon = <img src={addIcon} alt="Add Icon" style={{ marginRight: "8px", verticalAlign: "middle" }} width={25} />;
    buttonText = "Adicionar";
  } else if ($isRemover) {
    icon = <img src={removeIcon} alt="Remove Icon" style={{ marginRight: "8px" }} />;
    buttonText = "Remover";
  } else if ($isFechar) {
    icon = <img src={fecharIcon} alt="Close Icon" style={{ marginRight: "8px" }} />;
    buttonText = "Fechar";
  } else if ($isConfirmar) {
    icon = <img src={confirmarIcon} alt="Confirm Icon" style={{ marginRight: "8px" }} />;
    buttonText = "Confirmar";
  }

  return (
    <S.Button type={type} $isAdicionar={$isAdicionar} $isRemover={$isRemover} $isFechar={$isFechar} $isConfirmar={$isConfirmar} style={{ margin: "0 1rem" }} onClick={onClick}>
      <div className="d-flex align-items-center justify-content-center">
        {icon}
        {buttonText}
      </div>
    </S.Button>
  );
};

export default Button;
