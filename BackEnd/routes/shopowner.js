import { adminController } from "../controllers/adminControllers.js";
import { productController } from "../controllers/productController.js";
import { uploadShopupProducts } from "../middlewares/multer.js";



const shopOwnerRouter = (router) => {
    router.get('/getcategory',adminController.getCategory)
    router.post('/newproduct',uploadShopupProducts,productController.createNewProduct)
    router.get('/getallProducts/:catId',productController.getAllproducts)



    return router
};

export default shopOwnerRouter;