import React, { useState } from "react";
import * as S from "./Input.styles";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  placeholder?: string;  
  name?: string;
  value?: string;
  type: "text" | "toggle" | "number" | "password" | "email";
  phone?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,  
  name,
  value,
  type,
  phone,
  onChange
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const formatPhoneNumber = (input: string) => {
    const digits = input.replace(/\D/g, ""); 

    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (phone) {
      newValue = formatPhoneNumber(newValue);
    }

    if (onChange) {
      event.target.value = newValue;
      onChange(event);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const renderPasswordField = (inputType: string) => {
    if (inputType === "password") {
      return (
        <S.InputWrapper>
          <S.Input
            placeholder={placeholder}            
            name={name}
            value={value}
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
          />
          <S.PasswordIcon onClick={handleTogglePasswordVisibility}>
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye />}
          </S.PasswordIcon>
        </S.InputWrapper>
      );
    }

    return (
      <S.Input
        placeholder={placeholder}        
        name={name}
        value={value}
        type={inputType}
        onChange={handleInputChange}
      />
    );
  };

  if (type === "toggle") {
    return (
      <S.ToggleWrapper>
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
