import { authControllers } from "../controllers/authController.js";


const authRouter = (router) => {

    router.post('/adminlogin', authControllers.adminLogin)
    router.post('/shopregister',authControllers.shopRegister)
    router.post('/shoplogin',authControllers.shopLogin)
    router.post('/register', authControllers.registerUser)
    router.post('/login', authControllers.loginUser)

    return router
};

export default authRouter;