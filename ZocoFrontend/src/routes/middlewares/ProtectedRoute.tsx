import React, { useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "../../api/axios";
import { UserContext, UserContextType } from "../../context/UserProvider";

const ProtectedRoute = () => {
  const [isValidToken, setIsValidToken] = React.useState<boolean | null>(null);

  const { user, setUser }: UserContextType = useContext(UserContext);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Endpoint para validar el token en tu backend
          const userinfo = await axios.get("/api/Users/current");

          setUser(userinfo.data);
     
        } catch (error) {
          setIsValidToken(false);
          localStorage.removeItem("token");
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

  return <Outlet />;
};

export default ProtectedRoute;
