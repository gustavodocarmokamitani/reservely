import React from 'react';
import * as S from "./styles/Card.styles";

import remover from '../../assets/remove.svg';
import confirmar from '../../assets/confirmarCardLoja.svg';
import { Col, Row } from 'react-bootstrap';
import calendario from '../../assets/calendario.svg';
import { Loja } from '../../models/Loja';

interface CardMetodoPagamentoProps {
    title?: string;
    texto?: string;
    icon?: "remover" | "confirmar" | 'calendario';
}

const iconMap = {
    confirmar,
    remover,
    calendario
};

const CardMetodoPagamento: React.FC<CardMetodoPagamentoProps> = ({ title, texto, icon }) => {
    return (
        <S.CardLojaContainer>
            <S.CardLojaContent>
                <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>{title}</h4>
                {icon && iconMap[icon] && (
                    <Row>
                        <Col md={8}>
                            <p style={{ textAlign: 'center' }}>{texto}</p>
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

export default CardMetodoPagamento;
