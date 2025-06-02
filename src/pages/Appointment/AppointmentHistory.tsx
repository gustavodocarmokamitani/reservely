import { Col, Row } from "react-bootstrap";

import * as P from "../Styles/_Page.styles";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import AppointmentDataTable from "../../view/DataTable/AppointmentDataTable";
import Button from "../../components/Button/Button";

import { useStateCustom } from "../../hooks/AppointmentHistory/useStateCustom";
import { useModal } from "../../hooks/AppointmentHistory/useModal";
import { useFetch } from "../../hooks/AppointmentHistory/useFetch";
import { useEffectCustom } from "../../hooks/AppointmentHistory/useEffectCustom";
import { useAction } from "../../hooks/AppointmentHistory/useAction";
import Loading from "../../components/Loading/loading";

import homeClient from "../../assets/homeClient.svg";
import UserMenu from "../../components/UserMenu/UserMenu";

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
    appointmentTime,
    setAppointmentTime,
    appointmentDate,
    setAppointmentDate,
    optionsTime,
    setOptionsTime,
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
    setIsLoading,
    setOptionsTime
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
    setIsLoading,
    appointmentDate,
    appointmentTime
  );

  return (
    <>
      {isLoading && <Loading />}
      <P.ContainerPage style={{ height: "100%" }}>
        <UserMenu />
        <P.ContainerHeader>
          <P.ContentHeader align="start">
            <P.Title>
              Histórico Agendamentos
            </P.Title>
            <P.SubTitle>
              Área destinada para gerenciamento do histórico de agendamentos.
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
                <Button
                  onClick={handleDeleteAppointment}
                  $isRemove
                  type="button"
                />
              </div>
            )}
          </P.ContentHeaderImg>
        </P.ContainerHeader>
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
            appointmentTime,
            setAppointmentTime,
            optionsTime,
            setAppointmentDate,
          }}
        />
      </P.ContainerPage>
    </>
  );
}

export default AppointmentHistory;
