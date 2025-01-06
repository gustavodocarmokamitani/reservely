import { useEffect, useState } from "react";
import { User } from "../../models/User";
import { UserEmployee } from "../../models/UserEmployee";
import { Employee } from "../../models/Employee";
import { Col, Row } from "react-bootstrap";
import { getEmployeeIdByUserId } from "../../services/EmployeeServices";
import { getUserById, updateUser } from "../../services/UserServices";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import * as S from "./Modal.styles";
import Button from "../../components/Button";
import closeIcon from "../../assets/remove.svg";
import InputGroupProfissional from "../../components/InputGroup/InputGroupProfessionalEdit";
import InputGroupProfessionalRegister from "../../components/InputGroup/InputGroupProfessionalRegister";
import InputGroupProfessionalRegisterEdit from "../../components/InputGroup/InputGroupProfessionalRegisterEdit";

interface EditEmployeeRegisterModal {
  title: string;
  subTitle?: string;
  edit?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CombinedData extends Employee, User {}

const EditEmployeeRegisterModal: React.FC<EditEmployeeRegisterModal> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  size,
  rowId,
  edit = false,
  setUpdate,
}) => {
  const { setUserEmployeeUpdateContext } = useContext(AppContext)!;
  const [employee, setEmployee] = useState<UserEmployee[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedData | null>(null);

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

  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
  };

  useEffect(() => {
    if (edit) {
      const fetchEmployee = async () => {
        try {
          const resEmployee = await getEmployeeIdByUserId(rowId!);

          let employeeData = Array.isArray(resEmployee)
            ? resEmployee
            : [resEmployee];

          const mappedEmployee = employeeData.map((employee: UserEmployee) => ({
            id: employee.id,
            userId: employee.userId,
            name: employee.name,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            password: employee.password,
            active: employee.active,
            userTypeId: employee.userTypeId,
            serviceIds: employee.serviceIds || [],
          }));

          setEmployee(mappedEmployee);

          if (mappedEmployee.length > 0) {
            const resUser = await getUserById(mappedEmployee[0].userId);

            let userData = Array.isArray(resUser) ? resUser : [resUser];

            const mappedUser = userData.map((user: User) => ({
              id: user.id,
              name: user.name,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
              password: user.password,
              userTypeId: user.userTypeId,
              storeId: 1,
            }));
            setUser(mappedUser);
            const combined = {
              ...mappedEmployee[0],
              ...mappedUser[0],
            };
            setCombinedData(combined);
          }
        } catch (error) {
          console.error("Error when fetching service type", error);
        }
      };
      fetchEmployee();
    }
  }, [edit]);

  const handleSubmit = async () => {
    if (edit) {
      const response = await getUserById(formValuesProfessionalRegister.id);

      if (response) {
        const {
          id,
          name,
          lastName,
          email,
          phone,
          userTypeId,
          password,
          userName,
          phoneNumber,
          emailConfirmed,
          passwordHash,
        } = response;

        const updatedUser = {
          id,
          name: formValuesProfessionalRegister.name,
          lastName: formValuesProfessionalRegister.lastName,
          email,
          phone: formValuesProfessionalRegister.phone,
          userTypeId,
          password,
          userName,
          phoneNumber,
          emailConfirmed,
          passwordHash,
        };

        await updateUser(updatedUser.id, updatedUser);
        setUpdate(true);
      }
    }
    handleClose();
  };

  const handleInputChangeProfessional = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;
    setFormValuesProfessionalRegister((prevState) => ({
      ...prevState,
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
        {edit && (
          <InputGroupProfessionalRegisterEdit
            formValuesProfessionalRegister={formValuesProfessionalRegister}
            setFormValuesProfessionalRegister={
              setFormValuesProfessionalRegister
            }
            handleInputChange={handleInputChangeProfessional}
            data={combinedData ? [combinedData] : undefined}
            edit
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

export default EditEmployeeRegisterModal;
