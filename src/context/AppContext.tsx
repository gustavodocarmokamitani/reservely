import React, { createContext, useState, ReactNode } from "react";
import { UserEmployeeUpdate } from "../models/UserEmployee";
import { ServiceType } from "../models/ServiceType";
import { Appointment } from "../models/Appointment";

// Definindo as interfaces para as entidades
export interface User {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  senha: string;
  tipoUsuarioId: number;
}

export interface Employee {
  id: number;
  usuarioId: number;
  ativo: string;
  servicosId: number[];
}

export interface UserEmployee {
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
  userContext: User | null;
  setUserContext: React.Dispatch<React.SetStateAction<User | null>>;
  employeeContext: Employee | null;
  setEmployeeContext: React.Dispatch<React.SetStateAction<Employee | null>>;
  userEmployeeContext: UserEmployee | null;
  setUserEmployeeContext: React.Dispatch<React.SetStateAction<UserEmployee | null>>;
  userEmployeeUpdateContext: UserEmployeeUpdate | null;
  setUserEmployeeUpdateContext: React.Dispatch<React.SetStateAction<UserEmployeeUpdate | null>>;
  serviceContext: ServiceType | null;
  setServiceContext: React.Dispatch<React.SetStateAction<ServiceType | null>>;
  serviceUpdateContext: ServiceType | null;
  setServiceUpdateContext: React.Dispatch<React.SetStateAction<ServiceType | null>>;
  appointmentUpdateContext: Appointment | null;
  setAppointmentUpdateContext: React.Dispatch<React.SetStateAction<Appointment | null>>;
  ServiceTypeContext: ServiceType | null;
  setServiceTypeContext: React.Dispatch<React.SetStateAction<ServiceType | null>>;
}

// Criando o contexto
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Criando o provider que envolvem os componentes que precisam acessar o contexto
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userContext, setUserContext] = useState<User | null>(null);
  const [employeeContext, setEmployeeContext] = useState<Employee | null>(null);
  const [userEmployeeContext, setUserEmployeeContext] = useState<UserEmployee | null>(null);
  const [userEmployeeUpdateContext, setUserEmployeeUpdateContext] = useState<UserEmployeeUpdate | null>(null);
  const [serviceContext, setServiceContext] = useState<ServiceType | null>(null);
  const [serviceUpdateContext, setServiceUpdateContext] = useState<ServiceType | null>(null);
  const [appointmentUpdateContext, setAppointmentUpdateContext] = useState<Appointment | null>(null);
  const [ServiceTypeContext, setServiceTypeContext] = useState<ServiceType | null>(null);

  return (
    <AppContext.Provider value={{ 
      userContext, 
      setUserContext,
       employeeContext,
       setEmployeeContext,
       userEmployeeContext,
       setUserEmployeeContext,
       userEmployeeUpdateContext,
       setUserEmployeeUpdateContext,
       serviceContext,
       setServiceContext,
       serviceUpdateContext,
       setServiceUpdateContext,
       appointmentUpdateContext,
       setAppointmentUpdateContext,
       ServiceTypeContext,
       setServiceTypeContext
       }}>
      {children}
    </AppContext.Provider>
  );
};
