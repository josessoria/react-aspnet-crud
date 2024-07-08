// ModalCrearCategoria.tsx
import React, { useContext, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import axion from "../../api/axios";
import toast from "react-hot-toast";
import {
  CategoryContext,
  CategoryContextType,
} from "../../context/CategoryContext";

const ModalCrearCategoria = ({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) => {
  const [categoryName, setCategoryName] = useState("");
  const { addCategory }: CategoryContextType = useContext(CategoryContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axion.post("/api/Category", {
        name: categoryName,
      });
      addCategory(response.data);
      toast.success("Categoría creada exitosamente");
      onClose();
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Crear Categoría</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            label="Nombre"
            placeholder="Nombre de la categoría"
            variant="bordered"
            size="sm"
            value={categoryName}
            onChange={handleChange}
            labelPlacement="outside"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
          <Button className="bg-[#B3C300]" onPress={handleSubmit}>
            <span className="text-white font-[500]">Crear</span>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCrearCategoria;
