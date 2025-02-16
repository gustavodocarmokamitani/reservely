import React from "react";
import { Service } from "../../models/Service";
import { SelectOption } from "../../models/SelectOptions";

export const useModal = (
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedEmployeeId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >,
  fetchEditService: (serviceId: number) => void,
  setFormValuesService: React.Dispatch<React.SetStateAction<Service>>,
  setDurationMinutes: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  generateTimes: () => SelectOption[]
) => {
  const handleClose = () => {
    setShowAddModal(false);
    setFormValuesService({} as Service);
    setDurationMinutes([]);
    setShowEditModal(false);
  };
  const handleShowAddServiceModal = () => {
    generateTimes();
    setShowAddModal(true);
  };

  const handleShowEditServiceModal = (status: boolean, serviceId: number) => {
    fetchEditService(serviceId);
    setSelectedEmployeeId(serviceId);
    setShowEditModal(true);
  };
  return {
    handleClose,
    handleShowAddServiceModal,
    handleShowEditServiceModal,
  };
};
