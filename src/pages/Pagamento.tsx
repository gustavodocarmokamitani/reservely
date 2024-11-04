import React from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import * as S from "./Pagamento.styles";
import ReactSelect from "../components/ReactSelect";

function Pagamento() {
  return (
    <ContainerPage style={{height: "100vh"}}>
      <Row>
        <Col md={7} style={{ padding: "0px" }}>
          <HeaderTitle title="Pagamentos" subTitle="Área destinada para gerenciamento de pagamentos."></HeaderTitle>
        </Col>

        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          <Button
            isConfirmar
            type="button"
          />
        </Col>
      </Row>
      <S.PagamentoContainer>
        <S.PagamentoContent>
        <p>Tipos de pagamento</p>
          <ReactSelect pagamento width="500px" />
        </S.PagamentoContent>
      </S.PagamentoContainer>
    </ContainerPage>
  );
}

export default Pagamento;
