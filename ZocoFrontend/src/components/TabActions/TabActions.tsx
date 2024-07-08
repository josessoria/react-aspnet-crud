// TabActions.tsx
import { useContext } from "react";

import { UserContext, UserContextType } from "../../context/UserProvider";
import ModalCrearProducto from "./ModalCrearProducto";
import ModalCrearCategoria from "./ModalCrearCategoria"; // Importa el nuevo componente ModalCrearCategoria
import axion from "../../api/axios";
import toast from "react-hot-toast";
import "./TabActions.scss";

const TabActions = ({
  isOpenProducto,
  onOpenProducto,
  onCloseProducto,
  isOpenCategoria,
  onOpenCategoria,
  onCloseCategoria,
}: {
  isOpenProducto: boolean;
  onOpenProducto: () => void;
  onCloseProducto: () => void;
  isOpenCategoria: boolean;
  onOpenCategoria: () => void;
  onCloseCategoria: () => void;
}) => {
  const { user, setUser }: UserContextType = useContext(UserContext);

  const handleAdmin = async () => {
    try {
      const response = await axion.patch("api/Users/current/role/admin");
      const updatedUser = response.data;
      setUser(updatedUser);
      toast.success("Ahora eres administrador");
    } catch (error) {
      console.error("Error al convertirse en administrador:", error);
    }
  };

  const handleDefault = async () => {
    try {
      const response = await axion.patch("api/Users/current/role/user");
      const updatedUser = response.data;
      setUser(updatedUser);
      toast.success("Ahora eres un usuario sin privilegios");
    } catch (error) {
      console.error("Error al convertirse en usuario sin privilegios:", error);
    }
  };

  return (
    <div className="navchica w-full flex flex-wrap z-10 gap-5 py-[10px] bg-[#0F2A3D] justify-center fixed border-b-1 px-5">
      <span
        className="text-white font-[500] cursor-pointer hover:text-[#C5CF2F] w-[130px] text-center "
        onClick={onOpenProducto}
      >
        Crear producto
      </span>

      <span
        className="text-white font-[500] cursor-pointer  text-center  w-[130px] hover:text-[#C5CF2F]"
        onClick={handleAdmin}
      >
        Ser admin
      </span>

      <span
        className="text-white font-[500] cursor-pointer text-center   w-[130px] hover:text-[#C5CF2F]"
        onClick={handleDefault}
      >
        Ser usuario
      </span>

      {user?.role === "admin" && (
        <span
          className="text-white font-[500] cursor-pointer  text-center  w-[130px] hover:text-[#C5CF2F]"
          onClick={onOpenCategoria}
        >
          Crear Categoría
        </span>
      )}
      <ModalCrearProducto isOpen={isOpenProducto} onClose={onCloseProducto} />
      <ModalCrearCategoria
        isOpen={isOpenCategoria}
        onClose={onCloseCategoria}
      />
    </div>
  );
};

export default TabActions;
