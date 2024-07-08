import React, { useContext } from "react";
import Products from "../../components/Products/Products";
import { UserContext, UserContextType } from "../../context/UserProvider";
import TabActions from "../../components/TabActions/TabActions";
import "./home.scss";

const index = () => {
  return (
    <div className="homesection flex flex-col gap-[10px] items-center justify-around mt-[55px] ">
      <Products />
    </div>
  );
};

export default index;
