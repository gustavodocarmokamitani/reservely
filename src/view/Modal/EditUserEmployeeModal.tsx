import { useEffect, useState } from "react";
import { User } from "../../models/User";
import { UserEmployee } from "../../models/UserEmployee";
import { Employee } from "../../models/Employee";
import { Col, Row } from "react-bootstrap";
import {
  getEmployeeIdByUserId,
  updateEmployee,
} from "../../services/EmployeeServices";
import { getUserById } from "../../services/UserServices";
import * as S from "./Modal.styles";
import Button from "../../components/Button";
import closeIcon from "../../assets/remove.svg";
import InputGroupProfissional from "../../components/InputGroup/InputGroupProfessionalEdit";
import { useSnackbar } from "notistack";

interface EditUserEmployeeModalProps {
  title: string;
  subTitle?: string;
  edit?: boolean;
  handleClose: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
  fetchData: () => void;
}

interface CombinedData extends Employee, User {}

const EditUserEmployeeModal: React.FC<EditUserEmployeeModalProps> = ({
  handleClose,
  title,
  subTitle,
  size,
  rowId,
  edit = false,
  fetchData
}) => {
  const [user, setUser] = useState<User[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedData | null>(null);
 
  const storeUser = Number(localStorage.getItem("storeUser"));

  const { enqueueSnackbar } = useSnackbar();

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
      storeId: 0,
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
            storeId: employee.storeId,
          }));

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
              storeId: storeUser,
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
  }, [edit, rowId, storeUser]);

  const handleSubmit = async () => {
    if (edit) {
      console.log(123, user);

      const response = await getEmployeeIdByUserId(formValuesProfessional.id);

      if (response) {
        const { id, userId, active, serviceIds } = response;

        const updatedEmployee = {
          id,
          userId,
          active: formValuesProfessional.active || active,
          serviceIds: formValuesProfessional.serviceIds || serviceIds,
          storeId: storeUser,
        };
        console.log(updatedEmployee);

        const updateEmployeeResponse = await updateEmployee(
          updatedEmployee.id,
          updatedEmployee
        );
        if (updateEmployeeResponse) {
          fetchData();
          enqueueSnackbar("Professional criado com sucesso!", {
            variant: "success",
          });
        }
      }
    }
    handleClose();
  };

  const handleInputChangeProfissional = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;
    setFormValuesProfessional((prev) => ({
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
        {edit && (
          <InputGroupProfissional
            setFormValuesProfessional={setFormValuesProfessional}
            formValuesProfessional={formValuesProfessional}
            handleInputChange={handleInputChangeProfissional}
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

export default EditUserEmployeeModal;
