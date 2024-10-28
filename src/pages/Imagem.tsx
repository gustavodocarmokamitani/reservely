import React from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import * as S from "./Imagem.styles";
import imagemDefault from "../assets/imagemDefault.svg";
import closeIcon from "../assets/remove.svg";
import { Col, Row } from "react-bootstrap";

function Imagem() {
  return (
    <ContainerPage>
      <HeaderTitle title="Imagens" subTitle="Área destinada para gerenciamento de imagens."></HeaderTitle>
      <Row style={{marginBottom: "25px", paddingBottom: "50px", paddingTop: "50px"}}>
        <Col md={10}>
          <h2>Header</h2>
        </Col>
        <Col
          md={2}
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          <img
            src={closeIcon}
            alt="Close Icon"
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            width={25}
          />
        </Col>
        <S.ImagemContent>
          <img src={imagemDefault} style={{ width: "100px", marginRight: "8px", verticalAlign: "middle" }}></img>
        </S.ImagemContent>
      </Row>
      <Row style={{marginBottom: "25px", paddingBottom: "50px"}}>
        <Col md={10}>
          <h2>Logo</h2>
        </Col>
        <Col
          md={2}
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          <img
            src={closeIcon}
            alt="Close Icon"
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            width={25}
          />
        </Col>
        <S.ImagemContent>
          <img src={imagemDefault} style={{ width: "100px", marginRight: "8px", verticalAlign: "middle" }}></img>
        </S.ImagemContent>
      </Row>
      <Row style={{marginBottom: "25px", paddingBottom: "50px"}}>
        <Col md={10}>
          <h2>Ambiente</h2>
        </Col>
        <Col
          md={2}
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          <img
            src={closeIcon}
            alt="Close Icon"
            style={{ marginRight: "8px", verticalAlign: "middle" }}
            width={25}
          />
        </Col>
        <S.ImagemContent>
          <img src={imagemDefault} style={{ width: "100px", marginRight: "8px", verticalAlign: "middle" }}></img>
        </S.ImagemContent>
      </Row>
    </ContainerPage>
  );
}

export default Imagem;
