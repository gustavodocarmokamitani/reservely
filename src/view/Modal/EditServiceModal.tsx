import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { enqueueSnackbar } from "notistack";

import Button from "../../components/Button";
import InputGroupService from "../../components/InputGroup/InputGroupServico";
import closeIcon from "../../assets/remove.svg";
import * as S from "./Modal.styles";

import { Service, ServiceServiceType } from "../../models/Service";
import { getServiceTypeById, updateServiceType } from "../../services/ServiceTypeServices";

interface EditServiceModalProps {
  title: string;
  subTitle?: string;
  editService?: boolean;
  handleClose: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
  fetchData: () => void;
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
  handleClose,
  title,
  subTitle,
  size,
  rowId,
  editService = false,
  fetchData,
}) => {
  const [serviceType, setServiceType] = useState<Service>();

  const [formValuesService, setFormValuesService] = useState<Service>({
    id: 0,
    name: "",
    description: "",
    value: "",
    durationMinutes: "",
    active: "false",
    storeId: 0,
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
          console.log(response);

          if (response) setServiceType(response.data);
        } catch (error) {
          console.error("Error when fetching service:", error);
        }
      };

      fetchService();
    }
  }, [editService, rowId]);

  const handleSubmit = async () => {
    try {
      const responseServiceType = await getServiceTypeById(formValuesService.id);

      if (responseServiceType && responseServiceType.data) {
        const serviceType = responseServiceType.data;

        const tipoService: ServiceServiceType = {
          id: formValuesService.id,
          name: formValuesService.name,
          description: formValuesService.description,
          value: parseFloat(formValuesService.value as string),
          active: formValuesService.active === "true",
          durationMinutes: parseFloat(formValuesService.durationMinutes as string),
          services: serviceType.services ? serviceType.services : null,
        };

        console.log("RESULTADO DO UPDATE", tipoService);

        const responseUpdate = await updateServiceType(formValuesService.id, tipoService);
        if (responseUpdate) {
          enqueueSnackbar("Serviço criado com sucesso!", { variant: "success" });
          fetchData();
        }
      } else {
        enqueueSnackbar("Erro ao buscar tipo de serviço.", { variant: "error" });
      }
    } catch (error) {
      console.error("Erro durante o request:", error);
      enqueueSnackbar("Erro inesperado! Verifique os dados.", { variant: "error" });
    }

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
          <Col md={2} style={{ textAlign: "right", cursor: "pointer" }} onClick={handleClose}>
            <img src={closeIcon} alt="Close Icon" style={{ marginRight: "8px", verticalAlign: "middle" }} width={25} />
          </Col>
          <hr />
        </Row>
        {editService && (
          <InputGroupService
            formValuesService={formValuesService}
            handleInputChange={handleInputChangeService}
            data={serviceType ? [serviceType] : []}
            editService
            setFormValuesService={setFormValuesService}
          />
        )}
        <hr />
        <Row>
          <Col md={12} className="d-flex flex-row justify-content-center align-items-center">
            <Button $isClosed type="button" onClick={handleClose} />
            <Button $isConfirm type="button" onClick={handleSubmit} />
          </Col>
        </Row>
      </div>
    </S.Overlay>
  );
};

export default EditServiceModal;
