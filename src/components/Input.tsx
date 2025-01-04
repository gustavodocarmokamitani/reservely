import React, { useState } from "react";
import * as S from "./Input.styles";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importe os ícones

interface InputProps {
  placeholder?: string; 
  width: string;
  name?: string;
  value?: string;
  type: "text" | "toggle" | "number" | "password" | "email"; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  width,
  name,
  value,
  type,
  onChange
}) => {
  const [showPassword, setShowPassword] = useState(false); // Controle de visibilidade da senha

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Alterna entre mostrar e esconder a senha
  };

  // Função genérica que decide se deve mostrar o ícone de olho ou não
  const renderPasswordField = (inputType: string) => {
    if (inputType === "password") {
      return (
        <S.InputWrapper width={width}>
          <S.Input
            placeholder={placeholder}
            width={width}
            name={name}
            value={value}
            type={showPassword ? "text" : "password"} 
            onChange={onChange}
          />
          <S.PasswordIcon onClick={handleTogglePasswordVisibility}>
            {showPassword ? <FaEyeSlash size={18}/> : <FaEye />} {/* Ícone de olho */}
          </S.PasswordIcon>
        </S.InputWrapper>
      );
    }

    return (
      <S.Input
        placeholder={placeholder}
        width={width}
        name={name}
        value={value}
        type={inputType}
        onChange={onChange}
      />
    );
  };

  if (type === "toggle") {
    return (
      <S.ToggleWrapper width={width}>
        <S.ToggleLabel>Ativo</S.ToggleLabel>
        <S.ToggleInput
          type="checkbox"
          name={name}
          checked={value === "true"} 
          onChange={onChange}
        />
      </S.ToggleWrapper>
    );
  }

  return renderPasswordField(type); // Usa a função genérica para lidar com password e outros tipos
};

export default Input;
