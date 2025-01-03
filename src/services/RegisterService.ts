// src/services/RegisterService.ts
import api from '../axiosInstance'; // Importa o axios configurado
import { RegisterData } from '../models/RegisterData'; // Modelo do registro, se necessário

export const registerUser = async (registerData: RegisterData) => {
    try {
        const response = await api.post('user/register', registerData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};
