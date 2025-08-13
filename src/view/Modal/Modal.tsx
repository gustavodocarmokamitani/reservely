import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button/Button";
import closeIcon from "../../assets/remove.svg";
import * as S from "./Modal.styles";

interface ModalProps {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  handleSubmit: () => void;
  handleClose: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
}

const Modal: React.FC<ModalProps> = ({
  title,
  subTitle,
  children,
  handleSubmit,
  handleClose,
  size,
}) => {
  const sizeMap = {
    small: "40.625rem",
    medium: "53.125rem",
    large: "65.625rem",
  };

  return (
    <S.Overlay>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: window.innerWidth >= 768 ? "8px" : "0px",
          maxWidth: sizeMap[size],
          width: "100%",
          height: window.innerWidth < 768 ? "100vh" : "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: window.innerWidth < 768 ? "space-between" : "initial",
          position: window.innerWidth < 768 ? "fixed" : "relative",
          top: 0,
          left: 0,
          bottom: 0,
        }}
      >
        {/* Cabeçalho */}
        <div>
          <Row>
            <Col xs={10}>
              <h3>{title}</h3>
              <p>{subTitle}</p>
            </Col>
            {window.innerWidth >= 768 ? (
              <Col
                xs={2}
                style={{ textAlign: "right", cursor: "pointer" }}
                onClick={handleClose}
              >
                <img
                  src={closeIcon}
                  alt="Close Icon"
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                  width={25}
                />
              </Col>
            ) : null}
          </Row>
          <hr />
        </div>

        {/* Conteúdo */}
        {/* Conteúdo com scroll interno */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          <div>
            {children}

            {/* Botões dentro da área scrollável */}
            <Row>
              <Col
                style={{
                  margin:
                    window.innerWidth >= 768
                      ? "1rem 0 2rem 0"
                      : "1rem 0 10rem 0",
                }}
                md={12}
                className="d-flex  flex-row justify-content-center align-items-center gap-2"
              >
                <Button $isClosed type="button" onClick={handleClose} />
                <Button $isConfirm type="button" onClick={handleSubmit} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </S.Overlay>
  );
};

export default Modal;
