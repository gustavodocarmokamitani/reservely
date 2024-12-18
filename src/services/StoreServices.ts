
import api from '../axiosInstance';
import { Store } from "../models/Store";

export const getStores = async () => {
    try {
        const response = await api.get('store');
        return response.data;
    } catch (error) {
        console.error("Error getting stores:", error);
        throw error;
    }
};

export const getStoreById = async (id: number) => {
    try {
        const response = await api.get(`store/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting store:", error);
        throw error;
    }
};

export const createStore = async (storeData: Store) => {
    try {
        const response = await api.post('store', storeData);
        return response.data;
    } catch (error) {
        console.error("Error creating store:", error);
        throw error;
    }
};

export const updateStore = async (id: number, storeData: Store) => {
    try {
        const response = await api.put(`store/${id}`, storeData);
        return response.data;
    } catch (error) {
        console.error("Error updating store:", error);
        throw error;
    }
};

export const deleteStore = async (id: number) => {
    try {
        const response = await api.delete(`store/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting store:", error);
        throw error;
    }
};

export const getStoresByClientId = async (clientId: number) => {
    try {
        const response = await api.get(`store/client/${clientId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting store by client:", error);
        throw error;
    }
};
