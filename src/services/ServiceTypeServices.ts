import api from '../axiosInstance';
import { ServiceServiceType } from '../models/Service';
import { ServiceType } from '../models/ServiceType';

export const getServiceTypes = async () => {
    try {
        const response = await api.get('serviceType');
        return response;
    } catch (error) {
        console.error("Error getting service types:", error);
        throw error;
    }
};

export const getServiceTypeById = async (id: number) => {
    if (!id) return;
    try {
        const response = await api.get(`serviceType/${id}`);
        return response;
    } catch (error) {
        console.error("Error getting service type by ID:", error);
        
    }
};

export const getServiceTypeByIdData = async (id: number) => {
    if (!id) return;
    try {
        const response = await api.get(`serviceType/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting service type data:", error);
        throw error;
    }
};

export const createServiceType = async (serviceTypeData: ServiceType[]) => {
    try {
        const response = await api.post('serviceType', serviceTypeData);
        return response.data;
    } catch (error) {
        console.error("Error creating service type:", error);
        throw error;
    }
};

export const updateServiceType = async (id: number, serviceTypeData: ServiceType) => {
    try {
        const response = await api.put(`serviceType/${id}`, serviceTypeData);
        return response;
    } catch (error) {
        console.error("Error updating service type:", error);
        throw error;
    }
};

export const deleteServiceType = async (id: number) => {
    try {
        const response = await api.delete(`serviceType/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting service type:", error);
        throw error;
    }
};

export const createServiceTypeByStoreId = async (storeId: number, serviceTypeData: ServiceServiceType[]) => {
    if (!storeId || !serviceTypeData) {
        console.error("Store ID and service data are required");
        return;
    }
    try {
        const response = await api.post(`serviceType/api/serviceTypes/${storeId}`, serviceTypeData);
        return response.data;
    } catch (error) {
        console.error(`Error creating service types for storeId ${storeId}:`, error);
        throw error;
    }
};

export const getServiceTypesByStore = async (storeId: number ) => {
    if (!storeId) return;
    try {
        const response = await api.get(`serviceType/by-store/${storeId}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting service types for storeId ${storeId}:`, error);
    }
};

