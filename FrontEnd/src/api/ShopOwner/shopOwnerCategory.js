import shopBaseURL from "../Interceptors/shopInterceptor";

//get all categories
export const getAllCategoriesShop = async () => {
    try {
      const response = await shopBaseURL.get("/shopowner/getcategory");
      console.log("response of all postt get : ", response);
      const allCategories = {
        status: response.data.success,
        categories: response.data.data,
      };
      console.log("response postResponse : ", allCategories);
      return allCategories
    } catch (error) {
      console.log(error);
    }
  };
  

 
