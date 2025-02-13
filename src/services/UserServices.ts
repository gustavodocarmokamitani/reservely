
import api from '../axiosInstance';
import { User } from '../models/User';

export const getUsers = async () => {
    try {
        const response = await api.get('user');
        return response.data;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
};

export const getUserById = async (id: number) => {
    try {
        const response = await api.get(`user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
};

export const getUserTypeIdById = async (id: number) => {
    try {
        const response = await api.get(`user/type/${id}`);
        if (response.data && response.data.length === 0) {
            return [];
        }
        return response.data;
    } catch (error) {
        console.error("Error getting user type:", error);
        return [];
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const response = await api.get(`user/email/${email}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user by email:", error);
        throw error;
    }
};

export const getUserByUseTypeStore = async (userTypeId: number, storeId: number) => {
    try {
        const response = await api.get(`user/type/${userTypeId}/store/${storeId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user by email:", error);
    }
};


export const createUser = async (userData: User) => {
    try {
        const response = await api.post('user', userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (id: number, userData: User) => {
    try {
        const response = await api.put(`user/${id}`, userData);
        return response;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id: number) => {
    try {
        const response = await api.delete(`user/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
