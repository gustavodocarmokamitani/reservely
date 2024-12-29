import { useEffect, useState } from "react";

import { Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import * as S from "./Modal.styles";
import Button from "../../components/Button";
import closeIcon from "../../assets/remove.svg";
import InputGroupProfessional from "../../components/InputGroupProfessional";
import { UserEmployee } from "../../models/UserEmployee";
import api from "../../axiosInstance";
import { getServices } from "../../services/ServiceServices";
import { getServiceTypes } from "../../services/ServiceTypeServices";

interface AddUserEmployeeModalProps {
  title: string;
  subTitle?: string;
  professional?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserEmployeeModal: React.FC<AddUserEmployeeModalProps> = ({
  handleClose,
  title,
  subTitle,
  professional,
  size,
  setPost,
}) => {
  const [formValuesProfessional, setFormValuesProfessional] = useState<UserEmployee>({
    id: 0,
    userId: 0,
    name: "",
    lastName: "",
    email: "",
    phone: "",
    active: "false",
    password: "",
    userTypeId: 0,
    serviceIds: [] as number[],
  });

  const { setUserEmployeeContext, userEmployeeContext } = useContext(AppContext)!;
  const [serviceType, setServiceType] = useState([]);

  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
  };

  useEffect(() => {
    async function fetchServices() {
      const services = await getServiceTypes();
       
      setServiceType(services.data);
    }
    fetchServices();
  }, []);
  

  const handleSubmit = async () => {
    if (professional) {
      const professionalData = {
        ...formValuesProfessional,
        serviceIds: formValuesProfessional.serviceIds,
        storeId: 1
      };
      console.log(professionalData);
      
      setUserEmployeeContext(professionalData);
      setPost(true);
    }
    handleClose();
  };

  const handleServiceSelection = (serviceIds: number[]) => {
    setFormValuesProfessional((prev) => ({
      ...prev,
      serviceIds,
    }));
  };
  const handleInputChangeProfessional = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormValuesProfessional((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
  };
  useEffect(() => {
    console.log("Updated userEmployeeContext:", userEmployeeContext);
  }, [userEmployeeContext]);
  
  

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
        {professional && (
          <InputGroupProfessional
          setFormValuesProfessional={setFormValuesProfessional}
            formValuesProfessional={formValuesProfessional}
            handleInputChange={handleInputChangeProfessional}
            handleServiceSelection={handleServiceSelection}
            data={serviceType}
            addProf
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

export default AddUserEmployeeModal;
