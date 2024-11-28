import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "./Input";
import Selected from "./Selected";

interface InputGroudProfissionalProps {
  formValuesProfissional: {
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    ativo: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleServiceSelection: (selectedServices: number[]) => void; 
  dataTipoServico: { id: number; nome: string }[];
}

const InputGroudProfissional: React.FC<InputGroudProfissionalProps> = ({
  formValuesProfissional,
  handleInputChange,
  handleServiceSelection, 
  dataTipoServico
}) => (
  <Row>
    <Col md={4} className="mt-3 mb-3">
      {["nome", "sobrenome", "email", "telefone", "ativo"].map((field) => (
        <Input
          key={field}
          width="300"
          type={field === "ativo" ? "toggle" : "text"}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          name={field}
          value={formValuesProfissional[field as keyof typeof formValuesProfissional]}
          onChange={handleInputChange}
        />
      ))}
    </Col>
    <Col md={8}>
      <Selected
        options={dataTipoServico}
        onChange={handleServiceSelection} 
        addProf
      />
    </Col>
  </Row>
);

export default InputGroudProfissional;
