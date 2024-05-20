import React from "react";
import ShopOwnerNavbar from "./ShopOwnerNavbar";
import ShopOwnerBody from "./ShopOwnerBody";

const ShopDashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <ShopOwnerNavbar />
      <div className="m-4">
        <ShopOwnerBody />
      </div>
    </div>
  );
};

export default ShopDashboard;
