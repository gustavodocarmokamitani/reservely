import React, { useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import Input from "../components/Input";
import { LojaContainer, LojaContent } from "./Loja.styles";
import ReactSelect from "../components/ReactSelect";

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
      <HeaderTitle
        title="Loja"
        subTitle="Área destinada para gerenciamento da loja."
      />

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
          <p>Dias de abertura</p>
          <ReactSelect width="300px" semana={true} />
        </LojaContent>
        <LojaContent>
          <p>Horario de abertura e fechamento</p>
          <ReactSelect width="300px" horario />
        </LojaContent>
        <LojaContent>
          <p>Dias para fechamento da loja</p>
          <ReactSelect width="300px" horario />
        </LojaContent>
      </LojaContainer>
    </ContainerPage>
  );
}

export default Loja;
