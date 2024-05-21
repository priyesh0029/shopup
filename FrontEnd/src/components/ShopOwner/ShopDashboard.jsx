import React from "react";
import ShopOwnerNavbar from "./ShopOwnerNavbar";
import ShopOwnerBody from "./ShopOwnerBody";
import CategoryPage from "../Product/CategoryPage";

const ShopDashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <ShopOwnerNavbar />
      <div className="m-4">
        {/* <ShopOwnerBody /> */}
        <CategoryPage role={"shopOwner"}/>
      </div>
    </div>
  );
};

export default ShopDashboard;
