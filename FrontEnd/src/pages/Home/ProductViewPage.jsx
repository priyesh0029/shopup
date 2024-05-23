import React from "react";
import ViewProductPage from "../../components/Product/ViewProductPage";
import { useParams } from "react-router-dom";
import NavBarComp from "../../components/Home/NavBar";

const ProductViewPage = () => {
    const {product} = useParams();
    console.log("product : ",product);
  return (
    <div className="flex flex-col gap-2">
      <NavBarComp />
      <ViewProductPage product={product}/>
    </div>
  );
};

export default ProductViewPage;
