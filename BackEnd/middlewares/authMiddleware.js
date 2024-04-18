import AppError from "../utilities/appError.js";
import { authServices } from "./authServices.js";

const userAuthMiddleware = (rolehere) => {
    return (req, res, next) => {
      let token = null;
      console.log("Entered to middleware");
  
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split(" ")[1];
        token = token.replace(/"/g, ""); 
      }
  
      if (!token) {
        throw new AppError("Token not found", 401);
      }
  
      try {
        const { payload } = authServices.verifyToken(token);
        console.log("verified token : ", payload);
        const { id, role } = payload;
        req.query.userId = id;
        if (role === rolehere) {
          next();
        } else if (role === rolehere) {
          next();
        }
  
      } catch (error) {
        console.log(error);
  
        throw new AppError("Unauthorized user", 401);
      }
    };
  };
  
  export default userAuthMiddleware;
  