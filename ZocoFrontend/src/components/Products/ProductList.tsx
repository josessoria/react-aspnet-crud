import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "./Product"; // Asegúrate de importar el tipo Product
import { useCategoryContext, Category } from "../../context/CategoryContext"; // Importa el contexto de categorías y la interfaz Category

type ProductListProps = {
  groupedProducts: Record<number, Product[]>;
  isAdmin: boolean;
  onEdit: (productId: number) => void;
  onDelete: (productId: number) => void;
};

const ProductList: React.FC<ProductListProps> = ({
  groupedProducts,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  const { categories } = useCategoryContext(); // Obtén las categorías del contexto

  // Función para obtener el nombre de la categoría por su id
  const getCategoryName = (categoryId: number): string => {
    const category = categories.find((cat: any) => cat.id === categoryId);
    return category ? category.name : `Category ${categoryId}`;
  };

  return (
    <div className="flex flex-col flex-wrap gap-[20px] w-full justify-start px-5">
      {Object.entries(groupedProducts).map(([categoryId, products]) => (
        <div key={categoryId} className="w-full">
          <h2 className="text-[30px] mb-5">
            {getCategoryName(parseInt(categoryId))}
          </h2>
          <div className="flex flex-wrap gap-[20px] w-full justify-start px-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
