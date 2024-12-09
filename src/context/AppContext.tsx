import React, { createContext, useState, ReactNode } from "react";
import { UsuarioFuncionarioUpdate } from "../models/UsuarioFuncionario";
import { TipoServico } from "../models/TipoServico";

// Definindo as interfaces para as entidades
export interface Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  senha: string;
  tipoUsuarioId: number;
}

export interface Funcionario {
  id: number;
  usuarioId: number;
  ativo: string;
  servicosId: number[];
}

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

// Definindo o tipo do contexto, incluindo todos os dados
interface AppContextType {
  usuarioContext: Usuario | null;
  setUsuarioContext: React.Dispatch<React.SetStateAction<Usuario | null>>;
  funcionarioContext: Funcionario | null;
  setFuncionarioContext: React.Dispatch<React.SetStateAction<Funcionario | null>>;
  usuarioFuncionarioContext: UsuarioFuncionario | null;
  setUsuarioFuncionarioContext: React.Dispatch<React.SetStateAction<UsuarioFuncionario | null>>;
  usuarioFuncionarioUpdateContext: UsuarioFuncionarioUpdate | null;
  setUsuarioFuncionarioUpdateContext: React.Dispatch<React.SetStateAction<UsuarioFuncionarioUpdate | null>>;
  servicoContext: TipoServico | null;
  setServicoContext: React.Dispatch<React.SetStateAction<TipoServico | null>>;
  servicoUpdateContext: TipoServico | null;
  setServicoUpdateContext: React.Dispatch<React.SetStateAction<TipoServico | null>>;
}

// Criando o contexto
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Criando o provider que envolvem os componentes que precisam acessar o contexto
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [usuarioContext, setUsuarioContext] = useState<Usuario | null>(null);
  const [funcionarioContext, setFuncionarioContext] = useState<Funcionario | null>(null);
  const [usuarioFuncionarioContext, setUsuarioFuncionarioContext] = useState<UsuarioFuncionario | null>(null);
  const [usuarioFuncionarioUpdateContext, setUsuarioFuncionarioUpdateContext] = useState<UsuarioFuncionarioUpdate | null>(null);
  const [servicoContext, setServicoContext] = useState<TipoServico | null>(null);
  const [servicoUpdateContext, setServicoUpdateContext] = useState<TipoServico | null>(null);

  return (
    <AppContext.Provider value={{ 
      usuarioContext, 
      setUsuarioContext,
       funcionarioContext,
       setFuncionarioContext,
       usuarioFuncionarioContext,
       setUsuarioFuncionarioContext,
       usuarioFuncionarioUpdateContext,
       setUsuarioFuncionarioUpdateContext,
       servicoContext,
       setServicoContext,
       servicoUpdateContext,
       setServicoUpdateContext,
       }}>
      {children}
    </AppContext.Provider>
  );
};
