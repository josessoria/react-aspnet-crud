import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "../../api/axios";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValidToken, setIsValidToken] = React.useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Endpoint para validar el token en tu backend
          await axios.get("/api/token/validate");
          setIsValidToken(true);
        } catch (error) {
          setIsValidToken(false);
        }
      } else {
        setIsValidToken(false);
      }
    };

    validateToken();
  }, []);

  if (isValidToken === null) {
    return <></>;
  }

  if (!isValidToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
