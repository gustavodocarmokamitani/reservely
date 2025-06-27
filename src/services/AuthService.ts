import api from "../axiosInstance";
import { RegisterData } from "../models/RegisterData";
import { LoginData } from "../models/LoginData";
import { RegisterEmployee } from "../models/RegisterEmployee";
import { GoogleLoginRequest } from "../models/GoogleLoginRequest";

export const registerUserWithGoogle = async (
  credential: GoogleLoginRequest
) => {
  try {
    const response = await api.post("/auth/register-with-google", credential);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Ocorreu um erro ao registrar o profissional.");
  }
};

export const registerProfessional = async (storeCode: string, registerData: RegisterEmployee) => {
  try {
    const response = await api.post(
      `/auth/register-professional/${storeCode}`,
      registerData
    );
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Ocorreu um erro ao registrar o profissional.");
  }
};

export const registerUser = async (storeCode: string, registerData: RegisterData) => {
  try {
    const response = await api.post(`/auth/register/${storeCode}`, registerData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (login: LoginData) => {
  try {
    const response = await api.post("/auth/login", login);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const resendConfirmationEmail = async (storeCode: string, email: string) => {
  try {
    const response = await api.post(`/auth/resend-confirmation-email/${storeCode}`, {
      Email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Error resending confirmation email:", error);
    throw error;
  }
};

export const checkEmail = async (email: string) => {
  try {
    const response = await api.get("/auth/check-email", {
      params: { email: email },
    });

    return response.data.exists;
  } catch (error) {
    console.error("Error checking email:", error);
  }
};

export const decodeToken = async (token: string) => {
  try {
    const response = await api.post("/auth/decode-token", token);
    return response.data;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
};

export const requestResetPassword = async (email: string) => {
  try {
    const response = await api.post("/auth/reset-password", { email });
    return response.data;
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha:", error);
    throw error;
  }
};

export const confirmResetPassword = async (userId: string, token: string, newPassword: string) => {
  try {
    const response = await api.post("/auth/confirm-reset-password", {
      userId,
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao confirmar redefinição de senha:", error);
    throw error;
  }
};
