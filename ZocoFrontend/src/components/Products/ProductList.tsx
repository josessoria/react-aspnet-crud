import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "./Product"; // Importa el tipo Product

type ProductListProps = {
  groupedProducts: Record<number, Product[]>;
  isAdmin: boolean;
  onEdit: (productId: number) => void;
  onDelete: (productId: number) => void;
};

const categoryNames: Record<number, string> = {
  1: "Electrónica",
  2: "Salud",
  3: "Construccion",
  // Agrega más categorías según sea necesario
};

const ProductList: React.FC<ProductListProps> = ({
  groupedProducts,
  isAdmin,
  onEdit,
  onDelete,
}) => (
  <div className="flex flex-col flex-wrap gap-[20px] w-full justify-start px-5">
    {Object.entries(groupedProducts).map(([categoryId, products]) => (
      <div key={categoryId} className="w-full">
        <h2 className="text-[30px] mb-5">
          Category {categoryNames[parseInt(categoryId)]}
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

export default ProductList;
