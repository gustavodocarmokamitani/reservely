export const useModal = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>,
  fetchLoadDataAddEmployee: () => void,
  fetchLoadDataEditEmployee: (id: number) => void,
) => {
  const handleShowEditProfessionalModal = (status: boolean, id: number) => {
    fetchLoadDataEditEmployee(id);
    setShowModal(status);
  };

  const handleClose = () => {
    setSelectedServices([]);
    setShow(false);
    setShowModal(false);
  };

  const handleShowAddProfessionalModal = () => {
    fetchLoadDataAddEmployee();
    setShow(true);
  };

  return {
    handleShowEditProfessionalModal,
    handleClose,
    handleShowAddProfessionalModal,
  };
};
