import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import React from 'react';

const generatePromoCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const CouponModal = ({ open, handleOpen,setdiscount }) => {
  const promoCode1 = generatePromoCode();
  const promoCode2 = generatePromoCode();

  const handlePrice  = (dis)=>{
    setdiscount(()=> dis)
    handleOpen()
  }

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Coupons</DialogHeader>
      <DialogBody>
        <div onClick={()=>handlePrice(10)} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
          <h4>Promo Code: {promoCode1}</h4>
          <p>Get $10 off your purchase!</p>
        </div>
        <div onClick={()=>handlePrice(10)}style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
          <h4>Promo Code: {promoCode2}</h4>
          <p>Get $15 off your purchase!</p>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default CouponModal;
