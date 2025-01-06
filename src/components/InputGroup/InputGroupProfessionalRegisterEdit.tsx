import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../Input";
import Selected from "../Selected";
import { UserEmployee } from "../../models/UserEmployee";

interface InputGroupProfessionalRegisterEditProps {
  edit?: boolean;
  addProf?: boolean;
  formValuesProfessionalRegister: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    active: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFormValuesProfessionalRegister: React.Dispatch<
    React.SetStateAction<UserEmployee>
  >;
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
const InputGroupProfessionalRegisterEdit: React.FC<
  InputGroupProfessionalRegisterEditProps
> = ({
  formValuesProfessionalRegister,
  handleInputChange,
  setFormValuesProfessionalRegister,
  data,
  edit = false,
  addProf = false,
}) => {
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

      setFormValuesProfessionalRegister((prevState) => {
        if (newState.id !== prevState.id) {
          return newState;
        }
        return prevState;
      });
    }
  }, [edit, data, setFormValuesProfessionalRegister]);

  const professionalData = data?.[0] ?? null;

  return (
    <Row>
      <Col md={4} className="mt-3 mb-3">
        <Input
          width="300"
          type="text"
          placeholder="Nome"
          name="name"
          value={formValuesProfessionalRegister.name}
          onChange={(e) =>
            handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
          }
        />
      </Col>
      <Col md={4} className="mt-3 mb-3">
        <Input
          width="300"
          type="text"
          placeholder="Sobrename"
          name="lastName"
          value={formValuesProfessionalRegister.lastName}
          onChange={(e) =>
            handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
          }
        />
      </Col>
      <Col md={4} className="mt-3 mb-3">
        <Input
          width="300"
          type="text"
          placeholder="Telefone"
          name="phone"
          value={formValuesProfessionalRegister.phone}
          onChange={(e) =>
            handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
          }
        />
      </Col>
    </Row>
  );
};

export default InputGroupProfessionalRegisterEdit;
