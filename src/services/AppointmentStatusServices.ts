import api from '../axiosInstance';
import { AppointmentStatus } from '../models/AppointmentStatus';

export const getAppointmentStatus = async () => {
    try {
        const response = await api.get('AppointmentStatus');
        return response.data;
    } catch (error) {
        console.error("Error getting appointment status:", error);
        throw error;
    }
};

export const getAppointmentStatusById = async (id: number) => {
    try {
        const response = await api.get(`AppointmentStatus/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting appointment status:", error);
        throw error;
    }
};

export const createAppointmentStatus = async (AppointmentStatusData: AppointmentStatus) => {
    try {
        const response = await api.post('AppointmentStatus', AppointmentStatusData);
        return response.data;
    } catch (error) {
        console.error("Error creating appointment status:", error);
        throw error;
    }
};

export const updateAppointmentStatus = async (id: number, AppointmentStatusData: AppointmentStatus) => {
    try {
        const response = await api.put(`AppointmentStatus/${id}`, AppointmentStatusData);
        return response.data;
    } catch (error) {
        console.error("Error updating appointment status:", error);
        throw error;
    }
};

export const deleteAppointmentStatus = async (id: number) => {
    try {
        const response = await api.delete(`AppointmentStatus/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting appointment status:", error);
        throw error;
    }
};
