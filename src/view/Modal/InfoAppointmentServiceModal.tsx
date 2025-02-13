import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button/Button";

import * as S from "./Modal.styles";
import closeIcon from "../../assets/remove.svg";
import SelectableBox from "../../components/SelectableBox/SelectableBox";
import { Service } from "../../models/Service";
import { getServiceTypeById } from "../../services/ServiceTypeServices";

interface InfoAppointmentServiceModalProps {
  title: string;
  subTitle?: string;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "pequeno" | "medio" | "grande";
  rowId?: number;
}

const InfoAppointmentServiceModal: React.FC<
  InfoAppointmentServiceModalProps
> = ({ handleClose, title, subTitle, size, rowId }) => {
  const [selectableBoxServices, setSelectableBoxServices] = useState<Service[]>(
    []
  );

  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  const handleSubmit = async () => {
    handleClose();
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        let fetchedServices: Service[] = [];

        const userIdArray = rowId;
        if (userIdArray && Array.isArray(userIdArray)) {
          try {
            const serviceRequests = userIdArray.map((id) =>
              getServiceTypeById(id)
            );

            const serviceResponses = await Promise.all(serviceRequests);

            fetchedServices = serviceResponses.map(
              (response) => response?.data
            );
          } catch (error) {
            console.error("Error fetching services:", error);
          }
        }

        const uniqueServices = Array.from(
          new Map(
            fetchedServices.map((service) => [service.id, service])
          ).values()
        );
        setSelectableBoxServices(uniqueServices);
      } catch (error) {
        console.error(
          "Error when searching for employee and service information:",
          error
        );
      }
    };

    fetchEmployee();
  }, []);

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

        <SelectableBox data={selectableBoxServices} setSelectedServices={() => {}}/>
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

export default InfoAppointmentServiceModal;
