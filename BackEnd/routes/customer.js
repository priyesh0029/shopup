import { adminController } from "../controllers/adminControllers.js";
import { customerControllers } from "../controllers/customerControllers.js";

const customerRouter = (router) => {
  router.get("/getcategory", adminController.getCategory);
  router.post("/savelocation", customerControllers.saveUserLocation);

  return router;
};

export default customerRouter;
