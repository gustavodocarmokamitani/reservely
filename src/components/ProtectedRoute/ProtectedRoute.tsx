import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiresSubscription?: boolean;
}

export const ProtectedRoute = ({
  children,
  requiresSubscription = false,
}: ProtectedRouteProps) => {
  const context = useContext(AppContext);

  // Verifica se o usuário está autenticado
  if (!context?.authToken) {
    return <Navigate to="/login" />;
  }

  // Se a rota exige uma assinatura, verifica o status do plano
  if (
    requiresSubscription &&
    context?.decodedToken?.isSubscriptionActive !== "True"
  ) {
    return <Navigate to="/subscription" />;
  }

  return children;
};
