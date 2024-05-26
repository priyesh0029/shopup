import { adminController } from "../controllers/adminControllers.js";
import { uploadShopupCategory } from "../middlewares/multer.js";



const adminRouter = (router) => {

    router.post('/createcategory',uploadShopupCategory,adminController.createCategory)
    router.get('/getcategory',adminController.getCategory)
    router.get('/dashboard',adminController.getAdminDashboard)
    router.get('/getuserregperweeek',adminController.getUserRegPerWeeek)
    router.get('/getusercount',adminController.getYearlyUserCount)
    router.get('/getshopownercount',adminController.getYearlyShopOwnerCount)
    router.get('/getuserslistdetails',adminController.getallUsersDetails)
    router.patch('/blockUser',adminController.handleBlockUnblockUser)
    router.get('/getshoplistdetails',adminController.getallShopOwnerDetails)
    router.patch('/blockshopowner',adminController.handleBlockUnblockShopowner)
    router.get('/getproductlistdetails',adminController.getallProductsDetails)
    router.patch('/blockproduct',adminController.handleBlockUnblockProduct)












    return router
};

export default adminRouter;