import { useSnackbar } from "notistack";
import {
  decodeToken,
  loginUser,
  loginWithGoogle,
  // loginWithGoogle não precisa ser importado aqui se estiver no mesmo arquivo
} from "../../services/AuthService";
import { getUserByEmail } from "../../services/UserServices";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { CredentialResponse } from "@react-oauth/google";

export const useAction = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  email: string,
  password: string,
  storeCode: string
) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const context = useContext(AppContext);
  const { setAuthToken } = context || {};
 
  const handleLoginWithGoogle = async (
    credentialResponse: CredentialResponse
  ) => {
    setIsLoading(true);
    try {
      if (credentialResponse.credential === undefined) {
        throw new Error("Credencial do Google não fornecida.");
      }

      const response = await loginWithGoogle(credentialResponse.credential);
 
      const { token, storeId, name, lastName } = response;

      if (response.sucesso && token) {
        if (setAuthToken) setAuthToken(token);

        const responseDecodedToken = await decodeToken(token);

        localStorage.setItem("storeUser", storeId);
        localStorage.setItem("authToken", token);

        enqueueSnackbar(`Seja bem vindo ${name} ${lastName}! `, {
          variant: "success",
        });

        if (responseDecodedToken.userRole === "Client") {
          if (storeCode === "") {
            navigate(`/home-client/:`);
          } else {
            navigate(`/home-client/${storeCode}`);
          }
        } else {
          navigate("/appointment");
        }
      } else {
        enqueueSnackbar("Erro ao fazer login com Google.", {
          variant: "default",
        });
      }
    } catch (err) {
      console.error("Erro ao tentar fazer login com Google:", err);

      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          enqueueSnackbar("Usuário não encontrado. Por favor, registre-se.", {
            variant: "default",
          });
        } else {
          enqueueSnackbar("Ocorreu um erro inesperado.", {
            variant: "default",
          });
        }
      } else {
        enqueueSnackbar("Ocorreu um erro inesperado.", { variant: "default" });
      }
    }
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const lowerEmail = email.toLowerCase();
      const loggedUser = await getUserByEmail(lowerEmail);

      if (loggedUser.emailConfirmed === true) {
        const responseLogin = await loginUser({ email: lowerEmail, password });
        const token = responseLogin.token;

        if (setAuthToken) setAuthToken(token);
        const responseDecodedToken = await decodeToken(token);
        localStorage.setItem("storeUser", loggedUser.storeId);
        localStorage.setItem("authToken", token);
        enqueueSnackbar(
          `Seja bem vindo ${loggedUser.name} ${loggedUser.lastName}! `,
          { variant: "success" }
        );
        if (responseDecodedToken.userRole === "Client") {
          if (storeCode === "") {
            navigate(`/home-client/:`);
          } else {
            navigate(`/home-client/${storeCode}`);
          }
        } else {
          navigate("/appointment");
        }
      } else {
        enqueueSnackbar("E-mail não verificado.", { variant: "default" });
      }
    } catch (err) {
      console.error("Erro ao tentar fazer login:", err);
      enqueueSnackbar("E-mail ou senha incorretos.", { variant: "default" });
    }
    setIsLoading(false);
  };

  return { handleLogin, handleLoginWithGoogle };
};
