import { useSnackbar } from "notistack";
import {
  checkEmail,
  registerUser,
  registerUserClientWithGoogle,
  registerUserStoreWithGoogle,
} from "../../services/AuthService";
import { createStore, deleteStore } from "../../services/StoreServices";

export const useAction = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  formData: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    storeName: string;
  },
  storeCode: string
) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleRegisterStoreWithGoogle = async (credentialResponse: any) => { 
    
    const googleToken = credentialResponse.credential;

    if (googleToken) {
      const response = await registerUserStoreWithGoogle(googleToken);

      if (response) {
        window.location.href = "/login";
      }
    }
  };

  const handleRegisterClientWithGoogle = async (credentialResponse: any) => { 
    
    const googleToken = credentialResponse.credential;

    if (googleToken) {
      const response = await registerUserClientWithGoogle(googleToken);

      if (response) {
        window.location.href = "/login";
      }
    }
  };

  const handleRegisterStore = async () => {
    setIsLoading(true);
    let storeCodeGeneric;

    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("As senhas não são iguais. Tente novamente.", {
        variant: "default",
      });
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      enqueueSnackbar("Por favor, insira um endereço de e-mail válido.", {
        variant: "default",
      });
      setIsLoading(false);
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      enqueueSnackbar(
        "A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial.",
        { variant: "default" }
      );
      setIsLoading(false);
      return;
    }

    const emailExists = await checkEmail(formData.email);
    if (emailExists) {
      enqueueSnackbar("Este e-mail já está cadastrado.", {
        variant: "default",
      });
      setIsLoading(false);
      return;
    }

    try {
      const responseStore = await createStore({
        id: 0,
        storeCode: "",
        name: formData.storeName,
        address: "",
        status: false,
        multipleAppointments: false,
        operatingHours: "",
        closingDays: [""],
        operatingDays: [""],
        paymentMethods: [0],
      });

      storeCodeGeneric = responseStore.id;

      const response = await registerUser(":", {
        name: formData.name,
        lastName: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userName: formData.email,
        userTypeId: 1,
        storeId: responseStore.id,
      });

      if (responseStore && response) {
        window.location.href = "/confirm-email";
      }
    } catch (error) {
      enqueueSnackbar("Ocorreu um erro. Por favor, tente novamente.", {
        variant: "error",
      });
      await deleteStore(storeCodeGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClient = async () => {
    setIsLoading(true);
    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("As senhas não são iguais. Tente novamente.", {
        variant: "default",
      });
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      enqueueSnackbar("Por favor, insira um endereço de e-mail válido.", {
        variant: "default",
      });
      setIsLoading(false);
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      enqueueSnackbar(
        "A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial.",
        { variant: "default" }
      );
      setIsLoading(false);
      return;
    }

    const emailExists = await checkEmail(formData.email);
    if (emailExists) {
      enqueueSnackbar("Este e-mail já está cadastrado.", {
        variant: "default",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser(storeCode, {
        name: formData.name,
        lastName: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userName: formData.email,
        userTypeId: 3,
        storeId: 0,
      });

      if (response) {
        window.location.href = "/confirm-email";
      }
    } catch (error) {
      enqueueSnackbar("Ocorreu um erro. Por favor, tente novamente.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigationHome = () => {
    window.location.href = "/";
  };

  return {
    handleRegisterStoreWithGoogle,
    handleRegisterClientWithGoogle,
    handleRegisterStore,
    handleRegisterClient,
    handleNavigationHome,
  };
};
