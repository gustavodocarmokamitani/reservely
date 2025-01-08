import React, { createContext, useState, ReactNode, useEffect } from "react";
import { UserEmployeeUpdate } from "../models/UserEmployee";
import { ServiceType } from "../models/ServiceType";
import { Appointment } from "../models/Appointment";

// Interfaces para os dados que serão gerenciados no contexto
export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  userTypeId: number;
  storeId: number;
}

export interface Employee {
  id: number;
  userId: number;
  active: string;
  serviceIds: number[];
}

export interface UserEmployee {
  id: number;
  userId: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  active: string;
  serviceIds: number[];
  password: string;
  userTypeId: number;
  storeId: number;
}

export interface UserRole {
  userId: string;
  userEmail: string;
  userRole: string;
}

// Contexto do aplicativo que contém os estados e as funções
interface AppContextType {
  userRoleContext: UserRole | null;
  setUserRoleContext: React.Dispatch<React.SetStateAction<UserRole | null>>;
  userActiveContext: User | null;
  setUserActiveContext: React.Dispatch<React.SetStateAction<User | null>>;
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
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (token: string) => void;
  logout: () => void;
  postEmployeeRegister: boolean;
  setPostEmployeeRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Estados locais
  const [userRoleContext, setUserRoleContext] = useState<UserRole | null>(null);
  const [userActiveContext, setUserActiveContext] = useState<User | null>(null);
  const [userContext, setUserContext] = useState<User | null>(null);
  const [employeeContext, setEmployeeContext] = useState<Employee | null>(null);
  const [userEmployeeContext, setUserEmployeeContext] = useState<UserEmployee | null>(null);
  const [userEmployeeUpdateContext, setUserEmployeeUpdateContext] = useState<UserEmployeeUpdate | null>(null);
  const [serviceContext, setServiceContext] = useState<ServiceType | null>(null);
  const [serviceUpdateContext, setServiceUpdateContext] = useState<ServiceType | null>(null);
  const [appointmentUpdateContext, setAppointmentUpdateContext] = useState<Appointment | null>(null);
  const [ServiceTypeContext, setServiceTypeContext] = useState<ServiceType | null>(null);
  const [postEmployeeRegister, setPostEmployeeRegister] = useState<boolean>(false);

  // Estado do token de autenticação com persistência via localStorage
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));

  // Função de login, salva o token no contexto e localStorage
  const login = (token: string) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  // Função de logout, remove o token do contexto e localStorage
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  // Efeito para carregar o token do localStorage quando o componente é montado
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('authToken');
    if (tokenFromStorage) {
      setAuthToken(tokenFromStorage);
    }
  }, []);  // Este efeito é executado apenas uma vez, quando o componente é montado

  return (
    <AppContext.Provider
      value={{
        userRoleContext,
        setUserRoleContext,
        userActiveContext,
        setUserActiveContext,
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
        setServiceTypeContext,
        authToken,
        setAuthToken,
        login,
        logout,
        postEmployeeRegister,
        setPostEmployeeRegister
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
