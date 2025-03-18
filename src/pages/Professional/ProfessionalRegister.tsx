import { Col, Row } from "react-bootstrap";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import Button from "../../components/Button/Button";
import ProfessionalRegisterDataTable from "../../view/DataTable/ProfessionalRegisterDataTable";

import * as P from "../Styles/_Page.styles";
import { useStateCustom } from "../../hooks/ProfessionalRegister/useStateCustom";
import { useFetch } from "../../hooks/ProfessionalRegister/useFetch";
import { useAction } from "../../hooks/ProfessionalRegister/useAction";
import { useModal } from "../../hooks/ProfessionalRegister/useModal";
import { useEffectCustom } from "../../hooks/ProfessionalRegister/useEffectCustom";
import Modal from "../../view/Modal/Modal";
import Input from "../../components/Input/Input";
import { capitalizeFirstLetter } from "../../services/system/globalService";
import Loading from "../../components/Loading/loading";

import homeClient from "../../assets/homeClient.svg";

function ProfessionalRegister() {
  const storeUser = Number(localStorage.getItem("storeUser"));

  const {
    rows,
    selectedUserIds,
    show,
    setShow,
    setShowEditModal,
    setSelectedUserIds,
    decodedData,
    combinedData,
    formValuesProfessionalRegister,
    setFormValuesProfessionalRegister,
    setCombinedData,
    setRows,
    setDecodedData,
    showEditModal,
    setColumnWidth,
    isLoading,
    setIsLoading,
  } = useStateCustom();

  const { fetchData, fetchLoadEditFormValues } = useFetch(
    storeUser,
    setCombinedData,
    setFormValuesProfessionalRegister,
    setRows,
    setDecodedData,
    setIsLoading
  );

  const {
    handleClose,
    handleShowAddProfessionalModal,
    handleShowEditProfessionalModal,
  } = useModal(
    setShow,
    setShowEditModal,
    fetchLoadEditFormValues,
    setFormValuesProfessionalRegister
  );

  const {
    handleSubmitEditProfessionalRegister,
    handleDeleteUsers,
    handleRowSelect,
    handleInputChangeProfessionalRegister,
    handleRegisterProfessionalRegister,
  } = useAction(
    formValuesProfessionalRegister,
    setFormValuesProfessionalRegister,
    selectedUserIds,
    setSelectedUserIds,
    fetchData,
    handleClose,
    storeUser,
    setIsLoading
  );

  const { containerRef, columns } = useEffectCustom(
    setColumnWidth,
    decodedData,
    handleShowEditProfessionalModal
  );

  return (
    <>
      {isLoading && <Loading />}
      <P.ContainerPage style={{ height: "100vh" }}>
        <P.ContainerHeader>
          <P.ContentHeader align="start">
            <P.Title>
              Registrar Profissional <br />
            </P.Title>
            <P.SubTitle>
              Área destinada para registrar profissionais.
            </P.SubTitle>
          </P.ContentHeader>
          <P.ContentHeaderImg align="end">
            {decodedData?.userRole === "Admin" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  margin: "25px 0 0 0",
                }}
              >
                <Button $isRemove type="button" onClick={handleDeleteUsers} />
                <Button
                  $isAdd
                  type="button"
                  onClick={handleShowAddProfessionalModal}
                />
              </div>
            )}
          </P.ContentHeaderImg>
        </P.ContainerHeader>

        <ProfessionalRegisterDataTable
          {...{
            rows,
            handleRowSelect,
            fetchData,
            formValuesProfessionalRegister,
            setFormValuesProfessionalRegister,
            combinedData,
            setCombinedData,
            fetchLoadEditFormValues,
            handleInputChangeProfessionalRegister,
            handleSubmitEditProfessionalRegister,
            handleShowEditProfessionalModal,
            showEditModal,
            handleClose,
            containerRef,
            columns,
          }}
        />
        {show && (
          <Modal
            title="Editar profissional"
            subTitle="Preencha as informações abaixo para editar o profissional."
            handleSubmit={handleRegisterProfessionalRegister}
            handleClose={handleClose}
            size="small"
          >
            <Row>
              <Col md={6} className="mt-3 mb-3 flex-column align-items-center">
                <Input
                  width="300"
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
                <Input
                  width="300"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formValuesProfessionalRegister.email}
                  onChange={(e) =>
                    handleInputChangeProfessionalRegister(
                      e as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                />
              </Col>
              <Col md={6} className="mt-3 mb-3 flex-column align-items-center">
                <Input
                  width="300"
                  type="text"
                  placeholder="Sobrenome"
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

                <Input
                  width="300"
                  type="text"
                  placeholder="Telefone"
                  phone
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
      </P.ContainerPage>
    </>
  );
}

export default ProfessionalRegister;
