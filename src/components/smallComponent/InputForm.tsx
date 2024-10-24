import React from "react";
import { InputFormComponent } from "./_SmallComponentStyled";


interface InputFormProps {
  placeholder: string;
  width: string;
  name: string;
  value: string;
  type: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  placeholder,
  width,
  name,
  value,
  type,
  onChange
}) => {
  return (
    <InputFormComponent
      placeholder={placeholder}
      width={width}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};

export default InputForm;
