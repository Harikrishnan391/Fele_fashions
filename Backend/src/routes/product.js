import express from "express";
import { saveProduct,listProductByCategory } from "../controllers/productController.js";
import apiKeyMiddleware from "../middleware/verify-api_key.js";

const router = express.Router();

router.post("/save", apiKeyMiddleware, saveProduct);
router.get('/list',apiKeyMiddleware,listProductByCategory)

export default router;
