import { useState } from "react";
import { ContainerPage } from "../Styles/_Page.styles";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import { Col, Row } from "react-bootstrap";
import * as S from "./Image.styles";
import imageDefault from "../../assets/imageDefault.svg";
import closeIcon from "../../assets/remove.svg";
import environment1 from "../../assets/environment1.png";
import environment2 from "../../assets/environment2.png";
import environment3 from "../../assets/environment3.png";
import Button from "../../components/Button/Button";
import AddImagemModal from "../../view/Modal/AddImageModal";

function Image() {
  const ambiente = [
    { image: environment1 },
    { image: environment2 },
    { image: environment3 },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ContainerPage>
      <Row>
        <Col md={7} style={{ padding: "0px" }}>
          <HeaderTitle
            title="Imagens"
            subTitle="Área destinada para gerenciamento de imagens."
          />
        </Col>

        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          <Button $isAdd type="button" onClick={handleShow} />
        </Col>
      </Row>
      <S.ImageGrid style={{ marginTop: "50px" }}>
        <S.CardContainer>
          <S.CardHeader>
            <h2>Header</h2>
            <img
              src={closeIcon}
              alt="Close Icon"
              style={{ cursor: "pointer", width: "25px" }}
            />
          </S.CardHeader>
          <S.ImageContent>
            <img
              src={imageDefault}
              alt={"imageDefault"}
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </S.ImageContent>
        </S.CardContainer>
      </S.ImageGrid>
      <S.ImageGrid>
        <S.CardContainer>
          <S.CardHeader>
            <h2>Logo</h2>
            <img
              src={closeIcon}
              alt="Close Icon"
              style={{ cursor: "pointer", width: "25px" }}
            />
          </S.CardHeader>
          <S.ImageContent>
            <img
              src={imageDefault}
              alt={"ImagemDefault"}
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </S.ImageContent>
        </S.CardContainer>
      </S.ImageGrid>
      <S.ImageGrid>
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
            <S.ImageContent>
              <img
                src={amb.image || imageDefault}
                alt={`Ambiente ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </S.ImageContent>
          </S.CardContainer>
        ))}
      </S.ImageGrid>
      {show && (
        <AddImagemModal
          title="Adicionar imagem"
          handleClose={handleClose}
          size="small"
        />
      )}
    </ContainerPage>
  );
}

export default Image;
