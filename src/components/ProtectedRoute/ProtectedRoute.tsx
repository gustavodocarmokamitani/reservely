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

  if (context?.isLoading || !context) {
    return null;
  }

  if (!context?.authToken) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchDecodedToken = async () => {
      if (context.authToken) {
        try {
          const decoded = await decodeToken(context.authToken);
          setDecodedToken(decoded);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      }
    };
    fetchDecodedToken();
  }, [context.authToken]);

  if (requiresSubscription && decodedToken?.isSubscriptionActive !== "True") {
    return <Navigate to="/subscription" />;
  }

  return children;
};
