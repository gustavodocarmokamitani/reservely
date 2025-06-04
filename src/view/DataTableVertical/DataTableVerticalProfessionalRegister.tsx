import React, { useEffect, useState } from "react";
import * as S from "./DataTableVerticalProfessionalRegister.styles";
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

interface DataTableVerticalProfessionalRegisterProps {
  data: any[];
  handleRowSelect: (id: number[]) => void;
  handleShowEditProfessionalModal: (status: boolean, id: number) => void;
  handleInputChangeProfessionalRegister: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmitEditProfessionalRegister: () => void;
  formValuesProfessionalRegister: UserEmployee;
  handleClose: () => void;
  showEditModal: boolean;
}

const DataTableVerticalProfessionalRegister: React.FC<
  DataTableVerticalProfessionalRegisterProps
> = ({
  data,
  handleRowSelect,
  handleShowEditProfessionalModal,
  handleInputChangeProfessionalRegister,
  handleSubmitEditProfessionalRegister,
  formValuesProfessionalRegister,
  handleClose,
  showEditModal,
}) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };
  console.log(data);

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
                  <Col xs={10} style={{ fontWeight: "600" }}>
                    Profissional: <br />
                    <span style={{ fontWeight: "400" }}>
                      {item.name} {item.lastName}
                    </span>
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
                    Email:
                  </Col>
                  <Col xs={8} style={{ textAlign: "end" }}>
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
                    <span>{item.phoneNumber}</span>
                  </Col>
                </Row>

                <Row style={{ width: "100%", padding: "8px 0" }}>
                  <Col xs={4} style={{ fontWeight: "600" }}>
                    Email Confirmado:
                  </Col>
                  <Col xs={8} style={{ textAlign: "end" }}>
                    <div
                      style={{
                        background: item.emailConfirmed ? "#28a745" : "#ffc107",
                        color: "#fff",
                        borderRadius: "15px",
                        padding: "5px 12px",
                        fontSize: "0.9rem",
                        display: "inline-block",
                      }}
                    >
                      {item.emailConfirmed ? "Confirmado" : "Pendente"}
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

      {showEditModal && (
        <Modal
          title="Editar profissional"
          subTitle="Preencha as informações abaixo para editar o profissional."
          handleSubmit={handleSubmitEditProfessionalRegister}
          handleClose={handleClose}
          size="large"
        >
          <Row>
            <Col md={4} className="mt-3 mb-3">
              <Input
                type="text"
                placeholder="Nome"
                name="name"
                value={capitalizeFirstLetter(
                  formValuesProfessionalRegister.name
                )}
                onChange={(e) =>
                  handleInputChangeProfessionalRegister(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
            <Col md={4} className="mt-3 mb-3">
              <Input
                type="text"
                placeholder="Sobrename"
                name="lastName"
                value={capitalizeFirstLetter(
                  formValuesProfessionalRegister.lastName
                )}
                onChange={(e) =>
                  handleInputChangeProfessionalRegister(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </Col>
            <Col md={4} className="mt-3 mb-3">
              <Input
                type="text"
                placeholder="Telefone"
                name="phone"
                value={capitalizeFirstLetter(
                  formValuesProfessionalRegister.phone
                )}
                onChange={(e) =>
                  handleInputChangeProfessionalRegister(
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

export default DataTableVerticalProfessionalRegister;
