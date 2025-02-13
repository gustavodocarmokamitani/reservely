import React, { useEffect } from "react";

import { Col, Row } from "react-bootstrap";

import Input from "../Input/Input";

import { UserEmployee } from "../../models/UserEmployee";

interface InputGroupProfessionalRegisterEditProps {
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
    storeId: number;
  }[];
}

const InputGroupProfessionalRegisterEdit: React.FC<
  InputGroupProfessionalRegisterEditProps
> = ({
  formValuesProfessionalRegister,
  handleInputChange,
  setFormValuesProfessionalRegister,
  data,
}) => {
  
  useEffect(() => {
    if (data?.[0]) {
      const {
        id,
        userId,
        name,
        lastName,
        email,
        phone,
        active,
        userTypeId,
        password,
        serviceIds,
        storeId,
      } = data[0];

      setFormValuesProfessionalRegister((prevState) => {
        if (id !== prevState.id) {
          return {
            id,
            userId,
            name,
            lastName,
            email,
            phone,
            active,
            userTypeId,
            password,
            serviceIds,
            storeId,
          };
        }
        return prevState;
      });
    }
  }, [data, setFormValuesProfessionalRegister]);

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
