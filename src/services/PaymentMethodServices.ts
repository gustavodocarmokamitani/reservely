import api from '../axiosInstance';
import { PaymentMethod } from '../models/PaymentMethod';

export const getPaymentMethod = async () => {
    try {
        const response = await api.get('paymentMethod');
        return response.data;
    } catch (error) {
        console.error("Error getting payment methods:", error);
        throw error;
    }
};

export const getPaymentMethodById = async (id: number) => {
    try {
        const response = await api.get(`paymentMethod/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting payment method by ID:", error);
        throw error;
    }
};

export const createPaymentMethod = async (paymentMethodData: PaymentMethod) => {
    try {
        const response = await api.post('paymentMethod', paymentMethodData);
        return response.data;
    } catch (error) {
        console.error("Error creating payment method:", error);
        throw error;
    }
};

export const updatePaymentMethod = async (id: number, paymentMethodData: PaymentMethod) => {
    try {
        const response = await api.put(`paymentMethod/${id}`, paymentMethodData);
        return response.data;
    } catch (error) {
        console.error("Error updating payment method:", error);
        throw error;
    }
};

export const deletePaymentMethod = async (id: number) => {
    try {
        const response = await api.delete(`paymentMethod/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting payment method:", error);
        throw error;
    }
};
