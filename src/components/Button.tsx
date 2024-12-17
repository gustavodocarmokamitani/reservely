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
  $isConfigurar?: boolean;
  $isVoltar?: boolean;
  $isLogin?: boolean;
  $isRegistrar?: boolean;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ $isAdicionar, $isRemover, $isFechar, $isConfirmar, $isConfigurar, $isVoltar, $isLogin, $isRegistrar, type, onClick }) => {
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
  } else if ($isConfigurar) {
    icon = <img src={confirmarIcon} alt="Confirm Icon" style={{ marginRight: "8px" }} />;
    buttonText = "Configuração";
  } else if ($isVoltar) {
    icon = <img src={removeIcon} alt="Confirm Icon" style={{ marginRight: "8px" }} />;
    buttonText = "Voltar";
  } else if ($isLogin) {
    buttonText = "Login";
  } else if ($isRegistrar) {
    buttonText = "Registrar";
  }

  return (
    <S.Button type={type} $isRegistrar={$isRegistrar} $isLogin={$isLogin} $isVoltar={$isVoltar} $isAdicionar={$isAdicionar} $isConfigurar={$isConfigurar}  $isRemover={$isRemover} $isFechar={$isFechar} $isConfirmar={$isConfirmar} style={{ margin: "0 1rem" }} onClick={onClick}>
      <div className="d-flex align-items-center justify-content-center">
        {icon}
        {buttonText}
      </div>
    </S.Button>
  );
};

export default Button;
