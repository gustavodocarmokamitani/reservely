import { useState } from "react";
import { UserEmployee } from "../../models/UserEmployee";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button";
import * as S from "./Modal.styles";
import closeIcon from "../../assets/remove.svg";
import Selected from "../../components/Selected";

interface InfoEmployeeServiceModalProps {
  title: string;
  subTitle?: string;
  info?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
}

const InfoEmployeeServicemodal: React.FC<InfoEmployeeServiceModalProps> = ({
  handleClose,
  title,
  subTitle,
  info = false,
  size,
  rowId,
}) => {
  const [formValuesProfessional, setFormValuesProfessional] = useState<UserEmployee>({
    id: 0,
    userId: 0,
    name: "",
    lastname: "",
    email: "",
    phone: "",
    active: "false",
    password: "",
    userTypeId: 0,
    servicesId: [] as number[],
  });

  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
  };

  const handleSubmit = async () => {
    handleClose();
  };

  const handleServiceSelection = (servicesId: number[]) => {
    setFormValuesProfessional((prev: any) => ({
      ...prev,
      servicesId,
    }));
  };
  console.log(rowId);
  
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
        {info && <Selected onChange={handleServiceSelection} userId={rowId} infoProf />}
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

export default InfoEmployeeServicemodal;
