import api from '../axiosInstance';
import { MetodoPagamento } from '../models/MetodoPagamento';

// Função para obter todos os métodos de pagamento
export const getMetodosPagamento = async () => {
    try {
        const response = await api.get('MetodoPagamento');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter métodos de pagamento:", error);
        throw error;
    }
};

// Função para obter um método de pagamento específico pelo ID
export const getMetodoPagamentoById = async (id: number) => {
    try {
        const response = await api.get(`MetodoPagamento/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter o método de pagamento:", error);
        throw error;
    }
};

// Função para criar um novo método de pagamento
export const createMetodoPagamento = async (metodoData: MetodoPagamento) => {
    try {
        const response = await api.post('MetodoPagamento', metodoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar método de pagamento:", error);
        throw error;
    }
};

// Função para atualizar um método de pagamento existente
export const updateMetodoPagamento = async (id: number, metodoData: MetodoPagamento) => {
    try {
        const response = await api.put(`MetodoPagamento/${id}`, metodoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar método de pagamento:", error);
        throw error;
    }
};

// Função para excluir um método de pagamento
export const deleteMetodoPagamento = async (id: number) => {
    try {
        const response = await api.delete(`MetodoPagamento/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir método de pagamento:", error);
        throw error;
    }
};
