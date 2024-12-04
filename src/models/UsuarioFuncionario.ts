// src/models/Profissional.ts
export interface UsuarioFuncionario {
  id: number;
  usuarioId: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  ativo: string;
  servicosId: number[];
  senha: string;
  tipoUsuarioId: number;
}
