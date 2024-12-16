import React from 'react';
import * as S from "./styles/Card.styles";

import remover from '../../assets/removerRed.svg';
import confirmar from '../../assets/confirmarCardLoja.svg';
import { Col, Row } from 'react-bootstrap';
import calendario from '../../assets/calendario.svg';
import { Loja } from '../../models/Loja';

interface CardDiaFechamentoProps {
    title?: string;
    texto?: string;
    icon?: "remover" | "confirmar" | 'calendario';
    onRemove?: () => void;
}

const iconMap = {
    confirmar,
    remover,
    calendario
};

const CardDiaFechamento: React.FC<CardDiaFechamentoProps> = ({ title, texto, icon, onRemove }) => {
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
                                onClick={icon === "remover" ? onRemove : undefined}
                                style={{cursor: "pointer"}}
                            />
                        </Col>
                    </Row>
                )}
            </S.CardLojaContent>
        </S.CardLojaContainer>
    );
}

export default CardDiaFechamento;
