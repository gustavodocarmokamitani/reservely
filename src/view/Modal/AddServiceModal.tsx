import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Service, ServiceServiceType } from "../../models/Service";
import * as S from "./Modal.styles";
import Button from "../../components/Button";
import InputGroupServico from "../../components/InputGroup/InputGroupServico";
import closeIcon from "../../assets/remove.svg";
import { enqueueSnackbar } from "notistack";
import { createServiceTypeByStoreId } from "../../services/ServiceTypeServices";

interface AddServiceModalProps {
  title: string;
  subTitle?: string;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "small" | "medium" | "large"; 
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  size, 
  fetchData,
}) => {
  const [formValuesService, setFormValuesService] = useState<Service>({
    id: 0,
    name: "",
    description: "",
    value: "",
    durationMinutes: "",
    active: "false",
    storeId: 0,
  });
 
  const storeUser = Number(localStorage.getItem("storeUser"));

  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
  };

  const validateFormValues = (formValues: Service): boolean => {
    const fieldValidations = [
      { field: "name", message: "O campo 'Nome' é obrigatório." },
      { field: "value", message: "O campo 'Valor' é obrigatório." },
      { field: "durationMinutes", message: "O campo 'Duração (minutos)' é obrigatório." },
      { field: "description", message: "O campo 'Descrição' é obrigatório." },
    ];
  
    for (const { field, message } of fieldValidations) {
      if (!formValues[field as keyof Service]) {
        enqueueSnackbar(message, { variant: "error" });
        return false;
      }
    }
  
    return true;
  };  

  const handleSubmit = async () => {
    try {
      if (!validateFormValues(formValuesService)) {
        return;
      }

      const tipoService: ServiceServiceType[] = [
        {
          id: formValuesService.id,
          name: formValuesService.name,
          description: formValuesService.description,
          value: parseFloat(formValuesService.value as string),
          active: formValuesService.active === "true",
          durationMinutes: parseFloat(
            formValuesService.durationMinutes as string
          ),
          services: [
            {
              id: formValuesService.id,
              serviceTypeId: formValuesService.id,
              storeId: storeUser,
            },
          ],
        },
      ];

      const responsePost = await createServiceTypeByStoreId(1, tipoService);

      if (responsePost) {
        enqueueSnackbar("Serviço criado com sucesso!", { variant: "success" });
        fetchData();
      }
      handleClose();
    } catch (error) {
      console.error("Erro durante o request:", error);
      enqueueSnackbar("Erro inesperado! Verifique os dados.", {
        variant: "error",
      });
    }
  };

  const handleInputChangeService = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
