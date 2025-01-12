import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button";
import Selected from "../../components/Selected";
import * as S from "./Modal.styles";
import closeIcon from "../../assets/remove.svg";

interface InfoAppointmentServiceModalProps {
  title: string;
  subTitle?: string;  
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "pequeno" | "medio" | "grande";
  rowId?: number;
}

const InfoAppointmentServiceModal: React.FC<InfoAppointmentServiceModalProps> = ({
  handleClose,
  title,
  subTitle,
  size,
  rowId,
}) => {
  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  const handleSubmit = async () => {
    handleClose();
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

        <Selected onChange={() => {}} userId={rowId} infoAppointmentService />

        <hr />

        <Row>
          <Col
            md={12}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <Button $isClosed type="button" onClick={handleClose} />
            <Button $isConfirm type="button" onClick={handleSubmit} />
          </Col>
        </Row>
      </div>
    </S.Overlay>
  );
};

export default InfoAppointmentServiceModal;
