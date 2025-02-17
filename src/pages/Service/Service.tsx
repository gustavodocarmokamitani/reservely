import { ContainerPage } from "../Styles/_Page.styles";
import { Col, Row } from "react-bootstrap";
import { useSnackbar } from "notistack";
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

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

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
    serviceType,
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
    durationMinutes,
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
      generateTimes,      
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

  const storedToken = localStorage.getItem("authToken");

  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
     {isLoading && <Loading />}
      <ContainerPage style={{ height: "100vh" }}>
        <Row>
          <Col lg={12} xl={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Serviço"
              subTitle="Área destinada para gerenciamento de serviços."
            />
          </Col>

          <Col
            lg={12}
            xl={5}
            className="d-flex flex-row justify-content-md-center justify-content-lg-end align-items-center  mt-md-3 mt-lg-5 mt-xl-0"
          >
            {decodedData?.userRole === "Admin" && (
              <>
                <Button
                  onClick={handleDeleteServices}
                  $isRemove
                  type="button"
                />
                <Button
                  $isAdd
                  type="button"
                  onClick={handleShowAddServiceModal}
                />
              </>
            )}
          </Col>
        </Row>
        <ServiceDataTable
          service
          fetchData={fetchData}
          {...{
            rows,
            options,
            setOptions,
            durationMinutes,
            setDurationMinutes,
            handleShowEditServiceModal,
            serviceType,
            setServiceType,
            handleSubmitEditService,
            showEditModal,
            handleClose,
            formValuesService,
            setFormValuesService,
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
                className="mt-3 mb-3 d-flex justify-content-center align-items-center"
              >
                <Input
                  width="300"
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
                  width="300"
                  type="text"
                  placeholder="Valor"
                  name="value"
                  value={formValuesService.value}
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
                <Select
                  setData={setDurationMinutes}
                  value={durationMinutes[0]}
                  options={options}
                  placeholder="Selecione a duração"
                />
              </Col>
              <Col
                md={6}
                className="mt-3 mb-3 d-flex justify-content-center align-items-center"
              >
                <Input
                  width="300"
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
                  width="600"
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
      </ContainerPage>
    </>
  );
}

export default Service;
