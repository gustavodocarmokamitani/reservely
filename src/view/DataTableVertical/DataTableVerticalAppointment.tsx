import React, { useEffect, useState } from "react";
import * as S from "./DataTableVerticalAppointment.styles";
import * as P from "../../pages/Styles/_Page.styles";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button/Button";
import Modal from "../Modal/Modal";
import Select from "../../components/Select/Select";
import SelectDataPicker from "../../components/Select/SelectDataPicker";
import { SelectOption } from "../../models/SelectOptions";
import { getServiceTypeById } from "../../services/ServiceTypeServices";

interface DataTableVerticalAppointmentProps {
  data: any[];
  setSelectedAppointmentIds: React.Dispatch<React.SetStateAction<number[]>>;
  showModalAppointmentHistoryStatus: boolean;
  handleShowAppointmentStatusModal: (status: boolean, id: number) => void;
  handleSubmitAppointmentHistoryStatus: () => void;
  handleClose: () => void;
  statusAppointment: SelectOption[];
  setStatusAppointment: React.Dispatch<React.SetStateAction<SelectOption[]>>;
  options: SelectOption[];
  appointmentTime: SelectOption[];
  setAppointmentTime: React.Dispatch<React.SetStateAction<SelectOption[]>>;
  optionsTime: SelectOption[];
  setAppointmentDate: React.Dispatch<React.SetStateAction<Date[]>>;
  closedDates: string[];
  operatingDays: string[];
}

const DataTableVerticalAppointment: React.FC<
  DataTableVerticalAppointmentProps
