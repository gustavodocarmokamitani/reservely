import React, { useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import Input from "../components/Input";
import { LojaContainer, LojaContent } from "./Loja.styles";
import ReactSelect from "../components/ReactSelect";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";

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
    <ContainerPage style={{ height: "100vh" }}>
      <Row>
        <Col md={7} style={{padding: "0px"}}>
          <HeaderTitle
            title="Loja"
            subTitle="Área destinada para gerenciamento da loja."
          />
        </Col>

        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          <Button isConfirmar type="button" />
        </Col>
      </Row>
      <LojaContainer>
        <LojaContent>
          <p>Loja</p>
          <Input
            type="toggle"
            name="ativo"
            value={formValuesLoja.ativo.toString()}
            onChange={handleInputChangeLoja}
            width="300"
          />
        </LojaContent>
        <LojaContent>
          <p>Dias de funcionamento</p>
          <ReactSelect width="350px" semana/>
        </LojaContent>
        <LojaContent>
          <p>Horários de abertura</p>
          <ReactSelect width="350px" horario />
        </LojaContent>
        <LojaContent>
          <p>Datas de fechamento</p>
          <ReactSelect width="350px" diasFechados />
        </LojaContent>
      </LojaContainer>
    </ContainerPage>
  );
}

export default Loja;
