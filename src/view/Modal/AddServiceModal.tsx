import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { ServiceType } from "../../models/ServiceType";
import { Service } from "../../models/Service";
import * as S from "./Modal.styles";
import Button from "../../components/Button";
import closeIcon from "../../assets/remove.svg";
import InputGroudServico from "../../components/InputGroudServico";

interface AddServiceModalProps {
  title: string;
  subTitle?: string;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "small" | "medium" | "large";
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  size,
  setPost,
}) => {
  const [formValuesService, setFormValuesService] = useState<Service>({
    id: 0,
    name: "",
    description: "",
    value: "",
    durationMinutes: "",
    active: "false",
    storeId: 0
  });

  const {
    setServiceContext
  } = useContext(AppContext)!;

  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
  };

  const handleSubmit = async () => {
    if (formValuesService) {
      const tipoService: ServiceType = {
        ...formValuesService,
        value: parseFloat(formValuesService.value as string),
        durationMinutes: parseFloat(formValuesService.durationMinutes as string),
        active: Boolean(formValuesService.active as string),
      };

      setServiceContext(tipoService);
    }
  
    setPost(true);
    handleClose();
  };
  

  const handleInputChangeService = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormValuesService((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
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
        <InputGroudServico
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
