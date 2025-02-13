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
    small: "650px",
    medium: "850px",
    large: "1050px",
  };

  return (
    <S.Overlay>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: sizeMap[size],
          width: "100%",
        }}
      >
        <Row>
          <Col md={10}>
            <h3>{title}</h3>
            <p>{subTitle}</p>
          </Col>
          <Col
            md={2}
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
          <hr />
        </Row>
        {children}
        <hr />
        <Row>
          <Col
            md={12}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <Button $isClosed type="button" onClick={handleClose} />
            <Button
              $isConfirm
              type="button"
              onClick={handleSubmit}
            />
          </Col>
        </Row>
      </div>
    </S.Overlay>
  );
};

export default Modal;
