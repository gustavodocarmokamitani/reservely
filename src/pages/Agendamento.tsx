import React from 'react'
import { ContainerPage } from './_Page.styles'
import { Col, Row } from 'react-bootstrap'
import HeaderTitle from '../view/HeaderTitle'
import Button from '../components/Button'
import * as S from './Agendamento.styles';
import ReactSelect from '../components/ReactSelect'

export function Agendamento() {
    return (
        <ContainerPage style={{ height: "100vh" }}>
            <Row>
                <Col md={7} style={{ padding: "0px" }}>
                    <HeaderTitle title="Agendamento" subTitle="Área destinada para realizar os agendamentos."></HeaderTitle>
                </Col>

                <Col
                    md={5}
                    className="d-flex flex-row justify-content-end align-items-center"
                >
                    <Button
                        $isConfirmar
                        type="button"
                    />
                </Col>
            </Row>
            <S.AgendamentoContainer>
                <S.AgendamentoContent>
                    <p>Funcionário</p>
                    <ReactSelect width='300' funcionario />
                </S.AgendamentoContent>
                <S.AgendamentoContent>
                    <p>Serviço</p>
                    <ReactSelect width='300' servico />
                </S.AgendamentoContent>
                <S.AgendamentoContent>
                    <p>Data do agendamento</p>
                    <ReactSelect width='300' agendamento />
                </S.AgendamentoContent>
            </S.AgendamentoContainer>
        </ContainerPage>
    )
}

export default Agendamento