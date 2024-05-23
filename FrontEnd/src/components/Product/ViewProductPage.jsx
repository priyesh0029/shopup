
import React from 'react';
import { Carousel, Dialog } from '@material-tailwind/react';
import { PRODUCT_URL } from '../../constants/mainUrls';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const ViewProductPage = ({ product,open,setOpen }) => {
    const handleOpen = ()=>{
        setOpen(!open)
    }
  return (
    <Dialog
    open={open}
    handler={handleOpen}
    animate={{
      mount: { scale: 1, y: 0 },
      unmount: { scale: 0.9, y: -100 },
    }}
    size="xl"
    className="flex flex-wrap"
  >
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <Carousel  showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                autoPlay={true}
                interval={3000}
                className="relative rounded-lg" autoplay={true} >
            {product.imgNames.map((pic, index) => (
              <img
                key={index}
                src={PRODUCT_URL + `${pic}.jpg`}
                alt={`Product Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ))}
          </Carousel>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.caption}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <div className="space-y-2">
           
            <div>
              <span className="font-semibold">Price: </span>${product.price}
            </div>
            
           
            <div>
              <span className="font-semibold">Item added at </span>
              {new Date(product.productCreatedAt).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Email: </span>
              {product.email}
            </div>
            <div>
              <span className="font-semibold">Number: </span>
              {product.number}
            </div>
            <div>
              <span className="font-semibold">Address: </span>
              {product.address}
            </div>
            {/* <div>
              <span className="font-semibold">Location: </span>
              {product.location}
            </div> */}
            <div>
              <span className="font-semibold">{Number(product.distanceInKm.toFixed(1))} km from your location </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Dialog>
  );
};

export default ViewProductPage;
