import React, { createContext, useState, ReactNode, useContext } from "react";

interface Product {
  name: string;
  description: string;
  id: number;
  price: number;
  categoryId: number;
}

export interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  product: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  addProduct: (newProduct: Product) => void;
  updateProduct: (id: number, updatedProduct: Product) => void;
  deleteProduct: (id: number) => void;
}

const initialProductContext: ProductContextType = {
  products: [],
  setProducts: () => {},
  product: null,
  setProduct: () => {},
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
};

export const ProductContext = createContext<ProductContextType>(
  initialProductContext
);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, updatedProduct: Product) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? updatedProduct : p
    );
    setProducts(updatedProducts);
  };

  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

export default ProductProvider;
