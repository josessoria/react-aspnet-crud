import React, { useContext } from "react";
import Products from "../../components/Products/Products";
import { UserContext, UserContextType } from "../../context/UserProvider";
import TabActions from "../../components/TabActions/TabActions";

const index = () => {
  const { user }: UserContextType = useContext(UserContext);
  return (
    <div className="home flex flex-col gap-[10px] items-center justify-around ">
      {user && <TabActions />}

      <Products />
    </div>
  );
};

export default index;
