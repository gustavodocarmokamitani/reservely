import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../Input/Input";
import { Service } from "../../models/Service"; 
import Select from "../Select/Select";
import { SelectOption } from "../../models/SelectOptions";

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
  setFormValuesService: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
      description: string;
      value: string;
      active: string;
      durationMinutes: string;
      storeId: number;
    }>
  >;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroupService: React.FC<InputGroupServiceProps> = ({
  handleInputChange,
  formValuesService,
  data,
  editService = false,
  setFormValuesService,
}) => {
  const [durationMinutes, setDurationMinutes] = useState<SelectOption[]>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const generatedTimes = [];

    for (let hour = 0; hour < 6; hour++) {
      if (hour > 0) {
        generatedTimes.push({
          label: `${String(hour).padStart(2, "0")}:00`,
          value: hour * 60,
        });
      }

      for (let minute = 15; minute < 60; minute += 15) {
        const label =
          hour === 0
            ? `${String(minute).padStart(2, "0")}`
            : `${String(hour).padStart(2, "0")}:${String(minute).padStart(
                2,
                "0"
              )}`;
        const value = hour * 60 + minute;

        generatedTimes.push({ label, value });
      }
    }

    generatedTimes.push({ label: "06:00", value: 360 });

    setOptions(generatedTimes);
  }, []);

  useEffect(() => {
    if (durationMinutes.length > 0) {
      const selectedOption = durationMinutes[0]; 
      setFormValuesService((prevValues) => ({
        ...prevValues,
        durationMinutes: String(selectedOption.value),
      }));
    }
  }, [durationMinutes, setFormValuesService]);
  
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
            onChange={(e) =>
              handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
            }
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
            onChange={(e) =>
              handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
            }
          />
        </Col>
      </Row>
      <Row>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Select
            setData={setDurationMinutes}
            value={durationMinutes}
            options={options}
            placeholder="Selecione a duração"       
          />
          {/* <DurationMinuteSelect
            value={formValuesService.durationMinutes}
            setFormValuesService={setFormValuesService}
          /> */}
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
            onChange={(e) =>
              handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
            }
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
            onChange={(e) =>
              handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default InputGroupService;
