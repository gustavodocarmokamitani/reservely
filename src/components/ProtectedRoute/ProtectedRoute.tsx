import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { decodeToken } from "../../services/AuthService";
import { DecodedToken } from "../../models/DecodedToken";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiresSubscription?: boolean;
}

export const ProtectedRoute = ({
  children,
  requiresSubscription = false,
}: ProtectedRouteProps) => {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  const context = useContext(AppContext);

  useEffect(() => {
    const fetchDecodedToken = async () => {
      if (context?.authToken) {
        try {
          const decoded = await decodeToken(context.authToken);
          setDecodedToken(decoded);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      }
    };
    fetchDecodedToken();
  }, [context?.authToken]);

  if (context?.isLoading || !context) {
    return null;
  }

  if (!context?.authToken) {
    return <Navigate to="/login" />;
  }

  const restrictedPathsForEmployee = ["/dashboard", "/subscription", "/professional/register"];
  const currentPath = location.pathname; // Pega o caminho atual

  if (decodedToken?.userRole === "Employee") {
    if (restrictedPathsForEmployee.includes(currentPath)) { 
      return <Navigate to="/calendar" />;
    } else {
      return children;
    }
    // Se for Employee, mas a rota não for restrita, permite o acesso (cai no return children)
  }

  if (requiresSubscription && decodedToken?.isSubscriptionActive !== "True") {
    return <Navigate to="/subscription" />;
  }

  return children;
};
