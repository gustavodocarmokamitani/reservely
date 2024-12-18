import React, { useEffect } from 'react';
import * as S from "./styles/Card.styles";

import remove from '../../assets/remove.svg';
import confirm from '../../assets/confirmCardStore.svg';
import { Col, Row } from 'react-bootstrap';
import calendar from '../../assets/calendar.svg';
import { Store } from '../../models/Store';

interface CardStatusProps {
    title?: string;
    icon?: "remove" | "confirm" | 'calendar';
    data: Store | undefined;
    statusStore?: boolean;
}

const iconMap = {
    confirm,
    remove,
    calendar
};

const CardStatus: React.FC<CardStatusProps> = ({ title, icon, data, statusStore = data?.status }) => {   
    return (
        <S.CardStoreContainer>
            <S.CardStoreContent>
                <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>{title}</h4>
                {icon && iconMap[icon] && (
                    <Row>
                        <Col md={8}>
                            {
                                <p style={{ textAlign: 'center' }}>{statusStore ? "Active" : "Closed"}</p>
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
            </S.CardStoreContent>
        </S.CardStoreContainer>
    );
}

export default CardStatus;
