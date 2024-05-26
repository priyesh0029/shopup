import { adminController } from "../controllers/adminControllers.js";
import { customerControllers } from "../controllers/customerControllers.js";

const customerRouter = (router) => {
  router.get("/getcategory", adminController.getCategory);
  router.post("/savelocation", customerControllers.saveUserLocation);
  router.get('/getuserproducts/:catId',customerControllers.getUserProductsList)
  router.get('/search',customerControllers.getallProductSearch)



  return router;
};

export default customerRouter;
