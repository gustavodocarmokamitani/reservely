import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../Input/Input";
import SelectableBox from "../SelectableBox/SelectableBox";
import { UserEmployee } from "../../models/UserEmployee";
import { Service } from "../../models/Service";
import { Employee } from "../../models/Employee";
import { User } from "../../models/User";

interface CombinedData extends Employee, User {}

interface InputGroupProfessionalEditProps {
  formValuesProfessional: UserEmployee;
  setFormValuesProfessional: React.Dispatch<React.SetStateAction<UserEmployee>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  employeeSelected?: CombinedData[];
  selectedServices: number[];
  selectableBoxServices: Service[];
  handleServiceSelection: (serviceIds: number[]) => void;
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>;
  fetchLoadEditFormValues: (
    employeeSelected: any,
    setFormValuesProfessional: React.Dispatch<
      React.SetStateAction<UserEmployee>
    >
  ) => void;
}

const InputGroupProfessionalEdit: React.FC<InputGroupProfessionalEditProps> = ({
  formValuesProfessional,
  setFormValuesProfessional,
  handleInputChange,
  employeeSelected,
  selectedServices,
  selectableBoxServices,
  setSelectedServices,
  fetchLoadEditFormValues,
  handleServiceSelection,
}) => {
  useEffect(() => {
    fetchLoadEditFormValues(employeeSelected, setFormValuesProfessional);
  }, [employeeSelected, setFormValuesProfessional]);

  return (
    <Row>
      <Col md={4} className="mt-3 mb-3">
        <Input
          width="300"
          type="toggle"
          placeholder="Ativo"
          name="active"
          value={formValuesProfessional.active}
          onChange={(e) =>
            handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
          }
        />
      </Col>
      <Col md={8}>
        <SelectableBox
          onChange={handleServiceSelection}
          data={selectableBoxServices}
          setSelectedServices={setSelectedServices}
          selectedServices={selectedServices}
        />
      </Col>
    </Row>
  );
};

export default InputGroupProfessionalEdit;
