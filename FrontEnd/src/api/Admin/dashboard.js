import { toast } from "react-toastify";
import adminBaseURL from "../Interceptors/adminInterceptor";

export const dashBoardDetails = async () => {
    try {
      const response = await adminBaseURL.get("/admin/dashboard");
  
      console.log("response first : ", response);
      if (response.data.status) {
        const dashBoardDetails = response.data.data;
        console.log("dashBoardDetails : ",dashBoardDetails);
        return dashBoardDetails;
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
  

  //to get number of user registation per week
  export const getUserRegPerWeeek = async () => {
    try {
      const response = await adminBaseURL.get("/admin/getuserregperweeek");
  
      console.log("response getUserRegPerWeeek : ", response.data.data);
      if (response.data.status) {
        const userRegperWeek = response.data.data;
      console.log("response getUserRegPerWeeek : ", userRegperWeek);
        return userRegperWeek;
      } 
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "something went wrong! try again."
      console.log("response error : ", errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage); // Throw the error to be caught by the caller
    }
  };

  //to get user count for yeat for user yearly chart on admin dashboard

export const getUserCount = async ()=> {
  try {
    const response = await adminBaseURL.get("/admin/getusercount");

    console.log("response getusersListDetails : ", response);
    if (response.data.status) {
      const userCount = response.data.data;

      return userCount;
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


//to get user count for yeat for user yearly chart on admin dashboard

export const getshopCount = async () => {
  try {
    const response = await adminBaseURL.get("/admin/getshopownercount");

    console.log("response getHandleShopCount : ", response);
    if (response.data.status) {
      const shopOwnerCount = response.data.data;

      return shopOwnerCount;
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