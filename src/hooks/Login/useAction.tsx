import { useSnackbar } from "notistack";
import { decodeToken, loginUser } from "../../services/AuthService";
import { getUserByEmail } from "../../services/UserServices";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const useAction = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  email: string,
  password: string
) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const context = useContext(AppContext);

  const { setAuthToken } = context || {};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loggedUser = await getUserByEmail(email);

      if (loggedUser.emailConfirmed === true) {
        const responseLogin = await loginUser({ email, password });
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
          navigate("/home-client");
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

  return { handleLogin };
};
