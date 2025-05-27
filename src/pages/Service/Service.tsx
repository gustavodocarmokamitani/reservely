import * as P from "../Styles/_Page.styles";
import { Col, Row } from "react-bootstrap";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import Button from "../../components/Button/Button";
import ServiceDataTable from "../../view/DataTable/ServiceDataTable";
import { useStateCustom } from "../../hooks/Services/useStateCustom";
import { useFetch } from "../../hooks/Services/useFetch";
import { useModal } from "../../hooks/Services/useModal";
import { useAction } from "../../hooks/Services/useAction";
import Modal from "../../view/Modal/Modal";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { useEffectCustom } from "../../hooks/Services/useEffectCustom";
import Loading from "../../components/Loading/loading";
import { formatToBRL } from "../../services/system/globalService";

import homeClient from "../../assets/homeClient.svg";

function Service() {
  const {
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    rows,
    setRows,
    selectedServiceIds,
    setSelectedServiceIds,
    options,
    setOptions,
    formValuesService,
    setFormValuesService,
    decodedData,
    setDecodedData,
    durationMinutes,
    setDurationMinutes,
    setServiceType,
    setSelectedEmployeeId,
    setColumnWidth,
    isLoading,
    setIsLoading,
  } = useStateCustom();

  const storeUser = Number(localStorage.getItem("storeUser"));

  const { fetchData, fetchEditService, generateTimes } = useFetch(
    storeUser,
    setOptions,
    setDecodedData,
    setRows,
    setServiceType,
    setFormValuesService,
    setDurationMinutes,
    setIsLoading
  );

  const { handleClose, handleShowAddServiceModal, handleShowEditServiceModal } =
    useModal(
      setShowAddModal,
      setShowEditModal,
      setSelectedEmployeeId,
      fetchEditService,
      setFormValuesService,
      setDurationMinutes,
      generateTimes
    );

  const {
    handleSubmitAddService,
    handleSubmitEditService,
    handleInputChangeService,
    handleDeleteServices,
    handleRowSelect,
  } = useAction(
    storeUser,
    fetchData,
    handleClose,
    formValuesService,
    durationMinutes,
    setFormValuesService,
    selectedServiceIds,
    setSelectedServiceIds,
    rows,
    setIsLoading
  );

  const { columns, containerRef } = useEffectCustom(
    decodedData,
    setColumnWidth,
    handleShowEditServiceModal
  );

  return (
    <>
      {isLoading && <Loading />}
      <P.ContainerPage style={{ height: "100vh" }}>
        <P.ContainerHeader>
          <P.ContentHeader align="start">
            <P.Title>
              Gerenciar Serviços <br />
            </P.Title>
            <P.SubTitle>
              Área destinada para gerenciamento de serviços.
            </P.SubTitle>
          </P.ContentHeader>
          <P.ContentHeaderImg align="end">
            {decodedData?.userRole === "Admin" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  flexDirection: window.innerWidth < 768 ? "column" : "row",
                  margin: "25px 0 0 0",
                }}
              >
                {window.innerWidth <= 768 ? (
                  <>
                    <div style={{ marginBottom: "15px" }}>
                      <Button
                        $isAdd
                        type="button"
                        onClick={handleShowAddServiceModal}
                      />
                    </div>
                    <Button
                      onClick={handleDeleteServices}
                      $isRemove
                      type="button"
                    />
                  </>
                ) : (
                  <>
                    <div style={{ marginBottom: "15px" }}>
                      <Button
                        onClick={handleDeleteServices}
                        $isRemove
                        type="button"
                      />
                    </div>
                    <Button
                      $isAdd
                      type="button"
                      onClick={handleShowAddServiceModal}
                    />
                  </>
                )}
              </div>
            )}
          </P.ContentHeaderImg>
        </P.ContainerHeader>
        <ServiceDataTable
          {...{
            rows,
            options,
            durationMinutes,
            setDurationMinutes,
            handleSubmitEditService,
            showEditModal,
            handleClose,
            formValuesService,
            handleInputChangeService,
            columns,
            containerRef,
            handleRowSelect,
          }}
        />
        {showAddModal && (
          <Modal
            title="Adicionar serviço"
            subTitle="Preencha as informações abaixo para criar um novo serviço."
            handleSubmit={handleSubmitAddService}
            size="small"
            {...{
              handleClose,
            }}
          >
            <Row>
              <Col
                md={6}
                className={`${
                  window.innerWidth > 375 ? "mt-2 mb-2" : "mt-0 mb-0"
                } d-flex justify-content-center align-items-center`}
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
                className={`${
                  window.innerWidth > 375 ? "mt-2 mb-2" : "mt-0 mb-0"
                } d-flex justify-content-center align-items-center`}
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
                xs={12}
                className={`${
                  window.innerWidth > 375 ? "mt-3 mb-4" : "mt-0 mb-2"
                } d-flex justify-content-center align-items-center`}
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
                className={`${
                  window.innerWidth > 375 ? "mt-2 mb-3" : "mt-0 mb-0"
                } d-flex justify-content-center align-items-center`}
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
                className={`${
                  window.innerWidth > 375 ? "mt-2 mb-3" : "mt-0 mb-0"
                } d-flex justify-content-center align-items-center`}
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
      </P.ContainerPage>
    </>
  );
}

export default Service;
