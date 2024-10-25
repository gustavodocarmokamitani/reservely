import React from "react";
import addIcon from '../assets/add.svg'; 
import removeIcon from '../assets/remove.svg'; 
import confirmarIcon from '../assets/confirmar.svg'; 
import fecharIcon from '../assets/fechar.svg'; 
import * as S from "./Button.styles";

interface ButtonProps {
  text: "adicionar" | "remover" | "fechar" | "confirmar";
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, type, onClick }) => {
  let icon = null;

  if (text === "adicionar") {
    icon = <img src={addIcon} alt="Add Icon" style={{ marginRight: "8px", verticalAlign: "middle" }} width={25} />;
  } else if (text === "remover") {
    icon = <img src={removeIcon} alt="Remove Icon" style={{ marginRight: "8px" }} />;
  } else if (text === "fechar") {
    icon = <img src={fecharIcon} alt="Close Icon" style={{ marginRight: "8px" }} />; 
  } else if (text === "confirmar") {
    icon = <img src={confirmarIcon} alt="Confirm Icon" style={{ marginRight: "8px" }} />; 
  }

  const formattedText = text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <S.Button type={type} text={text} style={{ margin: "0 1rem" }} onClick={onClick}>
      <div className="d-flex align-items-center justify-content-center">
        {icon}
        {formattedText}
      </div>
    </S.Button>
  );
};

export default Button;
