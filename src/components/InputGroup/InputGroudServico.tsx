import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../Input";
import { Service } from "../../models/Service";

interface InputGroupServiceProps {
  editService?: boolean;
  formValuesService: {
    id: number;
    name: string;
    description: string;
    value: string;
    active: string;
    durationMinutes: string;
  };
  data?: Service | Service[];
  setFormValuesService: React.Dispatch<React.SetStateAction<{
    id: number;
    name: string;
    description: string;
    value: string;
    active: string;
    durationMinutes: string;
    storeId: number;
}>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroupService: React.FC<InputGroupServiceProps> = ({
  handleInputChange,
  formValuesService,
  data,
  editService = false,
  setFormValuesService,
}) => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const storeUser = localStorage.getItem("storeUser")
  
  useEffect(() => {
    if (!isInitialized && editService && Array.isArray(data) && data.length > 0) {
      const item = data[0];
      const newState = {
        id: item.id,
        name: item.name,
        description: item.description,
        value: String(item.value),
        active: item.active ? "true" : "false",
        durationMinutes: String(item.durationMinutes),
        storeId: Number(storeUser)
      };
      setFormValuesService(newState);
      setIsInitialized(true); 
    }
  }, [data, editService, isInitialized, setFormValuesService]);

  return (
    <>
      <Row>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="text"
            placeholder="Nome"
            name="name"
            value={formValuesService.name}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          />
        </Col>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="text"
            placeholder="Valor"
            name="value"
            value={formValuesService.value}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          />
        </Col>
      </Row>
      <Row>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="text"
            placeholder="Duração"
            name="durationMinutes"
            value={formValuesService.durationMinutes}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          />
        </Col>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="toggle"
            name="active"
            value={formValuesService.active}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          />
        </Col>
      </Row>
      <Row>
        <Col
          md={12}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="600"
            type="text"
            placeholder="Descrição"
            name="description"
            value={formValuesService.description}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          />
        </Col>
      </Row>
    </>
  );
};

export default InputGroupService;
