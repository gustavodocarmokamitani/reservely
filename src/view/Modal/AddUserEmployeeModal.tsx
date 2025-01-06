import { useEffect, useState } from "react";

import { Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import * as S from "./Modal.styles";
import Button from "../../components/Button";
import closeIcon from "../../assets/remove.svg";
import InputGroupProfessional from "../../components/InputGroup/InputGroupProfessionalEdit";
import { UserEmployee } from "../../models/UserEmployee";
import api from "../../axiosInstance";
import { getServices } from "../../services/ServiceServices";
import { getServiceTypes } from "../../services/ServiceTypeServices";
import InputGroupProfessionalRegister from "../../components/InputGroup/InputGroupProfessionalRegister";
import { checkEmail, registerProfessional } from "../../services/AuthService";
import { useSnackbar } from "notistack";
import { RegisterData } from "../../models/RegisterData";
import { RegisterEmployee } from "../../models/RegisterEmployee";
import { Employee } from "../../models/Employee";
import { createEmployee, getEmployeeById, getEmployeeIdByUserId, getEmployeesByStoreId } from "../../services/EmployeeServices";
import InputGroupProfessionalAdd from "../../components/InputGroup/InputGroupProfessionalAdd";
import { SelectOption } from "../../models/SelectOptions";

interface AddUserEmployeeModalProps {
  title: string;
  subTitle?: string;
  professional?: boolean;
  professionalRegister?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
  post?: boolean;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserEmployeeModal: React.FC<AddUserEmployeeModalProps> = ({
  handleClose,
  title,
  subTitle,
  professional,
  professionalRegister,
  size,
  setPost,
  post,
  fetchData,
}) => {
  const [formValuesProfessional, setFormValuesProfessional] =
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
    });

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
    });

  const { setUserEmployeeContext, setPostEmployeeRegister } =
    useContext(AppContext)!;
    
  const [serviceType, setServiceType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState<SelectOption | null>(null);
  const [valueProfessional, setValueProfessional] = useState<
    Employee | undefined
  >(undefined);

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
    if (professionalRegister) {
      const professionalData = {
        name: formValuesProfessionalRegister.name.toLowerCase(),
        lastName: formValuesProfessionalRegister.lastName.toLowerCase(),
        email: formValuesProfessionalRegister.email.toLowerCase(),
        phone: formValuesProfessionalRegister.phone,
        userTypeId: 2,
      };

      await handleRegister(professionalData);
    }

    if (professional) { 
      if (employee) { 
        const responseEmployee = await getEmployeeIdByUserId(employee.value);

        const employeeData = {
          id: 0,
          userId: responseEmployee.id,
          active: 'true',
          storeId: 1, //TODO alterar store
          serviceIds: formValuesProfessional.serviceIds
        }
        
        handleEmployeeAdd([employeeData]);
      }
    }
    fetchData();
    handleClose();
  };

  const handleEmployeeAdd = async (employeeData: Employee[]) => {
    setLoading(true);
    try {
      console.log(employee);
      
      const updatedEmployeeData = employeeData.map((employee) => ({
        ...employee,
        serviceIds: formValuesProfessional.serviceIds,
      }));

      const response = await createEmployee(updatedEmployeeData);
      if (response) {
        enqueueSnackbar("Profissional adicionado com sucesso.", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Erro ao registrar o profissional: ", error);
      enqueueSnackbar("Ocorreu um erro. Por favor, tente novamente.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
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
      console.log(professionalData);

      const response = await registerProfessional(professionalData);

      if (response) {
        enqueueSnackbar("Profissional registrado com sucesso.", {
          variant: "success",
        });
      }
    } catch (error) {
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
        {professional && (
          <InputGroupProfessionalAdd
            formValuesProfessional={formValuesProfessional}
            setFormValuesProfessional={setFormValuesProfessional}
            setValueProfessional={setValueProfessional}
            handleInputChange={handleInputChangeProfessional}
            data={serviceType}
            setEmployee={setEmployee}
            employee={employee}
            addProf
          />
        )}
        {professionalRegister && (
          <InputGroupProfessionalRegister
            setFormValuesProfessional={setFormValuesProfessional}
            formValuesProfessionalRegister={formValuesProfessionalRegister}
            handleInputChange={handleInputChangeProfessional}
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

export default AddUserEmployeeModal;
