import React from 'react';
import * as S from "../Card/styles/Card.styles";

import remove from '../assets/remove.svg';
import confirm from '../assets/confirmCardStore.svg';
import { Col, Row } from 'react-bootstrap';
import calendar from '../assets/calendar.svg';
import { Store } from '../../models/Store';

interface CardStoreProps {
    title?: string;
    text?: string;
    icon?: "remove" | "confirm" | 'calendar';
}

const iconMap = {
    confirm,
    remove,
    calendar
};

const CardStore: React.FC<CardStoreProps> = ({ title, text, icon }) => {
    return (
        <S.CardStoreContainer>
            <S.CardStoreContent>
                <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>{title}</h4>
                {icon && iconMap[icon] && (
                    <Row>
                        <Col md={8}>
                            <p style={{ textAlign: 'center' }}>{text}</p>
                        </Col>
                        <Col md={4}>
                            <img
                                src={iconMap[icon]}
                                alt={icon}
                            />
                        </Col>
                    </Row>
                )}
            </S.CardStoreContent>
        </S.CardStoreContainer>
    );
}

export default CardStore;
