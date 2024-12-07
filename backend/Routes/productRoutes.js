import { Router } from "express";
import { getAllProducts,PopularWomen,newCollections,deleteProduct,addProduct } from "../controllers/productControllers.js";


const router = Router();


router.get('/getAllProducts',getAllProducts);
router.post('/addProduct',addProduct);
router.post('/deleteProduct',deleteProduct);
router.get('/Popular',PopularWomen);
router.get('/newCollections',newCollections)



export default router;