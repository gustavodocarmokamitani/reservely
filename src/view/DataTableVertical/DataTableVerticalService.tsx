import React, { useEffect, useState } from "react";
import * as S from "./DataTableVerticalService.styles";
import * as P from "../../pages/Styles/_Page.styles";
import { Col, Row } from "react-bootstrap";
import Modal from "../Modal/Modal";
import Select from "../../components/Select/Select";
import { SelectOption } from "../../models/SelectOptions";
import Input from "../../components/Input/Input";
import {
  formatCurrencyBRL,
  formatToBRL,
} from "../../services/system/globalService";
import { getServiceById } from "../../services/ServiceServices";
import { Service } from "../../models/Service";

interface DataTableVerticalServiceProps {
  data: any[];
  handleRowSelect: (id: number[]) => void;
  showEditModal: boolean;
  formValuesService: Service;
  handleShowEditServiceModal: (status: boolean, id: number) => void;
  handleInputChangeService: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmitEditService: () => void;
  handleClose: () => void;
  options: SelectOption[];
  durationMinutes: SelectOption[];
  setDurationMinutes: React.Dispatch<React.SetStateAction<SelectOption[]>>;
}

const DataTableVerticalService: React.FC<DataTableVerticalServiceProps> = ({
  data,
  handleRowSelect,
  showEditModal,
  formValuesService,
  handleShowEditServiceModal,
  handleInputChangeService,
  handleSubmitEditService,
  handleClose,
  options,
  durationMinutes,
  setDurationMinutes,
}) => {
  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const fetchData = async () => {
    try {
      if (data !== undefined) {
        const merged = await Promise.all(
          data.map(async (item) => {
            const serviceDetail = await getServiceById(item.id);
            return { ...item, ...serviceDetail };
          })
        );

        setServiceData(merged);
      }
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <>
      <S.Container>
        {serviceData.map((item: any) => (
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
                  <Col xs={10} style={{ fontWeight: "600" }}>
                    Serviço: <br />
                    <span style={{ fontWeight: "400" }}>{item.name}</span>
                  </Col>
                  <Col xs={2} style={{ textAlign: "end" }}>
                    <P.CheckboxContainer>
                      <P.HiddenCheckbox
                        onChange={() => handleRowSelect([item.id])}
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
                  <Col xs={4} style={{ fontWeight: "600" }}>
                    Valor:
                  </Col>
                  <Col xs={8} style={{ textAlign: "end" }}>
                    <span style={{ wordBreak: "break-word" }}>
                      {formatCurrencyBRL(item.value)}
                    </span>
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
                    Duração:
                  </Col>
                  <Col xs={7} style={{ textAlign: "end" }}>
                    <span>{item.durationMinutes}</span>
                  </Col>
                </Row>

                <Row style={{ width: "100%", padding: "8px 0" }}>
                  <Col xs={4} style={{ fontWeight: "600" }}>
                    Status:
                  </Col>
                  <Col xs={8} style={{ textAlign: "end" }}>
                    <div
                      style={{
                        background: item.active ? "#28a745" : "#ffc107",
                        color: "#fff",
                        borderRadius: "15px",
                        padding: "5px 12px",
                        fontSize: "0.9rem",
                        display: "inline-block",
                      }}
                    >
                      {item.active ? "Ativado" : "Desativado"}
                    </div>
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
                      onClick={() => handleShowEditServiceModal(true, item.id)}
                    >
                      <span style={{ color: "white" }}>Editar</span>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </S.WrapperItem>
        ))}

        {data !== undefined && visibleCount < data.length && (
          <div style={{ textAlign: "center", margin: "0px 0 30px 0" }}>
            <h2 onClick={handleShowMore} style={{ cursor: "pointer" }}>
              Ver mais
            </h2>
          </div>
        )}
      </S.Container>

      {showEditModal && (
        <Modal
          title="Editar serviço"
          subTitle="Preencha as informações abaixo para editar o serviço."
          handleSubmit={handleSubmitEditService}
          size="small"
          {...{
            handleClose,
          }}
        >
          <Row>
            <Col
              md={6}
              className="mt-3 mb-3 d-flex justify-content-center align-items-center"
            >
              <Input
                type="text"
                placeholder="Nome"
                name="name"
                value={formValuesService.name}
                onChange={(e) =>
                  handleInputChangeService(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
            <Col
              md={6}
              className="mt-3 mb-3 d-flex justify-content-center align-items-center"
            >
              <Input
                type="text"
                placeholder="Valor"
                name="value"
                value={
                  formValuesService.value
                    ? formatToBRL(formValuesService.value)
                    : formatToBRL("0")
                }
                onChange={(e) =>
                  handleInputChangeService(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
          </Row>
          <Row>
            <Col
              md={6}
              className="mt-3 mb-3 d-flex justify-content-center align-items-center"
            >
              <div style={{ width: "100%" }}>
                <Select
                  setData={setDurationMinutes}
                  value={durationMinutes[0]}
                  options={options}
                  placeholder="Selecione a duração"
                />
              </div>
            </Col>
            <Col
              md={6}
              className="mt-3 mb-3 d-flex justify-content-center align-items-center"
            >
              <Input
                type="toggle"
                name="active"
                value={formValuesService.active}
                onChange={(e) =>
                  handleInputChangeService(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
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
                type="text"
                placeholder="Descrição"
                name="description"
                value={formValuesService.description}
                onChange={(e) =>
                  handleInputChangeService(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
};

export default DataTableVerticalService;
