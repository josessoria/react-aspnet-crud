import React from "react";
import { MdModeEdit } from "react-icons/md";
import zocologo from "../../assets/image/zocologo.jpg";
import { Product } from "./Product"; // Import the Product type
import { FaTrash } from "react-icons/fa";

type ProductCardProps = {
  product: Product;
  isAdmin: boolean;
  onEdit: (productId: number) => void;
  onDelete: (productId: number) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin,
  onEdit,
  onDelete,
}) => (
  <div className="cartitaproduct shadow-lg rounded-xl p-1 flex flex-col w-[250px]">
    <div className="image rounded-xl relative">
      <img
        src={zocologo}
        className="w-full object-cover rounded-tl-xl rounded-tr-xl"
        alt={product.name}
      />
      {isAdmin && (
        <>
          <FaTrash
            className="absolute text-white top-[15px] text-[25px] left-[15px] cursor-pointer"
            onClick={() => onDelete(product.id)}
          />
          <MdModeEdit
            className="absolute text-white top-[15px] text-[25px] right-[15px] cursor-pointer"
            onClick={() => onEdit(product.id)}
          />
        </>
      )}
    </div>
    <div className="bottomcard flex flex-col">
      <div className="colrower flex flex-col w-full justify-between p-1">
        <span className="font-[500] text-[18px]">{product.name}</span>
        <span className="font-[400] text-[15px] w-full">
          {product.description}
        </span>
        <span className="font-[500] text-[25px]">${product.price}</span>
      </div>
    </div>
  </div>
);

export default ProductCard;
