import React from 'react';
import { Col, Row } from 'react-bootstrap';
import * as S from "./styles/Card.styles";
import remove from '../../assets/removeRed.svg';
import confirm from '../../assets/confirmCardStore.svg';
import calendar from '../../assets/calendar.svg';

interface ClosingDateCardProps {
    title?: string;
    text?: string;
    icon?: "remove" | "confirm" | 'calendar';
    onRemove?: () => void;
}

const iconMap = {
    confirm,
    remove,
    calendar
};

const ClosingDateCard: React.FC<ClosingDateCardProps> = ({ title, text, icon, onRemove }) => {
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
                                onClick={icon === "remove" ? onRemove : undefined}
                                style={{cursor: "pointer"}}
                            />
                        </Col>
                    </Row>
                )}
            </S.CardStoreContent>
        </S.CardStoreContainer>
    );
}

export default ClosingDateCard;
