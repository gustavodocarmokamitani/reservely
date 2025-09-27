import React, { createContext, useState, ReactNode, useEffect } from "react";
import { DecodedToken } from "../models/DecodedToken";
import { decodeToken } from "../services/AuthService";

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

interface AppContextType {
  userContext: User | null;
  setUserContext: React.Dispatch<React.SetStateAction<User | null>>;
  employeeContext: Employee | null;
  setEmployeeContext: React.Dispatch<React.SetStateAction<Employee | null>>;
  userEmployeeContext: UserEmployee | null;
  setUserEmployeeContext: React.Dispatch<
    React.SetStateAction<UserEmployee | null>
  >;
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (token: string) => void;
  logout: () => void;
  decodedToken: DecodedToken | null;
  isLoading: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userContext, setUserContext] = useState<User | null>(null);
  const [employeeContext, setEmployeeContext] = useState<Employee | null>(null);
  const [userEmployeeContext, setUserEmployeeContext] =
    useState<UserEmployee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );

  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  const login = (token: string) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setAuthToken(null);
    setDecodedToken(null);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("authToken");

    const initializeAuth = async () => {
      if (tokenFromStorage) {
        setAuthToken(tokenFromStorage);  
        try {
          const decoded = await decodeToken(tokenFromStorage);
          setDecodedToken(decoded !== null ? decoded : null);
        } catch { 
          setAuthToken(null);
          localStorage.removeItem("authToken");
          setDecodedToken(null);
        }
      }
      setIsLoading(false); // 🚨 Define como FALSE após toda a inicialização
    };

    initializeAuth();
  }, []);  
 
  useEffect(() => { 
    if (authToken && isLoading) { 
      (async () => {
        try {
          const decoded = await decodeToken(authToken);
          setDecodedToken(decoded !== null ? decoded : null);
        } catch {
          setDecodedToken(null);
        }
      })();
    } else if (!authToken) {
      setDecodedToken(null);
    }
  }, [authToken, isLoading]);

  return (
    <AppContext.Provider
      value={{
        userContext,
        setUserContext,
        employeeContext,
        setEmployeeContext,
        userEmployeeContext,
        setUserEmployeeContext,
        authToken,
        setAuthToken,
        login,
        logout,
        decodedToken,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
