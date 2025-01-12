import React, { useState } from "react";
import * as S from "./Input.styles";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
            {showPassword ? <FaEyeSlash size={18}/> : <FaEye />}
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

  return renderPasswordField(type);
};

export default Input;
