import { UserEmployee } from "../../models/UserEmployee";

export const useModal = (
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
  fetchLoadEditFormValues: (userId: number) => void,
  setFormValuesProfessionalRegister: React.Dispatch<
    React.SetStateAction<UserEmployee>
  >
) => {
  const handleClose = () => {
    setFormValuesProfessionalRegister({
      id: 0,
      userId: 0,
      name: "",
      lastName: "",
      email: "",
      phone: "",
      active: "false",
      password: "",
      userTypeId: 0,
      serviceIds: [] as number[],
      storeId: 0,
    });
    setShow(false);
    setShowEditModal(false);
  };

  const handleShowAddProfessionalModal = () => {
    setShow(true);
  };

  const handleShowEditProfessionalModal = (status: boolean, userId: number) => {
    fetchLoadEditFormValues(userId);
    setShowEditModal(status);
  };

  return {
    handleClose,
    handleShowAddProfessionalModal,
    handleShowEditProfessionalModal,
  };
};
