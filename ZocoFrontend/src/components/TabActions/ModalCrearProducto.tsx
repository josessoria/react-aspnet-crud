import React, { useState, useContext, useEffect } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import {
  ProductContext,
  ProductContextType,
} from "../../context/ProductContext";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import { useCategoryContext } from "../../context/CategoryContext";

interface Category {
  id: number;
  name: string;
}

const ModalCrearProducto = ({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) => {
  const { addProduct }: ProductContextType = useContext(ProductContext);
  const [productData, setProductData] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    categoryId: 1,
  });
  const { categories }: any = useCategoryContext();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/Products", productData); // Enviar datos al backend para crear el producto
      addProduct(productData); // Agregar producto al contexto local
      toast.success("Producto creado exitosamente");
      onClose();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Crear Producto</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            label="Nombre"
            placeholder="Nombre del producto"
            variant="bordered"
            size="sm"
            name="name"
            value={productData.name}
            onChange={handleChange}
            labelPlacement="outside"
          />
          <Select
            label="Categoría"
            placeholder="Selecciona la categoría"
            name="categoryId"
            variant="bordered"
            value={productData.categoryId}
            onChange={handleChange}
            size="sm"
            labelPlacement="outside"
          >
            {categories.map((category: Category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            type="number"
            label="Precio"
            placeholder="Precio del producto"
            variant="bordered"
            size="sm"
            name="price"
            value={productData.price.toString()}
            onChange={handleChange}
            labelPlacement="outside"
          />
          <Textarea
            type="text"
            label="Descripción"
            placeholder="Descripción del producto"
            variant="bordered"
            size="sm"
            name="description"
            value={productData.description}
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

export default ModalCrearProducto;
