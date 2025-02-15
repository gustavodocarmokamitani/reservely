import { User } from "../../models/User";
import { UserEmployee } from "../../models/UserEmployee";
import { Employee } from "../../models/Employee";
import { Col, Row } from "react-bootstrap";
import * as S from "./Modal.styles";
import Button from "../../components/Button/Button";
import closeIcon from "../../assets/remove.svg";
import InputGroupProfissional from "../../components/InputGroup/InputGroupProfessionalEdit";
import { Service } from "../../models/Service";

interface EditUserEmployeeModalProps {
  title: string;
  subTitle?: string;
  size: "small" | "medium" | "large";
  formValuesProfessional: UserEmployee;
  setFormValuesProfessional: React.Dispatch<React.SetStateAction<UserEmployee>>;  
  selectedServices: number[];
  selectableBoxServices: Service[];
  handleSubmit: () => void;
  handleServiceSelection: (serviceIds: number[]) => void;
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>;
  fetchLoadEditFormValues: (
    employeeSelected: CombinedData[],
    setFormValuesProfessional: React.Dispatch<
    React.SetStateAction<UserEmployee>
    >
  ) => void;
  handleInputChangeProfessional: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  combinedData: CombinedData | null;
  handleClose: () => void;
}

interface CombinedData extends Employee, User {}

const EditUserEmployeeModal: React.FC<EditUserEmployeeModalProps> = ({
  handleClose,
  title,
  subTitle,
  size,

  formValuesProfessional,
  setFormValuesProfessional,
  handleInputChangeProfessional,

  combinedData,
  handleSubmit,
  selectedServices,
  selectableBoxServices,
  setSelectedServices,
  fetchLoadEditFormValues,
  handleServiceSelection,
}) => {
  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
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
        <InputGroupProfissional
          setFormValuesProfessional={setFormValuesProfessional}
          formValuesProfessional={formValuesProfessional}
          handleInputChange={handleInputChangeProfessional}
          employeeSelected={combinedData ? [combinedData] : undefined}
          selectableBoxServices={selectableBoxServices}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          fetchLoadEditFormValues={fetchLoadEditFormValues}
          handleServiceSelection={handleServiceSelection}
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

export default EditUserEmployeeModal;
