// TabActions.tsx
import React, { useContext, useState } from "react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import { UserContext, UserContextType } from "../../context/UserProvider";
import ModalCrearProducto from "./ModalCrearProducto";
import ModalCrearCategoria from "./ModalCrearCategoria"; // Importa el nuevo componente ModalCrearCategoria
import axion from "../../api/axios";
import toast from "react-hot-toast";

const TabActions = () => {
  const { user, setUser }: UserContextType = useContext(UserContext);

  // Estados para manejar los modales
  const {
    isOpen: isOpenProducto,
    onOpen: onOpenProducto,
    onClose: onCloseProducto,
  } = useDisclosure();
  const {
    isOpen: isOpenCategoria,
    onOpen: onOpenCategoria,
    onClose: onCloseCategoria,
  } = useDisclosure();

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
    <div className="w-full flex justify-start gap-5 mt-20 px-5">
      <Button className="bg-[#B3C300]" onPress={onOpenProducto}>
        <span className="text-white font-[500]">Crear producto</span>
      </Button>
      <Button className="bg-[#1d3fff]" onPress={handleAdmin}>
        <span className="text-white font-[500]">Ser admin</span>
      </Button>
      <Button className="bg-[#9e9e9e]" onPress={handleDefault}>
        <span className="text-white font-[500]">Ser usuario</span>
      </Button>
      {user?.role === "admin" && (
        <Button className="bg-[#9e9e9e]" onPress={onOpenCategoria}>
          <span className="text-white font-[500]">Crear Categoría</span>
        </Button>
      )}
      <ModalCrearProducto isOpen={isOpenProducto} onClose={onCloseProducto} />
      <ModalCrearCategoria
        isOpen={isOpenCategoria}
        onClose={onCloseCategoria}
      />{" "}
    </div>
  );
};

export default TabActions;
