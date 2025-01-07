import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../Input";
import Selected from "../Selected";
import { UserEmployee } from "../../models/UserEmployee";
import { SelectOption } from "../../models/SelectOptions";
import { Employee } from "../../models/Employee";
import { AppContext } from "../../context/AppContext";
import EmployeeSelect from "../Select/EmployeeSelect";
import { decodeToken } from "../../services/AuthService";

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

interface InputGroupProfessionalAddProps {
  edit?: boolean;
  register?: boolean;
  addProf?: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValueProfessional: (value: Employee | undefined) => void;
  setFormValuesProfessional: React.Dispatch<React.SetStateAction<UserEmployee>>;
  setEmployee: React.Dispatch<React.SetStateAction<SelectOption | null>>;
  employee: { value: number; label: string } | null;
  formValuesProfessional: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    active: string;
    serviceIds: number[];
  };
  data?: {
    id: number;
    userId: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    active: string;
    serviceIds: number[];
    password: string;
    userTypeId: number;
  }[];
}
const InputGroupProfessionalAdd: React.FC<InputGroupProfessionalAddProps> = ({
  handleInputChange,
  setValueProfessional,
  setFormValuesProfessional,
  formValuesProfessional,
  setEmployee,
  employee,
  data,
  edit = false,
  addProf = false,
  register = false,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState<SelectOption | null>(
    null
  );

  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();
  const { userRoleContext } = useContext(AppContext)!;

const fetchToken = async () => {
    if (storedToken) {
      try {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

    useEffect(() => {
    fetchToken();
    }, []);

  useEffect(() => {
    if (edit && data?.[0]) {
      const newState = {
        id: data[0].id,
        userId: data[0].userId,
        name: data[0].name,
        lastName: data[0].lastName,
        email: data[0].email,
        phone: data[0].phone,
        active: data[0].active,
        userTypeId: data[0].userTypeId,
        password: data[0].password,
        serviceIds: data[0].serviceIds,
      };

      setFormValuesProfessional?.((prevState) => {
        if (newState.id !== prevState.id) {
          return newState;
        }
        return prevState;
      });
    }
  }, [edit, data, setFormValuesProfessional]);

  const professionalData = data?.[0] ?? null;

  const handleEmployeeChange = async (employee: SelectOption | null) => {
    setSelectedEmployee(employee);
  };

  const handleServiceSelection = (serviceIds: number[]) => {
    setFormValuesProfessional((prev) => ({
      ...prev,
      serviceIds,
    }));
  };

  return (
    <Row>
      {decodedData?.userRole === "Admin" && (
        <>
          <Col md={4} className="mt-3 mb-3">
            <EmployeeSelect
              value={employee?.value}
              setEmployee={setEmployee}
              handleEmployeeChange={handleEmployeeChange}
            />
          </Col>
        </>
      )}
      {!register && (
        <Col md={8} className="px-5">
          {edit && (
            <Selected
              options={professionalData ? [professionalData] : undefined}
              onChange={handleServiceSelection}
              edit
            />
          )}
          {addProf && (
            <Selected
              options={professionalData ? [professionalData] : undefined}
              onChange={handleServiceSelection}
              addProf
            />
          )}
        </Col>
      )}
    </Row>
  );
};

export default InputGroupProfessionalAdd;
