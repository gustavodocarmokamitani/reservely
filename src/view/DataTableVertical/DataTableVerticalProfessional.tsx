import React, { useEffect, useState } from "react";
import * as S from "./DataTableVerticalProfessional.styles";
import * as P from "../../pages/Styles/_Page.styles";
import { Col, Row } from "react-bootstrap";
import Modal from "../Modal/Modal";
import Select from "../../components/Select/Select";
import SelectDataPicker from "../../components/Select/SelectDataPicker";
import { SelectOption } from "../../models/SelectOptions";
import { getServiceTypeById } from "../../services/ServiceTypeServices";
import Input from "../../components/Input/Input";
import { capitalizeFirstLetter } from "../../services/system/globalService";
import { UserEmployee } from "../../models/UserEmployee";
import { Service } from "../../models/Service";
import SelectableBox from "../../components/SelectableBox/SelectableBox";

interface DataTableVerticalProfessionalProps {
  data: any[];
  handleRowSelect: (id: number[]) => void;
  handleShowEditProfessionalModal: (status: boolean, id: number) => void;
  showModal: boolean | undefined;
  formValuesProfessional: UserEmployee;
  handleSubmitEmployeeEdit: () => void;
  handleClose: () => void;
  handleInputChangeProfessional: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleServiceSelection: (serviceIds: number[]) => void;
  selectedServices: number[];
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>;
  selectableBoxServices: Service[];
}

const DataTableVerticalProfessional: React.FC<
  DataTableVerticalProfessionalProps
> = ({
  data,
  handleRowSelect,
  handleShowEditProfessionalModal,
  showModal,
  formValuesProfessional,
  handleSubmitEmployeeEdit,
  handleClose,
  handleInputChangeProfessional,
  handleServiceSelection,
  selectedServices,
  setSelectedServices,
  selectableBoxServices,
}) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <>
      <S.Container>
        {data.map((item) => (
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
                  <Col xs={8} style={{ fontWeight: "600" }}>
                    Profissional: <br />
                    <span style={{ fontWeight: "400" }}>
                      {item.name} {item.lastName}
                    </span>
                  </Col>
                  <Col xs={4} style={{ textAlign: "end" }}>
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
                  <Col xs={2} style={{ fontWeight: "600" }}>
                    Email:
                  </Col>
                  <Col xs={10} style={{ textAlign: "end" }}>
                    <span style={{ wordBreak: "break-word" }}>
                      {item.email}
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
                    Telefone:
                  </Col>
                  <Col xs={7} style={{ textAlign: "end" }}>
                    <span>{item.phone}</span>
                  </Col>
                </Row>

                <Row style={{ width: "100%", padding: "8px 0" }}>
                  <Col xs={4} style={{ fontWeight: "600" }}>
                    Status:
                  </Col>
                  <Col xs={8} style={{ textAlign: "end" }}>
                    <div
                      style={{
                        background:
                          item.active === "true" ? "#28a745" : "#dc3545",
                        color: "#fff",
                        borderRadius: "15px",
                        padding: "5px 12px",
                        fontSize: "0.9rem",
                        display: "inline-block",
                      }}
                    >
                      {item.active === "true" ? "Ativo" : "Desativado"}
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
                        background: "#f16855",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleShowEditProfessionalModal(true, item.id)
                      }
                    >
                      <span style={{ color: "white" }}>Editar</span>
                    </div>
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

      {showModal && (
        <Modal
          title="Editar professional"
          subTitle="Preencha as informações abaixo para editar o professional."
          handleSubmit={handleSubmitEmployeeEdit}
          size="large"
          {...{
            handleClose,
          }}
        >
          <Row>
            <Col md={4} className="mt-3 mb-3">
              <Input
                type="toggle"
                placeholder="Ativo"
                name="active"
                value={formValuesProfessional.active}
                onChange={(e) =>
                  handleInputChangeProfessional(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>

            <Col md={8}>
              <SelectableBox
                onChange={handleServiceSelection}
                data={selectableBoxServices}
                {...{
                  setSelectedServices,
                  selectedServices,
                }}
              />
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
};

export default DataTableVerticalProfessional;
