import { useState } from "react";
import {
  Service,
  Service as ServiceModel,
} from "../../models/Service";
import { ServiceType } from "../../models/ServiceType";
import { DecodedToken } from "../../models/DecodedToken";
import { SelectOption } from "../../models/SelectOptions";

export const useStateCustom = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rows, setRows] = useState<ServiceType[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [durationMinutes, setDurationMinutes] = useState<SelectOption[]>([]);
  const [columnWidth, setColumnWidth] = useState(250);
  const [formValuesService, setFormValuesService] = useState<ServiceModel>({
    id: 0,
    name: "",
    description: "",
    value: "",
    durationMinutes: "",
    active: "false",
    storeId: 0,
  });
  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  const [serviceType, setServiceType] = useState<Service | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<
    number | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
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
    selectedEmployeeId,
    setSelectedEmployeeId,
    columnWidth,
    setColumnWidth,
    isLoading,
    setIsLoading,
  };
};
