import userAuthMiddleware from "../middlewares/authMiddleware.js";
import authRouter from "./auth.js";
import postRouter from "./post.js";

const routes = (app,router) => {
    app.use("/api/auth", authRouter(router));
    app.use("/api/post", userAuthMiddleware("user"), postRouter(router));
  };
  
  export default routes;