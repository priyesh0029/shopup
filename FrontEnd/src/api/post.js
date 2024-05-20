
import baseURL from "./Interceptors/userInterceptor";
import { toast } from "react-toastify";

export const createPost = async (post)=> {
    try {
      console.log("post in front end : ",post);
      const response = await baseURL.post("/post/create", post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response of post in front end : ",response);

      if(response.data.success){
         console.log("response of create post : ", response.data.data);
        const newPostData  ={
          status :response.data.success,
          post :response.data.data
        }
        return newPostData
      }
    } catch (error) {
      console.log(error);
    }
  };


  //get all post 
    export const getAllPost = async () => {
    try {
      const response = await baseURL.get("/post/getpost");
      console.log("response of all postt get : ", response);
      const postResponse = {
        status: response.data.status,
        allPosts: response.data.allPosts,
      };
      console.log("response postResponse : ", postResponse);
      return postResponse
    } catch (error) {
      console.log(error);
    }
  };

  //edit post 


  export const updatePost = async(caption,description,postId)=>{
    const editpostInfo = {caption,description,postId}
    try{
      const response = await baseURL.patch("/post/updatepost",editpostInfo)
      console.log("response edited post : ",response);
      if(response.data.success){
        const post = response.data.data
        return post
      }
  
    }catch(error){
      console.log(error);
      
    }
  }

  //to delete post


  export const deletePost = async(postId)=>{
    try{
      const response = await baseURL.patch("/post/deletePost",{postId})
      console.log("response delete post : ",response);
      if(response.data.status === 'success'){
        const data = response.data
        return data
      }
  
    }catch(error){
      console.log(error);
      
    }
  }