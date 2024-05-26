//to get all post lists details

import adminBaseURL from "../Interceptors/adminInterceptor";

export const getProductListDetails = async ()=> {
    try {
      const response = await adminBaseURL.get("/admin/getproductlistdetails");
  
      console.log("response getallProductListDetails : ", response);
      if (response.data.success) {
        const allProductList = response.data.data;
  
        return allProductList;
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

    //to get block or unblock product

export const manageProductStatus = async (proId)=> {
    try {
      const response = await adminBaseURL.patch("/admin/blockproduct",{proId});
  
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