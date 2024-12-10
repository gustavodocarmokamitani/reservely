// src/services/agendamentoService.js
import api from '../axiosInstance';
import { Agendamento } from '../models/Agendamento';

// Função para obter todos os agendamentos
export const getAgendamentos = async () => {
    try {
        const response = await api.get('agendamento');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter agendamentos:", error);
        throw error;
    }
};

// Função para obter um agendamento específico pelo ID
export const getAgendamentoById = async (id: number) => {
    try {
        const response = await api.get(`agendamento/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter o agendamento:", error);
        throw error;
    }
};

// Função para criar um novo agendamento
export const createAgendamento = async (agendamentoData: Agendamento[]) => {
    try {
        const response = await api.post('agendamento', agendamentoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar agendamento:", error);
        throw error;
    }
};

// Função para atualizar um agendamento existente
export const updateAgendamento = async (id: number, agendamentoData: Agendamento) => {
    try {
        const response = await api.put(`agendamento/${id}`, agendamentoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar agendamento:", error);
        throw error;
    }
};

// Função para excluir um agendamento
export const deleteAgendamento = async (id: number) => {
    try {
        const response = await api.delete(`agendamento/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
        throw error;
    }
};

// Função para obter o código do agendamento pelo ID do cliente
export const getAgendamentoByClienteId = async (clienteId: number) => {
    try {
        const response = await api.get(`agendamento/cliente/${clienteId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter agendamento pelo cliente:", error);
        throw error;
    }
};
