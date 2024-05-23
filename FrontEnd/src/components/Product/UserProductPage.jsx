import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_URL } from "../../constants/mainUrls";
import ViewProductPage from "./ViewProductPage";

const UserProductPage = ({ products }) => {
  const [open, setOpen] = useState(false);
  const [singleProduct, setsingleProduct] = useState({})
  const navigate = useNavigate();

  const handleOpen = (product) => {
    setsingleProduct(()=>product)
    setOpen(!open);
    // console.log("border border-gray-100 min-h-screen rounded-xl w-full h-full :",product);
    // navigate(`/productviewpage/${product}`)
  };

  return (
    <div className="border border-gray-100 min-h-screen rounded-xl w-full h-full bg-gray-200">
      <div className="max-w-screen-2xl mx-auto p-4">
        <div className="flex justify-end mb-4"></div>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {products.map((product, index) => (
            <Card
              key={index}
              className="relative group rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              onClick={()=>handleOpen(product)}
            >
              <Carousel
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                autoPlay={true}
                interval={3000}
                className="relative"
              >
                {product.imgNames.map((pic, idx) => (
                  <div key={idx} className="h-48 bg-cover bg-center">
                    <img
                      src={PRODUCT_URL + `${pic}.jpg`}
                      alt={product.caption}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </Carousel>
              <CardBody className="flex flex-col justify-between flex-1 p-4">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="text-center font-semibold text-lg"
                >
                  {product.caption}
                </Typography>
                <div className="text-center ">
                  <Typography  color="gray" className="font-semibold">
                    ${product.price}
                  </Typography>
                </div>
                <div className=" text-right">
                  <Typography  color="gray" className="font-extralight">
                    {Number(product.distanceInKm.toFixed(1))} km from here
                  </Typography>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      {open&&( <ViewProductPage product={singleProduct} setOpen={setOpen} open={open}/>)}
    </div>
  );
};

export default UserProductPage;
