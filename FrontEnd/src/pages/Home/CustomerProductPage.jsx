import React from "react";
import NavBarComp from "../../components/Home/NavBar";
import { useParams } from "react-router-dom";
import ProductPage from "../../components/Product/ProductPage";

const CustomerProductPage = () => {
  const { category, catId } = useParams();
  console.log("category,catId  : ", category, catId);

  return (
    <div className="flex flex-col gap-2">
      <NavBarComp />
      <div className="mx-4">
        <div className="flex justify-center py-4 border border-gray-100 rounded-2xl bg-gray-300 ">
          <p className="text-blue-900 font-extrabold text-3xl">
            {category} List
          </p>
        </div>
        <div className="flex flex-col border border-gray-100 rounded-2xl bg-gray-300 min-h-screen w-full h-full">
          <ProductPage category={category} catId={catId} role={"customer"} />
        </div>
      </div>
    </div>
  );
};

export default CustomerProductPage;
