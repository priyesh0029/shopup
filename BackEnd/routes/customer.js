import { adminController } from "../controllers/adminControllers.js";
import { customerControllers } from "../controllers/customerControllers.js";

const customerRouter = (router) => {
  router.get("/getcategory", adminController.getCategory);
  router.post("/savelocation", customerControllers.saveUserLocation);
  router.get('/getuserproducts/:catId',customerControllers.getUserProductsList)
  router.get('/search',customerControllers.getallProductSearch)
  router.post("/addtocart", customerControllers.addToCart);
  router.get('/cartlist',customerControllers.getallCartList)





  return router;
};

export default customerRouter;
