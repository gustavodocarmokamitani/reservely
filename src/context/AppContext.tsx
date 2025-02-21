import React, { createContext, useState, ReactNode, useEffect } from "react";

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

  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );

  const login = (token: string) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("authToken");
    if (tokenFromStorage) {
      setAuthToken(tokenFromStorage);
    }
  }, []);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
