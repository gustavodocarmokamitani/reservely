import { useState } from "react";
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
}

interface CombinedData extends Employee, User {}

export const useStateCustom = () => {
  const [rows, setRows] = useState<Rows[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [combinedData, setCombinedData] = useState<CombinedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [columnWidth, setColumnWidth] = useState(250);
  const [formValuesProfessionalRegister, setFormValuesProfessionalRegister] =
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
      serviceIds: [] as number[],
      storeId: 0,
    });

  return {
    rows,
    setRows,
    selectedUserIds,
    setSelectedUserIds,
    show,
    setShow,
    decodedData,
    setDecodedData,
    selectedEmployeeId,
    setSelectedEmployeeId,
    combinedData,
    setCombinedData,
    formValuesProfessionalRegister,
    setFormValuesProfessionalRegister,
    loading,
    setLoading,
    showEditModal,
    setShowEditModal,
    columnWidth,
    setColumnWidth,
  };
};
