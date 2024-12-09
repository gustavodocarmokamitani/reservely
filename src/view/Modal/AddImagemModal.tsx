import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button";
import * as S from "../Modal.styles";
import closeIcon from "../../assets/remove.svg";
import ImagemUpload from "../../components/ImagemUpload";

interface AddImagemModalProps {
  title: string;
  subTitle?: string;
  imagem?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  size: "pequeno" | "medio" | "grande";
}

const AddImagemModal: React.FC<AddImagemModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  imagem,
  size,
}) => {
  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  useEffect(() => {
  }, []);

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
        {imagem && (
          <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ImagemUpload />
          </Row>
        )}
        <hr />
        <Row>
          <Col
            md={12}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <Button $isFechar type="button" onClick={handleClose} />
            <Button $isConfirmar type="button" onClick={handleSubmit} />
          </Col>
        </Row>
      </div>
    </S.Overlay>
  );
};

export default AddImagemModal;
