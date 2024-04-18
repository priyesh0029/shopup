import baseURL from "./api";
import { toast } from "react-toastify";


export const register = async (userData )=> {
    console.log("userData : ",userData);
    try {
      const response = await baseURL.post(
        "/auth/register",
        userData
      );
  
      console.log("response first : ", response.data);
      if (response.data.success) {
        let signupResponse = {
          status: response.data.success,
          userInfo: {
            token: response.data.data.token,
            user: {
              _id: response.data.data.user._id,
              name: response.data.data.user.name,
              userName: response.data.data.user.username,
              email: response.data.data.user.email,
            },
          },
        };
  
        toast.success("Registration successful");
        return signupResponse;
      } else {
        toast.error("Registration failed");
        return false;
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during registration";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };



  export const login = async (userData) => {
    try {
      const response = await baseURL.post(
        "/auth/login",
        userData
      );
  
      console.log("response first : ", response);
      if (response.data.success) {
        let signupResponse = {
          status: response.data.success,
          userInfo: {
            token: response.data.data.token,
            user: {
              _id: response.data.data.user._id,
              name: response.data.data.user.name,
              userName: response.data.data.user.username,
              email: response.data.data.user.email,
            },
          },
        };
  
        toast.success("login successful");
        return signupResponse;
      } else {
        toast.error("login failed");
        return false;
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "something went wrong! try again.";
      console.log("response error : ", errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };