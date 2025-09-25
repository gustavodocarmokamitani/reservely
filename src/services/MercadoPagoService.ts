import api from "../axiosInstance";
import axios from "axios";

export const getPaymentLink = async (planId: number) => {
  try {
    const response = await api.post("/link-subscription", {
      planId,
    });

    return response.data.initPoint;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error || "Erro ao obter o link de assinatura."
      );
    }
    console.error("Erro desconhecido:", error);
    throw error;
  }
};

export const getUpdatePaymentLink = async (planId: number) => {
  try {
    const response = await api.post("/link-subscription/extend", {
      planId,
    });

    return response.data.initPoint;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error || "Erro ao obter o link de assinatura."
      );
    }
    console.error("Erro desconhecido:", error);
    throw error;
  }
};
