import api from '../axiosInstance';
import { Employee } from '../models/Employee';
import { UserEmployee, UserEmployeeUpdate } from '../models/UserEmployee';
import axios from 'axios';

export const getEmployees = async () => {
    try {
        const response = await api.get('employee');
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
};

export const getEmployeeById = async (id: number) => {
    try {
        const response = await api.get(`employee/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching the employee:", error);
        throw error;
    }
};

export const getCorrigirIdByUserId = async (id: number) => {
    try {
        const response = await api.get(`employee/employee/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Request error:", error.response?.data || error.message);
        } else {
            console.error("Unknown error:", error);
        }
        throw error;
    }
};

export const getEmployeeIdByUserId = async (id: number) => {
    try {
        const response = await api.get(`employee/employerData/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Request error:", error.response?.data || error.message);
        } else {
            console.error("Unknown error:", error);
        }
        return [];
    }
};

export const getEmployeesByStoreId = async (storeId: number) => {
    try {
        const response = await api.get(`employee/store/${storeId}`);
        // Verifique se o retorno está vazio
        if (response.status === 404 || !response.data || response.data.length === 0) {
            return [];
        }
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Agora você pode acessar as propriedades do erro como message
            console.error("Erro ao buscar funcionários:", error.message);
            if ((error as any).response?.status === 404) {
                return [];
            }
        } else {
            // Lida com erros de tipos desconhecidos
            console.error("Erro inesperado:", error);
        }
        throw error; // Lança o erro se não for o tipo esperado
    }
};





export const createEmployee = async (employeeData: Employee[]) => {
    try {
        const response = await api.post('employee', employeeData);
        return response.data;
    } catch (error) {
        console.error("Error creating employee:", error);
        throw error;
    }
};

export const createEmployeeUser = async (employeeUserData: UserEmployee) => {
    try {
        const response = await api.post('employee/createUserEmployee', employeeUserData);
        return response.data;
    } catch (error) {
        console.error("Error creating user employee:", error);
        throw error;
    }
};

export const updateEmployee = async (id: number, employeeData: Employee) => {
    try {
        const response = await api.put(`employee/${id}`, employeeData);
        return response;
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};

export const deleteEmployee = async (id: number) => {
    try {
        const response = await api.delete(`employee/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
};

export const updateUserEmployee = async (
    id: number,
    employeeData: UserEmployeeUpdate
) => {
    try {
        const response = await api.put(`employee/updateUserEmployee/${id}`, employeeData);
        return response;
    } catch (error) {
        console.error("Error updating User and Employee:", error);
        throw error;
    }
};
