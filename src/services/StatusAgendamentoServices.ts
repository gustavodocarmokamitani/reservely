import api from '../axiosInstance';
import { StatusAgendamento } from '../models/StatusAgendamento';

// Função para obter todos os tipos de agendamento
export const getStatusAgendamento = async () => {
    try {
        const response = await api.get('statusAgendamento');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter tipos de agendamento:", error);
        throw error;
    }
};

// Função para obter um tipo de agendamento específico pelo ID
export const getStatusAgendamentoById = async (id: number) => {
    try {
        const response = await api.get(`statusAgendamento/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter o tipo de agendamento:", error);
        throw error;
    }
};

// Função para criar um novo tipo de agendamento
export const createStatusAgendamento = async (statusAgendamentoData: StatusAgendamento) => {
    try {
        const response = await api.post('statusAgendamento', statusAgendamentoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar tipo de agendamento:", error);
        throw error;
    }
};

// Função para atualizar um tipo de agendamento existente
export const updateStatusAgendamento = async (id: number, statusAgendamentoData: StatusAgendamento) => {
    try {
        const response = await api.put(`statusAgendamento/${id}`, statusAgendamentoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar tipo de agendamento:", error);
        throw error;
    }
};

// Função para excluir um tipo de agendamento
export const deleteStatusAgendamento = async (id: number) => {
    try {
        const response = await api.delete(`statusAgendamento/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir tipo de agendamento:", error);
        throw error;
    }
};
