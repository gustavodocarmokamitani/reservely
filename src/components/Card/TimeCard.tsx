import React from 'react';
import { Col, Row } from 'react-bootstrap';
import * as S from "./styles/Card.styles";
import calendar from '../../assets/calendar.svg';
import remove from '../../assets/remove.svg';
import confirm from '../../assets/confirmCardStore.svg';

interface CardTimeProps {
    title?: string;
    icon?: "remove" | "confirm" | 'calendar';
    selectedTimes?: string[];
}

const iconMap = {
    confirm,
    remove,
    calendar
};

const CardTime: React.FC<CardTimeProps> = ({ title, icon, selectedTimes }) => {
    console.log(selectedTimes);
    
    return (
        <S.CardStoreContainer>
            <S.CardStoreContent>
                <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>{title}</h4>
                {icon && iconMap[icon] && (
                    <Row>
                        <Col md={8}>
                            {
                                title === 'Hora de abertura' ?
                                    <p style={{ textAlign: 'center' }}>{(selectedTimes && selectedTimes[0] !== "string") ? selectedTimes[0] : null}</p>
                                    :
                                    <p style={{ textAlign: 'center' }}>{selectedTimes ? selectedTimes[1] : null}</p>
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

export default CardTime;
