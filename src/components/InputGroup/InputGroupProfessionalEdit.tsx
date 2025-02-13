import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../Input/Input";
import { UserEmployee } from "../../models/UserEmployee";
import SelectableBox from "../SelectableBox/SelectableBox";
import { Service } from "../../models/Service";
import { getServiceTypesByStore } from "../../services/ServiceTypeServices";

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
  employeeSelected?: {
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
  employeeSelected,
  edit = false,
  addProf = false,
}) => {
  const [selectableBoxServices, setSelectableBoxServices] = useState<Service[]>(
    []
  );
  const [dataOptions, setDataOptions] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] =
      useState<number[]>(employeeSelected ? employeeSelected[0].serviceIds : []);
  const storeUser = Number(localStorage.getItem("storeUser"));

  useEffect(() => {
    if (edit && employeeSelected?.[0]) {
      const newState = {
        id: employeeSelected[0].id,
        userId: employeeSelected[0].userId,
        name: employeeSelected[0].name,
        lastName: employeeSelected[0].lastName,
        email: employeeSelected[0].email,
        phone: employeeSelected[0].phone,
        active: employeeSelected[0].active,
        userTypeId: employeeSelected[0].userTypeId,
        password: employeeSelected[0].password,
        serviceIds: employeeSelected[0].serviceIds,
        storeId: employeeSelected[0].storeId,
      };

      setFormValuesProfessional?.((prevState) => {
        if (newState.id !== prevState.id) {
          return newState;
        }
        return prevState;
      });
    }
  }, [edit, employeeSelected, setFormValuesProfessional]);

  const professionalData = employeeSelected?.[0] ?? null;

  const handleServiceSelection = (serviceIds: number[]) => {
    setFormValuesProfessional((prev) => ({
      ...prev,
      serviceIds,
    }));
  };

  useEffect(() => {
    const fetchSelectableBox = async () => {
      try {
        let fetchedServices: Service[] = [];

          const allServices = await getServiceTypesByStore(storeUser);

          fetchedServices = [...fetchedServices, ...allServices];

        const uniqueServices = Array.from(
          new Map(
            fetchedServices.map((service) => [service.id, service])
          ).values()
        );
        setSelectableBoxServices(uniqueServices);

        setSelectedServices(employeeSelected ? employeeSelected[0].serviceIds : []);
      } catch (error) {
        console.error(
          "Error when searching for employee and service information:",
          error
        );
      }
    };

    fetchSelectableBox();
  }, [storeUser, employeeSelected && employeeSelected[0].serviceIds]);
  

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
        {edit && (
          <SelectableBox
            onChange={handleServiceSelection}
            data={selectableBoxServices}
            setSelectedServices={setSelectedServices}
            selectedServices={selectedServices}
          />
        )}
      </Col>
    </Row>
  );
};

export default InputGroupProfessionalEdit;
