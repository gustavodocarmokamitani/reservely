import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "./Input";

interface InputGroudServicoProps {
  title: string;
  subTitle: string;
  handleShow: () => void;
  handleClose: () => void;
  formValuesServico: {
    nome: string;
    valor: string;
    duracao: string;
    ativo: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroudServico: React.FC<InputGroudServicoProps> = ({
  title,
  subTitle,
  handleClose,
  handleShow,
  handleInputChange,
  formValuesServico,
}) => {
  return (
    <>
      <Row>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="text"
            placeholder="Nome"
            name="nome"
            value={formValuesServico.nome}
            onChange={handleInputChange}
          />
        </Col>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="text"
            placeholder="Valor"
            name="valor"
            value={formValuesServico.valor}
            onChange={handleInputChange}
          />
        </Col>
      </Row>
      <Row>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="text"
            placeholder="Duração"
            name="duracao"
            value={formValuesServico.duracao}
            onChange={handleInputChange}
          />
        </Col>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="toggle"
            name="ativo"
            value={formValuesServico.ativo}
            onChange={handleInputChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default InputGroudServico;
