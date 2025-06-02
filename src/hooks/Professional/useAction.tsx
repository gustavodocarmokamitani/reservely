import { useSnackbar } from "notistack";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeIdByUserId,
  getEmployees,
  updateEmployee,
} from "../../services/EmployeeServices";
import { getUserById } from "../../services/UserServices";
import { SelectOption } from "../../models/SelectOptions";
import { UserEmployee } from "../../models/UserEmployee";
import { Employee, Employee as EmployeeModel } from "../../models/Employee";

export const useAction = (
  fetchData: () => void,
  handleClose: () => void,
  employee: SelectOption | null,
  setSelectedUserIds: React.Dispatch<React.SetStateAction<number[]>>,
  storeUser: number,
  formValuesProfessionalRegister: UserEmployee,
  setFormValuesProfessionalRegister: React.Dispatch<
    React.SetStateAction<UserEmployee>
  >,
  selectedUserIds: number[]
) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleRowSelect = (ids: number[]) => {
    setSelectedUserIds(ids);
  };

  const handleSubmitEmployeeAdd = async () => {
    if (employee) {
      const responseEmployee = await getUserById(employee.value);

      const employeeData = {
        id: responseEmployee.id,
        userId: responseEmployee.id,
        active: "true",
        storeId: Number(storeUser),
        serviceIds: formValuesProfessionalRegister.serviceIds,
      };

      handleEmployeeAdd([employeeData]);
    }

    fetchData();
    handleClose();
  };

  const handleSubmitEmployeeEdit = async () => {
    const response = await getEmployeeIdByUserId(
      formValuesProfessionalRegister.id
    );

    if (response) {
      const { id, userId, active, serviceIds } = response;

      const updatedEmployee = {
        id,
        userId,
        active: formValuesProfessionalRegister.active || active,
        serviceIds: formValuesProfessionalRegister.serviceIds || serviceIds,
        storeId: storeUser,
      };

      const updateEmployeeResponse = await updateEmployee(
        updatedEmployee.id,
        updatedEmployee
      );
      if (updateEmployeeResponse) {
        fetchData();
        enqueueSnackbar("Professional criado com sucesso!", {
          variant: "success",
        });
      }
    }

    fetchData();
    handleClose();
  };

  const handleEmployeeAdd = async (employeeData: EmployeeModel[]) => {
    try {
      const updatedEmployeeData = employeeData.map((employee) => ({
        ...employee,
        serviceIds: formValuesProfessionalRegister.serviceIds,
      }));

      const response = await createEmployee(updatedEmployeeData);
      if (response) {
        enqueueSnackbar("Profissional adicionado com sucesso.", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Erro ao registrar o profissional: ", error);
      enqueueSnackbar("Ocorreu um erro. Por favor, tente novamente.", {
        variant: "error",
      });
    }
  };

  const handleServiceSelection = (serviceIds: number[]) => {
    const updatedFormValues: UserEmployee = {
      ...formValuesProfessionalRegister,
      serviceIds,
    };
    setFormValuesProfessionalRegister(updatedFormValues);
  };

  const handleDeleteUsers = async () => {
    if (selectedUserIds.length > 0) {
      try {
        await Promise.all(
          selectedUserIds.map(async (userId) => {
            try {
              const employeeResponse = await getEmployees();
              const employee = employeeResponse.find(
                (f: Employee) => f.userId === userId
              );

              if (employee) {
                const employeeId = employee.id;

                await deleteEmployee(employeeId);
                enqueueSnackbar(`Professional excluido com sucesso!`, {
                  variant: "success",
                });
              } else {
                enqueueSnackbar(
                  `Nenhum funcionário encontrado para o usuário com ID ${userId}`,
                  { variant: "error" }
                );
              }
              await deleteEmployee(userId);
            } catch (error) {
              console.error(`Erro ao remover o usuário ${userId}:`, error);
            }
          })
        );
        fetchData();
        setSelectedUserIds([]);
      } catch (error) {
        console.error("Erro ao remover os usuários:", error);
      }
    } else {
      alert("Nenhum usuário selecionado!");
    }
  };

  const handleInputChangeProfessional = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormValuesProfessionalRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    handleSubmitEmployeeAdd,
    handleEmployeeAdd,
    handleRowSelect,
    handleServiceSelection,
    handleDeleteUsers,
    handleSubmitEmployeeEdit,
    handleInputChangeProfessional,
  };
};
