import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import {
  ProductContext,
  ProductContextType,
} from "../../context/ProductContext";
import { UserContext, UserContextType } from "../../context/UserProvider";
import EditProductModal from "./EditProductModal";
import ProductList from "./ProductList";
import { Product } from "./Product"; // Import the Product type
import { useDisclosure } from "@nextui-org/react";

const initialProductState: Product = {
  id: 1,
  name: "",
  categoryId: 1,
  price: 1,
  description: "",
};

const Products: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentProduct, setCurrentProduct] =
    useState<Product>(initialProductState);

  const { products, setProducts, updateProduct }: ProductContextType =
    useContext(ProductContext);

  const { user }: UserContextType = useContext(UserContext);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/api/Products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [setProducts]);

  const handleEditProduct = (productId: number) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (selectedProduct) {
      setCurrentProduct(selectedProduct);
      onOpen();
    } else {
      console.log(`No se encontró ningún producto con el id ${productId}`);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/api/Products/${currentProduct.id}`, currentProduct);
      updateProduct(currentProduct.id, currentProduct);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`/api/Products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCurrentProduct((prevData: Product) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(currentProduct);
  };

  const isAdmin = user && user.role === "admin";

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.categoryId]) {
      acc[product.categoryId] = [];
    }
    acc[product.categoryId].push(product);
    return acc;
  }, {} as Record<number, Product[]>);

  return (
    <>
      <ProductList
        groupedProducts={groupedProducts}
        isAdmin={isAdmin || false}
        onEdit={handleEditProduct}
        onDelete={handleDelete}
      />

      <EditProductModal
        isOpen={isOpen}
        onClose={onClose}
        product={currentProduct}
        onChange={handleChange}
        onSave={handleEdit}
      />
    </>
  );
};

export default Products;
