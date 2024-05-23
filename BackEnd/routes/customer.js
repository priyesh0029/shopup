import { adminController } from "../controllers/adminControllers.js";
import { customerControllers } from "../controllers/customerControllers.js";

const customerRouter = (router) => {
  router.get("/getcategory", adminController.getCategory);
  router.post("/savelocation", customerControllers.saveUserLocation);
  router.get('/getuserproducts/:catId',customerControllers.getUserProductsList)
  // router.get('/getallproducts/:catId',()=>console.log("customer enterd router"))



  return router;
};

export default customerRouter;
