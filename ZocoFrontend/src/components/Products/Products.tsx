import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import ProductProvider, {
  ProductContext,
  ProductContextType,
} from "../../context/ProductContext";
import axios from "../../api/axios";
import zocologo from "../../assets/image/zocologo.jpg";
import { MdModeEdit } from "react-icons/md";
import { UserContext, UserContextType } from "../../context/UserProvider";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import { Input, Textarea } from "@nextui-org/react";

const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };
  const {
    product,
    setProduct,
    deleteProduct,
    updateProduct,
    addProduct,
    products,
    setProducts,
  }: ProductContextType = useContext(ProductContext);

  const { user }: UserContextType = useContext(UserContext);

  const handleEditProduct = (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (selectedProduct) {
      // Hacer algo con el producto seleccionado, por ejemplo, abrir un modal con sus detalles
      console.log("Producto seleccionado:", selectedProduct);
      // Aquí puedes abrir un modal o realizar alguna acción adicional
    } else {
      console.log(`No se encontró ningún producto con el id ${productId}`);
    }

    
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await axios.get("/api/Products");

        setProducts(products.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  const isAdmin = user && user.role === "admin";
  return (
    <>
      <div className="flex flex-wrap gap-[20px] w-full justify-center px-5   ">
        {products.map((item, index) => (
          <div
            className="cartitaproduct shadow-lg rounded-xl p-1 flex flex-col w-[250px] "
            key={index}
          >
            <div className="image rounded-xl relative ">
              <img
                src={zocologo}
                className="w-full object-cover rounded-tl-xl  rounded-tr-xl"
                alt=""
              />
              {isAdmin && (
                <MdModeEdit
                  className="absolute text-white top-[15px] text-[25px] right-[15px] cursor-pointer"
                  onClick={() => handleEditProduct(item.id)}
                />
              )}
            </div>
            <div className="bottomcard flex flex-col  ">
              <div className="colrower flex flex-col w-full justify-between p-1 ">
                <span className=" font-[500] text-[18px]  ">{item.name}</span>

                <span className=" font-[400] text-[15px] w-full ">
                  {item.description}
                </span>
                <span className="font-[500] text-[25px]  ">${item.price} </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal size="md" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Producto
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cerrar
                </Button>
                <Button className=" bg-[#B3C300] ">
                  <span className=" text-white font-[500]">Crear</span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Products;
