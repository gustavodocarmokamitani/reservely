import React, { useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useSnackbar } from "notistack";
import Button from "../../components/Button";
import StatusAppointmentSelect from "../../components/Select/AppointmentStatusSelect";
import { getAppointmentById, updateAppointment } from "../../services/AppointmentServices";
import { Appointment } from "../../models/Appointment";
import { SelectOption } from "../../models/SelectOptions";
import { AppContext } from "../../context/AppContext";
import * as S from "./Modal.styles";
import closeIcon from "../../assets/remove.svg";

interface EditStatusAppointmentModalProps {
  title: string;
  subTitle?: string;
  info?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  size: "small" | "medium" | "large";
  rowId?: number;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditStatusAppointmentModal: React.FC<EditStatusAppointmentModalProps> = ({
  handleClose,
  title,
  subTitle,
  size,
  rowId,
  setUpdate,
}) => {
  const [statusAppointment, setAppointmentStatus] = useState<SelectOption | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { setAppointmentUpdateContext } = useContext(AppContext)!;
  const storeUser = React.useMemo(() => localStorage.getItem("storeUser"), []);
  const sizeMap = {
    small: "650px",
    medium: "850px",
    large: "1050px",
  };

  const handleSubmit = async () => {
    if (!rowId) return;  

    try {
      const response = await getAppointmentById(rowId);
      if (statusAppointment) {
        const mappedAppointment: Appointment = {
          id: rowId,
          clientId: response.clientId,
          employeeId: response.employeeId,
          appointmentDate: response.appointmentDate,
          appointmentTime: response.appointmentTime,
          appointmentStatusId: statusAppointment.value,
          serviceIds: response.serviceIds,
          storeId: Number(storeUser),
        };

        setAppointmentUpdateContext(mappedAppointment);

        const responseAppointment = await updateAppointment(
          mappedAppointment.id,
          mappedAppointment
        );

        if (responseAppointment) {
          enqueueSnackbar("Status do appointment editado com sucesso!", { variant: "success" });
          setUpdate(true);
        }
      }
    } catch (error) {
      console.error(`Erro ao editar appointment ${rowId}:`, error);
      enqueueSnackbar("Erro ao editar o status do appointment.", { variant: "error" });
    }
    handleClose();
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

        <Col md={6} style={{ margin: "15px 0px 35px 15px" }}>
          <StatusAppointmentSelect
            setAppointmentStatus={setAppointmentStatus}
            value={statusAppointment?.value}
          />
        </Col>

        <hr />

        <Row>
          <Col md={12} className="d-flex flex-row justify-content-center align-items-center">
            <Button $isClosed type="button" onClick={handleClose} />
            <Button $isConfirm type="button" onClick={handleSubmit} />
          </Col>
        </Row>
      </div>
    </S.Overlay>
  );
};

export default EditStatusAppointmentModal;
