import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Btn from '../components/Button';
import closeIcon from '../assets/remove.svg';
import { Overlay } from './Modal.styles';
import Input from '../components/Input';

interface ModalProps {
    title: string;
    handleShow: () => void;
    handleClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ handleShow, handleClose, title }) => {
    return (
        <Overlay>
            <div style={{ background: "white", padding: "20px", borderRadius: "8px", maxWidth: "900px", width: "100%" }}>
                <Row>
                    <Col><h3>{title}</h3></Col>
                    <Col style={{ textAlign: "right", cursor: "pointer" }} onClick={handleClose}>
                        <img src={closeIcon} alt="Close Icon" style={{ marginRight: "8px", verticalAlign: "middle" }} width={25} />
                    </Col>
                </Row>
                <hr />
                <Row styled="justify-content-center align-items-center">
                    <Col md={6} className='mt-3 mb-3'>
                        <Input
                            width="300"
                            type="text"
                            placeholder="Nome"
                            name="nome"
                        />
                    </Col>
                    <Col md={6} className='mt-3 mb-3 '>
                        <Input
                            width="300"
                            type="text"
                            placeholder="Valor"
                            name="valor"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className='mt-3 mb-3 '>
                        <Input
                            width="300"
                            type="text"
                            placeholder="Duração"
                            name="duracao"
                        />
                    </Col>
                    <Col md={6} className='mt-3 mb-3 '>
                        <Input
                            width="300"
                            type="text"
                            placeholder="Ativo"
                            name="ativo"
                        />
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={12} className="d-flex flex-row justify-content-center align-items-center">
                        <Btn text="Close" type="button" addIconIs={false} removeIconIs={true} onClick={handleClose} />
                        <Btn text="Adicionar" type="button" addIconIs={true} removeIconIs={false} />
                    </Col>
                </Row>
            </div>
        </Overlay>
    )
}

export default Modal;
