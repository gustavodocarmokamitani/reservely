import { useCallback, useEffect, useRef } from "react";
import { DecodedToken } from "../../models/DecodedToken";
import { Employee } from "../../models/Employee";
import { User } from "../../models/User";
import { UserEmployee } from "../../models/UserEmployee";
import { decodeToken } from "../../services/AuthService";
import { capitalizeFirstLetter } from "../../services/system/globalService";
import {
  getUserById,
  getUserByUseTypeStore,
} from "../../services/UserServices";

interface Rows {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  services: number[];
}

interface CombinedData extends Employee, User {}

export const useFetch = (
  storeUser: number,
  setCombinedData: React.Dispatch<React.SetStateAction<CombinedData | null>>,
  setFormValuesProfessionalRegister: React.Dispatch<
    React.SetStateAction<UserEmployee>
  >,
  setRows: React.Dispatch<React.SetStateAction<Rows[]>>,
  setDecodedData: React.Dispatch<React.SetStateAction<DecodedToken | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  decodedData: DecodedToken | null,
  setBlockAddUser: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const storedToken = localStorage.getItem("authToken");
  const fetchDataRef = useRef(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    if (storedToken) {
      try {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
      }
    }

    Number(decodedData?.subscriptionPlanId) !== 1 && setBlockAddUser(true);

    try {
      const usersData = await getUserByUseTypeStore(2, storeUser);

      if (!usersData) {
        setRows([]);
        setIsLoading(false);
        return;
      }

      const mappedRows: Rows[] = usersData.map((user: any) => ({
        ...user,
        name: capitalizeFirstLetter(user.name),
        lastName: capitalizeFirstLetter(user.lastName),
      }));

      setRows(mappedRows);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }

    setIsLoading(false);
  }, [storedToken, storeUser, setDecodedData, setRows, setIsLoading]);

  useEffect(() => {
    if (!fetchDataRef.current) {
      fetchData();
      fetchDataRef.current = true;
    }
  }, [fetchData]);

  const fetchLoadEditFormValues = useCallback(
    async (userId: number) => {
      setIsLoading(true);
      try {
        const resEmployee = await getUserById(userId);
        const mappedEmployee = {
          id: resEmployee.id,
          userId: resEmployee.userId,
          name: resEmployee.name,
          lastName: resEmployee.lastName,
          email: resEmployee.email,
          phone: resEmployee.phone,
          password: resEmployee.password,
          active: resEmployee.active,
          userTypeId: resEmployee.userTypeId,
          serviceIds: resEmployee.serviceIds || [],
          storeId: resEmployee.storeId,
        };

        const resUser = await getUserById(mappedEmployee.id);
        const mappedUser = {
          id: resUser.id,
          name: resUser.name,
          lastName: resUser.lastName,
          email: resUser.email,
          phone: resUser.phone,
          password: resUser.password,
          userTypeId: resUser.userTypeId,
          storeId: storeUser,
        };

        const combined = { ...mappedEmployee, ...mappedUser };
        setCombinedData(combined);

        if (combined) {
          setFormValuesProfessionalRegister((prevState) =>
            prevState.id !== combined.id ? { ...combined } : prevState
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    },
    [
      storeUser,
      setCombinedData,
      setFormValuesProfessionalRegister,
      setIsLoading,
    ]
  ); // ✅ Dependências corretas

  return {
    fetchData,
    fetchLoadEditFormValues,
  };
};
