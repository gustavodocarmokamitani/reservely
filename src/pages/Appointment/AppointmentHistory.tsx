import { Col, Row } from "react-bootstrap";

import { ContainerPage } from "../Styles/_Page.styles";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import AppointmentDataTable from "../../view/DataTable/AppointmentDataTable";
import Button from "../../components/Button/Button";

import { useStateCustom } from "../../hooks/AppointmentHistory/useStateCustom";
import { useModal } from "../../hooks/AppointmentHistory/useModal";
import { useFetch } from "../../hooks/AppointmentHistory/useFetch";
import { useEffectCustom } from "../../hooks/AppointmentHistory/useEffectCustom";
import { useAction } from "../../hooks/AppointmentHistory/useAction";
import Loading from "../../components/Loading/loading";

function AppointmentHistory() {
  const storeUser = Number(localStorage.getItem("storeUser"));

  const {
    showModalAppointmentHistoryInfo,
    setShowModalAppointmentHistoryInfo,
    showModalAppointmentHistoryStatus,
    setShowModalAppointmentHistoryStatus,
    selectableBoxServices,
    setSelectableBoxServices,
    selectedAppointmentHistoryId,
    setSelectedAppointmentHistoryId,
    options,
    setOptions,
    statusAppointment,
    setStatusAppointment,
    rows,
    setRows,
    decodedData,
    setDecodedData,
    selectedAppointmentIds,
    setSelectedAppointmentIds,
    isLoading,
    setIsLoading,
  } = useStateCustom();

  const {
    fetchData,
    fetchAppointmentInfoSelectableBoxServices,
    fetchAppointmentHistoryStatus,
  } = useFetch(
    storeUser,
    setSelectableBoxServices,
    setOptions,
    setRows,
    setDecodedData,
    setStatusAppointment,
    setIsLoading
  );

  const {
    handleShowAppointmentInfoModal,
    handleShowAppointmentStatusModal,
    handleClose,
  } = useModal(
    setShowModalAppointmentHistoryInfo,
    setShowModalAppointmentHistoryStatus,
    fetchAppointmentInfoSelectableBoxServices,
    fetchAppointmentHistoryStatus,
    setSelectedAppointmentHistoryId
  );

  const { columnWidth, containerRef, columns } = useEffectCustom(
    handleShowAppointmentInfoModal,
    handleShowAppointmentStatusModal
  );

  const {
    handleSubmitAppointmentHistoryStatus,
    handleDeleteAppointment,
    handleRowSelect,
  } = useAction(
    storeUser,
    selectedAppointmentHistoryId,
    statusAppointment,
    handleClose,
    fetchData,
    selectedAppointmentIds,
    setSelectedAppointmentIds,
    setIsLoading
  );

  return (
    <>
      {isLoading && <Loading />}
      <ContainerPage style={{ height: "100vh" }}>
        <Row>
          <Col lg={12} xl={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Histórico Agendamentos"
              subTitle="Área destinada para gerenciamento do histórico de agendamentos."
            />
          </Col>

          <Col
            lg={12}
            xl={5}
            className="d-flex flex-row justify-content-md-center justify-content-lg-end align-items-center  mt-md-3 mt-lg-5 mt-xl-0"
          >
            {decodedData?.userRole === "Admin" && (
              <Button
                onClick={handleDeleteAppointment}
                $isRemove
                type="button"
              />
            )}
          </Col>
        </Row>

        <AppointmentDataTable
          {...{
            selectableBoxServices,
            setSelectableBoxServices,
            handleShowAppointmentInfoModal,
            showModalAppointmentHistoryInfo,
            showModalAppointmentHistoryStatus,
            handleClose,
            columnWidth,
            containerRef,
            columns,
            statusAppointment,
            setStatusAppointment,
            handleSubmitAppointmentHistoryStatus,
            handleRowSelect,
            rows,
            options,
          }}
        />
      </ContainerPage>
    </>
  );
}

export default AppointmentHistory;
