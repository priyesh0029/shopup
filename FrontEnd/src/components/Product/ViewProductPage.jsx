import React, { useState } from 'react';
import { Carousel, Dialog } from '@material-tailwind/react';
import { PRODUCT_URL } from '../../constants/mainUrls';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { addToCart } from '../../api/Customer/customerCartconnections';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { CartCountManage } from '../../Features/redux/slices/user/homeSlice';
import { useNavigate } from 'react-router-dom';

const ViewProductPage = ({ product, open, setOpen }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const user = useSelector((store) => store.home.userInfo);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleAddToCartClick = async(proId) => {
    const response = await addToCart(proId)
    if(response.success){
        toast.success(response.message)
        console.log(typeof(user.cart));
        dispatch(CartCountManage(user.cart+1))
    }else{
      toast.warning(response.message)
    }
    setIsAddedToCart(true);
  };

  const handleCartNavigate = ()=>{
    navigate('/usercart')
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
      <ToastContainer position="bottom-left" />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            <Carousel
              showthumbs={false}
              infiniteLoop={true}
              showStatus={false}
              autoplay={true}
              interval={3000}
              className="relative rounded-lg"
            >
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
              <div>
                <span className="font-semibold">
                  {Number(product.distanceInKm.toFixed(1))} km from your location
                </span>
              </div>
              <div>
                <button
                  onClick={isAddedToCart ?  handleCartNavigate : ()=>handleAddToCartClick(product.productId)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {isAddedToCart ? 'Go to cart': 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewProductPage;
