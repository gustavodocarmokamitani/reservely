import React, { useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import Modal from "../view/Modal";

const rows = [
  {
    id: 1,
    nome: "Gustavo",
    sobrenome: "Kamitani",
    telefone: "123123123",
    servico: true,
  },
  {
    id: 2,
    nome: "Rafaella",
    sobrenome: "Menezes",
    telefone: "123123131",
    servico: true,
  },
  {
    id: 3,
    nome: "Misty",
    sobrenome: "Carmo",
    telefone: "1231313",
    servico: true,
  },
  {
    id: 4,
    nome: "Luna",
    sobrenome: "Carmo",
    telefone: "12312313",
    servico: true,
  },
  {
    id: 5,
    nome: "Nala",
    sobrenome: "Carmo",
    telefone: "213131231",
    servico: true,
  },
];

function Profissional() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ContainerPage>
        <Row>
          <Col md={7}>
            <HeaderTitle
              title="Profissional"
              subTitle="Área destinada para gerenciamento de profissionais."
            />
          </Col>

          <Col
            md={5}
            className="d-flex flex-row justify-content-end align-items-center"
          >
            <Button text="remover" type="button" />
            <Button text="adicionar" type="button" onClick={handleShow} />
          </Col>
        </Row>
        <DataTable type="profissional" rowsProfissional={rows} />
        {show && (
          <Modal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            type="profissional"
            handleClose={handleClose}
            handleShow={handleShow}
            size="grande"
          />
        )}
        <Row>
          <Col
            md={12}
            className="mt-5 d-flex flex-row justify-content-end align-items-center"
          >
            <Button text="confirmar" type="button"  />
          </Col>
        </Row>
      </ContainerPage>
    </>
  );
}

export default Profissional;
