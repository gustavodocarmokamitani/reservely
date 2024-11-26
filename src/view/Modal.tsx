import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import * as S from "./Modal.styles";
import InputGroudServico from "../components/InputGroudServico";
import closeIcon from "../assets/remove.svg";
import InputGroudProfissional from "../components/InputGroudProfissional";
import Selected from "../components/Selected";
import ImagemUpload from "../components/ImagemUpload";
import api from "../axiosInstance";

interface ModalProps {
  title: string;
  subTitle?: string;
  servico?: boolean;
  profissional?: boolean;
  info?: boolean;
  imagem?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  size: "pequeno" | "medio" | "grande";
  services?: number[];
}

const Modal: React.FC<ModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  servico, 
  profissional, 
  info,
  imagem,
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
    selectedServices: [] as number[],  
  });

  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  const handleInputChangeServico = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormValuesServico((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
  };

  const handleInputChangeProfissional = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormValuesProfissional((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
  };

  const handleServiceSelection = (selectedServices: number[]) => {
    setFormValuesProfissional((prev) => ({
      ...prev,
      selectedServices,
    }));
  };

  const handleSubmit = async () => {
    if (profissional) {
      // Verifica se todos os campos obrigatórios estão preenchidos
      if (!formValuesProfissional.nome || !formValuesProfissional.sobrenome || !formValuesProfissional.telefone) {
        alert("Todos os campos de profissional devem ser preenchidos.");
        return;
      }
  
      // Preparar os dados no formato correto para a API
      const dataToSend = [
        {
          id: 0, // ou outro valor de ID se necessário
          nome: formValuesProfissional.nome,
          email: "string",
          telefone: formValuesProfissional.telefone,
          senha: "string",
          tipoUsuarioId: 3, // Exemplo de valor, ajuste conforme necessário
        }
      ];
  
      // Enviar os dados via POST
      try {
        const response = await api.post("/Usuario", dataToSend); 
        console.log("Sucesso:", response.data);
        alert("Profissional cadastrado com sucesso!");
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao cadastrar o profissional. Tente novamente.");
      }
    }
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

        {servico && (
          <InputGroudServico
            title={title}
            subTitle={subTitle!}
            handleShow={handleShow}
            handleClose={handleClose}
            formValuesServico={formValuesServico}
            handleInputChange={handleInputChangeServico}
          />
        )}

        {profissional && (
          <InputGroudProfissional
            title={title}
            subTitle={subTitle!}
            handleShow={handleShow}
            handleClose={handleClose}
            formValuesProfissional={formValuesProfissional}
            handleInputChange={handleInputChangeProfissional}
          />
        )}

        {info && (
          <Selected
            onChange={(selectedServices) => {
              if (selectedServices.length > 0) {
                handleServiceSelection(selectedServices);
              } else {
                console.log("Nenhum serviço selecionado.");
              }
            }}
          />
        )}

        {imagem && (
          <Row style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ImagemUpload/>
          </Row>
        )}

        <hr />
        <Row>
          <Col
            md={12}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <Button isFechar type="button" onClick={handleClose} />
            <Button isConfirmar type="button" onClick={handleSubmit} />
          </Col>
        </Row>
      </div>
    </S.Overlay>
  );
};

export default Modal;
