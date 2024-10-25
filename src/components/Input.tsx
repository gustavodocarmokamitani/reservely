import React from "react";

interface InputProps {
  placeholder: string;
  width: string;
  name?: string;
  value?: string;
  type: string;
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
  return (
    <Input
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
