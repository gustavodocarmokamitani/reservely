import { useEffect, useRef } from "react";
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
  combinedData: CombinedData | null,
  setCombinedData: React.Dispatch<React.SetStateAction<CombinedData | null>>,
  setFormValuesProfessionalRegister: React.Dispatch<
    React.SetStateAction<UserEmployee>
  >,
  setRows: React.Dispatch<React.SetStateAction<Rows[]>>,
  setDecodedData: React.Dispatch<React.SetStateAction<DecodedToken | null>>
) => {
  const storedToken = localStorage.getItem("authToken");
  const fetchDataRef = useRef(false);

  const fetchData = async () => {
    if (storedToken) {
      const data = await decodeToken(storedToken);
      setDecodedData(data);
    }
    try {
      const usersData = await getUserByUseTypeStore(2, storeUser);

      if (usersData === undefined) {
        setRows([]);
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
  };

  useEffect(() => {
    if (!fetchDataRef.current) {
      fetchData();
      fetchDataRef.current = true;
    }
  }, [fetchData]);

  const fetchLoadEditFormValues = async (userId: number) => {
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
        const {
          id,
          userId,
          name,
          lastName,
          email,
          phone,
          active,
          userTypeId,
          password,
          serviceIds,
          storeId,
        } = combined;

        setFormValuesProfessionalRegister((prevState) => {
          if (id !== prevState.id) {
            return {
              id,
              userId,
              name,
              lastName,
              email,
              phone,
              active,
              userTypeId,
              password,
              serviceIds,
              storeId,
            };
          }
          return prevState;
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    fetchData,
    fetchLoadEditFormValues,
  };
};
