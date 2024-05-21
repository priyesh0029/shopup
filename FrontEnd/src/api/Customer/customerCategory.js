import { toast } from "react-toastify";
import baseURL from "../Interceptors/userInterceptor";

//get all categories
export const getAllCategoriesCustomer = async () => {
  try {
    const response = await baseURL.get("/customer/getcategory");
    console.log("response of all postt get : ", response);
    const allCategories = {
      status: response.data.success,
      categories: response.data.data,
    };
    console.log("response postResponse : ", allCategories);
    return allCategories;
  } catch (error) {
    console.log(error);
  }
};

//to save user Location

export const saveUserLocation = async (location) => {
  try {
    const response = await baseURL.post("/customer/savelocation", location);
    console.log("response of save location 1111111111111111111111: ", response);
   
      // const location = {
      //   status: response.data.success,
      // };
      console.log("response postResponse 22222222222222222222222: ", response.data);
      return response.data;
  } catch (error) {
    console.log(error);
    toast.error("unable to save user location.please refresh the page..!");
  }
};
