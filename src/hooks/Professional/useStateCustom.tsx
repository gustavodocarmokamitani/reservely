import { useRef, useState } from "react";
import { SelectOption } from "../../models/SelectOptions";
import { Service } from "../../models/Service";
import { Employee } from "../../models/Employee";
import { User } from "../../models/User";
import { UserEmployee } from "../../models/UserEmployee";
import { DecodedToken } from "../../models/DecodedToken";

interface Rows {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  services: number[];
  active: boolean;
  storeId: number;
}
interface CombinedData extends Employee, User {}

export const useStateCustom = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);
  const [columnWidth, setColumnWidth] = useState<number>(250);
  const [serviceType, setServiceType] = useState<any[]>([]);
  const [employeeSelect, setEmployeeSelect] = useState<SelectOption[]>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selectableBoxServices, setSelectableBoxServices] = useState<Service[]>(
    []
  );
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [rows, setRows] = useState<Rows[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [post, setPost] = useState<boolean>(false);
  const [employee, setEmployee] = useState<SelectOption | null>(null);
  const [formValuesProfessional, setFormValuesProfessional] =
    useState<UserEmployee>({
      id: 0,
      userId: 0,
      name: "",
      lastName: "",
      email: "",
      phone: "",
      active: "false",
      password: "",
      userTypeId: 0,
      serviceIds: [],
      storeId: 0,
    });
  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  const [combinedData, setCombinedData] = useState<CombinedData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    showModal,
    setShowModal,
    selectedEmployeeId,
    setSelectedEmployeeId,
    columnWidth,
    setColumnWidth,
    serviceType,
    setServiceType,
    employeeSelect,
    setEmployeeSelect,
    options,
    setOptions,
    selectedServices,
    setSelectedServices,
    rows,
    setRows,
    selectedUserIds,
    setSelectedUserIds,
    show,
    setShow,
    post,
    setPost,
    employee,
    setEmployee,
    decodedData,
    setDecodedData,
    selectableBoxServices,
    setSelectableBoxServices,
    formValuesProfessional,
    setFormValuesProfessional,
    containerRef,
    combinedData,
    setCombinedData,
    isLoading,
    setIsLoading,
  };
};
