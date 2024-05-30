import { toast } from "react-toastify";
import baseURL from "../Interceptors/userInterceptor";

//add products to users cart

export const addToCart = async (proId) => {
  try {
    const response = await baseURL.post("/customer/addtocart",{proId});
    console.log("response of all cartResponse post : ", response);
    const cartResponse = {
      success: response.data.success,
    };
    console.log("response cartResponse : ", cartResponse);
    return cartResponse;
  } catch (error) {
    console.log(error);
  }
};

//to get all cart list

export const getCartListDetails = async () => {
    try {
      const response = await baseURL.get("/customer/cartlist");
      console.log("response of all cartResponse cart : ", response);
      const cartResponse = {
        success: response.data.success,
        cartlist : response.data.data
      };
      console.log("response cartResponse : ", cartResponse);
      return cartResponse;
    } catch (error) {
      console.log(error);
    }
  };