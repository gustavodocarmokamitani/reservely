// src/services/tipoServicoService.js
import api from '../axiosInstance';
import { TipoServico } from '../models/TipoServico';

// Função para obter todos os tipos de serviço
export const getTipoServico = async () => {
    try {
        const response = await api.get('tipoServico');
        return response;
    } catch (error) {
        console.error("Erro ao obter tipos de serviço:", error);
        throw error;
    }
};

// Função para obter um tipo de serviço específico pelo ID
export const getTipoServicoById = async (id: number) => {
    if (!id) return;
    try {
        const response = await api.get(`tipoServico/${id}`);
        return response;
    } catch (error) {
        console.error("Erro ao obter o tipo de serviço:", error);
        throw error;
    }
};
// Função para obter um tipo de serviço específico pelo ID
export const getTipoServicoByIdData = async (id: number) => {
    if (!id) return;
    try {
        const response = await api.get(`tipoServico/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter o tipo de serviço:", error);
        throw error;
    }
};

// Função para criar um novo tipo de serviço
export const createTipoServico = async (tipoServicoData: TipoServico[]) => {
    try {
        const response = await api.post('tipoServico', tipoServicoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar tipo de serviço:", error);
        throw error;
    }
};

// Função para atualizar um tipo de serviço existente
export const updateTipoServico = async (id: number, tipoServicoData: TipoServico) => {
    try {
        const response = await api.put(`tipoServico/${id}`, tipoServicoData);
        return response;
    } catch (error) {
        console.error("Erro ao atualizar tipo de serviço:", error);
        throw error;
    }
};

// Função para excluir um tipo de serviço
    export const deleteTipoServico = async (id: number) => {
        try {
            const response = await api.delete(`tipoServico/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao excluir tipo de serviço:", error);
            throw error;
        }
};

// Função para criar serviços por lojaId
export const createTipoServicoByLojaId = async (lojaId:number, tipoServicoData: TipoServico[]) => {
    if (!lojaId || !tipoServicoData) {
        console.error("LojaId e dados do serviço são obrigatórios");
        return;
    }
    try {
        const response = await api.post(`tipoServico/api/tiposservico/${lojaId}`, tipoServicoData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao criar tipos de serviço para a lojaId ${lojaId}:`, error);
        throw error;
    }
};
