import { Router } from "express";
import * as controller from "../controllers/productController.js";

const router = Router();

//GET ALL PRODUCTS
router.get("/", controller.getAllCtl);
// GET PRODUCT BY ID
router.get("/:productId", controller.getByIdCtl);
// CREATE PRODUCT
router.post("/", controller.createCtl);
//UPDATE PRODUCT
router.put("/:productId", controller.updateCtl);
// DELETE PRODUCT
router.delete("/:productId", controller.removeCtl);

router.post("/genmockingproducts", controller.createProduct);
router.get("/mockingproducts", controller.getProducts);

export default router;