> = ({
  data,
  setSelectedAppointmentIds,
  showModalAppointmentHistoryStatus,
  handleShowAppointmentStatusModal,
  handleSubmitAppointmentHistoryStatus,
  handleClose,
  statusAppointment,
  setStatusAppointment,
  options,
  appointmentTime,
  setAppointmentTime,
  optionsTime,
  setAppointmentDate,
  closedDates,
  operatingDays,
}) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [visibleDataWithInfo, setVisibleDataWithInfo] = useState<any[]>([]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const statusColors: Record<number, string> = {
    1: "#ffc107",
    2: "#28a745",
    3: "#dc3545",
    4: "#17a2b8",
    5: "#6c757d",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedAppointmentIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const fetchData = async () => {
    try {
      const slicedData = data.slice(0, visibleCount);
      const results = await Promise.all(
        slicedData.map(async (item) => {
          const response = await getServiceTypeById(item?.serviceIds[0]);
          return { ...item, serviceName: response?.data.name };
        })
      );
      setVisibleDataWithInfo(results);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [visibleCount, data]);

  return (
    <>
      <S.Container>
        {[...visibleDataWithInfo]
          .sort(
            (a, b) =>
              new Date(b.appointmentDate).getTime() -
              new Date(a.appointmentDate).getTime()
          ) 
          .map((item) => (
            <S.WrapperItem
              key={item.id}
              style={{
                padding: "16px",
                border: "1px solid #ddd",
                borderRadius: "15px",
                background: "#fff",
                marginBottom: "50px",
              }}
            >
              <Row style={{ width: "100%" }}>
                <Col>
                  <Row
                    style={{
                      width: "100%",
                      padding: "15px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Col xs={6} style={{ fontWeight: "600" }}>
                      Serviço:{" "}
                      <span style={{ fontWeight: "400" }}>
                        {item.serviceName}
                      </span>
                    </Col>
                    <Col xs={6} style={{ textAlign: "end" }}>
                      <P.CheckboxContainer>
                        <P.HiddenCheckbox
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                        <P.StyledCheckbox />
                      </P.CheckboxContainer>
                    </Col>
                  </Row>

                  <Row
                    style={{
                      width: "100%",
                      padding: "15px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Col xs={5} style={{ fontWeight: "600" }}>
                      Cliente:
                    </Col>
                    <Col xs={7} style={{ textAlign: "end" }}>
                      <span>{item.clientId}</span>
                    </Col>
                  </Row>

                  <Row
                    style={{
                      width: "100%",
                      padding: "15px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Col xs={3} style={{ fontWeight: "600" }}>
                      Status:
                    </Col>
                    <Col xs={9} style={{ textAlign: "end" }}>
                      <div
                        style={{
                          background:
                            statusColors[item.appointmentStatusId] || "#28a745",
                          color: "#fff",
                          borderRadius: "15px",
                          padding: "5px 12px",
                          fontSize: "0.9rem",
                          display: "inline-block",
                        }}
                      >
                        {item.appointmentStatus}
                      </div>
                    </Col>
                  </Row>

                  <Row
                    style={{
                      width: "100%",
                      padding: "15px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Col xs={5} style={{ fontWeight: "600" }}>
                      Profissional:
                    </Col>
                    <Col xs={7} style={{ textAlign: "end" }}>
                      <span>{item.employeeFullName}</span>
                    </Col>
                  </Row>

                  <Row
                    style={{
                      width: "100%",
                      padding: "15px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Col xs={5} style={{ fontWeight: "600" }}>
                      Data:
                    </Col>
                    <Col xs={7} style={{ textAlign: "end" }}>
                      <span>{formatDate(item.appointmentDate)}</span>
                    </Col>
                  </Row>

                  <Row style={{ width: "100%", padding: "8px 0" }}>
                    <Col xs={5} style={{ fontWeight: "600" }}>
                      Horário:
                    </Col>
                    <Col xs={7} style={{ textAlign: "end" }}>
                      <span>{item.appointmentTime}</span>
                    </Col>
                  </Row>

                  <Row style={{ width: "100%", padding: "15px 0" }}>
                    <Col
                      xs={5}
                      style={{
                        fontWeight: "600",
                        width: "100%",
                      }}
                    >
                      {item.employeeFullName !== "Removido" ? (
                        <div
                          style={{
                            width: "100%",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#2c2c2c",
                            borderRadius: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleShowAppointmentStatusModal(true, item.id)
                          }
                        >
                          <span style={{ color: "white" }}>Alterar Status</span>
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </S.WrapperItem>
          ))}

        {visibleCount < data.length && (
          <div style={{ textAlign: "center", margin: "0px 0 30px 0" }}>
            <h2 onClick={handleShowMore} style={{ cursor: "pointer" }}>
              Ver mais
            </h2>
          </div>
        )}
      </S.Container>

      {showModalAppointmentHistoryStatus && (
        <Modal
          title="Alterar Status do Apontamento"
          subTitle="Gerencie o status associados a este apontamento."
          handleSubmit={handleSubmitAppointmentHistoryStatus}
          size="small"
          {...{ handleClose }}
        >
          <Row>
            <Col
              md={12}
              className="pb-3"
              style={{ margin: "20px 0px 0px 0px" }}
            >
              <Select
                setData={setStatusAppointment}
                value={statusAppointment}
                options={options}
                placeholder="Selecione um status"
              />
            </Col>
            {Array.isArray(statusAppointment) &&
              statusAppointment.some((item) => item.value === 4) && (
                <Col md={6}>
                  <S.AppointmentContent>
                    <Select
                      setData={setAppointmentTime}
                      options={optionsTime}
                      placeholder="Selecione um horário"
                      value={appointmentTime}
                    />
                  </S.AppointmentContent>
                </Col>
              )}
          </Row>
          {Array.isArray(statusAppointment) &&
            statusAppointment.some((item) => item.value === 4) && (
              <Row>
                <S.AppointmentContent style={{ marginLeft: "0%" }}>
                  <SelectDataPicker
                    setDate={setAppointmentDate}
                    type="appointment"
                    closedDates={closedDates}
                    operatingDays={operatingDays}
                  />
                </S.AppointmentContent>
              </Row>
            )}
          {Array.isArray(statusAppointment) &&
            statusAppointment.length > 0 &&
            statusAppointment[0].value === 3 && (
              <div
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  color: "red",
                }}
              >
                Após o cancelamento, este apontamento não poderá mais ser
                editado.
              </div>
            )}
        </Modal>
      )}
    </>
  );
};

export default DataTableVerticalAppointment;
