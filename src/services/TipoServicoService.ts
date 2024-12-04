// src/services/tipoServicoService.js
import api from '../axiosInstance';
import { TipoServico } from '../models/TipoServico';

// Função para obter todos os tipoServicos
export const getTipoServicos = async () => {
    try {
        const response = await api.get('tipoServico');
        
        return response.data;
    } catch (error) {
        console.error("Erro ao obter tipoServicos:", error);
        throw error;
    }
};

// Função para obter um tipoServico específico pelo ID
export const getTipoServicoById = async (id: number) => {
    try {
        const response = await api.get(`tipoServico/${id}`);
        return response;
    } catch (error) {
        console.error("Erro ao obter o tipoServico:", error);
        throw error;
    }
};

// Função para criar um novo tipoServico
export const createTipoServico = async (tipoServicoData: TipoServico) => {
    try {
        const response = await api.post('tipoServico', tipoServicoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar tipoServico:", error);
        throw error;
    }
};

// Função para atualizar um tipoServico existente
export const updateTipoServico = async (id: number, tipoServicoData: TipoServico) => {
    try {
        const response = await api.put(`tipoServico/${id}`, tipoServicoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar tipoServico:", error);
        throw error;
    }
};

// Função para excluir um tipoServico
export const deleteTipoServico = async (id: number) => {
    try {
        const response = await api.delete(`tipoServico/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir tipoServico:", error);
        throw error;
    }
};
