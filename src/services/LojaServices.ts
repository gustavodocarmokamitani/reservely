// src/services/LojaService.ts
import api from '../axiosInstance';
import { Loja } from "../models/Loja";

// Função para obter todas as lojas
export const getLojas = async () => {
    try {
        const response = await api.get('loja');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter as lojas:", error);
        throw error;
    }
};

// Função para obter uma loja específica pelo ID
export const getLojaById = async (id: number) => {
    try {
        const response = await api.get(`loja/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter a loja:", error);
        throw error;
    }
};

// Função para criar uma nova loja
export const createLoja = async (lojaData: Loja) => {
    try {
        const response = await api.post('loja', lojaData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar a loja:", error);
        throw error;
    }
};

// Função para atualizar uma loja existente
export const updateLoja = async (id: number, lojaData: Loja) => {
    try {
        const response = await api.put(`loja/${id}`, lojaData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar a loja:", error);
        throw error;
    }
};

// Função para excluir uma loja pelo ID
export const deleteLoja = async (id: number) => {
    try {
        const response = await api.delete(`loja/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir a loja:", error);
        throw error;
    }
};

// Função para obter lojas associadas a um cliente específico
export const getLojasByClienteId = async (clienteId: number) => {
    try {
        const response = await api.get(`loja/cliente/${clienteId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter loja pelo cliente:", error);
        throw error;
    }
};
