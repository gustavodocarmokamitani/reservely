import React, { useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import Modal from "../view/Modal";

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
        <DataTable />
        {show && (
          <Modal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            type="profissional"
            handleClose={handleClose}
            handleShow={handleShow}
            size="medio"
          />
        )}
      </ContainerPage>
    </>
  );
}

export default Profissional;
