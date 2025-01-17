import { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import { User } from "../../models/User";
import { UserEmployee } from "../../models/UserEmployee";
import { Employee } from "../../models/Employee";
import { getUserById, updateUser } from "../../services/UserServices";

import Button from "../../components/Button";

import closeIcon from "../../assets/remove.svg";

import InputGroupProfessionalRegisterEdit from "../../components/InputGroup/InputGroupProfessionalRegisterEdit";

import * as S from "./Modal.styles";
import { useSnackbar } from "notistack";

interface EditEmployeeRegisterModalProps {
  title: string;
  subTitle?: string;
  handleClose: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
  fetchData: () => void;
}

interface CombinedData extends Employee, User { }

const EditEmployeeRegisterModal: React.FC<EditEmployeeRegisterModalProps> = ({
  handleClose,
  title,
  subTitle,
  size,
  rowId,
  fetchData,
}) => {
  const [combinedData, setCombinedData] = useState<CombinedData | null>(null);

  const storeUser = Number(localStorage.getItem("storeUser"));

  const { enqueueSnackbar } = useSnackbar();

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

  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
  };

  const fetchEmployeeData = useCallback(
    async (rowId: number, setCombinedData: Function) => {
      try {
        const resEmployee = await getUserById(rowId);
        const mappedEmployee = {
          id: resEmployee.id,
          userId: resEmployee.userId,
          name: resEmployee.name,
          lastName: resEmployee.lastName,
          email: resEmployee.email,
          phone: resEmployee.phone,
          password: resEmployee.password,
          active: resEmployee.active,
          userTypeId: resEmployee.userTypeId,
          serviceIds: resEmployee.serviceIds || [],
          storeId: resEmployee.storeId,
        };

        const resUser = await getUserById(mappedEmployee.id);
        const mappedUser = {
          id: resUser.id,
          name: resUser.name,
          lastName: resUser.lastName,
          email: resUser.email,
          phone: resUser.phone,
          password: resUser.password,
          userTypeId: resUser.userTypeId,
          storeId: storeUser,
        };

        const combined = { ...mappedEmployee, ...mappedUser };
        setCombinedData(combined);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [storeUser]
  );

  useEffect(() => {
    if (rowId) {
      fetchEmployeeData(rowId, setCombinedData);
    }
  }, [rowId, storeUser, fetchEmployeeData]);

  const handleInputChangeProfessional = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;
    setFormValuesProfessionalRegister((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await getUserById(formValuesProfessionalRegister.id);

      if (response) {
        const updatedUser = {
          ...response,
          name: formValuesProfessionalRegister.name,
          lastName: formValuesProfessionalRegister.lastName,
          phone: formValuesProfessionalRegister.phone,
        };

        const createUserResponse = await updateUser(
          updatedUser.id,
          updatedUser
        );

        if (createUserResponse) {
          enqueueSnackbar("Professional editado com sucesso!", {
            variant: "success",
          });
        }
        fetchData();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      handleClose();
    }
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

        <InputGroupProfessionalRegisterEdit
          formValuesProfessionalRegister={formValuesProfessionalRegister}
          handleInputChange={handleInputChangeProfessional}
          data={combinedData ? [combinedData] : undefined}
          setFormValuesProfessionalRegister={setFormValuesProfessionalRegister}
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

export default EditEmployeeRegisterModal;
