import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "../../api/axios";
import { UserContext, UserContextType } from "../../context/UserProvider";

const UserMiddleware = () => {
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
          localStorage.removeItem("token");
        }
      } else {
      }
    };

    validateToken();
  }, []);

  return <Outlet />;
};

export default UserMiddleware;
