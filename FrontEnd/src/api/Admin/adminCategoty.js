//create category

import adminBaseURL from "../Interceptors/adminInterceptor";

export const creatCategotry = async(catData)=>{
    try {
        console.log("catData in front end : ",catData);
        const response = await adminBaseURL.post("/admin/createcategory", catData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response of post in front end : ",response);
  
        if(response.data.success){
           console.log("response of create post : ", response.data.data);
          const newCategory  ={
            status :response.data.success,
            data :response.data.data
          }
          return newCategory
        }
      } catch (error) {
        console.log(error);
      }
}

//get all categories
export const getAllCategories = async () => {
  try {
    const response = await adminBaseURL.get("/admin/getcategory");
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
