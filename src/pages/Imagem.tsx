import React, { useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import * as S from "./Imagem.styles";
import imagemDefault from "../assets/imagemDefault.svg";
import closeIcon from "../assets/remove.svg";
import { Col, Row } from "react-bootstrap";
import ambiente1 from '../assets/ambiente1.png';
import ambiente2 from '../assets/ambiente2.png';
import ambiente3 from '../assets/ambiente3.png';
import Button from "../components/Button";
import Modal from "../view/Modal";

function Imagem() {

  const ambiente = [
    { image: ambiente1 },
    { image: ambiente2 },
    { image: ambiente3 }
  ]

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ContainerPage>
      <Row>
        <Col md={7}>
          <HeaderTitle
            title="Imagens"
            subTitle="Área destinada para gerenciamento de imagens."
          />
        </Col>

        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          <Button
            isAdicionar
            type="button"
            onClick={handleShow}
          />
        </Col>
      </Row>
      <S.ImagemGrid style={{ marginTop: "50px" }}>
        <S.CardContainer >
          <S.CardHeader>
            <h2>Header</h2>
            <img
              src={closeIcon}
              alt="Close Icon"
              style={{ cursor: "pointer", width: "25px" }}
            />
          </S.CardHeader>
          <S.ImagemContent>
            <img
              src={imagemDefault}
              alt={'imagemDefault'}
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </S.ImagemContent>
        </S.CardContainer>
      </S.ImagemGrid>
      <S.ImagemGrid>
        <S.CardContainer >
          <S.CardHeader>
            <h2>Logo</h2>
            <img
              src={closeIcon}
              alt="Close Icon"
              style={{ cursor: "pointer", width: "25px" }}
            />
          </S.CardHeader>
          <S.ImagemContent>
            <img
              src={imagemDefault}
              alt={'ImagemDefault'}
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </S.ImagemContent>
        </S.CardContainer>
      </S.ImagemGrid>
      <S.ImagemGrid>
        {ambiente.map((amb, index) => (
          <S.CardContainer key={index}>
            <S.CardHeader>
              <h2>Ambiente {index + 1}</h2>
              <img
                src={closeIcon}
                alt="Close Icon"
                style={{ cursor: "pointer", width: "25px" }}
              />
            </S.CardHeader>
            <S.ImagemContent>
              <img
                src={amb.image || imagemDefault}
                alt={`Ambiente ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </S.ImagemContent>
          </S.CardContainer>
        ))}
      </S.ImagemGrid>
      {show && (
          <Modal
            title="Adicionar imagem"
            handleClose={handleClose}
            handleShow={handleShow}
            imagem
            size="pequeno"
          />
        )}
    </ContainerPage>
  );
}

export default Imagem;
