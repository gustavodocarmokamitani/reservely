import api from '../axiosInstance'; // Importa o axios configurado
import { RegisterData } from '../models/RegisterData'; // Modelo para registro, se necessário
import { LoginData } from '../models/LoginData'; // Modelo para login, se necessário

// Serviço para registro de usuário
export const registerUser = async (registerData: RegisterData) => {
    try {
        const response = await api.post('/Auth/register', registerData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

// Serviço para login de usuário
export const loginUser = async (login: LoginData) => {
    try {
        const response = await api.post('/Auth/login', login);
        // Aqui retornamos o token JWT
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};
