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
    nome: "Nome do serviço",
    valor: "R$: 100,00",
    duracao: "60",
    ativo: true,
  },
  {
    id: 2,
    nome: "Nome do serviço 1 ",
    valor: "R$: 100,00",
    duracao: "60",
    ativo: true,
  },
  {
    id: 3,
    nome: "Nome do serviço 2",
    valor: "R$: 100,00",
    duracao: "60",
    ativo: true,
  },
  {
    id: 4,
    nome: "Nome do serviço 3",
    valor: "R$: 100,00",
    duracao: "60",
    ativo: true,
  },
  {
    id: 5,
    nome: "Nome do serviço 4",
    valor: "R$: 100,00",
    duracao: "60",
    ativo: true,
  },
];

function Servico() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ContainerPage>
        <Row>
          <Col md={7}>
            <HeaderTitle
              title="Serviço"
              subTitle="Área destinada para gerenciamento de serviços."
            />
          </Col>

          <Col
            md={5}
            className="d-flex flex-row justify-content-end align-items-center"
          >
            <Button isRemover type="button" />
            <Button
              isAdicionar
              type="button"
              onClick={handleShow}
            />
          </Col>
        </Row>
        <DataTable type="servico" rowsServico={rows} />
        {show && (
          <Modal
            title="Adicionar serviço"
            subTitle="Preencha as informações abaixo para criar um novo serviço."
            servico
            handleClose={handleClose}
            handleShow={handleShow}
            size="pequeno"
          />
        )}
        <Row>
          <Col
            md={12}
            className="mt-5 d-flex flex-row justify-content-end align-items-center"
          >
            <Button isConfirmar type="button" />
          </Col>
        </Row>
      </ContainerPage>
    </>
  );
}

export default Servico;
