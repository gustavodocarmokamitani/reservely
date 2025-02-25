import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button/Button";
import * as S from "./Modal.styles";
import closeIcon from "../../assets/remove.svg";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

interface AddImageModalProps {
  title: string;
  subTitle?: string;
  image?: boolean;
  handleClose: () => void;
  size: "small" | "medium" | "large";
}

const AddImageModal: React.FC<AddImageModalProps> = ({
  handleClose,
  title,
  subTitle,
  image,
  size,
}) => {
  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
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
        {image && (
          <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ImageUpload />
          </Row>
        )}
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

export default AddImageModal;
