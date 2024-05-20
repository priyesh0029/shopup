import shopBaseURL from "../Interceptors/shopInterceptor";

export const createProduct = async (post) => {
  try {
    console.log("post in front end : ", post);
    const response = await shopBaseURL.post("/shopowner/newproduct", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response of post in front end : ", response);

    if (response.data.success) {
      console.log("response of create post : ", response.data.data);
      const newPostData = {
        status: response.data.success,
        product: response.data.data,
      };
      return newPostData;
    }
  } catch (error) {
    console.log(error);
  }
};

//get all products
export const getAllProducts = async (catId) => {
  try {
    const response = await shopBaseURL.get(`/shopowner/getallProducts/${catId}`);
    console.log("response of all postt get : ", response);
    const productResponse = {
      status: response.data.status,
      allProducts: response.data.allProducts,
    };
    console.log("response postResponse : ", productResponse);
    return productResponse;
  } catch (error) {
    console.log(error);
  }
};
