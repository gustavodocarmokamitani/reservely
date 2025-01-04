import api from '../axiosInstance';
import { RegisterData } from '../models/RegisterData';
import { LoginData } from '../models/LoginData';

export const registerUser = async (registerData: RegisterData) => {
    try {
        const response = await api.post('/auth/register', registerData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginUser = async (login: LoginData) => {
    try {
        const response = await api.post('/auth/login', login);
        // Aqui retornamos o token JWT
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

export const resendConfirmationEmail = async (email: string) => {
    try {
        const response = await api.post('/auth/resend-confirmation-email', { Email: email });
        return response.data;
    } catch (error) {
        console.error("Error resending confirmation email:", error);
        throw error;
    }
};

export const checkEmail = async (email: string) => {
    try {
        const response = await api.get('/auth/check-email', {
            params: { email: email }
        });

        return response.data.exists;
    } catch (error) {
        console.error("Error checking email:", error);
    }
};
