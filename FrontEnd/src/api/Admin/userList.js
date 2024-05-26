//to get all users list details

import { toast } from "react-toastify";
import adminBaseURL from "../Interceptors/adminInterceptor";

export const getusersListDetails = async () => {
    try {
      const response = await adminBaseURL.get("/admin/getuserslistdetails");
  
      console.log("response getusersListDetails111111111111111111111111111111 : ", response);
      if (response.data.success) {
        const allUsersList = response.data.data;
  
        return allUsersList;
      } 
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "something went wrong! try again.";
      console.log("response error : ", errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage); // Throw the error to be caught by the caller
    }
  };
  

  //to get block or unblock user

export const blockUser = async (userId)=> {
    try {
      const response = await adminBaseURL.patch("/admin/blockUser",{userId});
  
      console.log("response getusersListDetails : ", response);
      if (response.data.status === "success") {
        const blockStatus = response.data.blockStatus;
  
        return blockStatus;
      } 
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "something went wrong! try again.";
      console.log("response error : ", errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage); // Throw the error to be caught by the caller
    }
  };

  //to  get shopowners list details

  export const getShopOwnersListDetails = async () => {
    try {
      const response = await adminBaseURL.get("/admin/getshoplistdetails");
  
      console.log("response getshoplistdetails22222222222 : ", response);
      if (response.data.success) {
        const allShopownerList = response.data.data;
  
        return allShopownerList;
      } 
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "something went wrong! try again.";
      console.log("response error : ", errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage); // Throw the error to be caught by the caller
    }
  };

    //to get block or unblock shop owner

export const blockShopOwner = async (userId)=> {
  try {
    const response = await adminBaseURL.patch("/admin/blockshopowner",{userId});

    console.log("response getusersListDetails : ", response);
    if (response.data.status === "success") {
      const blockStatus = response.data.blockStatus;

      return blockStatus;
    } 
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};