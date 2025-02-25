
import api from '../axiosInstance';
import { Service } from '../models/Service';

export const getServices = async () => {
    try {
        const response = await api.get('service');
        return response.data;
    } catch (error) {
        console.error("Error getting services:", error);
        throw error;
    }
};

export const getServiceByStoreId = async (id: number) => {
    try {
        const response = await api.get(`store/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting service by ID:", error);
        throw error;
    }
};

export const getServiceById = async (id: number) => {
    try {
        const response = await api.get(`service/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting service by ID:", error);
        throw error;
    }
};

export const createService = async (serviceData: Service) => {
    try {
        const response = await api.post('service', serviceData);
        return response.data;
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
};

export const updateService = async (id: number, serviceData: Service) => {
    try {
        const response = await api.put(`service/${id}`, serviceData);
        return response.data;
    } catch (error) {
        console.error("Error updating service:", error);
        throw error;
    }
};

export const deleteService = async (id: number) => {
    try {
        const response = await api.delete(`service/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting service:", error);
        throw error;
    }
};
