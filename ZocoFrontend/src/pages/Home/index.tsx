import React from "react";
import Products from "../../components/Products/Products";

const index = () => {
  return (
    <div className="home flex flex-col gap-[10px] items-center justify-around ">
      <Products />
    </div>
  );
};

export default index;
