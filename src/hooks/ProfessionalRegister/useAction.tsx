import { useSnackbar } from "notistack";
import { getEmployeeIdByUserId } from "../../services/EmployeeServices";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../../services/UserServices";
import { UserEmployee } from "../../models/UserEmployee";
import { User } from "../../models/User";
import { checkEmail, registerProfessional } from "../../services/AuthService";

export const useAction = (
  formValuesProfessionalRegister: UserEmployee,
  setFormValuesProfessionalRegister: React.Dispatch<
    React.SetStateAction<UserEmployee>
  >,
  selectedUserIds: number[],
  setSelectedUserIds: React.Dispatch<React.SetStateAction<number[]>>,
  fetchData: () => void,
  handleClose: () => void,
  storeUser: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitEditProfessionalRegister = async () => {
    setIsLoading(true);
    try {
      const response = await getUserById(formValuesProfessionalRegister.id);

      if (response) {
        const updatedUser = {
          ...response,
          name: formValuesProfessionalRegister.name,
          lastName: formValuesProfessionalRegister.lastName,
          phone: formValuesProfessionalRegister.phone,
        };

        const createUserResponse = await updateUser(
          updatedUser.id,
          updatedUser
        );

        if (createUserResponse) {
          enqueueSnackbar("Professional editado com sucesso!", {
            variant: "success",
          });
        }
        fetchData();
        handleClose();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleDeleteUsers = async () => {
    setIsLoading(true);
    if (selectedUserIds.length === 0) {
      return alert("Nenhum usuário selecionado!");
    }

    try {
      const deleteUserById = async (userId: number) => {
        try {
          const usersResponse = await getUsers();
          const user = usersResponse.find((u: User) => u.id === userId);

          if (!user) {
            enqueueSnackbar(
              `Nenhum funcionário encontrado para o usuário com ID ${userId}`,
              { variant: "error" }
            );
            return;
          }

          const getEmployeeResponse = await getEmployeeIdByUserId(user.id);

          if (getEmployeeResponse.length !== 0) {
            enqueueSnackbar(
              `Antes de apagar o profissional registrado, é necessário removê-lo da aba "Profissional", incluindo seus serviços e status de agendamento.`,
              { variant: "warning" }
            );
          }

          if (getEmployeeResponse.length === 0) {
            const deleteUserResponse = await deleteUser(userId);
            if (deleteUserResponse) {
              enqueueSnackbar(`Professional excluído com sucesso!`, {
                variant: "success",
              });

              setSelectedUserIds([]);
            }
          }
        } catch (error) {
          console.error(`Erro ao remover o usuário ${userId}:`, error);
          enqueueSnackbar(`Erro ao excluir o usuário ${userId}.`, {
            variant: "error",
          });
        }
      };

      await Promise.all(selectedUserIds.map(deleteUserById));

      fetchData();
    } catch (error) {
      console.error("Erro ao remover os usuários:", error);
      enqueueSnackbar("Erro ao excluir usuários.", { variant: "error" });
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleRegisterProfessionalRegister = async () => {
    setIsLoading(true);
    const formatString = (str: string): string => str.toLowerCase();

    const isValidEmail =
      formValuesProfessionalRegister.email.includes("@") &&
      formValuesProfessionalRegister.email.endsWith(".com");

    console.log(formValuesProfessionalRegister);

    if (!isValidEmail) {
      enqueueSnackbar(
        "Email inválido. Certifique-se de que o email está correto.",
        {
          variant: "warning",
        }
      );
      setIsLoading(false);
      return;
    }

    const professionalData = {
      name: formatString(formValuesProfessionalRegister.name),
      lastName: formatString(formValuesProfessionalRegister.lastName),
      email: formatString(formValuesProfessionalRegister.email),
      phone: formValuesProfessionalRegister.phone,
      userTypeId: 2,
      storeId: storeUser,
    };

    try {
      const emailExists = await checkEmail(professionalData.email);

      if (emailExists) {
        enqueueSnackbar("Este e-mail já está cadastrado.", {
          variant: "default",
        });
        setIsLoading(false);
        return;
      }

      const response = await registerProfessional(professionalData);

      if (response) {
        enqueueSnackbar("Profissional registrado com sucesso.", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Erro ao registrar profissional:", error);
      enqueueSnackbar("Erro ao registrar profissional. Tente novamente.", {
        variant: "error",
      });
      setIsLoading(false);
    }
    fetchData();
    setIsLoading(false);
    handleClose();
  };

  const handleRowSelect = (ids: number[]) => {
    setSelectedUserIds(ids);
  };

  const handleInputChangeProfessionalRegister = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);

    const { name, type, checked, value } = event.target;
    setFormValuesProfessionalRegister((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
    console.log(formValuesProfessionalRegister);
  };

  return {
    handleSubmitEditProfessionalRegister,
    handleDeleteUsers,
    handleRegisterProfessionalRegister,
    handleRowSelect,
    handleInputChangeProfessionalRegister,
  };
};
