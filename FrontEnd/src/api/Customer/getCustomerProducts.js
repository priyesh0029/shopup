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


  //to search products in customer dashboard using regex

  export const searchUser = async (product) => {
    try {
      const response = await baseURL.get(`customer/search?product=${product}`);
      if (response.data.success) {
        console.log("response of search product : ", response.data.data);
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };