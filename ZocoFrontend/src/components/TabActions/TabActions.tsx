import React, { useContext, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";
import {
  ProductContext,
  ProductContextType,
} from "../../context/ProductContext";
import axion from "../../api/axios";
import { Select, SelectItem } from "@nextui-org/react";
import { UserContext, UserContextType } from "../../context/UserProvider";

const TabActions = () => {
  const { user, setUser }: UserContextType = useContext(UserContext);
  const [productData, setProductData] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0, // Aquí price ya es de tipo number
    categoryId: 1,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    product,
    setProduct,
    deleteProduct,
    updateProduct,
    addProduct,
    products,
    setProducts,
  }: ProductContextType = useContext(ProductContext);

  const handleOpen = () => {
    onOpen();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(productData);
  };

  const handleAdmin = async () => {
    // Usa async para manejar llamadas asíncronas
    try {
      const response = await axion.patch("api/Users/current/role/admin"); // Espera a que la promesa se resuelva
      const updatedUser = response.data; // Obtén los datos del usuario actualizados de la respuesta
      setUser(updatedUser); // Actualiza el estado con el usuario actualizado
    } catch (error) {
      console.log(error);
    }
  };

  const handleDefaul = async () => {
    // Usa async para manejar llamadas asíncronas
    try {
      const response = await axion.patch("api/Users/current/role/user"); // Espera a que la promesa se resuelva
      const updatedUser = response.data; // Obtén los datos del usuario actualizados de la respuesta
      setUser(updatedUser); // Actualiza el estado con el usuario actualizado
    } catch (error) {
      console.log(error);
    }
  };



  const handleSubmit = () => {
    try {
      addProduct(productData);
      axion.post("/api/Products", productData);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full  flex justify-start gap-5 mt-[20px] px-5 ">
      <Button className=" bg-[#B3C300] " onPress={() => handleOpen()}>
        <span className=" text-white font-[500] "> Crear producto</span>
      </Button>
      <Button className=" bg-[#1d3fff] " onPress={() => handleAdmin()}>
        <span className=" text-white font-[500] "> Ser admin</span>
      </Button>
      <Button className=" bg-[#9e9e9e] " onPress={() => handleDefaul()}>
        <span className=" text-white font-[500] "> Ser usuario</span>
      </Button>

      <Modal size="md" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Producto
              </ModalHeader>
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
                  label="Categoria"
                  placeholder="Selecciona la categoria"
                  name="categoryId"
                  variant="bordered"
                  value={productData.categoryId}
                  onChange={handleChange}
                  defaultSelectedKeys={["1"]}
                  size="sm"
                  labelPlacement="outside"
                >
                  <SelectItem key={1}>Electronica</SelectItem>
                  <SelectItem key={2}>Salud</SelectItem>
                  <SelectItem key={3}>Construccion</SelectItem>
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
                  label="Descripcion"
                  placeholder="descripcion del producto"
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
                <Button className=" bg-[#B3C300] " onPress={handleSubmit}>
                  <span className=" text-white font-[500]">Crear</span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TabActions;
