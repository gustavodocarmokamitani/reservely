import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "./Input";
import Selected from "./Selected";

interface InputGroudProfissionalProps {
  title: string;
  subTitle: string;
  handleShow: () => void;
  handleClose: () => void;
  formValuesProfissional: {
    nome: string;
    sobrenome: string;
    telefone: string;
    ativo: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroudProfissional: React.FC<InputGroudProfissionalProps> = ({
  title,
  subTitle,
  handleClose,
  handleShow,
  handleInputChange,
  formValuesProfissional,
}) => {
  return (
    <>
      <Row>
        <Col md={5} className="mt-3 mb-3">
          <div style={{ marginBottom: "20px" }}>
            <Input
              width="300"
              type="text"
              placeholder="Nome"
              name="nome"
              value={formValuesProfissional.nome}
              onChange={handleInputChange}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Input
              width="300"
              type="text"
              placeholder="Sobrenome"
              name="sobrenome"
              value={formValuesProfissional.sobrenome}
              onChange={handleInputChange}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Input
              width="300"
              type="text"
              placeholder="Telefone"
              name="telefone"
              value={formValuesProfissional.telefone}
              onChange={handleInputChange}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Input
              width="300"
              type="toggle"
              name="ativo"
              value={formValuesProfissional.ativo}
              onChange={handleInputChange}
            />
          </div>
        </Col>
        <Col md={7}>
            <Selected/>
        </Col>
      </Row>
    </>
  );
};

export default InputGroudProfissional;
