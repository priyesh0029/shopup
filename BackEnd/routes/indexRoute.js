import userAuthMiddleware from "../middlewares/authMiddleware.js";
import adminRouter from "./admin.js";
import authRouter from "./auth.js";
// import postRouter from "./post.js";
import shopOwnerRouter from "./shopowner.js";

const routes = (app,router) => {
    app.use("/api/auth", authRouter(router));
    app.use("/api/admin", userAuthMiddleware("admin"), adminRouter(router));
    app.use("/api/shopowner", userAuthMiddleware("shopOwner"),shopOwnerRouter(router));

    // app.use("/api/post", userAuthMiddleware("customer"), postRouter(router));
  };
  
  export default routes;