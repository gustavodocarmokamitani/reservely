import React, { useEffect, useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import Input from "../components/Input";
import * as S from "./Loja.styles";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import { getLojaById, updateLoja } from "../services/LojaServices";
import { Loja, Loja as LojaModel } from '../models/Loja';
import CardStatus from "../components/Card/CardStatus";
import CardHorario from "../components/Card/CardHorario";
import CardDiaSemana from "../components/Card/CardDiaSemana";
import HorarioFuncionamentoSelect from "../components/Select/HorarioFuncionamentoSelect";
import DiasSFuncionamentoSelect from "../components/Select/DiasSFuncionamentoSelect";
import DataLojaSelect from "../components/Select/DataLojaSelect";
import { useNavigate } from "react-router-dom";
import CardDiaFechamento from "../components/Card/CardDiaFechamento";
import { useSnackbar } from "notistack";

function LojaConfigurar() {
    const navigate = useNavigate();
    const [formValuesLoja, setFormValuesLoja] = useState({ ativo: false });
    const [loja, setLoja] = useState<LojaModel | undefined>();
    const [horariosSelecionados, setHorariosSelecionados] = useState<string[]>([]);
    const [diasSFuncionamento, setDiasSFuncionamento] = useState<string[]>([]);
    const [datasFechamento, setDatasFechamento] = useState<Date[] | null>([]);
    const [statusLoja, setStatusLoja] = useState<boolean>();
    const { enqueueSnackbar } = useSnackbar();

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

                setFormValuesLoja((prev) => ({
                    ...prev,
                    ativo: response.status,
                }));

                setStatusLoja(response.status);

                if (!horariosSelecionados || horariosSelecionados.length === 0) {
                    const horariosArray = response.horarioFuncionamento
                        ? response.horarioFuncionamento.split(" - ")
                        : [];
                    setHorariosSelecionados(horariosArray);
                };

                if (!diasSFuncionamento || diasSFuncionamento.length === 0) {
                    const diasSFuncionamentoArray = response.diasFuncionamento
                        ? response.diasFuncionamento
                        : [];
                    setDiasSFuncionamento(diasSFuncionamentoArray);
                };

                if (!datasFechamento || datasFechamento.length === 0) {
                    const datasFechamentoArray = response.diasFechamento
                        ? response.diasFechamento.map((data: string) => new Date(data))
                        : [];
                    setDatasFechamento(datasFechamentoArray);
                }
            };

        } catch (error) {
            console.log("Erro na requisição da loja", error)
        }
    };

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

        if (loja) {
            const lojaMapped: Loja = {
                id: loja.id,
                nome: loja.nome,
                endereco: loja.endereco,
                status: loja.status,
                horarioFuncionamento: horariosSelecionados.join(" - "),
                diasFechamento: datasFechamento
                    ? datasFechamento.map((data) => data.toISOString())
                    : [],
                diasFuncionamento: diasSFuncionamento
            };

            try {
                await updateLoja(lojaMapped.id, lojaMapped);
                enqueueSnackbar(`Loja editado com sucesso!`, { variant: "success" });

                navigate('/loja');
            } catch (error) {
                enqueueSnackbar(`Falha ao editar loja com ID ${lojaMapped.id}`, { variant: "error" });
            }
        }
    };

    const handleRemoveDataFechamento = (dateToRemove: Date) => {
        setDatasFechamento((prevDatas) =>
            prevDatas ? prevDatas.filter((data) => data.getTime() !== dateToRemove.getTime()) : []
        );
    };

    const handleRemoveDiaFuncionamento = (dayToRemove: string) => {
        setDiasSFuncionamento((prevDays) =>
            prevDays.filter((day) => day !== dayToRemove)
        );
    };

    const handleButtonClick = () => {
        navigate('/loja');
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
                    <Button $isVoltar onClick={handleButtonClick} type="button" />
                    <Button $isConfirmar onClick={handleSubmit} type="button" />
                </Col>
            </Row>
            <Row>
                <Col md={3} style={{ padding: "0px" }}>
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
                    </S.LojaContainer>
                </Col>
                <Col md={9}>
                    <h3 style={{ margin: "50px 0 25px 0" }}>Dados da loja</h3>
                    <S.CardLojaWrapper className="d-flex justify-content-start align-items-center">
                        <CardStatus statusLoja={statusLoja} data={loja} title="Status" icon="confirmar" />
                        <CardHorario horariosSelecionados={horariosSelecionados} data={loja} title="Hora de abertura" texto="09:00" icon="calendario" />
                        <CardHorario horariosSelecionados={horariosSelecionados} data={loja} title="Hora de fechamento" texto="18:00" icon="calendario" />
                    </S.CardLojaWrapper>

                    <h3 style={{ margin: '50px 0 25px 0' }}>Dias de funcionamento</h3>
                    <S.CardLojaWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                        {
                            diasSFuncionamento.map((item: any) => (
                                <CardDiaSemana 
                                texto={item} 
                                icon="remover" 
                                onRemove={() => handleRemoveDiaFuncionamento(item)}
                                />
                            ))
                        }
                    </S.CardLojaWrapper>

                    <h3 style={{ margin: '50px 0 25px 0' }}>Dias de fechamento</h3>
                    <S.CardLojaWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                        {
                            datasFechamento ?
                                datasFechamento.map((item: Date, index: number) => (
                                    <CardDiaFechamento
                                        key={index}
                                        texto={item.toLocaleDateString()}
                                        icon="remover"
                                        onRemove={() => handleRemoveDataFechamento(item)}
                                    />
                                )) : ''
                        }

                    </S.CardLojaWrapper>

                </Col>
            </Row>
        </ContainerPage>
    );
}

export default LojaConfigurar;
