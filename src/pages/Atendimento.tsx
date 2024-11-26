import React from 'react'
import { ContainerPage } from './_Page.styles'
import { Col, Row } from 'react-bootstrap'
import HeaderTitle from '../view/HeaderTitle'
import Button from '../components/Button'
import * as S from './Atendimento.styles';
import ReactSelect from '../components/ReactSelect'

export function Atendimento() {
    return (
        <ContainerPage style={{ height: "100vh" }}>
            <Row>
                <Col md={7} style={{ padding: "0px" }}>
                    <HeaderTitle title="Atendimento" subTitle="Área destinada para realizar os atendimentos."></HeaderTitle>
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
            <S.AtendimentoContainer>
                <S.AtendimentoContent>
                    <p>Funcionário</p>
                    <ReactSelect width='300' funcionario />
                </S.AtendimentoContent>
                <S.AtendimentoContent>
                    <p>Serviço</p>
                    <ReactSelect width='300' servico />
                </S.AtendimentoContent>
                <S.AtendimentoContent>
                    <p>Data do agendamento</p>
                    <ReactSelect width='300' agendamento />
                </S.AtendimentoContent>
            </S.AtendimentoContainer>
        </ContainerPage>
    )
}

export default Atendimento