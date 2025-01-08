// src/services/AppointmentService.js
import api from '../axiosInstance';
import { Appointment } from '../models/Appointment';

export const getAppointments = async () => {
    try {
        const response = await api.get('Appointment');
        return response.data;
    } catch (error) {
        console.error("Error getting Appointments:", error);
        throw error;
    }
};

export const getAppointmentById = async (id: number) => {
    try {
        const response = await api.get(`Appointment/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment:", error);
        throw error;
    }
};

export const createAppointment = async (AppointmentData: Appointment[]) => {
    try {
        const response = await api.post('Appointment', AppointmentData);
        return response.data;
    } catch (error) {
        console.error("Error creating Appointment:", error);
        throw error;
    }
};

export const updateAppointment = async (id: number, AppointmentData: Appointment) => {
    try {
        const response = await api.put(`Appointment/${id}`, AppointmentData);
        return response;
    } catch (error) {
        console.error("Error updating Appointment:", error);
        throw error;
    }
};

export const deleteAppointment = async (id: number) => {
    try {
        const response = await api.delete(`Appointment/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting Appointment:", error);
        throw error;
    }
};

export const getAppointmentByClienteId = async (clienteId: number) => {
    try {
        const response = await api.get(`Appointment/cliente/${clienteId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Appointment with cliente:", error);
        throw error;
    }
};
