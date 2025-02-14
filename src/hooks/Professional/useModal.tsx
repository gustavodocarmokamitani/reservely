export const useModal = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>,
  fetchEmployeeSelectAdd: () => void,
  fetchEmployeeSelectableBox: () => void,
  fetchLoadEmployeeSelectedDatatable: (id: number) => void,
) => {
  const handleShowEditProfessionalModal = (status: boolean, id: number) => {
    
    fetchLoadEmployeeSelectedDatatable(id);
    setShowModal(status);
  };

  const handleClose = () => {
    setShow(false);
    setShowModal(false);
    setSelectedServices([]);
  };

  const handleShowAddProfessionalModal = () => {
    fetchEmployeeSelectableBox();
    setShow(true);
    fetchEmployeeSelectAdd();
  };

  return {
    handleShowEditProfessionalModal,
    handleClose,
    handleShowAddProfessionalModal,
  };
};
