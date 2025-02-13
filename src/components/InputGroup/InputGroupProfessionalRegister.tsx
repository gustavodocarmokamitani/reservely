import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../Input/Input";

interface InputGroupProfessionalRegisterProps {
  formValuesProfessionalRegister: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    active: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroupProfessionalRegister: React.FC<
  InputGroupProfessionalRegisterProps
> = ({ formValuesProfessionalRegister, handleInputChange }) => {
  return (
    <Row>
      <Col md={6} className="mt-3 mb-3">
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
        <Input
          width="300"
          type="text"
          placeholder="Sobrenome"
          name="lastName"
          value={formValuesProfessionalRegister.lastName}
          onChange={(e) =>
            handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
          }
        />
      </Col>
      <Col md={6} className="mt-3 mb-3">
        <Input
          width="300"
          type="text"
          placeholder="Email"
          name="email"
          value={formValuesProfessionalRegister.email}
          onChange={(e) =>
            handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
          }
        />
        <Input
          width="300"
          type="text"
          placeholder="Telefone"
          phone
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

export default InputGroupProfessionalRegister;
