import { Col, Row } from "react-bootstrap";
import { Service } from "../../models/Service";
import * as S from "./Modal.styles";
import Button from "../../components/Button/Button";
import InputGroupServico from "../../components/InputGroup/InputGroupServico";
import closeIcon from "../../assets/remove.svg";

interface AddServiceModalProps {
  title: string;
  subTitle?: string;
  setFormValuesService: React.Dispatch<React.SetStateAction<Service>>;
  formValuesService: Service;
  handleShow: () => void;
  handleClose: () => void;
  handleSubmit: () => void;
  handleInputChangeService: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size: "small" | "medium" | "large";
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  size,
  setFormValuesService,
  formValuesService,
  handleInputChangeService,
  handleSubmit,
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

        <InputGroupServico
          formValuesService={formValuesService}
          handleInputChange={handleInputChangeService}
          setFormValuesService={setFormValuesService}
        />
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

export default AddServiceModal;
