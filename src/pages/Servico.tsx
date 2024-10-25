import React, { useState } from "react";
import { ContainerPage } from "./_StyledPage";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import { Col, Row } from "react-bootstrap";
import Btn from "../components/Button";
import Modal from "../view/Modal";

function Servico() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ContainerPage>
        <Row>
          <Col md={7}>
            <HeaderTitle title="Serviço" subTitle="Área destinada para gerenciamento de serviços." />
          </Col>

          <Col md={5} className="d-flex flex-row justify-content-end align-items-center">
              <Btn text="Remover" 
              type="button" 
              addIconIs={false} 
              removeIconIs={true} />
            <Btn
              text="Adicionar"
              type="button"
              addIconIs={true}
              removeIconIs={false} 
              onClick={handleShow} />
          </Col>
        </Row>
        <DataTable />
        {show && <Modal title="Adicionar serviço" handleClose={handleClose} handleShow={handleShow}/>}
      </ContainerPage >
    </>
  );
}

export default Servico;
