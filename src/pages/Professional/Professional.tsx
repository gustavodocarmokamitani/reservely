import * as P from "../Styles/_Page.styles";
import { Col, Row } from "react-bootstrap";

import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import Button from "../../components/Button/Button";

import ProfessionalDataTable from "../../view/DataTable/ProfessionalDataTable";
import Modal from "../../view/Modal/Modal";
import Select from "../../components/Select/Select";
import SelectableBox from "../../components/SelectableBox/SelectableBox";

import { useFetch } from "../../hooks/Professional/useFetch";
import { useStateCustom } from "../../hooks/Professional/useStateCustom";
import { useAction } from "../../hooks/Professional/useAction";
import { useModal } from "../../hooks/Professional/useModal";
import { useEffectCustom } from "../../hooks/Professional/useEffectCustom";
import Loading from "../../components/Loading/loading";

import homeClient from "../../assets/homeClient.svg";

function Professional() {
  const storeUser = Number(localStorage.getItem("storeUser"));

  const {
    combinedData,
    decodedData,
    employee,
    employeeSelect,
    formValuesProfessional,
    options,
    selectableBoxServices,
    selectedServices,
    selectedUserIds,
    setCombinedData,
    setDecodedData,
    setEmployee,
    setEmployeeSelect,
    setFormValuesProfessional,
    setOptions,
    setSelectableBoxServices,
    setSelectedServices,
    setSelectedUserIds,
    setShow,
    setShowModal,
    setColumnWidth,
    show,
    showModal,
    rows,
    setRows,
    isLoading,
    setIsLoading,
  } = useStateCustom();

  const {
    fetchData,
    fetchLoadDataAddEmployee,
    fetchLoadDataEditEmployee,
    fetchLoadEditFormValues,
  } = useFetch(
    storeUser,
    setDecodedData,
    setOptions,
    setSelectableBoxServices,
    setCombinedData,
    setSelectedServices,
    setRows,
    setIsLoading
  );

  const {
    handleClose,
    handleShowAddProfessionalModal,
    handleShowEditProfessionalModal,
  } = useModal(
    setShowModal,
    setShow,
    setSelectedServices,
    fetchLoadDataAddEmployee,
    fetchLoadDataEditEmployee
  );

  const {
    handleDeleteUsers,
    handleInputChangeProfessional,
    handleRowSelect,
    handleServiceSelection,
    handleSubmitEmployeeAdd,
    handleSubmitEmployeeEdit,
  } = useAction(
    fetchData,
    handleClose,
    employee,
    setSelectedUserIds,
    storeUser,
    formValuesProfessional,
    setFormValuesProfessional,
    selectedUserIds
  );

  const { containerRef, columns } = useEffectCustom(
    employeeSelect,
    setEmployee,
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
              Gerenciar Profissional <br />
            </P.Title>
            <P.SubTitle>
              Área destinada para gerenciamento de profissionais registrados.
            </P.SubTitle>
          </P.ContentHeader>
          <P.ContentHeaderImg align="end">
            <img src={homeClient} alt="Home Cliente" width="400px" />
          </P.ContentHeaderImg>
        </P.ContainerHeader>
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

        <ProfessionalDataTable
          {...{
            rows,
            handleRowSelect,
            columns,
            containerRef,
            showModal,
            handleClose,
            setFormValuesProfessional,
            formValuesProfessional,
            handleInputChangeProfessional,
            combinedData,
            handleSubmitEmployeeEdit,
            selectableBoxServices,
            selectedServices,
            setSelectedServices,
            fetchLoadEditFormValues,
            handleServiceSelection,
          }}
        />
        {show && (
          <Modal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            handleSubmit={handleSubmitEmployeeAdd}
            size="large"
            {...{
              handleClose,
            }}
          >
            <Row>
              <Col md={4} className="mt-3 mb-3">
                <Select
                  setData={setEmployeeSelect}
                  value={employeeSelect}
                  options={options}
                  placeholder="Selecione um funcionário"
                />
              </Col>
              <Col md={8} className="px-5">
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
      </P.ContainerPage>
    </>
  );
}

export default Professional;
