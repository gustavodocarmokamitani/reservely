import React, { useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import Input from "../components/Input";
import * as S from "./Loja.styles";
import ReactSelect from "../components/ReactSelect";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import CardLoja from "../components/CardLoja";

function Loja() {
  const [formValuesLoja, setFormValuesLoja] = useState({
    ativo: false,
  });

  const handleInputChangeLoja = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;

    setFormValuesLoja((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <ContainerPage>
      <Row>
        <Col md={7} style={{ padding: "0px" }}>
          <HeaderTitle
            title="Loja"
            subTitle="Área destinada para gerenciamento da loja."
          />
        </Col>

        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          <Button $isConfirmar type="button" />
        </Col>
      </Row>
      <Row>
        <Col md={4} style={{ padding: "0px" }}>
          <S.LojaContainer>
            <S.LojaContent>
              <p>Loja</p>
              <Input
                type="toggle"
                name="ativo"
                value={formValuesLoja.ativo.toString()}
                onChange={handleInputChangeLoja}
                width="300"
              />
            </S.LojaContent>
            <S.LojaContent>
              <p>Horários de funcionamento</p>
              <ReactSelect width="300px" horario />
            </S.LojaContent>
            <S.LojaContent>
              <p>Dias de funcionamento</p>
              <ReactSelect width="500px" semana />
            </S.LojaContent>
            <S.LojaContent>
              <p>Datas de fechamento</p>
              <ReactSelect width="500px" diasFechados />
            </S.LojaContent>
          </S.LojaContainer>
        </Col>
        <Col md={8}>
          <h3 style={{ margin: "50px 0 25px 0" }}>Dados da loja</h3>
          <S.CardLojaWrapper className="d-flex justify-content-start align-items-center">
            <CardLoja title="Status" texto="Aberto" icon="confirmar" />
            <CardLoja title="Hora de abertura" texto="09:00" icon="calendario" />
            <CardLoja title="Hora de fechamento" texto="18:00" icon="calendario" />
          </S.CardLojaWrapper>
          <h3 style={{margin: '50px 0 25px 0'}}>Dias de funcionamento</h3>
          <S.CardLojaWrapper className="d-flex justify-content-start align-items-center flex-wrap">
            <CardLoja texto="Segunda" icon='confirmar'/>
            <CardLoja texto="Terça" icon='confirmar'/>
            <CardLoja texto="Quarta" icon='confirmar'/>
            <CardLoja texto="Quinta" icon='confirmar'/>
            <CardLoja texto="Sexta" icon='confirmar'/>
          </S.CardLojaWrapper>
          <h3 style={{margin: '50px 0 25px 0'}}>Dias de fechamento</h3>
          <S.CardLojaWrapper className="d-flex justify-content-start align-items-center flex-wrap">
            <CardLoja texto="11/Nov" icon='remover'/>
            <CardLoja texto="20/Nov" icon='remover'/>
            <CardLoja texto="25/Dez" icon='remover'/>
            <CardLoja texto="26/Dez" icon='remover'/>
            <CardLoja texto="27/Dez" icon='remover'/>
            <CardLoja texto="11/Nov" icon='remover'/>
            <CardLoja texto="20/Nov" icon='remover'/>
            <CardLoja texto="25/Dez" icon='remover'/>
            <CardLoja texto="26/Dez" icon='remover'/>
            <CardLoja texto="27/Dez" icon='remover'/>
            <CardLoja texto="11/Nov" icon='remover'/>
            <CardLoja texto="20/Nov" icon='remover'/>
            <CardLoja texto="25/Dez" icon='remover'/>
            <CardLoja texto="26/Dez" icon='remover'/>
            <CardLoja texto="27/Dez" icon='remover'/>
            <CardLoja texto="11/Nov" icon='remover'/>
            <CardLoja texto="20/Nov" icon='remover'/>
            <CardLoja texto="25/Dez" icon='remover'/>
            <CardLoja texto="26/Dez" icon='remover'/>
            <CardLoja texto="27/Dez" icon='remover'/>
          </S.CardLojaWrapper>

        </Col>
      </Row>
    </ContainerPage>
  );
}

export default Loja;
