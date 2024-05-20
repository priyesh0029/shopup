import { adminController } from "../controllers/adminControllers.js";
import { uploadShopupCategory } from "../middlewares/multer.js";



const adminRouter = (router) => {

    router.post('/createcategory',uploadShopupCategory,adminController.createCategory)
    router.get('/getcategory',adminController.getCategory)


    return router
};

export default adminRouter;