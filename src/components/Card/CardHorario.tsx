import React from 'react';
import * as S from "./styles/Card.styles";

import remover from '../../assets/remove.svg';
import confirmar from '../../assets/confirmarCardLoja.svg';
import { Col, Row } from 'react-bootstrap';
import calendario from '../../assets/calendario.svg';
import { Loja } from '../../models/Loja';

interface CardHorarioProps {
    title?: string;
    texto?: string;
    icon?: "remover" | "confirmar" | 'calendario';
    data: Loja | undefined;
    horariosSelecionados?: string[];
}

const iconMap = {
    confirmar,
    remover,
    calendario
};

const CardHorario: React.FC<CardHorarioProps> = ({ title, texto, icon, data, horariosSelecionados }) => {
    return (
        <S.CardLojaContainer>
            <S.CardLojaContent>
                <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>{title}</h4>
                {icon && iconMap[icon] && (
                    <Row>
                        <Col md={8}>
                            {
                                    title === 'Hora de abertura' ?
                                        <p style={{ textAlign: 'center' }}>{horariosSelecionados ? horariosSelecionados[0] : null}</p>
                                        :
                                        <p style={{ textAlign: 'center' }}>{horariosSelecionados ? horariosSelecionados[1] : null}</p>
                            }
                        </Col>
                        <Col md={4}>
                            <img
                                src={iconMap[icon]}
                                alt={icon}
                            />
                        </Col>
                    </Row>
                )}
            </S.CardLojaContent>
        </S.CardLojaContainer>
    );
}

export default CardHorario;
