import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import * as S from "./Modal.styles";
import InputGroudServico from "../components/InputGroudServico";
import closeIcon from "../assets/remove.svg";
import InputGroudProfissional from "../components/InputGroudProfissional";

interface ModalProps {
  title: string;
  subTitle: string;
  type: "servico" | "profissional";
  handleShow: () => void;
  handleClose: () => void;
  size: "pequeno" | "medio" | "grande";
}

const Modal: React.FC<ModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  type,
  size,
}) => {
  const [formValuesServico, setFormValuesServico] = useState({
    nome: "",
    valor: "",
    duracao: "",
    ativo: "false",
  });

  const [formValuesProfissional, setFormValuesProfissional] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    ativo: "false",
  });

  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;

    if (type === "checkbox") {
      setFormValuesServico({
        ...formValuesServico,
        [name]: checked ? "true" : "false",
      });
    } else {
      setFormValuesServico({
        ...formValuesServico,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    console.log("Dados do formulário:", formValuesServico);

    handleClose();
  };

  return (
    <S.Overlay>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: sizeMap[size],
          width: "100%",
        }}
      >
        <Row>
          <Col md={10}>
            <h3>{title}</h3>
            <p>{subTitle}</p>
          </Col>
          <Col
            md={2}
            style={{ textAlign: "right", cursor: "pointer" }}
            onClick={handleClose}
          >
            <img
              src={closeIcon}
              alt="Close Icon"
              style={{ marginRight: "8px", verticalAlign: "middle" }}
              width={25}
            />
          </Col>
          <hr />
        </Row>
        {type == "servico" && (
          <InputGroudServico
            title={title}
            subTitle={subTitle}
            handleShow={handleShow}
            handleClose={handleClose}
            formValuesServico={formValuesServico}
            handleInputChange={handleInputChange}
          />
        )}
         {type == "profissional" && (
          <InputGroudProfissional
            title={title}
            subTitle={subTitle}
            handleShow={handleShow}
            handleClose={handleClose}
            formValuesProfissional={formValuesProfissional}
            handleInputChange={handleInputChange}
          />
        )}
        <hr />
        <Row>
          <Col
            md={12}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <Button text="fechar" type="button" onClick={handleClose} />
            <Button text="confirmar" type="button" onClick={handleSubmit} />
          </Col>
        </Row>
      </div>
    </S.Overlay>
  );
};

export default Modal;
