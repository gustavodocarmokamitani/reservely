import { useContext, useEffect, useState } from "react";
import { Service } from "../../models/Service";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button";
import * as S from "./Modal.styles";
import InputGroupService from "../../components/InputGroudServico";
import closeIcon from "../../assets/remove.svg";
import { getServiceTypeById } from "../../services/ServiceTypeServices";
import { AppContext } from "../../context/AppContext";

interface EditServiceModalProps {
  title: string;
  subTitle?: string;
  editService?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  size,
  rowId,
  editService = false,
  setUpdate
}) => {
  const [serviceType, setServiceType] = useState<Service>();
  const {
    setServiceUpdateContext
  } = useContext(AppContext)!;

  const [formValuesService, setFormValuesService] = useState<Service>({
    id: 0,
    name: "",
    description: "",
    value: "",
    durationMinute: "",
    active: "false",
    storeId: 0
  });

  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
  };

  useEffect(() => {
    if (editService && rowId) {
      const fetchService = async () => {
        try {
          const response = await getServiceTypeById(rowId);
          if (response) setServiceType(response.data);
        } catch (error) {
          console.error("Error when fetching service:", error);
        }
      };

      fetchService();
    }
  }, [editService, rowId]);

  const handleSubmit = async () => {

    const updatedService = {
      id: formValuesService.id,
      name:formValuesService.name,
      value: parseFloat(formValuesService.value),
      durationMinute: parseFloat(formValuesService.durationMinute),
      active:formValuesService.active == "true" ? true : false,
      description:formValuesService.description,
    };
    
    setServiceUpdateContext(updatedService);
    setUpdate(true);
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
        {editService && (
          <InputGroupService
            title={title}
            subTitle={subTitle!}
            handleShow={handleShow}
            handleClose={handleClose}
            formValuesService={formValuesService}
            handleInputChange={handleInputChangeService}
            data={serviceType ? [serviceType] : []}
            editService
            setFormValuesService={setFormValuesService}
          />
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

export default EditServiceModal;
