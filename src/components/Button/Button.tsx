import React from "react";
import addIcon from "../../assets/add.svg";
import removeWhite from "../../assets/removeWhite.svg";
import removeBlack from "../../assets/remove.svg";
import confirmIcon from "../../assets/confirm.svg";
import closedIcon from "../../assets/closed.svg";
import googleIcon from "../../assets/googleIcon.svg";
import * as S from "./Button.styles";

interface ButtonProps {
  $isAdd?: boolean;
  $isRemove?: boolean;
  $isClosed?: boolean;
  $isConfirm?: boolean;
  $isConfigure?: boolean;
  $isRescheduling?: boolean;
  $isRating?: boolean;
  $isBack?: boolean;
  $isLogin?: boolean;
  $isAppointment?: boolean;
  $isRegisterStore?: boolean;
  $isRegisterClient?: boolean;
  $isResend?: boolean;
  $isGoogle?: boolean;
  $isSelected?: boolean;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  $noIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  $isResend,
  disabled,
  $isGoogle,
  $isSelected,
  $isAdd,
  $isRemove,
  $isClosed,
  $isConfirm,
  $isConfigure,
  $isRescheduling,
  $isBack,
  $isLogin,
  $isAppointment,
  $isRegisterStore,
  $isRegisterClient,
  $isRating,
  type,
  $noIcon,
  onClick,
}) => {
  let icon = null;
  let buttonText = "";

  if ($isAdd) {
    icon = (
      <img
        src={addIcon}
        alt="Add Icon"
        style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
        width={25}
      />
    );
    buttonText = "Adicionar";
  } else if ($isRemove) {
    icon = (
      <img
        src={removeBlack}
        alt="Remove Icon"
        style={{ marginRight: "0.5rem" }}
      />
    );
    buttonText = "Remover";
  } else if ($isClosed) {
    icon = (
      <img
        src={closedIcon}
        alt="Close Icon"
        style={{ marginRight: "0.5rem" }}
      />
    );
    buttonText = "Fechar";
  } else if ($isConfirm) {
    icon = (
      <img
        src={confirmIcon}
        alt="Confirm Icon"
        style={{ marginRight: "0.5rem" }}
      />
    );
    buttonText = "Confirmar";
  } else if ($isConfigure) {
    icon = (
      <img
        src={confirmIcon}
        alt="Confirm Icon"
        style={{ marginRight: "0.5rem" }}
      />
    );
    buttonText = "Configuração";
  } else if ($isBack) {
    icon = (
      <img
        src={removeWhite}
        alt="Confirm Icon"
        style={{ marginRight: "0.5rem" }}
      />
    );
    buttonText = "Voltar";
  } else if ($isLogin) {
    buttonText = "Login";
  } else if ($isRegisterStore) {
    buttonText = "Registrar Empresa";
  } else if ($isRegisterClient) {
    buttonText = "Registrar Cliente";
  } else if ($isResend) {
    buttonText = "Reenviar e-mail";
  } else if ($isRescheduling) {
    buttonText = "Novo Agendamento";
  } else if ($isRating) {
    buttonText = "Avaliação";
  } else if ($isSelected) {
    buttonText = "Escolher";
  } else if ($isAppointment) {
    buttonText = "Agendar";
  } else if ($isGoogle) {
    icon = (
      <img
        src={googleIcon}
        alt="Google Icon"
        style={{ marginRight: "0.5rem" }}
      />
    );
    buttonText = "Google";
  }

  return (
    <S.Button
      disabled={disabled}
      type={type}
      $isResend={$isResend}
      $isGoogle={$isGoogle}
      $isRegisterStore={$isRegisterStore}
      $isRegisterClient={$isRegisterClient}
      $isLogin={$isLogin}
      $isBack={$isBack}
      $isAdd={$isAdd}
      $isConfigure={$isConfigure}
      $isRemove={$isRemove}
      $isClosed={$isClosed}
      $isConfirm={$isConfirm}
      $isSelected={$isSelected}
      $isRescheduling={$isRescheduling}
      $isRating={$isRating}
      $isAppointment={$isAppointment}
      style={{ margin: "0 1rem" }}
      onClick={onClick}
    >
      <span className="d-flex align-items-center justify-content-center">
        {!$noIcon && icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
        <span>{buttonText}</span>
      </span>
    </S.Button>
  );
};

export default Button;
