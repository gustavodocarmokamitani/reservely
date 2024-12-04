// src/services/funcionarioService.js
import api from '../axiosInstance';
import { Funcionario } from '../models/Funcionario';
import { UsuarioFuncionario, UsuarioFuncionarioUpdate } from '../models/UsuarioFuncionario';
import axios from 'axios';


// Função para obter todos os funcionários
export const getFuncionarios = async () => {
    try {
        const response = await api.get('funcionario');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter funcionários:", error);
        throw error;
    }
};

// Função para obter um funcionário específico pelo ID
export const getFuncionarioById = async (id: number) => {
    try {
        const response = await api.get(`funcionario/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter o funcionário:", error);
        throw error;
    }
};

// Função para obter codigo do funcionario pelo codigo do usuario
export const getFuncionarioIdByUsuarioId = async (id: number) => {
    try {
        const response = await api.get(`Funcionario/usuario/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Erro na requisição:", error.response?.data || error.message);
        } else {
            console.error("Erro desconhecido:", error);
        }
        throw error;
    }
};

// Função para criar um novo funcionário
export const createFuncionario = async (funcionarioData: Funcionario) => {
    try {
        const response = await api.post('funcionario', funcionarioData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar funcionário:", error);
        throw error;
    }
};
// Função para criar um novo funcionário e usuário
export const createFuncionarioUsuario = async (funcionarioUsuarioData: UsuarioFuncionario) => {
    try {
        const response = await api.post('funcionario/criarUsuarioFuncionario', funcionarioUsuarioData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar funcionário:", error);
        throw error;
    }
};

// Função para atualizar um funcionário existente
export const updateFuncionario = async (id: number, funcionarioData: Funcionario) => {
    try {
        const response = await api.put(`funcionario/${id}`, funcionarioData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar funcionário:", error);
        throw error;
    }
};

// Função para excluir um funcionário
export const deleteFuncionario = async (id: number) => {
    try {
        const response = await api.delete(`funcionario/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
        throw error;
    }
};

// Função para atualizar Usuário e Funcionario
export const updateUsuarioFuncionario = async (
    id: number,
    funcionarioData: UsuarioFuncionarioUpdate
  ) => {
    try {
      const response = await api.put(`funcionario/updateUsuarioFuncionario/${id}`, funcionarioData);
      return response; // Retorne a resposta da requisição
    } catch (error) {
      console.error("Erro ao atualizar Usuário e Funcionario: ", error);
      throw error; // Propague o erro para ser tratado na função chamadora
    }
  };
  