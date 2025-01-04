import React from "react";
import * as S from "./Input.styles";

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

  return (
    <S.Input
      placeholder={placeholder}
      width={width}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};

export default Input;
