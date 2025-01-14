import { useEffect, useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { Col, Row } from "react-bootstrap";

import { AppContext } from "../../context/AppContext";
import Button from "../../components/Button";
import InputGroupProfessionalAdd from "../../components/InputGroup/InputGroupProfessionalAdd";
import InputGroupProfessionalRegister from "../../components/InputGroup/InputGroupProfessionalRegister";

import { getServiceTypes } from "../../services/ServiceTypeServices";
import { checkEmail, registerProfessional } from "../../services/AuthService";
import {
  createEmployee,
  getEmployeeIdByUserId,
} from "../../services/EmployeeServices";

import closeIcon from "../../assets/remove.svg";

import { UserEmployee } from "../../models/UserEmployee";
import { Employee } from "../../models/Employee";
import { RegisterEmployee } from "../../models/RegisterEmployee";
import { SelectOption } from "../../models/SelectOptions";

import * as S from "./Modal.styles";

interface AddUserEmployeeModalProps {
  title: string;
  subTitle?: string;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
}

const AddUserEmployeeRegisterModal: React.FC<AddUserEmployeeModalProps> = ({
  handleClose,
  title,
  subTitle,
  size,
  fetchData,
}) => {
  const [formValuesProfessionalRegister, setFormValuesProfessionalRegister] =
    useState<UserEmployee>({
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
      storeId: 0,
    });

  const { setPostEmployeeRegister } = useContext(AppContext)!;
  const [serviceType, setServiceType] = useState([]);
  const [loading, setLoading] = useState(false);

  const storeUser = Number(localStorage.getItem("storeUser"));

  const { enqueueSnackbar } = useSnackbar();

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
    try {
      const professionalData = formatProfessionalData(
        formValuesProfessionalRegister
      );
      console.log(professionalData);

      await handleRegister(professionalData);

      fetchData();
      handleClose();
    } catch (error) {
      console.error("Erro ao registrar o profissional:", error);
    }
  };

  const formatString = (str: string): string => str.toLowerCase();

  const formatProfessionalData = (data: UserEmployee): RegisterEmployee => {
    const isValidEmail =
      data.email.includes("@") && data.email.endsWith(".com");

    if (!isValidEmail) {
      enqueueSnackbar(
        "Email inválido. Certifique-se de que o email está correto.",
        {
          variant: "warning",
        }
      );
      throw new Error(
        "Email inválido. Certifique-se de que o email está correto."
      );
    }

    return {
      name: formatString(data.name),
      lastName: formatString(data.lastName),
      email: formatString(data.email),
      phone: data.phone,
      userTypeId: 2,
      storeId: storeUser,
    };
  };

  const handleRegister = async (professionalData: RegisterEmployee) => {
    setLoading(true);
    const emailExists = await checkEmail(professionalData.email);

    if (emailExists) {
      enqueueSnackbar("Este e-mail já está cadastrado.", {
        variant: "default",
      });
      return;
    }

    try {
      const response = await registerProfessional(professionalData);

      if (response) {
        enqueueSnackbar("Profissional registrado com sucesso.", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Erro ao registrar profissional:", error);
    } finally {
      setPostEmployeeRegister(false);
      setLoading(false);
    }
  };

  const handleInputChangeProfessional = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;
    setFormValuesProfessionalRegister((prev) => ({
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
        <InputGroupProfessionalRegister
          formValuesProfessionalRegister={formValuesProfessionalRegister}
          handleInputChange={handleInputChangeProfessional}
        />
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
              disabled={loading}
            />
          </Col>
        </Row>
      </div>
    </S.Overlay>
  );
};

export default AddUserEmployeeRegisterModal;
