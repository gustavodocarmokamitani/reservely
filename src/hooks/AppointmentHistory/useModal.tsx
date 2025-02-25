export const useModal = (
  setShowModalAppointmentHistoryInfo: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  setShowModalAppointmentHistoryStatus: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  fetchAppointmentInfoSelectableBoxServices: (
    appointmentHistoryId: number
  ) => void,
  fetchAppointmentStatus: (appointmentHistoryId: number) => void,
  setSelectedAppointmentHistoryId: React.Dispatch<React.SetStateAction<number>>
) => {
  const handleShowAppointmentInfoModal = (status: boolean, id: number) => {
    fetchAppointmentInfoSelectableBoxServices(id);
    setShowModalAppointmentHistoryInfo(status);
  };

  const handleShowAppointmentStatusModal = (status: boolean, id: number) => {
    fetchAppointmentStatus(id);
    setSelectedAppointmentHistoryId(id);
    setShowModalAppointmentHistoryStatus(status);
  };

  const handleClose = () => {
    setShowModalAppointmentHistoryInfo(false);
    setShowModalAppointmentHistoryStatus(false);
  };
  return {
    handleShowAppointmentInfoModal,
    handleShowAppointmentStatusModal,
    handleClose,
  };
};
