import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../Input";
import Selected from "../Selected";
import { UserEmployee } from "../../models/UserEmployee";

interface InputGroupProfessionalEditProps {
  edit?: boolean;
  addProf?: boolean;
  formValuesProfessional: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    active: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  setFormValuesProfessional: React.Dispatch<React.SetStateAction<UserEmployee>>;
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
const InputGroupProfessionalEdit: React.FC<InputGroupProfessionalEditProps> = ({
  formValuesProfessional,
  handleInputChange, 
  setFormValuesProfessional,
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
        storeId: data[0].storeId,
      };
  
      setFormValuesProfessional?.(prevState => {
        if (newState.id !== prevState.id) {
          return newState;
        }
        return prevState;
      });
    }
  }, [edit, data, setFormValuesProfessional]);  

  const professionalData = data?.[0] ?? null;
  
  
  const handleServiceSelection = (serviceIds: number[]) => {
    setFormValuesProfessional((prev) => ({
      ...prev,
      serviceIds,
    }));
  }; 

  return (
    <Row>
      <Col md={4} className="mt-3 mb-3">
         
        <Input
          width="300"
          type="toggle"
          placeholder="Ativo"
          name="active"
          value={formValuesProfessional.active}
           onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
        />
      </Col>
      <Col md={8}>
      {edit &&
          <Selected
            options={professionalData ? [professionalData] : undefined}
            onChange={handleServiceSelection}
            edit
          />
        }
        {addProf &&
          <Selected
            options={professionalData ? [professionalData] : undefined}
            onChange={handleServiceSelection}
            addProf
          />
        }
      </Col>
    </Row>
  );
};

export default InputGroupProfessionalEdit;




