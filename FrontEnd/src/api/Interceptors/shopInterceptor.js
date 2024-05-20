import axios from "axios";


const shopBaseURL = axios.create({
  baseURL: process.env.BASE_URL,
});

shopBaseURL.interceptors.request.use(
  (config) => {
    console.log("Entered to interceptor");
    const token = localStorage.getItem("shopToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("Error in interceptor");
    return Promise.reject(error);
  }
);

export default shopBaseURL;
