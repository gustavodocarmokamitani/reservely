import React, { useEffect, useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import Input from "../components/Input";
import * as S from "./Loja.styles";
import ReactSelect from "../components/ReactSelect";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import CardLoja from "../components/CardLoja";
import { getLojaById } from "../services/LojaServices";
import { Loja as LojaModel } from '../models/Loja';
import CardStatus from "../components/Card/CardStatus";
import CardHorario from "../components/Card/CardHorario";
import CardDiaSemana from "../components/Card/CardDiaSemana";
import HorarioFuncionamentoSelect from "../components/Select/HorarioFuncionamentoSelect";
import { SelectOption } from "../models/SelectOptions";
import DiasSFuncionamentoSelect from "../components/Select/DiasSFuncionamentoSelect";
import DataLojaSelect from "../components/Select/DataLojaSelect";

import { useNavigate } from "react-router-dom";
import CardDiaFechamento from "../components/Card/CardDiaFechamento";

function Loja() {
  const navigate = useNavigate();
  const [formValuesLoja, setFormValuesLoja] = useState({ ativo: false });
  const [loja, setLoja] = useState<LojaModel | undefined>();
  const [horariosSelecionados, setHorariosSelecionados] = useState<string[]>([]);
  const [diasSFuncionamento, setDiasSFuncionamento] = useState<string[]>([]);
  const [datasFechamento, setDatasFechamento] = useState<Date[] | null>([]);
  const [statusLoja, setStatusLoja] = useState<boolean>();

  const handleInputChangeLoja = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;

    setFormValuesLoja((prev) => {
      const updatedValues = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      setStatusLoja(updatedValues.ativo);
      return updatedValues;
    });
  };


  const fetchData = async () => {
    try {
      const response = await getLojaById(1);
      if (response) {
        setLoja(response);

        if (!horariosSelecionados || horariosSelecionados.length === 0) {
          const horariosArray = response.horarioFuncionamento
            ? response.horarioFuncionamento.split(" - ")
            : [];
          setHorariosSelecionados(horariosArray);
        };

      }

    } catch (error) {

    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleDateChange = (selectedDates: Date[] | null) => {
    setDatasFechamento(selectedDates);

    setFormValuesLoja((prevValues) => ({
      ...prevValues,
      datasFechamento: selectedDates
    }));

  };

  const handleSubmit = async () => {
    console.log("horariosSelecionados", horariosSelecionados);
    console.log("diasSFuncionamento", diasSFuncionamento);
    console.log("datasFechamento", datasFechamento);
    console.log("statusLoja", statusLoja);

  }

  const handleButtonClick = () => {
    navigate('/loja-configurar');
  };

  return (
    <ContainerPage style={{ height: "100vh" }}>
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
          <Button $isConfigurar onClick={handleButtonClick} type="button" />
        </Col>
      </Row>
      <Row>
        <Col md={4} style={{ padding: "0px" }}>
          {/* <S.LojaContainer>
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
              <HorarioFuncionamentoSelect setHorario={setHorariosSelecionados} />
            </S.LojaContent>
            <S.LojaContent>
              <p>Dias de funcionamento</p>
              <DiasSFuncionamentoSelect setDiasSFuncionamento={setDiasSFuncionamento} />
            </S.LojaContent>
            <S.LojaContent>
              <p>Datas de fechamento</p>
              <DataLojaSelect setDatasFechamento={handleDateChange} />
            </S.LojaContent>
          </S.LojaContainer> */}
        </Col>
        <Col md={12}>
          <h3 style={{ margin: "50px 0 25px 0" }}>Dados da loja</h3>
          <S.CardLojaWrapper className="d-flex justify-content-start align-items-center">
            <CardStatus data={loja} title="Status" icon="confirmar" />
            <CardHorario horariosSelecionados={horariosSelecionados} data={loja} title="Hora de abertura" texto="09:00" icon="calendario" />
            <CardHorario horariosSelecionados={horariosSelecionados} data={loja} title="Hora de fechamento" texto="18:00" icon="calendario" />
          </S.CardLojaWrapper>
          <h3 style={{ margin: '50px 0 25px 0' }}>Dias de funcionamento</h3>
          <S.CardLojaWrapper className="d-flex justify-content-start align-items-center flex-wrap">
            {loja?.diasFuncionamento?.map((dia, index) => (
              <CardDiaSemana key={index} texto={dia} icon="confirmar" />
            ))}
          </S.CardLojaWrapper>

          <h3 style={{ margin: '50px 0 25px 0' }}>Dias de fechamento</h3>
          <S.CardLojaWrapper className="d-flex justify-content-start align-items-center flex-wrap">
            {loja?.diasFechamento?.map((dia, index) => {
              const dataFormatada = new Date(dia).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              return <CardDiaFechamento key={index} texto={dataFormatada} icon="confirmar" />;
            })}
          </S.CardLojaWrapper>


        </Col>
      </Row>
    </ContainerPage>
  );
}

export default Loja;
