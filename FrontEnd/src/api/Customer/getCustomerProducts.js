import { toast } from "react-toastify";
import baseURL from "../Interceptors/userInterceptor";

//get all customer products based on category
export const fetchCustomerProducts = async (catId) => {
    try {
        console.log("response of all products catId : ", catId);
      const response = await baseURL.get(`/customer/getuserproducts/${catId}`);
      const productResponse = {
        status: response.data.status,
        products: response.data.products,
      };
      console.log("response postResponse : ", productResponse);
      return productResponse;
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products.please refresh the page!")
    }
  };