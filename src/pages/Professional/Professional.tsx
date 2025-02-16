import { ContainerPage } from "../Styles/_Page.styles";
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
    setRows
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
    setRows
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
      <ContainerPage style={{ height: "100vh" }}>
        <Row>
          <Col lg={12} xl={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Professional"
              subTitle="Área destinada para gerenciamento de profissionais registrados."
            />
          </Col>

          <Col
            lg={12}
            xl={5}
            className="d-flex flex-row justify-content-md-center justify-content-lg-end align-items-center  mt-md-3 mt-lg-5 mt-xl-0"
          >
            {decodedData?.userRole === "Admin" && (
              <>
                <Button $isRemove type="button" onClick={handleDeleteUsers} />
                <Button
                  $isAdd
                  type="button"
                  onClick={handleShowAddProfessionalModal}
                />
              </>
            )}
          </Col>
        </Row>
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
      </ContainerPage>
    </>
  );
}

export default Professional;
