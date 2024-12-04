// src/services/usuarioService.js
import api from '../axiosInstance';
import { Usuario } from '../models/Usuario';

// Função para obter todos os usuários
export const getUsuarios = async () => {
    try {
        const response = await api.get('usuario');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter usuários:", error);
        throw error;
    }
};

// Função para obter um usuário específico pelo ID
export const getUsuarioById = async (id: number) => {
    try {
        const response = await api.get(`usuario/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter o usuário:", error);
        throw error;
    }
};

// Função para criar um novo usuário
export const createUsuario = async (usuarioData: Usuario) => {
    try {
        const response = await api.post('usuario', usuarioData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
    }
};

// Função para atualizar um usuário existente
export const updateUsuario = async (id: number, usuarioData: Usuario) => {
    try {
        const response = await api.put(`usuario/${id}`, usuarioData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error;
    }
};

// Função para excluir um usuário
export const deleteUsuario = async (id: number) => {
    try {
        const response = await api.delete(`usuario/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        throw error;
    }
};
