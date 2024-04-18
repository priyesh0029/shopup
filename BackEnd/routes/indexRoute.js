import authRouter from "./auth.js";

const routes = (app,router) => {
    app.use("/api/auth", authRouter(router));
    // app.use("/api/post", authMiddleware("user"), postRouter(router));
  };
  
  export default routes;