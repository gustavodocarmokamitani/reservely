import React from 'react';
import * as S from "./styles/Card.styles";
import { Col, Row } from 'react-bootstrap';
import { Store } from '../../models/Store';
import remove from '../../assets/remove.svg';
import confirm from '../../assets/confirmCardStore.svg';

interface CardStatusProps {
    title?: string;
    icon?: "remove" | "confirm" | 'calendar';
    data: Store | undefined;
    statusStore?: boolean;
}

const CardStatus: React.FC<CardStatusProps> = ({ title, icon, data, statusStore = data?.status }) => {
    const selectedIcon = statusStore ? confirm : remove;

    return (
        <S.CardStoreContainer>
            <S.CardStoreContent>
                <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>{title}</h4>
                <Row>
                    <Col md={8}>
                        <p style={{ textAlign: 'center' }}>
                            {statusStore ? "Ativo" : "Fechado"}
                        </p>
                    </Col>
                    <Col md={4}>
                        <img
                            src={selectedIcon}
                            alt={icon || (statusStore ? "confirm" : "remove")}
                        />
                    </Col>
                </Row>
            </S.CardStoreContent>
        </S.CardStoreContainer>
    );
}

export default CardStatus;
