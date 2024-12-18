
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
        return response.data;
    } catch (error) {
        console.error("Error getting user type:", error);
        throw error;
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
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id: number) => {
    try {
        const response = await api.delete(`user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
