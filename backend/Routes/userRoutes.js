import { Router } from "express";
import { Login,Signup,getCart,removeFromCart,addToCart,fetchUser } from "../controllers/userControllers.js";

const router = Router();


router.post('/login',Login);
router.post('/signup',Signup);
router.get('/getCart',fetchUser,getCart);
router.post('/deleteFromCart',fetchUser,removeFromCart);
router.post('/addToCart',fetchUser,addToCart)



export default router;