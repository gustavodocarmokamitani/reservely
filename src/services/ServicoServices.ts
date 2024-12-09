// src/services/servicoService.js
import api from '../axiosInstance';
import { Servico } from '../models/Servico';

// Função para obter todos os serviços
export const getServicos = async () => {
    try {
        const response = await api.get('servico');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter serviços:", error);
        throw error;
    }
};

// Função para obter um serviço específico pelo ID
export const getServicoById = async (id: number) => {
    try {
        const response = await api.get(`servico/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter o serviço:", error);
        throw error;
    }
};

// Função para criar um novo serviço
export const createServico = async (servicoData: Servico) => {
    try {
        const response = await api.post('servico', servicoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar serviço:", error);
        throw error;
    }
};

// Função para atualizar um serviço existente
export const updateServico = async (id: number, servicoData: Servico) => {
    try {
        const response = await api.put(`servico/${id}`, servicoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar serviço:", error);
        throw error;
    }
};

// Função para excluir um serviço
export const deleteServico = async (id: number) => {
    try {
        const response = await api.delete(`servico/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir serviço:", error);
        throw error;
    }
};
